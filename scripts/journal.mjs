import { readFile } from 'node:fs/promises';
import process from 'node:process';

if (!process.argv.includes('--check')) {
  console.error('Usage: node scripts/journal.mjs --check');
  process.exit(2);
}

const asset = await readFile('journal/asset.yaml', 'utf8');
const events = await readFile('journal/events.jsonl', 'utf8');

if (!asset.includes('asset_id: WF-A002')) {
  console.error('FAIL: journal asset id is missing or unexpected.');
  process.exit(1);
}

for (const [index, line] of events.split('\n').filter(Boolean).entries()) {
  try { JSON.parse(line); }
  catch {
    console.error(`FAIL: invalid JSONL at journal/events.jsonl line ${index + 1}`);
    process.exit(1);
  }
}

console.log('Journal PASS.');
