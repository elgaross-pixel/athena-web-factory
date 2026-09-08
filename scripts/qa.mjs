import { readFile } from 'node:fs/promises';
import process from 'node:process';

const forbidden = ['SelectVerdict', 'selectverdict.com', 'systeme.io'];
const paths = ['site.config.ts', 'astro.config.mjs', 'src/pages/index.astro'];
let failed = false;

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
if (!config.includes("status: 'planned'")) {
  console.error('FAIL: starter must begin in planned state.');
  failed = true;
}
if (!config.includes('indexable: false')) {
  console.error('FAIL: starter must begin non-indexable.');
  failed = true;
}

if (failed) process.exit(1);
console.log('QA PASS: starter boundary and indexability checks passed.');
