import Image from 'next/image'
import Layout from '../../../src/layout/Layout'
import parisImg from '../../../public/images/paris-photos-link.jpg'

export default function Page() {
    return (
        <Layout
            title="Peru &amp; Argentina"
            keywords={[
                'peru, argentina, cusco, machu picchu, buenos aires, amazon rainforest, lake titicaca, uruguay, panama canal, south america, travel',
            ]}
        >
            <div id="paris-main" role="main">
                <h1>Paris</h1>

                <section className="intro">
                    <p>
                        In March 2005, we took a short trip to Paris, France. Our first self-planned and self-executed
                        trip, we revisited our first foray into Europe, got engaged, and took side trips to Chantilly
                        and Mont St Michel.
                    </p>
                </section>

                <section>
                    <h2>Photos</h2>
                    <div className="row travel-link-list">
                        <div className="small-12 medium-6 large-4 columns">
                            <a
                                className="bg-paris-photos"
                                href="https://get.google.com/albumarchive/116513687533678150554/album/AF1QipOLCedXTngEcwxcwNUHhlb1LeEZaONHfhTYdov0#slideshow/5294679176651465778"
                            >
                                <Image src={parisImg} alt="The Eiffel Tower as seen from Trocadero" />
                                <span>Paris</span>
                                <div className="image-cover"></div>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}
