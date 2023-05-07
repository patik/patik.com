import { PhotoPage } from '@src/photos/PhotoPage'
import getResults from '@src/photos/utils/cachedImages'
import cloudinary from '@src/photos/utils/cloudinary'
import getBase64ImageUrl from '@src/photos/utils/generateBlurPlaceholder'
import type { ImageProps } from '@src/photos/utils/types'
import type { GetStaticProps } from 'next'
import { FC } from 'react'
import { folderName } from '..'

type Props = { currentPhoto: ImageProps }

const Home: FC<Props> = ({ currentPhoto }: Props) => {
    return <PhotoPage folderName={folderName} currentPhoto={currentPhoto} />
}

export default Home

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
    const results = await cloudinary.v2.search
        .expression(`folder:${folderName}/*`)
        .sort_by('public_id', 'desc')
        .max_results(400)
        .execute()

    const fullPaths = []
    for (let i = 0; i < results.resources.length; i++) {
        fullPaths.push({ params: { photoId: i.toString() } })
    }

    return {
        paths: fullPaths,
        fallback: false,
    }
}
