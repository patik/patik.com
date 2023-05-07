import photoPageGetStaticPaths from '@src/photos/pageHelpers/photo/getStaticPaths'
import photoPageGetStaticProps from '@src/photos/pageHelpers/photo/getStaticProps'
import { PhotoPage } from '@src/photos/pageHelpers/photo/page'
import type { ImageProps } from '@src/photos/utils/types'
import type { GetStaticProps } from 'next'
import { galleryMeta } from '..'

type Props = { currentPhoto: ImageProps }

export default function Page({ currentPhoto }: Props) {
    return <PhotoPage galleryMeta={galleryMeta} currentPhoto={currentPhoto} />
}

export const getStaticProps: GetStaticProps = async (context) => {
    return photoPageGetStaticProps(galleryMeta, context)
}

export async function getStaticPaths() {
    return photoPageGetStaticPaths(galleryMeta)
}
