import css from '../BlogIndex.module.css'

type Props = {
    excerpt: string
    // slug: string
    className?: string
}

export default function Excerpt({ /* slug, */ excerpt, className }: Props) {
    return <div className={className ?? css.postExcerpt}>{excerpt}</div>
}
