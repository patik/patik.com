import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import imgHomeBritainBenelux from '../public/images/home-britain-benelux.jpg'
import imgHomeCodeLogo from '../public/images/home-console-blog-logo.png'
import imgHomeConsoleBlogLogo from '../public/images/icons/blog/ios/AppIcon@3x.png'
import imgHomeDoFLogo from '../public/images/icons/depth-of-field/ios/AppIcon@3x.png'
import imgHomeGithubLogo from '../public/images/home-github-logo.png'
import imgHomeMastodonAvatar from '../public/images/home-mastodon-avatar.png'
import imgHomeTravelAll from '../public/images/home-travel-all.jpg'
import imgHomeTravelGermany from '../public/images/home-travel-germany.jpg'
import imgHomeTravelGreece from '../public/images/home-travel-greece.jpg'
import imgHomeTravelPeruArgentina from '../public/images/home-travel-peru-argentina.jpg'
import imgHomeTravelSpain from '../public/images/home-travel-spain.jpg'
import imgHomeTravelTurkey from '../public/images/home-travel-turkey.jpg'
import imgHomeTwitterCraigpatikAvatar from '../public/images/home-twitter-craigpatik-avatar.jpg'
import imgTravelParis from '../public/images/travel-paris.jpg'
import Layout from '../src/layout/Layout'
import imgWithinViewportFLogo from '../public/images/icons/within-viewport/ios/AppIcon@3x.png'

export default function Home() {
    return (
        <Layout>
            <Head>
                <link rel="me" href="https://mastodon.online/@craigpatik" key="mastodon" />
            </Head>
            <div id="home-main" role="main">
                <section className="columns">
                    <p>
                        I’m <Link href="/about">Craig Patik</Link>, a traveler, web developer, and Arsenal fan based in
                        Munich, Germany.{' '}
                    </p>
                </section>

                <section>
                    <h2>Travel</h2>
                    <div className="cp-row button-link-list">
                        <div className="cp-item-third">
                            <Link href="/travel/">
                                <Image
                                    src={imgHomeTravelAll}
                                    alt="Standing aside the Andean Explorer train"
                                    title="Andean Explorer, Peru"
                                    width={48}
                                    height={48}
                                />
                                <span>All Travel</span>
                            </Link>
                        </div>
                        <div className="cp-item-third">
                            <Link href="/travel/britain-benelux/">
                                <Image
                                    src={imgHomeBritainBenelux}
                                    alt="Big Ben, a black cab, and a red double-decker bus in Parliament Square"
                                    title="London, England"
                                    width={48}
                                    height={48}
                                />
                                <span>Britain &amp; Benelux</span>
                            </Link>
                        </div>
                        <div className="cp-item-third">
                            <Link href="/travel/peru-argentina/">
                                <Image
                                    src={imgHomeTravelPeruArgentina}
                                    alt="Kim holding a lamb and posing with two Andean women in their traditionl clothing"
                                    title="Kim holding a lamb and posing with two Andean women"
                                    width={48}
                                    height={48}
                                />
                                <span>Peru &amp; Argentina</span>
                            </Link>
                        </div>
                        <div className="cp-item-third">
                            <Link href="/travel/spain/">
                                <Image
                                    src={imgHomeTravelSpain}
                                    alt="Celebrating Spain's World Cup victory in Madrid"
                                    title="Celebrating Spain's World Cup victory in Madrid"
                                    width={48}
                                    height={48}
                                />
                                <span>Spain, Portugal, &amp; Morocco</span>
                            </Link>
                        </div>
                        <div className="cp-item-third">
                            <Link href="/travel/turkey/">
                                <Image
                                    src={imgHomeTravelTurkey}
                                    alt="The Blue Mosque (Sultanahmet Camii), Istanbul, Turkey"
                                    title="The Blue Mosque (Sultanahmet Camii), Istanbul, Turkey"
                                    width={48}
                                    height={48}
                                />
                                <span>Turkey</span>
                            </Link>
                        </div>
                        <div className="cp-item-third">
                            <Link href="/travel/germany/">
                                <Image
                                    src={imgHomeTravelGermany}
                                    alt="Spanish fans gathering in Vienna's Ststephensplatz"
                                    title="Spanish fans in Vienna for Euro 2008"
                                    width={48}
                                    height={48}
                                />
                                <span>Germany &amp; Austria</span>
                            </Link>
                        </div>
                        <div className="cp-item-third">
                            <Link href="/travel/greece/">
                                <Image
                                    src={imgHomeTravelGreece}
                                    alt="View of the coast of Serifios, Greece from a ferry"
                                    title="Serifios, Greece"
                                    width={48}
                                    height={48}
                                />
                                <span>Greece</span>
                            </Link>
                        </div>
                        <div className="cp-item-third">
                            <Link href="/travel/paris/">
                                <Image
                                    src={imgTravelParis}
                                    alt="Kim and I in front of the Eiffel Tower"
                                    title="Paris, France"
                                    width={48}
                                    height={48}
                                />
                                <span>Paris</span>
                            </Link>
                        </div>
                    </div>
                </section>

                <section>
                    <h2>Web design &amp; development</h2>

                    <div className="cp-row button-link-list">
                        <div className="cp-item-third">
                            <a href="https://github.com/patik">
                                <Image src={imgHomeGithubLogo} alt="" title="GitHub" width={48} height={48} />
                                <span>GitHub</span>
                            </a>
                        </div>
                        <div className="cp-item-third">
                            <Link href="/code/">
                                <Image
                                    src={imgHomeCodeLogo}
                                    alt=""
                                    title="Code &amp; projects"
                                    width={48}
                                    height={48}
                                />
                                <span>Code &amp; projects</span>
                            </Link>
                        </div>
                        <div className="cp-item-third">
                            <a href="https://patik.github.io/within-viewport/">
                                <Image src={imgWithinViewportFLogo} width={48} height={48} alt="" />
                                <span>Within Viewport</span>
                            </a>
                        </div>
                        <div className="cp-item-third">
                            <a href="/dof/">
                                <Image
                                    src={imgHomeDoFLogo}
                                    alt=""
                                    title="Depth of Field Calculator"
                                    width={48}
                                    height={48}
                                />
                                <span>Depth of Field Calculator</span>
                            </a>
                        </div>
                        <div className="cp-item-third">
                            <a href="/blog/">
                                <Image src={imgHomeConsoleBlogLogo} alt="" title="Blog" width={48} height={48} />
                                <span>Blog</span>
                            </a>
                        </div>
                    </div>
                </section>

                <section>
                    <h2>Outlets</h2>

                    <div className="cp-row button-link-list">
                        <div className="cp-item-third">
                            <a rel="me" href="https://twitter.com/craigpatik">
                                <Image
                                    src={imgHomeTwitterCraigpatikAvatar}
                                    alt="Twitter avatar; Craig riding on a camel"
                                    title="@craigpatik"
                                    width={48}
                                    height={48}
                                />
                                <span>Twitter</span>
                            </a>
                        </div>
                        <div className="cp-item-third">
                            <a rel="me" href="https://mastodon.online/@craigpatik">
                                <Image
                                    src={imgHomeMastodonAvatar}
                                    alt="Mastodon avatar; Craig in front of a street mural in Northern Ireland"
                                    title="@craigpatik@mastodon.online"
                                    width={48}
                                    height={48}
                                />
                                <span>Mastodon</span>
                            </a>
                        </div>
                        <div className="cp-item-third">
                            <a rel="me" href="https://www.facebook.com/craigpatik">
                                <Image
                                    src={imgHomeTwitterCraigpatikAvatar}
                                    alt="Facebook avatar; Craig riding on a camel"
                                    title="Facebook profile"
                                    width={48}
                                    height={48}
                                />
                                <span>Facebook</span>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}
