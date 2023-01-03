import Image from 'next/image'
import Layout from '../src/layout/Layout'

export default function Home() {
    return (
        <Layout>
            <div id="home-main" role="main">
                <section>
                    <p>
                        I&quot;m a traveler, web designer &amp; developer, and Arsenal fan based in Munich, Germany, and
                        originally from Upstate New York.
                    </p>
                </section>

                <section>
                    <h2>Travel</h2>
                    <div className="row button-link-list">
                        <div className="small-12 medium-6 large-4 columns">
                            <a href="travel/">
                                <Image
                                    src="/images/home-travel-all.jpg"
                                    alt="Standing aside the Andean Explorer train"
                                    title="Andean Explorer, Peru"
                                />
                                <span>All Travel</span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a href="travel/britain-benelux/">
                                <Image
                                    src="/images/home-britain-benelux.jpg"
                                    alt="Big Ben, a black cab, and a red double-decker bus in Parliament Square"
                                    title="London, England"
                                />
                                <span>Britain &amp; Benelux</span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a href="travel/peru-argentina/">
                                <Image
                                    src="/images/home-travel-peru-argentina.jpg"
                                    alt="Kim holding a lamb and posing with two Andean women in their traditionl clothing"
                                    title="Kim holding a lamb and posing with two Andean women"
                                />
                                <span>Peru &amp; Argentina</span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a href="travel/spain/">
                                <Image
                                    src="/images/home-travel-spain.jpg"
                                    alt="Celebrating Spain's World Cup victory in Madrid"
                                    title="Celebrating Spain's World Cup victory in Madrid"
                                />
                                <span>Spain, Portugal, &amp; Morocco</span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a href="travel/turkey/">
                                <Image
                                    src="/images/home-travel-turkey.jpg"
                                    alt="The Blue Mosque (Sultanahmet Camii), Istanbul, Turkey"
                                    title="The Blue Mosque (Sultanahmet Camii), Istanbul, Turkey"
                                />
                                <span>Turkey</span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns left">
                            <a href="travel/germany/">
                                <Image
                                    src="/images/home-travel-germany.jpg"
                                    alt="Spanish fans gathering in Vienna's Ststephensplatz"
                                    title="Spanish fans in Vienna for Euro 2008"
                                />
                                <span>Germany &amp; Austria</span>
                            </a>
                        </div>

                        <div className="small-12 medium-6 large-4 columns">
                            <a href="travel/greece/">
                                <Image
                                    src="/images/home-travel-greece.jpg"
                                    alt="View of the coast of Serifios, Greece from a ferry"
                                    title="Serifios, Greece"
                                />
                                <span>Greece</span>
                            </a>
                        </div>

                        <div className="small-12 medium-6 large-4 columns ">
                            <a href="travel/paris/">
                                <Image src="/images/home-travel-paris.jpg" alt="" title="Serifios, Greece" />
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
                                <Image
                                    src="/images/home-console-blog-logo.png"
                                    alt="JavaScript code"
                                    title="Code &amp; projects"
                                />
                                <span>Code &amp; projects</span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a href="blog/">
                                <Image
                                    src="/images/home-console-blog-logo.png"
                                    alt="JavaScript code"
                                    title="console.blog()"
                                />
                                <span>
                                    console.
                                    <wbr />
                                    blog()
                                </span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a href="https://github.com/patik">
                                <Image src="/images/home-github-logo.png" alt="GitHub text logo" title="GitHub" />
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
                                    src="/images/home-twitter-craigpatik-avatar.jpg"
                                    alt="Twitter avatar; photo of me riding on a camel"
                                    title="@craigpatik"
                                />
                                <span>@craigpatik</span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a href="https://twitter.com/SoccerTorte">
                                <Image
                                    src="/images/home-twitter-soccertorte-avatar.png"
                                    alt="Twitter avatar; photo of a slice of sachertorte cake"
                                    title="@SoccerTorte"
                                />
                                <span>@SoccerTorte</span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a href="https://www.facebook.com/craigpatik">
                                <Image
                                    src="/images/home-twitter-craigpatik-avatar.jpg"
                                    alt="Facebook avatar; photo of me riding on a camel"
                                    title="Facebook profile"
                                />
                                <span>Facebook</span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a href="https://plus.google.com/u/0/+CraigPatik">
                                <Image
                                    src="/images/home-photos.jpg"
                                    alt="Sitting in a boat and feeding a banana to a wooley monkey"
                                    title="Feeding a monkey in the Amazon rainforest"
                                />
                                <span>Photos</span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a href="http://ellsass.com">
                                <Image
                                    src="/images/home-tumblr-ellsass-avatar.jpg"
                                    alt="Tumblr avatar; photo of me in front of the Alcazar gardens, Sevilla, Spain"
                                    title="Alcazar gardens, Sevilla, Spain"
                                />
                                <span>Personal blog</span>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a href="http://rubeonrails.com">
                                <Image
                                    src="/images/home-tumblr-rubeonrails-avatar.jpg"
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
