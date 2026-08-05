import type { CountrySortMode, ResidenceFilter } from './countries'

export interface SortOption {
    mode: CountrySortMode
    label: string
    heading: string
    isDefault?: boolean
}

export interface ResidenceState {
    filter: ResidenceFilter
    isDefault?: boolean
}

export const SORT_OPTIONS: SortOption[] = [
    { mode: 'recent', label: 'Most recent', heading: 'most recent visit', isDefault: true },
    { mode: 'visits', label: 'Most visits', heading: 'number of visits' },
    { mode: 'first', label: 'First visit', heading: 'first visit' },
    { mode: 'name', label: 'A–Z', heading: 'name' },
]

// The default (and only build-time-visible) panel includes lived-in countries.
export const RESIDENCE_STATES: ResidenceState[] = [
    { filter: 'excludingResidences' },
    { filter: 'all', isDefault: true },
]

export const DEFAULT_SORT = SORT_OPTIONS.find((option) => option.isDefault)?.mode ?? 'recent'
export const DEFAULT_RESIDENCE_FILTER = RESIDENCE_STATES.find((state) => state.isDefault)?.filter ?? 'all'
export const SCROLL_REGION_ID = 'countries-scroll'

export function getPanelId(filter: ResidenceFilter, mode: CountrySortMode): string {
    return `countries-panel-${filter}-${mode}`
}

export function getSortControls(mode: CountrySortMode): string {
    return RESIDENCE_STATES.map((state) => getPanelId(state.filter, mode)).join(' ')
}
