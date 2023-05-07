import cloudinary from '@src/photos/utils/cloudinary'
import getBase64ImageUrl from '@src/photos/utils/generateBlurPlaceholder'
import { GalleryMeta, ImageProps } from '@src/photos/utils/types'

export default async function photoIndexPageGetStaticProps({ folderName }: GalleryMeta) {
    const results = await cloudinary.v2.search
        .expression(`folder:${folderName}/*`)
        .sort_by('public_id', 'desc')
        .max_results(400)
        .execute()
    const reducedResults: ImageProps[] = []

    let i = 0
    for (const result of results.resources) {
        reducedResults.push({
            id: i,
            height: result.height,
            width: result.width,
            public_id: result.public_id,
            format: result.format,
        })
        i++
    }

    const blurImagePromises = results.resources.map((image: ImageProps) => {
        return getBase64ImageUrl(image)
    })
    const imagesWithBlurDataUrls = await Promise.all(blurImagePromises)

    for (let i = 0; i < reducedResults.length; i++) {
        reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i]
    }

    return {
        props: {
            images: reducedResults,
        },
    }
}
