import { variants } from '@src/photos/utils/animationVariants'
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
                {currentImage && currentImage.resource_type === 'image' ? (
                    <Image
                        src={`https://res.cloudinary.com/${
                            process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
                        }/image/upload/c_scale,${navigation ? 'w_1280' : 'w_1920'}/${currentImage.public_id}.${
                            currentImage.format
                        }`}
                        width={navigation ? 1280 : 1920}
                        height={navigation ? 853 : 1280}
                        priority
                        alt={`${title} image`}
                        onLoadingComplete={() => setLoaded(true)}
                    />
                ) : currentImage ? (
                    // eslint-disable-next-line jsx-a11y/media-has-caption
                    <video
                        src={currentImage.secure_url}
                        controls={true}
                        width={currentImage.width}
                        height={currentImage.height}
                        onCanPlay={() => {
                            // console.log('onCanPlay')
                            setLoaded(true)
                        }}
                    />
                ) : (
                    <p>No photo!</p>
                )}
            </motion.div>
        </AnimatePresence>
    )
}
