import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import imgHomeBritainBenelux from '../public/images/home-britain-benelux.jpg'
import imgHomeConsoleBlogLogo from '../public/images/home-console-blog-logo.png'
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

export default function Home() {
    return (
        <Layout>
            <Head>
                <link rel="me" href="https://mastodon.online/@craigpatik" key="mastodon" />
            </Head>
            <div id="home-main" role="main">
                <section className="columns">
                    <p>
                        I’m Craig Patik, a traveler, web developer, and Arsenal fan based in Munich, Germany, and
                        originally from Upstate New York.
                    </p>
                </section>

                <section>
                    <h2>Travel</h2>
                    <div className="row button-link-list">
                        <div className="small-12 medium-6 large-4 columns">
                            <Link href="/travel/">
                                <Image
                                    src={imgHomeTravelAll}
                                    alt="Standing aside the Andean Explorer train"
                                    title="Andean Explorer, Peru"
                                />
                                <span>All Travel</span>
                            </Link>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <Link href="/travel/britain-benelux/">
                                <Image
                                    src={imgHomeBritainBenelux}
                                    alt="Big Ben, a black cab, and a red double-decker bus in Parliament Square"
                                    title="London, England"
                                />
                                <span>Britain &amp; Benelux</span>
                            </Link>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <Link href="/travel/peru-argentina/">
                                <Image
                                    src={imgHomeTravelPeruArgentina}
                                    alt="Kim holding a lamb and posing with two Andean women in their traditionl clothing"
                                    title="Kim holding a lamb and posing with two Andean women"
                                />
                                <span>Peru &amp; Argentina</span>
                            </Link>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <Link href="/travel/spain/">
                                <Image
                                    src={imgHomeTravelSpain}
                                    alt="Celebrating Spain's World Cup victory in Madrid"
                                    title="Celebrating Spain's World Cup victory in Madrid"
                                />
                                <span>Spain, Portugal, &amp; Morocco</span>
                            </Link>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <Link href="/travel/turkey/">
                                <Image
                                    src={imgHomeTravelTurkey}
                                    alt="The Blue Mosque (Sultanahmet Camii), Istanbul, Turkey"
                                    title="The Blue Mosque (Sultanahmet Camii), Istanbul, Turkey"
                                />
                                <span>Turkey</span>
                            </Link>
                        </div>
                        <div className="small-12 medium-6 large-4 columns left">
                            <Link href="/travel/germany/">
                                <Image
                                    src={imgHomeTravelGermany}
                                    alt="Spanish fans gathering in Vienna's Ststephensplatz"
                                    title="Spanish fans in Vienna for Euro 2008"
                                />
                                <span>Germany &amp; Austria</span>
                            </Link>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <Link href="/travel/greece/">
                                <Image
                                    src={imgHomeTravelGreece}
                                    alt="View of the coast of Serifios, Greece from a ferry"
                                    title="Serifios, Greece"
                                />
                                <span>Greece</span>
                            </Link>
                        </div>
                        <div className="small-12 medium-6 large-4 columns left">
                            <Link href="/travel/paris/">
                                <Image
                                    src={imgTravelParis}
                                    alt="Kim and I in front of the Eiffel Tower"
                                    title="Paris, France"
                                />
                                <span>Paris</span>
                            </Link>
                        </div>
                    </div>
                </section>

                <section>
                    <h2>Web design &amp; development</h2>

                    <div className="row button-link-list">
                        <div className="small-12 medium-6 large-4 columns">
                            <a href="https://github.com/patik">
                                <Image src={imgHomeGithubLogo} alt="GitHub text logo" title="GitHub" />
                                <span>GitHub</span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <Link href="/code/">
                                <Image src={imgHomeConsoleBlogLogo} alt="JavaScript code" title="Code &amp; projects" />
                                <span>Code &amp; projects</span>
                            </Link>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a href="/blog/">
                                <Image src={imgHomeConsoleBlogLogo} alt="JavaScript code" title="console.blog()" />
                                <span>
                                    console.
                                    <wbr />
                                    blog()
                                </span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns left">
                            <a href="/dof/">
                                <Image
                                    src={imgHomeConsoleBlogLogo}
                                    alt="JavaScript code"
                                    title="Depth of Field Calculator"
                                />
                                <span>Depth of Field Calculator</span>
                            </a>
                        </div>
                    </div>
                </section>

                <section>
                    <h2>Outlets</h2>

                    <div className="row button-link-list">
                        <div className="small-12 medium-6 large-4 columns">
                            <a href="https://twitter.com/craigpatik">
                                <Image
                                    src={imgHomeTwitterCraigpatikAvatar}
                                    alt="Twitter avatar; Craig riding on a camel"
                                    title="@craigpatik"
                                />
                                <span>Twitter</span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a rel="me" href="https://mastodon.online/@craigpatik">
                                <Image
                                    src={imgHomeMastodonAvatar}
                                    alt="Mastodon avatar; Craig in front of a street mural in Northern Ireland"
                                    title="@craigpatik@mastodon.online"
                                />
                                <span>Mastodon</span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a href="https://www.facebook.com/craigpatik">
                                <Image
                                    src={imgHomeTwitterCraigpatikAvatar}
                                    alt="Facebook avatar; Craig riding on a camel"
                                    title="Facebook profile"
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
