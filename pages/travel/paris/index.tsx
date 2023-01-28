import imageSrc from '../../../public/images/paris-photos-link.jpg'
import IntroFormatted from '../../../src/components/IntroFormatted'
import Layout from '../../../src/components/Layout'
import TravelLinkList from '../../../src/components/TravelLinkList'

export default function Page() {
    return (
        <Layout
            title="Peru &amp; Argentina"
            keywords={[
                'peru, argentina, cusco, machu picchu, buenos aires, amazon rainforest, lake titicaca, uruguay, panama canal, south america, travel',
            ]}
        >
            <h1>Paris</h1>

            <IntroFormatted>
                In March 2005, we took a short trip to Paris, France. Our first self-planned and self-executed trip, we
                revisited our first foray into Europe, got engaged, and took side trips to Chantilly and Mont St Michel.
            </IntroFormatted>

            <section>
                <h2>Photos</h2>

                <TravelLinkList
                    items={[
                        {
                            title: 'Paris',
                            className: 'bg-paris-photos',
                            url: 'https://get.google.com/albumarchive/116513687533678150554/album/AF1QipOLCedXTngEcwxcwNUHhlb1LeEZaONHfhTYdov0',
                            imageSrc,
                            imageAlt: 'The Eiffel Tower as seen from Trocadero',
                        },
                    ]}
                />
            </section>
        </Layout>
    )
}
