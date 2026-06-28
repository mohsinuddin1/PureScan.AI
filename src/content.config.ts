import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: z.object({
    id: z.number(),
    title: z.string(),
    badge: z.string(),
    description: z.string(),
    image: z.string(),
  }),
});

export const collections = {
  'blog': blogCollection,
};
