import Head from 'next/head'
import packagejson from '../../../oldblogrepo/package.json'
import Container from '../Container'
import Discussion from '../Discussion'
import Layout from '../Layout'
import Meta from '../Meta'
import PageHeader from './PageHeader'
import PostBody from './PostBody'
import PostHeader from './PostHeader'
import PostTitle from './PostTitle'

const { description: packageJsonDescription } = packagejson

const { homepage, description } = packagejson

type Props = {
    post: BlogPost
    isFallback: boolean
}

export default function Post({ post, isFallback }: Props) {
    const { title, date, content, slug, ogImage, excerpt, unpublished, imagesMetadata, dsq_thread_id } = post

    // console.log('dsq_thread_id ', dsq_thread_id)

    return (
        <Layout unpublished={unpublished}>
            <Container>
                <PageHeader />
                {isFallback ? (
                    <PostTitle>Loading…</PostTitle>
                ) : (
                    <article className="mb-32 max-w-3xl">
                        <Head>
                            <title>{title && description ? `${title} | ${description}` : packageJsonDescription}</title>
                            <Meta
                                siteName={description}
                                image={ogImage}
                                description={excerpt ?? ''}
                                title={title}
                                url={`${homepage}/${slug}`}
                            />
                        </Head>
                        <PostHeader title={title} date={date} />
                        <PostBody content={content} slug={slug} imagesMetadata={imagesMetadata} />
                        {dsq_thread_id ? <Discussion dsqThreadId={dsq_thread_id} slug={slug} title={title} /> : null}
                    </article>
                )}
            </Container>
        </Layout>
    )
}
