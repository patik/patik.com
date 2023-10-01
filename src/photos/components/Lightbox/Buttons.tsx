import {
    ArrowDownTrayIcon,
    ArrowTopRightOnSquareIcon,
    ArrowUturnLeftIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import downloadPhoto from '@src/photos/utils/downloadPhoto'
import type { ImageProps } from '@src/photos/utils/types'

export default function Buttons({
    navigation,
    index,
    changePhotoId,
    images,
    currentImage,
    closeModal,
}: {
    navigation: boolean
    index: number
    changePhotoId: (newVal: number) => void
    images: ImageProps[] | undefined
    currentImage: ImageProps | undefined
    closeModal: () => void
}) {
    return (
        <div className="relative aspect-[3/2] max-h-full w-full">
            {navigation ? (
                <>
                    {index > 0 && (
                        <button
                            className="absolute left-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                            style={{ transform: 'translate3d(0, 0, 0)' }}
                            onClick={() => changePhotoId(index - 1)}
                        >
                            <ChevronLeftIcon className="h-6 w-6" />
                        </button>
                    )}
                    {images && index + 1 < images.length ? (
                        <button
                            className="absolute right-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                            style={{ transform: 'translate3d(0, 0, 0)' }}
                            onClick={() => changePhotoId(index + 1)}
                        >
                            <ChevronRightIcon className="h-6 w-6" />
                        </button>
                    ) : null}
                </>
            ) : null}
            <div className="absolute top-0 right-0 flex items-center gap-2 p-3 text-white">
                {navigation ? (
                    <a
                        href={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${currentImage?.public_id}.${currentImage?.format}`}
                        className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                        target="_blank"
                        title="Open fullsize version"
                        rel="noreferrer"
                    >
                        <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                    </a>
                ) : null}
                <button
                    onClick={() =>
                        downloadPhoto(
                            `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${currentImage?.public_id}.${currentImage?.format}`,
                            `${index}.jpg`
                        )
                    }
                    className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                    title="Download fullsize version"
                >
                    <ArrowDownTrayIcon className="h-5 w-5" />
                </button>
            </div>
            <div className="absolute top-0 left-0 flex items-center gap-2 p-3 text-white">
                <button
                    onClick={() => closeModal()}
                    className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                >
                    {navigation ? <XMarkIcon className="h-5 w-5" /> : <ArrowUturnLeftIcon className="h-5 w-5" />}
                </button>
            </div>
        </div>
    )
}
