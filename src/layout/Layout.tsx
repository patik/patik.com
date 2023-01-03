import Head from 'next/head'
import Link from 'next/link'
import { PropsWithChildren, ReactElement } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

function FallbackComponent() {
    return <></>
}

type Props = PropsWithChildren<{
    title?: string
    keywords?: string[]
}>

export default function Layout({ title, keywords = [], children }: Props): ReactElement {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
            <Head>
                <title>{`${title ? `${title} - ` : ''}Patik.com`}</title>
                {keywords.length > 0 ? <meta name="keywords" content={keywords.join(',')} /> : null}
            </Head>

            <main
                id="main"
                style={{ width: '100%', maxWidth: '1020px', alignSelf: 'center', flexGrow: 1, marginBottom: '2rem' }}
            >
                <div>
                    <h4>
                        <Link href="/">Depth of Field Calculator &amp; Lens Comparison Tool</Link>
                    </h4>
                    <p>Compare multiple camera lenses side-by-side</p>
                </div>

                <ErrorBoundary FallbackComponent={FallbackComponent}>{children}</ErrorBoundary>
            </main>
        </div>
    )
}
