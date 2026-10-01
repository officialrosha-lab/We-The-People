# 14. Launch runbook

For the person who takes the site live. The site is a folder of static files (no server, no database, no login), so launching means: choose a host, point a domain at it, connect two form services, and check. Each step says who does it. `npm run launch-check` lists what is still open; `npm run smoke -- https://your-domain` tests the live site.

## 0. See where things stand
```
npm run launch-check
```
It prints BLOCKERS (must be fixed before the site is public), things to do, and notes. Run it again after each step below.

## 1. Choose a host (owner)
Any static host works. Recommended: **Netlify** or **Cloudflare Pages** (free tiers, automatic HTTPS, deploy on every change, and they read `public/_headers` for the security headers). Connect the GitHub repository; the build command is `npm run build` and the output folder is `dist` (already in `netlify.toml`). No environment variables are needed.
- On a different host (Vercel, Apache, nginx), the rules in `public/_headers` must be copied into that host's own format, or the security headers will be missing.

## 2. Domain and address (owner, with whoever holds the domain)
1. Buy or choose the domain. Decide the one canonical form (for example `example.org`, not `www.example.org`) and redirect the other to it at the host.
2. Point DNS at the host as it instructs (usually a CNAME or A record). HTTPS certificates are automatic on both recommended hosts. Turn on "force HTTPS".
3. Paste the final address into `site` in `astro.config.mjs` (replace `https://example.org`) and commit. This fixes the canonical links, sitemap, robots.txt and share images.

## 3. Connect the forms (owner)
Follow `docs/13-form-integrations.md`: create the Formspree form and the Brevo sign-up form (double confirmation on), paste both addresses into `src/lib/forms.ts`, commit. Then:
- Send one test of each form on the **live** site (Join, Contact, Newsletter; an Event form once an event exists).
- Check the message reached the Formspree inbox, and that the Brevo contact list received the address and sent a confirmation email.
- If you use your own domain for email, set up SPF, DKIM and DMARC for it and for Brevo's sending address (Brevo's "senders and domains" page gives the exact records). Without them, confirmation emails may land in spam.

## 4. Replace the stand-in logo (owner and designer)
The header and favicon use a stand-in star. Get the vector logo, replace `public/mark-placeholder.svg` and `public/favicon.svg`, then run `node scripts/build-og.mjs` to rebuild the share image.

## 5. Fill the remaining content (owner)
`content/PLACEHOLDERS.md` lists every unfinished item, what is needed and who can supply it. The launch check separates the ones that block launch (contact details, registration, privacy policy) from the ones that can follow.

## 6. Legal review (owner and a qualified person)
Hand over `docs/16-legal-review-pack.md`. The Privacy policy and Accessibility statement are drafts. Remove the "Draft" lines only after review.

## 7. Test on real devices (owner or volunteers)
Not done by the builder, because it needs people and hardware:
- A low-end Android phone on mobile data: home, a story, Join, search, the menu.
- Safari on an iPhone, and Firefox on a computer.
- A screen reader: NVDA (Windows, free) or VoiceOver (iPhone/Mac, built in) through Join, the county list and a story. Record the date and result in the accessibility statement.

## 8. Go live
1. `npm run launch-check` shows no BLOCKER.
2. Deploy. Then run `npm run smoke -- https://your-domain`. Every line should say ok.
3. Submit `https://your-domain/sitemap-index.xml` in Google Search Console and Bing Webmaster Tools.
4. Share a story link in WhatsApp and Facebook to check the preview image and title appear.

## 9. Keep it healthy
- **Daily rebuild (needed once there are events):** create a deploy hook at the host and add it to GitHub as the secret `DEPLOY_HOOK_URL`. The workflow `daily-rebuild` then rebuilds every night so past events move to "Past events".
- **Uptime:** turn on the host's uptime alerts, or a free monitor such as UptimeRobot on `https://your-domain/`, alerting the person named in `docs/17-handover.md`.
- **Forms:** watch the Formspree and Brevo dashboards; both cap submissions on free plans.
- **Backups:** the Git repository is the backup of everything (text, photos, video, settings). Keep a second copy: clone it to another machine or mirror it to a second Git host every month. Form submissions live in Formspree and Brevo, not in the repository; export them from there.
- **Rollback:** on Netlify and Cloudflare Pages, open the deploys list and publish the previous deploy. Or revert the last commit in GitHub and the host rebuilds.
- **Updates:** once a month run `npm audit` and `npm outdated`; update in a branch, run `npm run test:e2e`, then merge.

## Known gaps at launch
- The march-speech video has no captions (owner decision; DECISIONS D11). Add them when someone can write them (`assets/video/README.md`).
- Firefox, Safari, real phones and screen readers have not been tested by a person.
- Content Security Policy allows inline scripts; tightening it needs a host that can add a nonce or hashes.
