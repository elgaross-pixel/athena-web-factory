import { access } from 'node:fs/promises';

const required = [
  'site.config.ts',
  'astro.config.mjs',
  'src/core/SEO.astro',
  'src/core/BaseLayout.astro',
  'src/pages/index.astro',
  'src/pages/robots.txt.ts',
  'journal/asset.yaml',
  'journal/events.jsonl',
  'scripts/qa.mjs',
];

for (const path of required) await access(path);
console.log('Scaffold PASS: required starter files exist.');
