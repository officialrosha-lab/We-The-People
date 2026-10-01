# 10 — Build Roadmap with Approval Gates

Claude Code stops at the end of each phase with a report and waits for approval.

## Phase 0 — Discovery and plan
- Read all docs. List assumptions and missing `[FILL]` items.
- Deliver: design plan (tokens + wireframes + review against generic defaults), three hero concepts, architecture note, confirmed stack, content model.
- Gate: owner approves direction.

## Phase 1 — Foundation
- Repo, tooling, CI (lint, typecheck, axe, Lighthouse), environments, tokens, base layout, header/footer, CMS schemas, seeded placeholder content.
- Gate: staging URL live; editor can log in.

## Phase 2 — Signature experience
- Home page hero and the one memorable interaction, built and tuned for performance and reduced motion.
- Gate: owner reaction on real devices, including a low-end phone.

## Phase 3 — Core pages
- About, Our Work (+ program template), Impact, Stories (+ template), Contact, Transparency.
- Gate: content review; placeholders list reduced.

## Phase 4 — Action systems
- Donate (one-time, recurring, receipts), Get Involved forms, newsletter, events and registration, petitions, campaign template; integrations and webhooks.
- Gate: end-to-end test with test-mode payments; failure paths verified.

## Phase 5 — Polish and quality
- Motion refinement, empty/error/thank-you states, search, i18n if needed, 404, press kit, print styles.
- Accessibility audit with assistive tech; Lighthouse 95+; cross-browser; load test donation flow.
- Gate: audit report.

## Phase 6 — Launch
- Legal review complete, analytics and monitoring live, redirects, DNS, backups, editor training guide, handover docs, launch checklist in `docs/11`.

## Phase 7 — After launch
- Two-week monitoring, fix list, conversion review, awards submission package (case study, screenshots, process notes, credits).
