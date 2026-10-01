// Checks a built site for broken internal addresses. Usage: node scripts/check-links.mjs [distFolder] [basePath]
// basePath is "/" for a site at the root of a domain, or "/Repository" for a GitHub Pages project site.
// Every address that starts with "/" must start with the base path and point at a file that exists in the build.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = process.argv[2] ?? 'dist';
const base = (process.argv[3] ?? '/').replace(/\/$/, '');
const walk = (d, out = []) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    statSync(p).isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
};

const problems = new Map();
const note = (page, addr, why) => {
  const key = `${page}  ${addr}  (${why})`;
  problems.set(key, (problems.get(key) ?? 0) + 1);
};
const exists = (path) => {
  const p = join(dist, path);
  if (existsSync(p) && statSync(p).isFile()) return true;
  if (path.replace(/\/$/, '') === '/pagefind')
    return existsSync(join(p, 'pagefind.js')); // the search index folder
  return existsSync(join(p, 'index.html'));
};

let pages = 0;
let checked = 0;
for (const file of walk(dist).filter((f) => f.endsWith('.html'))) {
  pages++;
  const page = file.slice(dist.length).replace(/index\.html$/, '');
  const html = readFileSync(file, 'utf8');
  const addrs = [];
  for (const m of html.matchAll(
    /\s(?:href|src|action|poster|data-poster|data-pagefind)=(?:"([^"]*)"|'([^']*)')/g,
  ))
    addrs.push(m[1] ?? m[2]);
  for (const m of html.matchAll(/\s(?:srcset|imagesrcset)="([^"]*)"/g))
    for (const part of m[1].split(',')) addrs.push(part.trim().split(/\s+/)[0]);
  for (const m of html.matchAll(
    /<meta[^>]+property="og:image"[^>]+content="([^"]*)"/g,
  ))
    if (m[1].startsWith('/')) addrs.push(m[1]);
  for (const a of addrs) {
    if (!a || !a.startsWith('/') || a.startsWith('//')) continue; // external, #anchor, mailto, empty
    checked++;
    if (base && !(a === base || a.startsWith(`${base}/`))) {
      note(page, a, `missing the ${base} prefix`);
      continue;
    }
    const local =
      (base ? a.slice(base.length) : a).split('#')[0].split('?')[0] || '/';
    if (!exists(local)) note(page, a, 'no such file in the build');
  }
}
console.log(
  `Checked ${checked} internal addresses on ${pages} pages (base "${base || '/'}").`,
);
if (problems.size) {
  console.log(`\n${problems.size} problem${problems.size > 1 ? 's' : ''}:`);
  for (const [k, n] of [...problems].slice(0, 40))
    console.log(`  ${k}${n > 1 ? ` x${n}` : ''}`);
  process.exit(1);
}
console.log('All internal addresses are correct.');
