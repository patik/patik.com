type Props = {
    children?: React.ReactNode
}

export default function Container({ children }: Props) {
    return (
        <div className="container mx-auto px-5" style={{ maxWidth: 960 }}>
            {children}
        </div>
    )
}
