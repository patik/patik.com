import escapeCloudinaryString from '@src/photos/utils/escapeCloudinaryString'
import { ImageProps } from '@src/photos/utils/types'

export default function getImageUrl({
    public_id,
    format,
    width,
}: {
    public_id: ImageProps['public_id']
    format: ImageProps['format']
    width: number
}): string {
    return `https://res.cloudinary.com/${
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    }/image/upload/c_scale,w_${width}/${escapeCloudinaryString(public_id)}.${format}`
}
