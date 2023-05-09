import Layout from '@src/components/common/Layout'
import galleryIndexPageGetStaticProps from '@src/photos/pageHelpers/index/getStaticProps'
import { GalleryIndexPage } from '@src/photos/pageHelpers/index/page'
import type { GalleryMeta, ImageProps } from '@src/photos/utils/types'

type Props = { images: ImageProps[] }

export const galleryMeta: GalleryMeta = {
    folderName: 'Uzbekistan\\ 2023',
    galleryTitle: 'Uzbekistan 2023',
    rootPath: '/travel/uzbekistan/photos',
}

export default function Page({ images }: Props) {
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

            <p>A beautiful country full of Islamic architecture that had only just opened up to mass tourism</p>

            <section>
                <h2>Photos and Video</h2>

                <GalleryIndexPage galleryMeta={galleryMeta} images={images} />
            </section>
        </Layout>
    )
}

export async function getStaticProps() {
    return galleryIndexPageGetStaticProps(galleryMeta)
}
