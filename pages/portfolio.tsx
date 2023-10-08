import Layout from '@src/components/common/Layout'
import Space from '@src/components/common/Space'
import Link from 'next/link'

export default function Page() {
    return (
        <Layout title="Portfolio">
            <h1>Portfolio</h1>

            <p>I work mostly with JavaScript/TypeScript and frontend user interfaces</p>

            <section>
                <h2>Projects</h2>
                <div className="cp-row">
                    <div className="cp-item-half">
                        <h3>Cross-Browser Console Logging</h3>
                        <p>A utility for printing readable data to all browser consoles, including legacy browsers.</p>
                        <p>
                            <a href="https://patik.github.io/console.log-wrapper/">Demo</a> &bull;
                            <Space />
                            <a href="https://github.com/patik/console.log-wrapper">GitHub</a>
                        </p>
                    </div>
                    <div className="cp-item-half">
                        <h3>Within Viewport</h3>
                        <p>
                            A plugin that determines when elements are entirely visible in the browser viewport.
                            Includes both vanilla JavaScript and jQuery plugins.
                        </p>
                        <p>
                            <a href="https://patik.github.io/within-viewport/">Demo</a> &bull;
                            <Space />
                            <a href="https://github.com/patik/within-viewport">GitHub</a> &bull;
                            <Space />
                            <a href="https://patik.com/blog/within-viewport-javascript-and-jquery-plugin/">Blog post</a>
                        </p>
                    </div>

                    <div className="cp-item-half">
                        <h3>Depth-of-Field Calculator &amp; Comparison Tool</h3>
                        <p>
                            A calculator for photographers to measure and compare the depth of field of various lenses
                            and cameras.
                        </p>
                        <p>
                            Features a responsive, mobile-first design that quickly updates data on the fly. Uses
                            client-side templating and SVG graphs mostly for experimentation. Configurations are easy to
                            share and edit.
                        </p>
                        <p>
                            <Link href="/dof/">Web app</Link> &bull; <a href="https://github.com/patik/dof">GitHub</a>
                        </p>
                    </div>
                    <div className="cp-item-half">
                        <h3>Other projects</h3>
                        <p>
                            <a href="https://github.com/patik">GitHub repositories</a> and
                            <Space />
                            <Link href="/code/user-scripts/">user-scripts and browser extensions</Link>
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <h2>Contributions</h2>
                <p>
                    I’ve made notable contributions to the following sites and projects for the New York State Office of
                    Information Technology Services:
                </p>
                <ul>
                    <li>
                        <a href="https://github.com/ny/coreui">Core UI</a> &mdash; a component-based framework designed
                        for web apps. This is the conceptual successor to the
                        <Space />
                        <a href="https://github.com/ny/excelsior">Excelsior Web Framework</a>, to which I was also a
                        core contributor, and which is used by dozens of NYS sites.
                    </li>
                    <li>
                        <a href="https://github.com/ny/go-responsive">Go Responsive</a> &mdash; a showpiece stemming
                        from a<Space />
                        <a href="https://github.com/ny/2013-03-RWD-code-sprint">responsive web design code sprint</a>
                    </li>
                    <li>
                        <a href="https://transact.dmv.ny.gov/RegistrationRenew/">DMV Registration Renewal</a> &mdash; a
                        responsive redesign of a high-profile app on the Department of Motor Vehicles’ site
                    </li>
                </ul>
            </section>

            <section>
                <h2>Writings &amp; Presentations</h2>
                <ul>
                    <li>
                        My <Link href="/blog/">blog</Link>
                    </li>
                    <li>
                        I gave an <a href="https://igniteshow.com/">Ignite talk</a> at
                        <Space />
                        <a href="https://nys-its.github.io/ny-innovates/">NYS DevCon 2013</a>
                    </li>
                </ul>
            </section>
        </Layout>
    )
}
