import type { CountryGallery } from '../../photos/utils/types'
import mostar from './mostar'
import sarajevo from './sarajevo'

export const cityGalleries = [sarajevo, mostar]

const countryGallery: CountryGallery = {
    countryId: 'bosnia',
    countryName: 'Bosnia and Herzegovina',
    cloudinaryFolder: '2024\\ Bosnia/Sarajevo',
    title: 'Bosnia',
    keywords: ['Bosnia and Herzegovina', 'Bosnia', 'Sarajevo', 'Mostar', 'Balkans', 'Europe', 'travel'],
}

export default countryGallery
