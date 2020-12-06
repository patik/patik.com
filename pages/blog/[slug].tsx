import React from 'react'
import { NextPageContext } from 'next'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import dayjs from 'dayjs'

function PostTemplate({ content, data }: { content: string; data: BlogPostData }) {
    const date = dayjs(data.date).format('DD MMMM YYYY')

    return (
        <>
            <h1>{data.title}</h1>
            <h2>{date}</h2>
            <ReactMarkdown source={content} />
            <code>{JSON.stringify(data)}</code>
        </>
    )
}

PostTemplate.getInitialProps = async (context: NextPageContext) => {
    const { slug } = context.query
    const content = await import(`../../blog-posts/${slug}.md`)
    const data = matter(content.default)

    return { ...data }
}

export default PostTemplate
