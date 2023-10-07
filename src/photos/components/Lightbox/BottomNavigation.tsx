import getImageUrl from '@src/photos/utils/getImageUrl'
import type { ImageProps } from '@src/photos/utils/types'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'

export default function BottomNavigation({
    filteredImages,
    index,
    changePhotoId,
    images,
}: {
    filteredImages: ImageProps[] | undefined
    index: number
    changePhotoId: (newVal: number) => void
    images: ImageProps[] | undefined
}) {
    return (
        <motion.div
            initial={false}
            className="bottom-nav-wrapper mx-auto mt-6 mb-6 flex h-14 fixed inset-x-0 bottom-0 z-40 overflow-hidden bg-gradient-to-b from-black/0 to-black/60"
        >
            <AnimatePresence initial={false}>
                {filteredImages && filteredImages?.length > 0
                    ? filteredImages.map((image) => {
                          const { id, resource_type } = image

                          return (
                              <motion.button
                                  initial={{
                                      width: '0%',
                                      x: `${Math.max((index - 1) * -100, 15 * -100)}%`,
                                  }}
                                  animate={{
                                      scale: id === index ? 1.25 : 1,
                                      width: '180px',
                                      x: `${Math.max(index * -100, 15 * -100)}%`,
                                  }}
                                  exit={{ width: '0%' }}
                                  onClick={() => changePhotoId(id)}
                                  key={id}
                                  className={`blur-wrapper ${
                                      id === index ? 'z-20 rounded-md shadow shadow-black/50' : 'z-10'
                                  } ${id === 0 ? 'rounded-l-md' : ''} ${
                                      images && id === images.length - 1 ? 'rounded-r-md' : ''
                                  } relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-none`}
                              >
                                  {resource_type === 'image' ? (
                                      <Image
                                          alt=""
                                          width={180}
                                          height={120}
                                          className={`${
                                              id === index
                                                  ? 'brightness-110 hover:brightness-110'
                                                  : 'brightness-50 contrast-125 hover:brightness-75'
                                          } h-full transform object-cover transition`}
                                          src={getImageUrl(image)}
                                      />
                                  ) : (
                                      <Image
                                          alt=""
                                          width={180}
                                          height={120}
                                          className={`${
                                              id === index
                                                  ? 'brightness-110 hover:brightness-110'
                                                  : 'brightness-50 contrast-125 hover:brightness-75'
                                          } h-full transform object-cover transition`}
                                          src={getImageUrl(image)}
                                      />
                                  )}
                              </motion.button>
                          )
                      })
                    : null}
            </AnimatePresence>
        </motion.div>
    )
}
