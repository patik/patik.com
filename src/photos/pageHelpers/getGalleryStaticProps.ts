import cloudinary from '@src/photos/utils/cloudinary'
import getBase64ImageUrl from '@src/photos/utils/generateBlurPlaceholder'
import { CityGallery, ImageProps } from '@src/photos/utils/types'
import { GetStaticPropsContext } from 'next'
import { PageProps } from '../../../pages/travel/uzbekistan/photos/[[...photos]]'

export default async function getGalleryStaticProps(
    galleries: CityGallery[],
    context: GetStaticPropsContext
): Promise<{ props: PageProps }> {
    console.log('[props] context.params ', context.params)
    const photoIdFromProps =
        context.params?.photos && context.params.photos.length > 1 ? Number(context.params.photos[1]) : undefined
    console.log('[props] photoIdFromProps ', photoIdFromProps)
    let images: ImageProps[] = []

    await Promise.all(
        galleries.map(async ({ cloudinaryFolder }) => {
            const results = await cloudinary.v2.search
                .expression(`folder:${cloudinaryFolder}/*`)
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

            images = images.concat(reducedResults)
        })
    )

    if (images.length === 0) {
        console.error('no images found')
    }
    console.log(`[props] images: ${images.length}`)

    let currentPhoto = null

    if (photoIdFromProps !== undefined) {
        currentPhoto = images.find((img) => img.id === photoIdFromProps) ?? null

        if (currentPhoto) {
            currentPhoto.blurDataUrl = await getBase64ImageUrl(currentPhoto)
        } else {
            // throw new Error('could not find photo in PhotoPageGetStaticProps')
            console.log('[props] could not find blur data in getStaticProps')
        }
    }

    return {
        props: {
            images,
            currentPhoto,
        },
    }
}
