import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { ReactNode, useEffect, useRef, useState } from 'react'
import imgTravelBritainbenelux from '../../public/images/travel-britain-benelux.jpg'
import imgTravelFrance from '../../public/images/travel-france.jpg'
import imgTravelGermany from '../../public/images/travel-germany.jpg'
import imgTravelGreece from '../../public/images/travel-greece.jpg'
import imgTravelParis from '../../public/images/travel-paris.jpg'
import imgTravelPeruargentina from '../../public/images/travel-peru-argentina.jpg'
import imgTravelSpain from '../../public/images/travel-spain.jpg'
import imgTravelTurkey from '../../public/images/travel-turkey.jpg'
import Layout from '../../src/layout/Layout'

const currentYear = new Date().getFullYear()

export default function Page() {
    const [mapScript, setMapScript] = useState<ReactNode>()
    const mapElement = useRef(null)
    useEffect(() => {
        if (mapScript) {
            return
        }

        setMapScript(
            <Script
                src="https://www.gstatic.com/charts/loader.js"
                onLoad={() => {
                    google.charts.load('current', {
                        packages: ['geochart'],
                    })
                    google.charts.setOnLoadCallback(drawRegionsMap)

                    function drawRegionsMap() {
                        if (mapElement.current === null) {
                            return
                        }

                        const data = google.visualization.arrayToDataTable([
                            // Last updated: Jan 2023
                            ['Country', 'Years since last visit'],
                            ['Argentina', currentYear - 2011],
                            ['Austria', currentYear - 2022],
                            ['Belgium', currentYear - 2012],
                            ['Bulgaria', currentYear - 2021],
                            ['Cambodia', currentYear - 2013],
                            ['Canada', currentYear - 2017],
                            ['China', currentYear - 2017],
                            ['Croatia', currentYear - 2022],
                            ['Czech Republic', currentYear - 2015],
                            ['France', currentYear - 2014],
                            ['Germany', currentYear - 2023],
                            ['Greece', currentYear - 2022],
                            ['Hungary', currentYear - 2015],
                            ['Ireland', currentYear - 2022],
                            ['Italy', currentYear - 2018],
                            ['Monaco', currentYear - 2000],
                            ['Morocco', currentYear - 2010],
                            ['Myanmar', currentYear - 2013],
                            ['Netherlands', currentYear - 2012],
                            ['Panama', currentYear - 2011],
                            ['Peru', currentYear - 2011],
                            ['Poland', currentYear - 2019],
                            ['Portugal', currentYear - 2010],
                            ['Romania', currentYear - 2022],
                            ['Slovakia', currentYear - 2015],
                            ['Slovenia', currentYear - 2019],
                            ['Spain', currentYear - 2020],
                            ['Thailand', currentYear - 2013],
                            ['Turkey', currentYear - 2009],
                            ['United Kingdom', currentYear - 2019],
                            ['United States', currentYear - 2022],
                            ['Uruguay', currentYear - 2011],
                            ['Vietnam', currentYear - 2017],
                        ])

                        const isDarkMode =
                            window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

                        // https://developers-dot-devsite-v2-prod.appspot.com/chart/interactive/docs/gallery/geochart
                        const options: google.visualization.GeoChartOptions = {
                            colorAxis: {
                                colors: ['#990000', '#ff0000'],
                            },
                            backgroundColor: isDarkMode ? '#222222' : '#ffffff',
                            datalessRegionColor: '#666666',
                            defaultColor: '#f5f5f5',
                            keepAspectRatio: true,
                            width: window.innerWidth * 0.9,
                        }

                        const chart = new google.visualization.GeoChart(mapElement.current)

                        chart.draw(data, options)
                    }
                }}
            />
        )
    }, [mapScript])
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
                    <div className="row travel-map" ref={mapElement} />
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
            {mapScript}
        </Layout>
    )
}
