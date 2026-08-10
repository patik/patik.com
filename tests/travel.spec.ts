import { expect, test, type Locator, type Page } from '@playwright/test'

async function openMapDialog(page: Page): Promise<Locator> {
    await page.goto('/travel/', { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: 'Expand map' }).click()

    return page.getByRole('dialog', { name: 'Visited countries map' })
}

test('expanded map has an accessible name', async ({ page }): Promise<void> => {
    const dialog = await openMapDialog(page)

    await expect(dialog).toBeVisible()
    await expect(dialog).toContainText(
        'Red to blue shows years since my last visit; green marks countries I’ve lived in.',
    )
})

test('map renders without loading the Google Maps API', async ({ page }): Promise<void> => {
    const unexpectedRequests: string[] = []
    const unexpectedConsoleMessages: string[] = []

    page.on('request', (request) => {
        if (request.url().includes('maps.googleapis.com/maps/api/js')) {
            unexpectedRequests.push(request.url())
        }
    })
    page.on('console', (message) => {
        if (/Google (Charts|Maps)|Geocoding Service/.test(message.text())) {
            unexpectedConsoleMessages.push(message.text())
        }
    })

    await page.goto('/travel/', { waitUntil: 'networkidle' })

    await expect(page.locator('[data-world-map] svg').first()).toBeVisible()
    expect(unexpectedRequests).toHaveLength(0)
    expect(unexpectedConsoleMessages).toHaveLength(0)
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
