import { AppProps } from 'next/app'
import '../styles/index.css'
import '../styles/post-body.css'

export default function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}
