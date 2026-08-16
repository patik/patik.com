// @ts-check
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { visit } from 'unist-util-visit'

/**
 * Screenshots in the pull request descriptions are served straight from `public/`, so Astro's
 * image pipeline never sees them: nothing adds `loading`, and nothing reserves space for them.
 * This reads the real pixel dimensions at build time and fills both in.
 *
 * Scoped to one prefix on purpose — the blog's images are relative and already go through Astro.
 */
const SRC_PREFIX = '/portfolio/pull-requests/'

const IMG_TAG = /<img\b[^>]*>/g
const SRC_ATTRIBUTE = /\bsrc="([^"]*)"/
const WIDTH_ATTRIBUTE = /\bwidth="(\d+)"/
const MANAGED_ATTRIBUTES = /\s+(?:height|loading|decoding)="[^"]*"/g

/** @type {Map<string, {width: number, height: number} | null>} */
const dimensionCache = new Map()

/**
 * @param {string} src Root-relative URL, e.g. `/portfolio/pull-requests/foo/01.webp`
 * @param {string} publicDir
 */
async function readDimensions(src, publicDir) {
    const cached = dimensionCache.get(src)

    if (cached !== undefined) {
        return cached
    }

    /** @type {{width: number, height: number} | null} */
    let dimensions = null

    try {
        const { width, height } = await sharp(await readFile(path.join(publicDir, src))).metadata()

        if (width && height) {
            dimensions = { width, height }
        }
    } catch {
        // Left null: a missing or unreadable file is the build's problem to report, not ours.
    }

    dimensionCache.set(src, dimensions)

    return dimensions
}

/**
 * An authored `width` is a deliberate display size, so keep it and derive the height from it. Any
 * authored height is dropped — CSS sets `height: auto`, so a value that disagrees with the aspect
 * ratio only reserves the wrong amount of space.
 *
 * @param {{width: number, height: number}} intrinsic
 * @param {number | undefined} authoredWidth
 */
function displaySize(intrinsic, authoredWidth) {
    const width = authoredWidth || intrinsic.width

    return { width, height: Math.round(width * (intrinsic.height / intrinsic.width)) }
}

/**
 * @param {{ publicDir?: string }} [options]
 * @returns {import('unified').Transformer<import('hast').Root>}
 */
export default function rehypePullRequestImages(options = {}) {
    const publicDir = options.publicDir ?? path.join(process.cwd(), 'public')

    return async (tree) => {
        /** @type {import('hast').Element[]} */
        const elements = []
        /** @type {{ value: string }[]} */
        const rawNodes = []

        visit(tree, (node) => {
            // `raw` isn't in hast's node types: this pipeline leaves markdown's inline HTML
            // unparsed, so those images only ever exist as strings.
            const type = /** @type {string} */ (node.type)

            if (type === 'element' && /** @type {import('hast').Element} */ (node).tagName === 'img') {
                elements.push(/** @type {import('hast').Element} */ (node))
            } else if (type === 'raw') {
                rawNodes.push(/** @type {{ value: string }} */ (/** @type {unknown} */ (node)))
            }
        })

        await Promise.all([
            // Images written as markdown, which remark has already turned into elements.
            ...elements.map(async (node) => {
                const properties = node.properties ?? {}
                const src = String(properties.src ?? '')

                if (!src.startsWith(SRC_PREFIX)) {
                    return
                }

                properties.loading = 'lazy'
                properties.decoding = 'async'

                const intrinsic = await readDimensions(src, publicDir)

                if (intrinsic) {
                    const { width, height } = displaySize(intrinsic, Number(properties.width) || undefined)

                    properties.width = width
                    properties.height = height
                }

                node.properties = properties
            }),

            // Images written as raw HTML, which this pipeline passes through as unparsed strings.
            ...rawNodes.map(async (node) => {
                const tags = node.value.match(IMG_TAG)

                if (!tags) {
                    return
                }

                for (const tag of tags) {
                    const src = tag.match(SRC_ATTRIBUTE)?.[1]

                    if (!src?.startsWith(SRC_PREFIX)) {
                        continue
                    }

                    const intrinsic = await readDimensions(src, publicDir)
                    const authoredWidth = Number(tag.match(WIDTH_ATTRIBUTE)?.[1]) || undefined
                    const sizing = intrinsic ? displaySize(intrinsic, authoredWidth) : null
                    const added = [
                        sizing && !authoredWidth ? ` width="${sizing.width}"` : '',
                        sizing ? ` height="${sizing.height}"` : '',
                        ' loading="lazy"',
                        ' decoding="async"',
                    ].join('')

                    const rewritten = tag.replace(MANAGED_ATTRIBUTES, '').replace(/\s*\/?>$/, `${added}>`)

                    node.value = node.value.replace(tag, rewritten)
                }
            }),
        ])
    }
}
