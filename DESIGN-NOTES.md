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
