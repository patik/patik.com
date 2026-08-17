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

const pullRequests = defineCollection({
    loader: glob({ pattern: '**/index.md', base: './src/pull-requests' }),
    schema: z.object({
        title: z.string(),
        prNumber: z.number(),
        date: z.coerce.date(),
        /** Short label shown above the title, e.g. “Migration guide” */
        kind: z.string(),
        /** One-sentence summary shown on the index and beneath the title */
        standfirst: z.string(),
        /** Position in the curated running order */
        order: z.number(),
        /** Shown up front on the index; the rest sit behind a disclosure */
        featured: z.boolean().optional(),
        /** Fields below reproduce the original pull request's header */
        author: z.string(),
        state: z.enum(['merged', 'closed', 'open']),
        baseBranch: z.string(),
        headBranch: z.string(),
        additions: z.number(),
        deletions: z.number(),
        changedFiles: z.number(),
        reviewCount: z.number(),
    }),
})

export const collections = { blog, pullRequests }
