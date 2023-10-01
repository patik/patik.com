import cloudinary from '@src/photos/utils/cloudinary'
import getBase64ImageUrl from '@src/photos/utils/generateBlurPlaceholder'
import { CityGallery, CloundinaryResource, ImageProps } from '@src/photos/utils/types'
import { GetStaticPropsContext } from 'next'
import { PageProps } from '../../../pages/travel/uzbekistan/photos/[[...photos]]'
import { getPhotoIdFromRouter } from './getPhotoIdFromRouter'

export default async function getGalleryStaticProps(
    galleries: CityGallery[],
    context: GetStaticPropsContext
): Promise<{ props: PageProps }> {
    // console.log('[props] context.params ', context.params)
    const photoIdFromProps = getPhotoIdFromRouter(context.params)
    // console.log('[props] photoIdFromProps ', photoIdFromProps)
    let images: ImageProps[] = []

    await Promise.all(
        galleries.map(async ({ cloudinaryFolder }) => {
            const results: { resources: CloundinaryResource[] } = await cloudinary.v2.search
                .expression(`folder:${cloudinaryFolder}/*`)
                .sort_by('public_id', 'desc')
                .max_results(10)
                .execute()
            const reducedResults: ImageProps[] = []

            let i = 0
            for (const result of results.resources) {
                console.log('result: ', result)
                reducedResults.push({
                    id: i,
                    height: String(result.height),
                    width: String(result.width),
                    public_id: result.public_id,
                    format: result.format,
                    secure_url: result.secure_url,
                    resource_type: result.resource_type,
                })
                i++
            }

            const blurImagePromises = reducedResults.map((image) => {
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
    // console.log(`[props] images: ${images.length}`)

    let currentPhoto = null

    if (photoIdFromProps !== undefined) {
        currentPhoto = images.find((img) => img.id === photoIdFromProps) ?? null

        if (currentPhoto) {
            currentPhoto.blurDataUrl = await getBase64ImageUrl(currentPhoto)
        } else {
            throw new Error('could not find photo in PhotoPageGetStaticProps')
            // console.log('[props] could not find blur data in getStaticProps')
        }
    }

    return {
        props: {
            images,
            currentPhoto,
        },
    }
}
