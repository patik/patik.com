import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { Element, Root } from 'hast'
import sharp from 'sharp'
import type { Transformer } from 'unified'
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

interface Dimensions {
    width: number
    height: number
}

/** `raw` isn't one of hast's node types: this pipeline leaves markdown's inline HTML unparsed, so
 * those images only ever exist as strings. */
interface RawNode {
    type: 'raw'
    value: string
}

function isRawNode(node: { type: string }): node is RawNode {
    return node.type === 'raw'
}

const dimensionCache = new Map<string, Dimensions | null>()

/** @param src Root-relative URL, e.g. `/portfolio/pull-requests/foo/01.webp` */
async function readDimensions(src: string, publicDir: string): Promise<Dimensions | null> {
    const cached = dimensionCache.get(src)

    if (cached !== undefined) {
        return cached
    }

    let dimensions: Dimensions | null = null

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
 */
function displaySize(intrinsic: Dimensions, authoredWidth?: number): Dimensions {
    const width = authoredWidth || intrinsic.width

    return { width, height: Math.round(width * (intrinsic.height / intrinsic.width)) }
}

export default function rehypePullRequestImages(options: { publicDir?: string } = {}): Transformer<Root> {
    const publicDir = options.publicDir ?? path.join(process.cwd(), 'public')

    return async (tree) => {
        const elements: Element[] = []
        const rawNodes: RawNode[] = []

        visit(tree, (node) => {
            if (node.type === 'element' && node.tagName === 'img') {
                elements.push(node)
            } else if (isRawNode(node)) {
                rawNodes.push(node)
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
