import { useEffect, useRef, useState } from 'react'
import { Chart } from 'react-google-charts'
import countries from '../countries.json'
import css from './WorldMap.module.css'

const currentYear = new Date().getFullYear()

const countryData: Array<[string, string | number]> = [['Country', 'Years since last visit']]

countries.visited
    .filter((country) => !country.lived)
    .forEach((country) => {
        countryData.push([country.name, currentYear - Math.max(...country.yearsVisited)])
    })

// https://developers-dot-devsite-v2-prod.appspot.com/chart/interactive/docs/gallery/geochart
const GEO_CHART_WIDTH_RATIO = 556
const GEO_CHART_HEIGHT_RATIO = 347

const MAP_CAPTION = 'Color shows years since my last visit.'

const getMapHeight = (width: number) => (width * GEO_CHART_HEIGHT_RATIO) / GEO_CHART_WIDTH_RATIO

function useIsDarkMode(): boolean {
    const [isDarkMode, setIsDarkMode] = useState(true)

    useEffect(() => {
        const query = window.matchMedia('(prefers-color-scheme: dark)')
        setIsDarkMode(query.matches)

        const handleChange = (event: MediaQueryListEvent) => setIsDarkMode(event.matches)

        query.addEventListener('change', handleChange)

        return () => query.removeEventListener('change', handleChange)
    }, [])

    return isDarkMode
}

function useExpandedMapWidth(isOpen: boolean): number {
    const [width, setWidth] = useState(0)

    useEffect(() => {
        if (!isOpen) {
            return
        }

        const updateSize = () => {
            const widthFromViewportWidth = window.innerWidth * 0.92
            const widthFromViewportHeight = (window.innerHeight * 0.85 * GEO_CHART_WIDTH_RATIO) / GEO_CHART_HEIGHT_RATIO
            setWidth(Math.min(widthFromViewportWidth, widthFromViewportHeight))
        }

        updateSize()

        window.addEventListener('resize', updateSize)

        return () => window.removeEventListener('resize', updateSize)
    }, [isOpen])

    return width
}

function GeoChart({ width, isDarkMode }: { width: number; isDarkMode: boolean }) {
    const height = getMapHeight(width)

    return (
        <Chart
            chartType="GeoChart"
            data={countryData}
            legendToggle
            width={width}
            height={height}
            options={{
                // https://developers-dot-devsite-v2-prod.appspot.com/chart/interactive/docs/gallery/geochart
                colorAxis: {
                    colors: ['#ff0000', '#0000ff'],
                },
                backgroundColor: isDarkMode ? '#222222' : '#ffffff',
                datalessRegionColor: '#666666',
                defaultColor: '#f5f5f5',
                keepAspectRatio: true,
                width,
                height,
            }}
        />
    )
}

export default function WorldMap({ className = '' }: { className?: string }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [mapWidth, setMapWidth] = useState(0)
    const [isExpanded, setIsExpanded] = useState(false)
    const isDarkMode = useIsDarkMode()
    const expandedWidth = useExpandedMapWidth(isExpanded)

    useEffect(() => {
        const container = containerRef.current

        if (!container) {
            return
        }

        const observer = new ResizeObserver((entries) => {
            const width = entries[0]?.contentRect.width

            if (width) {
                setMapWidth(width)
            }
        })

        observer.observe(container)

        return () => observer.disconnect()
    }, [])

    const openDialog = () => {
        setIsExpanded(true)
        dialogRef.current?.showModal()
    }

    const closeDialog = () => {
        dialogRef.current?.close()
    }

    return (
        <div className={className}>
            <div
                className={css.container}
                ref={containerRef}
                style={
                    {
                        '--map-aspect-width': GEO_CHART_WIDTH_RATIO,
                        '--map-aspect-height': GEO_CHART_HEIGHT_RATIO,
                    } as React.CSSProperties
                }
            >
                {mapWidth > 0 ? <GeoChart width={mapWidth} isDarkMode={isDarkMode} /> : null}
            </div>

            <button type="button" className={css.expandButton} onClick={openDialog}>
                Expand map
            </button>

            <p className="map-caption">{MAP_CAPTION}</p>

            {/*
                The click handler below only detects clicks on the ::backdrop (there's no
                other way to do that), which is not reachable by keyboard — Escape already
                closes the dialog natively, independent of this handler.
            */}
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */}
            <dialog
                ref={dialogRef}
                className={css.dialog}
                onClose={() => setIsExpanded(false)}
                onClick={(event) => {
                    if (event.target === dialogRef.current) {
                        closeDialog()
                    }
                }}
            >
                <div className={css.dialogHeader}>
                    <button type="button" className={css.closeButton} onClick={closeDialog} aria-label="Close map">
                        ×
                    </button>
                </div>

                <div className={css.expandedChartWrap}>
                    {isExpanded && expandedWidth > 0 ? <GeoChart width={expandedWidth} isDarkMode={isDarkMode} /> : null}
                </div>

                {isExpanded ? <p className={css.dialogCaption}>{MAP_CAPTION}</p> : null}
            </dialog>
        </div>
    )
}
