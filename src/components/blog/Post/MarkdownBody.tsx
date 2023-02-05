import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkUnwrapImages from 'remark-unwrap-images'
import { getMarkdownComponents } from '../../../lib/getMarkdownComponents'

type Props = {
    slug: string
    content: string
    imagesMetadata: ImagesMetadata
    syntaxHighlightSSRHack?: boolean
}

export default function MarkdownBody({ slug, content, imagesMetadata, syntaxHighlightSSRHack }: Props) {
    return (
        <ReactMarkdown
            rehypePlugins={[rehypeRaw, remarkUnwrapImages]}
            components={getMarkdownComponents({ slug, imagesMetadata, syntaxHighlightSSRHack })}
        >
            {content}
        </ReactMarkdown>
    )
}
