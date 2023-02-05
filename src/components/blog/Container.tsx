type Props = {
    children?: React.ReactNode
}

export default function Container({ children }: Props) {
    return (
        <div className="mx-auto" style={{ maxWidth: 960 }}>
            {children}
        </div>
    )
}
