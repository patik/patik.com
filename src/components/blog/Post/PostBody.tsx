import MarkdownBody from '@src/components/blog/Post/MarkdownBody'
import markdownStyles from '@src/styles/blog/markdown-styles.module.css'
import postBodyStyles from '@src/styles/blog/post-body.module.scss'

type Props = {
    slug: string
    content: string
    imagesMetadata: BlogPost['imagesMetadata']
    syntaxHighlightSSRHack?: boolean
}

export default function PostBody({ slug, content, imagesMetadata, syntaxHighlightSSRHack }: Props) {
    return (
        <div className="mx-auto">
            <div className={`${postBodyStyles['post-body']} ${markdownStyles['markdown']}`}>
                <MarkdownBody
                    slug={slug}
                    content={content}
                    imagesMetadata={imagesMetadata}
                    syntaxHighlightSSRHack={syntaxHighlightSSRHack}
                />
            </div>
        </div>
    )
}
