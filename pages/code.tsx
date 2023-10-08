import imgGithubLogo from '@public/images/home-github-logo.png'
import imgBlogLogo from '@public/images/icons/blog/ios/AppIcon@3x.png'
import imgConsoleLogLogo from '@public/images/icons/console-log/ios/AppIcon@3x.png'
import imgDoFLogo from '@public/images/icons/depth-of-field/ios/AppIcon@3x.png'
import imgKindjsLogo from '@public/images/icons/kindjs/ios/AppIcon@3x.png'
import imgWithinViewportFLogo from '@public/images/icons/within-viewport/ios/AppIcon@3x.png'
import Layout from '@src/components/common/Layout'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
    return (
        <Layout title="Code &amp; Projects">
            <h1>Code &amp; Projects</h1>

            <p>I work mostly in JavaScript and user interfaces</p>

            <section>
                <div className="cp-row button-link-list">
                    <div className="cp-item-half">
                        <a href="https://patik.github.io/within-viewport/">
                            <Image src={imgWithinViewportFLogo} width={96} height={96} alt="" />
                            <span>Within Viewport</span>
                        </a>
                    </div>
                    <div className="cp-item-half">
                        <a href="/dof/">
                            <Image src={imgDoFLogo} width={96} height={96} alt="" />
                            <span>Depth-of-Field Calculator</span>
                        </a>
                    </div>

                    <div className="cp-item-half">
                        <a href="https://github.com/patik/kind/">
                            <Image src={imgKindjsLogo} width={96} height={96} alt="" />
                            <span>Kind.js precise type-checker</span>
                        </a>
                    </div>
                    <div className="cp-item-half">
                        <a href="https://patik.github.io/console.log-wrapper/">
                            <Image src={imgConsoleLogLogo} width={96} height={96} alt="" />
                            <span>Cross-browser console logging</span>
                        </a>
                    </div>

                    <div className="cp-item-half">
                        <a href="https://github.com/patik">
                            <Image src={imgGithubLogo} width={96} height={96} alt="" />
                            <span>GitHub</span>
                        </a>
                    </div>
                    <div className="cp-item-half">
                        <Link href="/blog/">
                            <Image src={imgBlogLogo} width={96} height={96} alt="" />
                            <span>Blog</span>
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
