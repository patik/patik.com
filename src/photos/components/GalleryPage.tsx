import countryGallery from '../../galleries/uzbekistan'
import Layout from '../../layouts/Layout.astro'
import type { CityGallery, CountryGallery, ImageProps } from '../utils/types'
import GalleryGrid from './GalleryGrid'

export function GalleryPage({
    gallery,
    cityGalleries,
    images = [],
}: {
    gallery: CountryGallery | CityGallery
    cityGalleries: CityGallery[]
    images: ImageProps[]
}) {
    const isCityGallery = 'cityId' in gallery

    return (
        <Layout title={gallery.title} keywords={gallery.keywords}>
            <h1>
                <a href={`/travel/${countryGallery.countryId}`}>
                    {isCityGallery ? gallery.countryName : gallery.title}
                </a>
            </h1>

            <section>
                <h2>Photos and Video</h2>

                <GalleryGrid
                    gallery={gallery}
                    cityId={isCityGallery ? gallery.cityId : undefined}
                    cityGalleries={cityGalleries}
                    images={images}
                />
            </section>
        </Layout>
    )
}
