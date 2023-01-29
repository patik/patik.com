import { Head as DocumentHead, Html, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <DocumentHead>
                <link rel="stylesheet" href="https://use.typekit.net/tfz6xpv.css" />
            </DocumentHead>

            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
