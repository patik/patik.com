import { AppErrorBoundary } from '@src/components/common/AppErrorBoundary'
import HeaderNav from '@src/components/common/HeaderNav'
import Head from 'next/head'
import { PropsWithChildren, ReactElement } from 'react'

type Props = PropsWithChildren<{
    title?: string
    keywords?: string[]
}>

export default function Layout({ title = '', keywords = [], children }: Props): ReactElement {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
            <Head>
                <title>{`${title ? `${title} - ` : ''}Craig Patik`}</title>
                {keywords && keywords.length > 0 ? <meta name="keywords" content={keywords.join(',')} /> : null}
            </Head>

            <div style={{ width: '100%', maxWidth: '1020px', alignSelf: 'center', flexGrow: 1, marginBottom: '2rem' }}>
                <AppErrorBoundary>
                    <HeaderNav />
                    <main>{children}</main>
                </AppErrorBoundary>
            </div>
        </div>
    )
}
