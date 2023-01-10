import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Chart } from 'react-google-charts'
import imgTravelBritainbenelux from '../../public/images/travel-britain-benelux.jpg'
import imgTravelFrance from '../../public/images/travel-france.jpg'
import imgTravelGermany from '../../public/images/travel-germany.jpg'
import imgTravelGreece from '../../public/images/travel-greece.jpg'
import imgTravelParis from '../../public/images/travel-paris.jpg'
import imgTravelPeruargentina from '../../public/images/travel-peru-argentina.jpg'
import imgTravelSpain from '../../public/images/travel-spain.jpg'
import imgTravelTurkey from '../../public/images/travel-turkey.jpg'
import Layout from '../../src/layout/Layout'
import countryVisits from '../../src/country-visits.json'

const currentYear = new Date().getFullYear()

const countryData: Array<[string, string | number]> = [['Country', 'Years since last visit']]

countryVisits.visited.forEach((country) => {
    countryData.push([country.name, currentYear - Math.max(...country.yearsVisited)])
})

export default function Page() {
    const [mapWidth, setMapWidth] = useState(300)
    const [isDarkMode, setIsDarkMode] = useState(true)

    useEffect(() => {
        const checkWidth = () => {
            setMapWidth(Math.min(960, window.innerWidth * 0.9))
        }

        checkWidth()

        window.addEventListener('resize', checkWidth)

        return () => window.removeEventListener('resize', checkWidth)
    }, [])

    useEffect(() => {
        setIsDarkMode(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    }, [])

    return (
        <Layout
            title="Travel"
            keywords={['turkey', 'istanbul', 'cappadocia', 'cirali', 'selcuk', 'ephesus', 'europe', 'travel']}
        >
            <div id="travel-main" role="main">
                <h1>Travel</h1>

                <section style={{ marginBottom: '6rem' }}>
                    <h2>Countries Visited</h2>
                    <p style={{ marginLeft: '1rem' }}>
                        Color-coded based on how many years it’s been since I’ve been to each one
                    </p>
                    <div className="row travel-map">
                        <Chart
                            chartType="GeoChart"
                            data={countryData}
                            legendToggle
                            options={{
                                // https://developers-dot-devsite-v2-prod.appspot.com/chart/interactive/docs/gallery/geochart
                                colorAxis: {
                                    colors: ['#990000', '#ff0000'],
                                },
                                backgroundColor: isDarkMode ? '#222222' : '#ffffff',
                                datalessRegionColor: '#666666',
                                defaultColor: '#f5f5f5',
                                keepAspectRatio: true,
                                width: mapWidth,
                            }}
                        />
                    </div>
                </section>

                <section>
                    <h2>Photos</h2>
                    <p style={{ marginLeft: '1rem' }}>
                        <em>
                            Not shown are notable trips since 2012 to Southeast Asia, Eastern Europe, and much more of
                            Europe
                        </em>
                    </p>
                    <div className="row travel-link-list">
                        <div className="small-12 medium-6 large-4 columns">
                            <Link className="bg-travel-britain-benelux" href="/travel/britain-benelux/">
                                <Image
                                    src={imgTravelBritainbenelux}
                                    alt="Big Ben, a black cab, and a red double-decker bus in Parliament Square"
                                />
                                <span>
                                    Britain &amp;
                                    <br />
                                    Benelux
                                </span>
                                <div className="image-cover"></div>
                            </Link>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <Link className="bg-travel-peru-argentina" href="/travel/peru-argentina/">
                                <Image
                                    src={imgTravelPeruargentina}
                                    alt="Kim holding a lamb and posing with two Andean women"
                                />
                                <span>Peru &amp; Argentina</span>
                                <div className="image-cover"></div>
                            </Link>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <Link className="bg-travel-spain" href="/travel/spain/">
                                <Image src={imgTravelSpain} alt="Celebrating Spain's World Cup victory in Madrid" />
                                <span>
                                    Spain,
                                    <br />
                                    Portugal,
                                    <br />
                                    &amp; Morocco
                                </span>
                                <div className="image-cover"></div>
                            </Link>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <Link className="bg-travel-turkey" href="/travel/turkey/">
                                <Image
                                    src={imgTravelTurkey}
                                    alt="The Blue Mosque (Sultanahmet Camii), Istanbul, Turkey"
                                />
                                <span>Turkey</span>
                                <div className="image-cover"></div>
                            </Link>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <Link className="bg-travel-germany" href="/travel/germany/">
                                <Image src={imgTravelGermany} alt="Spanish fans in Vienna for Euro 2008" />
                                <span>
                                    Germany
                                    <br />
                                    &amp; Austria
                                </span>
                                <div className="image-cover"></div>
                            </Link>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <Link className="bg-travel-greece" href="/travel/greece/">
                                <Image src={imgTravelGreece} alt="Serifios, Greece" />
                                <span>Greece</span>
                                <div className="image-cover"></div>
                            </Link>
                        </div>
                        <div className="small-12 medium-6 large-4 columns">
                            <Link className="bg-travel-paris" href="/travel/paris/">
                                <Image src={imgTravelParis} alt="Eiffel Tower" />
                                <span>Paris</span>
                                <div className="image-cover"></div>
                            </Link>
                        </div>
                        <div className="small-12 medium-6 large-4 columns left">
                            <Link className="bg-travel-france" href="/travel/france/">
                                <Image src={imgTravelFrance} alt="The Seine River" />
                                <span>France</span>
                                <div className="image-cover"></div>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}
