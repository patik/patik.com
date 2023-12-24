import getImageUrl from '@src/photos/utils/getImageUrl'
import type { ImageProps } from '@src/photos/utils/types'
import imagemin from 'imagemin'
import imageminJpegtran from 'imagemin-jpegtran'

const cache = new Map<ImageProps, string>()

export default async function getBase64ImageUrl(image: ImageProps): Promise<string> {
    let url = cache.get(image)

    if (url) {
        return url
    }

    const imageUrl =
        image.resource_type === 'video'
            ? getImageUrl(image)
            : `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_jpg,w_8,q_70/${image.public_id}.${image.format}`

    const response = await fetch(imageUrl)
    const buffer = await response.arrayBuffer()
    const minified = await imagemin.buffer(Buffer.from(buffer), {
        plugins: [imageminJpegtran()],
    })

    url = `data:image/jpeg;base64,${Buffer.from(minified).toString('base64')}`
    cache.set(image, url)

    // if (image.resource_type === 'video') {
    //     console.log('---------------------')
    //     console.log('imageUrl: ', imageUrl)
    //     console.log('secure_url: ', image.secure_url)
    //     console.log('blurred: ', Buffer.from(minified).toString('base64'))
    // }

    return url
}
