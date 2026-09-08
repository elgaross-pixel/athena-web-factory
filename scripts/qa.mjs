import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import process from 'node:process';

const forbidden = ['SelectVerdict', 'selectverdict.com', 'systeme.io'];
let failed = false;

async function filesUnder(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await filesUnder(path));
    else out.push(path);
  }
  return out;
}

const paths = ['site.config.ts', 'astro.config.mjs', ...await filesUnder('src')];
for (const path of paths) {
  const content = await readFile(path, 'utf8');
  for (const token of forbidden) {
    if (content.includes(token)) {
      console.error(`FAIL: ${path} contains forbidden starter token: ${token}`);
      failed = true;
    }
  }
}

const config = await readFile('site.config.ts', 'utf8');
for (const required of ["status: 'planned'", 'indexable: false', "url: 'https://example.invalid'"]) {
  if (!config.includes(required)) {
    console.error(`FAIL: starter safety invariant missing: ${required}`);
    failed = true;
  }
}

const astroConfig = await readFile('astro.config.mjs', 'utf8');
if (!astroConfig.includes('site: siteConfig.site.url')) {
  console.error('FAIL: Astro site URL must derive from site.config.ts.');
  failed = true;
}
if (!astroConfig.includes('trailingSlash: siteConfig.seo.trailingSlash')) {
  console.error('FAIL: trailing-slash policy must derive from site.config.ts.');
  failed = true;
}

if (failed) process.exit(1);
console.log('QA PASS: starter boundary, config ownership, and indexability checks passed.');
