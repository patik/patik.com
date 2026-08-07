import fetchFolderFromAssetProvider from '@src/photos/utils/fetchFolderFromAssetProvider'
import type { CityGallery, CloundinaryResource, ImageProps } from '@src/photos/utils/types'

export interface GalleryPageProps {
    images: ImageProps[]
    currentPhoto: ImageProps | null
    cityId: string | null
}

export type GallerySortDirection = 'asc' | 'desc'

export interface GalleryPath {
    params: { photos: string | undefined }
    props: GalleryPageProps
}

function toImageProps(resource: CloundinaryResource, index: number): ImageProps {
    return {
        id: index,
        height: resource.height,
        width: resource.width,
        public_id: resource.public_id,
        format: resource.format,
        secure_url: resource.secure_url,
        resource_type: resource.resource_type,
    }
}

/**
 * Builds every route for one country's photo gallery, for use in a
 * `[...photos].astro` page's `getStaticPaths()`:
 *
 * - `photos/` — grid of every city's photos
 * - `photos/<n>` — lightbox for photo `n` at the country level
 * - `photos/<city>/` — grid for one city
 * - `photos/<city>/<n>` — lightbox for photo `n` within that city
 */
export default async function getGalleryStaticPaths({
    cityGalleries,
    sortDirection = 'asc',
}: {
    cityGalleries: CityGallery[]
    sortDirection?: GallerySortDirection
}): Promise<GalleryPath[]> {
    const paths: GalleryPath[] = []
    const cityImagesMap: Record<string, ImageProps[]> = {}

    await Promise.all(
        cityGalleries.map(async (city) => {
            try {
                const results = await fetchFolderFromAssetProvider(city.cloudinaryFolder, sortDirection)
                cityImagesMap[city.cityId] = results.resources.map(toImageProps)
            } catch (e) {
                console.error(`[getGalleryStaticPaths] Error fetching ${city.cityId}:`, e)
                cityImagesMap[city.cityId] = []
            }
        }),
    )

    // Concatenate in cityGalleries order so country-level indices are deterministic across builds.
    const allImages = cityGalleries
        .flatMap((city) => cityImagesMap[city.cityId] ?? [])
        .map((img, i) => ({ ...img, id: i }))

    // Country gallery index: photos/
    paths.push({
        params: { photos: undefined },
        props: { images: allImages, currentPhoto: null, cityId: null },
    })

    // Individual photos at the country level: photos/0, photos/1, etc.
    for (let i = 0; i < allImages.length; i++) {
        paths.push({
            params: { photos: `${i}` },
            props: { images: allImages, currentPhoto: allImages[i], cityId: null },
        })
    }

    for (const city of cityGalleries) {
        const cityImages = cityImagesMap[city.cityId] ?? []

        // City index: photos/<city>/
        paths.push({
            params: { photos: city.cityId },
            props: { images: cityImages, currentPhoto: null, cityId: city.cityId },
        })

        // Individual photos within a city: photos/<city>/0, etc.
        for (let i = 0; i < cityImages.length; i++) {
            paths.push({
                params: { photos: `${city.cityId}/${i}` },
                props: { images: cityImages, currentPhoto: cityImages[i], cityId: city.cityId },
            })
        }
    }

    return paths
}
