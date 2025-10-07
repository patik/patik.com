type Props = {
    excerpt: string
    // slug: string
    className?: string
}

export default function Excerpt({ /* slug, */ excerpt, className }: Props) {
    return <div className={className}>{excerpt}</div>
}
