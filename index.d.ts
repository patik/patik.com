declare module 'remark-change-image-paths'

type Post = {
    id?: number
    slug: string
    title: string
    date: string
    coverImage: string
    excerpt?: string
    ogImage: string
    content: string
    categories: string[]
    dsq_thread_id: string
    unpublished?: boolean
    imagesMetadata: Record<string, import('image-size/dist/types/interface').ISizeCalculationResult> | null
}
