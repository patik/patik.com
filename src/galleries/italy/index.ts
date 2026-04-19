import type { CountryGallery } from '../../photos/utils/types'
import florence from './florence'
import venice from './venice'
import verona from './verona'

export const cityGalleries = [florence, verona, venice]

const countryGallery: CountryGallery = {
    countryId: 'italy',
    countryName: 'Italy',
    cloudinaryFolder: '2018\\ Italy/Florence',
    title: 'Italy',
    keywords: ['Italy', 'Florence', 'Verona', 'Venice', 'Europe', 'travel'],
}

export default countryGallery
