import cloudinary from '@src/photos/utils/cloudinary'
import type { CloudinaryResult } from '@src/photos/utils/types'

let cachedResults: CloudinaryResult | null = null

export default async function fetchFromAssetProvider(folderName: string) {
    if (!cachedResults) {
        console.log('[fetchFromAssetProvider] making a new request')
        const fetchedResults = await cloudinary.v2.search
            .expression(`folder:${folderName}/*`)
            .sort_by('public_id', 'desc')
            .max_results(400)
            .execute()

        cachedResults = fetchedResults
    } else {
        console.log('[fetchFromAssetProvider] returning cachedResults')
    }

    if (!cachedResults) {
        throw new Error('[fetchFromAssetProvider] did not receive any results')
    }

    return cachedResults
}
