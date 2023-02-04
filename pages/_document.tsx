import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta charSet="utf-8" />
                <meta name="author" content="Craig Patik" />
                <meta
                    name="description"
                    content="Craig Patik's homepage &mdash; travel logs &amp; photos, and web design &amp; development"
                />
                <link rel="stylesheet" href="https://use.typekit.net/tfz6xpv.css" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
