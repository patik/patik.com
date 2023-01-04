import '../styles/scss/style.scss'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
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
                            <a href="/about/">About</a>
                        </li>
                    </ul>
                </section>
            </nav>
            <div id="main">
                <Component {...pageProps} />
            </div>
        </>
    )
}
