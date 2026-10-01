# We The People Movement website

Static website built with Astro. Read `CLAUDE.md`, `DECISIONS.md` and `docs/` first.

```
npm install
npm run dev      # local dev server
npm run build    # static output in dist/, plus the search index (Pagefind)
npm run check    # type check
npm run test:e2e # accessibility, behaviour and SEO tests (set CHROMIUM_PATH if needed)
npm run lighthouse # mobile Lighthouse on key pages; needs `npm run preview` running and CHROME_PATH set
```

Forms: Join, Contact and Event registration post to Formspree and the newsletter to Brevo. Paste each service's address into `src/lib/forms.ts` (see `docs/13-form-integrations.md`). Until then the forms show and validate, and Send says nothing was sent.

Content lives in `content/` (Markdown). Unresolved items are listed in `content/PLACEHOLDERS.md`.

Search works only on a built site (`npm run build && npm run preview`), not in `npm run dev`.
Security headers are in `public/_headers` (Netlify and Cloudflare Pages format). The production domain goes in `astro.config.mjs` (`site`); sitemap, robots.txt, canonical and share-image addresses all follow it.
