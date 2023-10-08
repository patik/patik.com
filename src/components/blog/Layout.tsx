import UnpublishedAlert from '@src/components/blog/UnpublishedAlert'
import CommonLayout from '@src/components/common/Layout'
import { PropsWithChildren, ReactElement } from 'react'

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
