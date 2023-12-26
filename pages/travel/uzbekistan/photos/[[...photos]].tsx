import countryGallery from '@src/galleries/uzbekistan'
import samarkand from '@src/galleries/uzbekistan/samarkand'
import getGalleryStaticPaths from '@src/photos/pageHelpers/getGalleryStaticPaths'
import getGalleryStaticProps from '@src/photos/pageHelpers/getGalleryStaticProps'
import { getPage } from '@src/photos/pageHelpers/getPage'
import cloudinary from '@src/photos/utils/cloudinary'
import { CloudinaryResult } from '@src/photos/utils/types'
import { GetStaticPaths, GetStaticProps } from 'next'

export default getPage(countryGallery, [samarkand])

let cachedResults: CloudinaryResult | null = null

async function fetchFromAssetProvider(folderName: string): Promise<CloudinaryResult> {
    if (!cachedResults) {
        console.log('[fetchFromAssetProvider] making a new request')
        const fetchedResults = await cloudinary.v2.search
            .expression(`folder:${folderName}/*`)
            .sort_by('public_id', 'desc')
            .max_results(400)
            .execute()

        cachedResults = fetchedResults
    } else {
        console.log('[fetchFromAssetProvider] returning cachedResults')
    }

    if (!cachedResults) {
        throw new Error('[fetchFromAssetProvider] did not receive any results')
    }

    return cachedResults
}

export const getStaticProps: GetStaticProps = async function (context) {
    const result = getGalleryStaticProps([samarkand], fetchFromAssetProvider, context)
    console.log('getStaticProps finished calling its getter')
    return result
}

export const getStaticPaths: GetStaticPaths = async function () {
    const result = getGalleryStaticPaths([samarkand], fetchFromAssetProvider)
    console.log('getStaticPaths finished calling its getter')
    return result
}
