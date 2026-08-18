import { expect, test, type Locator } from '@playwright/test'

const DOVETAIL_SCREENSHOT_ALT = /Dovetail.*landing page/i
const DOVETAIL_DEMO_LABEL = 'Screen recording of planning a trip in Dovetail'
const DESKTOP_DEMO = '/portfolio/media/dovetail-demo-desktop.mp4'
const MOBILE_DEMO = '/portfolio/media/dovetail-demo-mobile.mp4'

// Either side of the 801px breakpoint the page switches recordings at.
const DESKTOP_VIEWPORT = { width: 1020, height: 1000 }
const MOBILE_VIEWPORT = { width: 390, height: 844 }

const currentSrcOf = (video: Locator) => video.evaluate((element: HTMLVideoElement) => element.currentSrc)
const posterOf = (video: Locator) => video.evaluate((element: HTMLVideoElement) => element.poster)

test('portfolio demo videos provide playback controls', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })

    await page.goto('/portfolio/')
    const demoVideos = page.locator('video[data-demo]')

    // Asserted before `every`, which is vacuously true on an empty list.
    await expect(demoVideos).toHaveCount(6)

    const controlsEnabled = await demoVideos.evaluateAll((videos): boolean[] =>
        videos.map((video): boolean => video instanceof HTMLVideoElement && video.controls),
    )

    expect(controlsEnabled.every(Boolean)).toBe(true)
})

// Reduced-motion visitors never get the scroll-to-play behaviour, so the poster is the entry
// for them until they press play. A poster whose ratio differs from the video's is letterboxed
// inside the frame rather than filling it.
for (const { viewport, variant } of [
    { viewport: DESKTOP_VIEWPORT, variant: 'desktop' },
    { viewport: MOBILE_VIEWPORT, variant: 'mobile' },
] as const) {
    test(`portfolio ${variant} demo posters match their video dimensions`, async ({ page }) => {
        await page.setViewportSize(viewport)
        await page.emulateMedia({ reducedMotion: 'reduce' })

        await page.goto('/portfolio/')

        const visibleDemoVideos = page.locator('video[data-demo]:visible')

        // Every demo shows at every width; the Dovetail one swaps its poster rather than hiding,
        // so this also covers the swap staying in step with the file the browser picked.
        await expect(visibleDemoVideos).toHaveCount(6)

        const sizes = await visibleDemoVideos.evaluateAll((elements) =>
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
}

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

test('homepage uses a Dovetail screenshot that matches the color scheme', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    await page.goto('/')

    const screenshot = page.getByRole('img', { name: DOVETAIL_SCREENSHOT_ALT })

    await expect(screenshot).toHaveAttribute('src', /dovetail-hero-light/)

    await page.emulateMedia({ colorScheme: 'dark' })
    await expect
        .poll(() => screenshot.evaluate((image) => (image instanceof HTMLImageElement ? image.currentSrc : '')))
        .toContain('dovetail-hero-dark')
})

// One <video> carries both recordings as `media`-scoped <source>s. The point of that arrangement
// is the download: the file for the other form factor must never be fetched, which the earlier
// `display: none` pair did not achieve — Chrome buffered ~1MB of the hidden one regardless.
for (const { variant, viewport, wanted, unwanted } of [
    { variant: 'desktop', viewport: DESKTOP_VIEWPORT, wanted: DESKTOP_DEMO, unwanted: MOBILE_DEMO },
    { variant: 'mobile', viewport: MOBILE_VIEWPORT, wanted: MOBILE_DEMO, unwanted: DESKTOP_DEMO },
] as const) {
    test(`portfolio downloads only the ${variant} Dovetail recording at ${variant} sizes`, async ({ page }) => {
        const requested = new Set<string>()

        page.on('request', (request) => requested.add(new URL(request.url()).pathname))

        await page.setViewportSize(viewport)
        await page.goto('/portfolio/')

        const demo = page.getByLabel(DOVETAIL_DEMO_LABEL)

        await expect(demo).toBeVisible()
        await expect.poll(() => currentSrcOf(demo)).toContain(wanted)

        expect([...requested].filter((path) => path === unwanted)).toEqual([])
    })
}

test('portfolio offers the recording for the other form factor', async ({ page }) => {
    await page.setViewportSize(DESKTOP_VIEWPORT)
    await page.goto('/portfolio/')

    await expect(page.getByRole('link', { name: 'Watch the desktop demo' })).toBeHidden()

    const mobileLink = page.getByRole('link', { name: 'Watch the mobile demo' })

    await expect(mobileLink).toBeVisible()
    await expect(mobileLink).toHaveAttribute('href', MOBILE_DEMO)
    expect((await page.request.get(MOBILE_DEMO)).ok()).toBe(true)

    // The screenshot this demo replaced is gone from the portfolio; `toBeHidden` would also pass
    // if the markup were missing entirely, so count instead.
    await expect(page.getByRole('img', { name: DOVETAIL_SCREENSHOT_ALT })).toHaveCount(0)

    await page.setViewportSize(MOBILE_VIEWPORT)

    await expect(mobileLink).toBeHidden()

    const desktopLink = page.getByRole('link', { name: 'Watch the desktop demo' })

    await expect(desktopLink).toBeVisible()
    await expect(desktopLink).toHaveAttribute('href', DESKTOP_DEMO)
    expect((await page.request.get(DESKTOP_DEMO)).ok()).toBe(true)
})

test('portfolio keeps the mobile Dovetail recording within the fold', async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT)
    await page.goto('/portfolio/')

    const demo = page.getByLabel(DOVETAIL_DEMO_LABEL)

    await expect.poll(() => currentSrcOf(demo)).toContain(MOBILE_DEMO)

    const { videoHeight, viewportHeight } = await demo.evaluate((video) => ({
        videoHeight: video.getBoundingClientRect().height,
        viewportHeight: window.innerHeight,
    }))

    expect(videoHeight).toBeLessThanOrEqual(viewportHeight * 0.9 + 1)
})

// `<source media>` is consulted once, while the browser picks a file, and never again. Without the
// `load()` in PortfolioPage.astro a visitor who crosses the breakpoint keeps the file chosen at
// load: the right one for the window they no longer have.
test('portfolio re-picks the Dovetail recording after crossing the breakpoint', async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT)
    await page.goto('/portfolio/')

    const demo = page.getByLabel(DOVETAIL_DEMO_LABEL)

    await expect.poll(() => currentSrcOf(demo)).toContain(MOBILE_DEMO)

    await page.setViewportSize(DESKTOP_VIEWPORT)

    await expect.poll(() => currentSrcOf(demo)).toContain(DESKTOP_DEMO)
    await expect.poll(() => posterOf(demo)).toContain('dovetail-demo-desktop-poster')

    await page.setViewportSize(MOBILE_VIEWPORT)

    await expect.poll(() => currentSrcOf(demo)).toContain(MOBILE_DEMO)
    await expect.poll(() => posterOf(demo)).toContain('dovetail-demo-mobile-poster')
})
