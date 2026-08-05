export type CountrySortMode = 'name' | 'visits' | 'recent' | 'first'

const COUNTRY_FLAGS: Record<string, string> = {
    Afghanistan: '🇦🇫',
    'Åland Islands': '🇦🇽',
    Albania: '🇦🇱',
    Algeria: '🇩🇿',
    'American Samoa': '🇦🇸',
    Andorra: '🇦🇩',
    Angola: '🇦🇴',
    Anguilla: '🇦🇮',
    Antarctica: '🇦🇶',
    'Antigua and Barbuda': '🇦🇬',
    Argentina: '🇦🇷',
    Armenia: '🇦🇲',
    Aruba: '🇦🇼',
    Australia: '🇦🇺',
    Austria: '🇦🇹',
    Azerbaijan: '🇦🇿',
    Bahamas: '🇧🇸',
    Bahrain: '🇧🇭',
    Bangladesh: '🇧🇩',
    Barbados: '🇧🇧',
    Belarus: '🇧🇾',
    Belgium: '🇧🇪',
    Belize: '🇧🇿',
    Benin: '🇧🇯',
    Bermuda: '🇧🇲',
    Bhutan: '🇧🇹',
    Bolivia: '🇧🇴',
    'Bosnia and Herzegovina': '🇧🇦',
    Botswana: '🇧🇼',
    Brazil: '🇧🇷',
    'British Indian Ocean Territory': '🇮🇴',
    Brunei: '🇧🇳',
    Bulgaria: '🇧🇬',
    'Burkina Faso': '🇧🇫',
    Burundi: '🇧🇮',
    'Cabo Verde': '🇨🇻',
    Cambodia: '🇰🇭',
    Cameroon: '🇨🇲',
    Canada: '🇨🇦',
    'Cayman Islands': '🇰🇾',
    'Central African Republic': '🇨🇫',
    Chad: '🇹🇩',
    Chile: '🇨🇱',
    China: '🇨🇳',
    'Christmas Island': '🇨🇽',
    'Cocos Islands': '🇨🇨',
    Colombia: '🇨🇴',
    Comoros: '🇰🇲',
    Congo: '🇨🇬',
    'Congo (Democratic Republic)': '🇨🇩',
    'Cook Islands': '🇨🇰',
    'Costa Rica': '🇨🇷',
    Croatia: '🇭🇷',
    Cuba: '🇨🇺',
    Curaçao: '🇨🇼',
    Cyprus: '🇨🇾',
    'Czech Republic': '🇨🇿',
    Denmark: '🇩🇰',
    Djibouti: '🇩🇯',
    Dominica: '🇩🇲',
    'Dominican Republic': '🇩🇴',
    Ecuador: '🇪🇨',
    Egypt: '🇪🇬',
    'El Salvador': '🇸🇻',
    'Equatorial Guinea': '🇬🇶',
    Eritrea: '🇪🇷',
    Estonia: '🇪🇪',
    Eswatini: '🇸🇿',
    Ethiopia: '🇪🇹',
    'Falkland Islands': '🇫🇰',
    'Faroe Islands': '🇫🇴',
    Fiji: '🇫🇯',
    Finland: '🇫🇮',
    France: '🇫🇷',
    'French Guiana': '🇬🇫',
    'French Polynesia': '🇵🇫',
    Gabon: '🇬🇦',
    Gambia: '🇬🇲',
    Georgia: '🇬🇪',
    Germany: '🇩🇪',
    Ghana: '🇬🇭',
    Gibraltar: '🇬🇮',
    Greece: '🇬🇷',
    Greenland: '🇬🇱',
    Grenada: '🇬🇩',
    Guadeloupe: '🇬🇵',
    Guam: '🇬🇺',
    Guatemala: '🇬🇹',
    Guernsey: '🇬🇬',
    Guinea: '🇬🇳',
    'Guinea-Bissau': '🇬🇼',
    Guyana: '🇬🇾',
    Haiti: '🇭🇹',
    Honduras: '🇭🇳',
    'Hong Kong': '🇭🇰',
    Hungary: '🇭🇺',
    Iceland: '🇮🇸',
    India: '🇮🇳',
    Indonesia: '🇮🇩',
    Iran: '🇮🇷',
    Iraq: '🇮🇶',
    Ireland: '🇮🇪',
    'Isle of Man': '🇮🇲',
    Israel: '🇮🇱',
    Italy: '🇮🇹',
    Jamaica: '🇯🇲',
    Japan: '🇯🇵',
    Jersey: '🇯🇪',
    Jordan: '🇯🇴',
    Kazakhstan: '🇰🇿',
    Kenya: '🇰🇪',
    Kiribati: '🇰🇮',
    Kosovo: '🇽🇰',
    Kuwait: '🇰🇼',
    Kyrgyzstan: '🇰🇬',
    Laos: '🇱🇦',
    Latvia: '🇱🇻',
    Lebanon: '🇱🇧',
    Lesotho: '🇱🇸',
    Liberia: '🇱🇷',
    Libya: '🇱🇾',
    Liechtenstein: '🇱🇮',
    Lithuania: '🇱🇹',
    Luxembourg: '🇱🇺',
    Macao: '🇲🇴',
    Madagascar: '🇲🇬',
    Malawi: '🇲🇼',
    Malaysia: '🇲🇾',
    Maldives: '🇲🇻',
    Mali: '🇲🇱',
    Malta: '🇲🇹',
    'Marshall Islands': '🇲🇭',
    Martinique: '🇲🇶',
    Mauritania: '🇲🇷',
    Mauritius: '🇲🇺',
    Mayotte: '🇾🇹',
    Mexico: '🇲🇽',
    Micronesia: '🇫🇲',
    Moldova: '🇲🇩',
    Monaco: '🇲🇨',
    Mongolia: '🇲🇳',
    Montenegro: '🇲🇪',
    Montserrat: '🇲🇸',
    Morocco: '🇲🇦',
    Mozambique: '🇲🇿',
    Myanmar: '🇲🇲',
    Namibia: '🇳🇦',
    Nauru: '🇳🇷',
    Nepal: '🇳🇵',
    Netherlands: '🇳🇱',
    'New Caledonia': '🇳🇨',
    'New Zealand': '🇳🇿',
    Nicaragua: '🇳🇮',
    Niger: '🇳🇪',
    Nigeria: '🇳🇬',
    Niue: '🇳🇺',
    'Norfolk Island': '🇳🇫',
    'North Korea': '🇰🇵',
    'North Macedonia': '🇲🇰',
    'Northern Mariana Islands': '🇲🇵',
    Norway: '🇳🇴',
    Oman: '🇴🇲',
    Pakistan: '🇵🇰',
    Palau: '🇵🇼',
    Palestine: '🇵🇸',
    Panama: '🇵🇦',
    'Papua New Guinea': '🇵🇬',
    Paraguay: '🇵🇾',
    Peru: '🇵🇪',
    Philippines: '🇵🇭',
    'Pitcairn Islands': '🇵🇳',
    Poland: '🇵🇱',
    Portugal: '🇵🇹',
    'Puerto Rico': '🇵🇷',
    Qatar: '🇶🇦',
    Réunion: '🇷🇪',
    Romania: '🇷🇴',
    Russia: '🇷🇺',
    Rwanda: '🇷🇼',
    'Saint Barthélemy': '🇧🇱',
    'Saint Helena': '🇸🇭',
    'Saint Kitts and Nevis': '🇰🇳',
    'Saint Lucia': '🇱🇨',
    'Saint Martin': '🇲🇫',
    'Saint Pierre and Miquelon': '🇵🇲',
    'Saint Vincent and the Grenadines': '🇻🇨',
    Samoa: '🇼🇸',
    'San Marino': '🇸🇲',
    'São Tomé and Príncipe': '🇸🇹',
    'Saudi Arabia': '🇸🇦',
    Senegal: '🇸🇳',
    Serbia: '🇷🇸',
    Seychelles: '🇸🇨',
    'Sierra Leone': '🇸🇱',
    Singapore: '🇸🇬',
    'Sint Maarten': '🇸🇽',
    Slovakia: '🇸🇰',
    Slovenia: '🇸🇮',
    'Solomon Islands': '🇸🇧',
    Somalia: '🇸🇴',
    'South Africa': '🇿🇦',
    'South Georgia': '🇬🇸',
    'South Korea': '🇰🇷',
    'South Sudan': '🇸🇸',
    Spain: '🇪🇸',
    'Sri Lanka': '🇱🇰',
    Sudan: '🇸🇩',
    Suriname: '🇸🇷',
    'Svalbard and Jan Mayen': '🇸🇯',
    Sweden: '🇸🇪',
    Switzerland: '🇨🇭',
    Syria: '🇸🇾',
    Taiwan: '🇹🇼',
    Tajikistan: '🇹🇯',
    Tanzania: '🇹🇿',
    Thailand: '🇹🇭',
    'Timor-Leste': '🇹🇱',
    Togo: '🇹🇬',
    Tokelau: '🇹🇰',
    Tonga: '🇹🇴',
    'Trinidad and Tobago': '🇹🇹',
    Tunisia: '🇹🇳',
    Turkey: '🇹🇷',
    Turkmenistan: '🇹🇲',
    'Turks and Caicos Islands': '🇹🇨',
    Tuvalu: '🇹🇻',
    Uganda: '🇺🇬',
    Ukraine: '🇺🇦',
    'United Arab Emirates': '🇦🇪',
    'United Kingdom': '🇬🇧',
    'United States': '🇺🇸',
    Uruguay: '🇺🇾',
    Uzbekistan: '🇺🇿',
    Vanuatu: '🇻🇺',
    'Vatican City': '🇻🇦',
    Venezuela: '🇻🇪',
    Vietnam: '🇻🇳',
    'Virgin Islands (British)': '🇻🇬',
    'Virgin Islands (U.S.)': '🇻🇮',
    'Wallis and Futuna': '🇼🇫',
    'Western Sahara': '🇪🇭',
    Yemen: '🇾🇪',
    Zambia: '🇿🇲',
    Zimbabwe: '🇿🇼',
}

export function getCountryFlag(name: string): string | undefined {
    return COUNTRY_FLAGS[name]
}

// A few country names don't slugify to their page's actual URL segment.
const COUNTRY_SLUG_ALIASES: Record<string, string> = {
    'Bosnia and Herzegovina': 'bosnia',
    'United Kingdom': 'britain',
}

// Keys only — every top-level /travel/<slug>/ page, either `<slug>.astro` or `<slug>/index.astro`.
// Restricted to one path segment so nested routes (e.g. photo galleries) aren't picked up.
const travelPageFiles = import.meta.glob('/src/pages/travel/*.astro')
const travelIndexFiles = import.meta.glob('/src/pages/travel/*/index.astro')

function extractSlug(path: string, pattern: RegExp): string | undefined {
    return path.match(pattern)?.[1]
}

const travelPageSlugs = new Set(
    [
        ...Object.keys(travelPageFiles).map((path) => extractSlug(path, /\/travel\/([^/]+)\.astro$/)),
        ...Object.keys(travelIndexFiles).map((path) => extractSlug(path, /\/travel\/([^/]+)\/index\.astro$/)),
    ].filter((slug): slug is string => Boolean(slug)),
)

function slugifyCountryName(name: string): string {
    return (
        COUNTRY_SLUG_ALIASES[name] ??
        name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
    )
}

/** The URL of the country's dedicated travel page, if one exists. */
export function getCountryPageUrl(name: string): string | undefined {
    const slug = slugifyCountryName(name)

    return travelPageSlugs.has(slug) ? `/travel/${slug}/` : undefined
}

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
    const yearsVisited = [...new Set(country.yearsVisited)].sort((firstYear, secondYear) => firstYear - secondYear)
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
    if (summaries.length === 0) {
        throw new Error('getSummaryStats requires at least one country summary')
    }

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
