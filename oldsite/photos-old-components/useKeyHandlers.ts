import type { ImageProps } from '@src/photos/utils/types'
import useKeypress from 'react-use-keypress'

export function useKeyHandlers({
    closeModal,
    images,
    index,
    changePhotoId,
}: {
    closeModal: () => void
    images: ImageProps[] | undefined
    index: number
    changePhotoId: (newVal: number) => void
}) {
    useKeypress('Escape', () => {
        closeModal()
    })

    useKeypress('ArrowRight', () => {
        if (images && index + 1 < images.length) {
            changePhotoId(index + 1)
        }
    })

    useKeypress('ArrowLeft', () => {
        if (images && index > 0) {
            changePhotoId(index - 1)
        }
    })
}
