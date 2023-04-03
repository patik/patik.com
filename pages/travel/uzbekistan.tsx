import Image from 'next/image'
import Link from 'next/link'
import itineraryMapSmall from '../../public/images/spain-itinerary-map-small.jpg'
import linkWorlCup from '../../public/images/spain-link-world-cup.jpg'
import Layout from '../../src/components/common/Layout'
import Space from '../../src/components/common/Space'
import TravelLinkList from '../../src/components/site/TravelLinkList'

export default function Page() {
    return (
        <Layout
            title="Uzbekistan"
            keywords={[
                'Uzbekistan',
                'Tashkent',
                'Bukhara',
                'Samarkand',
                'Khiva',
                'Asia',
                'Central Asia',
                'Silk road',
                'travel',
            ]}
        >
            <h1>Uzbekistan</h1>

            <p>intro text</p>

            <section>
                <h2>Photos and Video</h2>

                <TravelLinkList
                    items={[
                        {
                            title: (
                                <>
                                    2010
                                    <br />
                                    World Cup
                                </>
                            ),
                            className: 'bg-spain-world-cup',
                            url: 'https://picasaweb.google.com/116513687533678150554/WorldCup2010InMadrid',
                            imageSrc: linkWorlCup,
                            imageAlt: "Celebrating Spain's victory in Madrid",
                        },
                    ]}
                />
            </section>

            <section>
                <h2>Itinerary</h2>
                <ul>
                    <li>
                        Coastal <a href="https://wikitravel.org/en/Lisbon">Lisbon</a>, Portugal, home of
                        <Space />
                        <a href="https://en.wikipedia.org/wiki/Fado">fado</a> and its history of world discovery
                    </li>
                    <li>
                        Many <a href="https://wikitravel.org/en/Madrid">Madrid</a> tapas crawls
                        <ul>
                            <li>Santiago Bernabeu, home of Real Madrid</li>
                            <li>
                                Coinciding with the
                                <Space />
                                <a href="https://en.wikipedia.org/wiki/2010_FIFA_World_Cup">World Cup</a> final
                            </li>
                        </ul>
                    </li>
                    <li>
                        Medieval <a href="https://wikitravel.org/en/Toledo_%28Spain%29">Toledo</a>, the opulent former
                        capital
                    </li>
                    <li>
                        <a href="https://wikitravel.org/en/Sevilla">Sevilla</a>, our base for Andalusia. Once ruled by
                        the Muslim Moors, it&rsquo;s now the bullfight-and-flamenco hotspot that is the most
                        traditionally Spanish region in Spain. Think Don Juan and Carmen.
                    </li>
                    <li>
                        <a href="https://wikitravel.org/en/Tangier">Tangier</a>, Morocco, a quick ferry ride but a world
                        away from the southern tip of Spain
                    </li>
                    <li>
                        Bustling <a href="https://wikitravel.org/en/Barcelona">Barcelona</a>, capital of Catalunya and
                        countless confectionaries
                        <ul>
                            <li>Camp Nou, the legendary home of FC Barcelona</li>
                            <li>
                                <a href="https://en.wikipedia.org/wiki/Sagrada_Fam%C3%ADlia">Segrada Fam&iacute;lia</a>,
                                a still-in-the-works Gaud&iacute; masterpiece
                            </li>
                        </ul>
                    </li>
                </ul>

                <div className="travel-map">
                    <Link href="/images/spain-itinerary-map.jpg">
                        <Image
                            src={itineraryMapSmall}
                            alt="Map of Western Europe with each location noted and annotated with a photo"
                            title="Click for a larger version"
                        />
                    </Link>
                </div>
            </section>
        </Layout>
    )
}
