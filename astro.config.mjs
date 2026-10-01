import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://example.org', // [PLACEHOLDER: production domain]
  build: { inlineStylesheets: 'auto' },
});
