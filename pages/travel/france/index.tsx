import Image from 'next/image'
import photosLink from '../../../public/images/france-photos-link.jpg'
import Layout from '../../../src/components/Layout'

export default function Page() {
    return (
        <Layout title="France" keywords={['france', 'paris', 'nice', 'avignon', 'arles', 'monaco', 'europe', 'travel']}>
            <div id="france-main" role="main">
                <h1>France</h1>

                <section className="intro">
                    <p>
                        In April 2000, we took a short trip France with our high school French class. Our tour included
                        Paris, Nice, Avignon, Arles, and Monaco.
                    </p>
                </section>

                <section>
                    <h2>Photos</h2>
                    <div className="row travel-link-list">
                        <div className="small-12 medium-6 large-4 columns">
                            <a
                                className="bg-france-photos"
                                href="https://get.google.com/albumarchive/116513687533678150554/album/AF1QipMU0Jocw4DYeAwWODW-vqqi2pW8eul5MhKCiwSj"
                            >
                                <Image src={photosLink} alt="The Eiffel Tower was lit up for the new millenium" />
                                <span>France</span>
                                <div className="image-cover"></div>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}
