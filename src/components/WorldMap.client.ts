import { WorldMapZoom } from '@src/components/WorldMapZoom'

const COUNTRY_SELECTOR = '[data-map-country][data-tooltip]'

function isBackdropClick(dialog: HTMLDialogElement, event: MouseEvent): boolean {
    if (event.target !== dialog) {
        return false
    }

    const { left, right, top, bottom } = dialog.getBoundingClientRect()

    return event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom
}

class WorldMapElement extends HTMLElement {
    private isInitialized = false
    private activeCountry: Element | null = null

    connectedCallback(): void {
        if (this.isInitialized) {
            return
        }

        this.isInitialized = true

        const frame = this.querySelector<HTMLElement>('[data-map-frame]')
        const tooltip = this.querySelector<HTMLElement>('[data-map-tooltip]')
        const svg = frame?.querySelector<SVGSVGElement>('svg')

        if (!frame || !tooltip || !svg) {
            return
        }

        const hideTooltip = (): void => {
            this.activeCountry = null
            tooltip.hidden = true
        }

        // These are only rendered when WorldMap is used interactively (not as a non-interactive
        // teaser nested inside another link), so the expand/zoom/dialog behavior is opt-in below.
        const dialog = this.querySelector<HTMLDialogElement>('[data-map-dialog]')
        const dialogSlot = this.querySelector<HTMLElement>('[data-map-dialog-slot]')
        const expandButton = this.querySelector<HTMLButtonElement>('[data-map-expand]')
        const closeButton = this.querySelector<HTMLButtonElement>('[data-map-close]')
        const zoomInButton = this.querySelector<HTMLButtonElement>('[data-map-zoom-in]')
        const zoomOutButton = this.querySelector<HTMLButtonElement>('[data-map-zoom-out]')
        const resetButton = this.querySelector<HTMLButtonElement>('[data-map-zoom-reset]')
        const zoomLevel = this.querySelector<HTMLOutputElement>('[data-map-zoom-level]')

        if (
            dialog &&
            dialogSlot &&
            expandButton &&
            closeButton &&
            zoomInButton &&
            zoomOutButton &&
            resetButton &&
            zoomLevel
        ) {
            const zoom = new WorldMapZoom({
                dialog,
                frame,
                svg,
                zoomInButton,
                zoomOutButton,
                resetButton,
                zoomLevel,
                onInteractionStart: hideTooltip,
            })
            const openDialog = (): void => {
                zoom.reset()
                frame.removeAttribute('role')
                frame.removeAttribute('tabindex')
                frame.removeAttribute('aria-label')
                dialogSlot.append(frame)
                dialog.append(tooltip)
                dialog.showModal()
            }

            expandButton.addEventListener('click', openDialog)
            frame.addEventListener('click', () => {
                if (!dialog.open) {
                    openDialog()
                }
            })
            frame.addEventListener('keydown', (event) => {
                if (!dialog.open && (event.key === 'Enter' || event.key === ' ')) {
                    event.preventDefault()
                    openDialog()
                }
            })
            closeButton.addEventListener('click', () => dialog.close())
            dialog.addEventListener('close', () => {
                this.prepend(frame)
                frame.setAttribute('role', 'button')
                frame.setAttribute('tabindex', '0')
                frame.setAttribute('aria-label', 'Open expanded map')
                this.append(tooltip)
                zoom.reset()
                hideTooltip()
            })
            dialog.addEventListener('click', (event) => {
                if (isBackdropClick(dialog, event)) {
                    dialog.close()
                }
            })
        }

        this.addEventListener('pointerover', (event) => this.showTooltip(event, tooltip))
        this.addEventListener('pointermove', (event) => this.positionTooltip(event, tooltip))
        this.addEventListener('pointerout', (event) => this.hideTooltip(event, tooltip))
    }

    private showTooltip(event: PointerEvent, tooltip: HTMLElement): void {
        const country = event.target instanceof Element ? event.target.closest(COUNTRY_SELECTOR) : null
        const text = country?.getAttribute('data-tooltip')

        if (!country || !text) {
            return
        }

        this.activeCountry = country
        tooltip.textContent = text
        tooltip.hidden = false
        this.positionTooltip(event, tooltip)
    }

    private positionTooltip(event: PointerEvent, tooltip: HTMLElement): void {
        if (!this.activeCountry || tooltip.hidden) {
            return
        }

        const gap = 14
        const bounds = tooltip.getBoundingClientRect()
        const left = Math.min(event.clientX + gap, window.innerWidth - bounds.width - gap)
        const top = Math.min(event.clientY + gap, window.innerHeight - bounds.height - gap)

        tooltip.style.translate = `${Math.max(gap, left)}px ${Math.max(gap, top)}px`
    }

    private hideTooltip(event: PointerEvent, tooltip: HTMLElement): void {
        if (!this.activeCountry) {
            return
        }

        const nextTarget = event.relatedTarget instanceof Element ? event.relatedTarget.closest(COUNTRY_SELECTOR) : null

        if (nextTarget === this.activeCountry) {
            return
        }

        this.activeCountry = null
        tooltip.hidden = true
    }
}

if (!customElements.get('world-map')) {
    customElements.define('world-map', WorldMapElement)
}
