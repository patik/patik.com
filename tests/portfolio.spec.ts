import { expect, test } from '@playwright/test'

const DOVETAIL_SCREENSHOT_ALT = /Dovetail.*landing page/i

test('portfolio demo videos provide playback controls', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })

    await page.goto('/portfolio/')
    const demoVideos = page.locator('video[data-demo]')

    // Asserted before `every`, which is vacuously true on an empty list.
    await expect(demoVideos).toHaveCount(5)

    const controlsEnabled = await demoVideos.evaluateAll((videos): boolean[] =>
        videos.map((video): boolean => video instanceof HTMLVideoElement && video.controls),
    )

    expect(controlsEnabled.every(Boolean)).toBe(true)
})

// Reduced-motion visitors never get the scroll-to-play behaviour, so the poster is the entry
// for them until they press play. A poster whose ratio differs from the video's is letterboxed
// inside the frame rather than filling it.
test('portfolio demo posters match their video dimensions', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })

    await page.goto('/portfolio/')

    const sizes = await page.locator('video[data-demo]').evaluateAll((elements) =>
        Promise.all(
            elements
                .filter((element): element is HTMLVideoElement => element instanceof HTMLVideoElement)
                .map(async (video) => {
                    if (video.readyState < HTMLMediaElement.HAVE_METADATA) {
                        await new Promise((resolve) =>
                            video.addEventListener('loadedmetadata', resolve, { once: true }),
                        )
                    }

                    const poster = new Image()

                    poster.src = video.poster
                    await poster.decode()

                    return {
                        name: video.poster.split('/').pop() ?? '',
                        video: `${video.videoWidth}x${video.videoHeight}`,
                        poster: `${poster.naturalWidth}x${poster.naturalHeight}`,
                    }
                }),
        ),
    )

    expect(sizes.filter(({ video, poster }) => video !== poster)).toEqual([])
})

test('portfolio includes both internal tools and their media', async ({ page }) => {
    await page.goto('/portfolio/')

    await expect(page.getByRole('heading', { name: 'Inc', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Gin', exact: true })).toBeVisible()
    await expect(page.getByRole('img', { name: /Gin showing the next and upcoming deployments/i })).toBeVisible()

    // The screenshot is far too dense to read at its rendered width, so it links to the full size.
    const incScreenshot = page.getByRole('img', { name: /Inc showing a generated event form/i })

    await expect(incScreenshot).toBeVisible()

    const fullSize = incScreenshot.locator('xpath=ancestor::a[1]')

    await expect(fullSize).toHaveAttribute('href', /inc-main[\w.]*\.webp$/)

    const response = await page.request.get((await fullSize.getAttribute('href')) ?? '')

    expect(response.ok()).toBe(true)
})

test('legacy user scripts route keeps Portfolio marked as current', async ({ page }) => {
    const portfolioLink = page.getByRole('link', { name: 'Portfolio' })

    await page.goto('/code/user-scripts/')

    await expect(portfolioLink).toHaveAttribute('href', '/portfolio/')
    await expect(portfolioLink).toHaveAttribute('aria-current', 'page')
    await expect(portfolioLink).toHaveClass(/active/)
})

test('legacy user scripts screenshot links to its full-size image', async ({ page }) => {
    await page.goto('/code/user-scripts/')

    const screenshotLink = page.getByRole('link', { name: 'Magnet Link Display screenshot' })

    await expect(screenshotLink).toHaveAttribute('href', /magnet-links[\w.]*\.png$/)

    const response = await page.request.get((await screenshotLink.getAttribute('href')) ?? '')

    expect(response.ok()).toBe(true)
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
