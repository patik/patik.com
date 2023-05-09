import { GalleryMeta } from '@src/photos/utils/types'
import { GetStaticPathsResult } from 'next'
import cloudinary from '../../utils/cloudinary'

export default async function singlePhotoPageGetStaticPaths({
    folderName,
}: GalleryMeta): Promise<GetStaticPathsResult> {
    const results = await cloudinary.v2.search
        .expression(`folder:${folderName}/*`)
        .sort_by('public_id', 'desc')
        .max_results(400)
        .execute()

    const fullPaths = []
    for (let i = 0; i < results.resources.length; i++) {
        fullPaths.push({ params: { photoId: i.toString() } })
    }

    return {
        paths: fullPaths,
        fallback: false,
    }
}
