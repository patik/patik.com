import photoIndexPageGetStaticProps from '@src/photos/pageHelpers/index/getStaticProps'
import { PhotoIndexPage } from '@src/photos/pageHelpers/index/pages'
import type { GalleryMeta, ImageProps } from '@src/photos/utils/types'

type Props = { images: ImageProps[] }

export const galleryMeta: GalleryMeta = {
    folderName: 'Uzbekistan\\ 2023',
    rootPath: '/travel/uzbekistan/photos',
}

export default function Page({ images }: Props) {
    return <PhotoIndexPage galleryMeta={galleryMeta} images={images} />
}

export async function getStaticProps() {
    return photoIndexPageGetStaticProps(galleryMeta)
}
