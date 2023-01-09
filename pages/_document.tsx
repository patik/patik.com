import { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'
import { ReactNode, useEffect, useState } from 'react'

export default function Document() {
    const [scripts, setScripts] = useState<ReactNode[]>([])

    useEffect(() => {
        if (scripts.length === 0) {
            setScripts([<Script src="/js/jquery.min.js" key="jquery" />])
        }
    }, [scripts.length])

    return (
        <Html lang="en">
            <Head>
                <meta charSet="utf-8" />
                <meta name="author" content="Craig Patik" />
                <meta
                    name="description"
                    content="Craig Patik's homepage &mdash; travel logs &amp; photos, and web design &amp; development"
                />
                <script
                    async
                    src="https://use.typekit.net/tfz6xpv.js"
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
                {scripts}
            </body>
        </Html>
    )
}
