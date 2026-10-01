# 11 — Awards Bar and Launch Checklist

## What juries reward (Awwwards weighting as a guide)
Design 40% · Usability 30% · Creativity 20% · Content 10%. Also CSS Design Awards (UI, UX, innovation), FWA, Webby (nonprofit and social impact categories).

To be competitive:
- A clear concept that comes from the organization's own story, expressed consistently in type, color, motion, and copy
- One memorable interaction or idea, executed flawlessly
- Excellent responsive behavior and performance; juries test on phones
- Real content with strong writing and photography
- Evidence of craft: micro-details, state design, transitions that explain
- Accessibility that is visible and documented

## Awards submission package (Phase 7)
Concept statement, process notes, before/after, screenshots at several widths, short screen recording, tech credits, results data, team credits.

## Launch checklist
- [ ] All `[FILL]` and `[PLACEHOLDER]` items resolved or consciously accepted
- [ ] Consent log complete for all people, photos, quotes
- [ ] Legal pages reviewed; registration details correct
- [ ] Donations tested live with a small real gift; refund tested; receipt received
- [ ] Recurring gift created, charged, canceled
- [ ] Forms tested, spam protection active, notifications reach the right people
- [ ] Analytics and conversion events verified
- [ ] 404, thank-you, error states designed
- [ ] Lighthouse 95+; axe clean; manual screen-reader pass; keyboard-only pass
- [ ] Tested on low-end Android, iOS Safari, and a slow connection
- [ ] OG images and social cards verified
- [ ] Sitemap, robots, redirects, canonical tags
- [ ] Backups and uptime monitoring on; error alerts routed
- [ ] Editor guide delivered and one editor trained
- [ ] Domain, SSL, email deliverability (SPF, DKIM, DMARC)

---

## Launch checklist status (Phase 6, 2026-10-01)
Legend: **Done** = built and tested. **Owner** = needs a decision, content or account from the owner. **People** = needs a real person or device. **N/A** = excluded by the owner or not applicable to this site.

| Item | Status | Notes |
|---|---|---|
| All `[FILL]` and `[PLACEHOLDER]` items resolved or consciously accepted | **Owner** | About 40 remain in published files. `npm run launch-check` splits blockers from the rest; `content/PLACEHOLDERS.md` says who can supply each. |
| Consent log complete for all people, photos, quotes | **Owner** | Owner states full consent (adults, school, guardians, march participants). Open: where the written records are stored; consent for the video's audio. |
| Legal pages reviewed; registration details correct | **Owner / People** | Privacy and Accessibility drafted from what the site actually does. Review pack: `docs/16`. Legal name confirmed: We The People, Inc.; registration details missing. |
| Donations tested live; refund; receipt | **N/A** | Donations, payments and Give were excluded by the owner. |
| Recurring gift created, charged, canceled | **N/A** | As above. |
| Forms tested, spam protection active, notifications reach the right people | **Owner / People** | Tested with intercepted requests (payloads, errors, honeypot, keyboard). Not yet connected to Formspree and Brevo: needs the accounts and one live test of each (`docs/13`, `docs/14`). |
| Analytics and conversion events verified | **N/A** | No analytics installed, by privacy-first design; no consent banner needed. |
| 404, thank-you, error states designed | **Done** | 404, thank-you, form errors, "not switched on" notice, empty stories and events, search no-results. |
| Lighthouse 95+; axe clean; manual screen-reader pass; keyboard-only pass | **Done / People** | Lighthouse (mobile, simulated slow 4G): 98 to 100 performance and 100 in the other three on 12 key pages. axe clean on every page and state tested. Keyboard paths tested automatically (skip link, menu, forms). **Manual screen-reader pass not done.** |
| Tested on low-end Android, iOS Safari, and a slow connection | **Done / People** | Slow connection and slow CPU simulated; page weight 146 to 240 KB. Real Android, Safari and Firefox not tested; CI has a non-blocking Firefox and WebKit job that has not yet run on GitHub. |
| OG images and social cards verified | **Done / Owner** | Every page has them; stories use their lead photo; others a branded default. Needs the real domain and logo, then a share test in WhatsApp and Facebook. |
| Sitemap, robots, redirects, canonical tags | **Done / Owner** | Generated and tested (34 pages). They use a placeholder address until the domain is set. Redirects (www and http) are set at the host. |
| Backups and uptime monitoring on; error alerts routed | **Owner** | Git is the backup; routine in `docs/17`. Uptime monitor and alert contact to be set up. Nothing runs on a server, so there are no server errors to alert on. |
| Editor guide delivered and one editor trained | **Done / People** | `docs/15` written for non-developers. Training of one editor still to be done. |
| Domain, SSL, email deliverability (SPF, DKIM, DMARC) | **Owner** | Publishing is set up for GitHub Pages (free HTTPS; `docs/14`, step 1). A domain of your own is optional (step 7). SPF, DKIM and DMARC are needed only for email sent from your own domain. |
