import Head from 'next/head'
import { PropsWithChildren, ReactElement } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import HeaderNav from './HeaderNav'

function FallbackComponent() {
    return <p>Something went wrong</p>
}

type Props = PropsWithChildren<{
    title?: string
    keywords?: string[]
}>

export default function Layout({ title, keywords = [], children }: Props): ReactElement {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
            <Head>
                <title>{`${title ? `${title} - ` : ''}Craig Patik`}</title>
                {keywords.length > 0 ? <meta name="keywords" content={keywords.join(',')} /> : null}
                <meta name="viewport" content="width=device-width,initial-scale=1" />
            </Head>

            <div style={{ width: '100%', maxWidth: '1020px', alignSelf: 'center', flexGrow: 1, marginBottom: '2rem' }}>
                <ErrorBoundary FallbackComponent={FallbackComponent}>
                    <HeaderNav />
                    <main>{children}</main>
                </ErrorBoundary>
            </div>
        </div>
    )
}
