import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <meta name="author" content="Craig Patik" />
                <meta
                    name="description"
                    content="Craig Patik's homepage &mdash; travel logs &amp; photos, and web design &amp; development"
                />
                <script
                    async
                    src="http://use.typekit.net/tfz6xpv.js"
                    onLoad={() => {
                        try {
                            // @ts-ignore No types for this old Typekit script
                            Typekit.load()
                        } catch (e) {}
                    }}
                ></script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
