import Container from '@src/components/blog/Container'
import HeroPost from '@src/components/blog/HeroPost'
import Intro from '@src/components/blog/Index/Intro'
import MoreStories from '@src/components/blog/Index/MoreStories'
import Layout from '@src/components/blog/Layout'
import Meta from '@src/components/blog/Meta'
import config from '@src/config.json'
import { generateSiteMap } from '@src/lib/generateSiteMap'
import { getAllPosts, toCompletePost } from '@src/lib/getPosts'
import Head from 'next/head'
import { useRouter } from 'next/router'

const { blogDescription, blogUrl, blogPath } = config

type Props = {
    allPosts: BlogPost[]
}

export default function Index({ allPosts }: Props) {
    const heroPost = allPosts[0]
    const morePosts = allPosts.slice(1)
    const router = useRouter()

    // Check for old URL format: `/?p={id}`
    if (router.query['p']) {
        const id = Number(router.query.p)
        const post = allPosts.find((post) => post.id === id)

        if (post) {
            router.push(`${blogPath}/${post.slug}`)
        }
    }

    return (
        <Layout>
            <Head>
                <title>{blogDescription}</title>
                <Meta
                    siteName={blogDescription}
                    image={`${blogUrl}/cover.jpg`}
                    description={blogDescription}
                    title={blogDescription}
                    url={blogUrl}
                />
            </Head>
            <Container>
                <Intro />
                {heroPost && (
                    <HeroPost
                        title={heroPost.title}
                        coverImage={heroPost.coverImage}
                        date={heroPost.date}
                        slug={heroPost.slug}
                        excerpt={heroPost.excerpt ?? ''}
                    />
                )}
                {morePosts.length > 0 && <MoreStories posts={morePosts} />}
            </Container>
        </Layout>
    )
}

export const getStaticProps = async () => {
    const allPosts = await getAllPosts(['title', 'date', 'slug', 'coverImage', 'excerpt', 'id', 'unpublished'])

    generateSiteMap({
        links: allPosts.map(({ slug, date }) => ({
            date,
            url: `${blogUrl}/${slug}`,
        })),
    })

    return {
        props: { allPosts: allPosts.map(toCompletePost) },
    }
}
