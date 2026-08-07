import type { CountryGallery } from '@src/photos/utils/types'
import edinburgh from './edinburgh'
import liverpool from './liverpool'
import london from './london'

export const cityGalleries = [edinburgh, london, liverpool]

const countryGallery: CountryGallery = {
    countryId: 'britain',
    countryName: 'Britain',
    cloudinaryFolder: '2012\\ Britain',
    title: 'Britain',
    keywords: ['United Kingdom', 'Scotland', 'Edinburgh', 'London', 'England', 'Liverpool', 'Europe', 'travel'],
}

export default countryGallery
