import imgGermanyAustriaLink from '../../../public/images/germany-austria-link.jpg'
import imgGermanyBavariaLink from '../../../public/images/germany-bavaria-link.jpg'
import imgGermanyBerlinLink from '../../../public/images/germany-berlin-link.jpg'
import IntroFormatted from '../../../src/components/IntroFormatted'
import Layout from '../../../src/components/Layout'
import TravelLinkList from '../../../src/components/TravelLinkList'

export default function Page() {
    return (
        <Layout
            title="Germany &amp; Austria"
            keywords={[
                'Germany',
                'Austria',
                'Euro 2008',
                '2008 European Championship',
                'Munich',
                'Bavaria',
                'Rothenburg ob der Tauber',
                'Vienna',
                'Salzburg',
                'Mauthausen',
                'Berlin',
                'Rhine River',
                'Rhein',
                'Bacharach',
                'Europe',
                'travel',
            ]}
        >
            <h1>Germany &amp; Austria</h1>

            <IntroFormatted>
                <p>
                    In June/July 2008, we took a trip around Austria and Germany. Along the way we saw the Euro 2008
                    final come to Vienna, soaked up the Sound of Music in Salzburg, and took in the solemnity of the
                    Mauthausen-Gusen concentration camp.
                </p>
                <p>
                    On to <a href="https://wikitravel.org/en/Bavaria">Bavaria</a> and Germany, we mixed munchies and{' '}
                    <a href="https://en.wikipedia.org/wiki/Beer_stein">Maß</a> in Munich, toured through Nuremberg,
                    walked the wall around <a href="https://wikitravel.org/en/Rothenburg_ob_der_Tauber">Rothenburg</a>,
                    cruised up the castle-studded <a href="https://wikitravel.org/en/Rhine_Valley">Rhine</a>, and
                    reveled in the 20th Century history of Berlin.
                </p>
            </IntroFormatted>

            <section>
                <h2>Photos and Video</h2>

                <TravelLinkList
                    items={[
                        {
                            title: 'Austria',
                            className: 'bg-germany-austria',
                            url: 'https://get.google.com/albumarchive/116513687533678150554/album/AF1QipNE-TmD-UPWM7uIBh_08MWJsSCELd4Huol4UokA',
                            imageSrc: imgGermanyAustriaLink,
                            imageAlt: 'Spanish fans gathering in Vienna for Euro 2008',
                        },
                        {
                            title: 'Bavaria',
                            className: 'bg-germany-bavaria',
                            url: 'https://get.google.com/albumarchive/116513687533678150554/album/AF1QipMvUQMar4-AhAVp56ZeyzQDvIf_gSzYsSDLRcRZ',
                            imageSrc: imgGermanyBavariaLink,
                            imageAlt: 'Enjoying a liter at Hofbräuhaus',
                        },
                        {
                            title: (
                                <>
                                    Berlin &amp;
                                    <br />
                                    The Rhine
                                </>
                            ),
                            className: 'bg-germany-berlin',
                            url: 'https://get.google.com/albumarchive/116513687533678150554/album/AF1QipNFxJeLnNx3fFuW7oM4SOTiZo_zx5G9rr3THx2v',
                            imageSrc: imgGermanyBerlinLink,
                            imageAlt: 'Brandenberg Gate, Berlin',
                        },
                    ]}
                />
            </section>
        </Layout>
    )
}
