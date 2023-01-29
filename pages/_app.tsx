import type { AppProps } from 'next/app'
import '../styles/site/globals.css'
import '../styles/site/scss/style.scss'

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}
