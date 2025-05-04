import BrugesImage from '@public/images/britain-benelux-bruges-link.jpg'
import NetherlandsImage from '@public/images/britain-benelux-netherlands-link.jpg'
import ArgentinaImage from '@public/images/peru-argentina-link-colonia.jpg'
import BritainbeneluxImage from '@public/images/travel-britain-benelux.jpg'
import FranceImage from '@public/images/travel-france.jpg'
import GermanyImage from '@public/images/travel-germany.jpg'
import GreeceImage from '@public/images/travel-greece.jpg'
import PeruImage from '@public/images/travel-peru-argentina.jpg'
import SpainImage from '@public/images/travel-spain.jpg'
import TurkeyImage from '@public/images/travel-turkey.jpg'
import TravelImageUzbekistan from '@public/images/uzbekistan-khiva-night.jpg'
import Layout from '@src/components/common/Layout'
import Space from '@src/components/common/Space'
import TravelLinkList from '@src/components/site/TravelLinkList'
import WorldMap from '@src/components/site/WorldMap'
import countries from '@src/countries.json'

const currentYear = new Date().getFullYear()

const countryData: Array<[string, string | number]> = [['Country', 'Years since last visit']]

countries.visited.forEach((country) => {
    countryData.push([country.name, currentYear - Math.max(...country.yearsVisited)])
})

const numCountriesVisitedExceptBirthplace = countries.visited.length - 1

export default function Page() {
    return (
        <Layout
            title="Travel"
            keywords={[...countries.visited.map((country) => country.name), 'Europe', 'Asia', 'travel']}
        >
            <h1>Travel</h1>

            <section style={{ marginBottom: '6rem' }}>
                <h2>Countries I’ve been to</h2>
                <p>
                    The colors indicate how many years it’s been since I’ve traveled to each of these
                    <Space />
                    {numCountriesVisitedExceptBirthplace} countries
                </p>
                <details>
                    <summary
                        style={{
                            // Undo Tailwind's normalize
                            display: 'list-item',
                        }}
                    >
                        Full list of countries
                    </summary>

                    <p style={{ marginTop: '1rem' }}>
                        In alphabetical order, including the year(s) that I visited each one.
                    </p>

                    <ol style={{ marginLeft: '2rem' }}>
                        {countries.visited.map((country) => (
                            <li key={country.name}>
                                {country.name}{' '}
                                <span style={{ fontSize: 'smaller', color: '#ccc' }}>
                                    ({country.yearsVisited.join(', ')})
                                </span>
                            </li>
                        ))}
                    </ol>
                </details>
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
                            title: 'Uzbekistan',
                            className: 'bg-travel-bottom-middle',
                            url: '/travel/uzbekistan/',
                            imageSrc: TravelImageUzbekistan,
                            imageAlt: 'The façade of a mausoleum in Khiva',
                        },
                        {
                            title: 'Britain',
                            className: 'bg-travel-britain-benelux',
                            url: '/travel/britain/',
                            imageSrc: BritainbeneluxImage,
                            imageAlt: 'Big Ben, a black cab, and a red double-decker bus in Parliament Square',
                        },
                        {
                            title: 'Netherlands',
                            className: 'bg-travel-bottom-middle',
                            url: '/travel/netherlands/',
                            imageSrc: NetherlandsImage,
                            imageAlt: 'Westerkerk, overlooking an Amsterdam canal',
                        },
                        {
                            title: 'Peru',
                            className: 'bg-travel-peru-argentina',
                            url: '/travel/peru/',
                            imageSrc: PeruImage,
                            imageAlt: 'Kim holding a lamb and posing with two women in traditional Andean clothes',
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
                            title: 'France',
                            className: 'bg-travel-france',
                            url: '/travel/france/',
                            imageSrc: FranceImage,
                            imageAlt: 'The Seine River',
                        },
                        {
                            title: 'Argentina',
                            className: 'bg-peru-argentina-colonia',
                            url: 'https://get.google.com/albumarchive/116513687533678150554/album/AF1QipN0oaxdmD0r2Oe4Wf3Sh5iOMfbTjH1bicnpbUUd',
                            imageSrc: ArgentinaImage,
                            imageAlt: 'Old train in Colonia del Sacremento, Uruguay',
                        },
                    ]}
                />
            </section>
        </Layout>
    )
}
