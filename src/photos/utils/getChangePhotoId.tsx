import { NextRouter } from 'next/router'

export function getChangePhotoId({
    setLastViewedPhoto,
    setDirection,
    setCurrIndex,
    router,
    index,
    countryId,
    cityId,
}: {
    setLastViewedPhoto: (newVal: number) => void
    setDirection: (newVal: number) => void
    setCurrIndex: (newVal: number) => void
    router: NextRouter
    index: number
    countryId: string
    cityId: string
}): (newVal: number) => void {
    return function changePhotoId(newVal: number): void {
        setLastViewedPhoto(newVal)
        setCurrIndex(newVal)

        if (newVal > index) {
            setDirection(1)
        } else {
            setDirection(-1)
        }

        const pathname = `/travel/${countryId}/photos/${cityId}/${newVal}`

        router.push(
            {
                pathname,
                query: { photoId: newVal },
            },
            pathname,
            { shallow: true }
        )
    }
}
