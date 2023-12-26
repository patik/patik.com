import getImageUrlToBeBlurred from '@src/photos/utils/getImageUrlToBeBlurred'
import type { ImageProps } from '@src/photos/utils/types'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import imagemin from 'imagemin'
import imageminJpegtran from 'imagemin-jpegtran'
import path from 'path'

const folderPath = path.join(__dirname, '../../../../../../tmp')

if (!existsSync(folderPath)) {
    console.log('[getBase64ImageUrl] creating cache folder ', folderPath)
    mkdirSync(folderPath)
}

console.log('[getBase64ImageUrl] folderPath ', folderPath)

export default async function getBase64ImageUrl(image: ImageProps): Promise<string> {
    console.log('[getBase64ImageUrl] public_id: ', image.public_id)
    const filePath = path.join(folderPath, image.public_id.replace(/\W/g, '_'))
    console.log('[getBase64ImageUrl] filePath: ', filePath)

    if (existsSync(filePath)) {
        console.log('[getBase64ImageUrl] returning cached results from ', filePath)
        return readFileSync(filePath, 'utf8')
    }

    const imageUrl = getImageUrlToBeBlurred(image)

    console.log('[getBase64ImageUrl] needs to fetch imageUrl: ', imageUrl)
    const response = await fetch(imageUrl, {
        cache: 'force-cache',
        headers: {
            'Cache-Control': 'force-cache',
            pragma: 'force-cache',
        },
    })
    // console.log('[getBase64ImageUrl] response.status: ', response.status)

    if (response.status !== 200) {
        console.log('[getBase64ImageUrl] response will be printed over the next few lines; tried to fetch ', imageUrl)
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
            console.log('[getBase64ImageUrl] error trying to print the bad response ', e)
        }
        throw new Error(`[getBase64ImageUrl] received response.status ${response.status}`)
    }

    const buffer = await response.arrayBuffer()
    const minified = await imagemin.buffer(Buffer.from(buffer), {
        plugins: [imageminJpegtran()],
    })

    const url = `data:image/jpeg;base64,${Buffer.from(minified).toString('base64')}`
    console.log('[getBase64ImageUrl] caching with image.public_id ', image.public_id)

    console.log(`[getBase64ImageUrl] writing ${url.length} chars to filePath: ${filePath}`)
    writeFileSync(filePath, url, 'utf8')

    // if (image.resource_type === 'video') {
    //     console.log('---------------------')
    //     console.log('imageUrl: ', imageUrl)
    //     console.log('secure_url: ', image.secure_url)
    //     console.log('blurred: ', Buffer.from(minified).toString('base64'))
    // }

    return url
}
