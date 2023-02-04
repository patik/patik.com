import markdownStyles from '../../../styles/blog/markdown-styles.module.css'
import MarkdownBody from './MarkdownBody'

type Props = {
    slug: string
    content: string
    imagesMetadata: BlogPost['imagesMetadata']
}

export default function PostBody({ slug, content, imagesMetadata }: Props) {
    return (
        <div className="max-w-3xl mx-auto">
            <div className={`post-body ${markdownStyles['markdown']}`}>
                <MarkdownBody slug={slug} content={content} imagesMetadata={imagesMetadata} />
            </div>
        </div>
    )
}
