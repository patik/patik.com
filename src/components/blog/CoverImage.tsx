import config from '@src/config.json'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

const { blogUrl } = config

type Props = {
    title: string
    src: string
    slug?: string
}

export default function CoverImage({ title, src, slug }: Props) {
    const image = (
        <Image
            src={`${blogUrl}/${src}`}
            alt={`Cover Image for ${title}`}
            className={cn('shadow-sm w-full', {
                'hover:shadow-lg transition-shadow duration-200': slug,
            })}
            width={1300}
            height={630}
            priority
        />
    )

    return (
        <div className="sm:mx-0">
            {slug ? (
                <Link as={`${slug}`} href={`[slug]`} aria-label={title}>
                    {image}
                </Link>
            ) : (
                image
            )}
        </div>
    )
}
