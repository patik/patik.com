import Modal from '@src/photos/components/Modal'
import escapeCloudinaryString from '@src/photos/utils/escapeCloudinaryString'
import type { CityGallery, CityGalleryMap, CountryGallery, ImageProps } from '@src/photos/utils/types'
import { useLastViewedPhoto } from '@src/photos/utils/useLastViewedPhoto'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

type Props = {
    gallery: CountryGallery | CityGallery
    cityGalleryMap: CityGalleryMap
    images: ImageProps[]
}

export const GalleryIndexPage: NextPage<Props> = ({ gallery, images, cityGalleryMap }: Props) => {
    const { cloudinaryFolder } = gallery
    const router = useRouter()
    const photoId = Number(router.query.photoId)
    const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()
    const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null)

    useEffect(() => {
        // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
        if (lastViewedPhoto && !photoId && lastViewedPhotoRef.current) {
            lastViewedPhotoRef.current.scrollIntoView({ block: 'center' })
            setLastViewedPhoto(null)
        }
    }, [photoId, lastViewedPhoto, setLastViewedPhoto])

    return (
        <>
            <Head>
                <title>{cloudinaryFolder}</title>
                <meta property="og:image" content="https://nextjsconf-pics.vercel.app/og-image.png" />
                <meta name="twitter:image" content="https://nextjsconf-pics.vercel.app/og-image.png" />
            </Head>
            <main className="mx-auto max-w-[1960px] p-4">
                {photoId >= 0 ? (
                    <Modal
                        images={images}
                        onClose={() => {
                            setLastViewedPhoto(photoId)
                        }}
                        gallery={gallery}
                    />
                ) : null}
                {Object.values(cityGalleryMap).map((cityGallery) => {
                    const { country, city, title } = cityGallery

                    return (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6" key={city}>
                            {images.map(({ id, public_id, format, blurDataUrl }) => (
                                <Link
                                    key={id}
                                    href={`/travel/${country}/photos/${city}/${id}`}
                                    ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
                                    shallow
                                    className="after:content group relative cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                                >
                                    <Image
                                        alt={`${title} photo`}
                                        className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                                        style={{ transform: 'translate3d(0, 0, 0)' }}
                                        placeholder="blur"
                                        blurDataURL={blurDataUrl}
                                        src={`https://res.cloudinary.com/${
                                            process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
                                        }/image/upload/c_scale,w_720/${escapeCloudinaryString(public_id)}.${format}`}
                                        width={720}
                                        height={480}
                                        sizes="(max-width: 640px) 100vw,
                                (max-width: 1280px) 50vw,
                                (max-width: 1536px) 33vw,
                                25vw"
                                    />
                                </Link>
                            ))}
                        </div>
                    )
                })}
            </main>
        </>
    )
}