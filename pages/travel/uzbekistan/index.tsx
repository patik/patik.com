import BukharaImage from '@public/images/uzbekistan-bukhara-minaret.jpg'
import KhivaImage from '@public/images/uzbekistan-khiva-night.jpg'
import SamarkandImage from '@public/images/uzbekistan-samarkand-dome.jpg'
import Layout from '@src/components/common/Layout'
import TravelLinkList from '@src/components/site/TravelLinkList'
import countryGallery from '@src/galleries/uzbekistan'

export default function Page() {
    return (
        <Layout title="Uzbekistan" keywords={countryGallery.keywords}>
            <h1>Uzbekistan</h1>

            <p>A beautiful country full of Islamic architecture that had only just opened up to mass tourism</p>

            <section>
                <h2>Photos and Video</h2>

                <TravelLinkList
                    items={[
                        {
                            title: 'Khiva',
                            className: 'bg-travel-bottom-middle',
                            url: 'https://www.icloud.com/sharedalbum/#B0x59UlCqxnTB5',
                            imageSrc: KhivaImage,
                            imageAlt: 'The façade of a mausoleum at night',
                        },
                        {
                            title: 'Samarkand',
                            className: 'bg-travel-bottom-middle',
                            // url: 'https://www.icloud.com/sharedalbum/#B0x5n8hH43fN8G',
                            url: '/travel/uzbekistan/photos/samarkand/',
                            imageSrc: SamarkandImage,
                            imageAlt: 'The gold and blue interior of a mausoleum dome',
                        },
                        {
                            title: 'Bukhara',
                            className: 'bg-travel-top-middle',
                            url: 'https://www.icloud.com/sharedalbum/#B0x5yeZFhd056g',
                            imageSrc: BukharaImage,
                            imageAlt: 'The top of a minaret lit up at night',
                        },
                    ]}
                />
            </section>

            <section>
                <h2>Itinerary</h2>
                <ul>
                    <li>
                        The capital city, <a href="https://en.wikipedia.org/wiki/Tashkent">Tashkent</a>
                    </li>
                    <li>
                        The walled city of <a href="https://en.wikipedia.org/wiki/Khiva">Khiva</a>
                    </li>
                    <li>
                        <a href="https://en.wikipedia.org/wiki/Bukhara">Bukhara</a>
                    </li>
                    <li>Overnight at a yurt camp in the desert</li>
                    <li>
                        <a href="https://en.wikipedia.org/wiki/Samarkand">Samarkand</a>
                    </li>
                </ul>
            </section>
        </Layout>
    )
}
