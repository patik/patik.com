import { Dialog } from '@headlessui/react'
import Lightbox from '@src/photos/components/Lightbox'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import useKeypress from 'react-use-keypress'
import type { CityGallery, ImageProps } from '../utils/types'

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
    const [curIndex, setCurIndex] = useState(index)
    const { country, city } = gallery

    function handleClose() {
        router.push(`/travel/${country}/photos/`, undefined, { shallow: true })
        if (onClose) {
            onClose()
        }
    }

    function changePhotoId(newVal: number) {
        console.log('changePhotoId ', newVal)
        if (newVal > index) {
            setDirection(1)
        } else {
            setDirection(-1)
        }
        setCurIndex(newVal)
        router.push(
            {
                query: { photoId: newVal },
            },
            `/travel/${country}/photos/${city}/${newVal}`,
            { shallow: true }
        )
    }

    useKeypress('ArrowRight', () => {
        if (index + 1 < images.length) {
            changePhotoId(index + 1)
        }
    })

    useKeypress('ArrowLeft', () => {
        if (index > 0) {
            changePhotoId(index - 1)
        }
    })

    return (
        <Dialog
            static
            open={true}
            onClose={handleClose}
            initialFocus={overlayRef}
            className="fixed inset-0 z-10 flex items-center justify-center"
        >
            <Dialog.Overlay
                ref={overlayRef}
                as={motion.div}
                key="backdrop"
                className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            />
            <Lightbox
                index={curIndex}
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
