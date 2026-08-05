interface CountryListState {
    sort: string
    excludeResidences: boolean
}

interface VisitedCountriesElements {
    root: HTMLElement
    sortButtons: HTMLButtonElement[]
    sortPanels: HTMLElement[]
    summaries: HTMLElement[]
    residenceToggle: HTMLInputElement
    expandToggle: HTMLButtonElement
    scrollRegion: HTMLElement
    filtersToggle: HTMLButtonElement
    toolbar: HTMLElement
    defaultSort: string
}

function getControlledElement(control: HTMLButtonElement): HTMLElement | null {
    const controlledId = control.getAttribute('aria-controls')

    return controlledId ? document.getElementById(controlledId) : null
}

function getElements(root: HTMLElement): VisitedCountriesElements | null {
    const sortButtons = [...root.querySelectorAll<HTMLButtonElement>('[data-sort-button]')]
    const sortPanels = [...root.querySelectorAll<HTMLElement>('[data-sort-panel]')]
    const summaries = [...root.querySelectorAll<HTMLElement>('[data-residence-summary]')]
    const residenceToggle = root.querySelector<HTMLInputElement>('[data-residence-toggle]')
    const expandToggle = root.querySelector<HTMLButtonElement>('[data-list-expand-toggle]')
    const filtersToggle = root.querySelector<HTMLButtonElement>('[data-filters-toggle]')
    const scrollRegion = expandToggle ? getControlledElement(expandToggle) : null
    const toolbar = filtersToggle ? getControlledElement(filtersToggle) : null
    const defaultSort = root.dataset.defaultSort

    if (!residenceToggle || !expandToggle || !filtersToggle || !scrollRegion || !toolbar || !defaultSort) {
        return null
    }

    return {
        root,
        sortButtons,
        sortPanels,
        summaries,
        residenceToggle,
        expandToggle,
        scrollRegion,
        filtersToggle,
        toolbar,
        defaultSort,
    }
}

/** Connects the pre-rendered country panels to their filter, sort, and expansion controls. */
export function initializeVisitedCountries(root: HTMLElement): void {
    const elements = getElements(root)

    if (!elements) {
        return
    }

    const validSorts = new Set(elements.sortPanels.map((panel) => panel.dataset.sortPanel))

    const getExpandLabel = (isExpanded: boolean, residenceFilter: string): string => {
        if (isExpanded) {
            return 'Collapse list'
        }

        const count =
            residenceFilter === 'excludingResidences'
                ? elements.expandToggle.dataset.countExcludingResidences
                : elements.expandToggle.dataset.countAll

        return `Show all ${count} countries`
    }

    const getFiltersLabel = (isExpanded: boolean, sort: string): string => {
        if (isExpanded) {
            return 'Hide filters'
        }

        const activeButton = elements.sortButtons.find((button) => button.dataset.sort === sort)

        return `Filters: ${activeButton?.dataset.label ?? elements.filtersToggle.dataset.defaultSortLabel}`
    }

    const applyState = (state: CountryListState, shouldUpdateUrl: boolean): void => {
        const residenceFilter = state.excludeResidences ? 'excludingResidences' : 'all'

        elements.sortButtons.forEach((button) => {
            button.setAttribute('aria-pressed', button.dataset.sort === state.sort ? 'true' : 'false')
        })

        elements.residenceToggle.checked = !state.excludeResidences

        elements.summaries.forEach((summary) => {
            summary.hidden = summary.dataset.residenceSummary !== residenceFilter
        })

        elements.sortPanels.forEach((panel) => {
            const matchesSort = panel.dataset.sortPanel === state.sort
            const matchesResidence = panel.dataset.residencePanel === residenceFilter
            panel.hidden = !(matchesSort && matchesResidence)
        })

        const isListExpanded = elements.expandToggle.getAttribute('aria-expanded') === 'true'
        elements.expandToggle.textContent = getExpandLabel(isListExpanded, residenceFilter)

        const areFiltersExpanded = elements.filtersToggle.getAttribute('aria-expanded') === 'true'
        elements.filtersToggle.textContent = getFiltersLabel(areFiltersExpanded, state.sort)

        if (shouldUpdateUrl) {
            const params = new URLSearchParams(window.location.search)

            if (state.sort === elements.defaultSort) {
                params.delete('sort')
            } else {
                params.set('sort', state.sort)
            }

            if (state.excludeResidences) {
                params.set('lived', '0')
            } else {
                params.delete('lived')
            }

            const queryString = params.toString()
            const nextUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ''}${window.location.hash}`
            window.history.replaceState(window.history.state, '', nextUrl)
        }
    }

    const params = new URLSearchParams(window.location.search)
    const requestedSort = params.get('sort')
    const currentState: CountryListState = {
        sort: requestedSort && validSorts.has(requestedSort) ? requestedSort : elements.defaultSort,
        excludeResidences: params.get('lived') === '0',
    }

    // Start with the filters expanded when the URL requests a non-default sort or
    // residence filter, so the visible control matches the state it's showing.
    if (currentState.sort !== elements.defaultSort || currentState.excludeResidences) {
        elements.toolbar.hidden = false
        elements.filtersToggle.setAttribute('aria-expanded', 'true')
    }

    applyState(currentState, false)

    elements.sortButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const sort = button.dataset.sort

            if (sort) {
                currentState.sort = sort
                applyState(currentState, true)
            }
        })
    })

    elements.residenceToggle.addEventListener('change', () => {
        currentState.excludeResidences = !elements.residenceToggle.checked
        applyState(currentState, true)
    })

    elements.filtersToggle.addEventListener('click', () => {
        const areFiltersExpanded = elements.filtersToggle.getAttribute('aria-expanded') !== 'true'

        elements.filtersToggle.setAttribute('aria-expanded', String(areFiltersExpanded))
        elements.toolbar.hidden = !areFiltersExpanded
        elements.filtersToggle.textContent = getFiltersLabel(areFiltersExpanded, currentState.sort)
    })

    elements.expandToggle.addEventListener('click', () => {
        const isListExpanded = elements.expandToggle.getAttribute('aria-expanded') !== 'true'

        elements.expandToggle.setAttribute('aria-expanded', String(isListExpanded))
        elements.scrollRegion.tabIndex = isListExpanded ? -1 : 0

        const residenceFilter = currentState.excludeResidences ? 'excludingResidences' : 'all'
        elements.expandToggle.textContent = getExpandLabel(isListExpanded, residenceFilter)
    })
}
