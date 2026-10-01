# We The People Movement website

Static website built with Astro. Read `CLAUDE.md`, `DECISIONS.md` and `docs/` first.

```
npm install
npm run dev      # local dev server
npm run build    # static output in dist/, plus the search index (Pagefind)
npm run check    # type check
npm run test:e2e # accessibility, behaviour and SEO tests (set CHROMIUM_PATH if needed)
npm run lighthouse # mobile Lighthouse on key pages; needs `npm run preview` running and CHROME_PATH set
npm run launch-check # what still blocks going public
npm run smoke -- https://your-domain # test the live site after deploying
```

Forms: Join, Contact and Event registration post to Formspree and the newsletter to Brevo. Paste each service's address into `src/lib/forms.ts` (see `docs/13-form-integrations.md`). Until then the forms show and validate, and Send says nothing was sent.

Content lives in `content/` (Markdown). Unresolved items are listed in `content/PLACEHOLDERS.md`.

Search works only on a built site (`npm run build && npm run preview`), not in `npm run dev`.
The site is published on GitHub Pages by `.github/workflows/deploy.yml` (switch it on: `docs/14`, step 1). The address and folder are worked out by the workflow; sitemap, robots.txt, canonical and share-image addresses follow them. Every internal address goes through `url()` in `src/lib/url.ts`; `node scripts/check-links.mjs dist <folder>` verifies a build. Security headers are in `public/_headers` for hosts that read it; GitHub Pages cannot send headers, so the policy is also in a `<meta>` tag.

Launching or handing over: `docs/14-launch-runbook.md`, `docs/15-editor-guide.md`, `docs/16-legal-review-pack.md`, `docs/17-handover.md`.
