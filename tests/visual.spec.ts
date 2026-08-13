import fs from 'fs'
import path from 'path'
import { expect, test } from '@playwright/test'
import { routes } from './fixtures/routes'

const visualRoutes = routes.filter((route) => route.includeVisual)

const lightModeVisualCases = [
    { path: '/', label: 'home-light', width: 1020, height: 2000, target: 'page' },
    { path: '/travel/uzbekistan/photos/0', label: 'travel-lightbox-light', width: 1020, height: 760, target: 'lightbox' },
    { path: '/', label: 'home-light-mobile', width: 390, height: 844, target: 'page' },
    {
        path: '/travel/uzbekistan/photos/0',
        label: 'travel-lightbox-light-mobile',
        width: 390,
        height: 844,
        target: 'lightbox',
    },
] as const

// Baselines are Linux-only. `pnpm test` runs these separately through scripts/visual.sh
// so non-Linux hosts still compare against the same browser and fonts as CI.
const IS_LINUX = process.platform === 'linux'

// Netlify Image Optimization URLs (/.netlify/images?url=...) only resolve on Netlify
// infrastructure. Intercept them and serve the original local files from dist/ instead.
async function mockNetlifyImages(page: import('@playwright/test').Page): Promise<void> {
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

async function mockLightboxImage(page: import('@playwright/test').Page): Promise<void> {
    await page.route('https://res.cloudinary.com/**', async (route) => {
        await route.fulfill({ path: path.join(process.cwd(), 'src/images/uzbekistan-khiva-night.jpg') })
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
    test(`${label}: matches visual snapshot`, { tag: '@visual' }, async ({ page }) => {
        test.skip(!IS_LINUX, 'Run Linux-only baselines with `pnpm test:visual`.')

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

for (const { path: routePath, label, width, height, target } of lightModeVisualCases) {
    test(`${label}: matches visual snapshot`, { tag: '@visual' }, async ({ page }) => {
        test.skip(!IS_LINUX, 'Run Linux-only baselines with `pnpm test:visual`.')

        await page.setViewportSize({ width, height })
        await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' })
        await mockNetlifyImages(page)
        await mockLightboxImage(page)

        await page.goto(routePath, { waitUntil: 'networkidle' })

        if (target === 'lightbox') {
            await expect(page.locator('.lightbox-page')).toHaveScreenshot(`${label}.png`, {
                maxDiffPixelRatio: 0.002,
            })
        } else {
            await expect(page).toHaveScreenshot(`${label}.png`, {
                maxDiffPixelRatio: 0.002,
            })
        }
    })
}

// A state rather than a route, so it can't be driven from `routes`.
test('travel-index-countries-expanded: matches visual snapshot', { tag: '@visual' }, async ({ page }) => {
    test.skip(!IS_LINUX, 'Run Linux-only baselines with `pnpm test:visual`.')

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

    await expect(page).toHaveScreenshot('travel-index-countries-expanded.png', {
        maxDiffPixelRatio: 0.002,
    })
})

test('travel-index-map-expanded: matches visual snapshot', { tag: '@visual' }, async ({ page }) => {
    test.skip(!IS_LINUX, 'Run Linux-only baselines with `pnpm test:visual`.')

    // Don't inherit the suite's 2000px height: the dialog caps at 92vh, so a tall viewport
    // letterboxes the map and never exercises the vertical fit this covers.
    await page.setViewportSize({ width: 1020, height: 760 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await mockNetlifyImages(page)

    await page.goto('/travel/', { waitUntil: 'networkidle' })

    await page.locator('[data-map-expand]').click()

    const dialog = page.locator('dialog[open]')

    await expect(dialog).toBeVisible()

    // The build-time SVG should be present as soon as the frame moves into the dialog.
    await expect(dialog.locator('svg').first()).toBeVisible()

    // Otherwise the cursor rests on a country and its tooltip lands in the baseline.
    await page.mouse.move(0, 0)

    await expect(page).toHaveScreenshot('travel-index-map-expanded.png', {
        maxDiffPixelRatio: 0.002,
    })
})
