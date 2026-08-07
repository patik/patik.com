import type { GallerySortDirection } from '@src/photos/utils/getGalleryStaticPaths'
import type { CityGallery, CountryGallery } from '@src/photos/utils/types'

export interface GalleryModule {
    default: CountryGallery
    cityGalleries: CityGallery[]
    sortDirection?: GallerySortDirection
}

/**
 * Verifies that a `src/galleries/*\/index.ts` module exports what the shared photo route expects.
 *
 * `import.meta.glob` can only assert a module's shape at compile time, so without this a malformed
 * gallery surfaces as an unrelated crash deeper in the build with no clue which one caused it.
 */
export default function assertGalleryModule(
    path: string,
    galleryModule: unknown,
): asserts galleryModule is GalleryModule {
    const { default: countryGallery, cityGalleries, sortDirection } = (galleryModule ?? {}) as Partial<GalleryModule>

    if (!countryGallery?.countryId) {
        throw new Error(`${path} must default-export a CountryGallery with a countryId`)
    }

    if (!Array.isArray(cityGalleries) || cityGalleries.length === 0) {
        throw new Error(`${path} must export a non-empty \`cityGalleries\` array`)
    }

    const cityWithoutId = cityGalleries.findIndex((city) => !city?.cityId)

    if (cityWithoutId !== -1) {
        throw new Error(`${path} exports a \`cityGalleries\` entry at index ${cityWithoutId} with no cityId`)
    }

    if (sortDirection !== undefined && sortDirection !== 'asc' && sortDirection !== 'desc') {
        throw new Error(
            `${path} exports \`sortDirection\` of ${JSON.stringify(sortDirection)}; expected 'asc' or 'desc'`,
        )
    }
}
