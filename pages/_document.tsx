import { Head, Html, Main, NextScript } from 'next/document'
import { useRouter } from 'next/router'
import config from '../blog/config.json'

const { basePath } = config

export default function Document() {
    const router = useRouter()
    const isBlog = router.asPath.startsWith(basePath)

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

                {isBlog ? <link rel="stylesheet" href="https://use.typekit.net/tfz6xpv.css" /> : null}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
