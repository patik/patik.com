import { PartialPost } from '@src/lib/getPosts'
import fs from 'fs'
import { imageSizeFromFile } from 'image-size/fromFile'
import { ISizeCalculationResult } from 'image-size/types/interface'
import { join } from 'path'

const imagesDirectory = join(process.cwd(), 'public/blog/images')

export async function withImageDimensions(post: PartialPost): Promise<PartialPost> {
    const postImagesPath = `${imagesDirectory}/${post.slug}`

    if (!fs.existsSync(postImagesPath)) {
        return post
    }

    const imageFiles = fs.readdirSync(postImagesPath)
    const imagesMetadata: Record<string, ISizeCalculationResult> = {}

    for (const imagePath of imageFiles) {
        imagesMetadata[imagePath] = await imageSizeFromFile(`${postImagesPath}/${imagePath}`)
    }

    return {
        ...post,
        imagesMetadata: JSON.stringify(imagesMetadata),
    }
}
