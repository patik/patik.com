export type ConcertRole = 'main' | 'opener' | 'festival'

export type DatePrecision = 'day' | 'month' | 'year'

export interface ConcertAct {
    name: string
    role: ConcertRole
}

export interface ConcertEvent {
    id: string
    date: string
    dateEnd?: string
    datePrecision: DatePrecision
    venue: string
    city: string
    state: string | null
    country: string
    festival: string | null
    acts: ConcertAct[]
    note?: string
}

export interface ArtistAppearance {
    event: ConcertEvent
    role: ConcertRole
}

export interface ArtistSummary {
    name: string
    totalAppearances: number
    mainAppearances: number
    festivalAppearances: number
    openerAppearances: number
    spotlightAppearances: number
    appearances: ArtistAppearance[]
}

interface SourceConcertAct {
    name: string
    role: string
}

interface SourceConcertEvent {
    id: string
    date: string
    dateEnd?: string
    datePrecision: string
    venue: string
    city: string
    state: string | null
    country: string
    festival: string | null
    acts: SourceConcertAct[]
    note?: string
}

interface SourceConcertData {
    concerts: SourceConcertEvent[]
}

const MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const ROLE_SORT_ORDER: Record<ConcertRole, number> = {
    main: 0,
    festival: 1,
    opener: 2,
}

export function normalizeConcertEvents(data: SourceConcertData): ConcertEvent[] {
    return data.concerts.map((event) => ({
        ...event,
        datePrecision: normalizeDatePrecision(event.datePrecision),
        acts: event.acts.map((act) => ({
            name: act.name,
            role: normalizeConcertRole(act.role),
        })),
    }))
}

export function getConcertStats(events: ConcertEvent[]): {
    eventCount: number
    artistCount: number
    yearRange: string
    spotlightAppearanceCount: number
} {
    const artists = new Set<string>()
    let spotlightAppearanceCount = 0

    events.forEach((event) => {
        event.acts.forEach((act) => {
            artists.add(act.name)

            if (act.role !== 'opener') {
                spotlightAppearanceCount += 1
            }
        })
    })

    const sortedEvents = getEventsByDate(events, 'asc')
    const firstYear = sortedEvents[0]?.date.slice(0, 4) ?? ''
    const lastYear = sortedEvents.at(-1)?.date.slice(0, 4) ?? ''

    return {
        eventCount: events.length,
        artistCount: artists.size,
        yearRange: firstYear && lastYear ? `${firstYear}-${lastYear}` : '',
        spotlightAppearanceCount,
    }
}

export function getEventsByDate(events: ConcertEvent[], direction: 'asc' | 'desc'): ConcertEvent[] {
    return [...events].sort((firstEvent, secondEvent) => {
        const comparison = firstEvent.date.localeCompare(secondEvent.date)

        if (comparison !== 0) {
            return direction === 'asc' ? comparison : comparison * -1
        }

        return firstEvent.id.localeCompare(secondEvent.id)
    })
}

export function getArtistSummaries(events: ConcertEvent[]): ArtistSummary[] {
    const summaries = new Map<string, ArtistSummary>()

    events.forEach((event) => {
        event.acts.forEach((act) => {
            const summary = summaries.get(act.name) ?? createArtistSummary(act.name)

            summary.totalAppearances += 1
            summary.appearances.push({ event, role: act.role })

            if (act.role === 'main') {
                summary.mainAppearances += 1
            }

            if (act.role === 'festival') {
                summary.festivalAppearances += 1
            }

            if (act.role === 'opener') {
                summary.openerAppearances += 1
            }

            summary.spotlightAppearances = summary.mainAppearances + summary.festivalAppearances
            summaries.set(act.name, summary)
        })
    })

    return [...summaries.values()].map((summary) => ({
        ...summary,
        appearances: [...summary.appearances].sort((firstAppearance, secondAppearance) => {
            const comparison = firstAppearance.event.date.localeCompare(secondAppearance.event.date)

            if (comparison !== 0) {
                return comparison * -1
            }

            return ROLE_SORT_ORDER[firstAppearance.role] - ROLE_SORT_ORDER[secondAppearance.role]
        }),
    }))
}

export function getArtistsByName(events: ConcertEvent[]): ArtistSummary[] {
    return getArtistSummaries(events).sort((firstArtist, secondArtist) =>
        firstArtist.name.localeCompare(secondArtist.name),
    )
}

export function getArtistsByLatestAppearance(events: ConcertEvent[], direction: 'asc' | 'desc'): ArtistSummary[] {
    return getArtistSummaries(events).sort((firstArtist, secondArtist) => {
        const firstDate = firstArtist.appearances[0]?.event.date ?? ''
        const secondDate = secondArtist.appearances[0]?.event.date ?? ''
        const comparison = firstDate.localeCompare(secondDate)

        if (comparison !== 0) {
            return direction === 'asc' ? comparison : comparison * -1
        }

        return firstArtist.name.localeCompare(secondArtist.name)
    })
}

export function getArtistsByAppearanceCount(events: ConcertEvent[]): ArtistSummary[] {
    return getArtistSummaries(events).sort((firstArtist, secondArtist) => {
        if (secondArtist.totalAppearances !== firstArtist.totalAppearances) {
            return secondArtist.totalAppearances - firstArtist.totalAppearances
        }

        if (secondArtist.spotlightAppearances !== firstArtist.spotlightAppearances) {
            return secondArtist.spotlightAppearances - firstArtist.spotlightAppearances
        }

        return firstArtist.name.localeCompare(secondArtist.name)
    })
}

export function formatConcertDate(event: ConcertEvent): string {
    const formattedStart = formatPartialDate(event.date, event.datePrecision)

    if (!event.dateEnd) {
        return formattedStart
    }

    const formattedEnd = formatPartialDate(event.dateEnd, event.datePrecision)

    return `${formattedStart}-${formattedEnd}`
}

export function formatConcertLocation(event: ConcertEvent): string {
    const region = event.state ?? event.country

    return `${event.city}, ${region}`
}

export function getRoleLabel(role: ConcertRole): string {
    switch (role) {
        case 'main':
            return 'Main act'
        case 'festival':
            return 'Festival set'
        case 'opener':
            return 'Opening act'
    }
}

export function getArtistLatestAppearance(artist: ArtistSummary): ArtistAppearance | undefined {
    return artist.appearances[0]
}

function createArtistSummary(name: string): ArtistSummary {
    return {
        name,
        totalAppearances: 0,
        mainAppearances: 0,
        festivalAppearances: 0,
        openerAppearances: 0,
        spotlightAppearances: 0,
        appearances: [],
    }
}

function normalizeConcertRole(role: string): ConcertRole {
    switch (role) {
        case 'main':
        case 'festival':
        case 'opener':
            return role
        default:
            throw new Error(`Unknown concert role: ${role}`)
    }
}

function normalizeDatePrecision(datePrecision: string): DatePrecision {
    switch (datePrecision) {
        case 'day':
        case 'month':
        case 'year':
            return datePrecision
        default:
            throw new Error(`Unknown date precision: ${datePrecision}`)
    }
}

function formatPartialDate(value: string, precision: DatePrecision): string {
    const [year, month, day] = value.split('-')

    if (precision === 'year') {
        return year
    }

    if (precision === 'month') {
        const monthIndex = Number(month) - 1

        return `${MONTH_NAMES[monthIndex]} ${year}`
    }

    const monthIndex = Number(month) - 1

    return `${MONTH_NAMES[monthIndex]} ${Number(day)}, ${year}`
}
