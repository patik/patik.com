import Link from 'next/link'
import { ReactElement } from 'react'

export default function Header(): ReactElement {
    return (
        <nav className="top-bar">
            <ul className="title-area">
                <li className="name">
                    <h1>
                        <Link href="/">Craig Patik</Link>
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
                    <li>
                        <Link href="/travel/">Travel</Link>
                    </li>
                    <li>
                        <Link href="/code/" className="active">
                            Code
                        </Link>
                    </li>
                    <li>
                        <Link href="/about/">About</Link>
                    </li>
                </ul>
            </section>
        </nav>
    )
}
