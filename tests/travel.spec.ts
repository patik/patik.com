import { expect, test, type Locator, type Page } from '@playwright/test'

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

test('hover describes a country visited this year', async ({ page }): Promise<void> => {
    await page.goto('/travel/', { waitUntil: 'networkidle' })
    await page.waitForFunction(() => customElements.get('world-map') !== undefined)

    await page.locator('[data-map-country="United Kingdom"]').hover()

    await expect(page.getByRole('tooltip')).toHaveText('United Kingdom — last visited this year')
})

test('hover uses singular wording for a country visited one year ago', async ({ page }): Promise<void> => {
    await page.goto('/travel/', { waitUntil: 'networkidle' })
    await page.waitForFunction(() => customElements.get('world-map') !== undefined)

    await page.locator('[data-map-country="United States"]').hover()

    await expect(page.getByRole('tooltip')).toHaveText('United States — last visited 1 year ago · lived here')
})

test('hover uses plural wording for an older visit', async ({ page }): Promise<void> => {
    const yearsAgo = new Date().getFullYear() - 2022

    await page.goto('/travel/', { waitUntil: 'networkidle' })
    await page.waitForFunction(() => customElements.get('world-map') !== undefined)

    await page.locator('[data-map-country="Albania"]').hover()

    await expect(page.getByRole('tooltip')).toHaveText(`Albania — last visited ${yearsAgo} years ago`)
})

test('expanded map shows its custom tooltip immediately in the dialog layer', async ({ page }): Promise<void> => {
    const dialog = await openMapDialog(page)
    const tooltip = dialog.getByRole('tooltip')

    await dialog.locator('[data-map-country="United States"]').hover()

    await expect(tooltip).toBeVisible({ timeout: 500 })
    await expect(tooltip).toHaveText('United States — last visited 1 year ago · lived here')
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
