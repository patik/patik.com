import type { ReactNode } from 'react'

type Props = {
    children?: ReactNode
}

export default function PostTitle({ children }: Props) {
    return (
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-none mb-12 text-center md:text-left">
            {children}
        </h1>
    )
}
