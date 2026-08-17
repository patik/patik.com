import css from '../BlogIndex.module.css'

type Props = {
    excerpt: string
    // slug: string
}

export default function Excerpt({ /* slug, */ excerpt }: Props) {
    return <div className={css.postExcerpt}>{excerpt}</div>
}
