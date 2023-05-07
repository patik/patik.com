import { ImageProps } from '@src/photos/utils/types'
import { GetStaticProps } from 'next'
import getResults from './utils/cachedImages'
import getBase64ImageUrl from './utils/generateBlurPlaceholder'

export const createGetStaticProps =
    (folderName: string): GetStaticProps =>
    async (context) => {
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
