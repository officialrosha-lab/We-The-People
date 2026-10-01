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
| src/pages/join.astro | "What happens after you join" | How soon and who contacts a new member | Owner |
| src/components/ActionForm.astro | privacy lines under each form | Legal review of the one-line privacy statements; they promise use "only" for the stated purpose | Owner / legal |
| content/events/ (empty) | one file per event | Real events: title, summary, start (UTC, same as Monrovia time), place, optional end, county, `registration: true` to open sign-up | Owner |
| Formspree account | `FORMSPREE_URL` in src/lib/forms.ts | Create the form, set the notification inbox and the redirect to `/thanks/`, paste its address into `FORMSPREE_URL` (docs/13). Until then Send says nothing was sent | Owner |
| Brevo account | `BREVO_FORM_URL` in src/lib/forms.ts | Create the list and sign-up form with double confirmation on, share as Simple HTML, paste its action URL into `BREVO_FORM_URL`, set sender name and address (docs/13) | Owner |
| Brevo emails | sender, footer, unsubscribe | Registered organisation details for the email footer and a working unsubscribe link | Owner / legal |
| Privacy policy | processors | Name Formspree and Brevo as processors and where they store data | Owner / legal |
| content/record/2025-11-anti-drugs-school-visit.md | body | Independent coverage of the 18 Nov 2025 visit, if any (the Record cites the movement's own post, labelled as such); whether to name and quote the Secretary General. (School name confirmed by the owner: Old Voker Mission School, Paynesville City.) | Owner |
| content/CONSENT-LOG.md | school-visit photos | Owner states 100% consent (adults, school, guardians); confirm where the written records are kept and credit the actual photographer if not the movement | Owner |
| src/assets/photos/march-*.jpg | credit | Photographer credit, if not the movement itself | Owner |
| (not published) aerial crowd photo | watermark "SATEC IMAGE" | Written permission and credit from SATEC IMAGE before any use | Owner |
| content/record/2025-08-march-to-the-capitol.md | body | Independent coverage of the march; the "thousands" figure is the movement's own wording | Owner |
| content/stories/2025-08-march-to-the-capitol.md | partners | Full names and approved spellings of MOTARWY, EMSASA, GLHF (used exactly as written in the post); consent from each partner to be named | Owner |
| content/pages/transparency.md | Registration | Registration number, date and registering authority for We The People, Inc. (legal name confirmed by the owner) | Owner / legal |
\n| assets/video-pending/march-speech.vtt | all cues | Write and check the captions and transcript for the 90-second march speech; then move the video into `public/video/` and add the `video:` block (see assets/video-pending/README.md). Confirm consent covers the video and its audio | Owner |
| public/video/march-speech.mp4 | captions and transcript | Optional: write captions to `public/video/march-speech.vtt` and add `captions:` to the story (assets/video/README.md). Until then the page says the video has no captions. Also confirm consent covers the video's audio | Owner |
| content/pages/privacy.md | whole policy | Legal review. Fill: purposes, where Formspree and Brevo store data, retention periods, the contact for requests, applicable law, child-protection policy, date | Owner / legal |
| content/pages/accessibility.md | statement | Date and result of a manual screen-reader test; the contact for accessibility requests; add captions to the march video and remove the note about it | Owner |
| content/pages/press.md | contact, logos, fact sheet | Spokesperson and contact; downloadable logos (needs a vector logo); fact-sheet facts the movement approves; terms for press use of photos | Owner |
| public/og-default.png | image | Replace with a version using the real logo when it exists (`node scripts/build-og.mjs`) | Owner / designer |
