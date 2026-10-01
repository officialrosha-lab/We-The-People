# Signature Hero: "The Roll Call"

The single memorable element. Everything else stays quiet.

## Concept
On a Night ground, the page calls the roll of Liberia's fifteen counties. As each county name is called in the heavy condensed placard type, its region lights on a map of Liberia. When all fifteen are lit, the line resolves to the headline: **Fifteen counties. One table.** The idea: this movement belongs to every county, and the table has a seat for each.

The fifteen counties: Bomi, Bong, Gbarpolu, Grand Bassa, Grand Cape Mount, Grand Gedeh, Grand Kru, Lofa, Margibi, Maryland, Montserrado, Nimba, River Cess, River Gee, Sinoe.

## Sequence (about 6 seconds, plays once per session)
1. 0.0s Night ground. The word WE appears in the placard at the left, large.
2. 0.4s to 4.4s County names step through quickly (about 270ms each), set in a single moving line beneath WE; each triggers its region on the map to fill with a color (Flag red for the first region, then navy, white or gold accents by role, see below).
3. 4.4s All counties lit. The names collapse into the line "THE PEOPLE".
4. 5.2s The H1 and subhead settle in; Join button and link appear (opacity only).
5. Final state is stable and readable. Nothing continues to loop.

Skip control: any click, key press or scroll jumps to the final state.

## Color use in the map
- Unlit county: outline only, Chalk at 25% on Night.
- Lit county: fill rotates through the logo's four colors by a simple fixed rule documented in `DESIGN-NOTES.md` (for example by region group), never by political association. Do not map colors to parties, tribes or ethnic groups. When in doubt use a single color (white) for all lit counties.

## Map data
- Use a real boundary dataset with permissive licensing, for example **Natural Earth** admin-1 (public domain) or another source whose license permits web use. Record the source and license in `DESIGN-NOTES.md`.
- Simplify with mapshaper or topojson tools; target under 40 KB of inline SVG; keep county identifiers (`id="county-lofa"`, etc.).
- Do not hand-draw the map. Verify county names and boundaries against an official source.

## Accessibility
- The map is decorative during the sequence (`aria-hidden`); a visually hidden list of the fifteen counties gives the same information.
- `prefers-reduced-motion`: render the final state immediately, no animation.
- No auto-playing sound. Never flash faster than 3 times per second.
- The H1 is in the DOM from first paint (not injected by the animation) so screen readers and search engines see it.

## Performance
- Animate with CSS transforms, opacity, and SVG attributes; no animation library needed.
- Hero JS under 10 KB; no layout shift; the first paint shows the final-state headline in the right place before the sequence enhances it.
- No-JS: static final state.

## Alternates (only if the owner rejects the Roll Call)
- **Round Table**: a circle of real community portraits and quotes; hover or focus plays a voice clip (requires consent and audio rights).
- **Placard wall**: a typographic wall of short community-written demands and offers, moderated.
Claude Code presents these as sketches in Phase 0 only if asked.
