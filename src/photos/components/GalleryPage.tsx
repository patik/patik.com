import Layout from '@src/components/common/Layout'
import countryGallery from '@src/galleries/uzbekistan'
import GalleryGrid from '@src/photos/components/GalleryGrid'
import type { CityGallery, CountryGallery, ImageProps } from '@src/photos/utils/types'
import Link from 'next/link'

export function GalleryPage({
    gallery,
    cityGalleries,
    images,
}: {
    gallery: CountryGallery | CityGallery
    cityGalleries: CityGallery[]
    images: ImageProps[]
}) {
    return (
        <Layout title={gallery.title} keywords={gallery.keywords}>
            <h1>{gallery.title}</h1>

            <section>
                <h2>Photos and Video</h2>

                <p>
                    <Link href={`/travel/${countryGallery.country}`}>{`Back to ${countryGallery.title}`}</Link>
                </p>

                <GalleryGrid
                    gallery={gallery}
                    city={'city' in gallery ? gallery.city : undefined}
                    cityGalleries={cityGalleries}
                    images={images}
                />
            </section>
        </Layout>
    )
}
