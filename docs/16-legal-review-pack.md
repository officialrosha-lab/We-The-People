# 16. Legal review pack

For a qualified person (a lawyer with knowledge of Liberian law and, where supporters live abroad, the relevant privacy law). Nothing here is legal advice; it lists the texts and choices that need a professional decision before launch. Each item names the file so the lawyer can read exactly what is published.

## Texts to review
| # | Text | File | Question for review |
|---|---|---|---|
| 1 | Privacy policy | `content/pages/privacy.md` | Is it accurate and sufficient? Fill the marked gaps: purposes, retention, where Formspree and Brevo store data, applicable law (Liberia; GDPR/UK GDPR/other for supporters abroad), the contact for requests, the child-protection policy. |
| 2 | Accessibility statement | `content/pages/accessibility.md` | Is the wording of the known gap (video without captions, no manual screen-reader test yet) acceptable? Does any local rule require more? |
| 3 | Neutrality statement | `content/pages/neutrality.md` (shown on About and in every footer) | The movement says it is not a political party and engages government and opposition as partners, and it also has a record of public protest and a petition. Is the wording accurate and safe? |
| 4 | Legal name and registration | `content/pages/transparency.md`, footer | Legal name is "We The People, Inc." Supply registration number, date, authority, status (non-profit?), and what must be disclosed. |
| 5 | Press and contact pages | `content/pages/press.md`, `contact.md` | Spokesperson, address and contact; any disclosure the law requires. |

## Facts that are stated publicly and need a source or sign-off
| Item | File | Note |
|---|---|---|
| July 2025 protest notice and petition (15 to 17 July; 14-day deadline; Article 17 of the 1986 Constitution; the STAND coalition) | `content/record/2025-07-*.md` | From news coverage the owner confirmed; no source links yet. Check each fact against a primary source. No individual is named. |
| 7 August 2025 march | `content/record/2025-08-march-to-the-capitol.md`, `content/stories/2025-08-march-to-the-capitol.md` | Based on the movement's own statement. The word "thousands" is the movement's own. |
| Six partner organisations named (MOTARWY, West Africa Drug Policy Network, LIBxRecords Foundation, EMSASA, Justice Forum of Liberia, GLHF) | the march story | Written exactly as in the movement's statement. Do they consent to being named, and are the spellings and descriptions ("affiliate") accurate? |
| 18 November 2025 school visit | `content/record/2025-11-*.md`, `content/stories/2025-11-school-visit.md` | The school is named (Old Voker Mission School). Confirm the school's permission to be named. |

## People, photographs and video
- Photographs and video of students (minors) and of marchers, speakers and public figures are published. The owner states full consent was obtained, including from the school and guardians; written records are held by the owner. See `content/CONSENT-LOG.md`.
- Questions: Is the owner's statement of consent enough, or should written consents be collected and filed? Is a child-safeguarding policy required? Should any photo be removed or cropped? May the site name any person shown? (It names none.)
- One aerial crowd photo carries a third party's watermark ("SATEC IMAGE"). It is **not** used; the owner is to obtain permission first.
- The march-speech video has no captions and may include speech by people who have not been named; the audio consent is an open item in the consent log.

## Forms and data collection
- Join, Contact, Event and Newsletter forms collect names, email or phone, county, interests and messages. They go to Formspree (forms) and Brevo (newsletter). Review: lawful basis, notices on the forms, cross-border transfer, retention, deletion on request, and that the newsletter uses double confirmation and an unsubscribe link on every email.
- The site sets no cookies and has no analytics or advertising. It stores one flag in the visitor's browser for the visit only (to play the opening animation once). Confirm no consent banner is needed.
- Each form has a one-line privacy statement in `src/components/ActionForm.astro` ("We use your details only to ..."). Confirm the wording does not over-promise.

## Rights and ownership
- Logo: ownership of the original files is not yet confirmed (`docs/12`, question 16). The site uses a stand-in until the vector logo is supplied.
- Fonts: Archivo and Source Serif 4, SIL Open Font License (free to use and embed).
- County map: Natural Earth, public domain.
- Photographs: credited "We The People Movement"; the actual photographers are not yet identified. Do they need credit, or have they assigned rights?

## Not built, so not covered
Donations, payments and petitions were excluded by the owner. If added later they need their own terms, receipts, refund and data rules before launch. No separate Terms of Use page exists; decide whether one is needed.
