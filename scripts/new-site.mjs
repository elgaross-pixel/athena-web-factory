import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import process from 'node:process';

const args = process.argv.slice(2);
const value = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};

const outArg = value('--out');
const assetId = value('--asset-id');
if (!outArg || !assetId) {
  console.error('Usage: npm run new-site -- --out ../site-repo --asset-id WF-A003');
  process.exit(2);
}
if (!/^WF-A\d{3,}$/.test(assetId)) {
  console.error('asset-id must match WF-A###.');
  process.exit(2);
}

const root = resolve('.');
const out = resolve(outArg);
if (out === root || out.startsWith(root + '/')) {
  console.error('Refusing to scaffold inside the factory repository.');
  process.exit(1);
}

await mkdir(out, { recursive: false }).catch((error) => {
  if (error.code === 'EEXIST') throw new Error('Output directory already exists; refusing to overwrite it.');
  throw error;
});

const copy = ['package.json','astro.config.mjs','tsconfig.json','site.config.ts','public','src','scripts','journal','.github','.gitignore'];
for (const item of copy) await cp(resolve(item), resolve(out, item), { recursive: true });

const cfgPath = resolve(out, 'site.config.ts');
let cfg = await readFile(cfgPath, 'utf8');
cfg = cfg.replace(/id:\s*'WF-A\d+'/,`id: '${assetId}'`);
await writeFile(cfgPath, cfg);

const assetPath = resolve(out, 'journal/asset.yaml');
let asset = await readFile(assetPath, 'utf8');
asset = asset.replace(/asset_id:\s*WF-A\d+/, `asset_id: ${assetId}`);
await writeFile(assetPath, asset);

const eventsPath = resolve(out, 'journal/events.jsonl');
const event = {
  event_id: 'evt-000001',
  timestamp: new Date().toISOString(),
  asset_id: assetId,
  event_type: 'ASSET_CREATED',
  actor: 'web-factory',
  evidence: { scaffold_source: 'athena-web-factory', output: basename(out) },
  notes: 'Generated in planned/non-indexable state. No domain or vertical assigned.'
};
await writeFile(eventsPath, JSON.stringify(event) + '\n');
await rm(resolve(out, 'README.md'), { force: true }).catch(() => {});

console.log(`Scaffold created: ${out}`);
console.log('Safety state: planned, non-indexable, placeholder domain.');
