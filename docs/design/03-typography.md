# Typography

## Families (self-host with Fontsource or local files; subset to Latin and Latin Extended; `font-display: swap`; no third-party font requests)
- **Archivo** (variable, width 62 to 125, weight 100 to 900). Display, headings, navigation, buttons, forms, captions.
- **Source Serif 4** (variable, optical size). Story text, statements, pull quotes.

Check that both support the names, diacritics and characters needed for Liberian names and local languages in use. If a local-language orthography needs more glyphs, test it before approving the fonts.

## Roles
| Role | Family and setting | Size token |
|---|---|---|
| Hero placard | Archivo, width 62, weight 900, uppercase, line-height 0.88, letter-spacing -0.01em | `--step-hero` |
| Page title | Archivo, width 75, weight 800, uppercase | `--step-4` |
| Section heading | Archivo, width 90, weight 700, sentence case | `--step-3` |
| Subheading | Archivo, width 100, weight 650, sentence case | `--step-2` |
| Statement | Source Serif 4, optical size auto, weight 400, line-height 1.3 | `--step-2` to `--step-3` |
| Body | Source Serif 4, weight 400, line-height 1.65, max 62ch | `--step-0` |
| UI, nav, buttons | Archivo, width 100, weight 600, sentence case | `--step--1` to `--step-0` |
| Caption, meta | Archivo, width 100, weight 500, muted | `--step--1` |

## Rules
- **Uppercase only** for the hero placard and page titles. Never for labels, eyebrows, navigation or buttons.
- No accenting one word or phrase in a headline with a different color, italic or weight.
- No eyebrow labels above headings. If content needs context, put it in the heading or a sentence.
- Numbers (01, 02) only when the content is a real sequence (the dated timeline).
- Line length: body max 62ch, never above 75ch.
- Use real italic and bold from the font files, not synthesized.
- Use tabular numerals for dates, amounts and counts.
- Headline type is a design element: let the hero and page titles bleed off the grid edge, set tight, and break lines on meaning, not on width.
- Left-align all text. Do not justify. Center only the final call to action.
