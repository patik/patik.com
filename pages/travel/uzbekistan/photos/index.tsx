import { PhotoIndexPage } from '@src/photos/PhotoIndexPage'
import { PhotoIndexPageGetStaticProps } from '@src/photos/PhotoIndexPageGetStaticProps'
import type { ImageProps } from '@src/photos/utils/types'
import type { NextPage } from 'next'

type Props = { images: ImageProps[] }

export const folderName = 'Uzbekistan\\ 2023'

const Home: NextPage<Props> = ({ images }: Props) => {
    return <PhotoIndexPage folderName={folderName} images={images} />
}

export default Home

export async function getStaticProps() {
    return PhotoIndexPageGetStaticProps(folderName)
}
