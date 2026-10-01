import { getCollection } from 'astro:content';
import type { APIRoute, GetStaticPaths } from 'astro';
import { ics } from '../../lib/events';

export const getStaticPaths = (async () => {
  const events = await getCollection('events');
  return events.map((e) => ({ params: { slug: e.id }, props: { event: e } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props, site }) => {
  const event = props.event as Awaited<
    ReturnType<typeof getCollection<'events'>>
  >[number];
  const url = new URL(`/events/${event.id}/`, site).toString();
  return new Response(ics(event, url), {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
  });
};
