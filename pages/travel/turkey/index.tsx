import Image from 'next/image'
import Layout from '../../../src/layout/Layout'
import imgLinkCappadocia from '../../../public/images/turkey-link-cappadocia.jpg'
import imgLinkCirali from '../../../public/images/turkey-link-cirali.jpg'
import imgLinkEphesus from '../../../public/images/turkey-link-ephesus.jpg'
import imgLinkIstanbul from '../../../public/images/turkey-link-istanbul.jpg'
import imgOverviewMap from '../../../public/images/turkey-overview-map-small.jpg'

export default function Page() {
    return (
        <Layout title="Turkey">
            <div id="turkey-main" role="main">
                <h1>Turkey</h1>

                <div className="intro">
                    <p>
                        We visited Turkey in mid-July 2009 for 14 days. While the sights ranged from beautiful to
                        amazing, we were most fond of the delicious food and wonderful people.
                    </p>
                    <p>
                        I wrote a few <a href="https://patik.com/blog/category/turkey/">blog posts</a> about the trip.
                    </p>
                </div>

                <section>
                    <h2>Photos and Video</h2>
                    <div className="row travel-link-list">
                        <div className="small-12 medium-6 large-4 columns">
                            <a
                                className="bg-turkey-istanbul"
                                href="https://get.google.com/albumarchive/116513687533678150554/album/AF1QipPDOR3feuEb6n_QeSIZr3K-Q2pyyQI6Vgzw6hoD"
                            >
                                <Image src={imgLinkIstanbul} alt="The Blue Mosque at night" />
                                <span>Istanbul</span>
                                <div className="image-cover"></div>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a
                                className="bg-turkey-cappadocia"
                                href="https://get.google.com/albumarchive/116513687533678150554/album/AF1QipPaF_nDoQ4dpmjyBkPiBEGr6EDZjX_n0FPlD0_n"
                            >
                                <Image
                                    src={imgLinkCappadocia}
                                    alt="Hot air balloon over the rock formations in the Cappadocia region"
                                />
                                <span>Cappadocia</span>
                                <div className="image-cover"></div>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a
                                className="bg-turkey-cirali"
                                href="https://get.google.com/albumarchive/116513687533678150554/album/AF1QipNFtSt5fXOCWi7L5slPU9fNVTQHOGN2tTZDj5sY"
                            >
                                <Image src={imgLinkCirali} alt="Kim standing along the beach in Çirali" />
                                <span>&Ccedil;&#305;ral&#305; &amp; Olympos</span>
                                <div className="image-cover"></div>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns left">
                            <a
                                className="bg-turkey-ephesus"
                                href="https://get.google.com/albumarchive/116513687533678150554/album/AF1QipN3eMKjoyrn18oYgrwvukSKO4F3Mr7Lnm-t-e4W"
                            >
                                <Image src={imgLinkEphesus} alt="Ephesus" />
                                <span>Ephesus</span>
                                <div className="image-cover"></div>
                            </a>
                        </div>
                    </div>
                </section>

                <section>
                    <h2>Itinerary</h2>
                    <ul>
                        <li>
                            {' '}
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
                        <a href="../../img/turkey-overview-map.jpg">
                            <Image
                                src={imgOverviewMap}
                                alt="Photos of the places we visited superimposed on a map."
                                title="Click for a larger version"
                            />
                        </a>
                    </div>
                </section>
            </div>
        </Layout>
    )
}
