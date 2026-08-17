import config from '../../../config.json'
import css from '../BlogIndex.module.css'
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
            <h3 className={css.postTitle}>
                <a href={`${blogPath}/${slug}`} className={css.link}>
                    {title}
                </a>
            </h3>
            <div className={css.postDate}>
                <DateFormatter dateString={date} />
            </div>
            <Excerpt excerpt={excerpt} />
        </div>
    )
}
