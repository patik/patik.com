import DateFormatter from '@src/components/blog/DateFormatter'
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

export default function HeroPost({ title, date, excerpt, slug }: Props) {
    return (
        <section>
            {/*  <div className="mb-8 md:mb-16">
                <CoverImage title={title} src={coverImage} slug={slug} />
            </div> */}
            <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
                <div>
                    <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
                        <Link as={`${blogPath}/${slug}`} href={`${blogPath}/[slug]`} className="hover:underline">
                            {title}
                        </Link>
                    </h3>
                    <div className="mb-4 md:mb-0 text-lg">
                        <DateFormatter dateString={date} />
                    </div>
                </div>
                <div>{excerpt}</div>
            </div>
        </section>
    )
}
