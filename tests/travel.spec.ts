import { expect, test, type Locator, type Page } from '@playwright/test'
import countries from '@src/countries.json'

function getExpectedTooltip(countryName: string): string {
    const country = countries.visited.find(({ name }) => name === countryName)

    if (!country) {
        throw new Error(`Expected ${countryName} in the visited countries fixture`)
    }

    const yearsAgo = new Date().getFullYear() - Math.max(...country.yearsVisited)
    const elapsed =
        yearsAgo === 0 ? 'last visited this year' : `last visited ${yearsAgo} ${yearsAgo === 1 ? 'year' : 'years'} ago`

    return `${country.name} — ${elapsed}${country.lived === true ? ' · lived here' : ''}`
}

async function openMapDialog(page: Page): Promise<Locator> {
    await page.goto('/travel/', { waitUntil: 'networkidle' })
    await page.locator('[data-map-expand]').click()

    return page.getByRole('dialog', { name: 'Visited countries map' })
}

test('expanded map has an accessible name', async ({ page }): Promise<void> => {
    const dialog = await openMapDialog(page)

    await expect(dialog).toBeVisible()
    await expect(dialog).toContainText(
        'Red marks recent visits, fading to ivory over time; gold marks places I’ve called home.',
    )
})

test('clicking the compact map opens the expanded map', async ({ page }): Promise<void> => {
    await page.goto('/travel/', { waitUntil: 'networkidle' })

    await page.locator('[data-map-frame]').click({ position: { x: 8, y: 8 } })

    await expect(page.getByRole('dialog', { name: 'Visited countries map' })).toBeVisible()
})

test('expanded map can zoom in and reset', async ({ page }): Promise<void> => {
    const dialog = await openMapDialog(page)
    const map = dialog.locator('svg')
    const zoomInButton = dialog.getByRole('button', { name: 'Zoom in' })
    const resetButton = dialog.getByRole('button', { name: 'Reset' })

    await zoomInButton.click()

    await expect(dialog.locator('[data-map-zoom-level]')).toHaveText('150%')
    await expect(map).toHaveAttribute('viewBox', '166.667 86.667 666.667 346.667')

    await resetButton.click()

    await expect(dialog.locator('[data-map-zoom-level]')).toHaveText('100%')
    await expect(map).toHaveAttribute('viewBox', '0 0 1000 520')
    await expect(resetButton).toBeDisabled()
})

test('double-clicking zooms in around the selected map point', async ({ page }): Promise<void> => {
    const dialog = await openMapDialog(page)
    const map = dialog.locator('svg')
    const mapBounds = await map.boundingBox()

    if (!mapBounds) {
        throw new Error('Expected the expanded map to have bounds')
    }

    await map.dblclick({ position: { x: mapBounds.width * 0.75, y: mapBounds.height * 0.25 } })

    const viewBox = await map.getAttribute('viewBox')

    if (!viewBox) {
        throw new Error('Expected the expanded map to have a viewBox')
    }

    const [x, y, width, height] = viewBox.split(' ').map(Number)

    await expect(dialog.locator('[data-map-zoom-level]')).toHaveText('150%')
    expect(x).toBeGreaterThan(200)
    expect(y).toBeLessThan(80)
    expect(width).toBeCloseTo(666.667, 2)
    expect(height).toBeCloseTo(346.667, 2)
})

test('map renders without loading an external map service', async ({ page }): Promise<void> => {
    const externalMapRequests: string[] = []

    page.on('request', (request) => {
        if (/maps\.googleapis|google\.com\/jsapi|unpkg\.com|cdn\.jsdelivr\.net/.test(request.url())) {
            externalMapRequests.push(request.url())
        }
    })

    await page.goto('/travel/', { waitUntil: 'networkidle' })

    await expect(page.locator('[data-world-map] svg').first()).toBeVisible()
    expect(externalMapRequests).toHaveLength(0)
})

test('hover shows the latest United Kingdom visit details', async ({ page }): Promise<void> => {
    const expectedTooltip = getExpectedTooltip('United Kingdom')

    await page.goto('/travel/', { waitUntil: 'networkidle' })
    await page.waitForFunction(() => customElements.get('world-map') !== undefined)

    await page.locator('[data-map-country="United Kingdom"]').hover()

    await expect(page.getByRole('tooltip')).toHaveText(expectedTooltip)
})

test('hover shows United States visit and residence details', async ({ page }): Promise<void> => {
    const expectedTooltip = getExpectedTooltip('United States')

    await page.goto('/travel/', { waitUntil: 'networkidle' })
    await page.waitForFunction(() => customElements.get('world-map') !== undefined)

    await page.locator('[data-map-country="United States"]').hover()

    await expect(page.getByRole('tooltip')).toHaveText(expectedTooltip)
})

test('hover shows Albania visit details', async ({ page }): Promise<void> => {
    const expectedTooltip = getExpectedTooltip('Albania')

    await page.goto('/travel/', { waitUntil: 'networkidle' })
    await page.waitForFunction(() => customElements.get('world-map') !== undefined)

    await page.locator('[data-map-country="Albania"]').hover()

    await expect(page.getByRole('tooltip')).toHaveText(expectedTooltip)
})

test('expanded map shows its custom tooltip immediately in the dialog layer', async ({ page }): Promise<void> => {
    const expectedTooltip = getExpectedTooltip('United States')
    const dialog = await openMapDialog(page)
    const tooltip = dialog.getByRole('tooltip')

    await dialog.locator('[data-map-country="United States"]').hover()

    await expect(tooltip).toBeVisible({ timeout: 500 })
    await expect(tooltip).toHaveText(expectedTooltip)
})

test('clicking inside the expanded map does not close it', async ({ page }): Promise<void> => {
    const dialog = await openMapDialog(page)
    const dialogBounds = await dialog.boundingBox()

    if (!dialogBounds) {
        throw new Error('Expected the expanded map dialog to have bounds')
    }

    await page.mouse.click(dialogBounds.x + 2, dialogBounds.y + 2)

    await expect(dialog).toBeVisible()
})

test('clicking the expanded map backdrop closes it', async ({ page }): Promise<void> => {
    const dialog = await openMapDialog(page)
    const dialogBounds = await dialog.boundingBox()

    if (!dialogBounds) {
        throw new Error('Expected the expanded map dialog to have bounds')
    }

    await page.mouse.click(dialogBounds.x - 5, dialogBounds.y - 5)

    await expect(dialog).not.toBeVisible()
})
