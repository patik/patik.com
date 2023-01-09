import Image from 'next/image'
import Link from 'next/link'
import imgConsoleBlogLogo from '../../public/images/home-console-blog-logo.png'
import imgGithubLogo from '../../public/images/home-github-logo.png'
import imgTwitterCraigpatikAvatar from '../../public/images/home-twitter-craigpatik-avatar.jpg'
import Layout from '../../src/layout/Layout'

export default function Page() {
    return (
        <Layout title="Code &amp; Projects">
            <div id="code-main" role="main">
                <h1>Code &amp; Projects</h1>

                <div className="intro">
                    <p>I work mostly in JavaScript and user interfaces</p>
                </div>

                <section>
                    <h2>Blog &amp; Demos</h2>
                    <div className="row button-link-list">
                        <div className="small-12 medium-6 columns">
                            <a href="/blog/">
                                <Image src={imgConsoleBlogLogo} alt="JavaScript code" title="console.blog()" />
                                <span>
                                    console.
                                    <wbr />
                                    blog()
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className="row button-link-list">
                        <div className="small-12 medium-6 columns">
                            <a href="https://patik.github.io/console.log-wrapper/">
                                <Image
                                    src={imgConsoleBlogLogo}
                                    alt="JavaScript code"
                                    title="Cross-browser console logging"
                                />
                                <span>Cross-browser console logging</span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 columns">
                            <a href="https://github.com/patik/kind/">
                                <Image
                                    src={imgConsoleBlogLogo}
                                    alt="JavaScript code"
                                    title="Kind type-check for JavaScript"
                                />
                                <span>Kind.js precise type-checker</span>
                            </a>
                        </div>
                    </div>
                </section>

                <section>
                    <h2>Creations</h2>
                    <div className="row button-link-list">
                        <div className="small-12 medium-6 columns">
                            <a href="https://github.com/patik">
                                <Image src={imgGithubLogo} alt="GitHub text logo" title="GitHub" />
                                <span>GitHub</span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 columns">
                            <a href="https://patik.github.io/within-viewport/">
                                <Image src={imgConsoleBlogLogo} alt="JavaScript code" title="Within Viewport" />
                                <span>Within Viewport</span>
                            </a>
                        </div>
                    </div>
                    <div className="row button-link-list">
                        <div className="small-12 medium-6 large-4 columns left">
                            <a href="code/user-scripts/">
                                <Image src={imgConsoleBlogLogo} alt="JavaScript code" title="User Scripts" />
                                <span>User Scripts</span>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}
