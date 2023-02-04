import ReactMarkdown from 'react-markdown'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import rehypeRaw from 'rehype-raw'
import { getMarkdownComponents } from './Post/MarkdownBody'

SyntaxHighlighter.registerLanguage('javascript', javascript)

type Props = {
    excerpt: string
    slug: string
}

export default function MarkdownExcerpt({ slug, excerpt }: Props) {
    return (
        <ReactMarkdown rehypePlugins={[rehypeRaw]} components={getMarkdownComponents({ slug, noImages: true })}>
            {excerpt}
        </ReactMarkdown>
    )
}
