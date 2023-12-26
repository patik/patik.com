import getImageUrl from '@src/photos/utils/getImageUrl'
import type { ImageProps } from '@src/photos/utils/types'

/**
 * Returns the URL for the unblurred image which we wil pass along to the blurring function
 */
export default function getImageUrlToBeBlurred(image: ImageProps): string {
    const imageUrl =
        image.resource_type === 'video'
            ? getImageUrl(image)
            : `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_jpg,w_8,q_70/${image.public_id}.${image.format}`

    return imageUrl
}
