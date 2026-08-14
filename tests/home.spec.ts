import { expect, test } from '@playwright/test'

test.describe('homepage layout', () => {
    test('places the map below the trip images on mobile', async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 })

        await page.goto('/')

        const mapBox = await page.getByLabel('See the full travel page').boundingBox()
        const finalTripBox = await page.locator('a[href="/travel/france/"]').boundingBox()

        if (!mapBox || !finalTripBox) {
            throw new Error('The homepage travel content was not rendered')
        }

        expect(mapBox.y).toBeGreaterThan(finalTripBox.y + finalTripBox.height)
    })

    test('keeps the map beside the trip images on desktop', async ({ page }) => {
        await page.goto('/')

        const mapBox = await page.getByLabel('See the full travel page').boundingBox()
        const firstTripBox = await page.locator('a[href="/travel/britain/"]').boundingBox()

        if (!mapBox || !firstTripBox) {
            throw new Error('The homepage travel content was not rendered')
        }

        expect(mapBox.x + mapBox.width).toBeLessThan(firstTripBox.x)
    })
})
