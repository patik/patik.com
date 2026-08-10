import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react'
import { Chart } from 'react-google-charts'
import countries from '../countries.json'
import css from './WorldMap.module.css'

const currentYear = new Date().getFullYear()

interface MapLocation {
    v: string
    f: string
}

const countryData: Array<[string | MapLocation, string | number | null]> = [['Country', 'Years since last visit']]

countries.visited.forEach((country) => {
    const yearsSinceLastVisit = country.lived ? null : currentYear - Math.max(...country.yearsVisited)

    countryData.push([{ v: country.code, f: country.name }, yearsSinceLastVisit])
})

// https://developers-dot-devsite-v2-prod.appspot.com/chart/interactive/docs/gallery/geochart
const GEO_CHART_WIDTH_RATIO = 556
const GEO_CHART_HEIGHT_RATIO = 347

const LIVED_COUNTRY_COLOR = '#3a7a5f'
const MAP_CAPTION = 'Red to blue shows years since my last visit; green marks countries I’ve lived in.'

const getMapHeight = (width: number) => (width * GEO_CHART_HEIGHT_RATIO) / GEO_CHART_WIDTH_RATIO

function isBackdropClick(event: ReactMouseEvent<HTMLDialogElement>): boolean {
    if (event.target !== event.currentTarget) {
        return false
    }

    const { left, right, top, bottom } = event.currentTarget.getBoundingClientRect()

    return event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom
}

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

// Must measure the wrap, not take a fraction of the viewport: the dialog's header,
// caption and padding sit outside that budget, so the chart overflows the 92vh cap.
function useExpandedMapWidth(isOpen: boolean) {
    const wrapRef = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState(0)

    useEffect(() => {
        const wrap = wrapRef.current

        if (!isOpen || !wrap) {
            return
        }

        // The chart always fits inside the wrap, so this can't retrigger itself.
        const observer = new ResizeObserver(([entry]) => {
            const box = entry?.contentRect

            if (!box?.width || !box.height) {
                return
            }

            // Whichever axis runs out first decides, so the aspect ratio is preserved.
            const widthFromHeight = (box.height * GEO_CHART_WIDTH_RATIO) / GEO_CHART_HEIGHT_RATIO

            setWidth(Math.floor(Math.min(box.width, widthFromHeight)))
        })

        observer.observe(wrap)

        return () => observer.disconnect()
    }, [isOpen])

    return { wrapRef, width }
}

function GeoChart({ width, isDarkMode }: { width: number; isDarkMode: boolean }) {
    const height = getMapHeight(width)

    return (
        <Chart
            chartType="GeoChart"
            chartPackages={['geochart', 'controls']}
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
                defaultColor: LIVED_COUNTRY_COLOR,
                displayMode: 'regions',
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
    const { wrapRef: expandedChartWrapRef, width: expandedWidth } = useExpandedMapWidth(isExpanded)

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
        <div className={className} data-world-map>
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

            <div className={css.controls}>
                <button type="button" className={css.expandButton} onClick={openDialog}>
                    Expand map
                </button>

                <p className={css.caption}>{MAP_CAPTION}</p>
            </div>

            {/* The ::backdrop reports the dialog as its target, so coordinates distinguish it from dialog padding. */}
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */}
            <dialog
                ref={dialogRef}
                className={css.dialog}
                aria-label="Visited countries map"
                onClose={() => setIsExpanded(false)}
                onClick={(event) => {
                    if (isBackdropClick(event)) {
                        closeDialog()
                    }
                }}
            >
                <div className={css.dialogHeader}>
                    <button type="button" className={css.closeButton} onClick={closeDialog} aria-label="Close map">
                        ×
                    </button>
                </div>

                <div className={css.expandedChartWrap} ref={expandedChartWrapRef}>
                    {isExpanded && expandedWidth > 0 ? (
                        <GeoChart width={expandedWidth} isDarkMode={isDarkMode} />
                    ) : null}
                </div>

                {isExpanded ? <p className={css.dialogCaption}>{MAP_CAPTION}</p> : null}
            </dialog>
        </div>
    )
}
