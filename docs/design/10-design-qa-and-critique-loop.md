# Design QA and Critique Loop

## During each page build
1. Build to the tokens, type roles and wireframes.
2. Screenshot at 360, 768, 1280 and 1920 widths (Playwright). Review hierarchy, rhythm, contrast, and the first ten seconds.
3. Critique against `01-design-plan.md` and the generic-defaults table. Remove one accessory.
4. Record in `DESIGN-NOTES.md`: what you tried, what you cut, what you changed and why.

## CSS hygiene
Watch selector specificity. Avoid type-based and element-based selectors cancelling each other (for example a `.section` padding rule and a `.cta` margin rule). Use single-class components, cascade layers (`@layer base, components, utilities`), and logical properties.

## Checklist per page
- [ ] Uses only tokens; no hard-coded colors or sizes
- [ ] Only approved contrast pairs (`02-design-tokens.md`)
- [ ] No card grids, shadows, gradients, eyebrows, uppercase labels, mono labels, or "→"
- [ ] Hero is the only unprompted motion; reduced motion verified
- [ ] Body line length under 75ch; left-aligned
- [ ] Keyboard: visible focus, skip link, logical order
- [ ] Screen reader pass on key flows (join, county index, menu)
- [ ] Lighthouse 95+ (all four); LCP under 2.5s on throttled mobile
- [ ] Works on a low-end Android at slow 4G; JS budget respected
- [ ] Every number and claim sourced; placeholders logged
- [ ] Photos have consent, credit and alt text
- [ ] Copy follows `09`: verbs, sentence case, consistent names

## DESIGN-NOTES.md template
```
# Design notes
## Date / page
## What I tried
## What I cut and why
## Decisions (with reason)
## Open questions for the owner
## Map data source and license
## Fonts and licenses
```
