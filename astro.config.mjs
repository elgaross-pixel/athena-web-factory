import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://example.invalid',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
