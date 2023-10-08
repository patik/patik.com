import ColoniaImage from '@public/images/peru-argentina-link-colonia.jpg'
import MapSmall from '@public/images/peru-argentina-map-small.png'
import Layout from '@src/components/common/Layout'
import Space from '@src/components/common/Space'
import TravelLinkList from '@src/components/site/TravelLinkList'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
    return (
        <Layout title="Argentina" keywords={['argentina', 'buenos aires', 'uruguay', 'south america', 'travel']}>
            <h1>Argentina &amp; Uruguay</h1>

            <p>
                Our first forage into the southern hemisphere brought us everywhere from the
                <Space />
                <Link href="/travel/peru/">Amazon rainforest and Machu Picchu</Link>
                <Space />
                to Europe-esque Buenos Aires and a quiet estancia.
            </p>

            <section>
                <h2>Photos and Video</h2>

                <TravelLinkList
                    items={[
                        {
                            title: 'Colonia del Sacramento',
                            className: 'bg-peru-argentina-colonia',
                            url: 'https://get.google.com/albumarchive/116513687533678150554/album/AF1QipN0oaxdmD0r2Oe4Wf3Sh5iOMfbTjH1bicnpbUUd',
                            imageSrc: ColoniaImage,
                            imageAlt: 'Old train in Colonia del Sacremento, Uruguay',
                        },
                    ]}
                />
            </section>

            <section>
                <h2>Itinerary</h2>
                <ul>
                    <li>
                        The pristine <a href="https://www.perujungle.com/">Amazon Rainforest</a> near Iquitos, Peru
                    </li>
                    <li>
                        High-altitude <a href="https://wikitravel.org/en/Cuzco">Cusco</a> with its many nearby Incan
                        ruins
                    </li>
                    <li>
                        The incomparable <a href="https://wikitravel.org/en/Machu_Picchu">Machu Picchu</a>, an untouched
                        ancient Incan city high in the Andes mountains
                    </li>
                    <li>
                        An unforgettable, leisurely ride on the
                        <Space />
                        <a href="https://www.belmond.com/trains/south-america/peru/belmond-andean-explorer/">
                            Andean Explorer
                        </a>
                        , winding through the Andes from Cuzco to Lake Titicaca
                    </li>
                    <li>
                        <a href="httpw://en.wikipedia.org/wiki/Lake_Titicaca">Lake Titicaca</a>, the world’s highest
                        navigable lake and home to
                        <Space />
                        <a href="https://en.wikipedia.org/wiki/Uru_people">floating islands</a> and
                        <Space />
                        <a href="https://en.wikipedia.org/wiki/Taquile">centuries-old cultures</a>
                    </li>
                    <li>
                        Beautiful <a href="https://wikitravel.org/en/Buenos_Aires">Buenos Aires</a>, a wonderful blend
                        of Barcelona and Italy
                    </li>
                    <li>
                        A rural <a href="https://en.wikipedia.org/wiki/Estancia">Estancia</a>, with horseback riding and
                        the famed Argentine beef <a href="https://en.wikipedia.org/wiki/Asado">asado</a>
                    </li>
                    <li>
                        Quaint <a href="https://wikitravel.org/en/Colonia">Colonia del Sacramento</a>, the oldest town
                        in Uruguay and just a short ferry ride across the Rio de la Plata from Buenos Aires
                    </li>
                </ul>

                <div className="travel-map">
                    <a href="/images/peru-argentina-map.png">
                        <Image
                            src={MapSmall}
                            alt="Map of South America with each location noted and annotated with a photo"
                            title="Click for a larger version"
                        />
                    </a>
                </div>
            </section>
        </Layout>
    )
}
