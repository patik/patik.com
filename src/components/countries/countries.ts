export type CountrySortMode = 'name' | 'visits' | 'recent' | 'first'

/** A country as stored in `countries.json` under `visited`. */
export interface VisitedCountry {
    name: string
    yearsVisited: number[]
    /** Set on countries the traveler has lived in, so they can be filtered out of "foreign travel" stats. */
    lived?: boolean
}

/** A single visited country enriched with build-time derived statistics. */
export interface CountrySummary {
    name: string
    /** Distinct years visited, sorted ascending. */
    yearsVisited: number[]
    /** Number of distinct years the country was visited. */
    visitCount: number
    firstYear: number
    lastYear: number
    /** Whole years between the most recent visit and the build's current year. */
    yearsSinceLastVisit: number
    /** True when the most recent visit happened during the build's current year. */
    visitedThisYear: boolean
    /** True for countries the traveler has lived in (excluded by the "excludingResidences" filter). */
    lived: boolean
}

/** Which countries a set of statistics is computed over. */
export type ResidenceFilter = 'excludingResidences' | 'all'

/** Aggregate statistics across a set of visited countries. */
export interface CountriesSummaryStats {
    countryCount: number
    /** Sum of every country's visit count. */
    visitCount: number
    firstYear: number
    lastYear: number
    /** e.g. `2000–2026`, or a single year when the range collapses. */
    yearRange: string
    mostVisited: CountrySummary
}

/** Stats plus every pre-sorted list for one residence filter. */
export interface CountriesStateData {
    stats: CountriesSummaryStats
    countriesBySort: Record<CountrySortMode, CountrySummary[]>
}

/**
 * Everything the visited-countries UI needs, computed once at build time. The
 * client only toggles between the already-rendered panels — one set per
 * residence filter, each pre-sorted every way.
 */
export interface CountriesViewData {
    byResidenceFilter: Record<ResidenceFilter, CountriesStateData>
}

type CountryComparator = (firstCountry: CountrySummary, secondCountry: CountrySummary) => number

const SORT_COMPARATORS: Record<CountrySortMode, CountryComparator> = {
    name: compareByName,
    visits: compareByVisits,
    recent: compareByRecent,
    first: compareByFirst,
}

/**
 * Enriches one source country with derived statistics relative to `currentYear`.
 * The source `yearsVisited` is copied and sorted so callers never mutate input.
 */
export function summarizeCountry({
    country,
    currentYear,
}: {
    country: VisitedCountry
    currentYear: number
}): CountrySummary {
    const yearsVisited = [...country.yearsVisited].sort((firstYear, secondYear) => firstYear - secondYear)
    const firstYear = yearsVisited[0]
    const lastYear = yearsVisited[yearsVisited.length - 1]

    return {
        name: country.name,
        yearsVisited,
        visitCount: yearsVisited.length,
        firstYear,
        lastYear,
        yearsSinceLastVisit: currentYear - lastYear,
        visitedThisYear: lastYear === currentYear,
        lived: country.lived ?? false,
    }
}

/**
 * Builds every collection the visited-countries template renders. Both
 * residence filters are materialized up front, each pre-sorted every way, so
 * runtime work is limited to showing and hiding panels.
 */
export function getCountriesViewData({
    countries,
    currentYear,
}: {
    countries: VisitedCountry[]
    currentYear: number
}): CountriesViewData {
    const summaries = countries.map((country) => summarizeCountry({ country, currentYear }))
    const foreignSummaries = summaries.filter((country) => !country.lived)

    return {
        byResidenceFilter: {
            excludingResidences: getStateData(foreignSummaries),
            all: getStateData(summaries),
        },
    }
}

export function getSortedCountries(summaries: CountrySummary[], mode: CountrySortMode): CountrySummary[] {
    return [...summaries].sort(SORT_COMPARATORS[mode])
}

function getStateData(summaries: CountrySummary[]): CountriesStateData {
    return {
        stats: getSummaryStats(summaries),
        countriesBySort: {
            name: getSortedCountries(summaries, 'name'),
            visits: getSortedCountries(summaries, 'visits'),
            recent: getSortedCountries(summaries, 'recent'),
            first: getSortedCountries(summaries, 'first'),
        },
    }
}

function getSummaryStats(summaries: CountrySummary[]): CountriesSummaryStats {
    const totalVisits = summaries.reduce((runningTotal, country) => runningTotal + country.visitCount, 0)
    const firstYear = Math.min(...summaries.map((country) => country.firstYear))
    const lastYear = Math.max(...summaries.map((country) => country.lastYear))
    const mostVisited = getSortedCountries(summaries, 'visits')[0]

    return {
        countryCount: summaries.length,
        visitCount: totalVisits,
        firstYear,
        lastYear,
        yearRange: firstYear === lastYear ? `${firstYear}` : `${firstYear}–${lastYear}`,
        mostVisited,
    }
}

function compareByName(firstCountry: CountrySummary, secondCountry: CountrySummary): number {
    return firstCountry.name.localeCompare(secondCountry.name)
}

function compareByVisits(firstCountry: CountrySummary, secondCountry: CountrySummary): number {
    if (secondCountry.visitCount !== firstCountry.visitCount) {
        return secondCountry.visitCount - firstCountry.visitCount
    }

    if (firstCountry.firstYear !== secondCountry.firstYear) {
        return firstCountry.firstYear - secondCountry.firstYear
    }

    return compareByName(firstCountry, secondCountry)
}

function compareByRecent(firstCountry: CountrySummary, secondCountry: CountrySummary): number {
    if (secondCountry.lastYear !== firstCountry.lastYear) {
        return secondCountry.lastYear - firstCountry.lastYear
    }

    if (secondCountry.visitCount !== firstCountry.visitCount) {
        return secondCountry.visitCount - firstCountry.visitCount
    }

    return compareByName(firstCountry, secondCountry)
}

function compareByFirst(firstCountry: CountrySummary, secondCountry: CountrySummary): number {
    if (firstCountry.firstYear !== secondCountry.firstYear) {
        return firstCountry.firstYear - secondCountry.firstYear
    }

    return compareByName(firstCountry, secondCountry)
}
