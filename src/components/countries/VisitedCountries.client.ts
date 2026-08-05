const SORT_INPUT_SELECTOR = '[data-sort-input]'
const RESIDENCE_TOGGLE_SELECTOR = '[data-residence-toggle]'
const FILTERS_SELECTOR = '[data-filters]'
const EXPAND_TOGGLE_SELECTOR = '[data-list-expand-toggle]'

function getControlledElement(root: HTMLElement, control: HTMLButtonElement): HTMLElement | null {
    const controlledId = control.getAttribute('aria-controls')

    return controlledId ? root.querySelector(`#${controlledId}`) : null
}

function updateUrl(sortInputs: HTMLInputElement[], residenceToggle: HTMLInputElement): void {
    const selectedSort = sortInputs.find((input) => input.checked)?.value

    if (!selectedSort) {
        return
    }

    const params = new URLSearchParams(window.location.search)
    const defaultSort = sortInputs.find((input) => input.defaultChecked)?.value

    if (selectedSort === defaultSort) {
        params.delete('sort')
    } else {
        params.set('sort', selectedSort)
    }

    if (residenceToggle.checked) {
        params.delete('lived')
    } else {
        params.set('lived', '0')
    }

    const queryString = params.toString()
    const nextUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ''}${window.location.hash}`
    window.history.replaceState(window.history.state, '', nextUrl)
}

class VisitedCountriesElement extends HTMLElement {
    private isInitialized = false

    connectedCallback(): void {
        if (this.isInitialized) {
            return
        }

        const sortInputs = [...this.querySelectorAll<HTMLInputElement>(SORT_INPUT_SELECTOR)]
        const residenceToggle = this.querySelector<HTMLInputElement>(RESIDENCE_TOGGLE_SELECTOR)
        const filters = this.querySelector<HTMLDetailsElement>(FILTERS_SELECTOR)
        const expandToggle = this.querySelector<HTMLButtonElement>(EXPAND_TOGGLE_SELECTOR)
        const scrollRegion = expandToggle ? getControlledElement(this, expandToggle) : null

        if (!residenceToggle || !filters || !expandToggle || !scrollRegion) {
            return
        }

        this.isInitialized = true

        const params = new URLSearchParams(window.location.search)
        const requestedSort = params.get('sort')
        const requestedSortInput = sortInputs.find((input) => input.value === requestedSort)
        const defaultSort = this.dataset.defaultSort

        if (requestedSortInput) {
            requestedSortInput.checked = true
        }

        residenceToggle.checked = params.get('lived') !== '0'

        if ((requestedSortInput && requestedSortInput.value !== defaultSort) || !residenceToggle.checked) {
            filters.open = true
        }

        sortInputs.forEach((input) => {
            input.addEventListener('change', () => updateUrl(sortInputs, residenceToggle))
        })

        residenceToggle.addEventListener('change', () => updateUrl(sortInputs, residenceToggle))

        expandToggle.addEventListener('click', () => {
            const isExpanded = expandToggle.getAttribute('aria-expanded') !== 'true'

            expandToggle.setAttribute('aria-expanded', String(isExpanded))
            scrollRegion.tabIndex = isExpanded ? -1 : 0
        })
    }
}

if (!customElements.get('visited-countries')) {
    customElements.define('visited-countries', VisitedCountriesElement)
}
