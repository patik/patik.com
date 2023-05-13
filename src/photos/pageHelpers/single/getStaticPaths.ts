import cloudinary from '@src/photos/utils/cloudinary'
import { GalleryMeta } from '@src/photos/utils/types'
import { GetStaticPathsContext, GetStaticPathsResult } from 'next'
import { ParsedUrlQuery } from 'querystring'

/**
 * /travel/country/photos/
 * /travel/country/photos/1234
 * /travel/country/photos/5678
 * /travel/country/photos/city1/
 * /travel/country/photos/city1/1234
 * /travel/country/photos/city2/
 * /travel/country/photos/city2/5678
 */

export default async function singlePhotoPageGetStaticPaths(
    galleries: GalleryMeta[],
    context: GetStaticPathsContext
): Promise<GetStaticPathsResult> {
    console.log('context ', context)
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

    galleries.forEach(async ({ cloudinaryFolder, pathSegment }) => {
        // City index page
        // /travel/country/photos/city1/
        fullPaths.push({
            params: {
                photos: [pathSegment],
            },
        })

        const results = await cloudinary.v2.search
            .expression(`folder:${cloudinaryFolder}/*`)
            .sort_by('public_id', 'desc')
            .max_results(400)
            .execute()

        console.log(`cloudinaryFolder ${cloudinaryFolder} returned ${results.resources.length} items`)
        for (let i = 0; i < results.resources.length; i++) {
            fullPaths.push({ params: { photos: [pathSegment, i.toString()] } })
        }
    })

    console.log('fullPaths: \n', fullPaths.map((x) => JSON.stringify(x, null, 4)).join('\n'))

    return {
        paths: fullPaths,
        fallback: false,
    }
}
