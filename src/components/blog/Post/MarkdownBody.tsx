import { getMarkdownComponents } from '@src/lib/getMarkdownComponents'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkUnwrapImages from 'rehype-unwrap-images'

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
