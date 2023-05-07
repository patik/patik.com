import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Carousel from '@src/photos/components/Carousel'
import getResults from '@src/photos/utils/cachedImages'
import cloudinary from '@src/photos/utils/cloudinary'
import getBase64ImageUrl from '@src/photos/utils/generateBlurPlaceholder'
import type { ImageProps } from '@src/photos/utils/types'
import { folderName } from '..'

type Props = { currentPhoto: ImageProps }

const Home: NextPage<Props> = ({ currentPhoto }: Props) => {
    const router = useRouter()
    const { photoId } = router.query
    const index = Number(photoId)
    const currentPhotoUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_2560/${currentPhoto.public_id}.${currentPhoto.format}`

    return (
        <>
            <Head>
                <title>Next.js Conf 2022 Photos</title>
                <meta property="og:image" content={currentPhotoUrl} />
                <meta name="twitter:image" content={currentPhotoUrl} />
            </Head>
            <main className="mx-auto max-w-[1960px] p-4">
                <Carousel currentPhoto={currentPhoto} index={index} />
            </main>
        </>
    )
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
    const results = await getResults(folderName)
    const reducedResults: ImageProps[] = []
    let i = 0
    console.log('results ', results)
    console.log('results.resources ', results.resources)
    for (const result of results.resources) {
        reducedResults.push({
            id: i,
            height: String(result.height),
            width: String(result.width),
            public_id: result.public_id,
            format: result.format,
        })
        i++
    }

    const currentPhoto = reducedResults.find((img) => img.id === Number(context.params?.photoId))
    if (currentPhoto) {
        currentPhoto.blurDataUrl = await getBase64ImageUrl(currentPhoto)
    }

    return {
        props: {
            currentPhoto,
        },
    }
}

export async function getStaticPaths() {
    const results = await cloudinary.v2.search
        .expression(`folder:${folderName}/*`)
        .sort_by('public_id', 'desc')
        .max_results(400)
        .execute()

    const fullPaths = []
    for (let i = 0; i < results.resources.length; i++) {
        fullPaths.push({ params: { photoId: i.toString() } })
    }

    return {
        paths: fullPaths,
        fallback: false,
    }
}
