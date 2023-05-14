import Carousel from '@src/photos/components/Carousel'
import type { GalleryMeta, ImageProps } from '@src/photos/utils/types'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC } from 'react'

type Props = {
    galleryMeta: GalleryMeta
    currentPhoto: ImageProps
}

export const SinglePhotoPage: FC<Props> = ({
    galleryMeta: { cloudinaryFolder, rootPath, galleryTitle },
    currentPhoto,
}: Props) => {
    const router = useRouter()
    const { photoId } = router.query
    const index = Number(photoId)
    const currentPhotoUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_2560/${currentPhoto.public_id}.${currentPhoto.format}`

    return (
        <>
            <Head>
                <title>{cloudinaryFolder}</title>
                <meta property="og:image" content={currentPhotoUrl} />
                <meta name="twitter:image" content={currentPhotoUrl} />
            </Head>
            <main className="mx-auto max-w-[1960px] p-4">
                <Carousel currentPhoto={currentPhoto} index={index} rootPath={rootPath} galleryTitle={galleryTitle} />
            </main>
        </>
    )
}
