import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import Modal from '@src/photos/components/Modal'
import cloudinary from '@src/photos/utils/cloudinary'
import escapeCloudinaryString from '@src/photos/utils/escapeCloudinaryString'
import getBase64ImageUrl from '@src/photos/utils/generateBlurPlaceholder'
import type { ImageProps } from '@src/photos/utils/types'
import { useLastViewedPhoto } from '@src/photos/utils/useLastViewedPhoto'

type Props = { images: ImageProps[] }

export const folderName = 'Uzbekistan\\ 2023'

const Home: NextPage<Props> = ({ images }: Props) => {
    const router = useRouter()
    const { photoId } = router.query
    const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()

    const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null)

    useEffect(() => {
        // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
        if (lastViewedPhoto && !photoId && lastViewedPhotoRef.current) {
            lastViewedPhotoRef.current.scrollIntoView({ block: 'center' })
            setLastViewedPhoto(null)
        }
    }, [photoId, lastViewedPhoto, setLastViewedPhoto])

    return (
        <>
            <Head>
                <title>{folderName}</title>
                {/* <meta property="og:image" content="https://nextjsconf-pics.vercel.app/og-image.png" />
                <meta name="twitter:image" content="https://nextjsconf-pics.vercel.app/og-image.png" /> */}
            </Head>
            <main className="mx-auto max-w-[1960px] p-4">
                {photoId && (
                    <Modal
                        images={images}
                        onClose={() => {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            setLastViewedPhoto(photoId)
                        }}
                    />
                )}
                <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
                    {images.map(({ id, public_id, format, blurDataUrl }) => (
                        <Link
                            key={id}
                            href={`/travel/uzbekistan/photos/?photoId=${id}`}
                            as={`/travel/uzbekistan/photos/p/${id}`}
                            ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
                            shallow
                            className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                        >
                            <Image
                                alt="Next.js Conf photo"
                                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                                style={{ transform: 'translate3d(0, 0, 0)' }}
                                placeholder="blur"
                                blurDataURL={blurDataUrl}
                                src={`https://res.cloudinary.com/${
                                    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
                                }/image/upload/c_scale,w_720/${escapeCloudinaryString(public_id)}.${format}`}
                                width={720}
                                height={480}
                                sizes="(max-width: 640px) 100vw,
                                        (max-width: 1280px) 50vw,
                                        (max-width: 1536px) 33vw,
                                        25vw"
                            />
                        </Link>
                    ))}
                </div>
            </main>
        </>
    )
}

export default Home

export async function getStaticProps() {
    const results = await cloudinary.v2.search
        .expression(`folder:${folderName}/*`)
        .sort_by('public_id', 'desc')
        .max_results(400)
        .execute()
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

    const blurImagePromises = results.resources.map((image: ImageProps) => {
        return getBase64ImageUrl(image)
    })
    const imagesWithBlurDataUrls = await Promise.all(blurImagePromises)

    for (let i = 0; i < reducedResults.length; i++) {
        reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i]
    }

    return {
        props: {
            images: reducedResults,
        },
    }
}
