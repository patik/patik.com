import Image from 'next/image'
import Link from 'next/link'
import BrugesImage from '../../../public/images/britain-benelux-bruges-link.jpg'
import OverviewMap from '../../../public/images/britain-benelux-overview-map-small.jpg'
import IntroFormatted from '../../../src/components/IntroFormatted'
import Layout from '../../../src/components/Layout'
import TravelLinkList from '../../../src/components/TravelLinkList'

export default function Page() {
    return (
        <Layout title="Belgium" keywords={['Belgium', 'Bruges', 'Europe', 'travel']}>
            <h1>Belgium</h1>

            <IntroFormatted>August 2012</IntroFormatted>

            <section>
                <h2>Photos and Video</h2>

                <TravelLinkList
                    items={[
                        {
                            title: 'Bruges',
                            className: 'bg-belgium-bruges',
                            url: 'https://get.google.com/albumarchive/116513687533678150554/album/AF1QipN-4ZhzSVdq3x0O8opTTZA3hYiuMZIMA_mtpD1D',
                            imageSrc: BrugesImage,
                            imageAlt: 'Windmill in the Belgian countryside',
                        },
                    ]}
                />
            </section>

            <section>
                <h2>Itinerary</h2>
                <ul>
                    <li>
                        <Link href="/travel/netherlands/">Netherlands</Link>
                    </li>
                    <li>
                        <strong>Bruges, Belgium</strong>
                    </li>
                    <li>Eurostar train to London, via Paris</li>
                    <li>
                        <Link href="/travel/britain/">Edinburgh, Scotland</Link>
                    </li>
                    <li>
                        <Link href="/travel/britain/">London</Link>
                    </li>
                    <li>
                        <Link href="/travel/britain/">Liverpool</Link>
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
