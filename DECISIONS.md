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

## D7. No CMS (owner direction, supersedes D6 CMS note)

Plain website with all information about We The People. Content is Markdown/YAML files in `content/`, edited in the repo. No CMS, no editor login, no admin.

## D8. Forms without a backend (Phase 4)

- Out of scope by owner direction: petition tools, payments, Give.
- All forms (join, contact, event registration, newsletter) are plain HTML `<form method="post">` posting to one hosted form endpoint set in `PUBLIC_FORM_ENDPOINT` (build-time env var). Provider not chosen (Formspree, Web3Forms, Getform or similar all accept this shape). No server code, no database, no accounts, no login.
- Without the variable the forms render disabled with an honest notice; they never pretend to send.
- With JS: validate, send with `fetch`, show success or error inline. Without JS: the browser posts to the endpoint; the provider shows its own confirmation page (set its redirect to `/thanks/`).
- Spam: hidden honeypot field plus the provider's rate limiting. No CAPTCHA, so assistive technology is not blocked.
- Newsletter: double opt-in and one-click unsubscribe must be provided by the provider or email platform; this site cannot enforce them. Copy promises nothing beyond "we have your address". Flagged for the owner and legal review.
- Events: Markdown files in `content/events/`. Upcoming versus past is decided at build time, so the site needs a rebuild at least daily once events exist (scheduled deploy). Times are Africa/Monrovia (UTC+0, no daylight saving). Each event also gets a generated `.ics` file for "Add to calendar".
- Campaign template: not built; it needs live totals or progress, which only make sense with the petition and payment tools that are out of scope.

## D9. Third-party form services chosen (owner direction; amends D8)

- Join, Contact and Event registration go to **Formspree** (`PUBLIC_FORMSPREE_ENDPOINT`). Newsletter sign-ups go to **Brevo** (`PUBLIC_BREVO_FORM_URL`, the form's action URL, with double confirmation turned on in Brevo). The old single `PUBLIC_FORM_ENDPOINT` is gone.
- Formspree contract used: POST to `https://formspree.io/f/<id>` with `Accept: application/json`; a filled `_gotcha` field is silently ignored by Formspree; the field named `email` becomes the reply-to; `_subject` labels each form. Brevo contract used: POST to `https://<account>.sibforms.com/serve/<form-id>` with `EMAIL`, `locale`, `html_type=simple` and the `email_address_check` honeypot. Both from the providers' public documentation and community examples; **not yet exercised against live accounts**.
- Brevo replies cannot be read across origins, so the newsletter uses `no-cors` and treats "delivered" as success. The thank-you copy is worded so it is true if double confirmation is on: "If you are not already subscribed, we will email you to confirm your address." If the owner does not turn double confirmation on in Brevo, that sentence must change.
- Build guard: each variable must be an `https` URL on `formspree.io` or `sibforms.com` (or a subdomain); anything else fails the build, so a pasted wrong URL cannot send people's details to another host. Both values are public in the HTML, so no secret may be placed in them. A Brevo API key must never be used in the browser; none is needed.
- Setup steps for the owner: `docs/13-form-integrations.md`.
- Both providers are processors of personal data (names, contact details, counties). The privacy policy must name them and say where they store data; flagged for legal review.
