import Layout from '@src/components/common/Layout'
import { GalleryIndexPage } from '@src/photos/pageHelpers/GalleryIndexPage'
import getGalleryStaticPaths from '@src/photos/pageHelpers/getGalleryStaticPaths'
import getGalleryStaticProps from '@src/photos/pageHelpers/getGalleryStaticProps'
import { SinglePhotoPage } from '@src/photos/pageHelpers/SinglePhotoPage'
import type { CityGalleryMap, CountryGallery, ImageProps } from '@src/photos/utils/types'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

export type PageProps = {
    images: ImageProps[]
    currentPhoto?: ImageProps | null
}

const countryGallery: CountryGallery = {
    country: 'uzbekistan',
    cloudinaryFolder: 'Uzbekistan\\ 2023/Samarkand',
    title: 'Uzbekistan',
}

const cityGalleryMap: CityGalleryMap = {
    samarkand: {
        country: 'uzbekistan',
        city: 'samarkand',
        cloudinaryFolder: 'Uzbekistan\\ 2023/Samarkand',
        title: 'Samarkand, Uzbekistan',
    },
}

export default function Page({ images, currentPhoto }: PageProps) {
    const router = useRouter()
    console.log('[jsx] =====================')
    console.log('[jsx] router.query ', router.query)
    const photosParam = router.query.photos
    const segments: string[] = Array.isArray(photosParam) ? photosParam : photosParam ? [photosParam] : []
    console.log('[jsx] segments ', segments.length, segments.join(', '))

    if (segments && segments.length > 0) {
        const cityName = segments[0]

        if (!cityName || !(cityName in cityGalleryMap)) {
            throw new Error(`invalid city name in query params: ${cityName}`)
        }

        const cityGallery = cityGalleryMap[cityName]

        // Index page for a specific city
        if (segments.length === 1) {
            console.log('[jsx] Index page for a specific city')

            return (
                <Layout
                    title={cityGallery.title}
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
                    <h1>{cityGallery.title}</h1>

                    <section>
                        <h2>Photos and Video</h2>

                        <GalleryIndexPage gallery={cityGallery} cityGalleryMap={cityGalleryMap} images={images} />
                    </section>
                </Layout>
            )
        }
        // Page for a specific photo
        else if (segments.length === 2) {
            console.log('[jsx] page for a specific photo ', segments.join(', '))
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
                    <SinglePhotoPage cityGallery={cityGallery} currentPhoto={currentPhoto} />
                </Layout>
            )
        } else {
            throw new Error('cannot figure out where to go')
        }
    }

    console.log('[jsx] index for the whole country')
    // Index page for all of the country's photos
    const galleryMeta = countryGallery

    return (
        <Layout
            title={galleryMeta.title}
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
            <h1>{galleryMeta.title}</h1>

            <p>A beautiful country full of Islamic architecture that had only just opened up to mass tourism</p>

            <section>
                <h2>Photos and Video</h2>

                <GalleryIndexPage gallery={countryGallery} cityGalleryMap={cityGalleryMap} images={images} />
            </section>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async function (context) {
    return getGalleryStaticProps(Object.values(cityGalleryMap), context)
}

export const getStaticPaths: GetStaticPaths = async function (context) {
    return getGalleryStaticPaths(Object.values(cityGalleryMap), context)
}