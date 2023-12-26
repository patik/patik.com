import { getPhotoIdFromRouter } from '@src/photos/pageHelpers/getPhotoIdFromRouter'
import cloudinary from '@src/photos/utils/cloudinary'
import getBase64ImageUrl from '@src/photos/utils/generateBlurPlaceholder'
import { CityGallery, CloundinaryResource, ImageProps, PageProps } from '@src/photos/utils/types'
import { GetStaticPropsContext } from 'next'

export default async function getGalleryStaticProps(
    galleries: Pick<CityGallery, 'cloudinaryFolder'>[] = [],
    context: GetStaticPropsContext
): Promise<{ props: PageProps }> {
    if (galleries.length === 0) {
        throw new Error('getGalleryStaticProps did not receive any galleries')
    }
    console.log(`getGalleryStaticProps received ${galleries.length} galleries`)
    console.log(`getGalleryStaticProps context.params: `, context.params)

    const photoIdFromProps = getPhotoIdFromRouter(context.params)
    let images: ImageProps[] = []

    await Promise.all(
        galleries.map(async ({ cloudinaryFolder }) => {
            const results: { resources: CloundinaryResource[] } = await cloudinary.v2.search
                .expression(`folder:${cloudinaryFolder}/*`)
                .sort_by('public_id', 'desc')
                .max_results(2)
                .execute()
            const reducedResults: ImageProps[] = []
            console.log('getGalleryStaticProps results.resources.length: ', results.resources.length)
            let i = 0
            for (const result of results.resources) {
                console.log('getGalleryStaticProps reducedResult: ', {
                    id: i,
                    height: result.height,
                    width: result.width,
                    public_id: result.public_id,
                    format: result.format,
                    secure_url: result.secure_url,
                    resource_type: result.resource_type,
                })
                reducedResults.push({
                    id: i,
                    height: result.height,
                    width: result.width,
                    public_id: result.public_id,
                    format: result.format,
                    secure_url: result.secure_url,
                    resource_type: result.resource_type,
                })
                i++
            }
            console.log('getGalleryStaticProps reducedResults.length: ', reducedResults.length)

            const blurImagePromises = reducedResults.map((image) => {
                return getBase64ImageUrl(image)
            })
            const imagesWithBlurDataUrls = await Promise.all(blurImagePromises)
            console.log('getGalleryStaticProps imagesWithBlurDataUrls.length: ', imagesWithBlurDataUrls.length)
            for (let i = 0; i < reducedResults.length; i++) {
                reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i]
            }

            console.log(`Found ${reducedResults.length} images in folder ${cloudinaryFolder}`)

            images = images.concat(reducedResults)
        })
    )

    console.log(`Found ${images.length} total images across ${galleries.length} galleries`)

    if (images.length === 0) {
        console.error('no images found')
    }

    let currentPhoto = null
    console.log('photoIdFromProps: ', photoIdFromProps)

    if (photoIdFromProps !== undefined) {
        currentPhoto = images.find((img) => img.id === photoIdFromProps) ?? null

        if (currentPhoto) {
            currentPhoto.blurDataUrl = await getBase64ImageUrl(currentPhoto)
        } else {
            throw new Error('could not find photo in PhotoPageGetStaticProps')
        }
    }

    // try {
    //     console.log(
    //         'getGalleryStaticProps is returning: ',
    //         JSON.stringify({
    //             props: {
    //                 images,
    //                 currentPhoto,
    //             },
    //         })
    //     )
    // } catch (e) {
    //     console.log('getGalleryStaticProps could not stringify return props: ', {
    //         props: {
    //             images,
    //             currentPhoto,
    //         },
    //     })
    // }

    return {
        props: {
            images,
            currentPhoto,
        },
    }
}
