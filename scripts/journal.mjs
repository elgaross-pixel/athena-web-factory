import { readFile } from 'node:fs/promises';
import process from 'node:process';

if (!process.argv.includes('--check')) {
  console.error('Usage: node scripts/journal.mjs --check');
  process.exit(2);
}

let failed = false;
const fail = (message) => { console.error(`FAIL: ${message}`); failed = true; };

const asset = await readFile('journal/asset.yaml', 'utf8');
const eventsText = await readFile('journal/events.jsonl', 'utf8');
const registry = JSON.parse(await readFile('journal/event-types.json', 'utf8'));

const assetId = asset.match(/^asset_id:\s*(\S+)/m)?.[1];
if (!assetId || !/^WF-A\d{3,}$/.test(assetId)) fail('journal asset_id is missing or invalid.');

const requiredAssetSections = ['domain:', 'repository:', 'deployment:', 'measurement:', 'commercial:', 'experiment:'];
for (const section of requiredAssetSections) if (!asset.includes(section)) fail(`journal/asset.yaml missing section ${section}`);

const allowed = new Set(registry.event_types);
const required = registry.required_fields;
const ids = new Set();
let previousTime = null;

for (const [index, line] of eventsText.split('\n').filter(Boolean).entries()) {
  let event;
  try { event = JSON.parse(line); }
  catch { fail(`invalid JSONL at journal/events.jsonl line ${index + 1}`); continue; }

  for (const field of required) if (!(field in event)) fail(`line ${index + 1}: missing required field ${field}`);
  if (event.asset_id !== assetId) fail(`line ${index + 1}: asset_id does not match asset.yaml`);
  if (!allowed.has(event.event_type)) fail(`line ${index + 1}: unknown event_type ${event.event_type}`);
  if (ids.has(event.event_id)) fail(`line ${index + 1}: duplicate event_id ${event.event_id}`);
  ids.add(event.event_id);
  const time = Date.parse(event.timestamp);
  if (Number.isNaN(time)) fail(`line ${index + 1}: invalid timestamp`);
  if (previousTime !== null && time < previousTime) fail(`line ${index + 1}: events are not chronological`);
  previousTime = time;
  if (event.event_type === 'JOURNAL_CORRECTION' && !event.evidence?.corrects_event_id) {
    fail(`line ${index + 1}: JOURNAL_CORRECTION must identify corrects_event_id`);
  }
}

if (failed) process.exit(1);
console.log('Journal PASS: schema, event registry, chronology, uniqueness, and append-only correction contract validated.');
