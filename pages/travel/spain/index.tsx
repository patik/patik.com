import Image from 'next/image'
import itineraryMapSmall from '../../../public/images/spain-itinerary-map-small.jpg'
import linkWorlCup from '../../../public/images/spain-link-world-cup.jpg'
import Layout from '../../../src/layout/Layout'

export default function Page() {
    return (
        <Layout
            title="Spain"
            keywords={[
                'spain',
                'portugal',
                'madrid',
                'barcelona',
                'sevilla',
                '2010 world cup',
                'lisbon',
                'tangier',
                'tanger',
                'europe',
                'travel',
            ]}
        >
            <div id="spain-main" role="main">
                <h1>Spain, Portugal, &amp; Morocco</h1>

                <section className="intro">
                    <p>
                        Like <a href="http://en.wikipedia.org/wiki/Paul_the_Octopus">Pulpo Paul</a>, Kim and I had an
                        inkling that Spain would win the 2010 World Cup. We booked a trip for what would be the
                        experience of a lifetime &mdash; being enveloped in a{' '}
                        <a href="https://get.google.com/albumarchive/116513687533678150554/album/AF1QipPNxvXhMsdwQtb6jmK0uP9zCBw7p9uCfDAu7udO">
                            massive celebration in Madrid
                        </a>
                        .
                    </p>
                </section>

                <section>
                    <h2>Photos and Video</h2>
                    <div className="row travel-link-list">
                        <div className="small-12 medium-6 large-4 columns">
                            <a
                                className="bg-spain-world-cup"
                                href="https://picasaweb.google.com/116513687533678150554/WorldCup2010InMadrid"
                            >
                                <Image src={linkWorlCup} alt="Celebrating Spain's victory in Madrid" />
                                <span>
                                    2010
                                    <br />
                                    World Cup
                                </span>
                                <div className="image-cover"></div>
                            </a>
                        </div>
                    </div>
                </section>

                <section>
                    <h2>Itinerary</h2>
                    <ul>
                        <li>
                            Coastal <a href="http://wikitravel.org/en/Lisbon">Lisbon</a>, Portugal, home of{' '}
                            <a href="http://worldmusiccentral.org/dokuwiki/doku.php?id=fado">fado</a> and its history of
                            world discovery
                        </li>
                        <li>
                            Many <a href="http://wikitravel.org/en/Madrid">Madrid</a> tapas crawls
                            <ul>
                                <li>Santiago Bernabeu, home of Real Madrid</li>
                                <li>
                                    Coinciding with the{' '}
                                    <a href="http://en.wikipedia.org/wiki/2010_FIFA_World_Cup">World Cup</a> final
                                </li>
                            </ul>
                        </li>
                        <li>
                            Medieval <a href="http://wikitravel.org/en/Toledo_%28Spain%29">Toledo</a>, the opulent
                            former capital
                        </li>
                        <li>
                            <a href="http://wikitravel.org/en/Sevilla">Sevilla</a>, our base for Andalusia. Once ruled
                            by the Muslim Moors, it&rsquo;s now the bullfight-and-flamenco hotspot that is the most
                            traditionally Spanish region in Spain. Think Don Juan and Carmen.
                        </li>
                        <li>
                            <a href="http://wikitravel.org/en/Tangier">Tangier</a>, Morocco, a quick ferry ride but a
                            world away from the southern tip of Spain
                        </li>
                        <li>
                            Bustling <a href="http://wikitravel.org/en/Barcelona">Barcelona</a>, capital of Catalunya
                            and countless confectionaries
                            <ul>
                                <li>Camp Nou, the legendary home of FC Barcelona</li>
                                <li>
                                    <a href="http://en.wikipedia.org/wiki/Sagrada_Fam%C3%ADlia">
                                        Segrada Fam&iacute;lia
                                    </a>
                                    , a still-in-the-works Gaud&iacute; masterpiece
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <div className="travel-map">
                        <a href="/images/spain-itinerary-map.jpg">
                            <Image
                                src={itineraryMapSmall}
                                alt="Map of Western Europe with each location noted and annotated with a photo"
                                title="Click for a larger version"
                            />
                        </a>
                    </div>
                </section>
            </div>
        </Layout>
    )
}
