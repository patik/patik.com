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

    const { public_id, format } = currentImage
    const src = getImageUrl({ width: navigation ? 1280 : 1920, public_id, format })

    return (
        <AnimatePresence initial={false} custom={direction}>
            <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute"
            >
                {currentImage.resource_type === 'image' ? (
                    <Image
                        src={src}
                        width={navigation ? 1280 : 1920}
                        height={navigation ? 853 : 1280}
                        priority
                        alt={`${title} image`}
                        onLoadingComplete={() => setLoaded(true)}
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
