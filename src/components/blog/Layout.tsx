import { PropsWithChildren, ReactElement } from 'react'
import CommonLayout from '../common/Layout'
import UnpublishedAlert from './UnpublishedAlert'

type Props = PropsWithChildren<{
    title?: string
    keywords?: string[]
    unpublished?: boolean
    children: React.ReactNode
}>

export default function Layout({ unpublished, children, ...commonLayoutProps }: Props): ReactElement {
    return (
        <CommonLayout {...commonLayoutProps}>
            <div className="min-h-screen">
                {unpublished ? <UnpublishedAlert /> : null}
                <main>{children}</main>
            </div>
        </CommonLayout>
    )
}
