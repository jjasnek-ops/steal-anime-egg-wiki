import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        summary: z.string(),
        lastVerified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        factIds: z.array(z.string()).default([]),
        pageKind: z.enum(['home', 'article', 'hub', 'trust']).default('article'),
        faq: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
      }),
    }),
  }),
};

