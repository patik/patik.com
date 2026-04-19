import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'
import cloudinary from '@src/photos/utils/cloudinary'

const cacheDir = path.join(process.cwd(), 'tmp')

if (!existsSync(cacheDir)) {
    console.log('[fetchFolderFromAssetProvider] creating cache folder ', cacheDir)
    mkdirSync(cacheDir)
}

export default async function fetchFolderFromAssetProvider(folderName: string, sortDirection: 'asc' | 'desc' = 'desc') {
    const cacheKey = `${folderName.replace(/[^a-z0-9]/gi, '_')}_${sortDirection}`
    const filePath = path.join(cacheDir, `cloudinary-cache-${cacheKey}`)

    if (existsSync(filePath)) {
        console.log('[fetchFolderFromAssetProvider] returning cached results in ', filePath)
        return JSON.parse(readFileSync(filePath, 'utf8'))
    }

    // Check if Cloudinary configuration is available (import.meta.env for local/Astro, process.env for Netlify/CI)
    const cloudName =
        import.meta.env?.PUBLIC_CLOUDINARY_CLOUD_NAME ?? process.env.PUBLIC_CLOUDINARY_CLOUD_NAME
    const apiKey = import.meta.env?.CLOUDINARY_API_KEY ?? process.env.CLOUDINARY_API_KEY
    const apiSecret = import.meta.env?.CLOUDINARY_API_SECRET ?? process.env.CLOUDINARY_API_SECRET
    if (!cloudName || !apiKey || !apiSecret) {
        console.warn(
            '[fetchFolderFromAssetProvider] Cloudinary configuration not found, skipping photo gallery generation',
        )
        return { resources: [] }
    }

    console.log('[fetchFolderFromAssetProvider] new request')
    const fetchedResults = await cloudinary.v2.search
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
