import Link from 'next/link'
import Layout from '../../src/layout/Layout'

export default function Page() {
    return (
        <Layout title="About">
            <div id="turkey-main" role="main">
                <h1>About Me</h1>

                <section>
                    <p>
                        I’m a software engineer with a focus on front-end web development and UI design. I’m a graduate
                        of <a href="http://www.ecse.rpi.edu/">Computer &amp; Systems Engineering</a> at{' '}
                        <a href="http://www.rpi.edu/">RPI</a>.
                    </p>
                    <p>
                        I love to <Link href="/travel">travel</Link>, but my home is permanently in{' '}
                        <a href="https://www.google.com/maps/place/Munich,+Germany">Munich</a>. Previously I spent much
                        of my life in <a href="https://www.google.com/maps/place/Albany+County,+NY">Upstate, NY</a>.
                    </p>
                    <p>
                        I’m a big fan of football (soccer) worldwide, especially{' '}
                        <a href="http://www.arsenal.com/">Arsenal</a> and{' '}
                        <a href="http://www.fcbayern.t-com.de/en/">Bayern Munich</a>. My dog gets much of my wife’s and
                        my attention.
                    </p>
                </section>

                <section>
                    <h2>Contact</h2>
                    <ul>
                        <li>
                            e-mail: cra<span>i</span>g<span>@pat</span>ik.<span>com</span>
                        </li>
                        <li>
                            Twitter: <a href="http://twitter.com/craigpatik">@craigpatik</a> and{' '}
                            <a href="http://twitter.com/SoccerTorte">@SoccerTorte</a>
                        </li>
                        <li>
                            Mastodon:{' '}
                            <a rel="me" href="https://mastodon.online/@craigpatik">
                                @craigpatik@mastodon.online
                            </a>
                        </li>
                        <li>
                            <a href="http://www.facebook.com/craigpatik">Facebook</a>
                        </li>
                    </ul>
                </section>
            </div>
        </Layout>
    )
}
