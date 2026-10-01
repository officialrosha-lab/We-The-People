# 17. Handover

What the owner needs to keep the site running. Fill in the names marked [PLACEHOLDER].

## What the site is
A static website: a folder of finished pages (`dist/`) built from text files and photos. No server, no database, no login, no cookies, no analytics. The only things that run on the visitor's side are small scripts for the opening animation, the menu, search and form sending. Everything else is plain pages.

## Accounts and who owns them
| Service | What it is for | Owner | Notes |
|---|---|---|---|
| GitHub (this repository) | All content, photos, code and history; the backup | [PLACEHOLDER: name/organisation] | Give at least two people admin access, so one person leaving cannot lock the site. |
| Host (Netlify or Cloudflare Pages) | Builds and serves the site; HTTPS; rollbacks | [PLACEHOLDER] | Deploy hook for the nightly rebuild (`docs/14`). |
| Domain registrar | The web address | [PLACEHOLDER] | Turn on auto-renew and registrar lock. |
| Formspree | Receives Join, Contact and Event forms; emails the inbox | [PLACEHOLDER] | Free plan caps submissions; the inbox address is [PLACEHOLDER]. |
| Brevo | Newsletter list and sending | [PLACEHOLDER] | Double confirmation must stay on. |
| Search Console / Bing Webmaster | Search visibility | [PLACEHOLDER] | Submit `sitemap-index.xml`. |
| Uptime monitor | Alerts if the site is down | [PLACEHOLDER] | Alert goes to [PLACEHOLDER]. |

Costs: [PLACEHOLDER: monthly and yearly cost of the domain and any paid plans]. The software used is free.

## Where things are
```
content/    all text: pages, stories, events, record, programmes, counties; consent log; placeholder list
src/assets/photos/   photographs (the site makes small versions automatically)
public/     files served as they are: video, logo marks, share image, security headers (_headers)
src/        the site's code; only src/lib/forms.ts is meant to be edited by editors
docs/       the plan, design rules, runbook, editor guide, legal pack
scripts/    helper commands (launch check, smoke test, map and share-image builders)
tests/      automated tests (accessibility, menu, search, search-engine tags, forms)
DECISIONS.md and DESIGN-NOTES.md   why things are the way they are
```

## Everyday commands (for a developer)
```
npm install            once, to set up
npm run dev            work on the site locally (search does not work here)
npm run build          build the site and the search index
npm run preview        look at the built site
npm run test:e2e       the tests
npm run lighthouse     speed and quality scores on key pages
npm run launch-check   what still blocks launch
npm run smoke -- https://your-domain   test the live site
```

## Quality bar the site meets, and how it is kept
Every page passes automated accessibility checks (axe) and has one main heading, a unique title and description. Mobile Lighthouse scores on 12 key pages are 98 to 100 (performance) and 100 (accessibility, best practices, SEO); CI fails if any page drops below 95 or loads its main content slower than 2.5 s on simulated slow 4G. See `DESIGN-NOTES.md` for the numbers and the known gaps.

## Monthly routine (15 minutes)
1. Check the Formspree and Brevo dashboards for failed or unread submissions and plan limits.
2. Open the live site on a phone; try the menu, search and one form.
3. Run `npm audit` and `npm outdated`; update in a branch if needed.
4. Add new stories, events and Record entries (`docs/15`).
5. Check `content/PLACEHOLDERS.md`; remove what is done.
6. Copy or mirror the repository to a second place.

## People
- Site owner: [PLACEHOLDER]
- Technical contact: [PLACEHOLDER]
- Person who receives uptime alerts: [PLACEHOLDER]
- Person who answers privacy and removal requests: [PLACEHOLDER]
- Lawyer who reviewed the legal texts: [PLACEHOLDER], on [PLACEHOLDER date]

## What comes next (Phase 7, after launch)
Two weeks of monitoring and a fix list; review of which forms and pages people actually use; captions for the video; real photography and stories as they are consented; and, if wanted, an awards submission (concept statement, process notes, screenshots, results, credits; see `docs/11`).
