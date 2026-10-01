import { counties } from './counties';

/**
 * THIRD-PARTY FORM ADDRESSES: paste them here, between the quotes. No other setting is needed.
 *
 *  - FORMSPREE_URL receives Join, Contact and Event registration. Looks like https://formspree.io/f/xxxxxxxx
 *  - BREVO_FORM_URL receives newsletter sign-ups. It is the action URL of a Brevo sign-up form
 *    (with double confirmation on). Looks like https://xxxxxxxx.sibforms.com/serve/xxxxxxxx
 *
 * Both values are public (they end up in the page HTML), so never paste an API key or secret here.
 * While a value is empty the form still shows and validates, but pressing Send says nothing was sent.
 * Steps for each service: docs/13-form-integrations.md.
 */
const FORMSPREE_URL = '';
const BREVO_FORM_URL = '';

/**
 * Accepts only an https address on the expected provider's domain, so a mistyped or pasted wrong URL fails the
 * build instead of sending people's details somewhere else. `override` exists only so automated tests can use
 * test addresses; the owner never needs it.
 */
function checked(
  name: string,
  value: string,
  override: string | undefined,
  host: string,
): string {
  const v = (override || value).trim();
  if (!v) return '';
  let url: URL;
  try {
    url = new URL(v);
  } catch {
    throw new Error(`${name} is not a valid URL.`);
  }
  const ok = url.hostname === host || url.hostname.endsWith(`.${host}`);
  if (url.protocol !== 'https:' || !ok) {
    throw new Error(`${name} must be an https URL on ${host}.`);
  }
  return url.toString();
}

export const formEndpoint: string = checked(
  'FORMSPREE_URL',
  FORMSPREE_URL,
  import.meta.env.PUBLIC_FORMSPREE_ENDPOINT,
  'formspree.io',
);

export const newsletterEndpoint: string = checked(
  'BREVO_FORM_URL',
  BREVO_FORM_URL,
  import.meta.env.PUBLIC_BREVO_FORM_URL,
  'sibforms.com',
);

export const countyOptions = [
  ...counties.map((c) => c.name),
  'Outside Liberia',
];

export const helpOptions = [
  { value: 'member', label: 'Become a member' },
  { value: 'branch', label: 'Start or join a branch in my county' },
  { value: 'volunteer', label: 'Volunteer my time or skills' },
  { value: 'media', label: 'Offer media coverage or air time' },
];
