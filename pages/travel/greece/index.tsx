import Layout from '../../../src/layout/Layout'
import Image from 'next/image'
import athensLink from '../../../public/images/greece-athens-link.jpg'
import santoriniLink from '../../../public/images/greece-santorini-link.jpg'
import sifnosLink from '../../../public/images/greece-sifnos-link.jpg'

export default function Page() {
    return (
        <Layout title="Greece" keywords={['greece, athens, santorini, sifnos, europe, travel']}>
            <div id="greece-main" role="main">
                <h1>Greece</h1>

                <section className="intro">
                    <p>In July 2007 we spent our honeymoon in Greece.</p>
                </section>

                <section>
                    <h2>Photos</h2>

                    <p>
                        <a href="https://get.google.com/albumarchive/116513687533678150554/album/AF1QipPkzhN5b1360Nu7gUc22vsA5dTxMK-P7AKFyDI3?authKey=CJL96rLSzuGOuAE">
                            Combined photo album
                        </a>
                    </p>

                    <div className="row travel-link-list">
                        <div className="small-12 medium-6 large-4 columns">
                            <a
                                className="bg-greece-athens"
                                href="https://get.google.com/albumarchive/116513687533678150554/album/AF1QipPkzhN5b1360Nu7gUc22vsA5dTxMK-P7AKFyDI3?authKey=CJL96rLSzuGOuAE"
                            >
                                <Image src={athensLink} alt="Temple of Zeus in Athens" />
                                <span>Athens</span>
                                <div className="image-cover"></div>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <a
                                className="bg-greece-sifnos"
                                href="https://get.google.com/albumarchive/116513687533678150554/album/AF1QipPkzhN5b1360Nu7gUc22vsA5dTxMK-P7AKFyDI3?authKey=CJL96rLSzuGOuAE"
                            >
                                <Image src={sifnosLink} alt="Coast of Serifios island" />
                                <span>Sifnos</span>
                                <div className="image-cover"></div>
                            </a>
                        </div>
                        <div className="small-12 medium-6 large-4 columns left">
                            <a
                                className="bg-greece-santorini"
                                href="https://get.google.com/albumarchive/116513687533678150554/album/AF1QipPkzhN5b1360Nu7gUc22vsA5dTxMK-P7AKFyDI3?authKey=CJL96rLSzuGOuAE"
                            >
                                <Image src={santoriniLink} alt="Sunset over Oia" />
                                <span>Santorini</span>
                                <div className="image-cover"></div>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}
