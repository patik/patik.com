import Layout from '@src/components/common/Layout'
import singlePhotoPageGetStaticPaths from '@src/photos/pageHelpers/single/getStaticPaths'
import singlePhotoPageGetStaticProps from '@src/photos/pageHelpers/single/getStaticProps'
import { SinglePhotoPage } from '@src/photos/pageHelpers/single/page'
import type { ImageProps } from '@src/photos/utils/types'
import type { GetStaticProps } from 'next'
import { galleryMeta } from '..'

type Props = { currentPhoto: ImageProps }

export default function Page({ currentPhoto }: Props) {
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
            <SinglePhotoPage galleryMeta={galleryMeta} currentPhoto={currentPhoto} />
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    return singlePhotoPageGetStaticProps(galleryMeta, context)
}

export async function getStaticPaths() {
    return singlePhotoPageGetStaticPaths(galleryMeta)
}
