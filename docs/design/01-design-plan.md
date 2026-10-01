# Design Plan (proposed; owner approves in Phase 0, then it is locked)

## Compact token system
**Color (named, with roles)**
| Name | Hex | Role |
|---|---|---|
| Night | #071B3A | Dark ground, text on light |
| Navy | #0A2C63 | Brand navy from the logo; large color fields, headings on light |
| Flag red | #D6121C | Primary action, key moments; white text on it |
| Sun gold | #F5B700 | Single warm highlight, used rarely (the sun, one emphasis per page at most) |
| Chalk | #F2F4F7 | Light ground |
| Forest | #166B16 | Minor role from the logo's green figure (skills and growth content), used sparingly |

**Type**
- Archivo (variable: width and weight axes) for display, headings, navigation and interface. Ultra-condensed black for placard headlines, normal width for UI.
- Source Serif 4 (variable, optical size) for stories, long-form reading, and quotes.
- Two families that are clearly different in voice: signage versus the printed word.

**Layout concept**
A left-aligned, asymmetric 12-column grid with very large type and generous ground. Sections alternate between Night and Chalk to give the page a rhythm of "evening meeting" and "daylight work". Content is organized as editorial rows, ruled lists, full-bleed bands and splits; **not** as grids of identical cards. Left-aligned text everywhere; centered only for the final call to action.

```
HOME (desktop)
+------------------------------------------------------------+
| [icon] We The People Movement        About Work Join  [Join]|
+------------------------------------------------------------+
| ROLL CALL HERO (Night)                                      |
|  WE                      .  map of Liberia, 15 counties     |
|  (condensed black)       .  lighting up as names are called |
|  Fifteen counties. One table.                               |
|  [Join the movement]   Read what we stand for               |
+------------------------------------------------------------+
| STATEMENT (Chalk): one paragraph, large serif, left aligned |
+------------------------------------------------------------+
| WHAT WE ARE WORKING ON (Night): four ruled rows, no cards   |
|  Drugs and recovery ........................ read more       |
|  Skills in every county .................... read more       |
|  Financing for ordinary people ............. read more       |
|  Branches and community networks ........... read more       |
+------------------------------------------------------------+
| COUNTY INDEX (Chalk): 15 names, huge type, map on hover     |
+------------------------------------------------------------+
| RECORD (Night): dated timeline of real actions              |
+------------------------------------------------------------+
| VOICES (Chalk): one lead story large, others as a list      |
+------------------------------------------------------------+
| TABLE'S OPEN (Red band): join form, short                   |
+------------------------------------------------------------+
| FOOTER: neutrality statement, funding, registration, legal  |
+------------------------------------------------------------+
```

**Principles**
1. People and their words carry the site; the logo is a signature, not wallpaper.
2. Fifteen counties is the recurring structure.
3. One memorable moment (the Roll Call hero). Everything else is quiet and disciplined.
4. Neutral by design: no party symbols, colors used for meaning, flag motifs used as ideas, sparingly.
5. Plain language, sentence case, specific verbs.
6. Fast and readable on a low-end phone over a weak connection.

## Review against generic defaults (done once; Claude Code repeats it in Phase 0)
| Default | Check | Decision |
|---|---|---|
| Cream ground + high-contrast serif + terracotta accent | Ground is cool chalk, display is a condensed grotesque, accent is the flag red | Avoided |
| Near-black ground + single acid accent | Ground is deep navy, not tinted near-black, and the palette has defined roles for four colors from the movement's own identity | Avoided |
| Broadsheet with hairlines and zero radius | Rules appear only in the program list, where they separate real rows | Limited |
| Identical rounded cards, one radius, soft grey shadows, gradients | No card grids; no gradient washes; shadows not used; radius is 0 on blocks and 999px on buttons only | Avoided |
| ALL-CAPS tracked eyebrow above every heading, middle-dot strings, "WORD — fragment" labels, mono data labels, "→" on buttons | None used. Uppercase appears only in the hero and page-title placard type | Avoided |
| Big number with small label and gradient accent hero | Hero is a typographic and map sequence tied to the fifteen counties | Avoided |
| Nonprofit clichés (hands around globe, sad-child stock, "Together we can make a difference") | Real photography only; plain copy | Avoided |

What changed from the first draft: replaced a "stat strip" under the hero with the County Index; replaced equal feature cards with ruled rows; removed gold gradients; limited uppercase.

## Restraint
Spend the boldness on the hero. After building each page, remove one accessory.
