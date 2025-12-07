import { ParsedUrlQuery } from 'querystring'

export function getPhotoIdFromRouter(params?: ParsedUrlQuery | undefined): number | undefined {
    if (!params) {
        return
    }

    return params?.photos && params.photos.length > 1 ? Number(params.photos[1]) : undefined
}
