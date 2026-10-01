// Builds src/data/liberia-map.json (county paths) from Natural Earth admin-1 (public domain).
// Run: node scripts/build-map.mjs   (needs mapshaper, installed as a dev dependency)
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const tmp = 'scripts/data/.simplified.geojson';
execFileSync(
  'npx',
  [
    'mapshaper',
    'scripts/data/liberia-counties.geojson',
    '-simplify',
    '20%',
    'keep-shapes',
    '-o',
    tmp,
    'format=geojson',
    'force',
  ],
  { stdio: 'inherit' },
);
const fc = JSON.parse(readFileSync(tmp, 'utf8'));

const lat0 = 6.5 * (Math.PI / 180);
const kx = Math.cos(lat0);
const pts = [];
const rings = (g) =>
  (g.type === 'Polygon' ? [g.coordinates] : g.coordinates).flat();
fc.features.forEach((f) =>
  rings(f.geometry).forEach((r) =>
    r.forEach(([x, y]) => pts.push([x * kx, -y])),
  ),
);
const minX = Math.min(...pts.map((p) => p[0]));
const minY = Math.min(...pts.map((p) => p[1]));
const maxX = Math.max(...pts.map((p) => p[0]));
const maxY = Math.max(...pts.map((p) => p[1]));
const S = 200; // units per degree
const w = Math.ceil((maxX - minX) * S);
const h = Math.ceil((maxY - minY) * S);
const fmt = (n) => Math.round(n);
const path = (g) =>
  (g.type === 'Polygon' ? [g.coordinates] : g.coordinates)
    .flat()
    .map(
      (r) =>
        'M' +
        r
          .map(
            ([x, y]) => `${fmt((x * kx - minX) * S)} ${fmt((-y - minY) * S)}`,
          )
          .join('L') +
        'Z',
    )
    .join('');

const counties = fc.features
  .map((f) => ({
    id: f.properties.id,
    name: f.properties.name,
    d: path(f.geometry),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));
mkdirSync('src/data', { recursive: true });
writeFileSync(
  'src/data/liberia-map.json',
  JSON.stringify({ viewBox: `0 0 ${w} ${h}`, counties }),
);
console.log('viewBox', w, h, 'bytes', JSON.stringify(counties).length);
