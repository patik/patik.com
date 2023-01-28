import imgTravelBritainbenelux from '../../public/images/travel-britain-benelux.jpg'
import imgTravelFrance from '../../public/images/travel-france.jpg'
import imgTravelGermany from '../../public/images/travel-germany.jpg'
import imgTravelGreece from '../../public/images/travel-greece.jpg'
import imgTravelParis from '../../public/images/travel-paris.jpg'
import imgTravelPeruargentina from '../../public/images/travel-peru-argentina.jpg'
import imgTravelSpain from '../../public/images/travel-spain.jpg'
import imgTravelTurkey from '../../public/images/travel-turkey.jpg'
import Layout from '../../src/components/Layout'
import TravelLinkList from '../../src/components/TravelLinkList'
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

                <TravelLinkList
                    items={[
                        {
                            title: (
                                <>
                                    Britain &amp;
                                    <br />
                                    Benelux
                                </>
                            ),
                            className: 'bg-travel-britain-benelux',
                            url: '/travel/britain-benelux/',
                            imageSrc: imgTravelBritainbenelux,
                            imageAlt: 'Big Ben, a black cab, and a red double-decker bus in Parliament Square',
                        },
                        {
                            title: <>Peru &amp; Argentina</>,
                            className: 'bg-travel-peru-argentina',
                            url: '/travel/peru-argentina/',
                            imageSrc: imgTravelPeruargentina,
                            imageAlt: 'Kim holding a lamb and posing with two Andean women',
                        },
                        {
                            title: (
                                <>
                                    Spain,
                                    <br />
                                    Portugal,
                                    <br />
                                    &amp; Morocco
                                </>
                            ),
                            className: 'bg-travel-spain',
                            url: '/travel/spain/',
                            imageSrc: imgTravelSpain,
                            imageAlt: "Celebrating Spain's World Cup victory in Madrid",
                        },
                        {
                            title: 'Turkey',
                            className: 'bg-travel-turkey',
                            url: '/travel/turkey/',
                            imageSrc: imgTravelTurkey,
                            imageAlt: 'The Blue Mosque (Sultanahmet Camii), Istanbul, Turkey',
                        },
                        {
                            title: (
                                <>
                                    Germany
                                    <br />
                                    &amp; Austria
                                </>
                            ),
                            className: 'bg-travel-germany',
                            url: '/travel/germany/',
                            imageSrc: imgTravelGermany,
                            imageAlt: 'Spanish fans in Vienna for Euro 2008',
                        },
                        {
                            title: 'Greece',
                            className: 'bg-travel-greece',
                            url: '/travel/greece/',
                            imageSrc: imgTravelGreece,
                            imageAlt: 'Serifios, Greece',
                        },
                        {
                            title: 'Paris',
                            className: 'bg-travel-paris',
                            url: '/travel/paris/',
                            imageSrc: imgTravelParis,
                            imageAlt: 'Eiffel Tower',
                        },
                        {
                            title: 'France',
                            className: 'bg-travel-france',
                            url: '/travel/france/',
                            imageSrc: imgTravelFrance,
                            imageAlt: 'The Seine River',
                        },
                    ]}
                />
            </section>
        </Layout>
    )
}
