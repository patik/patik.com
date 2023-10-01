import Carousel from '@src/photos/components/SinglePhotoPage/Carousel'
import { getPhotoIdFromRouter } from '@src/photos/pageHelpers/getPhotoIdFromRouter'
import type { CityGallery, ImageProps } from '@src/photos/utils/types'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC } from 'react'

type Props = {
    cityGallery: CityGallery
    currentPhoto: ImageProps
    images: ImageProps[]
}

export const SinglePhotoPage: FC<Props> = ({ cityGallery, currentPhoto, images }: Props) => {
    const { cloudinaryFolder } = cityGallery
    const router = useRouter()
    const index = getPhotoIdFromRouter(router.query)
    const currentPhotoUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_2560/${currentPhoto.public_id}.${currentPhoto.format}`

    if (index === undefined) {
        return null
    }

    return (
        <>
            <Head>
                <title>{cloudinaryFolder}</title>
                <meta property="og:image" content={currentPhotoUrl} />
                <meta name="twitter:image" content={currentPhotoUrl} />
            </Head>
            <main className="mx-auto max-w-[1960px] p-4">
                <Carousel currentPhoto={currentPhoto} index={index} cityGallery={cityGallery} images={images} />
            </main>
        </>
    )
}
