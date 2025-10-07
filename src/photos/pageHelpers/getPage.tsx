import Layout from '../../layouts/Layout.astro'
import { GalleryPage } from '../components/GalleryPage'
import { SinglePhotoPage } from '../components/SinglePhotoPage'
import { getPhotoIdFromRouter } from '../pageHelpers/getPhotoIdFromRouter'
import type { CityGallery, CountryGallery, PageProps } from '../utils/types'

export function getPage(countryGallery: CountryGallery, slug: string, cityGalleries: CityGallery[] = []) {
    if (!countryGallery) {
        throw new Error('Missing the countryGallery prop')
    }

    return function Page({ images = [], currentPhoto = null }: PageProps) {
        const photosParam = slug
        const segments: string[] = Array.isArray(photosParam) ? photosParam : photosParam ? [photosParam] : []

        if (segments && segments.length > 0) {
            const cityName = segments[0]

            if (!cityName) {
                throw new Error(`No city name in URL: ${cityName}`)
            }

            const cityGallery = cityGalleries.find(({ cityId: city }) => city === cityName)

            if (!cityGallery) {
                throw new Error(`Invalid city name in URL: ${cityName}`)
            }

            // Index page for a specific city
            if (segments.length === 1) {
                return <GalleryPage gallery={cityGallery} cityGalleries={[cityGallery]} images={images} />
            }

            // Page for a specific photo
            if (segments.length === 2) {
                if (!currentPhoto) {
                    // This will happen when loading an index page and then clicking on a photo
                    currentPhoto = images.find((img) => img.id === Number(slug)) ?? null
                }

                if (!currentPhoto) {
                    throw new Error('Missing the currentPhoto prop')
                }

                return (
                    <Layout title={countryGallery.title} keywords={cityGallery.keywords}>
                        <h1>{countryGallery.title}</h1>

                        <p>
                            <a href={`/travel/${countryGallery.countryId}`}>{`Back to ${countryGallery.title}`}</a>
                        </p>

                        <SinglePhotoPage cityGallery={cityGallery} currentPhoto={currentPhoto} images={images} />
                    </Layout>
                )
            }

            console.error('Cannot figure out which type of photo page to render')
        }

        // Index page for all of the country's photos
        return <GalleryPage gallery={countryGallery} cityGalleries={cityGalleries} images={images} />
    }
}
