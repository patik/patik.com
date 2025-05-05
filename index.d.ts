declare module 'remark-change-image-paths'
declare module 'react-use-keypress'
declare module 'react-google-charts'

interface Window {
    Typekit: {
        load: () => void
    }
}

type ImagesMetadata = Record<string, import('image-size/dist/types/interface').ISizeCalculationResult> | null

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
    unpublished?: boolean
    imagesMetadata: ImagesMetadata
    syntaxHighlightSSRHack?: boolean
}
