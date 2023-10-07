import countryGallery from '@src/galleries/uzbekistan'
import cityGalleryMap from '@src/galleries/uzbekistan/samarkand'
import getGalleryStaticPaths from '@src/photos/pageHelpers/getGalleryStaticPaths'
import getGalleryStaticProps from '@src/photos/pageHelpers/getGalleryStaticProps'
import { getPage } from '@src/photos/pageHelpers/getPage'
import { GetStaticPaths, GetStaticProps } from 'next'

export default getPage(countryGallery, cityGalleryMap)

export const getStaticProps: GetStaticProps = async function (context) {
    return getGalleryStaticProps(Object.values(cityGalleryMap), context)
}

export const getStaticPaths: GetStaticPaths = async function () {
    return getGalleryStaticPaths(Object.values(cityGalleryMap))
}
