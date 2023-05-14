import cloudinary from '@src/photos/utils/cloudinary'
import { CityGallery } from '@src/photos/utils/types'
import { GetStaticPathsContext, GetStaticPathsResult } from 'next'
import { ParsedUrlQuery } from 'querystring'

/**
 * /travel/country/photos/
 * /travel/country/photos/city1/
 * /travel/country/photos/city1/1234
 * /travel/country/photos/city2/
 * /travel/country/photos/city2/5678
 */

export default async function getGalleryStaticPaths(
    galleries: CityGallery[],
    context: GetStaticPathsContext
): Promise<GetStaticPathsResult> {
    console.log('[paths] context ', context)
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
        galleries.map(async ({ cloudinaryFolder, city }) => {
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
                .max_results(400)
                .execute()

            console.log(`[paths] cloudinaryFolder ${cloudinaryFolder} returned ${results.resources.length} items`)
            for (let i = 0; i < results.resources.length; i++) {
                fullPaths.push({ params: { photos: [city, i.toString()] } })
            }
        })
    )

    console.log(
        '[paths] fullPaths: \n',
        fullPaths.map((x) => (x ? JSON.stringify(x, null, 2) : '(no JSON)')).join('\n')
    )

    return {
        paths: fullPaths,
        fallback: false,
    }
}
