# Motion and Interaction

## Principle
Non-user-triggered motion is rare and deliberate: only the Roll Call hero. Motion that answers a person's action is welcome when it shows what changed.

## Allowed
- Light travelling along the hero map's links, wave after wave from the first county (owner request). The one deliberate exception to "no looping decorative animation": it has a visible pause button, stops while the map is off screen, and never runs under reduced motion.
- Roll Call hero sequence (once per session), including its second act: the outreach network drawing across the map (about 2.5 s, once, skipped by any click, key or scroll, and static under reduced motion).
- Program row expand/collapse (height + rotate indicator, 240ms).
- Form: field validation messages, submit button progress, success confirmation.
- County index hover/focus highlight on the map (120ms).
- Page transitions with the View Transitions API (progressive enhancement; falls back to none).
- Menu sheet open/close on mobile.

## Not allowed
- Fade-and-slide-up entrances on every section.
- Hover lift/scale on every card or image.
- Parallax, scroll-jacking, looping decorative animation, auto-playing video with sound, cursor effects.

## Rules
- Respect `prefers-reduced-motion`: replace movement with instant state changes; keep meaning (e.g., show the final hero state).
- Use transforms and opacity; avoid layout-affecting animation.
- Durations from tokens (120, 240, 480 ms); one easing curve.
- No motion over 5 seconds without a control; no flashing.
