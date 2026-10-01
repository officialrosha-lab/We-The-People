# 01b — Logo and Brand Analysis

Source: `assets/logo/wtp-movement-logo-original.jpg` (921 x 854 px JPG, solid black background).

## Official name signal
The logo reads **WE THE PEOPLE — MOVEMENT**. Use "We The People Movement" as the formal name and "We The People" as the short form unless the organization says otherwise. Confirm in `docs/12`.

## What the logo contains
- Arched wordmark "WE THE PEOPLE" in navy over a red arc
- A grey outline of Liberia with a glow, behind the figures
- A rising sun (gold) and a waving flag with a white star and red/white stripes, echoing the national flag
- Three raised figures in red, green, and navy, holding the flag together (unity across differences)
- A red ribbon reading "MOVEMENT" with stars, on a navy base with a white star

## Approximate palette (sampled from the image; confirm against an original file)
| Role | Approx. hex |
|---|---|
| Red | #E10007 |
| Navy | #082D62 / #10306B |
| Gold (sun) | #F9B806 |
| Green | #166B16 |
| White | #FFFFFF |

## Technical problems to solve before using it on the web
- It is a low-resolution JPG with soft edges and a baked-in black background: not usable for header, favicon, print, or social cards.
- Request the original vector (AI/SVG/PDF) or layered file from whoever designed it. If none exists, plan a **faithful vector rebuild** (same concept, clean geometry, real lettering) as a Phase 0 task, with owner approval.
- Needed versions: full-color on light, full-color on dark, one-color, icon-only (figures + flag), horizontal lockup, favicon and app icon.
- The grey map outline and glow will not survive small sizes; the icon-only version should drop them.

## Brand and neutrality considerations
- The red / white / blue palette matches the national flag, which supports a "for the whole country" message. Because the interview stresses a neutral, non-party space, **check how these colors, and the green, relate to the visual identities of Liberian political parties** and avoid presenting any single party's look. Treat this as a risk review with local advice, not an assumption.
- The three figures in different colors can carry the "all walks of life" message. Do not over-literalize ethnic or party meaning into the colors.
- The existing mark is illustrative and flag-heavy. For an award-level site, build a distinctive system around it (typography, motion, layout, photography) rather than tinting a standard template with the logo colors. Follow `docs/05-design-direction.md`.

## Web design implications
- Dark mode is natural for this mark: the logo already sits on black.
- Choose a restrained supporting palette so the red, navy, gold, and green keep their meaning. Use the flag motifs (star, stripes) sparingly, as an idea, not wallpaper.
- Ensure accessible contrast: navy on black and red on navy fail contrast; define approved pairings in the token file.
