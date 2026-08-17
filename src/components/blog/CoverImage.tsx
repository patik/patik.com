import config from '../../config.json'
import css from './BlogIndex.module.css'

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
            alt={title}
            className={[css.coverImage, slug ? css.coverImageInteractive : ''].filter(Boolean).join(' ')}
            width={1300}
            height={630}
        />
    )

    return (
        <div>
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
