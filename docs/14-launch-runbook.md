# 14. Launch runbook (GitHub Pages)

For the person who takes the site live. The site is a folder of static files (no server, no database, no login), published free on **GitHub Pages** from this repository. Launching means: switch publishing on, connect two form services, finish the content, then (when ready) point a domain at it and tell search engines they may list it. `npm run launch-check` lists what is still open; `npm run smoke -- <address>` tests the live site.

## 0. See where things stand
```
npm run launch-check
```
It prints BLOCKERS (must be fixed before the site is public), things to do, and notes. Run it again after each step.

## 1. Switch publishing on (owner, 2 minutes, one time)
The repository is public, which is what lets GitHub Pages be free. Nothing is published until you do both of these:
1. On GitHub open the repository, then **Settings > Pages > Build and deployment > Source**, and choose **GitHub Actions**.
2. **Settings > Secrets and variables > Actions > Variables > New repository variable**. Name `DEPLOY_PAGES`, value `true`.

Then open the **Actions** tab, choose **deploy**, press **Run workflow**. After about two minutes the site is at:
**https://officialrosha-lab.github.io/We-The-People/**

From then on the site republishes by itself when a change is merged to the default branch, and every night (so events move from "upcoming" to "past").

**This first address is a preview.** While `ALLOW_SEARCH_ENGINES` is `false` (`src/lib/site.ts`), every page tells search engines not to list it, because the content is unfinished. Anyone with the link can still open it.

What GitHub Pages cannot do, and what that means:
- It cannot send custom security headers. The Content-Security-Policy therefore travels inside every page (done). `X-Frame-Options` and the one-year caching of built files (`public/_headers`) do not apply.
- It has no preview link for each proposed change. The automatic checks on a pull request (build, tests, link check) take their place (`docs/15`).
- It has no redirect rules. Redirect `www` to the main address through your domain registrar's settings.

Prefer Netlify or Cloudflare Pages? Both read `public/_headers` and give preview links. Use build command `npm run build`, output folder `dist`, set `SITE_URL` to the final address, and turn the deploy workflow off by removing the `DEPLOY_PAGES` variable.

## 2. Connect the forms (owner)
Follow `docs/13-form-integrations.md`: create the Formspree form and the Brevo sign-up form (double confirmation on), paste both addresses into `src/lib/forms.ts`, commit. Then send one test of each form on the **live** site (Join, Contact, Newsletter; an Event form once an event exists). Check the message reached the Formspree inbox, and that Brevo received the address and sent a confirmation email.

## 3. Replace the stand-in logo (owner and designer)
The header and favicon use a stand-in star. Replace `public/mark-placeholder.svg` and `public/favicon.svg` with the real vector logo, then run `node scripts/build-og.mjs` to rebuild the share image.

## 4. Fill the remaining content (owner)
`content/PLACEHOLDERS.md` lists every unfinished item, what is needed and who can supply it. The launch check separates the blockers (contact details, registration, privacy policy) from the rest.

## 5. Legal review (owner and a qualified person)
Hand over `docs/16-legal-review-pack.md`. The Privacy policy and Accessibility statement are drafts; remove their "Draft" lines only after review. **The repository is public, so everything in it is readable by anyone, including that pack and the consent log**; see the note in the pack.

## 6. Test on real devices (owner or volunteers)
Not done by the builder, because it needs people and hardware:
- A low-end Android phone on mobile data: home, a story, Join, search, the menu.
- Safari on an iPhone, and Firefox on a computer.
- A screen reader: NVDA (Windows, free) or VoiceOver (iPhone/Mac, built in) through Join, the county list and a story. Record the date and result in the accessibility statement.

## 7. A domain of your own (optional, any time)
You can launch on the github.io address. A domain of your own looks more official and is easier to remember.
1. Buy the domain. Decide one canonical form (for example `example.org`, not `www.example.org`).
2. On GitHub: **Settings > Pages > Custom domain**, enter it, and follow GitHub's DNS instructions at your registrar (records for the main address and a `www` CNAME). Turn on **Enforce HTTPS** once the certificate is ready.
3. Run the **deploy** workflow again. With a custom domain the site moves from the `/We-The-People/` subfolder to the root of the domain; the workflow detects this and rebuilds every address correctly.
4. For email from your own domain, set up SPF, DKIM and DMARC for it and for Brevo's sending address (Brevo's "senders and domains" page gives the exact records). Without them, confirmation emails may land in spam.

## 8. Go live to search engines (owner)
1. `npm run launch-check` shows no BLOCKER (the search-engine item is the last one).
2. In `src/lib/site.ts` set `ALLOW_SEARCH_ENGINES = true`, commit, merge, and let the deploy finish.
3. Run `npm run smoke -- https://your-address` (without `--preview`). Every line should say ok. (On GitHub Pages, header checks are skipped by design.)
4. Submit `https://your-address/sitemap-index.xml` in Google Search Console and Bing Webmaster Tools. Note: search engines read `robots.txt` only at the root of a domain, so on the `github.io/We-The-People/` address they rely on the page-level tags; a domain of your own makes this cleaner.
5. Share a story link in WhatsApp and Facebook to check the preview image and title appear.

## 9. Keep it healthy
- **Nightly rebuild:** automatic (the deploy workflow). Check the Actions tab now and then; a red mark means a build failed.
- **Uptime:** a free monitor such as UptimeRobot on the site address, alerting the person named in `docs/17`.
- **Forms:** watch the Formspree and Brevo dashboards; both cap submissions on free plans.
- **Backups:** the Git repository is the backup of everything (text, photos, video, settings). Keep a second copy: clone it to another machine or mirror it to a second Git host every month. Form submissions live in Formspree and Brevo, not in the repository; export them from there.
- **Rollback:** open the repository's **Actions** tab, find the last good **deploy** run and press **Re-run all jobs**; or revert the last change in GitHub (the **Revert** button on a merged pull request) and the site republishes.
- **Updates:** once a month run `npm audit` and `npm outdated`; update in a branch, run `npm run test:e2e`, then merge.

## Checks that run automatically
Every push runs the formatting, type, build, accessibility and behaviour tests and the Lighthouse gate (`ci`); a separate job builds the site in a subfolder and checks that every internal address is right; the deploy workflow repeats that address check before publishing, so a broken build is never published.

## Known gaps at launch
- The march-speech video has no captions (owner decision; DECISIONS D11).
- Firefox, Safari, real phones and screen readers have not been tested by a person.
- The Content Security Policy allows inline scripts; tightening it needs a host that can add a nonce or hashes.
- On GitHub Pages: no `X-Frame-Options`, no custom caching, no per-change preview.
