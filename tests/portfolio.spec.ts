import { expect, test } from '@playwright/test'

const DOVETAIL_SCREENSHOT_ALT = /Dovetail.*landing page/i

test('portfolio demo videos provide playback controls', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })

    await page.goto('/portfolio/')
    const demoVideos = page.locator('video[data-demo]')
    const controlsEnabled = await demoVideos.evaluateAll((videos): boolean[] =>
        videos.map((video): boolean => video instanceof HTMLVideoElement && video.controls),
    )

    await expect(demoVideos).toHaveCount(5)
    expect(controlsEnabled).toEqual([true, true, true, true, true])
})

test('portfolio includes both internal tools and their media', async ({ page }) => {
    await page.goto('/portfolio/')

    await expect(page.getByRole('heading', { name: 'Inc', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Gin', exact: true })).toBeVisible()
    await expect(page.getByRole('img', { name: /Inc showing a generated event form/i })).toBeVisible()
    await expect(page.getByRole('img', { name: /Gin showing the next and upcoming deployments/i })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Original completion GIF' })).toHaveAttribute(
        'href',
        '/portfolio/media/inc-tab-completion.gif',
    )
})

test('legacy user scripts route keeps Portfolio marked as current', async ({ page }) => {
    const portfolioLink = page.getByRole('link', { name: 'Portfolio' })

    await page.goto('/code/user-scripts/')

    await expect(portfolioLink).toHaveAttribute('href', '/portfolio/')
    await expect(portfolioLink).toHaveAttribute('aria-current', 'page')
    await expect(portfolioLink).toHaveClass(/active/)
})

test('robots.txt allows crawlers to access the portfolio', async ({ request }) => {
    const response = await request.get('/robots.txt')

    const robotsText = await response.text()

    expect(response.ok()).toBe(true)
    expect(robotsText).not.toMatch(/^Disallow:\s*\/portfolio\/\s*$/m)
})

for (const path of ['/', '/portfolio/']) {
    test(`${path} uses a Dovetail screenshot that matches the color scheme`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: 'light' })
        await page.goto(path)

        const screenshot = page.getByRole('img', { name: DOVETAIL_SCREENSHOT_ALT })

        await expect(screenshot).toHaveAttribute('src', /dovetail-hero-light/)

        await page.emulateMedia({ colorScheme: 'dark' })
        await expect
            .poll(() => screenshot.evaluate((image) => (image instanceof HTMLImageElement ? image.currentSrc : '')))
            .toContain('dovetail-hero-dark')
    })
}
