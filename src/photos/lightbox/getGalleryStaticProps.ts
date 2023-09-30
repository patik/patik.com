import getBase64ImageUrl from '@src/photos/lightbox/generateBlurPlaceholder'
import cloudinary from '@src/photos/utils/cloudinary'
import { CityGallery, CloundinaryResource } from '@src/photos/utils/types'
import { Image } from 'react-grid-gallery'

export interface CustomImage extends Image {
    original: string
    blurDataUrl?: string
    public_id: CloundinaryResource['public_id']
    format: CloundinaryResource['format']
}

export default async function getGalleryStaticProps(
    galleries: CityGallery[]
    // context: GetStaticPropsContext
): Promise<{ props: { images: CustomImage[] } }> {
    // console.log('[props] context.params ', context.params)
    // const photoIdFromProps = getPhotoIdFromRouter(context.params)
    // console.log('[props] photoIdFromProps ', photoIdFromProps)
    let images: CustomImage[] = []

    await Promise.all(
        galleries.map(async ({ cloudinaryFolder }) => {
            const results: { resources: CloundinaryResource[] } = await cloudinary.v2.search
                .expression(`folder:${cloudinaryFolder}/*`)
                .sort_by('public_id', 'desc')
                .max_results(10)
                .execute()
            const reducedResults: CustomImage[] = []

            for (const result of results.resources) {
                console.log('result: ', result)
                reducedResults.push({
                    caption: result.filename,
                    height: result.height,
                    width: result.width,
                    format: result.format,
                    src: result.secure_url,
                    original: result.secure_url,
                    public_id: result.public_id,
                    // resource_type: result.resource_type,
                })
            }

            const blurImagePromises = reducedResults.map(getBase64ImageUrl)

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

    // let currentPhoto = null

    // if (photoIdFromProps !== undefined) {
    //     currentPhoto = images.find((img) => img.id === photoIdFromProps) ?? null

    //     if (currentPhoto) {
    //         currentPhoto.blurDataUrl = await getBase64ImageUrl(currentPhoto)
    //     } else {
    //         // throw new Error('could not find photo in PhotoPageGetStaticProps')
    //         console.log('[props] could not find blur data in getStaticProps')
    //     }
    // }

    return {
        props: {
            images,
            // currentPhoto,
        },
    }
}
