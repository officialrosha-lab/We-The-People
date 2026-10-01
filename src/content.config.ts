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
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().max(160),
      order: z.number(),
      status: z
        .enum(['founding-priority', 'active', 'paused'])
        .default('founding-priority'),
      // Optional photo gallery shown under the text (all people shown have given consent; see content/CONSENT-LOG.md).
      gallery: z
        .array(
          z.object({
            src: image(),
            alt: z.string().min(10),
            caption: z.string().optional(),
          }),
        )
        .optional(),
    }),
});

const record = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/record' }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    sourceUrl: z.url().optional(), // an independent source is preferred; own posts must say so in sourceLabel
    sourceLabel: z.string().default('Source'),
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
  // STORIES_FIXTURES adds test-only stories (never set in production). The base is the repository root so the
  // fixtures folder is reachable; ids are the file names, so story URLs are unchanged.
  loader: glob({
    pattern: [
      'content/stories/*.md',
      ...(process.env.STORIES_FIXTURES ? [process.env.STORIES_FIXTURES] : []),
    ],
    base: '.',
    generateId: ({ entry }) => entry.replace(/^.*\//, '').replace(/\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().max(160),
      date: z.coerce.date(),
      byline: z.string(),
      county: z.string().optional(),
      consent: z.literal(true),
      // Captions (WebVTT) and a transcript are optional but encouraged; the player says so when they are missing.
      // Video files live in public/video.
      video: z
        .object({
          src: z.string().startsWith('/video/'),
          poster: image(),
          posterAlt: z.string().min(10),
          captions: z
            .string()
            .startsWith('/video/')
            .endsWith('.vtt')
            .optional(),
          transcript: z.string().min(40).optional(),
          title: z.string(),
          duration: z.string(),
        })
        .optional(),
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
