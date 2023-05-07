import { createGetStaticPaths } from '@src/photos/PhotoPageGetStaticPaths'
import { createGetStaticProps } from '@src/photos/PhotoPageGetStaticProps'
import { PhotoPage } from '@src/photos/PhotoPage'
import type { ImageProps } from '@src/photos/utils/types'
import type { GetStaticProps } from 'next'
import { folderName } from '..'

type Props = { currentPhoto: ImageProps }

export default function Page({ currentPhoto }: Props) {
    return <PhotoPage folderName={folderName} currentPhoto={currentPhoto} />
}

export const getStaticProps: GetStaticProps = async (context) => {
    return createGetStaticProps(folderName, context)
}

export async function getStaticPaths() {
    return createGetStaticPaths(folderName)
}
