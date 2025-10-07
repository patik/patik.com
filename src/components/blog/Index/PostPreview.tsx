import config from '../../../config.json'
import DateFormatter from '../DateFormatter'
import Excerpt from './Excerpt'

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
                <a href={`${blogPath}/${slug}`} className="hover:underline">
                    {title}
                </a>
            </h3>
            <div className="text-lg mb-4 font-bold">
                <DateFormatter dateString={date} />
            </div>
            <Excerpt excerpt={excerpt} /* slug={slug} */ className="text-lg leading-relaxed mb-4" />
        </div>
    )
}
