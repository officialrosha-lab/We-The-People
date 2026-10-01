// Pre-launch gate. Lists what still stops the site going public. Usage: node scripts/launch-check.mjs
// Exit code 1 while any BLOCKER remains. SHOULD and INFO never fail it. Reads the repository only.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const read = (p) =>
  existsSync(join(root, p)) ? readFileSync(join(root, p), 'utf8') : '';
const walk = (dir, out = []) => {
  if (!existsSync(join(root, dir))) return out;
  for (const f of readdirSync(join(root, dir))) {
    const p = join(dir, f);
    if (statSync(join(root, p)).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
};

const findings = []; // { level, what, fix }
const add = (level, what, fix) => findings.push({ level, what, fix });

// 1. Production address and publishing.
const config = read('astro.config.mjs');
const deploy = read('.github/workflows/deploy.yml');
const publishedByWorkflow = /SITE_URL:\s*\$\{\{/.test(deploy);
if (!publishedByWorkflow && /example\.org/.test(config))
  add(
    'BLOCKER',
    'The site address is still the placeholder example.org and no deploy workflow supplies a real one.',
    'Set up GitHub Pages (docs/14, step 1) or paste the real address into astro.config.mjs.',
  );
else if (publishedByWorkflow)
  add(
    'INFO',
    'The deploy workflow supplies the real address when it publishes. Publishing is switched on in the repository settings (docs/14, step 1).',
    'Settings > Pages > Source: GitHub Actions, then the variable DEPLOY_PAGES = true.',
  );
if (/ALLOW_SEARCH_ENGINES = false/.test(read('src/lib/site.ts')))
  add(
    'BLOCKER',
    'Search engines are told to ignore the site (ALLOW_SEARCH_ENGINES is false in src/lib/site.ts). Right for a preview, wrong for launch.',
    'On launch day set it to true (docs/14, step 8), then run the smoke test without --preview.',
  );

// 2. Form services.
const forms = read('src/lib/forms.ts');
if (/const FORMSPREE_URL = '';/.test(forms))
  add(
    'BLOCKER',
    'Join, Contact and Event forms are not connected (FORMSPREE_URL is empty): pressing Send says nothing was sent.',
    'Create the Formspree form and paste its address into src/lib/forms.ts (docs/13).',
  );
if (/const BREVO_FORM_URL = '';/.test(forms))
  add(
    'BLOCKER',
    'The newsletter is not connected (BREVO_FORM_URL is empty).',
    'Create the Brevo sign-up form with double confirmation and paste its address (docs/13).',
  );

// 3. Logo.
if (
  existsSync(join(root, 'public/mark-placeholder.svg')) &&
  /mark-placeholder/.test(read('src/components/Header.astro'))
)
  add(
    'BLOCKER',
    'The header and favicon use an interim cut-out of the supplied raster logo, and the share image has no logo.',
    'Get the vector logo (or approve a faithful rebuild), replace public/mark-placeholder.svg and public/favicon.svg, then run `node scripts/build-og.mjs`.',
  );

// 4. Legal and public-facing text, by file.
const placeholderRe = /\[PLACEHOLDER[^\]]*\]/g;
const files = [...walk('content'), ...walk('src')].filter(
  (f) =>
    /\.(md|astro)$/.test(f) &&
    !f.includes('CONSENT-LOG') &&
    !f.endsWith('PLACEHOLDERS.md') &&
    !f.includes('README'),
);
const byFile = new Map();
for (const f of files) {
  const n = (read(f).match(placeholderRe) ?? []).length;
  if (n) byFile.set(f, n);
}
const total = [...byFile.values()].reduce((a, b) => a + b, 0);

const mustBeClean = [
  [
    'content/pages/privacy.md',
    'Privacy policy',
    'legal review, then fill the marked gaps',
  ],
  [
    'content/pages/contact.md',
    'Contact page',
    'supply the real email, phone or WhatsApp and address',
  ],
  [
    'content/pages/transparency.md',
    'Transparency page',
    'supply governance, registration number and funding',
  ],
  [
    'src/components/Footer.astro',
    'Footer',
    'supply registration number, address, funding statement and social links',
  ],
];
for (const [f, name, fix] of mustBeClean) {
  const n = byFile.get(f);
  if (n)
    add(
      'BLOCKER',
      `${name} still has ${n} placeholder${n > 1 ? 's' : ''}.`,
      `Owner: ${fix}.`,
    );
}
if (/Draft for legal review/.test(read('content/pages/privacy.md')))
  add(
    'BLOCKER',
    'The privacy policy is marked "Draft for legal review".',
    'A qualified person reviews it; then remove the draft line.',
  );
if (/Draft, written/.test(read('content/pages/accessibility.md')))
  add(
    'SHOULD',
    'The accessibility statement is still marked as a draft and has no manual screen-reader test result.',
    'Run a screen-reader pass (NVDA or VoiceOver), record the date and result, then finalise.',
  );

// 5. Everything else that is still a placeholder.
const rest = [...byFile.entries()].filter(
  ([f]) => !mustBeClean.some(([m]) => m === f),
);
if (rest.length)
  add(
    'SHOULD',
    `${rest.reduce((a, [, n]) => a + n, 0)} other placeholders remain in ${rest.length} files: ${rest.map(([f, n]) => `${f.replace(/^content\//, '')} (${n})`).join(', ')}.`,
    'Supply the content, or consciously accept each one (content/PLACEHOLDERS.md says who can supply it).',
  );

// 6. Consent.
const consent = read('content/CONSENT-LOG.md');
const open = (consent.match(/\[PLACEHOLDER[^\]]*\]/g) ?? []).length;
if (open)
  add(
    'SHOULD',
    `The consent log has ${open} open item${open > 1 ? 's' : ''} (where written consents are stored, audio consent for the video).`,
    'Owner confirms each and records where the written records are kept.',
  );

// 7. Known and accepted gaps.
const march = read('content/stories/2025-08-march-to-the-capitol.md');
if (/^video:/m.test(march) && !/^\s+captions:/m.test(march))
  add(
    'INFO',
    'The march-speech video has no captions (owner decision, DECISIONS D11; fails WCAG 2.2 1.2.2).',
    'Add captions when someone can write them (assets/video/README.md).',
  );
const homeMd = read('content/pages/home.md');
if (/^video:/m.test(homeMd) && !/^\s+captions:/m.test(homeMd))
  add(
    'INFO',
    'The introduction video on the home page has no captions yet (fails WCAG 2.2 1.2.2 until someone writes them).',
    'Add captions when someone can write them (assets/video/README.md, same steps; use the `video:` block in content/pages/home.md).',
  );
add(
  'INFO',
  'Not tested by a person: screen readers and a real low-end phone. The automated tests pass on Chromium, Firefox and WebKit (Safari engine) in CI, but a real iPhone and a real low-end Android are still worth one look.',
  'See docs/14-launch-runbook.md, "Test on real devices".',
);

// Report.
const order = ['BLOCKER', 'SHOULD', 'INFO'];
console.log(
  `\nLaunch check: ${findings.filter((f) => f.level === 'BLOCKER').length} blockers, ${findings.filter((f) => f.level === 'SHOULD').length} to do, ${findings.filter((f) => f.level === 'INFO').length} notes. Placeholders in published files: ${total}.\n`,
);
for (const level of order) {
  const list = findings.filter((f) => f.level === level);
  if (!list.length) continue;
  console.log(`${level}`);
  for (const f of list) console.log(`  - ${f.what}\n    Fix: ${f.fix}`);
  console.log('');
}
process.exit(findings.some((f) => f.level === 'BLOCKER') ? 1 : 0);
