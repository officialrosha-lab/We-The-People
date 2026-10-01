import type { APIRoute } from 'astro';
import { url } from '../lib/url';
import { allowSearchEngines } from '../lib/site';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(url('/sitemap-index.xml'), site).toString();
  // While ALLOW_SEARCH_ENGINES is false (src/lib/site.ts) the whole site asks to be left alone.
  const body = allowSearchEngines
    ? `User-agent: *\nAllow: /\nDisallow: /thanks/\n\nSitemap: ${sitemap}\n`
    : `User-agent: *\nDisallow: /\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
