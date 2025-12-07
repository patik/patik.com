import escapeCloudinaryString from '@src/photos/utils/escapeCloudinaryString'
import type { ImageProps } from '@src/photos/utils/types'

// Use import.meta.env for Astro, fallback to process.env for build
const getCloudName = () => {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
        return import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME
    }
    return process.env.PUBLIC_CLOUDINARY_CLOUD_NAME
}

export default function getImageUrl(image: ImageProps, customWidth?: number): string {
    const { public_id, format, width, secure_url, resource_type } = image

    if (resource_type === 'video') {
        return secure_url.replace(new RegExp(`\\.\\w+$`), '.jpg')
    }

    return `https://res.cloudinary.com/${getCloudName()}/image/upload/c_scale,w_${
        customWidth ?? width
    }/f_auto,q_auto:good/${escapeCloudinaryString(public_id)}.${format}`
}
