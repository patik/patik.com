import DateFormatter from '@src/components/blog/DateFormatter'
import Excerpt from '@src/components/blog/Index/Excerpt'
import config from '@src/config.json'
import Link from 'next/link'

const { blogPath } = config

type Props = {
    title: string
    coverImage?: string
    date: string
    excerpt: string
    slug: string
}

export default function PostPreview({ title, date, excerpt, slug }: Props) {
    return (
        <div>
            {/*    <div className="mb-5">
                <CoverImage slug={slug} title={title} src={coverImage} />
            </div> */}
            <h3 className="text-3xl mb-3 leading-snug">
                <Link as={`${blogPath}/${slug}`} href={`${blogPath}/[slug]`} className="hover:underline">
                    {title}
                </Link>
            </h3>
            <div className="text-lg mb-4 font-bold">
                <DateFormatter dateString={date} />
            </div>
            <Excerpt excerpt={excerpt} slug={slug} className="text-lg leading-relaxed mb-4" />
        </div>
    )
}
