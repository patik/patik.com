import Head from 'next/head'
import { useRouter } from 'next/router'
import config from '../../src/config.json'
import { generateSiteMap } from '../../src/lib/generateSiteMap'
import { getAllPosts, toCompletePost } from '../../src/lib/getPosts'
import Container from '../../src/components/blog/Container'
import HeroPost from '../../src/components/blog/HeroPost'
import Intro from '../../src/components/blog/Intro'
import Layout from '../../src/components/blog/Layout'
import Meta from '../../src/components/blog/Meta'
import MoreStories from '../../src/components/blog/MoreStories'

const { description, homepage } = config

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
            router.push(post.slug)
        }
    }

    return (
        <Layout>
            <Head>
                <title>{description}</title>
                <Meta
                    siteName="Craig Patik"
                    image={`${homepage}/cover.jpg`}
                    description={description}
                    title={description}
                    url={homepage}
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
            url: `${homepage}/${slug}`,
        })),
    })

    return {
        props: { allPosts: allPosts.map(toCompletePost) },
    }
}
