import Image from 'next/image'
import Layout from '../../../src/layout/Layout'

export default function Page() {
    return (
        <Layout
            title="Peru &amp; Argentina"
            keywords={[
                'peru, argentina, cusco, machu picchu, buenos aires, amazon rainforest, lake titicaca, uruguay, panama canal, south america, travel',
            ]}
        >
            <div id="peru-argentina-main" role="main">
                <h1>Peru &amp; Argentina</h1>

                <section className="intro">
                    <p>
                        Our first forage into the southern hemisphere brought us everywhere from the Amazon rainforest
                        and Machu Picchu to Europe-esque Buenos Aires and a quiet estancia.
                    </p>
                </section>

                <section>
                    <h2>Photos and Video</h2>
                    <div className="row travel-link-list">
                        <div className="small-12 medium-6 large-4 columns">
                            <a
                                className="bg-peru-argentina-amazon"
                                href="https://picasaweb.google.com/116513687533678150554/AmazonRainforest#slideshow/5638173949189577330"
                            >
                                <Image src="/images/peru-argentina-link-amazon.jpg" alt="Wooley monkey" />
                                <span>Amazon Rainforest</span>
                                <div className="image-cover"></div>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a
                                className="bg-peru-argentina-cusco"
                                href="https://picasaweb.google.com/116513687533678150554/Cusco#slideshow/5637849631486614658"
                            >
                                <Image
                                    src="/images/peru-argentina-link-cusco.jpg"
                                    alt="Kim holding a lamb and posing with Andean women"
                                />
                                <span>Cusco</span>
                                <div className="image-cover"></div>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns left">
                            <a
                                className="bg-peru-argentina-colonia"
                                href="https://picasaweb.google.com/116513687533678150554/ColoniaDelSacramento#slideshow/5637820814953351506"
                            >
                                <Image
                                    src="/images/peru-argentina-link-colonia.jpg"
                                    alt="Old train in Colonia del Sacremento, Uruguay"
                                />
                                <span>Colonia del Sacramento</span>
                                <div className="image-cover"></div>
                            </a>
                        </div>
                    </div>
                </section>

                <section>
                    <h2>Itinerary</h2>
                    <ul>
                        <li>
                            The pristine <a href="http://www.perujungle.com/">Amazon Rainforest</a> near Iquitos, Peru
                        </li>
                        <li>
                            High-altitude <a href="http://wikitravel.org/en/Cuzco">Cusco</a> with its many nearby Incan
                            ruins
                        </li>
                        <li>
                            The incomparable <a href="http://wikitravel.org/en/Machu_Picchu">Machu Picchu</a>, an
                            untouched ancient Incan city high in the Andes mountains
                        </li>
                        <li>
                            An unforgettable, leisurely ride on the{' '}
                            <a href="http://www.go2peru.com/andean_explorer.htm">Andean Explorer</a>, winding through
                            the Andes from Cuzco to Lake Titicaca
                        </li>
                        <li>
                            <a href="http://en.wikipedia.org/wiki/Lake_Titicaca">Lake Titicaca</a>, the world’s highest
                            navigable lake and home to{' '}
                            <a href="http://en.wikipedia.org/wiki/Uru_people">floating islands</a> and{' '}
                            <a href="http://en.wikipedia.org/wiki/Taquile">centuries-old cultures</a>
                        </li>
                        <li>
                            Beautiful <a href="http://wikitravel.org/en/Buenos_Aires">Buenos Aires</a>, a wonderful
                            blend of Barcelona and Italy
                        </li>
                        <li>
                            A rural <a href="http://en.wikipedia.org/wiki/Estancia">Estancia</a>, with horseback riding
                            and the famed Argentine beef <a href="http://en.wikipedia.org/wiki/Asado">asado</a>
                        </li>
                        <li>
                            Quaint <a href="http://wikitravel.org/en/Colonia">Colonia del Sacramento</a>, the oldest
                            town in Uruguay and just a short ferry ride across the Rio de la Plata from Buenos Aires
                        </li>
                    </ul>

                    <div className="travel-map">
                        <a href="/images/peru-argentina-map.png">
                            <Image
                                src="/images/peru-argentina-map-small.png"
                                alt="Map of South America with each location noted and annotated with a photo"
                                title="Click for a larger version"
                            />
                        </a>
                    </div>
                </section>
            </div>
        </Layout>
    )
}
