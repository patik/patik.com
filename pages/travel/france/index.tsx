import imageSrc from '../../../public/images/france-photos-link.jpg'
import IntroFormatted from '../../../src/components/IntroFormatted'
import Layout from '../../../src/components/Layout'
import TravelLinkList from '../../../src/components/TravelLinkList'

export default function Page() {
    return (
        <Layout title="France" keywords={['france', 'paris', 'nice', 'avignon', 'arles', 'monaco', 'europe', 'travel']}>
            <h1>France</h1>

            <IntroFormatted>
                In April 2000, we took a short trip France with our high school French class. Our tour included Paris,
                Nice, Avignon, Arles, and Monaco.
            </IntroFormatted>

            <section>
                <h2>Photos</h2>
                <TravelLinkList
                    items={[
                        {
                            title: 'France',
                            className: 'bg-france-photos',
                            url: 'https://get.google.com/albumarchive/116513687533678150554/album/AF1QipMU0Jocw4DYeAwWODW-vqqi2pW8eul5MhKCiwSj',
                            imageSrc,
                            imageAlt: 'The Eiffel Tower was lit up for the new millenium',
                        },
                    ]}
                />
            </section>
        </Layout>
    )
}
