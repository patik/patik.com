import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { SpecialComponents } from 'react-markdown/lib/ast-to-react'
import { NormalComponents } from 'react-markdown/lib/complex-types'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import rehypeRaw from 'rehype-raw'
import { getCodeFenceConfig } from '../../lib/getCodeFenceConfig'

SyntaxHighlighter.registerLanguage('javascript', javascript)

/**
 * Specifies which React components to use for certain HTML elements
 *
 * With help from https://amirardalan.com/blog/syntax-highlight-code-in-markdown
 */
function getMarkdownComponents({
    slug,
    imagesMetadata,
}: {
    slug: string
    imagesMetadata: BlogPost['imagesMetadata']
}): Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents> {
    const syntaxTheme = oneDark

    return {
        a({ href, children, ...props }) {
            if (href && !/^https?:\/\//.test(href) && !/^javascript?:\/\//.test(href)) {
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
                return <code className="inline-code">{children}</code>
            }

            // Parse my custom string to determine the language, line highlighting, and starting line for this code block
            const config = getCodeFenceConfig(className)

            return (
                <SyntaxHighlighter
                    style={syntaxTheme}
                    PreTag="div"
                    className={`${className} codeFence`}
                    showLineNumbers
                    wrapLines
                    useInlineStyles
                    {...config}
                >
                    {
                        // Strip the extra new line that seems to be added to the end of code blocks by the markdown-to-html process; appears to be a standard issue because it's in react-markdown's docs examples
                        String(children).replace(/\n$/, '')
                    }
                </SyntaxHighlighter>
            )
        },
        img({ src, alt }) {
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

            return <Image src={`/blog/blog/images/${slug}/${src}`} alt={alt} width={width} height={height} />
        },
    }
}

type Props = {
    slug: string
    content: string
    imagesMetadata: BlogPost['imagesMetadata']
}

const MarkdownBody = ({ slug, content, imagesMetadata }: Props) => {
    return (
        <ReactMarkdown rehypePlugins={[rehypeRaw]} components={getMarkdownComponents({ slug, imagesMetadata })}>
            {content}
        </ReactMarkdown>
    )
}

export default MarkdownBody
