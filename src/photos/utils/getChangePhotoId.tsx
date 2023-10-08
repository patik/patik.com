import { NextRouter } from 'next/router'

export function getChangePhotoId({
    setLastViewedPhoto,
    setDirection,
    setCurIndex,
    router,
    index,
    countryId,
    cityId,
}: {
    setLastViewedPhoto: (newVal: number) => void
    setDirection: (newVal: number) => void
    setCurIndex?: (newVal: number) => void
    router: NextRouter
    index: number
    countryId: string
    cityId: string
}): (newVal: number) => void {
    return function changePhotoId(newVal: number): void {
        setLastViewedPhoto(newVal)

        if (newVal > index) {
            setDirection(1)
        } else {
            setDirection(-1)
        }

        if (setCurIndex) {
            setCurIndex(newVal)
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
