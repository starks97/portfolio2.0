import { glob } from 'astro/loaders';
import { defineCollection, z, type CollectionConfig } from 'astro:content';
import { Category } from './interfaces';

export const work = defineCollection({
  loader: glob({ base: 'src/content/work', pattern: '**/[^_]*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    tags: z.array(z.string()),
    img: z.string(),
    img_alt: z.string().optional(),
  }),
});

export const posts = defineCollection({
  loader: glob({ base: 'src/content/posts', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    category: z.nativeEnum(Category),
    tags: z.array(z.string()),
    img: z.string(),
    img_alt: z.string().optional(),
    author: z.string().optional(),
    slug: z.string().optional(),
  }),
});

export const collections = { work, posts };
