import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Missing facts are never invented: use "[PLACEHOLDER: ...]" and log in content/PLACEHOLDERS.md.
const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
  }),
});

const programs = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/programs' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(160),
    order: z.number(),
    status: z
      .enum(['founding-priority', 'active', 'paused'])
      .default('founding-priority'),
  }),
});

const record = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/record' }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    sourceUrl: z.url().optional(), // an independent source is required before publishing
  }),
});

// One file per county, only when the owner provides real branch information.
const counties = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/counties' }),
  schema: z.object({
    branchStatus: z.enum(['active', 'forming']),
    contact: z.string().optional(),
  }),
});

// Stories are published only with documented consent (content/CONSENT-LOG.md).
// `images` are in src/assets/photos; the first is the lead photo. Every image needs honest alt text.
const stories = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/stories' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().max(160),
      date: z.coerce.date(),
      byline: z.string(),
      county: z.string().optional(),
      consent: z.literal(true),
      images: z
        .array(
          z.object({
            src: image(),
            alt: z.string().min(10),
            caption: z.string().optional(),
            credit: z.string().default('We The People Movement'),
          }),
        )
        .default([]),
    }),
});

// Times are Africa/Monrovia (UTC+0). Registration is offered only when `registration: true`.
const events = defineCollection({
  // EVENTS_DIR lets tests build against fixtures; production uses content/events.
  loader: glob({
    pattern: '*.md',
    base: process.env.EVENTS_DIR ?? './content/events',
  }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(160),
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    place: z.string(),
    county: z.string().optional(),
    registration: z.boolean().default(false),
  }),
});

export const collections = {
  pages,
  programs,
  record,
  counties,
  stories,
  events,
};
