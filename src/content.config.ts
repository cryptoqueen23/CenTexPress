import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const stories = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/stories' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    section: z.enum(['Local','Government','Schools','Business','Community','Investigations','Opinion']),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    author: z.string().default('CenTex Press'),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    language: z.enum(['en','es']).default('en'),
    sources: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
    image: image().optional(),
    imageAlt: z.string().optional(),
    imageCredit: z.string().optional(),
    opinionCategory: z.enum(['From the Publisher','Community Voices','Letters to the Editor']).optional(),
    authorRole: z.string().optional(),
    columnName: z.string().optional(),
    correctionsNote: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional()
  })
});

const receipts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/receipts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    agency: z.string(),
    documentType: z.enum(['Agenda','Budget','Ordinance','Contract','Public Record','Audit','Report','Other']),
    documentDate: z.coerce.date(),
    published: z.coerce.date(),
    fileUrl: z.string().url(),
    relatedStory: z.string().optional(),
    language: z.enum(['en','es']).default('en')
  })
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    startsAt: z.coerce.date(),
    endsAt: z.coerce.date().optional(),
    venue: z.string(),
    city: z.string(),
    organizer: z.string().optional(),
    url: z.string().url().optional(),
    draft: z.boolean().default(false)
  })
});

export const collections = { stories, receipts, events };

