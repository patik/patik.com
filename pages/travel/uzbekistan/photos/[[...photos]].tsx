import { countryGallery } from '@pages/travel/uzbekistan'
import Layout from '@src/components/common/Layout'
import { GalleryIndexPage } from '@src/photos/components/GalleryPage'
import { SinglePhotoPage } from '@src/photos/components/SinglePhotoPage'
import getGalleryStaticPaths from '@src/photos/pageHelpers/getGalleryStaticPaths'
import getGalleryStaticProps from '@src/photos/pageHelpers/getGalleryStaticProps'
import { getPhotoIdFromRouter } from '@src/photos/pageHelpers/getPhotoIdFromRouter'
import type { CityGallery, CityGalleryMap, ImageProps } from '@src/photos/utils/types'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

export type PageProps = {
    images: ImageProps[]
    currentPhoto?: ImageProps | null
}

const samarkandGalleryMap: CityGallery = {
    country: 'uzbekistan',
    city: 'samarkand',
    cloudinaryFolder: 'Uzbekistan\\ 2023/Samarkand',
    title: 'Samarkand, Uzbekistan',
    keywords: ['Uzbekistan', 'Samarkand', 'Asia', 'Central Asia', 'Silk road', 'travel'],
}

const cityGalleryMaps: CityGalleryMap = {
    samarkand: samarkandGalleryMap,
}

export default function Page({ images, currentPhoto }: PageProps) {
    const router = useRouter()
    // console.log('[jsx] =====================')
    // console.log('[jsx] single photo page ', { images, routerQuery: router.query })
    const photosParam = router.query.photos
    const segments: string[] = Array.isArray(photosParam) ? photosParam : photosParam ? [photosParam] : []
    // console.log('[jsx] segments ', segments.length, segments.join(', '))

    if (segments && segments.length > 0) {
        const cityName = segments[0]

        if (!cityName || !(cityName in cityGalleryMaps)) {
            throw new Error(`invalid city name in query params: ${cityName}`)
        }

        const cityGallery = cityGalleryMaps[cityName]

        // Index page for a specific city
        if (segments.length === 1) {
            // console.log('[jsx] Index page for a specific city')

            return (
                <Layout title={cityGallery.title} keywords={cityGallery.keywords}>
                    <h1>{cityGallery.title}</h1>

                    <section>
                        <h2>Photos and Video</h2>

                        <p>
                            <Link href={`/travel/${countryGallery.country}`}>{`Back to ${countryGallery.title}`}</Link>
                        </p>

                        <GalleryIndexPage
                            gallery={cityGallery}
                            city={cityGallery.city}
                            cityGalleryMap={cityGalleryMaps}
                            images={images}
                        />
                    </section>
                </Layout>
            )
        }
        // Page for a specific photo
        else if (segments.length === 2) {
            // console.log('[jsx] page for a specific photo ', segments.join(', '))

            if (!currentPhoto) {
                // This will happen when loading an index page and then clicking on a photo
                // console.error('[jsx] have to manually look up the currentPhoto prop')
                const photoIdFromProps = getPhotoIdFromRouter(router.query)
                currentPhoto = images.find((img) => img.id === photoIdFromProps)
            }

            if (!currentPhoto) {
                throw new Error('[jsx] missing the currentPhoto prop')
            }

            return (
                <Layout title={countryGallery.title} keywords={cityGallery.keywords}>
                    <h1>{countryGallery.title}</h1>

                    <p>
                        <Link href={`/travel/${countryGallery.country}`}>{`Back to ${countryGallery.title}`}</Link>
                    </p>

                    <SinglePhotoPage cityGallery={cityGallery} currentPhoto={currentPhoto} images={images} />
                </Layout>
            )
        } else {
            throw new Error('cannot figure out where to go')
        }
    }

    // console.log(`[jsx] index for the whole country's photos`)
    // Index page for all of the country's photos
    const galleryMeta = countryGallery

    return (
        <Layout title={galleryMeta.title} keywords={countryGallery.keywords}>
            <h1>{galleryMeta.title} photos</h1>

            <p>
                <Link href={`/travel/${countryGallery.country}`}>{`Back to ${countryGallery.title} overview`}</Link>
            </p>

            <section>
                <GalleryIndexPage gallery={countryGallery} cityGalleryMap={cityGalleryMaps} images={images} />
            </section>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async function (context) {
    return getGalleryStaticProps(Object.values(cityGalleryMaps), context)
}

export const getStaticPaths: GetStaticPaths = async function () {
    return getGalleryStaticPaths(Object.values(cityGalleryMaps))
}
