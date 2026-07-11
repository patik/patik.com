import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'
import cloudinary from '@src/photos/utils/cloudinary'
import getCloudinaryEnv from '@src/photos/utils/getCloudinaryEnv'
import type { CloudinaryResult } from '@src/photos/utils/types'

const cacheDir = path.join(process.cwd(), 'tmp')

if (!existsSync(cacheDir)) {
    console.log('[fetchFolderFromAssetProvider] creating cache folder ', cacheDir)
    mkdirSync(cacheDir)
}

export default async function fetchFolderFromAssetProvider(
    folderName: string,
    sortDirection: 'asc' | 'desc' = 'desc',
): Promise<CloudinaryResult> {
    const cacheKey = `${folderName.replace(/[^a-z0-9]/gi, '_')}_${sortDirection}`
    const filePath = path.join(cacheDir, `cloudinary-cache-${cacheKey}`)

    if (existsSync(filePath)) {
        console.log('[fetchFolderFromAssetProvider] returning cached results in ', filePath)

        const cachedResults: CloudinaryResult = JSON.parse(readFileSync(filePath, 'utf8'))

        return cachedResults
    }

    const cloudName = getCloudinaryEnv('PUBLIC_CLOUDINARY_CLOUD_NAME')
    const apiKey = getCloudinaryEnv('CLOUDINARY_API_KEY')
    const apiSecret = getCloudinaryEnv('CLOUDINARY_API_SECRET')

    if (!cloudName || !apiKey || !apiSecret) {
        console.warn(
            '[fetchFolderFromAssetProvider] Cloudinary configuration not found, skipping photo gallery generation',
        )
        return { resources: [], total_count: 0, time: 0 }
    }

    console.log('[fetchFolderFromAssetProvider] new request')
    const fetchedResults: CloudinaryResult | undefined = await cloudinary.v2.search
        .expression(`folder:${folderName}/*`)
        .sort_by('public_id', sortDirection)
        .max_results(400)
        .execute()

    if (!fetchedResults) {
        throw new Error('[fetchFolderFromAssetProvider] did not receive any results')
    }

    writeFileSync(filePath, JSON.stringify(fetchedResults), 'utf8')

    return fetchedResults
}
