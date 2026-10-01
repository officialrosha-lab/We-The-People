# Decisions

Status: Phase 0 approved. Phase 1 in progress. D1 amended by D6.

## D1. Stack (confirms `docs/07`, with one change)

- Next.js (App Router) + TypeScript strict, static generation by default. Reason: fast pages, server actions for forms, i18n-ready routing.
- Styling: plain CSS with cascade layers, consuming `src/styles/tokens.css` (copy of `docs/design/tokens.css`). **No Tailwind**: the token file is the system and utility classes invite hard-coded values.
- Motion: native CSS + SVG attributes. No animation library (hero JS budget is 10 KB).
- CMS: **Payload or Sanity, decided after Q9** (who edits, how technical). Until then content is Markdown in `content/` behind a loader, so the CMS can be swapped in.
- Forms: Zod server validation, honeypot + rate limit, Turnstile only if needed (must not block assistive tech). Webhooks to email/CRM behind `src/lib/integrations`.
- Payments: **not chosen**. Blocked by open questions 1, 6. Keep a provider interface; Liberia payment rails (mobile money) must be confirmed with the owner.
- Search: Pagefind. Analytics: cookieless (Plausible/Umami). Hosting: Vercel or Netlify with preview deploys, CDN-cached static pages.
- Fonts: Archivo and Source Serif 4, self-hosted via Fontsource, subset to Latin + Latin Extended.
- Tests: Playwright, axe, Lighthouse CI.

## D2. Repository structure

As in `docs/07`. Phase 1 adds `src/`, `tests/`, `.env.example`. Kit docs stay in `docs/`.

## D3. Low-bandwidth resilience

Core pages and the join form work without JS. Hero final state is in the HTML at first paint. Respect `Save-Data`.

## D4. Map data

Natural Earth 1:10m admin-1 (public domain), 15 Liberian counties. See `DESIGN-NOTES.md`.

## D5. Not decided (needs owner)

Payments, CMS editor choice, languages, hosting budget, positioning (docs/01c option 1, 2 or 3).

## D6. Static website, not a web app (owner direction, supersedes D1 framework)

- Framework: **Astro** (static output, TypeScript strict, zero JS by default). No React, no Next.js.
- Pages are HTML and CSS first. Interactivity is small vanilla scripts (Roll Call hero, menu sheet, county index highlight).
- Content: Markdown/YAML in `content/` via Astro content collections with Zod schemas. A Git-based CMS (Decap or Tina) can be added later for editors; no server.
- Forms: plain HTML forms posting to a hosted form endpoint, with a honeypot. The endpoint is chosen later; until then forms are not wired and are marked as placeholders.
- Hosting: any static host or CDN.

## D7. No CMS (owner direction, supersedes D6 CMS note)

Plain website with all information about We The People. Content is Markdown/YAML files in `content/`, edited in the repo. No CMS, no editor login, no admin.

## D8. Forms without a backend (Phase 4)

- Out of scope by owner direction: petition tools, payments, Give.
- All forms (join, contact, event registration, newsletter) are plain HTML `<form method="post">` posting to one hosted form endpoint set in `PUBLIC_FORM_ENDPOINT` (build-time env var). Provider not chosen (Formspree, Web3Forms, Getform or similar all accept this shape). No server code, no database, no accounts, no login.
- Without the variable the forms render disabled with an honest notice; they never pretend to send.
- With JS: validate, send with `fetch`, show success or error inline. Without JS: the browser posts to the endpoint; the provider shows its own confirmation page (set its redirect to `/thanks/`).
- Spam: hidden honeypot field plus the provider's rate limiting. No CAPTCHA, so assistive technology is not blocked.
- Newsletter: double opt-in and one-click unsubscribe must be provided by the provider or email platform; this site cannot enforce them. Copy promises nothing beyond "we have your address". Flagged for the owner and legal review.
- Events: Markdown files in `content/events/`. Upcoming versus past is decided at build time, so the site needs a rebuild at least daily once events exist (scheduled deploy). Times are Africa/Monrovia (UTC+0, no daylight saving). Each event also gets a generated `.ics` file for "Add to calendar".
- Campaign template: not built; it needs live totals or progress, which only make sense with the petition and payment tools that are out of scope.

## D9. Third-party form services chosen (owner direction; amends D8)

- Join, Contact and Event registration go to **Formspree** (`PUBLIC_FORMSPREE_ENDPOINT`). Newsletter sign-ups go to **Brevo** (`PUBLIC_BREVO_FORM_URL`, the form's action URL, with double confirmation turned on in Brevo). The old single `PUBLIC_FORM_ENDPOINT` is gone.
- Formspree contract used: POST to `https://formspree.io/f/<id>` with `Accept: application/json`; a filled `_gotcha` field is silently ignored by Formspree; the field named `email` becomes the reply-to; `_subject` labels each form. Brevo contract used: POST to `https://<account>.sibforms.com/serve/<form-id>` with `EMAIL`, `locale`, `html_type=simple` and the `email_address_check` honeypot. Both from the providers' public documentation and community examples; **not yet exercised against live accounts**.
- Brevo replies cannot be read across origins, so the newsletter uses `no-cors` and treats "delivered" as success. The thank-you copy is worded so it is true if double confirmation is on: "If you are not already subscribed, we will email you to confirm your address." If the owner does not turn double confirmation on in Brevo, that sentence must change.
- Build guard: each variable must be an `https` URL on `formspree.io` or `sibforms.com` (or a subdomain); anything else fails the build, so a pasted wrong URL cannot send people's details to another host. Both values are public in the HTML, so no secret may be placed in them. A Brevo API key must never be used in the browser; none is needed.
- Setup steps for the owner: `docs/13-form-integrations.md`.
- Both providers are processors of personal data (names, contact details, counties). The privacy policy must name them and say where they store data; flagged for legal review.

## D10. No environment variables for forms (owner direction; amends D9)

- The two service addresses are constants at the top of `src/lib/forms.ts` (`FORMSPREE_URL`, `BREVO_FORM_URL`), pasted in and committed. Both are public by nature, so committing them is safe; no secret may ever go there. The domain guard still applies to whatever is pasted.
- Forms are always visible and enabled. With an empty address, Send validates, then shows "This form is not switched on yet. Nothing was sent." and makes no request. This replaces the disabled button, the "not accepting submissions" notice and the hidden newsletter box.
- Why not a silent success: a form that says "You have joined" while sending nowhere would mislead visitors and lose real sign-ups. The honest message costs nothing and disappears once an address is pasted.
- `PUBLIC_FORMSPREE_ENDPOINT` and `PUBLIC_BREVO_FORM_URL` still exist as optional overrides, used only by the automated tests so they can build with test addresses. The owner never sets them; `.env.example` is removed.
- Without JavaScript an unconnected form cannot post anywhere, so it shows "This form needs JavaScript until it is switched on."
  \n

## D11. Video policy (amended 2026-10-01)

- **Owner decision:** videos are not required to have captions or a transcript. The earlier rule (captions and a transcript required before publishing) is removed; the schema no longer enforces it. Captions and a transcript remain supported and encouraged.
- **Known gap, accepted by the owner:** the march-speech video has no captions. Deaf and hard-of-hearing visitors, and anyone watching without sound, cannot follow the speech. This fails WCAG 2.2 success criterion 1.2.2 (Level A, captions for prerecorded video), which the project had set as its accessibility floor. The page says "This video does not have captions yet." and describes what the video shows. It must be listed in the accessibility statement (a placeholder exists) and fixed when someone can write the captions; see `assets/video/README.md`, which needs no code change.
- Click to play: `preload="none"`, a poster, no autoplay, no sound until pressed. Sources are compressed to about 450 kbps video and 56 kbps mono audio (about 6 MB for 90 seconds), with metadata stripped.
- Machine transcripts are not used as captions: a trial misheard the speech and invented claims about the speaker.
- The legal name is "We The People, Inc." (owner, 2026-10-01); the movement is known as the We The People Movement. The footer and Transparency page say so; registration details remain placeholders.

## D12. Phase 5 choices

- **Mobile menu:** below 900px, with JavaScript, the links become a full-screen sheet under the header; "Menu"/"Close" is a real button with `aria-expanded`; Escape closes and returns focus; the page behind is `inert` while open; "Join the movement" stays visible outside the sheet. Without JavaScript the links simply wrap. The "JavaScript is on" flag is set in the head so the layout does not jump.
- **Search:** Pagefind, built after the Astro build (`npm run build` runs both), index downloaded only on `/search/`. The 404, thank-you and search pages are not indexed. Search does not work in `npm run dev` (no index there); use `npm run build && npm run preview`.
- **SEO:** sitemap (`@astrojs/sitemap`, excluding thank-you and search), `robots.txt` generated from the site address, JSON-LD (NGO on the home page, Article on stories, Event on events), Open Graph and Twitter cards on every page, with a branded default share image (`public/og-default.png`, from `scripts/build-og.mjs`) and the lead photo for stories. All use the placeholder domain `example.org` in `astro.config.mjs` until the real domain is pasted in.
- **Headers:** `public/_headers` sets a strict Content-Security-Policy (own origin only, plus the two form services), `nosniff`, referrer and permissions policies, `frame-ancestors 'none'`, and year-long caching for hashed assets. It is read by Netlify and Cloudflare Pages; other hosts need an equivalent. Inline scripts are allowed (`'unsafe-inline'`) because Astro and the hero use small inline scripts; tightening that needs a nonce or hash step on the chosen host.
- **Print:** a print stylesheet drops colour grounds, the menu, forms, maps and video, and shows link addresses.
- **Not done, on purpose:** analytics (none installed, so no consent banner is needed); a service worker for offline reading (priority "could" in docs/04); translations (English only, routing not yet locale-prefixed); an Impact page (no verified numbers).
- **Browser coverage:** only Chromium is installed in this environment, so Firefox and Safari are untested here. CI is set to try them (non-blocking).
- **Fonts (Phase 5):** only Latin and Latin Extended subsets are shipped (own `@font-face` in `src/styles/fonts.css`); the body serif uses the weight-only Source Serif 4 file (51 KB instead of 122 KB; the optical-size axis is given up); both main fonts are preloaded. Result: about 70 KB less per page and no layout shift from font swapping. Reversible: swap the file names in `fonts.css` and `Base.astro`.
- **Photos (Phase 5):** AVIF and WebP at quality 60, four widths, and the lead photo of each story is preloaded in the exact AVIF variant the browser will choose.
- **Performance gate:** `npm run lighthouse` (`scripts/lighthouse.mjs`) fails if any of 12 key pages scores under 95 in any category, has LCP over 2.5 s or CLS over 0.1, on Lighthouse's simulated slow 4G with a slowed CPU. CI runs it after a clean production build.

## D13. Launch approach (Phase 6)

- **No deployment was done by the builder.** The host, domain and the Formspree and Brevo accounts do not exist yet, and they must belong to the owner. Phase 6 therefore delivers the tools and documents to launch safely: `npm run launch-check` (lists blockers), `npm run smoke -- <url>` (tests the live site), `netlify.toml`, a nightly-rebuild workflow that needs one secret, and the runbook, editor guide, legal pack and handover (`docs/14` to `docs/17`).
- **The smoke test was verified both ways:** against a local copy built with a real-looking address, test form addresses and the headers file applied, it passes every check; against the current build it fails exactly the real gaps (placeholder address, headers not applied by the preview server, forms unconnected).
- **Dependency hygiene:** `mapshaper` (six known vulnerabilities in its own dependencies) was removed; the map it produced is already saved, and the rebuild script fetches it on demand. `npm audit` now reports 0 vulnerabilities, including developer tools.
- **Editing model:** no CMS; editors change Markdown files on GitHub through pull requests, with a host preview before each change goes live. `docs/15` is written for non-developers.
- **The launch check is a gate for people, not for CI:** it fails while blockers exist, which is correct before launch, so CI does not run it.

## D14. Hosting on GitHub Pages (owner request, 2026-10-01; supersedes the Netlify/Cloudflare recommendation in D13)

- **Why it works:** the repository is public (verified), so GitHub Pages is free; it is a user account, so the default address is `https://officialrosha-lab.github.io/We-The-People/`, a **subfolder**. The code previously assumed the site lived at the root.
- **Subfolder support:** every internal address now goes through `url()` (`src/lib/url.ts`); links written inside Markdown are prefixed by a small plugin (`src/lib/remark-base.mjs`, on the `unified` processor from `@astrojs/markdown-remark`, which Astro 7 no longer includes by default); video paths in story front matter are prefixed when rendered; the search index and its result links honour the folder. The same code works at the root when a custom domain is added: the deploy workflow asks GitHub for the folder (`configure-pages`) and passes it to the build (`SITE_URL`, `BASE_PATH`); locally the defaults are the root and `https://example.org`.
- **Proof, not hope:** `scripts/check-links.mjs` reads every built page and checks all ~1,050 internal addresses start with the right folder and point at real files; it runs in CI (a separate job builds in a subfolder), in the deploy workflow before publishing, and was run on both builds. The subfolder build was also served like GitHub Pages and driven in a browser: nav, links inside Markdown, video and poster, six photos, search results, the phone menu, the forms, the 404 page; no console errors and no blocked requests.
- **Not published by accident:** the deploy workflow does nothing until the owner chooses Source "GitHub Actions" in Settings > Pages **and** sets the variable `DEPLOY_PAGES = true`. It deploys only from the default branch (currently the only branch). It also rebuilds every night, which replaces the earlier deploy-hook workflow.
- **Preview before launch:** while `ALLOW_SEARCH_ENGINES` is false (`src/lib/site.ts`), every page carries `noindex` and `robots.txt` disallows everything. Launch day sets it true (`docs/14`, step 8). The launch check lists it as a blocker; the smoke test has a `--preview` mode.
- **Security without headers:** GitHub Pages cannot send response headers, so the Content-Security-Policy is a `<meta>` tag on every page (`src/lib/csp.ts`), kept in step with `public/_headers` by a test, plus a referrer policy tag. Tests assert the site runs with no console errors under it, including search (which needs WebAssembly) and the video story. Lost: `frame-ancestors`/`X-Frame-Options` (clickjacking protection) and one-year caching of built files; accepted for a free host.
- **Public repository:** everything in it is world-readable (documents, consent log, draft legal pages, photos, video). Flagged in the legal pack; the owner decides.
- **Dependencies:** `@astrojs/markdown-remark` added (0 vulnerabilities).

## D15. Deferred photos and CI findings (2026-10-01)

- **What the first real CI runs showed:** formatting, types, build and all 91 Chromium tests passed on GitHub; the subfolder link check passed; Firefox and a WebKit (Safari) engine passed 272 of 273 tests. The one failure was real: Safari's engine requests the start of a video file even with `preload="none"`. The test now measures bytes (a small probe is fine; the whole 5.8 MB file is not) and all 273 pass.
- **Lighthouse on GitHub failed two story pages (LCP 2.55 and 2.71 s, 388 KB).** The diagnostic added to the script showed GitHub's newer Chrome fetching every `loading="lazy"` photo and the video poster immediately, in competition with the main photo. A slow connection makes browsers prefetch lazy images much further ahead, so this was a real-world problem, not only a test artefact. It could not be reproduced locally (forcing a slow connection changed nothing).
- **Fix:** photos below the fold are no longer requested until the visitor scrolls within 400 px of them (`IntersectionObserver` in `Photo.astro`); the video poster likewise (`Video.astro`). A tiny placeholder keeps the layout from shifting; without JavaScript the normal `<picture>` inside `<noscript>` is used. Locally the story pages went from 240 KB and about 2.26 s to about 190 KB and 2.11 s.
- **Tests added:** only the lead photo is fetched before scrolling; every photo has really loaded after scrolling; without JavaScript all photos show with real sources. `scripts/check-links.mjs` also reads `data-src` and `data-srcset`.

## D16: Interim logo mark in the header and favicon

The owner supplied the logo as a 921x854 JPEG with the black background baked in, the same as the kit file. It cannot be used as is on the site's Night header. For now the header mark and favicon are the figures, flag and sun cut from it (background made transparent, grey map outline dropped) on a Chalk rounded badge, embedded in `public/mark-placeholder.svg` and `public/favicon.svg`. This is interim: soft edges, not for print, not a vector. A faithful vector rebuild needs the owner's approval (docs/01b); the launch check keeps flagging it until then.

## D17: Motion and interaction polish, kept inside docs/design/07

Added only what 07 allows: a cross-fade between pages (CSS cross-document View Transitions, with the header held still, off under reduced motion) and press feedback on buttons (transform only) plus an eased link-underline change. Smooth scrolling was tried and dropped: it slows programmatic scrolling and broke the photo-loading test. Scroll-in entrances, hover lifts and parallax stay out, as 07 says.

## D18: March photo band on the home page

The home page showed one photo and only text elsewhere, while the march photos sat on the Stories pages. A navy band after the opening statement now shows the march (lead photo, date, summary, link to the story and its video) and a row of three more photos. It reuses the story's own photos and alt text, so nothing is duplicated in content files. The photos load only when scrolled near, so the hero stays first (home Lighthouse 100/100/100/100, LCP 1.7 s).

## D19: Introduction video on the home page

The owner supplied a 56 s introduction (H.264, 720p, 2.7 MB, so it was only re-packaged with fast-start and metadata stripped, not re-encoded). It sits in its own section after the opening statement, click-to-play with nothing downloaded before play, set from a `video:` block in `content/pages/home.md` (pages schema extended). No captions yet, same stance as D11; the launch check lists it. The speaker's name and role appear only in the video's own caption; the site's text leaves them out until the owner confirms them.

## D20: No on-page "no captions yet" note

The owner asked for the note under the videos ("This video does not have captions yet.") to be removed, along with the matching launch-check lines and test assertions. The player still supports captions when a `.vtt` file is added. The public accessibility statement keeps naming the missing captions, because it must stay accurate.

## D21: Introduction speaker named on the About page

The owner confirmed (2026-10-01) the wording shown in the video's own caption and that full consent is held. The About page now names John A. Ballout Jr. with exactly that role text; other leadership stays a placeholder. Nothing was added beyond what the caption states.

## D22: Introduction video removed

At the owner's request the introduction video, its description and poster were removed from the home page and the repository (D19 no longer applies; the pages schema no longer has a `video` block). The About page still names the speaker, with the wording the owner confirmed.

## D23: Look-and-feel refinement inside the locked design

The palette, type, Roll Call hero and the rules in docs/design (square blocks, pill buttons only, no shadows, no gradients, no arrows, no all-caps labels) stay. Refined: buttons are larger and bolder with a flat darker edge (a border, not a shadow) that sinks when pressed, and a quiet outlined variant for secondary actions (`.btn-quiet`, used in the hero); list rows are whole-row links with a gold marker on hover or focus; Record rows read as a ledger with the date in its own column; the current page is marked in the header (gold bar and `aria-current`); the footer is split into two columns under a red rule. Considered and rejected: gold glows, gradient buttons and numbered markers (generic, and the content is not a sequence). New token: `--red-deep`.

## D24: Wide-screen layouts for text pages, Join and Stories

On screens 1000px and wider, text pages (About, Contact, Privacy and the like) put each heading in a left margin column with its text beside it, instead of one narrow strip down the left edge. The Join page puts the "what happens after you join" notes beside the form, under a white rule. The Stories list shows a cropped thumbnail of each story. Phones keep the single column. No colours, fonts or hero changed.

## D25: Outreach network on the hero map

At the owner's request the hero map now shows connectivity and outreach. After the roll call lights the fifteen counties, links draw outward between neighbouring counties and small dots travel along them, then it settles and stays as a quiet network (navy links, gold nodes). Links are the shared borders computed from the map data, so nothing is invented; it is symbolic and does not claim where branches exist, and it starts from the county nearest the geographic middle, not a base. Plays once per session (about 2.5 s after the roll call), any click, key or scroll finishes it, reduced motion and no-JavaScript show the final state. Built with CSS plus the Web Animations API in the existing hero script. docs/design 05 and 07 updated first.

## D26: The hero network starts from the march county

At the owner's request, the outreach network (D25) now spreads out from Montserrado, where the 7 August 2025 march took place, instead of the geographic middle. The start is read from the `county` of the earliest published story, so it follows the content; with no story county it falls back to the middle of the map. Still symbolic: it does not claim a headquarters or branches.
