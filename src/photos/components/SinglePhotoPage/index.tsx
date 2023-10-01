import Carousel from '@src/photos/components/SinglePhotoPage/Carousel'
import { getPhotoIdFromRouter } from '@src/photos/pageHelpers/getPhotoIdFromRouter'
import getImageUrl from '@src/photos/utils/getImageUrl'
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

    if (index === undefined) {
        return null
    }

    const { public_id, format } = currentPhoto
    const currentPhotoUrl = getImageUrl({ width: 2560, public_id, format })

    return (
        <>
            <Head>
                <title>{cloudinaryFolder}</title>
                <meta property="og:image" content={currentPhotoUrl} />
                <meta name="twitter:image" content={currentPhotoUrl} />
            </Head>
            <div>
                <Carousel currentPhoto={currentPhoto} index={index} cityGallery={cityGallery} images={images} />
            </div>
        </>
    )
}
