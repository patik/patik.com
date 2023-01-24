import Image from 'next/image'
import Link from 'next/link'
import imgTravelBritainbenelux from '../../public/images/travel-britain-benelux.jpg'
import imgTravelFrance from '../../public/images/travel-france.jpg'
import imgTravelGermany from '../../public/images/travel-germany.jpg'
import imgTravelGreece from '../../public/images/travel-greece.jpg'
import imgTravelParis from '../../public/images/travel-paris.jpg'
import imgTravelPeruargentina from '../../public/images/travel-peru-argentina.jpg'
import imgTravelSpain from '../../public/images/travel-spain.jpg'
import imgTravelTurkey from '../../public/images/travel-turkey.jpg'
import Layout from '../../src/components/Layout'
import WorldMap from '../../src/components/WorldMap'
import countries from '../../src/countries.json'

const currentYear = new Date().getFullYear()

const countryData: Array<[string, string | number]> = [['Country', 'Years since last visit']]

countries.visited.forEach((country) => {
    countryData.push([country.name, currentYear - Math.max(...country.yearsVisited)])
})

export default function Page() {
    return (
        <Layout
            title="Travel"
            keywords={['turkey', 'istanbul', 'cappadocia', 'cirali', 'selcuk', 'ephesus', 'europe', 'travel']}
        >
            <div id="travel-main" role="main">
                <h1>Travel</h1>

                <section style={{ marginBottom: '6rem' }}>
                    <h2>Countries I’ve been to</h2>
                    <p style={{ marginLeft: '1rem' }}>
                        Color-coded based on how many years it’s been since I’ve traveled to each one
                    </p>
                    <WorldMap className="row" />
                </section>

                <section>
                    <h2>Photos</h2>
                    <p style={{ marginLeft: '1rem' }}>
                        <em>
                            Not shown: many notable trips since 2012, including Southeast Asia, Eastern Europe, and much
                            more of Europe
                        </em>
                    </p>
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
            </div>
        </Layout>
    )
}
