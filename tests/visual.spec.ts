import fs from 'fs'
import path from 'path'
import { expect, test } from '@playwright/test'
import { routes } from './fixtures/routes'

const visualRoutes = routes.filter((route) => route.includeVisual)

// Baselines are Linux-only (see snapshotPathTemplate in playwright.config.ts). Comparing
// them against a macOS render is not a weaker check, it's a meaningless one: the two
// platforms rasterize text differently enough that 1.8–8.9% of pixels differ page to
// page, against a 0.2% regression threshold. No threshold separates that from a real
// regression, so rather than emit a screenful of diffs — or worse, quietly rewrite the
// baselines from the wrong platform — fail once with the command that does work.
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

// Expanding the country list is a state rather than a route, so it can't be driven from
// `routes`. It's worth its own baseline because expanding rewrites the whole section:
// the list drops its max-height, and above 960px the two-column overview becomes one.
test('travel-index-countries-expanded: matches visual snapshot', async ({ page }) => {
    test.skip(!IS_LINUX, 'Linux-only baselines; see the platform guard above.')

    await page.emulateMedia({ reducedMotion: 'reduce' })
    await mockNetlifyImages(page)

    await page.goto('/travel/', { waitUntil: 'networkidle' })

    // The toggle's click handler is attached when <visited-countries> upgrades. Clicking
    // before that resolves would land on inert markup and silently do nothing.
    await page.waitForFunction(() => customElements.get('visited-countries') !== undefined)

    const expandToggle = page.locator('[data-list-expand-toggle]')

    await expandToggle.click()
    await expect(expandToggle).toHaveAttribute('aria-expanded', 'true')

    // Expanding reflows the list out from under the cursor, which is left parked on
    // whichever country card lands where the toggle used to be — baking a stray hover
    // highlight into the baseline that shifts as soon as the list contents change.
    await page.mouse.move(0, 0)

    // Clicking scrolled the toggle into view; this baseline is of the top of the page.
    await page.evaluate(() => {
        document.scrollingElement?.scrollTo(0, 0)
        document.body.scrollTop = 0
    })

    // The map is masked deliberately. It draws from an external GeoChart service and is
    // being reworked, so leaving it in would churn this baseline over changes that have
    // nothing to do with the country list.
    await expect(page).toHaveScreenshot('travel-index-countries-expanded.png', {
        maxDiffPixelRatio: 0.002,
        mask: [page.locator('[data-world-map]')],
    })
})
