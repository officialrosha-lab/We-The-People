/**
 * Content-Security-Policy, as a <meta> tag on every page. GitHub Pages cannot send response headers, so the policy
 * travels inside the page. Hosts that read public/_headers (Netlify, Cloudflare Pages) send the same policy as a
 * header too, plus `frame-ancestors 'none'`, which a <meta> tag cannot carry. tests/seo.spec.ts keeps the two in step.
 * Only the site itself and the two form services (src/lib/forms.ts) are allowed.
 */
export const csp = [
  "default-src 'self'",
  "img-src 'self' data:",
  "media-src 'self'",
  "font-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'",
  "connect-src 'self' https://formspree.io https://*.sibforms.com",
  "form-action 'self' https://formspree.io https://*.sibforms.com",
  "base-uri 'self'",
  "object-src 'none'",
].join('; ');
