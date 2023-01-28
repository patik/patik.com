import BrugesImage from '../public/images/britain-benelux-bruges-link.jpg'
import NetherlandsImage from '../public/images/britain-benelux-netherlands-link.jpg'
import BritainbeneluxImage from '../public/images/travel-britain-benelux.jpg'
import FranceImage from '../public/images/travel-france.jpg'
import GermanyImage from '../public/images/travel-germany.jpg'
import GreeceImage from '../public/images/travel-greece.jpg'
import ParisImage from '../public/images/travel-paris.jpg'
import PeruArgentinaImage from '../public/images/travel-peru-argentina.jpg'
import SpainImage from '../public/images/travel-spain.jpg'
import TurkeyImage from '../public/images/travel-turkey.jpg'
import Layout from '../src/components/Layout'
import TravelLinkList from '../src/components/TravelLinkList'
import WorldMap from '../src/components/WorldMap'
import countries from '../src/countries.json'

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
                <WorldMap />
            </section>

            <section>
                <h2>Photos</h2>
                <p>
                    <em>
                        Not shown: many notable trips since 2012, including Southeast Asia, Eastern Europe, and much
                        more of Europe
                    </em>
                </p>

                <TravelLinkList
                    items={[
                        {
                            title: 'Britain',

                            className: 'bg-travel-britain-benelux',
                            url: '/travel/britain/',
                            imageSrc: BritainbeneluxImage,
                            imageAlt: 'Big Ben, a black cab, and a red double-decker bus in Parliament Square',
                        },
                        {
                            title: 'Netherlands',
                            className: 'bg-netherlands-amsterdam',
                            url: '/travel/netherlands/',
                            imageSrc: NetherlandsImage,
                            imageAlt: 'Westerkerk overlooking an Amsterdam canal',
                        },
                        {
                            title: <>Peru &amp; Argentina</>,
                            className: 'bg-travel-peru-argentina',
                            url: '/travel/peru-argentina/',
                            imageSrc: PeruArgentinaImage,
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
                            imageSrc: SpainImage,
                            imageAlt: "Celebrating Spain's World Cup victory in Madrid",
                        },
                        {
                            title: 'Turkey',
                            className: 'bg-travel-turkey',
                            url: '/travel/turkey/',
                            imageSrc: TurkeyImage,
                            imageAlt: 'The Blue Mosque (Sultanahmet Camii), Istanbul, Turkey',
                        },
                        {
                            title: 'Belgium',
                            className: 'bg-belgium-bruges',
                            url: '/travel/belgium/',
                            imageSrc: BrugesImage,
                            imageAlt: 'Windmill in the Belgian countryside',
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
                            imageSrc: GermanyImage,
                            imageAlt: 'Spanish fans in Vienna for Euro 2008',
                        },
                        {
                            title: 'Greece',
                            className: 'bg-travel-greece',
                            url: '/travel/greece/',
                            imageSrc: GreeceImage,
                            imageAlt: 'Serifios, Greece',
                        },
                        {
                            title: 'Paris',
                            className: 'bg-travel-paris',
                            url: '/travel/paris/',
                            imageSrc: ParisImage,
                            imageAlt: 'Eiffel Tower',
                        },
                        {
                            title: 'France',
                            className: 'bg-travel-france',
                            url: '/travel/france/',
                            imageSrc: FranceImage,
                            imageAlt: 'The Seine River',
                        },
                    ]}
                />
            </section>
        </Layout>
    )
}
