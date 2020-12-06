type BlogPostData = {
    id: number
    title: string
    date: string
    author: string
    layout: string
    published: boolean
    guid: string
    dsq_thread_id: string[]
    excerpt?: string // Can contain unescaped HTML
    categories?: string[]
    tags?: string[]
}
