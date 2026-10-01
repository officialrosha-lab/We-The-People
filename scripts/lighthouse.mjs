// Runs Lighthouse (mobile, simulated slow 4G) on key pages and fails if any score is under 95
// or the largest contentful paint is over 2.5 s. Usage: node scripts/lighthouse.mjs [baseUrl] [--only=/path/]
// Needs a running site (npm run build && npm run preview) and Chrome; set CHROME_PATH if it is not on the PATH.
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const base =
  process.argv.find((a) => a.startsWith('http')) ?? 'http://localhost:4321';
const only = process.argv.find((a) => a.startsWith('--only='))?.slice(7);
const allPages = [
  '/',
  '/about/',
  '/our-work/drugs-and-recovery/',
  '/counties/',
  '/counties/lofa/',
  '/stories/',
  '/stories/2025-08-march-to-the-capitol/',
  '/stories/2025-11-school-visit/',
  '/record/',
  '/join/',
  '/contact/',
  '/search/',
];
const pages = only ? [only] : allPages;
const MIN = 95;
const MAX_LCP = 2500;

const chrome = await chromeLauncher.launch({
  chromeFlags: ['--headless=new', '--no-sandbox'],
});
let failed = 0;
for (const path of pages) {
  const { lhr } = await lighthouse(base + path, {
    port: chrome.port,
    output: 'json',
    logLevel: 'error',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  });
  const s = Object.fromEntries(
    Object.entries(lhr.categories).map(([k, v]) => [
      k,
      Math.round((v.score ?? 0) * 100),
    ]),
  );
  const lcp = Math.round(
    lhr.audits['largest-contentful-paint'].numericValue ?? 0,
  );
  const cls = lhr.audits['cumulative-layout-shift'].numericValue ?? 0;
  const kb = Math.round(
    (lhr.audits['total-byte-weight'].numericValue ?? 0) / 1024,
  );
  const bad =
    Object.values(s).some((v) => v < MIN) || lcp > MAX_LCP || cls > 0.1;
  if (bad) {
    failed++;
    // Say what the page downloaded, biggest first, so a failure can be understood from the CI log alone.
    const reqs = (lhr.audits['network-requests'].details?.items ?? [])
      .filter((r) => r.transferSize > 1500)
      .sort((a, b) => b.transferSize - a.transferSize)
      .slice(0, 9);
    for (const r of reqs)
      console.log(
        `       ${String(Math.round(r.transferSize / 1024)).padStart(4)} KB  starts ${String(Math.round(r.networkRequestTime)).padStart(5)} ms  ${r.url.replace(base, '').slice(0, 80)}`,
      );
    const lcpNode = lhr.audits['lcp-breakdown-insight']?.details?.items?.find(
      (i) => i.type === 'node',
    );
    if (lcpNode)
      console.log(
        `       LCP element: ${String(lcpNode.snippet).slice(0, 120)}`,
      );
  }
  console.log(
    `${bad ? 'FAIL' : 'ok  '} ${path.padEnd(42)} perf ${s.performance} a11y ${s.accessibility} bp ${s['best-practices']} seo ${s.seo} | LCP ${lcp} ms CLS ${cls.toFixed(3)} ${kb} KB`,
  );
}
await chrome.kill();
process.exit(failed ? 1 : 0);
