import { createGetStaticPaths } from '@src/photos/createGetStaticPaths'
import { createGetStaticProps } from '@src/photos/createGetStaticProps'
import { PhotoPage } from '@src/photos/PhotoPage'
import type { ImageProps } from '@src/photos/utils/types'
import type { GetStaticProps } from 'next'
import { FC } from 'react'
import { folderName } from '..'

type Props = { currentPhoto: ImageProps }

const Page: FC<Props> = ({ currentPhoto }: Props) => {
    return <PhotoPage folderName={folderName} currentPhoto={currentPhoto} />
}

export default Page

export const getStaticProps: GetStaticProps = async (context) => {
    return createGetStaticProps(folderName, context)
}

export async function getStaticPaths() {
    return createGetStaticPaths(folderName)
}
