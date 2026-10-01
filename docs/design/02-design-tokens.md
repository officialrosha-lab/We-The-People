# Design Tokens

Source of truth is `tokens.css` (same folder). Copy it to `src/styles/tokens.css`. Never hard-code colors, sizes or durations in components.

## Verified contrast (WCAG 2.2, computed)
| Pair (text on ground) | Ratio | Use |
|---|---|---|
| Night on Chalk | 15.5 | Body and headings on light |
| Muted (#4A5873) on Chalk | 6.5 | Secondary text on light |
| Navy on Chalk | 12.3 | Headings on light |
| Flag red on Chalk | 4.8 | Links and small red text on light (AA) |
| White on Flag red | 5.3 | Buttons |
| Forest on Chalk | 6.1 | Minor accents on light |
| Chalk on Night | 15.5 | Body on dark |
| Light muted (#B6C2D9) on Night | 9.5 | Secondary text on dark |
| Sun gold on Night | 9.5 | Highlights on dark |
| Sun gold on Navy | 7.5 | Highlights on navy |
| Red tint (#FF5A60) on Night | 5.6 | Small red text on dark |
| Flag red on Night | 3.2 | Large type and graphics only (not small text) |

**Forbidden pairs**
- Flag red on Navy (2.6) and Night text on Flag red (3.2).
- Gold as text on Chalk (use the dark gold #7A5A00, 5.8, if ever needed).

## Spacing, radius, elevation
- 8px base unit; scale 4, 8, 16, 24, 40, 64, 104, 168.
- Radius: 0 for blocks and images; 999px only for buttons and form pills. No in-between radii.
- No box shadows. Depth comes from ground color changes.

## Breakpoints
360, 600, 900, 1200, 1600. Design mobile-first.

## Motion
Durations 120, 240, 480 ms. Easing: `cubic-bezier(.2,.7,.2,1)`. See `07-motion-and-interaction.md`.
