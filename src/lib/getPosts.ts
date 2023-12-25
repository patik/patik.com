import { withImageDimensions } from '@src/lib/withImageDimensions'
import fs from 'fs'
import matter from 'gray-matter'
import { defaults, omit } from 'lodash'
import { join } from 'path'

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
    return fs.readdirSync(postsDirectory)
}

export type PartialPost = {
    [key: string]: string
}

export async function getPostBySlug(slug: string, fields: string[] = []) {
    const fullPath = join(postsDirectory, `${slug}/index.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const partialPost: PartialPost = {}

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
        if (field === 'slug') {
            partialPost[field] = slug
        } else if (field === 'content') {
            partialPost[field] = content
        }

        if (typeof data[field] !== 'undefined') {
            partialPost[field] = data[field]
        }
    })

    return await withImageDimensions(partialPost)
}

/**
 * Returns a post without the `unpublished` property, unless it was actually requested
 *
 * We do this because we need to inspect the `unpublished` property when deciding which posts to return (based on the environment), but we don't want to actually expose the value unless the caller requested it.
 */
export function hideUnpublishedValue(requestedFields: string[]): (partialPost: PartialPost) => PartialPost {
    return (post) => {
        if (requestedFields.includes('unpublished')) {
            return post
        }

        return omit(post, 'unpublished')
    }
}

export async function getAllPosts(fields: string[] = []) {
    const slugs = getPostSlugs()
    const partialPosts = await Promise.all(
        slugs.map(async (slug) => await getPostBySlug(slug, [...fields, 'unpublished']))
    )

    // sort posts by date in descending order
    partialPosts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1))

    // Prevent sharing unpublished posts with production builds
    if (process.env.NODE_ENV === 'production') {
        return partialPosts.filter((p) => !p.unpublished).map(hideUnpublishedValue(fields))
    }

    return partialPosts.map(hideUnpublishedValue(fields))
}

export function toCompletePost(items: PartialPost): BlogPost {
    return defaults(
        {},
        {
            ...items,
            imagesMetadata: items.imagesMetadata ? JSON.parse(items.imagesMetadata) : null,
        },
        {
            slug: '',
            title: '',
            date: '',
            categories: [],
            coverImage: '',
            ogImage: '',
            content: '',
        }
    )
}
