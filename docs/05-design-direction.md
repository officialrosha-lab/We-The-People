# 05 — Design Direction: Distinctive, Not Generic

The goal is a site nobody could mistake for a template. The organization's real story, materials, language, and community supply the visual ideas.

## Step 1: Ground it in the subject
Before designing, write a 5-line proposal: what We The People is, who the audience is, the primary job of the site, the single feeling a visitor should have, and one visual idea drawn from the organization's world (its place, history, materials, voice). Confirm it with the owner. Use `docs/01-org-brief.md` as the source.

## Step 2: Design plan (before any code)
Produce a compact token system and wireframes:
- **Color**: 4 to 6 named hex values with roles. Check contrast to AA.
- **Type**: one or two families with clearly distinct roles; a defined type scale; line length under ~75 characters for body text; serif body gets slightly more line-height.
- **Layout**: a concept in one sentence plus ASCII wireframes for Home, a program page, Donate, and a Story. State alignment rules.
- **Motion**: one orchestrated signature moment (usually the hero) and motion that responds to user actions. Nothing else animates by default.
- **Principles**: what makes this site unlike any other nonprofit site.

## Step 3: Review against the generic defaults
Rewrite any part of the plan that matches these common tells:
1. Warm cream background with a high-contrast serif and a terracotta accent
2. Near-black background with a single acid-green or vermilion accent
3. Broadsheet layout with hairline rules and zero radius everywhere
4. Identical rounded cards, one radius, the same soft grey shadow, gradient washes
5. Chrome that appears on every site: tracked ALL-CAPS eyebrow above every heading, middle-dot meta strings, "WORD — fragment" labels, monospace data labels, "→" on every button
6. Nonprofit clichés: hands-holding-globe stock photos, sad-child-on-white-background imagery, blue-and-orange "trust" palettes, hero with a big number and gradient accent, "Together we can make a difference" copy

These are fine when the brief demands them, but they are defaults, not choices. Write down what changed and why.

## Step 4: Typography rules
- No accenting a single headline word with italic or color
- No ALL-CAPS labels as a habit
- No decorative labels above content
- Numbered markers only for genuine sequences
- Make the headline type itself an active design element where it fits

## Step 5: Spend boldness in one place
One memorable element (a hero interaction, an extraordinary use of type, an unexpected navigation idea). Everything around it stays quiet and disciplined. Before finishing a page, remove one accessory.

## Imagery and media
- Real people, real places, with consent and dignity. Show people as agents, not victims. Credit photographers.
- Prefer commissioned or community-made imagery, illustration, or typography over stock.
- Every image has a purpose, meaningful alt text, and an optimized responsive source.
- Video is captioned with transcripts; audio has transcripts.

## Interaction
- The Give button is always visible and never sticky-obnoxious
- Forms are short, labeled, forgiving, and keyboard friendly
- Error and empty states give direction, not mood

## Self-critique loop
Screenshot at 360, 768, 1280, and 1920 widths. Critique hierarchy, rhythm, contrast, and first-impression clarity. Log notes in `DESIGN-NOTES.md` (what was tried, what was cut).
