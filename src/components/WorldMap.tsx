import { useEffect, useState } from 'react'
import { Chart } from 'react-google-charts'
import countries from '../countries.json'

const currentYear = new Date().getFullYear()

const countryData: Array<[string, string | number]> = [['Country', 'Years since last visit']]

countries.visited.forEach((country) => {
    countryData.push([country.name, currentYear - Math.max(...country.yearsVisited)])
})

// https://developers-dot-devsite-v2-prod.appspot.com/chart/interactive/docs/gallery/geochart
// These values are duplicated in SCSS
const GOOGLE_DEFAULT_WIDTH = 556
const GOOGLE_DEFAULT_HEIGHT = 347
const MY_MAX_WIDTH = 960

const getMapHeight = (width: number) => (width * GOOGLE_DEFAULT_HEIGHT) / GOOGLE_DEFAULT_WIDTH

export default function WorldMap({ className = '' }: { className?: string }) {
    const [mapWidth, setMapWidth] = useState(GOOGLE_DEFAULT_WIDTH)
    const [mapHeight, setMapHeight] = useState(GOOGLE_DEFAULT_HEIGHT)
    const [isDarkMode, setIsDarkMode] = useState(true)

    useEffect(() => {
        setIsDarkMode(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)

        const checkWidth = () => {
            const newWidth = Math.min(MY_MAX_WIDTH, window.innerWidth * 0.9)
            setMapWidth(newWidth)
            setMapHeight(getMapHeight(newWidth))
        }

        checkWidth()

        window.addEventListener('resize', checkWidth)

        return () => window.removeEventListener('resize', checkWidth)
    }, [])

    return (
        <div className={`world-map-container ${className}`}>
            <Chart
                chartType="GeoChart"
                data={countryData}
                legendToggle
                options={{
                    // https://developers-dot-devsite-v2-prod.appspot.com/chart/interactive/docs/gallery/geochart
                    colorAxis: {
                        colors: ['#ff0000', '#0000ff'],
                    },
                    backgroundColor: isDarkMode ? '#222222' : '#ffffff',
                    datalessRegionColor: '#666666',
                    defaultColor: '#f5f5f5',
                    keepAspectRatio: true,
                    width: mapWidth,
                    height: mapHeight,
                }}
            />
        </div>
    )
}
