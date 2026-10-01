/**
 * Search engines: while this is false, every page tells them not to list the site (meta robots noindex) and
 * robots.txt asks them to stay away. Keep it false while the site is a preview with unfinished content (for example
 * on the github.io address). Set it to true on launch day, together with the real domain (docs/14, step 8).
 */
const ALLOW_SEARCH_ENGINES = false;

/**
 * The value the site uses. PUBLIC_ALLOW_INDEXING=1 at build time overrides the setting above; it exists only so the
 * speed and quality check (npm run lighthouse in CI) can score the launch configuration, since Lighthouse's SEO score
 * rightly drops while search engines are told to stay away. The owner never sets it.
 */
export const allowSearchEngines =
  ALLOW_SEARCH_ENGINES || import.meta.env.PUBLIC_ALLOW_INDEXING === '1';
