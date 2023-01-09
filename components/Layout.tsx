import UnpublishedAlert from './UnpublishedAlert'

type Props = {
    unpublished?: boolean
    children: React.ReactNode
}

const Layout = ({ unpublished, children }: Props) => {
    return (
        <div className="min-h-screen">
            {unpublished ? <UnpublishedAlert /> : null}
            <main>{children}</main>
        </div>
    )
}

export default Layout
