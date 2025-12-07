import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useRef } from 'react'
import { getPhotoIdFromRouter } from '../../pageHelpers/getPhotoIdFromRouter'
import getImageUrl from '../../utils/getImageUrl'
import type { CityGallery, CountryGallery, ImageProps } from '../../utils/types'
import { useLastViewedPhoto } from '../../utils/useLastViewedPhoto'
import Modal from './Modal'

type Props = {
    gallery: CountryGallery | CityGallery
    cityId?: CityGallery['cityId']
    cityGalleries: CityGallery[]
    images: ImageProps[]
}

const GalleryGrid = ({ gallery, images, cityId, cityGalleries }: Props) => {
    const { cloudinaryFolder } = gallery
    const router = useRouter()
    const photoId = getPhotoIdFromRouter(router.query)
    const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()
    const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null)
    const isCityGallery = 'cityId' in gallery

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
                {images.length > 0 ? (
                    <>
                        <meta property="og:image" content={getImageUrl(images[0])} />
                        <meta name="twitter:image" content={getImageUrl(images[0])} />
                    </>
                ) : null}
            </Head>
            <div>
                {typeof photoId === 'number' && cityId && isCityGallery ? (
                    <Modal
                        images={images}
                        onClose={() => {
                            setLastViewedPhoto(photoId)
                        }}
                        gallery={gallery}
                    />
                ) : null}
                {cityGalleries.map(({ countryId: country, cityId: city, title }) => (
                    <Fragment key={city}>
                        <h2>{isCityGallery ? title : <a href={`./${city}`}>{title}</a>}</h2>
                        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 auto-rows-fr gap-4">
                            {images.map((image, i) => {
                                const { id, blurDataUrl, resource_type } = image

                                return (
                                    <a
                                        key={id}
                                        href={`/travel/${country}/photos/${city}/${id}`}
                                        ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
                                        className="after:content group relative cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                                    >
                                        <Image
                                            alt={`${title} ${resource_type}`}
                                            className="blurred-photo transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                                            style={{
                                                transform: 'translate3d(0, 0, 0)',
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                            priority={i < 10}
                                            placeholder="blur"
                                            blurDataURL={blurDataUrl}
                                            src={getImageUrl(image, 720)}
                                            width={720}
                                            height={480}
                                            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
                                        />
                                    </a>
                                )
                            })}
                        </div>
                    </Fragment>
                ))}
            </div>
        </>
    )
}

export default GalleryGrid
