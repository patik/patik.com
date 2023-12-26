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

    console.log('getBase64ImageUrl about to fetch imageUrl: ', imageUrl)
    const response = await fetch(imageUrl)
    console.log('getBase64ImageUrl response.status: ', response.status)

    if (response.status !== 200) {
        console.log('getBase64ImageUrl response will be printed over the next few lines')
        try {
            console.log('response.status: ', response.status)
            console.log('response.statusText: ', response.statusText)
            console.log('response.redirected: ', response.redirected)
            console.log('response.url: ', response.url)
            console.log('response.headers: ', response.headers)
            console.log('response.text: ', response.text())
            console.log('response.json: ', response.json())
            console.log('stringified response: ', JSON.stringify(response))
        } catch (e) {
            console.log('getBase64ImageUrl error trying to print the bad response ', e)
        }
        throw new Error(`getBase64ImageUrl received response.status ${response.status}`)
    }

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
