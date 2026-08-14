import { expect, test } from '@playwright/test'

test.describe('header navigation layout', () => {
    test('keeps the links on a stable second row below the desktop breakpoint', async ({ page }) => {
        await page.goto('/')

        for (const width of [360, 445, 520, 639]) {
            await page.setViewportSize({ width, height: 800 })

            const brandBox = await page.locator('nav > a').boundingBox()
            const linksBox = await page.locator('nav > ul').boundingBox()

            if (!brandBox || !linksBox) {
                throw new Error(`Header navigation was not rendered at ${width}px`)
            }

            expect(linksBox.y, `links should stay below the brand at ${width}px`).toBeGreaterThanOrEqual(
                brandBox.y + brandBox.height,
            )
        }
    })

    test('places the links beside the brand at the desktop breakpoint', async ({ page }) => {
        await page.setViewportSize({ width: 640, height: 800 })

        await page.goto('/')

        const brandBox = await page.locator('nav > a').boundingBox()
        const linksBox = await page.locator('nav > ul').boundingBox()

        if (!brandBox || !linksBox) {
            throw new Error('Header navigation was not rendered at 640px')
        }

        expect(linksBox.x).toBeGreaterThan(brandBox.x + brandBox.width)
        expect(Math.abs(linksBox.y + linksBox.height / 2 - (brandBox.y + brandBox.height / 2))).toBeLessThan(1)
    })

    test('keeps the same height across the legacy 480px content breakpoint', async ({ page }) => {
        await page.goto('/')

        await page.setViewportSize({ width: 479, height: 800 })
        const heightBelowBreakpoint = await page.locator('nav').evaluate((nav) => nav.getBoundingClientRect().height)

        await page.setViewportSize({ width: 480, height: 800 })
        const heightAtBreakpoint = await page.locator('nav').evaluate((nav) => nav.getBoundingClientRect().height)

        expect(heightAtBreakpoint).toBe(heightBelowBreakpoint)
    })
})
