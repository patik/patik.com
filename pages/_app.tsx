import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import config from '../src/config.json'
import '../src/styles/site/globals.css'
import '../src/styles/site/scss/style.scss'
import '../src/styles/blog/index.css'
import '../src/styles/photos.css'

const { description } = config

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <NextHead>
                <title>{description}</title>
                <meta name="viewport" content="width=device-width,initial-scale=1" />
            </NextHead>
            <Component {...pageProps} />
        </>
    )
}
