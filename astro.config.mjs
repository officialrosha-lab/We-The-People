import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  integrations: [
    sitemap({ filter: (page) => !/\/(thanks|search)\/?$/.test(page) }),
  ],
  site: 'https://example.org', // [PLACEHOLDER: production domain]
  build: { inlineStylesheets: 'auto' },
});
