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
| src/pages/join.astro | "What happens after you join" | How soon and who contacts a new member | Owner |
| src/components/ActionForm.astro | privacy lines under each form | Legal review of the one-line privacy statements; they promise use "only" for the stated purpose | Owner / legal |
| content/events/ (empty) | one file per event | Real events: title, summary, start (UTC, same as Monrovia time), place, optional end, county, `registration: true` to open sign-up | Owner |
| Formspree account | `PUBLIC_FORMSPREE_ENDPOINT` | Create the form, set the notification inbox and the redirect to `/thanks/`, copy the endpoint into the build environment (docs/13) | Owner |
| Brevo account | `PUBLIC_BREVO_FORM_URL` | Create the list and sign-up form with double confirmation on, share as Simple HTML, copy the action URL, set sender name and address (docs/13) | Owner |
| Brevo emails | sender, footer, unsubscribe | Registered organisation details for the email footer and a working unsubscribe link | Owner / legal |
| Privacy policy | processors | Name Formspree and Brevo as processors and where they store data | Owner / legal |
