import NetherlandsImage from '@public/images/britain-benelux-netherlands-link.jpg'
import OverviewMap from '@public/images/britain-benelux-overview-map-small.jpg'
import Layout from '@src/components/common/Layout'
import TravelLinkList from '@src/components/site/TravelLinkList'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
    return (
        <Layout title="Netherlands" keywords={['Netherlands', 'Amsterdam', 'Europe', 'travel']}>
            <h1>The Netherlands</h1>

            <p>August 2012</p>

            <section>
                <h2>Photos and Video</h2>

                <TravelLinkList
                    items={[
                        {
                            title: 'Netherlands',
                            className: 'bg-travel-bottom-middle',
                            url: 'https://get.google.com/albumarchive/116513687533678150554/album/AF1QipOD5tTxPTmr3KjxeR-K-k6xu6YhjuasQDyd9naX',
                            imageSrc: NetherlandsImage,
                            imageAlt: 'Westerkerk overlooking an Amsterdam canal',
                        },
                    ]}
                />
            </section>

            <section>
                <h2>Itinerary</h2>
                <ul>
                    <li>
                        <strong>Netherlands</strong>
                        <ul>
                            <li>Amsterdam</li>
                            <li>Haarlem</li>
                            <li>Leiden</li>
                            <li>Edam</li>
                        </ul>
                    </li>
                    <li>
                        <Link href="/travel/belgium/">Bruges</Link>
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
