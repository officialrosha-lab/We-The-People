# CLAUDE.md — We The People website

## Mission

Build a distinctive, award-caliber website for **We The People**, a nonprofit. The site must show what the organization stands for, what it is doing, and give visitors clear ways to act (give, volunteer, attend, advocate, subscribe) and the organization every tool it needs to run those actions.

## Read first, in this order

1. `docs/01-org-brief.md` and `docs/01a-interview-findings.md` and `docs/01b-logo-and-brand-analysis.md`, and `docs/01c-public-record-and-positioning.md` (source of truth about the organization; 01a comes from a radio interview and is unverified)
2. `docs/12-open-questions.md`
3. `docs/02` through `docs/11`

## Non-negotiable rules

- **Never invent facts.** No made-up statistics, quotes, names, legal status, addresses, or impact numbers. Where content is missing, use an obviously marked placeholder: `[PLACEHOLDER: description]`, and list it in `content/PLACEHOLDERS.md`.
- **Do not ship generic.** Read `docs/05-design-direction.md` and everything in `docs/design/` before any visual decision. `docs/design/` is the design source of truth: proposed in the kit, confirmed in Phase 0, then locked. Follow the plan-review-build-critique process there.
- **Plan before code.** Phase 0 produces a design plan and architecture note. Stop and wait for approval before Phase 1.
- **Work in phases** from `docs/10-build-roadmap.md`. Each phase ends with a short report: what was built, what is placeholder, what needs a decision.
- **Accessibility is a floor, not a feature**: WCAG 2.2 AA, keyboard focus visible, `prefers-reduced-motion` respected, real alt text.
- **Performance budget**: LCP under 2.5s on mid-range mobile over 4G, CLS under 0.1, minimal JS on content pages. Many visitors may be on slow connections or low-end phones.
- **Privacy by default**: collect the minimum data, no tracking before consent where required, no secrets in the repo.
- **Money and legal text** (donation flows, receipts, privacy policy, terms) are drafted as scaffolds and flagged for human/legal review. Never present them as final.
- Ask at most one batch of questions per phase; otherwise proceed with clearly labeled assumptions.

## Conventions

- TypeScript strict, ESLint + Prettier, conventional commits.
- Components in `src/components`, content schemas in `src/content` or CMS schema folder, design tokens in a single `tokens` file consumed by CSS variables.
- Every page has: unique title, meta description, Open Graph image, structured data where relevant.
- Copy lives in CMS or content files, never hard-coded in components.
- Write a short `DECISIONS.md` entry for any significant technical or design choice.

## Definition of done (per page)

Responsive 360px to 1920px, keyboard-navigable, passes axe checks, Lighthouse 95+ in all four categories, real or clearly flagged content, reviewed against `docs/05` and `docs/06`.
