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

export const collections = { pages, programs, record };
