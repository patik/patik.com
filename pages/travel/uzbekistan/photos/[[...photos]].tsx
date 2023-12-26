import countryGallery from '@src/galleries/uzbekistan'
import samarkand from '@src/galleries/uzbekistan/samarkand'
import getGalleryStaticPaths from '@src/photos/pageHelpers/getGalleryStaticPaths'
import getGalleryStaticProps from '@src/photos/pageHelpers/getGalleryStaticProps'
import { getPage } from '@src/photos/pageHelpers/getPage'
import { GetStaticPaths, GetStaticProps } from 'next'

export default getPage(countryGallery, [samarkand])

export const getStaticProps: GetStaticProps = async function (context) {
    const result = getGalleryStaticProps([samarkand], context)
    console.log('[getStaticProps] finished calling its getter')
    return result
}

export const getStaticPaths: GetStaticPaths = async function () {
    const result = getGalleryStaticPaths([samarkand])
    console.log('[getStaticPaths] finished calling its getter')
    return result
}
