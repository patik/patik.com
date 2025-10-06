import getImageUrl from '@src/photos/utils/getImageUrl'
import type { ImageProps } from '@src/photos/utils/types'
import { AnimatePresence, motion } from 'motion/react'
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
            className="mx-auto mt-6 mb-6 flex h-14 fixed inset-x-0 bottom-0 z-40 bg-gradient-to-b from-black/0 to-black/60"
        >
            <AnimatePresence initial={false}>
                {filteredImages && filteredImages?.length > 0
                    ? filteredImages.map((image) => {
                          const { id } = image

                          const buttonClasses = [
                              'blur-wrapper',
                              'relative',
                              'inline-block',
                              'w-full',
                              'shrink-0',
                              'transform-gpu',
                              'overflow-hidden',
                              'focus:outline-none',
                              'p-0',
                          ]

                          if (id === index) {
                              buttonClasses.push('z-20', 'rounded-md', 'shadow', 'shadow-black/50')
                          } else {
                              buttonClasses.push('z-10')
                          }

                          if (id === 0) {
                              buttonClasses.push('rounded-l-md')
                          }

                          if (images && id === images.length - 1) {
                              buttonClasses.push('rounded-r-md')
                          }

                          const imageClasses = ['h-full', 'transform', 'object-cover', 'transition']

                          if (id === index) {
                              imageClasses.push('brightness-110', 'hover:brightness-110')
                          } else {
                              imageClasses.push('brightness-50', 'contrast-125', 'hover:brightness-75')
                          }

                          return (
                              <motion.button
                                  initial={{
                                      width: '0%',
                                      x: `${Math.max((index - 1) * -100, 15 * -100)}%`,
                                  }}
                                  animate={{
                                      scale: id === index ? 1.25 : 1,
                                      width: '90px',
                                      x: `${Math.max(index * -100, 15 * -100)}%`,
                                  }}
                                  exit={{ width: '0%' }}
                                  onClick={() => changePhotoId(id)}
                                  key={id}
                                  className={buttonClasses.join(' ')}
                              >
                                  <Image
                                      alt=""
                                      width={90}
                                      height={120}
                                      className={imageClasses.join(' ')}
                                      src={getImageUrl(image, 180)}
                                  />
                              </motion.button>
                          )
                      })
                    : null}
            </AnimatePresence>
        </motion.div>
    )
}
