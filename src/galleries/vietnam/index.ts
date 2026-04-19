import type { CountryGallery } from '../../photos/utils/types'
import haLongBay from './ha-long-bay'
import hanoi from './hanoi'
import hoChiMinhCity from './ho-chi-minh-city'
import hoiAn from './hoi-an'
import phuQuoc from './phu-quoc'

export const cityGalleries = [hanoi, haLongBay, hoiAn, phuQuoc, hoChiMinhCity]

const countryGallery: CountryGallery = {
    countryId: 'vietnam',
    countryName: 'Vietnam',
    cloudinaryFolder: '2017\\ Vietnam/Hanoi',
    title: 'Vietnam',
    keywords: [
        'Vietnam',
        'Hanoi',
        'Ha Long Bay',
        'Hoi An',
        'Phu Quoc',
        'Ho Chi Minh City',
        'Saigon',
        'Southeast Asia',
        'Asia',
        'travel',
    ],
}

export default countryGallery
