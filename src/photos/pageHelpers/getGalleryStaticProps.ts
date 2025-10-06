import { getPhotoIdFromRouter } from '@src/photos/pageHelpers/getPhotoIdFromRouter'
import fetchFolderFromAssetProvider from '@src/photos/utils/fetchFolderFromAssetProvider'
import getBase64ImageUrl from '@src/photos/utils/generateBlurPlaceholder'
import { CityGallery, CloundinaryResource, ImageProps, PageProps } from '@src/photos/utils/types'
import { flatten } from 'lodash'
import { GetStaticPropsContext } from 'next'

function getImagePropsFromCloudinaryResult(result: CloundinaryResource, indexOrPhotoId: number): ImageProps {
    return {
        id: indexOrPhotoId,
        height: result.height,
        width: result.width,
        public_id: result.public_id,
        format: result.format,
        secure_url: result.secure_url,
        resource_type: result.resource_type,
    }
}

async function getReducedResults(cloudinaryFolder: CityGallery['cloudinaryFolder'], photoIdFromProps?: number) {
    const results: { resources: CloundinaryResource[] } = await fetchFolderFromAssetProvider(cloudinaryFolder)
    console.log('[getGalleryStaticProps, getReducedResults] results.resources.length: ', results.resources.length)
    console.log('[getGalleryStaticProps, getReducedResults] photoIdFromProps ', photoIdFromProps)

    // Index page, return all images' props
    if (!photoIdFromProps) {
        return results.resources.reduce((acc, result, i) => {
            acc.push(getImagePropsFromCloudinaryResult(result, i))
            return acc
        }, [] as ImageProps[])
    }

    // Page for a specific photo, just return that one image's props
    const photoId = Number(photoIdFromProps)
    const result = results.resources[photoId]

    return [getImagePropsFromCloudinaryResult(result, photoId)]
}

function getGalleryMapper(
    photoIdFromProps?: number
): ({ cloudinaryFolder }: Pick<CityGallery, 'cloudinaryFolder'>) => Promise<ImageProps[]> {
    return async function getGalleryImages({ cloudinaryFolder }) {
        try {
            const reducedResults = await getReducedResults(cloudinaryFolder, photoIdFromProps)
            // console.log('[getGalleryStaticProps, getGalleryImages] reducedResults.length: ', reducedResults.length)

            const blurImagePromises = reducedResults.map((image) => {
                return getBase64ImageUrl(image)
            })
            const imagesWithBlurDataUrls = await Promise.all(blurImagePromises)
            // console.log(
            //     '[getGalleryStaticProps, getGalleryImages] imagesWithBlurDataUrls.length: ',
            //     imagesWithBlurDataUrls.length
            // )
            for (let i = 0; i < reducedResults.length; i++) {
                reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i]
            }

            // console.log(
            //     `[getGalleryStaticProps, getGalleryImages] Found ${reducedResults.length} images in folder ${cloudinaryFolder}`
            // )
            return reducedResults
        } catch (e) {
            console.log('[getGalleryStaticProps, getGalleryImages] error: ', e)
        }

        return []
    }
}

export default async function getGalleryStaticProps(
    galleries: Pick<CityGallery, 'cloudinaryFolder'>[] = [],
    context: GetStaticPropsContext
): Promise<{ props: PageProps }> {
    if (galleries.length === 0) {
        throw new Error('getGalleryStaticProps did not receive any galleries')
    }
    // console.log(`[getGalleryStaticProps] received ${galleries.length} galleries`)
    // console.log(`[getGalleryStaticProps] context.params: `, context.params)

    const photoIdFromProps = getPhotoIdFromRouter(context.params)
    const galleryMapper = getGalleryMapper(photoIdFromProps)
    const images: ImageProps[] = flatten(await Promise.all(galleries.map(galleryMapper)))

    // console.log(`Found ${images.length} total images across ${galleries.length} galleries`)

    if (images.length === 0) {
        throw new Error('no images found in any gallery')
    }

    let currentPhoto = null
    // console.log('[getGalleryStaticProps] photoIdFromProps: ', photoIdFromProps)

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
    //     console.log('[getGalleryStaticProps] could not stringify return props: ', {
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
