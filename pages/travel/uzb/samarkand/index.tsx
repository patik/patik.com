import Layout from '@src/components/common/Layout'
import getGalleryStaticProps from '@src/photos/lightbox/getGalleryStaticProps'
import { CustomImage } from '@src/photos/lightbox/images'
import { CityGalleryMap } from '@src/photos/utils/types'
import { GetStaticProps } from 'next'

const cityGalleryMap: CityGalleryMap = {
    samarkand: {
        country: 'uzbekistan',
        city: 'samarkand',
        cloudinaryFolder: 'Uzbekistan\\ 2023/Samarkand',
        title: 'Samarkand, Uzbekistan',
    },
}

export default function Page({ images }: { images: CustomImage[] }) {
    console.log('images prop: ', images)

    return (
        <Layout title="Uzbekistan" keywords={['Uzbekistan', 'Samarkand', 'Silk road', 'travel']}>
            <h1>Samarkand</h1>

            <section>
                <h2>Photos and Video</h2>
            </section>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async function () {
    return getGalleryStaticProps(Object.values(cityGalleryMap))
}
