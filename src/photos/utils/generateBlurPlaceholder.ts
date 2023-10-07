import imagemin from 'imagemin'
import imageminJpegtran from 'imagemin-jpegtran'
import type { ImageProps } from './types'

const cache = new Map<ImageProps, string>()

export default async function getBase64ImageUrl(image: ImageProps): Promise<string> {
    let url = cache.get(image)

    if (url) {
        return url
    }

    const imageUrl =
        image.resource_type === 'video'
            ? image.secure_url.replace('.mov', '.jpg')
            : `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_jpg,w_8,q_70/${image.public_id}.${image.format}`

    const response = await fetch(imageUrl)
    const buffer = await response.arrayBuffer()
    const minified = await imagemin.buffer(Buffer.from(buffer), {
        plugins: [imageminJpegtran()],
    })

    url = `data:image/jpeg;base64,${Buffer.from(minified).toString('base64')}`
    cache.set(image, url)

    return url
}
