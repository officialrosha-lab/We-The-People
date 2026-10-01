// The site can live at the root of a domain (https://example.org/) or in a subfolder (GitHub Pages project sites:
// https://name.github.io/Repository/). Every internal link and file reference goes through url() so both work.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** "/about/" becomes "/Repository/about/" in a subfolder, and stays "/about/" at the root. Other kinds of link pass through. */
export const url = (path: string): string =>
  /^([a-z][a-z0-9+.-]*:|#|\/\/)/i.test(path)
    ? path
    : base + (path.startsWith('/') ? path : `/${path}`);
