import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';
import { Category } from './types';
export const collections = {
  work: defineCollection({
    // Load Markdown files in the src/content/work directory.
    loader: glob({ base: './src/content/work', pattern: '**/*.md' }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      tags: z.array(z.string()),
      img: z.string(),
      img_alt: z.string().optional(),
    }),
  }),
  posts: defineCollection({
    loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
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
  }),
};
