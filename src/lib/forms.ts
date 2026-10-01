import { counties } from './counties';

/**
 * Reads a third-party endpoint from the environment and refuses anything that is not HTTPS on the expected
 * provider's domain. A mistyped or pasted URL would otherwise send people's details to the wrong place.
 */
function endpoint(name: string, host: string): string {
  const value = (import.meta.env[name] ?? '').trim();
  if (!value) return '';
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${name} is not a valid URL.`);
  }
  const ok = url.hostname === host || url.hostname.endsWith(`.${host}`);
  if (url.protocol !== 'https:' || !ok) {
    throw new Error(`${name} must be an https URL on ${host}.`);
  }
  return url.toString();
}

/** Formspree receives the join, contact and event registration forms. Empty means those forms are disabled. */
export const formEndpoint: string = endpoint(
  'PUBLIC_FORMSPREE_ENDPOINT',
  'formspree.io',
);

/** Brevo receives newsletter sign-ups. Empty means the footer newsletter box is hidden. */
export const newsletterEndpoint: string = endpoint(
  'PUBLIC_BREVO_FORM_URL',
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
