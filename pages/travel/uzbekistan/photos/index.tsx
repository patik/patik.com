import { PhotoIndexPage } from '@src/photos/pages/index/PhotoIndexPage'
import { PhotoIndexPageGetStaticProps } from '@src/photos/pages/index/PhotoIndexPageGetStaticProps'
import type { ImageProps } from '@src/photos/utils/types'

type Props = { images: ImageProps[] }

export const folderName = 'Uzbekistan\\ 2023'

export default function Page({ images }: Props) {
    return <PhotoIndexPage folderName={folderName} images={images} />
}

export async function getStaticProps() {
    return PhotoIndexPageGetStaticProps(folderName)
}
