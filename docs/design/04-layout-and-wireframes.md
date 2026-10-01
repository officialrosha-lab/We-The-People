# Layout and Wireframes

## Grid
12 columns, 24px gutters at 1200px; outer margin `clamp(16px, 4vw, 64px)`. Left-aligned. Large type may span 10 to 12 columns and bleed past the margin. Body text sits in 6 to 7 columns (62ch).

## Section rhythm
Alternate grounds (`data-ground`): Night, Chalk, Night, Chalk... The red band (`data-ground="red"`) appears once per page, for the primary call to action. Never stack two sections of the same ground without a reason.

## Structure, not decoration
- **Ruled rows** only where each row is a real item (programs, press, events, timeline).
- **Numbers** only on the dated timeline.
- **No card grids.** Vary structures: ruled list, split, full-bleed band, oversized quote, index.

## Wireframes

### Home (mobile, 360)
```
[icon]                    [menu]
Night ground
WE
THE PEOPLE      <- hero placard, wraps by meaning
(map of Liberia, counties light up)
Fifteen counties. One table.
[Join the movement]
---------------------------------
Chalk: statement paragraph (serif)
---------------------------------
Night: what we are working on
 Drugs and recovery        >
 Skills in every county    >
 Financing                 >
 Branches                  >
---------------------------------
Chalk: county index (list, tap = county)
---------------------------------
Night: record (dated timeline)
---------------------------------
Chalk: lead story + list
---------------------------------
Red: Join (3 fields)
Footer
```

### Our Work (desktop)
```
Night: page title placard "OUR WORK"
12-col: left 5 cols = statement; right 7 cols = ruled program rows
Each program page: title | what is the problem | what we do | what has happened (sourced) | how to help
```

### County page (15 of them; template)
```
Chalk: county name in placard (left), map with this county filled (right)
Branch status and contact (only if provided), local activities, stories from this county, join this branch
```

### Join / Support
```
Red band at top with a short heading and the form (name, phone or email, county, how you want to help)
Below (Chalk): what happens after you join, privacy in plain words
```

### Story (reading page)
```
Chalk, single column 62ch, serif body
Headline in Archivo sentence case, byline, date, photo with caption
Pull quote in the margin on desktop, inline on mobile
End: one action related to the story
```

### Record (timeline)
```
Night: vertical timeline, dates left (tabular numerals), entries right, each entry linked to an independent source
```

## Responsive rules
- Hero placard scales with `--step-hero`; ensure "THE PEOPLE" never overflows at 360px.
- County index becomes a single-column list on mobile (no map on hover; tap opens the county page).
- Tap targets 44px minimum.
- Navigation collapses to a full-screen sheet at under 900px; keep Join visible outside the sheet.
