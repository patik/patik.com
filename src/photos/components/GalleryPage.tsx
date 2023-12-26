import Layout from '@src/components/common/Layout'
import countryGallery from '@src/galleries/uzbekistan'
import GalleryGrid from '@src/photos/components/GalleryGrid'
import type { CityGallery, CountryGallery, ImageProps } from '@src/photos/utils/types'
import Link from 'next/link'

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
                <Link href={`/travel/${countryGallery.countryId}`}>
                    {isCityGallery ? gallery.countryName : gallery.title}
                </Link>
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
