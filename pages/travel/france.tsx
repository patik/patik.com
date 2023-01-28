import franceImage from '../../public/images/france-photos-link.jpg'
import parisImage from '../../public/images/paris-photos-link.jpg'
import Layout from '../../src/components/Layout'
import TravelLinkList from '../../src/components/TravelLinkList'

export default function Page() {
    return (
        <Layout title="France" keywords={['France', 'Paris', 'Nice', 'Avignon', 'Arles', 'Monaco', 'Europe', 'travel']}>
            <h1>France</h1>

            <p>
                This country holds a special place for Kim and I, being the place where we got to know each other,
                (later) got engaged, and (much later) celebrated our tenth wedding anniversary.
            </p>

            <hr />

            <section>
                <h2>2005</h2>
                <p>
                    In March 2005, we took a short trip to Paris, France. Our first self-planned and self-executed trip,
                    we revisited our first foray into Europe, got engaged, and took side trips to Chantilly and Mont St
                    Michel.
                </p>

                <h3>Photos</h3>
                <TravelLinkList
                    items={[
                        {
                            title: 'Paris',
                            className: 'bg-paris-photos',
                            url: 'https://get.google.com/albumarchive/116513687533678150554/album/AF1QipOLCedXTngEcwxcwNUHhlb1LeEZaONHfhTYdov0',
                            imageSrc: parisImage,
                            imageAlt: 'The Eiffel Tower as seen from Trocadero',
                        },
                    ]}
                />
            </section>

            <hr />

            <section>
                <h2>2000</h2>
                <p>
                    In April 2000, we took a short trip France with our high school French class. Our tour included
                    Paris, Nice, Avignon, Arles, and Monaco.
                </p>

                <h3>Photos</h3>
                <TravelLinkList
                    items={[
                        {
                            title: 'France',
                            className: 'bg-france-photos',
                            url: 'https://get.google.com/albumarchive/116513687533678150554/album/AF1QipMU0Jocw4DYeAwWODW-vqqi2pW8eul5MhKCiwSj',
                            imageSrc: franceImage,
                            imageAlt: 'The Eiffel Tower was lit up for the new millenium',
                        },
                    ]}
                />

                <h3>Itinerary</h3>
                <ul>
                    <li>Paris</li>
                    <li>Arles</li>
                    <li>Avignon</li>
                    <li>Monaco</li>
                    <li>Nice</li>
                </ul>
            </section>
        </Layout>
    )
}
