import Container from '@src/components/blog/Container'
import Layout from '@src/components/blog/Layout'
import Meta from '@src/components/blog/Meta'
import PageHeader from '@src/components/blog/Post/PageHeader'
import PostBody from '@src/components/blog/Post/PostBody'
import PostHeader from '@src/components/blog/Post/PostHeader'
import PostTitle from '@src/components/blog/Post/PostTitle'
import config from '@src/config.json'
import Head from 'next/head'

const { blogUrl, blogDescription } = config

type Props = {
    post: BlogPost
    isFallback: boolean
}

export default function Post({ post, isFallback }: Props) {
    const {
        title,
        date,
        content,
        slug,
        ogImage,
        excerpt,
        unpublished,
        imagesMetadata,

        syntaxHighlightSSRHack,
    } = post

    return (
        <Layout unpublished={unpublished}>
            <Container>
                <PageHeader />
                {isFallback ? (
                    <PostTitle>Loading…</PostTitle>
                ) : (
                    <>
                        <Head>
                            <title>{`${title} | ${blogDescription}`}</title>
                            <Meta
                                siteName={blogDescription}
                                image={ogImage}
                                description={excerpt ?? ''}
                                title={title}
                                url={`${blogUrl}/${slug}`}
                            />
                        </Head>
                        <article className="mb-32">
                            <PostHeader title={title} date={date} />
                            <PostBody
                                content={content}
                                slug={slug}
                                imagesMetadata={imagesMetadata}
                                syntaxHighlightSSRHack={syntaxHighlightSSRHack}
                            />
                        </article>
                    </>
                )}
            </Container>
        </Layout>
    )
}
