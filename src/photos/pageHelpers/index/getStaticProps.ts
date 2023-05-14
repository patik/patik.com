import cloudinary from '@src/photos/utils/cloudinary'
import getBase64ImageUrl from '@src/photos/utils/generateBlurPlaceholder'
import { GalleryMeta, ImageProps } from '@src/photos/utils/types'
import { GetStaticPropsContext } from 'next'

export default async function galleryIndexPageGetStaticProps(
    { cloudinaryFolder }: GalleryMeta,
    context: GetStaticPropsContext
) {
    console.log('context.params ', context.params)
    const results = await cloudinary.v2.search
        .expression(`folder:${cloudinaryFolder}/*`)
        .sort_by('public_id', 'desc')
        .max_results(400)
        .execute()
    const reducedResults: ImageProps[] = []

    const photoIdFromProps =
        context.params?.photos && context.params.photos.length > 1 ? Number(context.params.photos[1]) : undefined

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

    let currentPhoto

    if (photoIdFromProps) {
        currentPhoto = reducedResults.find((img) => img.id === photoIdFromProps)
        if (currentPhoto) {
            currentPhoto.blurDataUrl = await getBase64ImageUrl(currentPhoto)
        } else {
            throw new Error('could find find photo in PhotoPageGetStaticProps')
        }
    }

    return {
        props: {
            images: reducedResults,
            currentPhoto,
        },
    }
}
