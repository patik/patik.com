import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

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
        draft: z.boolean().optional(),
    }),
})

export const collections = { blog }
