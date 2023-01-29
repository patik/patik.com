import Link from 'next/link'
import Layout from '../src/components/site/Layout'

export default function Page() {
    return (
        <Layout title="About">
            <h1>About Me</h1>

            <p>
                I’m a software engineer with a focus on front-end web development and UI design. I’m a graduate of{' '}
                <a href="https://ecse.rpi.edu/">Computer &amp; Systems Engineering</a> at{' '}
                <a href="https://rpi.edu/">RPI</a>.
            </p>
            <p>
                I love to <Link href="/travel">travel</Link>, but my home is permanently in{' '}
                <a href="https://www.google.com/maps/place/Munich,+Germany">Munich</a>. Previously I spent much of my
                life in <a href="https://www.google.com/maps/place/Albany+County,+NY">Upstate, NY</a>.
            </p>
            <p>
                I’m a big fan of football (soccer) worldwide, especially <a href="https://www.arsenal.com/">Arsenal</a>{' '}
                and <a href="https://fcbayern.com/en">Bayern Munich</a>. My dog gets much of my wife’s and my attention.
            </p>

            <section>
                <h2>Contact</h2>
                <ul>
                    <li>
                        e-mail: cra<span>i</span>g<span>@pat</span>ik.<span>com</span>
                    </li>
                    <li>
                        Twitter: <a href="https://twitter.com/craigpatik">@craigpatik</a> and{' '}
                        <a href="https://twitter.com/SoccerTorte">@SoccerTorte</a>
                    </li>
                    <li>
                        Mastodon:{' '}
                        <a rel="me" href="https://mastodon.online/@craigpatik">
                            @craigpatik@mastodon.online
                        </a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/craigpatik">Facebook</a>
                    </li>
                </ul>
            </section>
        </Layout>
    )
}
