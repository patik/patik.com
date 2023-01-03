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
                            <a href="<?php echo $this->print_dir_level(); ?>travel/">Travel</a>
                            <ul className="dropdown">
                                <li>
                                    <a href="<?php echo $this->print_dir_level(); ?>travel/">All Travels</a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="<?php echo $this->print_dir_level(); ?>travel/britain-benelux/">
                                        Britian &amp; Benelux
                                    </a>
                                </li>
                                <li>
                                    <a href="<?php echo $this->print_dir_level(); ?>travel/peru-argentina/">
                                        Peru &amp; Argentina
                                    </a>
                                </li>
                                <li>
                                    <a href="<?php echo $this->print_dir_level(); ?>travel/spain/">Spain</a>
                                </li>
                                <li>
                                    <a href="<?php echo $this->print_dir_level(); ?>travel/turkey/">Turkey</a>
                                </li>
                                <li>
                                    <a href="<?php echo $this->print_dir_level(); ?>travel/germany/">
                                        Germany &amp; Austria
                                    </a>
                                </li>
                                <li>
                                    <a href="<?php echo $this->print_dir_level(); ?>travel/greece/">Greece</a>
                                </li>
                                <li>
                                    <a href="<?php echo $this->print_dir_level(); ?>travel/paris/">Paris</a>
                                </li>
                                <li>
                                    <a href="<?php echo $this->print_dir_level(); ?>travel/france/">France</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="/code/" className="active">
                                Code
                            </a>
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
