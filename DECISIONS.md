# Decisions

Status: Phase 0 approved. Phase 1 in progress. D1 amended by D6.

## D1. Stack (confirms `docs/07`, with one change)

- Next.js (App Router) + TypeScript strict, static generation by default. Reason: fast pages, server actions for forms, i18n-ready routing.
- Styling: plain CSS with cascade layers, consuming `src/styles/tokens.css` (copy of `docs/design/tokens.css`). **No Tailwind**: the token file is the system and utility classes invite hard-coded values.
- Motion: native CSS + SVG attributes. No animation library (hero JS budget is 10 KB).
- CMS: **Payload or Sanity, decided after Q9** (who edits, how technical). Until then content is Markdown in `content/` behind a loader, so the CMS can be swapped in.
- Forms: Zod server validation, honeypot + rate limit, Turnstile only if needed (must not block assistive tech). Webhooks to email/CRM behind `src/lib/integrations`.
- Payments: **not chosen**. Blocked by open questions 1, 6. Keep a provider interface; Liberia payment rails (mobile money) must be confirmed with the owner.
- Search: Pagefind. Analytics: cookieless (Plausible/Umami). Hosting: Vercel or Netlify with preview deploys, CDN-cached static pages.
- Fonts: Archivo and Source Serif 4, self-hosted via Fontsource, subset to Latin + Latin Extended.
- Tests: Playwright, axe, Lighthouse CI.

## D2. Repository structure

As in `docs/07`. Phase 1 adds `src/`, `tests/`, `.env.example`. Kit docs stay in `docs/`.

## D3. Low-bandwidth resilience

Core pages and the join form work without JS. Hero final state is in the HTML at first paint. Respect `Save-Data`.

## D4. Map data

Natural Earth 1:10m admin-1 (public domain), 15 Liberian counties. See `DESIGN-NOTES.md`.

## D5. Not decided (needs owner)

Payments, CMS editor choice, languages, hosting budget, positioning (docs/01c option 1, 2 or 3).

## D6. Static website, not a web app (owner direction, supersedes D1 framework)

- Framework: **Astro** (static output, TypeScript strict, zero JS by default). No React, no Next.js.
- Pages are HTML and CSS first. Interactivity is small vanilla scripts (Roll Call hero, menu sheet, county index highlight).
- Content: Markdown/YAML in `content/` via Astro content collections with Zod schemas. A Git-based CMS (Decap or Tina) can be added later for editors; no server.
- Forms: plain HTML forms posting to a hosted form endpoint, with a honeypot. The endpoint is chosen later; until then forms are not wired and are marked as placeholders.
- Hosting: any static host or CDN.
