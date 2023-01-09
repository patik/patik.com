import Head from 'next/head'
import Container from '../components/Container'
import HeroPost from '../components/HeroPost'
import Intro from '../components/Intro'
import Layout from '../components/Layout'
import Meta from '../components/Meta'
import MoreStories from '../components/MoreStories'
import { getAllPosts, toCompletePost } from '../lib/getPosts'
import { generateSiteMap } from '../lib/generateSiteMap'
import packagejson from '../package.json'
import { useRouter } from 'next/router'

const { description, homepage } = packagejson

type Props = {
    allPosts: Post[]
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
        <>
            <Layout>
                <Head>
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
        </>
    )
}

export const getStaticProps = async () => {
    const allPosts = await getAllPosts(['title', 'date', 'slug', 'coverImage', 'excerpt', 'id', 'unpublished'])

    generateSiteMap({
        baseUrl: homepage,
        links: allPosts.map(({ slug, date }) => ({
            date,
            url: `${homepage}/${slug}`,
        })),
    })

    return {
        props: { allPosts: allPosts.map(toCompletePost) },
    }
}
