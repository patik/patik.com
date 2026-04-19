import type { CountryGallery } from '../../photos/utils/types'
import belfast from './belfast'
import countryside from './countryside'
import dublin from './dublin'
import killarney from './killarney'

export const cityGalleries = [dublin, belfast, killarney, countryside]

const countryGallery: CountryGallery = {
    countryId: 'ireland',
    countryName: 'Ireland',
    cloudinaryFolder: '2022\\ Ireland/Dublin',
    title: 'Ireland',
    keywords: ['Ireland', 'Dublin', 'Belfast', 'Killarney', 'Countryside', 'Europe', 'travel'],
}

export default countryGallery
