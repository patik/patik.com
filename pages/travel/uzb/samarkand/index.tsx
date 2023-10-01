import Layout from '@src/components/common/Layout'
import Gallery from '@src/photos/lightbox/Gallery'
import getGalleryStaticProps from '@src/photos/lightbox/getGalleryStaticProps'
import { CityGalleryMap, Image } from '@src/photos/utils/types'
import { GetStaticProps } from 'next'

const cityGalleryMap: CityGalleryMap = {
    samarkand: {
        country: 'uzbekistan',
        city: 'samarkand',
        cloudinaryFolder: 'Uzbekistan\\ 2023/Samarkand',
        title: 'Samarkand, Uzbekistan',
    },
}

export default function Page({ images }: { images: Image[] }) {
    console.log('images prop: ', images)

    return (
        <Layout title="Uzbekistan" keywords={['Uzbekistan', 'Samarkand', 'Silk road', 'travel']}>
            <h1>Samarkand</h1>

            <section>
                <h2>Photos and Video</h2>

                <Gallery images={images} />
            </section>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async function () {
    return getGalleryStaticProps(Object.values(cityGalleryMap))
}
