interface MapZoomElements {
    dialog: HTMLDialogElement
    frame: HTMLElement
    svg: SVGSVGElement
    zoomInButton: HTMLButtonElement
    zoomOutButton: HTMLButtonElement
    resetButton: HTMLButtonElement
    zoomLevel: HTMLOutputElement
    onInteractionStart: () => void
}

interface ViewBox {
    x: number
    y: number
    width: number
    height: number
}

interface DragStart {
    pointerId: number
    clientX: number
    clientY: number
    viewBox: ViewBox
}

const MAP_WIDTH = 1000
const MAP_HEIGHT = 520
const MIN_ZOOM = 1
const MAX_ZOOM = 4
const ZOOM_STEP = 0.5

function clamp(value: number, minimum: number, maximum: number): number {
    return Math.min(Math.max(value, minimum), maximum)
}

function formatCoordinate(value: number): number {
    return Math.round(value * 1000) / 1000
}

/**
 * Adds bounded viewBox zooming and panning to the build-time SVG map. It keeps
 * the interaction local to the expanded dialog and leaves the compact map at
 * its original extent, avoiding a client-side mapping or gesture dependency.
 */
export class WorldMapZoom {
    private readonly dialog: HTMLDialogElement
    private readonly frame: HTMLElement
    private readonly svg: SVGSVGElement
    private readonly zoomInButton: HTMLButtonElement
    private readonly zoomOutButton: HTMLButtonElement
    private readonly resetButton: HTMLButtonElement
    private readonly zoomLevel: HTMLOutputElement
    private readonly onInteractionStart: () => void
    private zoom = MIN_ZOOM
    private viewBox: ViewBox = { x: 0, y: 0, width: MAP_WIDTH, height: MAP_HEIGHT }
    private dragStart: DragStart | null = null

    constructor({
        dialog,
        frame,
        svg,
        zoomInButton,
        zoomOutButton,
        resetButton,
        zoomLevel,
        onInteractionStart,
    }: MapZoomElements) {
        this.dialog = dialog
        this.frame = frame
        this.svg = svg
        this.zoomInButton = zoomInButton
        this.zoomOutButton = zoomOutButton
        this.resetButton = resetButton
        this.zoomLevel = zoomLevel
        this.onInteractionStart = onInteractionStart

        zoomInButton.addEventListener('click', () => this.setZoom(this.zoom + ZOOM_STEP))
        zoomOutButton.addEventListener('click', () => this.setZoom(this.zoom - ZOOM_STEP))
        resetButton.addEventListener('click', () => this.reset())
        svg.addEventListener('wheel', (event) => this.handleWheel(event), { passive: false })
        svg.addEventListener('dblclick', (event) => this.handleDoubleClick(event))
        svg.addEventListener('pointerdown', (event) => this.startDrag(event))
        svg.addEventListener('pointermove', (event) => this.drag(event))
        svg.addEventListener('pointerup', (event) => this.stopDrag(event))
        svg.addEventListener('pointercancel', (event) => this.stopDrag(event))

        this.render()
    }

    reset(): void {
        this.zoom = MIN_ZOOM
        this.viewBox = { x: 0, y: 0, width: MAP_WIDTH, height: MAP_HEIGHT }
        this.dragStart = null
        this.frame.removeAttribute('data-map-dragging')
        this.render()
    }

    private setZoom(nextZoom: number, origin?: { clientX: number; clientY: number }): void {
        if (!this.dialog.open) {
            return
        }

        const zoom = clamp(nextZoom, MIN_ZOOM, MAX_ZOOM)
        const bounds = this.svg.getBoundingClientRect()
        const horizontalRatio = origin ? clamp((origin.clientX - bounds.left) / bounds.width, 0, 1) : 0.5
        const verticalRatio = origin ? clamp((origin.clientY - bounds.top) / bounds.height, 0, 1) : 0.5
        const focalX = this.viewBox.x + this.viewBox.width * horizontalRatio
        const focalY = this.viewBox.y + this.viewBox.height * verticalRatio
        const width = MAP_WIDTH / zoom
        const height = MAP_HEIGHT / zoom

        this.zoom = zoom
        this.viewBox = {
            x: clamp(focalX - width * horizontalRatio, 0, MAP_WIDTH - width),
            y: clamp(focalY - height * verticalRatio, 0, MAP_HEIGHT - height),
            width,
            height,
        }
        this.onInteractionStart()
        this.render()
    }

    private handleWheel(event: WheelEvent): void {
        if (!this.dialog.open) {
            return
        }

        event.preventDefault()

        this.setZoom(this.zoom + (event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP), event)
    }

    private handleDoubleClick(event: MouseEvent): void {
        if (!this.dialog.open) {
            return
        }

        event.preventDefault()

        this.setZoom(this.zoom + ZOOM_STEP, event)
    }

    private startDrag(event: PointerEvent): void {
        if (!this.dialog.open || this.zoom === MIN_ZOOM || event.button !== 0) {
            return
        }

        this.dragStart = {
            pointerId: event.pointerId,
            clientX: event.clientX,
            clientY: event.clientY,
            viewBox: { ...this.viewBox },
        }
        this.svg.setPointerCapture(event.pointerId)
        this.frame.setAttribute('data-map-dragging', '')
        this.onInteractionStart()
    }

    private drag(event: PointerEvent): void {
        if (!this.dragStart || event.pointerId !== this.dragStart.pointerId) {
            return
        }

        const bounds = this.svg.getBoundingClientRect()
        const xDelta = ((event.clientX - this.dragStart.clientX) * this.dragStart.viewBox.width) / bounds.width
        const yDelta = ((event.clientY - this.dragStart.clientY) * this.dragStart.viewBox.height) / bounds.height

        this.viewBox = {
            ...this.dragStart.viewBox,
            x: clamp(this.dragStart.viewBox.x - xDelta, 0, MAP_WIDTH - this.dragStart.viewBox.width),
            y: clamp(this.dragStart.viewBox.y - yDelta, 0, MAP_HEIGHT - this.dragStart.viewBox.height),
        }
        this.renderViewBox()
    }

    private stopDrag(event: PointerEvent): void {
        if (!this.dragStart || event.pointerId !== this.dragStart.pointerId) {
            return
        }

        this.dragStart = null
        this.frame.removeAttribute('data-map-dragging')
    }

    private render(): void {
        this.renderViewBox()
        this.frame.setAttribute('data-map-zoomed', String(this.zoom > MIN_ZOOM))
        this.zoomLevel.value = `${Math.round(this.zoom * 100)}%`
        this.zoomInButton.disabled = this.zoom === MAX_ZOOM
        this.zoomOutButton.disabled = this.zoom === MIN_ZOOM
        this.resetButton.disabled = this.zoom === MIN_ZOOM
    }

    private renderViewBox(): void {
        const { x, y, width, height } = this.viewBox

        this.svg.setAttribute(
            'viewBox',
            `${formatCoordinate(x)} ${formatCoordinate(y)} ${formatCoordinate(width)} ${formatCoordinate(height)}`,
        )
    }
}
