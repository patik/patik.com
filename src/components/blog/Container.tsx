import css from './BlogIndex.module.css'

type Props = {
    children?: React.ReactNode
}

export default function Container({ children }: Props) {
    return <div className={css.container}>{children}</div>
}
