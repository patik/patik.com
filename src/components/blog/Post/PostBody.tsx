import markdownStyles from '../../../styles/blog/markdown-styles.module.css'
import postBodyStyles from '../../../styles/blog/post-body.module.scss'
import MarkdownBody from './MarkdownBody'

type Props = {
    slug: string
    content: string
    imagesMetadata: BlogPost['imagesMetadata']
}

export default function PostBody({ slug, content, imagesMetadata }: Props) {
    return (
        <div className="mx-auto">
            <div className={`${postBodyStyles['post-body']} ${markdownStyles['markdown']}`}>
                <MarkdownBody slug={slug} content={content} imagesMetadata={imagesMetadata} />
            </div>
        </div>
    )
}
