import { counties } from './counties';

/** Hosted form endpoint, set at build time. Empty means forms are shown but cannot send. */
export const formEndpoint: string = import.meta.env.PUBLIC_FORM_ENDPOINT ?? '';

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
