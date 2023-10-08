import { getPostBySlug, getPostSlugs } from '@src/lib/getPosts'

type Item = { slug: string; images: string[] }

// Help TS filter undefined values from the array
function isItem(foo: Item | undefined): foo is Item {
    return Boolean(foo?.slug) && Array.isArray(foo?.images)
}

/**
 * Generate curl commands to download all images from Wordpress
 */
export default async function generateImageCurlCommands() {
    const slugs = getPostSlugs()
    const posts = await Promise.all(slugs.map(async (slug) => await getPostBySlug(slug, ['slug', 'content'])))

    return posts
        .map(({ content, slug }) => {
            const regexp = /(http:\/\/patik\.com\/blog\/wp-content\/uploads\/[^\s"\])]+)[\s"\])]/gim
            const str = content
            let match: RegExpExecArray | null
            const images: string[] = []

            while ((match = regexp.exec(str)) !== null) {
                const url = match[1]

                if (!images.includes(url)) {
                    images.push(url)
                }
            }

            if (images.length === 0) {
                return
            }

            return {
                slug,
                images,
            }
        })
        .filter(isItem)
        .map(({ slug, images }) =>
            images.map((url) => `curl --create-dirs -O --output-dir ./public/assets/blog/${slug} ${url}`).join('\n')
        )
        .join('\n')
}
