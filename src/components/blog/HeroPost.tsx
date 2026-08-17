import config from '../../config.json'
import DateFormatter from './DateFormatter'
import css from './BlogIndex.module.css'

const { blogPath } = config

type Props = {
    title: string
    coverImage?: string
    date: string
    excerpt: string
    slug: string
}

export default function HeroPost({ title, date, excerpt, slug }: Props) {
    return (
        <section>
            <div className={css.heroGrid}>
                <div>
                    <h3 className={css.heroTitle}>
                        <a href={`${blogPath}/${slug}`} className={css.link}>
                            {title}
                        </a>
                    </h3>
                    <div className={css.heroDate}>
                        <DateFormatter dateString={date} />
                    </div>
                </div>
                <div>{excerpt}</div>
            </div>
        </section>
    )
}
