import { variants } from '@src/photos/utils/animationVariants'
import getImageUrl from '@src/photos/utils/getImageUrl'
import type { ImageProps } from '@src/photos/utils/types'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'

export default function MainImage({
    direction,
    index,
    currentImage,
    navigation,
    title,
    setLoaded,
}: {
    direction: number | undefined
    index: number
    currentImage: ImageProps | undefined
    navigation?: boolean
    title: string
    setLoaded: (val: boolean) => void
}) {
    if (!currentImage) {
        return <p>No photo!</p>
    }

    const { width, height } = currentImage
    const src = getImageUrl({ ...currentImage, width: navigation ? 1280 : 1920 })
    const isPortrait = height > width

    return (
        <AnimatePresence initial={false} custom={direction}>
            <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="image-wrapper flex justify-center"
                style={{
                    marginBottom: '100px',
                    height: 'calc(100vh - 100px)',
                }}
            >
                {currentImage.resource_type === 'image' ? (
                    <Image
                        src={src}
                        width={Number(height)}
                        height={Number(width)}
                        priority
                        alt={`${title} image`}
                        onLoadingComplete={() => setLoaded(true)}
                        style={{
                            height: isPortrait ? 'calc(100vh - 80px)' : 'auto',
                            maxHeight: isPortrait ? 'calc(100vh - 100px)' : 'auto',
                            width: isPortrait ? 'auto' : '100vw',
                            maxWidth: isPortrait ? 'auto' : '100vw',
                            objectFit: 'contain',
                        }}
                    />
                ) : (
                    // eslint-disable-next-line jsx-a11y/media-has-caption
                    <video
                        controls={true}
                        width={currentImage.width}
                        height={currentImage.height}
                        onCanPlay={() => {
                            console.log('onCanPlay')
                            setLoaded(true)
                        }}
                    >
                        <source src={currentImage.secure_url} type="video/mp4" />
                    </video>
                )}
            </motion.div>
        </AnimatePresence>
    )
}
