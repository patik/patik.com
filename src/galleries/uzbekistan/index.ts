import type { CountryGallery } from '../../photos/utils/types'
import bukhara from './bukhara'
import khiva from './khiva'
import samarkand from './samarkand'

export const cityGalleries = [khiva, samarkand, bukhara]

const countryGallery: CountryGallery = {
    countryId: 'uzbekistan',
    countryName: 'Uzbekistan',
    cloudinaryFolder: 'Uzbekistan\\ 2023/Samarkand',
    title: 'Uzbekistan',
    keywords: [
        'Uzbekistan',
        'Tashkent',
        'Bukhara',
        'Samarkand',
        'Khiva',
        'Asia',
        'Central Asia',
        'Silk road',
        'travel',
    ],
}

export default countryGallery
