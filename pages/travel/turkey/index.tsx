import Image from 'next/image'
import Link from 'next/link'
import CappadociaImage from '../../../public/images/turkey-link-cappadocia.jpg'
import CiraliImage from '../../../public/images/turkey-link-cirali.jpg'
import EphesusImage from '../../../public/images/turkey-link-ephesus.jpg'
import IstanbulImage from '../../../public/images/turkey-link-istanbul.jpg'
import OverviewMap from '../../../public/images/turkey-overview-map-small.jpg'
import IntroFormatted from '../../../src/components/IntroFormatted'
import Layout from '../../../src/components/Layout'
import TravelLinkList from '../../../src/components/TravelLinkList'

export default function Page() {
    return (
        <Layout title="Turkey">
            <h1>Turkey</h1>

            <IntroFormatted>
                <p>
                    We visited Turkey in mid-July 2009 for 14 days. While the sights ranged from beautiful to amazing,
                    we were most fond of the delicious food and wonderful people.
                </p>
                <p>
                    I wrote a few <a href="https://patik.com/blog/category/turkey/">blog posts</a> about the trip.
                </p>
            </IntroFormatted>

            <section>
                <h2>Photos and Video</h2>

                <TravelLinkList
                    items={[
                        {
                            title: 'Istanbul',
                            className: 'bg-turkey-istanbul',
                            url: 'https://get.google.com/albumarchive/116513687533678150554/album/AF1QipPDOR3feuEb6n_QeSIZr3K-Q2pyyQI6Vgzw6hoD',
                            imageSrc: IstanbulImage,
                            imageAlt: 'The Blue Mosque at night',
                        },
                        {
                            title: 'Cappadocia',
                            className: 'bg-turkey-cappadocia',
                            url: 'https://get.google.com/albumarchive/116513687533678150554/album/AF1QipPaF_nDoQ4dpmjyBkPiBEGr6EDZjX_n0FPlD0_n',
                            imageSrc: CappadociaImage,
                            imageAlt: 'Hot air balloon over the rock formations in the Cappadocia region',
                        },
                        {
                            title: <>&Ccedil;&#305;ral&#305; &amp; Olympos</>,
                            className: 'bg-turkey-cirali',
                            url: 'https://get.google.com/albumarchive/116513687533678150554/album/AF1QipNFtSt5fXOCWi7L5slPU9fNVTQHOGN2tTZDj5sY',
                            imageSrc: CiraliImage,
                            imageAlt: 'Kim standing along the beach in Çirali',
                        },
                        {
                            title: 'Ephesus',
                            className: 'bg-turkey-ephesus',
                            url: 'https://get.google.com/albumarchive/116513687533678150554/album/AF1QipN3eMKjoyrn18oYgrwvukSKO4F3Mr7Lnm-t-e4W',
                            imageSrc: EphesusImage,
                            imageAlt: 'Storks nesting on top of tall but old stone columns',
                        },
                    ]}
                />
            </section>

            <section>
                <h2>Itinerary</h2>
                <ul>
                    <li>
                        <strong>Istanbul</strong>
                        <ul>
                            <li>
                                Sultanahmet: <a href="https://en.wikipedia.org/wiki/Hagia_Sophia">Hagia Sophia</a>,{' '}
                                <a href="https://en.wikipedia.org/wiki/Sultan_Ahmed_Mosque">Blue Mosque</a>,{' '}
                                <a href="https://www.cemberlitashamami.com/cemberlitas-bath-historical-turkish-bath/">
                                    &Ccedil;emberlita&#351; Hamami
                                </a>
                                , Grand Bazaar, and the{' '}
                                <a href="https://en.wikipedia.org/wiki/Rock'n_Coke">Rock’n Coke Festival</a>
                            </li>
                            <li>Beyo&#287;lu: Taksim Square, Istiklal Caddesi, Galata Bridge, Galata Tower</li>
                            <li>
                                Kad&#305;k&ouml;y: open markets,{' '}
                                <a href="https://en.wikipedia.org/wiki/%C5%9E%C3%BCkr%C3%BC_Saraco%C4%9Flu_Stadium">
                                    Fenerbah&ccedil;e stadium
                                </a>
                            </li>
                            <li>
                                Bosphorus Strait and{' '}
                                <a href="https://en.wikipedia.org/wiki/Yoros_Castle">Anadolu Kava&#287;&#305;</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="https://en.wikipedia.org/wiki/Cappadocia">
                            <strong>Cappadocia</strong>
                        </a>
                        : <a href="https://en.wikipedia.org/wiki/G%C3%B6reme">G&ouml;reme</a>, Fairy Chimneys
                    </li>
                    <li>
                        <a href="https://en.wikipedia.org/wiki/%C3%87%C4%B1ral%C4%B1">
                            <strong>&Ccedil;&#305;ral&#305;</strong>
                        </a>
                        : the unspoiled beach, the ruins of Olympos, and the fiery Chimeras
                    </li>
                    <li>
                        <a href="https://en.wikipedia.org/wiki/Ephesus">
                            <strong>Ephesus</strong>
                        </a>{' '}
                        and the town of Sel&ccedil;uk
                    </li>
                </ul>

                <div className="travel-map">
                    <Link href="/images/turkey-overview-map.jpg">
                        <Image
                            src={OverviewMap}
                            alt="Photos of the places we visited superimposed on a map."
                            title="Click for a larger version"
                        />
                    </Link>
                </div>
            </section>
        </Layout>
    )
}
