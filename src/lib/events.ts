import { getCollection, type CollectionEntry } from 'astro:content';

export type EventEntry = CollectionEntry<'events'>;

const zone = 'Africa/Monrovia';
export const fmtDate = new Intl.DateTimeFormat('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: zone,
});
export const fmtTime = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: zone,
});

/** Upcoming and past are decided at build time, so the site must be rebuilt at least daily. */
export async function loadEvents() {
  const all = await getCollection('events');
  const now = Date.now();
  const end = (e: EventEntry) => (e.data.end ?? e.data.start).getTime();
  return {
    upcoming: all
      .filter((e) => end(e) >= now)
      .sort((a, b) => a.data.start.getTime() - b.data.start.getTime()),
    past: all
      .filter((e) => end(e) < now)
      .sort((a, b) => b.data.start.getTime() - a.data.start.getTime()),
  };
}

const stamp = (d: Date) =>
  d
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');
const esc = (s: string) => s.replace(/([,;\\])/g, '\\$1').replace(/\n/g, '\\n');

/** Minimal RFC 5545 calendar file for one event. Africa/Monrovia is UTC+0, so UTC times are correct. */
export function ics(e: EventEntry, url: string): string {
  const end = e.data.end ?? new Date(e.data.start.getTime() + 2 * 3600_000);
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//We The People Movement//Website//EN',
    'BEGIN:VEVENT',
    `UID:${e.id}@wethepeople`,
    `DTSTAMP:${stamp(e.data.start)}`,
    `DTSTART:${stamp(e.data.start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${esc(e.data.title)}`,
    `LOCATION:${esc(e.data.place)}`,
    `DESCRIPTION:${esc(e.data.summary)}\\n${url}`,
    `URL:${url}`,
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n');
}
