import BottomNavigation from '@src/photos/components/Lightbox/BottomNavigation'
import Buttons from '@src/photos/components/Lightbox/Buttons'
import MainImage from '@src/photos/components/Lightbox/MainImage'
import { range } from '@src/photos/utils/range'
import type { ImageProps, SharedModalProps } from '@src/photos/utils/types'
import { MotionConfig } from 'motion/react'
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
    const currentImage = images && images.length - 1 >= index ? images[index] : currentPhoto
    const { title } = gallery

    return (
        <MotionConfig
            transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
            }}
        >
            <div className="absolute z-50 top-0 bottom-0 right-0 left-0" {...handlers}>
                <MainImage
                    direction={direction}
                    index={index}
                    currentImage={currentImage}
                    navigation={navigation}
                    title={title}
                    setLoaded={setLoaded}
                    handlers={handlers}
                />
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
                {/* Bottom nav bar */}
                {navigation ? (
                    <div className="bottom-nav-wrapper inset-0 mx-auto flex max-w-7xl items-center justify-center">
                        <BottomNavigation
                            filteredImages={filteredImages}
                            index={index}
                            changePhotoId={changePhotoId}
                            images={images}
                        />
                    </div>
                ) : null}
            </div>
        </MotionConfig>
    )
}
