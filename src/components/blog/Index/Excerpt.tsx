import { getMarkdownComponents } from '@src/lib/getMarkdownComponents'
import ReactMarkdown from 'react-markdown'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import rehypeRaw from 'rehype-raw'

SyntaxHighlighter.registerLanguage('javascript', javascript)

type Props = {
    excerpt: string
    slug: string
    className?: string
}

export default function Excerpt({ slug, excerpt, className }: Props) {
    return (
        <div className={className}>
            <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                components={getMarkdownComponents({ slug, noImages: true })}
                unwrapDisallowed
            >
                {excerpt}
            </ReactMarkdown>
        </div>
    )
}
