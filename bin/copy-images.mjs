/**
 * From https://www.codeconcisely.com/posts/nextjs-storing-images-next-to-markdown/
 */

import fs from 'fs'
import path from 'path'
import fsExtra from 'fs-extra'

const fsPromises = fs.promises
const targetDir = './public/blog/images'
const postsDir = './_posts'

async function copyImagesToPublic(images, slug) {
    for (const image of images) {
        await fsPromises.copyFile(`${postsDir}/${slug}/${image}`, `${targetDir}/${slug}/${image}`)
    }
}

const allowedImageFileExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg']

async function createPostImageFoldersForCopy() {
    // Get every post folder: post-one, post-two etc.
    const postSlugs = await fsPromises.readdir(postsDir)
    const imagesMetadata = {}

    for (const slug of postSlugs) {
        // Read all files inside current post folder
        const postDirFiles = await fsPromises.readdir(`${postsDir}/${slug}`)

        // Filter out files with allowed file extension (images)
        const images = postDirFiles.filter((file) => allowedImageFileExtensions.includes(path.extname(file)))

        if (images.length) {
            imagesMetadata[slug] = {}
            // Create a folder for images of this post inside public
            await fsPromises.mkdir(`${targetDir}/${slug}`)

            await copyImagesToPublic(images, slug)
        }
    }
}

await fsExtra.emptyDir(targetDir)
await createPostImageFoldersForCopy()
