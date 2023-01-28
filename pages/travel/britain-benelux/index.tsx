import Image from 'next/image'
import Link from 'next/link'
import imgBrugesLink from '../../../public/images/britain-benelux-bruges-link.jpg'
import imgEdinburghLink from '../../../public/images/britain-benelux-edinburgh-link.jpg'
import imgLiverpoolLink from '../../../public/images/britain-benelux-liverpool-link.jpg'
import imgLondonLink from '../../../public/images/britain-benelux-london-link.jpg'
import imgNetherlandsLink from '../../../public/images/britain-benelux-netherlands-link.jpg'
import imgOverviewMap from '../../../public/images/britain-benelux-overview-map-small.jpg'
import IntroFormatted from '../../../src/components/IntroFormatted'
import Layout from '../../../src/components/Layout'

export default function Page() {
    return (
        <Layout
            title="Britain &amp; Benelux"
            keywords={[
                'Netherlands',
                'Amsterdam',
                'Belgium',
                'Bruges',
                'United Kingdom',
                'Scotland',
                'Edinburgh',
                'London',
                'England',
                'Liverpool',
                'Europe',
                'travel',
            ]}
        >
            <h1>London, Amsterdam, &amp; Bruges</h1>

            <IntroFormatted>August 2012</IntroFormatted>

            <section>
                <h2>Photos and Video</h2>

                <div className="row travel-link-list">
                    <div className="small-12 medium-6 large-4 columns">
                        <a
                            className="bg-britain-netherlands"
                            href="https://get.google.com/albumarchive/116513687533678150554/album/AF1QipOD5tTxPTmr3KjxeR-K-k6xu6YhjuasQDyd9naX"
                            title="Netherlands photo album"
                        >
                            <Image src={imgNetherlandsLink} alt="Westerkerk overlooking an Amsterdam canal" />
                            <span>Netherlands</span>
                            <div className="image-cover"></div>
                        </a>
                    </div>
                    <div className="small-12 medium-6 large-4 columns">
                        <a
                            className="bg-britain-bruges"
                            href="https://get.google.com/albumarchive/116513687533678150554/album/AF1QipN-4ZhzSVdq3x0O8opTTZA3hYiuMZIMA_mtpD1D"
                            title="Bruges photo album"
                        >
                            <Image src={imgBrugesLink} alt="" />
                            <span>Bruges</span>
                            <div className="image-cover"></div>
                        </a>
                    </div>
                    <div className="small-12 medium-6 large-4 columns">
                        <a
                            className="bg-britain-edinburgh"
                            href="https://get.google.com/albumarchive/116513687533678150554/album/AF1QipN4M-SohIflzfVFqExd1XNwUYweZdXE57yip92N"
                            title="Edinburgh photo album"
                        >
                            <Image src={imgEdinburghLink} alt="" />
                            <span>Edinburgh</span>
                            <div className="image-cover"></div>
                        </a>
                    </div>
                    <div className="small-12 medium-6 large-4 columns">
                        <a
                            className="bg-britain-london"
                            href="https://get.google.com/albumarchive/116513687533678150554/album/AF1QipNeippcH1y8F4Qi53L2bHTZ1anxLJBmeLpysv2J"
                            title="London photo album"
                        >
                            <Image src={imgLondonLink} alt="View over Westminster from the London Eye" />
                            <span>London</span>
                            <div className="image-cover"></div>
                        </a>
                    </div>
                    <div className="small-12 medium-6 large-4 columns left">
                        <a
                            className="bg-britain-liverpool"
                            href="https://get.google.com/albumarchive/116513687533678150554/album/AF1QipOziMId6ap-bMSgbiNJ2hGoCPbgiFMHzTOk6t4r"
                            title="Liverpool photo album"
                        >
                            <Image src={imgLiverpoolLink} alt="Pitch-level view of the Kop at Anfield" />
                            <span>Liverpool</span>
                            <div className="image-cover"></div>
                        </a>
                    </div>
                </div>
            </section>
            <section>
                <h2>Itinerary</h2>
                <ul>
                    <li>
                        Netherlands
                        <ul>
                            <li>Amsterdam</li>
                            <li>Haarlem</li>
                            <li>Leiden</li>
                            <li>Edam</li>
                        </ul>
                    </li>
                    <li>Bruges</li>
                    <li>Eurostar train to London, via Paris</li>
                    <li>Edinburgh, Scotland</li>
                    <li>
                        London
                        <ul>
                            <li>Highclere Castle</li>
                            <li>Arsenal vs Sunderland football match</li>
                            <li>Harry Potter film studios</li>
                        </ul>
                    </li>
                    <li>
                        Liverpool
                        <ul>
                            <li>Beatles Weekend</li>
                            <li>Liverpool vs Manchester City football match</li>
                        </ul>
                    </li>
                </ul>
                <div className="travel-map">
                    <Link href="/images/britain-benelux-overview-map.png">
                        <Image src={imgOverviewMap} alt="Map of trip locations" title="Click for a larger version" />
                    </Link>
                </div>
            </section>
        </Layout>
    )
}
