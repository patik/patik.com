import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const blog = defineCollection({
    loader: glob({ pattern: '**/index.md', base: './src/posts' }),
    schema: z.object({
        id: z.number().optional(),
        title: z.string(),
        excerpt: z.string().optional(),
        date: z.coerce.date(),
        categories: z.array(z.string()).optional(),
        ogImage: z.string().optional(),
        coverImage: z.string().optional(),
        unpublished: z.boolean().optional(),
    }),
})

export const collections = { blog }
