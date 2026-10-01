// Post-deploy smoke test. Usage: node scripts/smoke.mjs https://your-domain.org
// Checks the live site the way a visitor and a search engine would. Exit code 1 if anything fails.
const base = (process.argv[2] ?? '').replace(/\/$/, '');
if (!/^https?:\/\//.test(base)) {
  console.error('Usage: node scripts/smoke.mjs https://your-domain.org');
  process.exit(2);
}
const secure = base.startsWith('https://');
let failed = 0;
const ok = (cond, label, extra = '') => {
  if (!cond) failed++;
  console.log(
    `${cond ? 'ok  ' : 'FAIL'} ${label}${extra ? ` (${extra})` : ''}`,
  );
};
const get = (path, opts = {}) =>
  fetch(base + path, { redirect: 'manual', ...opts });

// 1. Sitemap lists the pages; every one answers 200 with a title, one h1 and no leftover placeholder address.
const sm = await get('/sitemap-0.xml');
ok(sm.status === 200, 'sitemap-0.xml is served', String(sm.status));
const urls = [...(await sm.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => new URL(m[1]).pathname,
);
ok(urls.length >= 30, 'sitemap lists the pages', `${urls.length} pages`);
let badAddress = 0;
for (const path of urls) {
  const r = await get(path);
  const html = r.status === 200 ? await r.text() : '';
  const good =
    r.status === 200 &&
    /<title>[^<]{4,}/.test(html) &&
    (html.match(/<h1[ >]/g) ?? []).length === 1;
  ok(good, `page ${path}`, String(r.status));
  if (/https?:\/\/example\.org/.test(html)) badAddress++;
}
ok(
  badAddress === 0,
  'no page still points at the placeholder address example.org',
  badAddress ? `${badAddress} pages` : '',
);

// 2. Missing pages return a real 404 with a helpful page.
const nf = await get('/this-page-does-not-exist/');
ok(nf.status === 404, 'a missing page returns 404', String(nf.status));
ok(/Page not found/.test(await nf.text()), 'the 404 page says what happened');

// 3. Files visitors and crawlers need.
for (const [path, type] of [
  ['/robots.txt', 'text/plain'],
  ['/sitemap-index.xml', 'xml'],
  ['/og-default.png', 'image/png'],
  ['/favicon.svg', 'svg'],
  ['/video/march-speech.mp4', 'video/mp4'],
  ['/pagefind/pagefind.js', 'javascript'],
]) {
  const r = await get(path, { method: 'HEAD' });
  ok(
    r.status === 200 && (r.headers.get('content-type') ?? '').includes(type),
    `${path} is served`,
    `${r.status} ${r.headers.get('content-type') ?? ''}`,
  );
}
const robots = await (await get('/robots.txt')).text();
ok(
  /Sitemap: https?:\/\/(?!example\.org)/.test(robots),
  'robots.txt names the real sitemap address',
);

// 4. Security headers (set by public/_headers on Netlify or Cloudflare Pages).
const home = await get('/');
const h = (n) => home.headers.get(n) ?? '';
ok(
  /default-src 'self'/.test(h('content-security-policy')),
  'Content-Security-Policy is set',
);
ok(
  /formspree\.io/.test(h('content-security-policy')) &&
    /sibforms\.com/.test(h('content-security-policy')),
  'CSP allows the two form services',
);
ok(
  h('x-content-type-options') === 'nosniff',
  'X-Content-Type-Options: nosniff',
);
ok(/strict-origin/.test(h('referrer-policy')), 'Referrer-Policy is set');
ok(/DENY/i.test(h('x-frame-options')), 'X-Frame-Options: DENY');
if (secure)
  ok(
    /max-age=\d{6,}/.test(h('strict-transport-security')),
    'HTTPS is enforced with Strict-Transport-Security (usually the host adds it)',
  );
const asset = /\/_astro\/[^"']+\.css/.exec(await home.clone().text())?.[0];
if (asset)
  ok(
    /immutable/.test(
      (await get(asset, { method: 'HEAD' })).headers.get('cache-control') ?? '',
    ),
    'built assets are cached for a year',
  );

// 5. HTTPS: plain http redirects to https.
if (secure) {
  const r = await fetch(base.replace('https://', 'http://') + '/', {
    redirect: 'manual',
  });
  ok(
    [301, 302, 307, 308].includes(r.status) &&
      (r.headers.get('location') ?? '').startsWith('https://'),
    'http redirects to https',
    String(r.status),
  );
}

// 6. The forms are connected: the page must point at Formspree and Brevo, not be empty.
const join = await (await get('/join/')).text();
ok(
  /data-endpoint="https:\/\/formspree\.io\/f\//.test(join),
  'Join form is connected to Formspree',
);
ok(
  /data-endpoint="https:\/\/[a-z0-9-]+\.sibforms\.com\//.test(
    await (await get('/')).text(),
  ),
  'Newsletter is connected to Brevo',
);

console.log(failed ? `\n${failed} check(s) failed.` : '\nAll checks passed.');
console.log(
  'Not covered here: a real form submission. Send one of each and check the Formspree inbox and the Brevo list (docs/14).',
);
process.exit(failed ? 1 : 0);
