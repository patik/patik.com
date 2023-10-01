import Modal from '@src/photos/components/Modal'
import escapeCloudinaryString from '@src/photos/utils/escapeCloudinaryString'
import { getPhotoIdFromRouter } from '@src/photos/pageHelpers/getPhotoIdFromRouter'
import type { CityGallery, CityGalleryMap, CountryGallery, ImageProps } from '@src/photos/utils/types'
import { useLastViewedPhoto } from '@src/photos/utils/useLastViewedPhoto'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useRef } from 'react'

type Props = {
    gallery: CountryGallery | CityGallery
    city?: CityGallery['city']
    cityGalleryMap: CityGalleryMap
    images: ImageProps[]
}

export const GalleryIndexPage: NextPage<Props> = ({ gallery, images, city, cityGalleryMap }: Props) => {
    const { cloudinaryFolder } = gallery
    const router = useRouter()
    const photoId = getPhotoIdFromRouter(router.query)
    const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()
    const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null)

    useEffect(() => {
        // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
        if (lastViewedPhoto && !photoId && lastViewedPhotoRef.current) {
            lastViewedPhotoRef.current.scrollIntoView({ block: 'center' })
            setLastViewedPhoto(null)
        }
    }, [photoId, lastViewedPhoto, setLastViewedPhoto])
    console.log('[GalleryIndexPage] ', { photoId, images })

    return (
        <>
            <Head>
                <title>{cloudinaryFolder}</title>
                <meta property="og:image" content="https://nextjsconf-pics.vercel.app/og-image.png" />
                <meta name="twitter:image" content="https://nextjsconf-pics.vercel.app/og-image.png" />
            </Head>
            <main className="mx-auto max-w-[1960px] p-4">
                {typeof photoId === 'number' && city && 'city' in gallery ? (
                    <Modal
                        images={images}
                        onClose={() => {
                            setLastViewedPhoto(photoId)
                        }}
                        gallery={gallery}
                    />
                ) : null}
                {Object.values(cityGalleryMap).map(({ country, city, title }) => (
                    <Fragment key={city}>
                        <h2>{title}</h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {images.map(({ id, public_id, format, blurDataUrl, resource_type, secure_url }) => (
                                <Link
                                    key={id}
                                    href={`/travel/${country}/photos/${city}/${id}`}
                                    ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
                                    shallow
                                    className="after:content group relative cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                                >
                                    {resource_type === 'video' ? (
                                        <Image
                                            alt={`${title} video`}
                                            className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                                            style={{ transform: 'translate3d(0, 0, 0)' }}
                                            placeholder="blur"
                                            blurDataURL={blurDataUrl}
                                            src={secure_url.replace(new RegExp(`\\.\\w+$`), '.jpg')}
                                            width={720}
                                            height={480}
                                            sizes="(max-width: 640px) 100vw,
                                        (max-width: 1280px) 50vw,
                                (max-width: 1536px) 33vw,
                                25vw"
                                        />
                                    ) : (
                                        <Image
                                            alt={`${title} photo`}
                                            className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                                            style={{ transform: 'translate3d(0, 0, 0)' }}
                                            placeholder="blur"
                                            blurDataURL={blurDataUrl}
                                            src={`https://res.cloudinary.com/${
                                                process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
                                            }/image/upload/c_scale,w_720/${escapeCloudinaryString(
                                                public_id
                                            )}.${format}`}
                                            width={720}
                                            height={480}
                                            sizes="(max-width: 640px) 100vw,
                                        (max-width: 1280px) 50vw,
                                (max-width: 1536px) 33vw,
                                25vw"
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>
                    </Fragment>
                ))}
            </main>
        </>
    )
}
