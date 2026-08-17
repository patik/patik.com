import type { BlogPost } from '@src/types/blog'
import css from '../BlogIndex.module.css'
import PostPreview from './PostPreview'

type Props = {
    posts: BlogPost[]
}

export default function MoreStories({ posts }: Props) {
    return (
        <section>
            <h2 className={css.moreTitle}>More Posts</h2>
            <div className={css.storiesGrid}>
                {posts.map((post) => (
                    <PostPreview
                        key={post.slug}
                        title={post.title}
                        coverImage={post.coverImage}
                        date={post.date}
                        slug={post.slug}
                        excerpt={post.excerpt ?? ''}
                    />
                ))}
            </div>
        </section>
    )
}
