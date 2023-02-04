import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import Post from '../../../blog/components/Post/Post'
import { getAllPosts, getPostBySlug, toCompletePost } from '../../../blog/lib/getPosts'

type Params = {
    params: {
        slug: string
    }
}

type Props = {
    post?: BlogPost
} & Params

// https://beta.nextjs.org/docs/upgrade-guide#replacing-fallback
export const dynamicParams = true

export default async function SlugPage({ params }: Props) {
    const router = useRouter()
    const post = await getPost(params)

    if (!router.isFallback) {
        return <ErrorPage statusCode={404} />
    }

    return <Post post={post} isFallback={router.isFallback} />
}

async function getPost(params: Params['params']) {
    console.log('params ', params)
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

    return toCompletePost(post)
}

export async function generateStaticParams() {
    const posts = await getAllPosts(['slug'])

    return posts.map((post) => ({
        slug: post.slug,
    }))
}
