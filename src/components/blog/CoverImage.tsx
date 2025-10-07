import cn from 'classnames'
import config from '../../config.json'

const { blogUrl } = config

type Props = {
    title: string
    src: string
    slug?: string
}

export default function CoverImage({ title, src, slug }: Props) {
    const image = (
        <img
            src={`${blogUrl}/${src}`}
            alt={`Cover Image for ${title}`}
            className={cn('shadow-sm w-full', {
                'hover:shadow-lg transition-shadow duration-200': slug,
            })}
            width={1300}
            height={630}
        />
    )

    return (
        <div className="sm:mx-0">
            {slug ? (
                <a href={`${slug}`} aria-label={title}>
                    {image}
                </a>
            ) : (
                image
            )}
        </div>
    )
}
