import Image from 'next/image'
import imgTravelParis from '../public/images/travel-paris.jpg'
import imgHomeBritainBenelux from '../public/images/home-britain-benelux.jpg'
import imgHomeConsoleBlogLogo from '../public/images/home-console-blog-logo.png'
import imgHomeGithubLogo from '../public/images/home-github-logo.png'
import imgHomePhotos from '../public/images/home-photos.jpg'
import imgHomeTravelAll from '../public/images/home-travel-all.jpg'
import imgHomeTravelGermany from '../public/images/home-travel-germany.jpg'
import imgHomeTravelGreece from '../public/images/home-travel-greece.jpg'
import imgHomeTravelPeruArgentina from '../public/images/home-travel-peru-argentina.jpg'
import imgHomeTravelSpain from '../public/images/home-travel-spain.jpg'
import imgHomeTravelTurkey from '../public/images/home-travel-turkey.jpg'
import imgHomeTumblrEllsassAvatar from '../public/images/home-tumblr-ellsass-avatar.jpg'
import imgHomeTumblrRubeonrailsAvatar from '../public/images/home-tumblr-rubeonrails-avatar.jpg'
import imgHomeTwitterCraigpatikAvatar from '../public/images/home-twitter-craigpatik-avatar.jpg'
import imgHomeTwitterSoccertorteAvatar from '../public/images/home-twitter-soccertorte-avatar.png'
import Layout from '../src/layout/Layout'

export default function Home() {
    return (
        <Layout>
            <div id="home-main" role="main">
                <section>
                    <p>
                        I’m Craig Patik, a traveler, web developer, and Arsenal fan based in Munich, Germany, and
                        originally from Upstate New York.
                    </p>
                </section>

                <section>
                    <h2>Travel</h2>
                    <div className="row button-link-list">
                        <div className="small-12 medium-6 large-4 columns">
                            <a href="travel/">
                                <Image
                                    src={imgHomeTravelAll}
                                    alt="Standing aside the Andean Explorer train"
                                    title="Andean Explorer, Peru"
                                />
                                <span>All Travel</span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a href="travel/britain-benelux/">
                                <Image
                                    src={imgHomeBritainBenelux}
                                    alt="Big Ben, a black cab, and a red double-decker bus in Parliament Square"
                                    title="London, England"
                                />
                                <span>Britain &amp; Benelux</span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a href="travel/peru-argentina/">
                                <Image
                                    src={imgHomeTravelPeruArgentina}
                                    alt="Kim holding a lamb and posing with two Andean women in their traditionl clothing"
                                    title="Kim holding a lamb and posing with two Andean women"
                                />
                                <span>Peru &amp; Argentina</span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a href="travel/spain/">
                                <Image
                                    src={imgHomeTravelSpain}
                                    alt="Celebrating Spain's World Cup victory in Madrid"
                                    title="Celebrating Spain's World Cup victory in Madrid"
                                />
                                <span>Spain, Portugal, &amp; Morocco</span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a href="travel/turkey/">
                                <Image
                                    src={imgHomeTravelTurkey}
                                    alt="The Blue Mosque (Sultanahmet Camii), Istanbul, Turkey"
                                    title="The Blue Mosque (Sultanahmet Camii), Istanbul, Turkey"
                                />
                                <span>Turkey</span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns left">
                            <a href="travel/germany/">
                                <Image
                                    src={imgHomeTravelGermany}
                                    alt="Spanish fans gathering in Vienna's Ststephensplatz"
                                    title="Spanish fans in Vienna for Euro 2008"
                                />
                                <span>Germany &amp; Austria</span>
                            </a>
                        </div>

                        <div className="small-12 medium-6 large-4 columns">
                            <a href="travel/greece/">
                                <Image
                                    src={imgHomeTravelGreece}
                                    alt="View of the coast of Serifios, Greece from a ferry"
                                    title="Serifios, Greece"
                                />
                                <span>Greece</span>
                            </a>
                        </div>

                        <div className="small-12 medium-6 large-4 columns left">
                            <a href="travel/paris/">
                                <Image
                                    src={imgTravelParis}
                                    alt="Kim and I in front of the Eiffel Tower"
                                    title="Paris, France"
                                />
                                <span>Paris</span>
                            </a>
                        </div>
                    </div>
                </section>

                <section>
                    <h2>Web design &amp; development</h2>

                    <div className="row button-link-list">
                        <div className="small-12 medium-6 large-4 columns">
                            <a href="code/">
                                <Image src={imgHomeConsoleBlogLogo} alt="JavaScript code" title="Code &amp; projects" />
                                <span>Code &amp; projects</span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a href="blog/">
                                <Image src={imgHomeConsoleBlogLogo} alt="JavaScript code" title="console.blog()" />
                                <span>
                                    console.
                                    <wbr />
                                    blog()
                                </span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a href="https://github.com/patik">
                                <Image src={imgHomeGithubLogo} alt="GitHub text logo" title="GitHub" />
                                <span>GitHub</span>
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
                                    alt="Twitter avatar; photo of me riding on a camel"
                                    title="@craigpatik"
                                />
                                <span>@craigpatik</span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a href="https://twitter.com/SoccerTorte">
                                <Image
                                    src={imgHomeTwitterSoccertorteAvatar}
                                    alt="Twitter avatar; photo of a slice of sachertorte cake"
                                    title="@SoccerTorte"
                                />
                                <span>@SoccerTorte</span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a href="https://www.facebook.com/craigpatik">
                                <Image
                                    src={imgHomeTwitterCraigpatikAvatar}
                                    alt="Facebook avatar; photo of me riding on a camel"
                                    title="Facebook profile"
                                />
                                <span>Facebook</span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a href="https://plus.google.com/u/0/+CraigPatik">
                                <Image
                                    src={imgHomePhotos}
                                    alt="Sitting in a boat and feeding a banana to a wooley monkey"
                                    title="Feeding a monkey in the Amazon rainforest"
                                />
                                <span>Photos</span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a href="http://ellsass.com">
                                <Image
                                    src={imgHomeTumblrEllsassAvatar}
                                    alt="Tumblr avatar; photo of me in front of the Alcazar gardens, Sevilla, Spain"
                                    title="Alcazar gardens, Sevilla, Spain"
                                />
                                <span>Personal blog</span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a href="http://rubeonrails.com">
                                <Image
                                    src={imgHomeTumblrRubeonrailsAvatar}
                                    alt="S-Bahn station in Marienplatz, Munich, Germany"
                                    title="S-Bahn station in Marienplatz, Munich, Germany"
                                />
                                <span>Rube On Rails</span>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}
