import { access } from 'node:fs/promises';

const required = [
  'site.config.ts','astro.config.mjs',
  'src/core/SEO.astro','src/core/BaseLayout.astro','src/core/EventTracker.astro','src/core/events.ts',
  'src/pages/index.astro','src/pages/robots.txt.ts',
  'journal/asset.yaml','journal/events.jsonl','journal/event-types.json',
  'scripts/qa.mjs','scripts/production-qa.mjs','scripts/new-site.mjs',
  '.github/workflows/ci.yml',
];

for (const path of required) await access(path);
console.log('Scaffold PASS: v0.2 required factory files exist.');
