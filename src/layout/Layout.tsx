import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script'
import { PropsWithChildren, ReactElement, ReactNode, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

function FallbackComponent() {
    return <></>
}

type Props = PropsWithChildren<{
    title?: string
    keywords?: string[]
}>

export default function Layout({ title, keywords = [], children }: Props): ReactElement {
    const [scripts, setScripts] = useState<ReactNode[]>([])

    useEffect(() => {
        if (scripts.length === 0) {
            setScripts([<Script src="/js/jquery.min.js" key="jquery" />])
        }
    }, [scripts.length])

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
                <ErrorBoundary FallbackComponent={FallbackComponent}>
                    <nav className="top-bar">
                        <ul className="title-area">
                            <li className="name">
                                <h1>
                                    <Link href="/">Patik.com</Link>
                                </h1>
                            </li>
                            <li className="toggle-topbar menu-icon">
                                <a href="#">
                                    <span></span>
                                </a>
                            </li>
                        </ul>
                        <section className="top-bar-section">
                            <ul className="right">
                                <li className="has-dropdown<?php if ($this->section === 'travel') { echo ' active'; } ?>">
                                    <Link href="/travel/">Travel</Link>
                                    <ul className="dropdown">
                                        <li>
                                            <Link href="/travel/">All Travels</Link>
                                        </li>
                                        <li className="divider"></li>
                                        <li>
                                            <Link href="/travel/britain-benelux/">Britian &amp; Benelux</Link>
                                        </li>
                                        <li>
                                            <Link href="/travel/peru-argentina/">Peru &amp; Argentina</Link>
                                        </li>
                                        <li>
                                            <Link href="/travel/spain/">Spain</Link>
                                        </li>
                                        <li>
                                            <Link href="/travel/turkey/">Turkey</Link>
                                        </li>
                                        <li>
                                            <Link href="/travel/germany/">Germany &amp; Austria</Link>
                                        </li>
                                        <li>
                                            <Link href="/travel/greece/">Greece</Link>
                                        </li>
                                        <li>
                                            <Link href="/travel/paris/">Paris</Link>
                                        </li>
                                        <li>
                                            <Link href="/travel/france/">France</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link href="/code/" className="active">
                                        Code
                                    </Link>
                                </li>
                                <li>
                                    <a href="https://plus.google.com/u/0/+CraigPatik">Photos</a>
                                </li>
                                <li>
                                    <Link href="/about/">About</Link>
                                </li>
                            </ul>
                        </section>
                    </nav>
                    <div id="main">{children} </div>
                    {scripts}
                </ErrorBoundary>
            </main>
        </div>
    )
}
