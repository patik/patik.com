import Link from 'next/link'
import DateFormatter from './DateFormatter'
import MarkdownExcerpt from './MarkdownExcerpt'

type Props = {
    title: string
    coverImage?: string
    date: string
    excerpt: string
    slug: string
}

const PostPreview = ({ title, date, excerpt, slug }: Props) => {
    return (
        <div>
            {/*    <div className="mb-5">
                <CoverImage slug={slug} title={title} src={coverImage} />
            </div> */}
            <h3 className="text-3xl mb-3 leading-snug">
                <Link as={`blog/${slug}`} href={`blog/[slug]`} className="hover:underline">
                    {title}
                </Link>
            </h3>
            <div className="text-lg mb-4 font-bold">
                <DateFormatter dateString={date} />
            </div>
            <p className="text-lg leading-relaxed mb-4">
                <MarkdownExcerpt excerpt={excerpt} slug={slug} />
            </p>
        </div>
    )
}

export default PostPreview
