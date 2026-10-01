# We The People Movement website

Static website built with Astro. Read `CLAUDE.md`, `DECISIONS.md` and `docs/` first.

```
npm install
npm run dev      # local dev server
npm run build    # static output in dist/
npm run check    # type check
npm run test:e2e # axe accessibility tests (set CHROMIUM_PATH if needed)
```

Forms: Join, Contact and Event registration post to Formspree and the newsletter to Brevo. Paste each service's address into `src/lib/forms.ts` (see `docs/13-form-integrations.md`). Until then the forms show and validate, and Send says nothing was sent.

Content lives in `content/` (Markdown). Unresolved items are listed in `content/PLACEHOLDERS.md`.
