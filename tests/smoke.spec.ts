import { expect, test } from '@playwright/test'
import { routes } from './fixtures/routes'

for (const { path, label } of routes) {
    test(`${label}: loads with no errors`, async ({ page }) => {
        const consoleErrors: string[] = []
        page.on('console', (msg) => {
            if (msg.type() !== 'error') return
            // Ignore browser-level resource load failures (e.g. /.netlify/images 404s when
            // running under `serve` locally). These are infrastructure noise, not JS errors.
            if (msg.text().startsWith('Failed to load resource')) return
            consoleErrors.push(msg.text())
        })

        const response = await page.goto(path)

        expect(response?.status(), `${path} returned non-200`).toBe(200)
        // Use .first() because some pages have two h1s: the nav logo + a page heading
        await expect(page.locator('h1').first(), `${path} missing <h1>`).toBeVisible()
        await expect(page, `${path} has empty <title>`).toHaveTitle(/.+/)
        expect(consoleErrors, `${path} has JS console errors`).toHaveLength(0)
    })
}
