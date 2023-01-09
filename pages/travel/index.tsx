import Image from 'next/image'
import Layout from '../../src/layout/Layout'
import imgTravelBritainbenelux from '../../public/images/travel-britain-benelux.jpg'
import imgTravelFrance from '../../public/images/travel-france.jpg'
import imgTravelGermany from '../../public/images/travel-germany.jpg'
import imgTravelGreece from '../../public/images/travel-greece.jpg'
import imgTravelParis from '../../public/images/travel-paris.jpg'
import imgTravelPeruargentina from '../../public/images/travel-peru-argentina.jpg'
import imgTravelSpain from '../../public/images/travel-spain.jpg'
import imgTravelTurkey from '../../public/images/travel-turkey.jpg'
import Link from 'next/link'

export default function Page() {
    return (
        <Layout
            title="Travel"
            keywords={['turkey', 'istanbul', 'cappadocia', 'cirali', 'selcuk', 'ephesus', 'europe', 'travel']}
        >
            <div id="travel-main" role="main">
                <h1>Travel</h1>

                <section>
                    <p>
                        <em>
                            Not shown below are notable trips to Vietnam, Thailand, Cambodia, and much more of Germany.
                        </em>
                    </p>
                </section>

                <section>
                    <div className="row travel-link-list">
                        <div className="small-12 medium-6 large-4 columns">
                            <Link className="bg-travel-britain-benelux" href="/travel/britain-benelux/">
                                <Image
                                    src={imgTravelBritainbenelux}
                                    alt="Big Ben, a black cab, and a red double-decker bus in Parliament Square"
                                />
                                <span>
                                    Britain &amp;
                                    <br />
                                    Benelux
                                </span>
                                <div className="image-cover"></div>
                            </Link>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <Link className="bg-travel-peru-argentina" href="/travel/peru-argentina/">
                                <Image
                                    src={imgTravelPeruargentina}
                                    alt="Kim holding a lamb and posing with two Andean women"
                                />
                                <span>Peru &amp; Argentina</span>
                                <div className="image-cover"></div>
                            </Link>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <Link className="bg-travel-spain" href="/travel/spain/">
                                <Image src={imgTravelSpain} alt="Celebrating Spain's World Cup victory in Madrid" />
                                <span>
                                    Spain,
                                    <br />
                                    Portugal,
                                    <br />
                                    &amp; Morocco
                                </span>
                                <div className="image-cover"></div>
                            </Link>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <Link className="bg-travel-turkey" href="/travel/turkey/">
                                <Image
                                    src={imgTravelTurkey}
                                    alt="The Blue Mosque (Sultanahmet Camii), Istanbul, Turkey"
                                />
                                <span>Turkey</span>
                                <div className="image-cover"></div>
                            </Link>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <Link className="bg-travel-germany" href="/travel/germany/">
                                <Image src={imgTravelGermany} alt="Spanish fans in Vienna for Euro 2008" />
                                <span>
                                    Germany
                                    <br />
                                    &amp; Austria
                                </span>
                                <div className="image-cover"></div>
                            </Link>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <Link className="bg-travel-greece" href="/travel/greece/">
                                <Image src={imgTravelGreece} alt="Serifios, Greece" />
                                <span>Greece</span>
                                <div className="image-cover"></div>
                            </Link>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <Link className="bg-travel-paris" href="/travel/paris/">
                                <Image src={imgTravelParis} alt="Eiffel Tower" />
                                <span>Paris</span>
                                <div className="image-cover"></div>
                            </Link>
                        </div>
                        <div className="small-12 medium-6 large-4 columns left">
                            <Link className="bg-travel-france" href="/travel/france/">
                                <Image src={imgTravelFrance} alt="The Seine River" />
                                <span>France</span>
                                <div className="image-cover"></div>
                            </Link>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="travel-map">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="http://chart.apis.google.com/chart?cht=t&chs=440x220&chd=s:_&chtm=world&chco=FFFFFF,FF0000,FFFF00,00FF00&chld=PE|AR|FR|GR|DE|AT|TR|PT|ES|MA&chd=t:0,10,40,40,60,80,80,80,80,80&chf=bg,s,EAF7FE"
                            alt="Map with countries that I've been to highlighted"
                            title="Countries that I've visited"
                        />
                    </div>
                </section>
            </div>
        </Layout>
    )
}
