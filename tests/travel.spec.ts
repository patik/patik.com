import { expect, test, type Locator, type Page } from '@playwright/test'

async function openMapDialog(page: Page): Promise<Locator> {
    await page.goto('/travel/', { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: 'Expand map' }).click()

    return page.getByRole('dialog', { name: 'Visited countries map' })
}

for (const routePath of ['/travel/', '/travel/bosnia/']) {
    test(`${routePath} keeps three thumbnail columns on mobile`, async ({ page }): Promise<void> => {
        await page.setViewportSize({ width: 390, height: 844 })
        await page.goto(routePath, { waitUntil: 'networkidle' })

        const columnWidths = await page
            .locator('.travel-link-list')
            .evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' '))

        expect(columnWidths).toHaveLength(3)
    })
}

test('expanded map has an accessible name', async ({ page }): Promise<void> => {
    const dialog = await openMapDialog(page)

    await expect(dialog).toBeVisible()
    await expect(dialog).toContainText(
        'Red to blue shows years since my last visit; green marks countries I’ve lived in.',
    )
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
