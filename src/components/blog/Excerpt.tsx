import ReactMarkdown from 'react-markdown'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import rehypeRaw from 'rehype-raw'
import { getMarkdownComponents } from '../../lib/getMarkdownComponents'

SyntaxHighlighter.registerLanguage('javascript', javascript)

type Props = {
    excerpt: string
    slug: string
    className?: string
}

export default function Excerpt({ slug, excerpt, className }: Props) {
    return (
        <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={getMarkdownComponents({ slug, noImages: true })}
            className={className}
            unwrapDisallowed
        >
            {excerpt}
        </ReactMarkdown>
    )
}
