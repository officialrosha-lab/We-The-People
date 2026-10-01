# 15. Editor guide: changing the website without a developer

There is no login and no admin screen. The website is made from plain text files in this repository. To change the site you edit a file on GitHub; the host then rebuilds the site by itself. This guide shows the common jobs. You do not need to install anything.

## How a change gets onto the site
1. Open the repository on GitHub and find the file (the guide below says which).
2. Press the pencil icon, edit, then press **Commit changes**. Choose **Create a new branch and start a pull request** (safer than changing the live site directly).
3. The host builds a **preview link** for your change (Netlify and Cloudflare Pages do this on every pull request). Open it and check the page looks right.
4. If it looks right, press **Merge pull request**. The live site updates within a few minutes.
5. If the build fails, the pull request shows a red mark. Click it to read the message; it names the file and the problem (for example "summary is too long"). Fix it in the same pull request.

Never paste passwords, API keys or private information into any file. The two form addresses in `src/lib/forms.ts` are public by design; nothing else secret is ever needed.

## Writing rules (from `docs/06` and `docs/09`)
Plain words, short sentences, sentence case. Do not invent facts, numbers or quotes. If something is not known, write `[PLACEHOLDER: what is needed]` and add a line to `content/PLACEHOLDERS.md`. Every person, photograph and quote needs consent recorded in `content/CONSENT-LOG.md` first.

## Jobs

### Edit the text of a page
Files in `content/pages/`: `home.md`, `about.md`, `neutrality.md`, `our-work.md`, `counties.md`, `record.md`, `stories.md`, `transparency.md`, `contact.md`, `join.md`, `press.md`, `privacy.md`, `accessibility.md`. The top block between `---` lines has `title` and `description` (the description shows in search results; keep it under 160 characters). Under it is the text. A line starting `##` is a heading; `- ` starts a list item; `[words](/stories/)` makes a link.

### Add a story
1. Add the photos: on GitHub open `src/assets/photos/`, press **Add file → Upload files**. Use JPEG, about 2000 pixels wide at most. Name them in lowercase with dashes (`market-visit-1.jpg`).
2. Create `content/stories/2026-03-market-visit.md` (year, month, short name). Copy an existing story and change it. It must contain:
```
---
title: "Headline in sentence case"
summary: "One sentence, under 160 characters."
date: 2026-03-12
byline: "We The People Movement"
county: "Lofa"            # optional; spell the county exactly as on the site
consent: true            # the site refuses a story without this
images:
  - src: ../../src/assets/photos/market-visit-1.jpg
    alt: "What the photo shows, in a full sentence, without naming people"
    caption: "Short caption."
---
The text of the story.
```
3. `consent: true` is a promise that consent is recorded. The first image is the lead photo and the share image.

### Add an event
Create `content/events/2026-04-clean-up-day.md`:
```
---
title: "Clean-up day"
summary: "One sentence, under 160 characters."
start: 2026-04-18T09:00:00Z      # Monrovia time is the same as UTC
end: 2026-04-18T12:00:00Z        # optional
place: "Name of the place, town"
county: "Montserrado"            # optional
registration: true               # true shows the sign-up form
---
Details for people who want to come.
```
Events move to "Past events" by themselves, but only when the site is rebuilt, which the nightly rebuild does (`docs/14`, step 9).

### Add a line to the Record
Create `content/record/2026-02-short-name.md` with `date`, `title`, and, if possible, `sourceUrl` (a link to independent coverage or a primary document) and `sourceLabel` (what the link is, for example "Report in a national newspaper"). If the only source is the movement's own post, say so in `sourceLabel`.

### Say a branch is active in a county
Create `content/counties/lofa.md` (the file name is the county in lowercase with dashes, such as `grand-cape-mount`):
```
---
branchStatus: active      # or: forming
contact: "Name and how to reach them"
---
```
The county page then shows the branch instead of the placeholder. Only add what the branch has agreed to publish.

### Change a programme (Drugs and recovery, Skills, Financing, Branches)
Edit the files in `content/programs/`. Replace each `[PLACEHOLDER: ...]` under "What has happened" and "How to help" with real, dated, sourced facts.

### Add captions to the video
See `assets/video/README.md`.

### Connect or change the form services
`src/lib/forms.ts`, then `docs/13-form-integrations.md`.

### Change the site address
`astro.config.mjs`, the `site` line. See `docs/14`.

## What not to touch without a developer
Anything under `src/` other than the photos folder and `forms.ts`, `scripts/`, `tests/`, `package.json`, `public/_headers`, and the `.github` folder. If the site needs a new kind of page or feature, ask a developer; the tests (`npm run test:e2e`) protect accessibility and basic behaviour.

## If something goes wrong
- **A page shows a mistake:** fix the file and merge again, or on the host publish the previous deploy (`docs/14`, "Rollback").
- **The build fails:** read the red message; it usually names the file and the field.
- **A form seems broken:** check the Formspree and Brevo dashboards, then `docs/13`.
- **A photo must come down:** delete the photo file and remove it from the story's `images:` list, then merge. Update the consent log.
