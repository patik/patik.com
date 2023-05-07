import { PhotoPage } from '@src/photos/pages/photo/PhotoPage'
import { PhotoPageGetStaticPaths } from '@src/photos/pages/photo/PhotoPageGetStaticPaths'
import { PhotoPageGetStaticProps } from '@src/photos/pages/photo/PhotoPageGetStaticProps'
import type { ImageProps } from '@src/photos/utils/types'
import type { GetStaticProps } from 'next'
import { folderName } from '..'

type Props = { currentPhoto: ImageProps }

export default function Page({ currentPhoto }: Props) {
    return <PhotoPage folderName={folderName} currentPhoto={currentPhoto} />
}

export const getStaticProps: GetStaticProps = async (context) => {
    return PhotoPageGetStaticProps(folderName, context)
}

export async function getStaticPaths() {
    return PhotoPageGetStaticPaths(folderName)
}
