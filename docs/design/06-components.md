# Components

General: no identical card grids, no shadows, radius 0 on blocks, pill only on buttons and inputs, no gradient fills, no "→" on links or buttons.

| Component | Purpose and rules |
|---|---|
| **Header** | Icon-only mark + "We The People Movement" in Archivo; links: About, Our Work, Stories, Join; Join button (red, white text) always visible. Sticky on scroll only if it does not cover content; compact. |
| **Button** | Primary: red fill, white text, pill. Secondary: text link with an underline that thickens on hover and focus. Labels are verbs: "Join the movement," "Give," "Read the full story." Min height 48px. |
| **Roll Call hero** | See `05`. |
| **Statement** | One paragraph in Source Serif 4, large, left-aligned, max 22 words per line. Used on Chalk after the hero. |
| **Program row** | Ruled list row: title (Archivo), one sentence, link. Expands on tap/click to show detail (answers a user action, so motion is allowed). |
| **County index** | List of 15 county names in placard type; hover/focus highlights the region on a small map; links to county page. Optional status text ("Branch active," "Forming") only when the owner provides data. |
| **Record (timeline)** | Dated entries, each with an independent source link; the only place numbers/ordering are used. |
| **Story: lead** | Large photo, headline, one-sentence summary, byline. |
| **Story: list item** | Date, headline, one line. Distinct from the lead; do not repeat the lead's layout. |
| **Quote** | Oversized serif quote with name, place and date; only real, consented quotes. |
| **Join form** | Fields: name, email or phone, county (select of 15 + "outside Liberia"), how you want to help (checkboxes). Visible labels, helpful errors, no CAPTCHA that blocks assistive tech, honeypot + rate limit. Confirmation says exactly what happens next. |
| **Give module** | Added once payment methods are confirmed (`docs/12`); amounts as plain buttons; recurring toggle; no dark patterns. |
| **Event row** | Date block (tabular numerals), title, place, "Add to calendar." |
| **Press row** | Outlet, headline, date, link. |
| **Footer** | Movement name, short neutrality statement, contact, social, legal links, registration details when known. |
| **Announcement banner** | CMS-controlled, dismissible, high contrast. |
| **States** | Error, empty, success, 404, offline: each explains what happened and gives one next action; no apologies or jokes. |

## Focus and keyboard
Visible focus ring: 3px outline in Sun gold on dark grounds, Navy on light grounds, offset 3px. Skip link first. All interactive elements reachable and operable by keyboard.
