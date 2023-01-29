import Link from 'next/link'
import { ReactElement } from 'react'

export default function HeaderNav(): ReactElement {
    return (
        <nav className="main-nav">
            <h1>
                <Link href="/">Craig Patik</Link>
            </h1>
            <ul>
                <li className="hide-for-small">
                    <Link href="/">Home</Link>
                </li>
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
        </nav>
    )
}
