import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Carousel from '../../../../../photo-gallery/components/Carousel'
import getResults from '../../../../../photo-gallery/utils/cachedImages'
import cloudinary from '../../../../../photo-gallery/utils/cloudinary'
import getBase64ImageUrl from '../../../../../photo-gallery/utils/generateBlurPlaceholder'
import type { ImageProps } from '../../../../../photo-gallery/utils/types'

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
    const results = await getResults()

    const reducedResults: ImageProps[] = []
    let i = 0
    for (const result of results.resources) {
        reducedResults.push({
            id: i,
            height: result.height,
            width: result.width,
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
        .expression(`folder:Uzbekistan\\ 2023/*`)
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
