import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import config from '../blog/config.json'
import '../styles/site/globals.css'
import '../styles/site/scss/style.scss'

const { description /* , basePath */ } = config

export default function App({ Component, pageProps }: AppProps) {
    // const router = SingletonRouter

    // useEffect(() => {
    //     if (router.asPath.startsWith(basePath)) {
    //         console.log('loading blog styles')

    //         import('../blog/styles/index.css')
    //         import('../blog/styles/post-body.css')
    //     } else {
    //         console.log('keeping online site styles')
    //     }
    // }, [])

    return (
        <>
            <NextHead>
                <title>{description}</title>
            </NextHead>
            <Component {...pageProps} />
        </>
    )
}
