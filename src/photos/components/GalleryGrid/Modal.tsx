import { Dialog, DialogBackdrop } from '@headlessui/react'
import Lightbox from '@src/photos/components/Lightbox'
import { getChangePhotoId } from '@src/photos/utils/getChangePhotoId'
import type { CityGallery, ImageProps } from '@src/photos/utils/types'
import { useKeyHandlers } from '@src/photos/utils/useKeyHandlers'
import { useLastViewedPhoto } from '@src/photos/utils/useLastViewedPhoto'
import { motion } from 'motion/react'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

export default function Modal({
    images,
    onClose,
    gallery,
}: {
    images: ImageProps[]
    onClose?: () => void
    gallery: CityGallery
}) {
    const overlayRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const { photoId } = router.query
    const index = Number(photoId)
    const [direction, setDirection] = useState(1)
    const [currIndex, setCurrIndex] = useState(index)
    const { countryId, cityId } = gallery
    const [, setLastViewedPhoto] = useLastViewedPhoto()

    function handleClose() {
        router.push(`/travel/${countryId}/photos/`, undefined, { shallow: true })

        if (onClose) {
            onClose()
        }
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

    useKeyHandlers({ closeModal: handleClose, images, index, changePhotoId })

    return (
        <Dialog
            static
            open={true}
            onClose={handleClose}
            initialFocus={overlayRef}
            className="fixed inset-0 z-10 flex items-center justify-center"
        >
            <DialogBackdrop
                ref={overlayRef}
                as={motion.div}
                key="backdrop"
                className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            />
            <Lightbox
                index={currIndex}
                direction={direction}
                images={images}
                changePhotoId={changePhotoId}
                closeModal={handleClose}
                navigation
                gallery={gallery}
            />
        </Dialog>
    )
}
