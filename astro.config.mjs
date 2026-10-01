import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import { remarkBase } from './src/lib/remark-base.mjs';

// The deploy workflow (.github/workflows/deploy.yml) supplies the real address and, on GitHub Pages without a custom
// domain, the subfolder. The fallbacks below are for working on the site locally.
// [PLACEHOLDER: production domain, once the site has one: set it here or as SITE_URL in the deploy workflow]
const site = process.env.SITE_URL || 'https://example.org';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  output: 'static',
  site,
  base,
  integrations: [
    sitemap({ filter: (page) => !/\/(thanks|search)\/?$/.test(page) }),
  ],
  // Markdown links such as [Record](/record/) get the subfolder prefix when there is one (src/lib/remark-base.mjs).
  markdown: { processor: unified({ remarkPlugins: [[remarkBase, { base }]] }) },
  build: { inlineStylesheets: 'auto' },
});
