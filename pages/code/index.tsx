import Image from 'next/image'
import imgCodeLogo from '../../public/images/home-console-blog-logo.png'
import imgHomeConsoleBlogLogo from '../../public/images/icons/blog/ios/AppIcon@3x.png'
import imgKindjsLogo from '../../public/images/icons/kindjs/ios/AppIcon@3x.png'
import imgWithinViewportFLogo from '../../public/images/icons/within-viewport/ios/AppIcon@3x.png'
import imgDoFLogo from '../../public/images/icons/depth-of-field/ios/AppIcon@3x.png'
import imgGithubLogo from '../../public/images/home-github-logo.png'
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
                    <div className="row button-link-list">
                        <div className="small-12 medium-6 columns">
                            <a href="https://patik.github.io/within-viewport/">
                                <Image src={imgWithinViewportFLogo} alt="" />
                                <span>Within Viewport</span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 columns">
                            <a href="/dof/">
                                <Image src={imgDoFLogo} alt="" />
                                <span>Depth-of-Field Calculator</span>
                            </a>
                        </div>
                    </div>

                    <div className="row button-link-list">
                        <div className="small-12 medium-6 columns">
                            <a href="https://github.com/patik/kind/">
                                <Image src={imgKindjsLogo} alt="" />
                                <span>Kind.js precise type-checker</span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 columns">
                            <a href="https://patik.github.io/console.log-wrapper/">
                                <Image src={imgCodeLogo} alt="" />
                                <span>Cross-browser console logging</span>
                            </a>
                        </div>
                    </div>

                    <div className="row button-link-list">
                        <div className="small-12 medium-6 columns">
                            <a href="https://github.com/patik">
                                <Image src={imgGithubLogo} alt="" />
                                <span>GitHub</span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 columns">
                            <a href="/blog/">
                                <Image src={imgHomeConsoleBlogLogo} alt="" />
                                <span>Blog</span>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}
