import Image from 'next/image'
import imgGermanyBavariaLink from '../../../public/images/germany-bavaria-link.jpg'
import imgGermanyBerlinLink from '../../../public/images/germany-berlin-link.jpg'
import imgGermanyAustriaLink from '../../../public/images/germany-austria-link.jpg'
import Layout from '../../../src/components/Layout'

export default function Page() {
    return (
        <Layout
            title="Germany &amp; Austria"
            keywords={[
                'germany',
                'austria',
                'euro 2008',
                'munich',
                'bavaria',
                'rothenburg ob der tauber',
                'vienna',
                'salzburg',
                'mauthausen',
                'berlin',
                'rhine river',
                'bacharach',
                'europe',
                'travel',
            ]}
        >
            <div id="germany-main" role="main">
                <h1>Germany &amp; Austria</h1>

                <section className="intro">
                    <p>
                        In June/July 2008, we took a trip around Austria and Germany. Along the way we saw the Euro 2008
                        final come to Vienna, soaked up the Sound of Music in Salzburg, and took in the solemnity of the
                        Mauthausen-Gusen concentration camp.
                    </p>
                    <p>
                        On to <a href="https://wikitravel.org/en/Bavaria">Bavaria</a> and Germany, we mixed munchies and{' '}
                        <a href="https://en.wikipedia.org/wiki/Beer_stein">Maß</a> in Munich, toured through Nuremberg,
                        walked the wall around{' '}
                        <a href="https://wikitravel.org/en/Rothenburg_ob_der_Tauber">Rothenburg</a>, cruised up the
                        castle-studded <a href="https://wikitravel.org/en/Rhine_Valley">Rhine</a>, and reveled in the
                        20th Century history of Berlin.
                    </p>
                </section>

                <section>
                    <h2>Photos and Video</h2>
                    <div className="row travel-link-list">
                        <div className="small-12 medium-6 large-4 columns">
                            <a
                                className="bg-germany-austria"
                                href="https://get.google.com/albumarchive/116513687533678150554/album/AF1QipNE-TmD-UPWM7uIBh_08MWJsSCELd4Huol4UokA"
                            >
                                <Image
                                    src={imgGermanyAustriaLink}
                                    alt="Spanish fans gathering in Vienna for Euro 2008"
                                />
                                <span>Austria</span>
                                <div className="image-cover"></div>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a
                                className="bg-germany-bavaria"
                                href="https://get.google.com/albumarchive/116513687533678150554/album/AF1QipMvUQMar4-AhAVp56ZeyzQDvIf_gSzYsSDLRcRZ"
                            >
                                <Image src={imgGermanyBavariaLink} alt="Enjoying a liter at Hofbräuhaus" />
                                <span>Bavaria</span>
                                <div className="image-cover"></div>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns left">
                            <a
                                className="bg-germany-berlin"
                                href="https://get.google.com/albumarchive/116513687533678150554/album/AF1QipNFxJeLnNx3fFuW7oM4SOTiZo_zx5G9rr3THx2v"
                            >
                                <Image src={imgGermanyBerlinLink} alt="Brandenberg Gate, Berlin" />
                                <span>
                                    Berlin &amp;
                                    <br />
                                    The Rhine
                                </span>
                                <div className="image-cover"></div>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}
