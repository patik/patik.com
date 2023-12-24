import countryGallery from '@src/galleries/uzbekistan'
import samarkand from '@src/galleries/uzbekistan/samarkand'
import getGalleryStaticPaths from '@src/photos/pageHelpers/getGalleryStaticPaths'
import getGalleryStaticProps from '@src/photos/pageHelpers/getGalleryStaticProps'
import { getPage } from '@src/photos/pageHelpers/getPage'
import { GetStaticPaths, GetStaticProps } from 'next'

export default getPage(countryGallery, [samarkand])

export const getStaticProps: GetStaticProps = async function (context) {
    return getGalleryStaticProps([samarkand], context)
}

export const getStaticPaths: GetStaticPaths = async function () {
    return getGalleryStaticPaths([samarkand])
}
