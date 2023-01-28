import athensLink from '../../public/images/greece-athens-link.jpg'
import santoriniLink from '../../public/images/greece-santorini-link.jpg'
import sifnosLink from '../../public/images/greece-sifnos-link.jpg'
import Layout from '../../src/components/Layout'
import TravelLinkList from '../../src/components/TravelLinkList'

export default function Page() {
    return (
        <Layout title="Greece" keywords={['Greece, Athens, Santorini, Sifnos, Europe, Travel']}>
            <h1>Greece</h1>

            <p>In July 2007 we spent our honeymoon in Greece.</p>

            <section>
                <h2>Photos</h2>

                <p style={{ marginLeft: '1em' }}>
                    <a href="https://get.google.com/albumarchive/116513687533678150554/album/AF1QipPkzhN5b1360Nu7gUc22vsA5dTxMK-P7AKFyDI3?authKey=CJL96rLSzuGOuAE">
                        Combined photo album
                    </a>
                </p>

                <TravelLinkList
                    items={[
                        {
                            title: 'Athens',
                            className: 'bg-greece-athens',
                            url: 'https://get.google.com/albumarchive/116513687533678150554/album/AF1QipPkzhN5b1360Nu7gUc22vsA5dTxMK-P7AKFyDI3?authKey=CJL96rLSzuGOuAE',
                            imageSrc: athensLink,
                            imageAlt: 'Temple of Zeus in Athens',
                        },
                        {
                            title: 'Sifnos',
                            className: 'bg-greece-sifnos',
                            url: 'https://get.google.com/albumarchive/116513687533678150554/album/AF1QipPkzhN5b1360Nu7gUc22vsA5dTxMK-P7AKFyDI3?authKey=CJL96rLSzuGOuAE',
                            imageSrc: sifnosLink,
                            imageAlt: 'Coast of Serifios island',
                        },
                        {
                            title: 'Santorini',
                            className: 'bg-greece-santorini',
                            url: 'https://get.google.com/albumarchive/116513687533678150554/album/AF1QipPkzhN5b1360Nu7gUc22vsA5dTxMK-P7AKFyDI3?authKey=CJL96rLSzuGOuAE',
                            imageSrc: santoriniLink,
                            imageAlt: 'Sunset over Oia, Santorini',
                        },
                    ]}
                />
            </section>
        </Layout>
    )
}
