import { expect, test } from '@playwright/test'

test('portfolio demo videos provide playback controls', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })

    await page.goto('/portfolio/')
    const demoVideos = page.locator('video[data-demo]')
    const controlsEnabled = await demoVideos.evaluateAll((videos): boolean[] =>
        videos.map((video): boolean => video instanceof HTMLVideoElement && video.controls),
    )

    await expect(demoVideos).toHaveCount(4)
    expect(controlsEnabled).toEqual([true, true, true, true])
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
