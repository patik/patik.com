import { createGetStaticPaths } from '@src/photos/createGetStaticPaths'
import { PhotoPage } from '@src/photos/PhotoPage'
import getResults from '@src/photos/utils/cachedImages'
import cloudinary from '@src/photos/utils/cloudinary'
import getBase64ImageUrl from '@src/photos/utils/generateBlurPlaceholder'
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
    const results = await getResults(folderName)
    const reducedResults: ImageProps[] = []
    let i = 0

    for (const result of results.resources) {
        reducedResults.push({
            id: i,
            height: String(result.height),
            width: String(result.width),
            public_id: result.public_id,
            format: result.format,
        })
        i++
    }

    const currentPhoto = reducedResults.find((img) => img.id === Number(context.params?.photoId))
    if (currentPhoto) {
        currentPhoto.blurDataUrl = await getBase64ImageUrl(currentPhoto)
    }

    return {
        props: {
            currentPhoto,
        },
    }
}

export async function getStaticPaths() {
    return await createGetStaticPaths(folderName)
}
