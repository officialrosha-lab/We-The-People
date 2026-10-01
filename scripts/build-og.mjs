// Renders public/og-default.png (1200x630), the share image for pages without their own photo.
// Uses the site's own fonts and the real county map. Run: node scripts/build-og.mjs  (needs Chromium; set CHROMIUM_PATH if needed)
import { chromium } from 'playwright-core';
import { readFileSync, writeFileSync } from 'node:fs';

const map = JSON.parse(readFileSync('src/data/liberia-map.json', 'utf8'));
// Embedded as a data URI: a page set from a string cannot read local files.
const font = `data:font/woff2;base64,${readFileSync('node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2').toString('base64')}`;
const paths = map.counties.map((c) => `<path d="${c.d}"/>`).join('');
const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:A;src:url(${font}) format('woff2-variations');font-weight:100 900;font-stretch:62% 125%}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#071B3A;color:#F2F4F7;font-family:A;position:relative;overflow:hidden}
.t{position:absolute;left:64px;top:56px;font-weight:900;font-stretch:62%;text-transform:uppercase;font-size:158px;line-height:.88;letter-spacing:-.01em}
.s{position:absolute;left:64px;bottom:96px;font-weight:800;font-stretch:90%;font-size:54px;line-height:1}
.n{position:absolute;left:64px;bottom:44px;font-weight:600;font-size:26px;color:#B6C2D9}
svg{position:absolute;right:40px;top:64px;width:370px;height:auto}
path{fill:#fff;stroke:#071B3A;stroke-width:2}
</style><div class="t">We<br>The People</div><div class="s">Fifteen counties. One table.</div><div class="n">We The People Movement</div>
<svg viewBox="${map.viewBox}">${paths}</svg>`;

const b = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
});
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(html);
await p.evaluate(() => document.fonts.ready);
writeFileSync('public/og-default.png', await p.screenshot({ type: 'png' }));
await b.close();
console.log('wrote public/og-default.png');
