import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

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
      tags: z.array(z.string()),
      img: z.string(),
      img_alt: z.string().optional(),
      // Additional fields for a blog can be added here
      author: z.string().optional(),
      slug: z.string().optional(),
      content: z.string(),
    }),
  }),
};
