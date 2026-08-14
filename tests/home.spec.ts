import { expect, test } from '@playwright/test'

test.describe('homepage layout', () => {
    test('places the map below the trip images on mobile', async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 })

        await page.goto('/')

        const mapBox = await page.getByLabel('See the full travel page').boundingBox()
        const finalTripBox = await page.locator('a[href="/travel/peru/"]').boundingBox()

        if (!mapBox || !finalTripBox) {
            throw new Error('The homepage travel content was not rendered')
        }

        expect(mapBox.y).toBeGreaterThan(finalTripBox.y + finalTripBox.height)
    })

    test('keeps the map beside the trip images on desktop', async ({ page }) => {
        await page.goto('/')

        const mapBox = await page.getByLabel('See the full travel page').boundingBox()
        const firstTripBox = await page.locator('a[href="/travel/bosnia/"]').boundingBox()

        if (!mapBox || !firstTripBox) {
            throw new Error('The homepage travel content was not rendered')
        }

        expect(mapBox.x + mapBox.width).toBeLessThan(firstTripBox.x)
    })

    test('shows the first eight travel galleries without years', async ({ page }) => {
        await page.goto('/')

        const galleryCards = page.locator('a[href^="/travel/"]:has(img)')

        await expect(galleryCards).toHaveText([
            'Bosnia',
            'Uzbekistan',
            'Ireland',
            'Italy',
            'Vietnam',
            'Britain',
            'Netherlands',
            'Peru',
        ])
        await expect(page.locator('a[href="/travel/peru/"] img')).toHaveCSS('object-position', '50% 0%')
    })

    test('shows icons for every contact link', async ({ page }) => {
        await page.goto('/')

        const contactSection = page.getByRole('heading', { name: 'Say hi' }).locator('..')

        for (const label of ['Email', 'GitHub', 'LinkedIn', 'Bluesky', 'Mastodon']) {
            const icon = contactSection.getByRole('link', { name: label }).locator('img')

            await expect(icon).toHaveCount(1)
            await expect
                .poll(() => icon.evaluate((image) => image instanceof HTMLImageElement && image.complete))
                .toBe(true)
            await expect
                .poll(() => icon.evaluate((image) => (image instanceof HTMLImageElement ? image.naturalWidth : 0)))
                .toBeGreaterThan(0)
            await expect(icon).toHaveCSS('width', '18px')
            await expect(icon).toHaveCSS('height', '18px')
        }
    })
})
