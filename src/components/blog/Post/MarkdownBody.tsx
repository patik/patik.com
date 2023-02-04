import ReactMarkdown from 'react-markdown'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import rehypeRaw from 'rehype-raw'
import { getMarkdownComponents } from '../../../lib/getMarkdownComponents'

SyntaxHighlighter.registerLanguage('javascript', javascript)

type Props = {
    slug: string
    content: string
    imagesMetadata: ImagesMetadata
}

export default function MarkdownBody({ slug, content, imagesMetadata }: Props) {
    return (
        <ReactMarkdown rehypePlugins={[rehypeRaw]} components={getMarkdownComponents({ slug, imagesMetadata })}>
            {content}
        </ReactMarkdown>
    )
}
