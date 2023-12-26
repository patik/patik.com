import fetchFolderFromAssetProvider from '@src/photos/utils/fetchFolderFromAssetProvider'
import { CityGallery } from '@src/photos/utils/types'
import { GetStaticPathsResult } from 'next'
import { ParsedUrlQuery } from 'querystring'

/**
 * /travel/country/photos/
 * /travel/country/photos/city1/
 * /travel/country/photos/city1/1234
 * /travel/country/photos/city2/
 * /travel/country/photos/city2/5678
 */

export default async function getGalleryStaticPaths(galleries: CityGallery[] = []): Promise<GetStaticPathsResult> {
    if (galleries.length === 0) {
        throw new Error('getGalleryStaticPaths did not receive any galleries')
    }
    console.log(`[getGalleryStaticPaths] received ${galleries.length} galleries`)

    const fullPaths: (
        | string
        | {
              params: ParsedUrlQuery
              locale?: string | undefined
          }
    )[] = []

    // Main index page
    // /travel/country/photos/
    fullPaths.push({
        params: { photos: undefined },
    })

    async function forEachCityGallery({ cloudinaryFolder, cityId: city }: CityGallery) {
        try {
            // City index page
            // /travel/country/photos/city1/
            fullPaths.push({
                params: {
                    photos: [city],
                },
            })

            const results = await fetchFolderFromAssetProvider(cloudinaryFolder)

            console.log('[getGalleryStaticPaths] results.resources.length: ', results.resources.length)

            for (let i = 0; i < results.resources.length; i++) {
                // console.log('[getGalleryStaticPaths] city: ', city)
                // console.log('[getGalleryStaticPaths] i.toString(): ', i.toString())
                fullPaths.push({ params: { photos: [city, i.toString()] } })
            }
        } catch (e) {
            console.log('[getGalleryStaticPaths] error in forEachCityGallery: ', e)
        }
    }

    await Promise.all(galleries.map(forEachCityGallery))

    console.log(`[getGalleryStaticPaths] created ${fullPaths.length} fullPaths`)

    // try {
    //     console.log(
    //         '[getGalleryStaticPaths] is returning: ',
    //         JSON.stringify({
    //             paths: fullPaths,
    //             fallback: false,
    //         })
    //     )
    // } catch (e) {
    //     console.log('[getGalleryStaticPaths] could not stringify return props: ', {
    //         paths: fullPaths,
    //         fallback: false,
    //     })
    // }

    return {
        paths: fullPaths,
        fallback: false,
    }
}
