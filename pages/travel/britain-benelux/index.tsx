import Image from 'next/image'
import Link from 'next/link'
import BrugesImage from '../../../public/images/britain-benelux-bruges-link.jpg'
import EdinburghImage from '../../../public/images/britain-benelux-edinburgh-link.jpg'
import LiverpoolImage from '../../../public/images/britain-benelux-liverpool-link.jpg'
import LondonImage from '../../../public/images/britain-benelux-london-link.jpg'
import NetherlandsImage from '../../../public/images/britain-benelux-netherlands-link.jpg'
import OverviewMap from '../../../public/images/britain-benelux-overview-map-small.jpg'
import IntroFormatted from '../../../src/components/IntroFormatted'
import Layout from '../../../src/components/Layout'
import TravelLinkList from '../../../src/components/TravelLinkList'

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

                <TravelLinkList
                    items={[
                        {
                            title: 'Netherlands',
                            className: 'bg-britain-netherlands',
                            url: 'https://get.google.com/albumarchive/116513687533678150554/album/AF1QipOD5tTxPTmr3KjxeR-K-k6xu6YhjuasQDyd9naX',
                            imageSrc: NetherlandsImage,
                            imageAlt: 'Westerkerk overlooking an Amsterdam canal',
                        },
                        {
                            title: 'Bruges',
                            className: 'bg-britain-bruges',
                            url: 'https://get.google.com/albumarchive/116513687533678150554/album/AF1QipN-4ZhzSVdq3x0O8opTTZA3hYiuMZIMA_mtpD1D',
                            imageSrc: BrugesImage,
                            imageAlt: 'Windmill in the Belgian countryside',
                        },
                        {
                            title: 'Edinburgh',
                            className: 'bg-britain-edinburgh',
                            url: 'https://get.google.com/albumarchive/116513687533678150554/album/AF1QipN4M-SohIflzfVFqExd1XNwUYweZdXE57yip92N',
                            imageSrc: EdinburghImage,
                            imageAlt: 'Craig petting a hairy coo while wearing a novelty hairy coo hat',
                        },
                        {
                            title: 'London',
                            className: 'bg-britain-london',
                            url: 'https://get.google.com/albumarchive/116513687533678150554/album/AF1QipNeippcH1y8F4Qi53L2bHTZ1anxLJBmeLpysv2J',
                            imageSrc: LondonImage,
                            imageAlt: 'View over Westminster from the London Eye',
                        },
                        {
                            title: 'Liverpool',
                            className: 'bg-britain-liverpool',
                            url: 'https://get.google.com/albumarchive/116513687533678150554/album/AF1QipOziMId6ap-bMSgbiNJ2hGoCPbgiFMHzTOk6t4r',
                            imageSrc: LiverpoolImage,
                            imageAlt: 'Pitch-level view of the Kop at Anfield',
                        },
                    ]}
                />
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
                            <li>
                                <a href="https://int.soccerway.com/matches/2012/08/18/england/premier-league/arsenal-fc/sunderland-association-football-club/1293681/">
                                    Arsenal vs Sunderland
                                </a>{' '}
                                football match
                            </li>
                            <li>
                                <a href="https://www.wbstudiotour.co.uk/">Harry Potter film studios</a>
                            </li>
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
                        <Image src={OverviewMap} alt="Map of trip locations" title="Click for a larger version" />
                    </Link>
                </div>
            </section>
        </Layout>
    )
}
