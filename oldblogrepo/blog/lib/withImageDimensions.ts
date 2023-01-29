import fs from 'fs'
import imageSize from 'image-size'
import { ISizeCalculationResult } from 'image-size/dist/types/interface'
import { join } from 'path'
import { promisify } from 'util'
import { PartialPost } from './getPosts'

const imagesDirectory = join(process.cwd(), 'public/blog/images')

const sizeOf = promisify(imageSize)

/**
 * Adds the image's `height` and `width` to it's properties.
 */
async function getDimensions(imagePath: string): Promise<ISizeCalculationResult> {
    const res = await sizeOf(imagePath)

    if (!res) {
        throw Error(`Invalid image with src "${imagePath}"`)
    }

    return res
}

export async function withImageDimensions(post: PartialPost): Promise<PartialPost> {
    const postImagesPath = `${imagesDirectory}/${post.slug}`

    if (!fs.existsSync(postImagesPath)) {
        return post
    }

    const imageFiles = fs.readdirSync(postImagesPath)
    const imagesMetadata: Record<string, ISizeCalculationResult> = {}

    for (const imagePath of imageFiles) {
        console.log(`getting image for path ${postImagesPath}/${imagePath}`)
        imagesMetadata[imagePath] = await getDimensions(`${postImagesPath}/${imagePath}`)
    }

    return {
        ...post,
        imagesMetadata: JSON.stringify(imagesMetadata),
    }
}
