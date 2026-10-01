# Placeholders

Claude Code appends every unresolved placeholder here: file, location, what is needed, who can supply it.

| File | Location | Needed | Who supplies |
|---|---|---|---|
| astro.config.mjs | `site` | Production domain | Owner |
| content/pages/neutrality.md | body | Approved neutrality statement | Owner |
| content/programs/*.md | body | What the movement is doing now, per program | Owner |
| content/record/2025-07-peaceful-protest.md | body | Source link to independent coverage | Owner |
| src/components/Footer.astro | registration, contact, funding | Legal registration, contact details, funding statement | Owner |
| public/mark-placeholder.svg | whole file | Real vector logo (current mark is a stand-in) | Owner / designer |
| src/pages/*.astro (about, our-work, stories, join, contact, privacy, accessibility) | whole page | Page content; built in Phase 3/4 (legal pages need review) | Owner / legal |
| content/pages/about.md | Where we come from | Founding date and how the movement began | Owner |
| content/pages/about.md | People | Founder, spokesperson and leadership names, roles, bios, consent | Owner |
| content/pages/about.md | How we work | Approve the wording of the three principles (interview wording is unverified) | Owner |
| content/pages/transparency.md | all sections | Governance, registration, funding, policies | Owner / legal |
| content/pages/contact.md | all sections | Email, phone or WhatsApp, postal address, press contact | Owner |
| content/pages/join.md, src/pages/join.astro | form, what happens next, privacy | Join form (Phase 4), follow-up promise, privacy wording (legal review) | Owner / legal |
| content/programs/*.md | "What has happened", "How to help" | Real actions with dates and sources; specific ways to help | Owner |
| content/programs/drugs-and-recovery.md | What we aim to do | A safe, legally reviewed way for communities to raise drug concerns (anonymity, moderation) | Owner / legal |
| content/record/*.md | body | Source links for both July 2025 entries; what the petition asked for; what happened next | Owner |
| content/counties/ (empty) | one file per county | Branch status and contact, only when real. Add `<slug>.md` with `branchStatus` and `contact` | Owner |
| content/stories/ (empty) | one file per story | Stories with documented consent; add to CONSENT-LOG.md first | Owner |
| src/pages/privacy.astro, accessibility.astro | whole page | Privacy policy and accessibility statement, drafted for legal review | Owner / legal |
| .env / hosting settings | `PUBLIC_FORM_ENDPOINT` | Choose a hosted form provider and set its endpoint. Until then Join, Contact and Event forms show a "not accepting submissions" notice and the footer newsletter box is hidden | Owner |
| Form provider settings | confirmation redirect | Set the provider's redirect to `/thanks/`; route submissions to the right inbox; turn on its spam filtering | Owner |
| Newsletter provider | double opt-in, unsubscribe | Confirmation email and one-click unsubscribe must come from the provider; the site cannot enforce them | Owner / legal |
| src/pages/join.astro | "What happens after you join" | How soon and who contacts a new member | Owner |
| src/components/ActionForm.astro | privacy lines under each form | Legal review of the one-line privacy statements; they promise use "only" for the stated purpose | Owner / legal |
| content/events/ (empty) | one file per event | Real events: title, summary, start (UTC, same as Monrovia time), place, optional end, county, `registration: true` to open sign-up | Owner |
