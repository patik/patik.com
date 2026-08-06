import fs from 'fs'
import path from 'path'
import { expect, test } from '@playwright/test'
import { routes } from './fixtures/routes'

const visualRoutes = routes.filter((route) => route.includeVisual)

// Baselines are Linux-only. macOS text rasterization differs by 1.8–8.9% of pixels
// against a 0.2% threshold, so comparing off-platform is meaningless, not just weaker.
const IS_LINUX = process.platform === 'linux'

if (!IS_LINUX) {
    test(`visual snapshots require Linux (this is ${process.platform})`, () => {
        throw new Error(
            [
                `Visual baselines are generated on Linux; ${process.platform} renders text too`,
                'differently for the comparison to mean anything.',
                '',
                '  pnpm test:visual              run the visual suite in the container CI uses',
                '  pnpm test:update-snapshots    accept intentional UI changes',
                '',
                'The rest of the suite ran normally above.',
            ].join('\n'),
        )
    })
}

// Netlify Image Optimization URLs (/.netlify/images?url=...) only resolve on Netlify
// infrastructure. Intercept them and serve the original local files from dist/ instead.
async function mockNetlifyImages(page: import('@playwright/test').Page) {
    await page.route('**/.netlify/images*', async (route) => {
        const url = new URL(route.request().url())
        const imagePath = decodeURIComponent(url.searchParams.get('url') ?? '')
        const localImagePath = resolveLocalImagePath(imagePath)

        if (localImagePath && fs.existsSync(localImagePath)) {
            await route.fulfill({ path: localImagePath })
        } else {
            await route.continue()
        }
    })
}

function resolveLocalImagePath(imagePath: string): string | null {
    if (!imagePath) {
        return null
    }

    const { pathname } = new URL(imagePath, 'http://localhost')
    const filePath = pathname.startsWith('/@fs/')
        ? pathname.slice('/@fs'.length)
        : path.join(process.cwd(), 'dist', pathname.replace(/^\/+/, ''))

    return filePath
}

for (const { path: routePath, label } of visualRoutes) {
    test(`${label}: matches visual snapshot`, async ({ page }) => {
        test.skip(!IS_LINUX, 'Linux-only baselines; see the platform guard above.')

        // Set media preferences before navigation so they apply from first render
        await page.emulateMedia({ reducedMotion: 'reduce' })
        await mockNetlifyImages(page)

        await page.goto(routePath, { waitUntil: 'networkidle' })

        // Viewport-only (no fullPage) — fullPage captures the entire DOM height including
        // space reserved for lazy-loaded images that never fetch, producing enormous blank
        // screenshots (e.g. photo gallery pages balloon to 60,000+ px).
        await expect(page).toHaveScreenshot(`${label}.png`, {
            maxDiffPixelRatio: 0.002,
        })
    })
}

// A state rather than a route, so it can't come from `routes`. Worth a baseline because
// expanding drops the list's max-height and collapses the two-column overview to one.
test('travel-index-countries-expanded: matches visual snapshot', async ({ page }) => {
    test.skip(!IS_LINUX, 'Linux-only baselines; see the platform guard above.')

    await page.emulateMedia({ reducedMotion: 'reduce' })
    await mockNetlifyImages(page)

    await page.goto('/travel/', { waitUntil: 'networkidle' })

    // Clicking before the element upgrades lands on inert markup and does nothing.
    await page.waitForFunction(() => customElements.get('visited-countries') !== undefined)

    const expandToggle = page.locator('[data-list-expand-toggle]')

    await expandToggle.click()
    await expect(expandToggle).toHaveAttribute('aria-expanded', 'true')

    // The reflow leaves the cursor parked on a country card, baking in a stray hover.
    await page.mouse.move(0, 0)

    // Clicking scrolled the toggle into view; this baseline is of the top of the page.
    await page.evaluate(() => {
        document.scrollingElement?.scrollTo(0, 0)
        document.body.scrollTop = 0
    })

    // Map masked: it's external and mid-rework, so it would churn this baseline.
    await expect(page).toHaveScreenshot('travel-index-countries-expanded.png', {
        maxDiffPixelRatio: 0.002,
        mask: [page.locator('[data-world-map]')],
    })
})

test('travel-index-map-expanded: matches visual snapshot', async ({ page }) => {
    test.skip(!IS_LINUX, 'Linux-only baselines; see the platform guard above.')

    // Shorter than the suite default: the dialog is capped at 92vh, so a 2000px-tall
    // viewport letterboxes the map and skips the tight fit that used to overflow.
    await page.setViewportSize({ width: 1020, height: 760 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await mockNetlifyImages(page)

    await page.goto('/travel/', { waitUntil: 'networkidle' })

    await page.getByRole('button', { name: 'Expand map' }).click()

    const dialog = page.locator('dialog[open]')

    await expect(dialog).toBeVisible()

    // The GeoChart draws asynchronously, after Google's loader resolves.
    await expect(dialog.locator('svg').first()).toBeVisible()

    // Otherwise the cursor rests on a country and its tooltip lands in the baseline.
    await page.mouse.move(0, 0)

    await expect(page).toHaveScreenshot('travel-index-map-expanded.png', {
        maxDiffPixelRatio: 0.002,
    })
})
