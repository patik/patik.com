import { AppProps } from 'next/app'
import NextHead from 'next/head'
import '../blog/styles/index.css'
import '../blog/styles/post-body.css'
import packagejson from '../package.json'

const { description } = packagejson

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <NextHead>
                <title>{description}</title>
            </NextHead>
            <Component {...pageProps} />
        </>
    )
}
