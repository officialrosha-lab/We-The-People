# 07 — Recommended Stack and Architecture

These are recommendations with reasons. Claude Code should confirm them in Phase 0 and record the final choice in `DECISIONS.md`.

## Recommended
| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router) + TypeScript | Static generation for speed, server actions for forms, large ecosystem |
| Styling | CSS variables from a token file + Tailwind or CSS Modules | Tokens keep the design system coherent; avoid default Tailwind look |
| Motion | Native CSS and View Transitions first; GSAP or Motion only for the signature moment | Keeps JS small |
| CMS | Sanity, Payload, or Storyblok | Staff-friendly editing, structured content, preview |
| Forms and data | Server-side validation (Zod), spam protection (Turnstile or hCaptcha), webhooks to CRM and email platform | Swappable integrations |
| Payments | Provider chosen after `docs/12` Q on country and methods (Stripe, PayPal, Flutterwave, Paystack, or a nonprofit platform such as Givebutter or Donorbox embedded as a fallback) | Availability differs by country; keep a provider abstraction |
| Email | A transactional provider (Resend, Postmark) + newsletter platform | Receipts and confirmations must be reliable |
| Search | Pagefind (static) or the CMS search | Fast, no server |
| Analytics | Plausible, Fathom, or self-hosted Umami | Privacy friendly, fewer consent hurdles |
| Hosting | Vercel or Netlify with preview deploys; staging + production | Easy rollbacks |
| Monitoring | Sentry + uptime checks | Catch donation-flow failures early |
| Testing | Playwright (flows), axe (accessibility), Lighthouse CI | Enforce the quality floor in CI |

## Architecture rules
- Content in the CMS, presentation in components, integrations behind thin adapters in `src/lib/integrations`.
- Donation flow is isolated, server-verified, idempotent, and logged. Never trust client-side totals.
- Secrets in environment variables; provide `.env.example`; never commit real keys.
- Images through an optimization pipeline (AVIF/WebP, responsive sizes, blur placeholders).
- i18n-ready routing (`/[locale]/...`) even if launching with one language.
- Progressive enhancement: core pages and forms work without JavaScript.

## Suggested repo structure
```
/
  CLAUDE.md  README.md  DECISIONS.md  DESIGN-NOTES.md
  docs/  content/  assets/
  src/
    app/            routes
    components/     ui, sections, forms
    lib/            integrations, utils, analytics
    styles/         tokens.css, globals.css
    cms/            schemas
  tests/            e2e, a11y
  .env.example
```
