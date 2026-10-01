# Design notes

## Date / page

2026-10-01, Phase 0 (no pages built).

## Understanding (10 lines)

1. We The People Movement is a Liberian, non-party civic movement: one neutral table for every party, faith, profession and background.
2. Founding statement (old radio interview, unverified): shift attention from politics to development; partners, not enemies.
3. Founding priorities: drugs and recovery, vocational schools in every county, access to financing, branches nationwide; safe water also mentioned.
4. Public record (confirmed by owner): July 2025 coalition peaceful protest and petition with STAND; 14-day ultimatum.
5. Owner says these are one movement, two chapters. Site tells founding, record, current work as one story.
6. Audience: Liberians in all counties (low-end phones, weak networks), diaspora, youth, partners, media.
7. Job of the site: in ten seconds, say what we stand for; make joining, supporting and following simple.
8. Feeling: belonging. Motif: fifteen counties, one table.
9. Logo is a low-res JPG on black; a vector rebuild or original is needed.
10. Almost all proof (numbers, stories, people, registration, funding) is `[FILL]`; nothing may be invented.

## Assumptions

- Formal name "We The People Movement" (logo); short form "We The People".
- Launch language is English, with i18n-ready routing.
- Launch actions: Join, Volunteer/Branch, Follow. **Give is deferred** until payments and legal status are known.
- Interview numbers (e.g. drug figures) are not published.

## Blocking `[FILL]` items

- **Design-blocking:** logo vector/ownership (Q16); official name (Q14); languages (Q7); neutral-palette check against Liberian party colours (01b; red/white/blue and green carry risk); county name spellings; approved hero copy.
- **Content-blocking:** positioning 1/2/3 (Q17); founder/spokesperson and roles; STAND relationship and petition status (Q18); timeline and achievements (Q19); contacts, registration, funding statement.
- **Feature-blocking:** payments (Q1, Q6); CMS editor (Q9); tools in use (Q8).

## Review of `docs/design/01-design-plan.md`

Mostly sound; avoids the generic defaults. Changes I would make:

1. **Palette vs party colours.** The plan's own check is unfinished. Red/navy/white are the flag; get local advice before locking. Fallback: lit counties all white (the roll-call doc already allows it).
2. **Gold rarely, red on Night is large-type only.** Fine; enforce with a lint rule on token pairs.
3. **Uppercase hero in ultra-condensed 900 at 360px.** "THE PEOPLE" may be tight; test with real Archivo width axis before approving.
4. **The "County index" and the hero both show 15 counties.** Keep the index but drop hover-map on touch (already planned); no extra stat strip.
5. **Forest green** has no use in the plan beyond skills content. Keep it out of the hero (party-colour risk) until advised.
6. **Spelling:** doc says "Gbarpolu"; Natural Earth says "Gbapolu". Confirm official spelling before shipping.
7. **Timeline needs sources.** Until owner supplies them, Record shows one entry (July 2025) with a `[PLACEHOLDER: link]`.
8. **Give is absent from nav at launch** if payments are unconfirmed; nav stays About, Our Work, Stories, Join.

## Hero concepts

**A. Roll Call (default, `docs/design/05`).** Night ground, "WE" in placard type. County names step through at ~270ms and fill the map; resolves to "Fifteen counties. One table." About 6s, once per session, skippable, static final state without JS.

```
+--------------------------------------+
| WE                       .--.        |
| BONG..GBARPOLU..LOFA   .-'  '-.      |
| (names step; map fills) '-.  .-'     |
| FIFTEEN COUNTIES.          '--'      |
| ONE TABLE.  [Join the movement]      |
+--------------------------------------+
```

**B. The Table.** A round table seen from above: fifteen chairs on a circle, each labelled by county. Scrolling or tapping seats shows a real, consented voice from that county. Risk: needs 15 real voices; empty seats at launch would read as failure. Revisit once content exists.

```
        (Lofa)  (Bong)
   (Nimba)  [ TABLE ]  (Bomi)
        (Sinoe) (Maryland)
```

**C. Placard Wall.** A typographic wall of short community-written demands and offers, moderated. Risk: moderation burden and safety; needs a policy first.

```
| LESS POLITICS | SKILLS IN LOFA |
| SAFE WATER    | LOANS FOR US   |
```

**Recommendation: A.** It needs no unavailable content, works as static HTML, and carries the fifteen-county idea.

## Map data source and license

- Source: Natural Earth, 1:10m Admin 1 states/provinces (public domain). Retrieved 2026-10-01 from github.com/nvkelso/natural-earth-vector. Contains 15 Liberia features.
- Cross-check candidate: geoBoundaries LBR ADM1 (CC BY 3.0 IGO, UNMIL/OCHA ROWCA), attribution required.
- Not yet done: simplification to <40 KB SVG with `id="county-<slug>"`, and verification of names/boundaries against an official source (Liberia Institute of Statistics and Geo-Information Services). Names in Natural Earth: "Gbapolu" and "River Gee" carry non-standard ISO codes (LR-X1, LR-X2).

## Fonts and licenses

Archivo and Source Serif 4: SIL Open Font License. Verify Liberian name glyph coverage before approving.

## What I cut / open questions for the owner

Nothing built yet. Questions: see "Blocking" above. One batch only: logo files, official name, positioning option, languages, party-colour advice, payments, launch actions.

## Phase 1 (2026-10-01): foundation

**Built:** Astro static site, tokens + global CSS in cascade layers, Base layout, header, footer, home shell (static hero final state, statement, program rows), 404, seven stub pages, content collections with Zod schemas, seeded placeholder content, axe tests, CI workflow.
**Tried:** hero at `--step-hero` overflowed at 360px ("COUNTIES." is wider than "THE PEOPLE"). Cut to `clamp(3rem, 2rem + 11vw, 11rem)`, `overflow-wrap: anywhere`, break on meaning. Header stacks under 600px.
**Cut:** mobile full-screen menu sheet (three links + Join fit without it; revisit when nav grows). Join form (Phase 4).
**Decisions:** tokens copy only adds Fontsource family names ("Archivo Variable", "Source Serif 4 Variable"). Header mark is a flagged stand-in SVG, not the logo.
**Open for owner:** real vector logo; production domain; neutrality wording.

## Phase 2 (2026-10-01): Roll Call hero

**Built:** `src/components/RollCall.astro`; `scripts/build-map.mjs` regenerates `src/data/liberia-map.json` from `scripts/data/liberia-counties.geojson` (Natural Earth admin-1 extract, public domain). Map is 6 KB, ids `county-<slug>`, simplified with mapshaper (20%, keep-shapes), equirectangular scaled by cos(6.5°).
**Behaviour:** counties are called alphabetically, 270ms each, starting at 0.4s; at about 4.4s the line resolves to "THE PEOPLE"; at about 5.2s the headline, subhead and actions fade in (opacity only). Plays once per session (sessionStorage). Click, key, wheel or touch skips to the final state. Reduced motion, no JS, or a failed script all show the final state; an 8s safety timer clears the pre-state if the script never runs. The H1 and a visually hidden list of the 15 counties are in the HTML from first paint; the map and placard are `aria-hidden`.
**Colour rule:** every lit county is white. The party-colour check (docs/01b) is still open, so no rotation through red, navy, gold or green. Revisit only after local advice.
**Tried and fixed:**

- Layout shift was 0.18 on mobile: the reserved line height used `em` on the element whose font size changed. Moved the reservation to a wrapper; CLS is now 0.002 (360px) and 0.03 (1280px).
- On mobile the map sat below the fold, so nothing visibly lit during the sequence. Reordered the grid: placard, map, then copy.
- Phase 1 header fix had never applied (Prettier reformatted the string I replaced). Header now stacks under 600px and the button no longer wraps. Button hover is an underline: a Night hover colour made the button vanish on dark grounds.
  **Cut:** per-county colours; a looping or idle map animation; a county tooltip (the County Index in Phase 3 covers it).
  **Not done / open:** Lighthouse scores and a real low-end phone test (owner reaction is the Phase 2 gate); verify county names and boundaries against an official source (Natural Earth spells it "Gbapolu", kit and this site use "Gbarpolu"; confirm); the 15-name stepping changes text about 3.7 times a second, which is not a luminance flash, but a reviewer should confirm.

## Phase 2 follow-ups resolved (2026-10-01)

**Spelling.** "Gbarpolu" is correct: the Executive Mansion (emansion.gov.lr) and the National Elections Commission (necliberia.org) both use it; Natural Earth's "Gbapolu" is a data-source variant. The Elections Commission also writes "Rivercess" (one word) in its district files, so the site now uses **Rivercess** (the kit's "River Cess" is the variant). `River Gee` is unchanged. Boundaries still come from Natural Earth; a second source (geoBoundaries ADM1, CC BY 3.0 IGO, UNMIL/OCHA) exists if a cross-check is wanted. Owner can overrule either spelling in `scripts/data/liberia-counties.geojson`, then run `node scripts/build-map.mjs`.

**Party colours.** Public sources checked: CDC's constitution sets its colours as "that of the rainbow" (logo adds green, sun, rainbow); Unity Party is green, white and maroon/brown; Liberty Party is green and white. So green is party-associated (UP, LP) and the rainbow is CDC's: no single use of red, navy, white or gold maps to one party from these sources, but green is the clear risk. Decision: lit counties stay white; Forest green stays out of the hero and out of any county or region coding, and is only for skills and growth content if at all. The movement's 2025 protest was led by a former CDC chairman and endorsed by the CDC Youth League (docs/01c), which makes the neutrality statement and a colour-neutral map more important, not less. Local advice remains the owner's call; the sources above are public and secondary.

**Flicker (WCAG 2.3.1).** Two measures. (1) Area: pixel diff between consecutive county names, counting pixels with more than 10% relative-luminance change: 2,013 px at 360px wide, 13,844 at 1280, 14,268 at 1920, against the general-flash area limit of about 21,824 px (25% of a 10-degree field). (2) Rate: step slowed from 270ms to 340ms, 2.9 changes a second, under the three-per-second limit whatever the area. Each county fill happens once and never reverts, so it never forms an on-and-off pair. Sequence now about 6.3s, still skippable.

## Phase 3 (2026-10-01): core pages

**Built:** About, Our work + 4 program pages, Counties index + 15 county pages, Record, Stories (list + story template, empty state), Transparency, Contact, Join (page and structure; form is Phase 4), 404. Home gains the Find your county index, The record, and the single red call-to-action band. All content is Markdown in `content/`. Nothing requires an account: there is no login, admin or session anywhere.
**Rules applied:** no invented facts; every unknown is a `[PLACEHOLDER]` logged in `content/PLACEHOLDERS.md`. Stories require `consent: true` in the schema, so a story cannot build without it. The two July 2025 record entries show "source" placeholders and are not to be published until sourced. The movement's 2025 spokesperson is deliberately **not named** on the site (docs/01c asks for legal review of named individuals).
**County pages:** Chalk top with the county in placard type and a navy-filled map, Night below. Navy, not a party-associated colour. Branch status shows only when a `content/counties/<slug>.md` file exists.
**Tried and fixed:** frontmatter with a colon broke the build (values now quoted); the reading-width rule centred text blocks (fixed with `.wrap.prose > *`); `PageHeader` prop types under `exactOptionalPropertyTypes`.
**Cut:** an Impact page (no verified numbers exist; the roadmap lists it, but an empty one would invite invented figures); expandable program rows (each program is its own page, which works without JS and is easier to share by WhatsApp); a Voices section on Home (no consented stories yet); the Give module (payments unconfirmed).
**Checks:** 31 pages build; 486 internal links, none broken; axe clean on all 18 tested paths.
**Open:** Join form and all action systems are Phase 4; privacy and accessibility pages are stubs awaiting legal review.

## Phase 4 (2026-10-01): action systems (no petitions, payments or Give)

**Built:** one `ActionForm` component for four forms: Join (name, email or phone, county, how to help), Contact, Event registration, Newsletter (email only, in the footer). Events: list (upcoming and past), event pages with registration and a generated `.ics` file, empty state. Thank-you page. Forms post to the endpoint in `PUBLIC_FORM_ENDPOINT` (D8).
**Behaviour:** visible labels; errors say what is wrong and how to fix it, no apologies; first invalid field gets focus; the Send button shows progress and re-enables on failure; success replaces the form and names where we will make contact. Hidden honeypot field. No CAPTCHA. Works without JS (plain POST).
**Honest states:** no endpoint means the forms are disabled with a notice instead of pretending to send, and the footer newsletter box is hidden entirely.
**Tried and fixed:** axe rejected `autocomplete="email tel"` on the combined "Email or phone" field, so that field has no autocomplete token; the footer newsletter notice appeared on all 33 pages before an endpoint exists, so it is now hidden; the newsletter privacy line wrongly said "respond to this form"; on red the focus ring was gold (2.97:1 against the red), now white.
**Cut:** campaign template and progress bars (they need live totals, which belong with the petition and payment tools that are out of scope); peer-to-peer pages; per-event capacity counts (no backend to count them); a volunteer-skills form separate from Join (the "How do you want to help?" boxes cover it until the owner says otherwise); in-kind donations (payment-adjacent).
**Testing:** 42 Playwright tests. Tests build with a mock endpoint and `tests/fixtures/events` (clearly labelled test data); `content/events` stays empty. Covered: empty submit, short phone, valid submit posts once, server failure keeps the form, honeypot sends nothing, keyboard-only use, newsletter, contact, event listing and registration, `.ics` content, past events have no registration, and axe on each page and with errors showing. Axe also checked on the production (no-endpoint) build.
**Needs a human:** a real submission to the chosen provider on the live site; screen-reader pass on the Join flow (NVDA or VoiceOver); legal review of the privacy lines; a scheduled daily rebuild once events exist (upcoming versus past is decided at build time).

## Phase 4 follow-up (2026-10-01): Formspree and Brevo wired

**Changed:** forms now target the two chosen services instead of a generic endpoint. Honeypot field names, hidden fields and the posted field names match each provider (`_gotcha`, `_subject`, `email` for Formspree; `EMAIL`, `locale`, `html_type`, `email_address_check` for Brevo). The newsletter posts URL-encoded and does not wait for a readable reply.
**Honest limits:** neither integration has been tried against a live account. Tests intercept every request to both providers, so they prove the payloads and the interface, not delivery. A real test submission on the live site is a launch blocker (docs/13, "Before launch").
**Tried and fixed:** none of the previous tests broke; the new build guard was verified against a foreign domain, plain `http`, and a look-alike domain (`formspree.io.evil.example`).
**Tests:** 46 passing, including Brevo field names and content type, the Brevo honeypot, "newsletter never posts to Formspree", Formspree `Accept` header, subject, reply-to email, empty `_gotcha`, and "a phone number is not sent as a reply-to".

## Phase 4 follow-up 2 (2026-10-01): forms always shown, no settings

**Changed:** removed the disabled button, the "not accepting submissions" notice and the hidden newsletter box. Forms are always visible and enabled. The two addresses are plain constants in `src/lib/forms.ts`. With an empty address Send validates, then says "This form is not switched on yet. Nothing was sent." and sends nothing.
**Checked on a plain build with no variables:** the newsletter form appears on every page; no button has a disabled attribute; Join and Newsletter both showed the not-switched-on message with zero POST requests; axe: 0 violations on home, join, contact and events.
**Tests:** 48 passing, including a valid form making no request and not claiming success, and invalid input still being caught first.
**Open:** until real addresses are pasted in, visitors who press Send are told nothing was sent. That is accurate but means no sign-ups are collected; connecting the accounts before the site is public avoids it.

## Photos and first story (2026-10-01)

**Added:** the 18 Nov 2025 school visit as a story (`content/stories/2025-11-school-visit.md`), five photos, a `Photo` component, a lead-story layout on Stories and Home, and a link-preview image. The school is Old Voker Mission School, Paynesville City (confirmed by the owner).
**Photography rules applied:** full colour, no overlay or duotone; documentary framing; explicit width and height; AVIF, WebP and JPEG at four widths; only the lead photo loads eagerly; alt text describes what is visible and names no one; credit line on every photo. Photos do not carry the logo and are not placed on a coloured block.
**Consent:** the owner states 100% consent, including the school and guardians. It is recorded as a statement in the consent log, with the written records held by the owner. Because the students are minors, the owner should keep the school's permission letter on file and be ready to remove a photo promptly if anyone asks.
**Layout:** story page is a headline, lead photo, 62-character text column, then an uneven two-column photo sequence (portrait photos in the narrow column). No card grid.
**Tried and fixed:** top-edge black line and grey strip removed by cropping 5 and 8 pixels; the link-preview tag briefly broke the build (an HTML comment inside a JSX expression); a stray `$S` folder created by my own screenshot script was deleted.
**Left out:** the Secretary General's name and quote, pending the owner's yes. The talk photo is a video still, so it is shown at the smaller width.
**Tests:** 55 passing, including alt text on all five photos, explicit sizes, eager-lead and lazy-rest loading, AVIF and WebP sources, the preview image, no horizontal scroll at 360px, and under 1 MB of photos on a phone-sized screen.

**Source for the school visit (2026-10-01):** the owner supplied the movement's Facebook post (https://www.facebook.com/share/p/1DtP4RjrKs/; the owner's link used the web.facebook.com host, normalised to www.facebook.com). I could not open it (Facebook shows a login page to automated readers); it matches the screenshot the owner sent. The Record shows it with the label "The movement's own post on Facebook", because it is the movement's own statement, not independent coverage. The Record schema gained a `sourceLabel` for this reason.

## Second story: the 7 August 2025 march (2026-10-01)

**Added:** `content/stories/2025-08-march-to-the-capitol.md` (six photos), a Record entry, and a line on the Drugs and recovery page. Built from the movement's own statement of 7 August 2025 (https://www.facebook.com/share/p/19PdFWZwjr/, normalised to www; not openable by automated readers, matches the screenshot supplied). The story and Record label it as the movement's own statement.
**What this changes for the site:** the movement's most visible public action is a march against drugs, under "Protect our youth, save our future". That supports leading with the neutral, development-and-youth framing already used on the home page, and it gives the Drugs and recovery priority real, dated evidence. The July 2025 governance protest and this August drugs march are separate events; both are on the Record.
**Choices:** six photos chosen to show the banner, the date sign, the rain, the speakers and the press; no one in the photos is named; the aerial photo is excluded because of its third-party watermark; close-ups of individuals are excluded; the quote "community by community, school by school, street by street" is the statement's own words and is not attributed to a named person.
**Open:** consent for this batch (provisional), photographer credit, the legal name "We The People, Inc.", partner organisations' approval to be named, independent coverage. All logged.
