import Layout from '@src/components/common/Layout'
import galleryIndexPageGetStaticProps from '@src/photos/pageHelpers/index/getStaticProps'
import { GalleryIndexPage } from '@src/photos/pageHelpers/index/page'
import singlePhotoPageGetStaticPaths from '@src/photos/pageHelpers/single/getStaticPaths'
import { SinglePhotoPage } from '@src/photos/pageHelpers/single/page'
import type { GalleryMeta, ImageProps } from '@src/photos/utils/types'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

export type PageProps = {
    images: ImageProps[]
    currentPhoto?: ImageProps | null
}

const defaultGalleryMeta: GalleryMeta = {
    pathSegment: 'samarkand',
    cloudinaryFolder: 'Uzbekistan\\ 2023/Samarkand',
    galleryTitle: 'Samarkand, Uzbekistan',
    rootPath: '/travel/uzbekistan/photos',
}

export const galleryMetas: Record<string, GalleryMeta> = {
    // index: {
    //     pathSegment: '',
    //     cloudinaryFolder: 'Uzbekistan\\ 2023',
    //     galleryTitle: 'Uzbekistan 2023',
    //     rootPath: '/travel/uzbekistan/photos',
    // },
    samarkand: {
        pathSegment: 'samarkand',
        cloudinaryFolder: 'Uzbekistan\\ 2023/Samarkand',
        galleryTitle: 'Samarkand, Uzbekistan',
        rootPath: '/travel/uzbekistan/photos',
    },
}

/**
 * /travel/uzbekistan/photos/
 * /travel/uzbekistan/photos/samarkand/
 * /travel/uzbekistan/photos/samarkand/1234
 * /travel/uzbekistan/photos/bukara/
 * /travel/uzbekistan/photos/bukara/5678
 */

export default function Page({ images, currentPhoto }: PageProps) {
    const router = useRouter()
    console.log('=====================')
    console.log('router.query ', router.query)
    const photosParam = router.query.photos
    const segments: string[] = Array.isArray(photosParam) ? photosParam : photosParam ? [photosParam] : []
    console.log('segments ', segments.length, segments.join(', '))

    let galleryMeta: GalleryMeta

    // Index page for all of the country's photos
    if (!segments || segments.length === 0) {
        console.log('index for the whole country')
        galleryMeta = galleryMetas.index
    } else {
        const cityName = segments[0]

        if (!cityName || !(cityName in galleryMetas)) {
            throw new Error(`invalid city name in query params: ${cityName}`)
        }

        galleryMeta = galleryMetas[cityName]

        // Index page for a specific city
        if (segments.length === 1) {
            console.log('Index page for a specific city')
        }
        // Page for a specific photo
        else if (segments.length === 2) {
            console.log('page for a specific photo ', segments.join(', '))
            if (!currentPhoto) {
                throw new Error('missing the currentPhoto prop')
            }

            return (
                <Layout
                    title="Uzbekistan"
                    keywords={[
                        'Uzbekistan',
                        'Tashkent',
                        'Bukhara',
                        'Samarkand',
                        'Khiva',
                        'Asia',
                        'Central Asia',
                        'Silk road',
                        'travel',
                    ]}
                >
                    <h1>Uzbekistan</h1>
                    <SinglePhotoPage galleryMeta={galleryMeta} currentPhoto={currentPhoto} />
                </Layout>
            )
        } else {
            throw new Error('cannot figure out where to go')
        }
    }

    galleryMeta = defaultGalleryMeta

    return (
        <Layout
            title={galleryMeta.galleryTitle}
            keywords={[
                'Uzbekistan',
                'Tashkent',
                'Bukhara',
                'Samarkand',
                'Khiva',
                'Asia',
                'Central Asia',
                'Silk road',
                'travel',
            ]}
        >
            <h1>{galleryMeta.galleryTitle}</h1>

            <p>A beautiful country full of Islamic architecture that had only just opened up to mass tourism</p>

            <section>
                <h2>Photos and Video</h2>

                <GalleryIndexPage galleryMeta={galleryMeta} images={images} />
            </section>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async function (context) {
    return galleryIndexPageGetStaticProps(Object.values(galleryMetas), context)
}

export const getStaticPaths: GetStaticPaths = async function (context) {
    return singlePhotoPageGetStaticPaths(Object.values(galleryMetas), context)
}
