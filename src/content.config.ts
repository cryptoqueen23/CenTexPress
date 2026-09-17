import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const stories = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/stories' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.enum(['Local','Government','Schools','Business','Community','Investigations','Opinion']),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    author: z.string().default('CenTex Press'),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    language: z.enum(['en','es']).default('en'),
    sources: z.array(z.object({ label: z.string(), url: z.string().url() })).default([])
  })
});

export const collections = { stories };
