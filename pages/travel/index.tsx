import Image from 'next/image'
import Layout from '../../src/layout/Layout'

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
                            <a className="bg-travel-britain-benelux" href="britain-benelux/">
                                <Image
                                    src="../img/travel-britain-benelux.jpg"
                                    alt="Big Ben, a black cab, and a red double-decker bus in Parliament Square"
                                />
                                <span>
                                    Britain &amp;
                                    <br />
                                    Benelux
                                </span>
                                <div className="image-cover"></div>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a className="bg-travel-peru-argentina" href="peru-argentina/">
                                <Image
                                    src="../img/travel-peru-argentina.jpg"
                                    alt="Kim holding a lamb and posing with two Andean women"
                                />
                                <span>Peru &amp; Argentina</span>
                                <div className="image-cover"></div>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a className="bg-travel-spain" href="spain/">
                                <Image
                                    src="../img/travel-spain.jpg"
                                    alt="Celebrating Spain's World Cup victory in Madrid"
                                />
                                <span>
                                    Spain,
                                    <br />
                                    Portugal,
                                    <br />
                                    &amp; Morocco
                                </span>
                                <div className="image-cover"></div>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a className="bg-travel-turkey" href="turkey/">
                                <Image
                                    src="../img/travel-turkey.jpg"
                                    alt="The Blue Mosque (Sultanahmet Camii), Istanbul, Turkey"
                                />
                                <span>Turkey</span>
                                <div className="image-cover"></div>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a className="bg-travel-germany" href="germany/">
                                <Image src="../img/travel-germany.jpg" alt="Spanish fans in Vienna for Euro 2008" />
                                <span>
                                    Germany
                                    <br />
                                    &amp; Austria
                                </span>
                                <div className="image-cover"></div>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a className="bg-travel-greece" href="greece/">
                                <Image src="../img/travel-greece.jpg" alt="Serifios, Greece" />
                                <span>Greece</span>
                                <div className="image-cover"></div>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a className="bg-travel-paris" href="paris/">
                                <Image src="../img/travel-paris.jpg" alt="Eiffel Tower" />
                                <span>Paris</span>
                                <div className="image-cover"></div>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns left">
                            <a className="bg-travel-france" href="france/">
                                <Image src="../img/travel-france.jpg" alt="The Seine River" />
                                <span>France</span>
                                <div className="image-cover"></div>
                            </a>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="travel-map">
                        <Image
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
