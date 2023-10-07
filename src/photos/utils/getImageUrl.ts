import escapeCloudinaryString from '@src/photos/utils/escapeCloudinaryString'
import { ImageProps } from '@src/photos/utils/types'

export default function getImageUrl(image: ImageProps, customWidth?: number): string {
    const { public_id, format, width, secure_url, resource_type } = image

    if (resource_type === 'video') {
        return secure_url.replace(new RegExp(`\\.\\w+$`), '.jpg')
    }

    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_${
        customWidth ?? width
    }/f_auto,q_auto:good/${escapeCloudinaryString(public_id)}.${format}`
}
