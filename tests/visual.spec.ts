import fs from 'fs'
import path from 'path'
import { expect, test } from '@playwright/test'
import { routes } from './fixtures/routes'

const visualRoutes = routes.filter((route) => route.includeVisual)

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
        : path.join(process.cwd(), 'dist', pathname)

    return filePath
}

for (const { path: routePath, label } of visualRoutes) {
    test(`${label}: matches visual snapshot`, async ({ page }) => {
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
