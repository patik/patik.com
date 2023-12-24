import config from '@src/config.json'
import { DiscussionEmbed } from 'disqus-react'

const { blogUrl } = config

type Props = {
    dsqThreadId: BlogPost['dsq_thread_id']
    slug: BlogPost['slug']
    title: BlogPost['title']
}

export default function Discussion({ dsqThreadId, slug, title }: Props) {
    return (
        <div>
            <hr className="my-12" />
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left text-gray-500">
                Comments
            </h2>
            <DiscussionEmbed
                shortname="example"
                config={{
                    url: `${blogUrl}/${slug}`,
                    identifier: dsqThreadId,
                    title: title,
                    language: 'en_US',
                }}
            />
        </div>
    )
}
