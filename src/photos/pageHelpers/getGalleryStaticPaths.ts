import cloudinary from '@src/photos/utils/cloudinary'
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
    console.log(`getGalleryStaticPaths received ${galleries.length} galleries`)

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

    await Promise.all(
        galleries.map(async ({ cloudinaryFolder, cityId: city }) => {
            // City index page
            // /travel/country/photos/city1/
            fullPaths.push({
                params: {
                    photos: [city],
                },
            })

            const results = await cloudinary.v2.search
                .expression(`folder:${cloudinaryFolder}/*`)
                .sort_by('public_id', 'desc')
                .max_results(100)
                .execute()

            console.log('getGalleryStaticPaths results.resources.length: ', results.resources.length)
            for (let i = 0; i < results.resources.length; i++) {
                fullPaths.push({ params: { photos: [city, i.toString()] } })
            }
        })
    )

    console.log(`getGalleryStaticPaths created ${fullPaths.length} fullPaths`)

    // try {
    //     console.log(
    //         'getGalleryStaticPaths is returning: ',
    //         JSON.stringify({
    //             paths: fullPaths,
    //             fallback: false,
    //         })
    //     )
    // } catch (e) {
    //     console.log('getGalleryStaticPaths could not stringify return props: ', {
    //         paths: fullPaths,
    //         fallback: false,
    //     })
    // }

    return {
        paths: fullPaths,
        fallback: false,
    }
}
