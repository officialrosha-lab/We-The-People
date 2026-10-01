# We The People — Website Kit for Claude Code

This folder is the complete briefing pack for building the "We The People" nonprofit website.

## How to use it
1. Fill every `[FILL]` marker in `docs/01-org-brief.md` first. Everything else depends on it.
2. Answer `docs/12-open-questions.md` (anything unanswered becomes a flagged assumption).
3. Drop logos, photos, and documents into `assets/` and list them in `assets/ASSET-INVENTORY.md`.
4. Put real copy into `content/` (see `content/README.md`).
5. Place this whole folder at the root of the new repo, start Claude Code there, and say:
   > Paste the contents of KICKOFF-PROMPT.md.

## File map
| File | Purpose |
|---|---|
| `CLAUDE.md` | Master rules Claude Code reads every session |
| `docs/01-org-brief.md` | Who the organization is (you fill this) |
| `docs/01a-interview-findings.md` | Draft facts from the Joy FM interview, to verify |
| `docs/01b-logo-and-brand-analysis.md` | What the logo shows, palette, problems, neutrality risks |
| `docs/01c-public-record-and-positioning.md` | Confirmed public history, positioning choices, security implications |
| `docs/02-audience-and-goals.md` | Audiences, goals, success metrics |
| `docs/03-sitemap-and-pages.md` | Every page and its job |
| `docs/04-feature-and-tools-spec.md` | Donations, volunteers, events, petitions, CMS, and more |
| `docs/05-design-direction.md` | How to be distinctive, not generic |
| `docs/06-content-and-voice.md` | Tone, writing rules, story structure |
| `docs/07-tech-stack-and-architecture.md` | Recommended stack and structure |
| `docs/08-seo-accessibility-performance.md` | Quality floor |
| `docs/09-legal-compliance.md` | Privacy, donations, accessibility, transparency |
| `docs/10-build-roadmap.md` | Phased plan with approval gates |
| `docs/11-awards-and-launch-checklist.md` | Awwwards-level bar and launch checks |
| `docs/12-open-questions.md` | Decisions still needed |
| `docs/design/` | Design source of truth: brief, plan, tokens (+ `tokens.css`), typography, layout, hero, components, motion, imagery, copy, QA |
| `KICKOFF-PROMPT.md` | The first message to paste into Claude Code |
