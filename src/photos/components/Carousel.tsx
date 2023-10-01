import Image from 'next/image'
import { useRouter } from 'next/router'
import useKeypress from 'react-use-keypress'
import type { CityGallery, ImageProps } from '../utils/types'
import { useLastViewedPhoto } from '../utils/useLastViewedPhoto'
import Lightbox from './Lightbox'

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
    const { country } = cityGallery

    function closeModal() {
        setLastViewedPhoto(currentPhoto.id)
        router.push(`/travel/${country}/photos/`, undefined, { shallow: true })
    }

    function changePhotoId(newVal: number) {
        console.log('changePhotoId ', currentPhoto.id, newVal)
        setLastViewedPhoto(newVal)
        router.push(`/travel/${country}/photos/${cityGallery.city}/${newVal}`, undefined, { shallow: true })
        return newVal
    }

    useKeypress('Escape', () => {
        closeModal()
    })

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <button className="absolute inset-0 z-30 cursor-default bg-black backdrop-blur-2xl" onClick={closeModal}>
                <Image
                    src={currentPhoto.blurDataUrl ?? ''}
                    className="pointer-events-none h-full w-full"
                    alt="blurred background"
                    fill
                    priority={true}
                />
            </button>
            <Lightbox
                index={index}
                images={images}
                changePhotoId={changePhotoId}
                currentPhoto={currentPhoto}
                closeModal={closeModal}
                navigation // ={false}
                gallery={cityGallery}
            />
        </div>
    )
}
