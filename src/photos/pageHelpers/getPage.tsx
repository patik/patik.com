import Layout from '@src/components/common/Layout'
import { GalleryPage } from '@src/photos/components/GalleryPage'
import { SinglePhotoPage } from '@src/photos/components/SinglePhotoPage'
import { getPhotoIdFromRouter } from '@src/photos/pageHelpers/getPhotoIdFromRouter'
import type { CityGallery, CountryGallery, PageProps } from '@src/photos/utils/types'
import Link from 'next/link'
import { useRouter } from 'next/router'

export function getPage(countryGallery: CountryGallery, cityGalleries: CityGallery[]) {
    return function Page({ images, currentPhoto }: PageProps) {
        const router = useRouter()
        const photosParam = router.query.photos
        const segments: string[] = Array.isArray(photosParam) ? photosParam : photosParam ? [photosParam] : []

        console.log('getPage ', images.find((img) => img.id === getPhotoIdFromRouter(router.query))?.id)
        if (segments && segments.length > 0) {
            const cityName = segments[0]

            if (!cityName) {
                throw new Error(`no city name in URL: ${cityName}`)
            }

            const cityGallery = cityGalleries.find(({ cityId: city }) => city === cityName)

            if (!cityGallery) {
                throw new Error(`invalid city name in URL: ${cityName}`)
            }

            // Index page for a specific city
            if (segments.length === 1) {
                return <GalleryPage gallery={cityGallery} cityGalleries={[cityGallery]} images={images} />
            }

            // Page for a specific photo
            if (segments.length === 2) {
                if (!currentPhoto) {
                    // This will happen when loading an index page and then clicking on a photo
                    const photoIdFromProps = getPhotoIdFromRouter(router.query)
                    currentPhoto = images.find((img) => img.id === photoIdFromProps)
                }

                if (!currentPhoto) {
                    throw new Error('missing the currentPhoto prop')
                }

                return (
                    <Layout title={countryGallery.title} keywords={cityGallery.keywords}>
                        <h1>{countryGallery.title}</h1>

                        <p>
                            <Link
                                href={`/travel/${countryGallery.countryId}`}
                            >{`Back to ${countryGallery.title}`}</Link>
                        </p>

                        <SinglePhotoPage cityGallery={cityGallery} currentPhoto={currentPhoto} images={images} />
                    </Layout>
                )
            }

            console.error('cannot figure out where to go')
        }

        // Index page for all of the country's photos
        return <GalleryPage gallery={countryGallery} cityGalleries={cityGalleries} images={images} />
    }
}
