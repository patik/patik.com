import { SyntaxHighlighter } from '@src/components/blog/SyntaxHighlighter'
import config from '@src/config.json'
import postBodyStyles from '@src/styles/blog/post-body.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { SpecialComponents } from 'react-markdown/lib/ast-to-react'
import { NormalComponents } from 'react-markdown/lib/complex-types'

const { blogPath } = config

type MarkdownComponents = Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents>

type BaseProps = {
    slug: string
    syntaxHighlightSSRHack?: boolean
}

// We don't want to render images for this piece of content. Otherwise, `imagesMetadata` would be required.
type NoImages = BaseProps & {
    noImages: true
}

type WithImages = BaseProps & {
    imagesMetadata: ImagesMetadata
}

type Overloaded = BaseProps & {
    noImages?: true
    imagesMetadata?: ImagesMetadata
}

/**
 * Specifies which React components to use for certain HTML elements
 *
 * With help from https://amirardalan.com/blog/syntax-highlight-code-in-markdown
 */
export function getMarkdownComponents({ slug, syntaxHighlightSSRHack, noImages }: NoImages): MarkdownComponents
export function getMarkdownComponents({ slug, syntaxHighlightSSRHack, imagesMetadata }: WithImages): MarkdownComponents
export function getMarkdownComponents({
    slug,
    syntaxHighlightSSRHack,
    noImages,
    imagesMetadata,
}: Overloaded): MarkdownComponents {
    return {
        a({ href, children, ...props }) {
            if (href && !/^javascript?:\/\//.test(href)) {
                return (
                    <Link href={href} {...props}>
                        {children}
                    </Link>
                )
            }

            return (
                <a href={href} {...props}>
                    {children}
                </a>
            )
        },
        code({ className, children, inline }) {
            if (inline) {
                return <code className={postBodyStyles['inline-code']}>{children}</code>
            }

            return (
                <SyntaxHighlighter
                    className={`${className} ${postBodyStyles['codeFence']}`}
                    // Strip the extra new line that seems to be added to the end of code blocks by the markdown-to-html process; appears to be a standard issue because it's in react-markdown's docs examples
                    code={String(children).replace(/\n$/, '')}
                    syntaxHighlightSSRHack={syntaxHighlightSSRHack}
                />
            )
        },
        img({ src, alt }) {
            // We don't want to render images for this piece of content
            if (noImages) {
                return <></>
            }

            if (!alt) {
                throw new Error(`No alt text for ${src}`)
            }

            if (!src) {
                throw new Error(
                    `Image has no src. Post's imagesMetadata: ${typeof imagesMetadata} = ${
                        imagesMetadata ? JSON.stringify(imagesMetadata) : imagesMetadata
                    }`
                )
            }

            if (!imagesMetadata) {
                throw new Error(`No imagesMetadata for the post containing this image: ${src}`)
            }

            if (!imagesMetadata[src]) {
                throw new Error(
                    `No metadata found for image “${src}”. Post's imagesMetadata: ${typeof imagesMetadata} = ${
                        imagesMetadata ? JSON.stringify(imagesMetadata) : imagesMetadata
                    }`
                )
            }

            const { width, height } = imagesMetadata[src]

            return <Image src={`${blogPath}/images/${slug}/${src}`} alt={alt} width={width} height={height} />
        },
    }
}
