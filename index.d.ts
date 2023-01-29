declare module 'remark-change-image-paths'

interface Window {
    Typekit: {
        load: () => void
    }
}

type BlogPost = {
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
