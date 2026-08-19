import { chromium, devices, type BrowserContext, type Locator, type Page } from 'playwright'
import { readFileSync, rmSync, mkdirSync, appendFileSync, existsSync } from 'node:fs'
import { overlayMobileInitScript } from './overlay-mobile'

const DIR = '/Volumes/Projects/dovetail/demo-video'
const PROFILES = `${DIR}/profiles-mobile`
const CLIPS = `${DIR}/clips-mobile`
const BASE = 'http://127.0.0.1:5273'
const TRIP = 'a1e4c9d2-8f3b-4b7e-9c1a-2d6f8e4b7a01'
const PROGRESS_LOG = `${DIR}/progress-mobile.log`

function log(line: string): void {
    appendFileSync(PROGRESS_LOG, `${line}\n`)
    console.log(line)
}

const seedData = JSON.parse(readFileSync(`${DIR}/netherlands-seed.json`, 'utf8'))

seedData.trips.push(
    {
        id: 'japan-2026',
        user_id: 'e2e-user',
        name: 'Japan in Autumn',
        start_date: '2026-10-03',
        end_date: '2026-10-18',
        week_starts_sunday: false,
        map_link_provider: 'apple',
        created_at: '2026-05-02T09:00:00.000Z',
        updated_at: '2026-05-02T09:00:00.000Z',
    },
    {
        id: 'lisbon-2027',
        user_id: 'e2e-user',
        name: 'Lisbon Long Weekend',
        start_date: '2027-05-13',
        end_date: '2027-05-17',
        week_starts_sunday: false,
        map_link_provider: 'apple',
        created_at: '2026-07-19T09:00:00.000Z',
        updated_at: '2026-07-19T09:00:00.000Z',
    },
)

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

let cursorX = 195
let cursorY = 420

interface DemoMobileWindow {
    __demo?: { caption(title: string): void; hideCaption(): void; titleCard(main: string, sub: string): void; hideTitleCard(): void }
    __tripPlannerE2E?: {
        reset(): Promise<void>
        seed(data: unknown): Promise<void>
        signIn(): Promise<void>
        setOnline(state: string): Promise<void>
        setCurrentUser(user: { id: string; email: string; fullName: string }): Promise<void>
    }
}

async function guard<T>(work: Promise<T>, ms: number, label: string): Promise<T | undefined> {
    let timer: ReturnType<typeof setTimeout> | undefined
    const capped = new Promise<undefined>((resolve) => {
        timer = setTimeout(() => {
            log(`    ⚠ ${label} exceeded ${ms}ms`)
            resolve(undefined)
        }, ms)
    })

    try {
        return (await Promise.race([work.catch(() => undefined), capped])) as T | undefined
    } finally {
        if (timer) clearTimeout(timer)
    }
}

function easeInOut(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
}

/** Moves the on-screen finger indicator. Purely visual — page interaction is a separate tap. */
async function glide(page: Page, x: number, y: number, ms = 550): Promise<void> {
    const fromX = cursorX
    const fromY = cursorY
    const steps = Math.max(10, Math.round(ms / 35))

    for (let i = 1; i <= steps; i++) {
        const t = easeInOut(i / steps)
        const moved = await guard(
            page.mouse.move(fromX + (x - fromX) * t, fromY + (y - fromY) * t).then(() => true),
            2_000,
            'finger move',
        )
        if (moved === undefined) break
        await sleep(ms / steps)
    }

    cursorX = x
    cursorY = y
}

async function centreOf(locator: Locator): Promise<{ x: number; y: number }> {
    for (let attempt = 0; attempt < 5; attempt++) {
        await locator.scrollIntoViewIfNeeded({ timeout: 15_000 }).catch(() => undefined)
        const box = await locator.boundingBox({ timeout: 15_000 }).catch(() => null)
        if (box) return { x: box.x + box.width / 2, y: box.y + box.height / 2 }
        log(`    ⚠ centreOf retry ${attempt + 1}`)
        await sleep(2000)
    }

    throw new Error('Element has no box after retries')
}

/** Glide the finger to the target, then a real touch tap (page.mouse doesn't dispatch touch events). */
async function tapEl(page: Page, locator: Locator, settle = 650): Promise<void> {
    await sleep(150)
    const { x, y } = await centreOf(locator)
    await glide(page, x, y, 500)
    await sleep(200)
    await guard(page.touchscreen.tap(x, y), 4_000, 'touchscreen.tap')
    await sleep(settle)
}

async function cap(page: Page, title: string): Promise<void> {
    await guard(
        page.evaluate((t) => (window as unknown as DemoMobileWindow).__demo?.caption(t), title),
        8_000,
        'caption',
    )
}

async function hideCaption(page: Page): Promise<void> {
    await guard(
        page.evaluate(() => (window as unknown as DemoMobileWindow).__demo?.hideCaption()),
        5_000,
        'hideCaption',
    )
}

async function titleCard(page: Page, main: string, sub: string, hold: number): Promise<void> {
    await guard(
        page.evaluate(([m, s]) => (window as unknown as DemoMobileWindow).__demo?.titleCard(m, s), [main, sub]),
        8_000,
        'titleCard',
    )
    await sleep(hold)
}

/** One native smooth scroll, then wait without touching CDP while it animates. */
async function scrollBy(page: Page, total: number, ms = 1400): Promise<void> {
    await guard(
        page.evaluate((amount) => {
            const findScrollable = (): Element => {
                let node = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)
                while (node && node !== document.body) {
                    const style = getComputedStyle(node)
                    if (/(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight + 4) {
                        return node
                    }
                    node = node.parentElement
                }
                return document.scrollingElement ?? document.documentElement
            }

            findScrollable().scrollBy({ top: amount, behavior: 'smooth' })
        }, total),
        8_000,
        'scrollBy',
    )

    await sleep(ms)
}

interface Segment {
    start: string
    startCursor: { x: number; y: number }
    run: (page: Page) => Promise<void>
}

const SEGMENTS: Record<string, Segment> = {
    calendar: {
        start: `/trips/${TRIP}?view=calendar`,
        startCursor: { x: 300, y: 260 },
        run: async (page) => {
            await cap(page, 'The whole trip, one calendar')
            await glide(page, 195, 420, 500)
            await sleep(500)
            await scrollBy(page, 600, 1700)
            await sleep(900)
        },
    },

    tapday: {
        start: `/trips/${TRIP}?view=calendar`,
        startCursor: { x: 195, y: 260 },
        run: async (page) => {
            await cap(page, 'Tap a day to open it')
            const heading = page.getByTestId('day-header-date').filter({ hasText: '22 February' })
            await scrollBy(page, 1250, 1400)
            await sleep(500)
            await tapEl(page, heading, 900)
        },
    },

    nextday: {
        start: `/trips/${TRIP}/day/2027-02-22`,
        startCursor: { x: 195, y: 400 },
        run: async (page) => {
            await cap(page, 'Next day, one tap')
            await sleep(700)
            const preview = page.getByTestId('tomorrow-preview')
            await preview.scrollIntoViewIfNeeded({ timeout: 10_000 }).catch(() => undefined)
            await sleep(400)
            await tapEl(page, preview, 900)
        },
    },

    map: {
        start: `/trips/${TRIP}?view=map`,
        startCursor: { x: 195, y: 460 },
        run: async (page) => {
            await cap(page, 'Everything on the map')
            await page
                .locator('[data-testid^="map-marker-"]')
                .first()
                .waitFor({ state: 'visible', timeout: 30_000 })
                .catch(() => undefined)
            await sleep(1200)
            await glide(page, 230, 500, 900)
            await sleep(300)
            await glide(page, 160, 420, 900)
            await sleep(600)
        },
    },

    wishlist: {
        start: `/trips/${TRIP}?view=wishlist`,
        startCursor: { x: 195, y: 420 },
        run: async (page) => {
            await cap(page, 'Ideas for later')
            const item = page.getByText("Bord'eau (Hotel de l'Europe)").first()
            await item.scrollIntoViewIfNeeded({ timeout: 10_000 }).catch(() => undefined)
            const checkbox = page
                .locator('label')
                .filter({ hasText: "Bord'eau (Hotel de l'Europe)" })
                .locator('input[type="checkbox"]')

            await glide(page, 195, 400, 500)
            await sleep(400)

            for (let attempt = 0; attempt < 3; attempt++) {
                await tapEl(page, checkbox, 900)
                if (await checkbox.isChecked().catch(() => false)) break
                log(`    ⚠ checkbox not checked after tap, retry ${attempt + 1}`)
                await sleep(400)
            }

            await sleep(900)
        },
    },
}

const ORDER = ['calendar', 'tapday', 'nextday', 'map', 'wishlist'] as const

async function seedProfile(profileDir: string, online: boolean): Promise<void> {
    rmSync(profileDir, { recursive: true, force: true })

    const context = await chromium.launchPersistentContext(profileDir, {
        ...devices['iPhone 14'],
        headless: true,
    })
    const page = context.pages()[0] ?? (await context.newPage())

    await page.goto(`${BASE}/?allTrips=1`)
    await page.waitForFunction(
        () => typeof (window as unknown as DemoMobileWindow).__tripPlannerE2E?.seed === 'function',
        null,
        { timeout: 30_000 },
    )
    await page.evaluate(
        async ([data, isOnline]) => {
            const harness = (window as unknown as DemoMobileWindow).__tripPlannerE2E!
            await harness.reset()
            await harness.seed(data)
            await harness.signIn()
            // Seeded rows only exist in the local cache, not the real backend, so any
            // mutation attempted while "online" gets rejected and silently reverted
            // (see the desktop recorder for the full story). Every shot stays offline
            // EXCEPT the map, which has its own offline fallback (a plain places list,
            // no tiles) and needs "online" to render the real Mapbox view.
            await harness.setOnline(isOnline ? 'online' : 'offline')
            await harness.setCurrentUser({ id: 'e2e-user', email: 'demo@dovetail.app', fullName: 'Demo Traveller' })
            window.localStorage.setItem('dovetail-e2e-subscription', 'active')
            window.dispatchEvent(new CustomEvent('dovetail-e2e-state-change', { detail: { key: 'subscription' } }))
        },
        [seedData, online],
    )

    await sleep(1200)
    await guard(context.close(), 20_000, 'seed context.close')
}

async function recordSegment(name: string): Promise<void> {
    const segment = SEGMENTS[name]
    const outDir = `${CLIPS}/${name}`
    rmSync(outDir, { recursive: true, force: true })
    mkdirSync(outDir, { recursive: true })

    const startedAt = Date.now()
    log(`▶ ${name}`)

    const profileDir = `${PROFILES}/${name}`
    await seedProfile(profileDir, name === 'map')

    const context: BrowserContext = await chromium.launchPersistentContext(profileDir, {
        ...devices['iPhone 14'],
        // The iPhone 14 descriptor's viewport is 390x664 (844 is the physical screen,
        // including browser chrome), and recordVideo.size does not scale content to
        // fit — anything taller than the viewport is just padding. Override the
        // viewport to the full 844 so the frame is all app, then upscale in ffmpeg.
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 1,
        headless: true,
        recordVideo: { dir: outDir, size: { width: 390, height: 844 } },
        args: ['--hide-scrollbars', '--force-color-profile=srgb'],
    })
    context.setDefaultTimeout(25_000)

    // Timeline density sizes each entry box by its clock duration, which at mobile
    // width leaves short entries too short for their own two lines of text — titles
    // get visibly clipped mid-glyph. Compact stacks entries evenly and renders clean.
    // Written before app scripts run so the store hydrates with it already set.
    await context.addInitScript(() => {
        const KEY = 'dovetail:user-preferences'
        const raw = window.localStorage.getItem(KEY)
        const parsed = raw ? JSON.parse(raw) : { state: {}, version: 0 }
        parsed.state = { ...parsed.state, calendarDensity: 'compact' }
        window.localStorage.setItem(KEY, JSON.stringify(parsed))
    })

    await context.addInitScript(overlayMobileInitScript)

    const page = context.pages()[0] ?? (await context.newPage())
    cursorX = segment.startCursor.x
    cursorY = segment.startCursor.y

    try {
        await page.goto(`${BASE}${segment.start}`)
        await page.waitForSelector('#demo-overlay-root', { timeout: 20_000 })
        await page.mouse.move(cursorX, cursorY)
        await sleep(name === 'map' ? 2500 : 1200)

        await Promise.race([
            segment.run(page),
            new Promise((_, reject) => setTimeout(() => reject(new Error('segment cap exceeded')), 240_000)),
        ])
        log(`✓ ${name} (${((Date.now() - startedAt) / 1000).toFixed(1)}s)`)
    } catch (error) {
        log(`✗ ${name}: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
        await sleep(500)

        const video = page.video()
        await guard(page.close(), 20_000, 'page.close')
        await guard(video?.saveAs(`${CLIPS}/${name}.webm`) ?? Promise.resolve(), 90_000, 'video.saveAs')
        await guard(context.close(), 20_000, 'context.close')
        await guard(context.browser()?.close() ?? Promise.resolve(), 15_000, 'browser.close')
    }

    rmSync(outDir, { recursive: true, force: true })

    if (!existsSync(`${CLIPS}/${name}.webm`)) {
        log(`✗ ${name}: no video written`)
    }
}

const requested = process.argv.slice(2).filter((arg) => !arg.startsWith('-'))
const targets = requested.length > 0 ? requested : [...ORDER]

mkdirSync(CLIPS, { recursive: true })
mkdirSync(PROFILES, { recursive: true })
if (requested.length === 0) {
    appendFileSync(PROGRESS_LOG, `\n=== full run ${new Date().toISOString()} ===\n`)
}

for (const name of targets) {
    if (!SEGMENTS[name]) {
        log(`? unknown segment: ${name}`)
        continue
    }
    await recordSegment(name)
}

log('done')
