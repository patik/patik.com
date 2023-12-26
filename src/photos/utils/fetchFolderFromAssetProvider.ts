import cloudinary from '@src/photos/utils/cloudinary'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'

const fileName = 'cloundary-cache'
const folderPath = path.join(__dirname, '../../../../../../tmp')

if (!existsSync(folderPath)) {
    console.log('[fetchFolderFromAssetProvider] creating cache folder ', folderPath)
    mkdirSync(folderPath)
}

const filePath = path.join(folderPath, fileName)

console.log('filePath: ', filePath)
export default async function fetchFolderFromAssetProvider(folderName: string) {
    if (existsSync(filePath)) {
        console.log('[fetchFolderFromAssetProvider] returning cached results in ', filePath)
        return JSON.parse(readFileSync(filePath, 'utf8'))
    }

    console.log('[fetchFolderFromAssetProvider] new request')
    const fetchedResults = await cloudinary.v2.search
        .expression(`folder:${folderName}/*`)
        .sort_by('public_id', 'desc')
        .max_results(400)
        .execute()

    if (!fetchedResults) {
        throw new Error('[fetchFolderFromAssetProvider] did not receive any results')
    }

    writeFileSync(filePath, JSON.stringify(fetchedResults), 'utf8')

    return fetchedResults
}
