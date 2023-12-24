import NetherlandsImage from '@public/images/britain-benelux-netherlands-link.jpg'
import BritainBeneluxImage from '@public/images/home-britain-benelux.jpg'
import CodeLogo from '@public/images/home-console-blog-logo.png'
import GithubLogo from '@public/images/home-github-logo.png'
import MastodonAvatar from '@public/images/home-mastodon-avatar.png'
import TravelImageAll from '@public/images/home-travel-all.jpg'
import TravelImageGermany from '@public/images/home-travel-germany.jpg'
import TravelImageGreece from '@public/images/home-travel-greece.jpg'
import TravelImagePeruArgentina from '@public/images/home-travel-peru-argentina.jpg'
import TravelImageSpain from '@public/images/home-travel-spain.jpg'
import TravelImageTurkey from '@public/images/home-travel-turkey.jpg'
import imgHomeTwitterCraigpatikAvatar from '@public/images/home-twitter-craigpatik-avatar.jpg'
import imgHomeConsoleBlogLogo from '@public/images/icons/blog/ios/AppIcon@3x.png'
import imgHomeDoFLogo from '@public/images/icons/depth-of-field/ios/AppIcon@3x.png'
import imgWithinViewportFLogo from '@public/images/icons/within-viewport/ios/AppIcon@3x.png'
import TravelImageParis from '@public/images/travel-paris.jpg'
import TravelImageUzbekistan from '@public/images/uzbekistan-khiva-night.jpg'
import Layout from '@src/components/common/Layout'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
    return (
        <Layout>
            <Head>
                <link rel="me" href="https://mastodon.online/@craigpatik" key="mastodon" />
            </Head>
            <div role="main">
                <p>
                    I’m <Link href="/about">Craig Patik</Link>, a traveler, web developer, and Arsenal fan based in
                    Munich, Germany.
                </p>

                <section>
                    <h2>Travel</h2>
                    <div className="cp-row button-link-list">
                        <div className="cp-item-third">
                            <Link href="/travel/">
                                <Image
                                    src={TravelImageAll}
                                    alt="Standing aside the Andean Explorer train"
                                    title="Andean Explorer, Peru"
                                    width={48}
                                    height={48}
                                />
                                <span>All Trips</span>
                            </Link>
                        </div>
                        <div className="cp-item-third">
                            <Link href="/travel/uzbekistan/">
                                <Image
                                    src={TravelImageUzbekistan}
                                    alt="The façade of a mausoleum at night"
                                    title="Mausoleum in Khiva"
                                    width={48}
                                    height={48}
                                />
                                <span>Uzbekistan</span>
                            </Link>
                        </div>
                        <div className="cp-item-third">
                            <Link href="/travel/britain/">
                                <Image
                                    src={BritainBeneluxImage}
                                    alt="Big Ben, a black cab, and a red double-decker bus in Parliament Square"
                                    title="London, England"
                                    width={48}
                                    height={48}
                                />
                                <span>Britain</span>
                            </Link>
                        </div>
                        <div className="cp-item-third">
                            <Link href="/travel/peru/">
                                <Image
                                    src={TravelImagePeruArgentina}
                                    alt="Kim holding a lamb and posing with two Andean women in their traditionl clothing"
                                    title="Kim holding a lamb in Cusco, Peru"
                                    width={48}
                                    height={48}
                                />
                                <span>Peru</span>
                            </Link>
                        </div>
                        <div className="cp-item-third">
                            <Link href="/travel/spain/">
                                <Image
                                    src={TravelImageSpain}
                                    alt="Celebrating Spain's World Cup victory in Madrid"
                                    title="Celebrating Spain's World Cup victory in Madrid"
                                    width={48}
                                    height={48}
                                />
                                <span>Spain</span>
                            </Link>
                        </div>
                        <div className="cp-item-third">
                            <Link href="/travel/turkey/">
                                <Image
                                    src={TravelImageTurkey}
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
                                    src={TravelImageGermany}
                                    alt="Spanish fans gathering in Vienna's Ststephensplatz"
                                    title="Spanish fans in Vienna for Euro 2008"
                                    width={48}
                                    height={48}
                                />
                                <span>Germany</span>
                            </Link>
                        </div>
                        <div className="cp-item-third">
                            <Link href="/travel/greece/">
                                <Image
                                    src={TravelImageGreece}
                                    alt="View of the coast of Serifios, Greece from a ferry"
                                    title="Serifios, Greece"
                                    width={48}
                                    height={48}
                                />
                                <span>Greece</span>
                            </Link>
                        </div>
                        <div className="cp-item-third">
                            <Link href="/travel/france/">
                                <Image
                                    src={TravelImageParis}
                                    alt="Kim and I in front of the Eiffel Tower"
                                    title="Paris, France"
                                    width={48}
                                    height={48}
                                />
                                <span>France</span>
                            </Link>
                        </div>
                        <div className="cp-item-third">
                            <Link href="/travel/netherlands/">
                                <Image
                                    src={NetherlandsImage}
                                    alt="Westerkerk overlooking an Amsterdam canal"
                                    title="Amsterdam, Netherlands"
                                    width={48}
                                    height={48}
                                />
                                <span>Netherlands</span>
                            </Link>
                        </div>
                    </div>
                </section>

                <section>
                    <h2>Web design &amp; development</h2>

                    <div className="cp-row button-link-list">
                        <div className="cp-item-third">
                            <a href="https://github.com/patik">
                                <Image src={GithubLogo} alt="" title="GitHub" width={48} height={48} />
                                <span>GitHub</span>
                            </a>
                        </div>
                        <div className="cp-item-third">
                            <Link href="/code/">
                                <Image src={CodeLogo} alt="" title="Code &amp; projects" width={48} height={48} />
                                <span>Code &amp; projects</span>
                            </Link>
                        </div>
                        <div className="cp-item-third">
                            <Link href="/blog/">
                                <Image src={imgHomeConsoleBlogLogo} alt="" title="Blog" width={48} height={48} />
                                <span>Blog</span>
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
                    </div>
                </section>

                <section>
                    <h2>Outlets</h2>

                    <div className="cp-row button-link-list">
                        <div className="cp-item-third">
                            <a rel="me" href="https://twitter.com/craigpatik">
                                <Image
                                    src={imgHomeTwitterCraigpatikAvatar}
                                    alt="Craig riding on a camel"
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
                                    src={MastodonAvatar}
                                    alt="Craig in front of a street mural in Northern Ireland"
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
                                    alt="Craig riding on a camel"
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
