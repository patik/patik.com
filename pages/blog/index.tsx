import Head from 'next/head'
import { useRouter } from 'next/router'
import Container from '../../blog/components/Container'
import HeroPost from '../../blog/components/HeroPost'
import Intro from '../../blog/components/Intro'
import Layout from '../../src/components/blog/Layout'
import Meta from '../../blog/components/Meta'
import MoreStories from '../../blog/components/MoreStories'
import { generateSiteMap } from '../../blog/lib/generateSiteMap'
import { getAllPosts, toCompletePost } from '../../blog/lib/getPosts'
import config from '../../blog/config.json'

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
