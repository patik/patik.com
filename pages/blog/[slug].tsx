import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import Post from '../../blog/components/Post/Post'
import { getAllPosts, getPostBySlug, toCompletePost } from '../../blog/lib/getPosts'

type Props = {
    post: BlogPost
}

export default function SlugPage({ post }: Props) {
    const router = useRouter()

    if (!router.isFallback && !post?.slug) {
        return <ErrorPage statusCode={404} />
    }

    return <Post post={post} isFallback={router.isFallback} />
}

type Params = {
    params: {
        slug: string
    }
}

export async function getStaticProps({ params }: Params) {
    const post = await getPostBySlug(params.slug, [
        'title',
        'date',
        'slug',
        'content',
        'ogImage',
        'coverImage',
        'categories',
        'dsq_thread_id',
        'unpublished',
    ])

    return {
        props: {
            post: toCompletePost(post),
        },
    }
}

export async function getStaticPaths() {
    const posts = await getAllPosts(['slug'])

    return {
        paths: posts.map((post) => {
            return {
                params: {
                    slug: post.slug,
                },
            }
        }),
        fallback: false,
    }
}
