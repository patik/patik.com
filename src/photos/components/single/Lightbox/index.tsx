import BottomNavigation from '@src/photos/components/single/Lightbox/BottomNavigation'
import Buttons from '@src/photos/components/single/Lightbox/Buttons'
import MainImage from '@src/photos/components/single/Lightbox/MainImage'
import { range } from '@src/photos/utils/range'
import type { ImageProps, SharedModalProps } from '@src/photos/utils/types'
import { MotionConfig } from 'framer-motion'
import { useState } from 'react'
import { useSwipeable } from 'react-swipeable'

export default function Lightbox({
    index,
    images,
    changePhotoId,
    closeModal,
    navigation,
    currentPhoto,
    direction,
    gallery,
}: SharedModalProps) {
    const [loaded, setLoaded] = useState(false)
    const filteredImages = images?.filter((img: ImageProps) => range(index - 15, index + 15).includes(img.id))
    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (images?.length && images?.length > 0 && index < images.length - 1) {
                changePhotoId(index + 1)
            }
        },
        onSwipedRight: () => {
            if (index > 0) {
                changePhotoId(index - 1)
            }
        },
        trackMouse: true,
    })
    const currentImage = images ? images[index] : currentPhoto
    const { title } = gallery
    // console.log('<SharedModal> ', { images, index, navigation, loaded })

    return (
        <MotionConfig
            transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
            }}
        >
            <div
                className="relative z-50 flex aspect-[3/2] w-full max-w-7xl items-center wide:h-full xl:taller-than-854:h-auto"
                {...handlers}
            >
                {/* Main image */}
                <div className="w-full overflow-hidden">
                    <div className="relative flex aspect-[3/2] items-center justify-center">
                        <MainImage
                            direction={direction}
                            index={index}
                            currentImage={currentImage}
                            navigation={navigation}
                            title={title}
                            setLoaded={setLoaded}
                        />
                    </div>
                </div>

                {/* Buttons + bottom nav bar */}
                <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
                    {/* Buttons */}
                    {loaded ? (
                        <Buttons
                            navigation={navigation}
                            index={index}
                            changePhotoId={changePhotoId}
                            images={images}
                            currentImage={currentImage}
                            closeModal={closeModal}
                        />
                    ) : null}
                    {/* Bottom Nav bar */}
                    {navigation ? (
                        <BottomNavigation
                            filteredImages={filteredImages}
                            index={index}
                            changePhotoId={changePhotoId}
                            images={images}
                        />
                    ) : null}
                </div>
            </div>
        </MotionConfig>
    )
}
