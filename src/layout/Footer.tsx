import Link from 'next/link'

export default function Footer({ hasPermalink }: { hasPermalink?: boolean }) {
    return (
        <footer style={{ display: 'flex', textAlign: 'center' }}>
            <div>
                <p>
                    <Link href="/">Home</Link>
                </p>
            </div>
            <div>
                <p>
                    <Link href="/about/">How to use</Link>
                </p>
            </div>
            <div>
                <p>
                    <a href="https://github.com/patik/dof/issues">Feedback</a>
                </p>
            </div>
            <div>
                <p>
                    <Link href="/software">Tech & software details</Link>
                </p>
            </div>
        </footer>
    )
}
