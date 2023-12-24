import Lightbox from '@src/photos/components/Lightbox'
import { getChangePhotoId } from '@src/photos/utils/getChangePhotoId'
import type { CityGallery, ImageProps } from '@src/photos/utils/types'
import { useKeyHandlers } from '@src/photos/utils/useKeyHandlers'
import { useLastViewedPhoto } from '@src/photos/utils/useLastViewedPhoto'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Carousel({
    index,
    currentPhoto,
    cityGallery,
    images,
}: {
    index: number
    currentPhoto: ImageProps
    cityGallery: CityGallery
    images?: ImageProps[]
}) {
    const router = useRouter()
    const [, setLastViewedPhoto] = useLastViewedPhoto()
    const { countryId, cityId } = cityGallery
    const [direction, setDirection] = useState(1)
    const [currIndex, setCurrIndex] = useState(index)

    function closeModal() {
        setLastViewedPhoto(currentPhoto.id)
        router.push(`/travel/${countryId}/photos/`, undefined, { shallow: true })
    }

    const changePhotoId = getChangePhotoId({
        setLastViewedPhoto,
        setDirection,
        setCurrIndex,
        router,
        index,
        countryId,
        cityId,
    })

    useKeyHandlers({ closeModal, images, index, changePhotoId })

    return (
        <div className="carousel-wrapper fixed inset-0 flex items-center justify-center">
            <button className="absolute inset-0 z-30 cursor-default bg-black backdrop-blur-2xl" onClick={closeModal}>
                {currentPhoto.blurDataUrl ? (
                    <Image
                        src={currentPhoto.blurDataUrl}
                        className={`pointer-events-none h-full w-full${
                            currentPhoto.resource_type === 'video' ? ' blur-2xl' : ''
                        }`}
                        alt=""
                        fill
                        priority={true}
                    />
                ) : null}
            </button>
            <Lightbox
                index={currIndex}
                images={images}
                direction={direction}
                changePhotoId={changePhotoId}
                currentPhoto={currentPhoto}
                closeModal={closeModal}
                navigation
                gallery={cityGallery}
            />
        </div>
    )
}
