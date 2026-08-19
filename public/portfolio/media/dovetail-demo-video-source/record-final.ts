import { chromium, type BrowserContext, type Locator, type Page } from 'playwright'
import { readFileSync, rmSync, mkdirSync, appendFileSync, existsSync } from 'node:fs'
import { overlayInitScript } from './overlay'

declare global {
    interface Window {
        __demo?: { caption(title: string, sub: string): void }
        __tripPlannerE2E?: {
            reset(): Promise<void>
            seed(data: unknown): Promise<void>
            signIn(): Promise<void>
            setOnline(state: string): Promise<void>
            setCurrentUser(user: { id: string; email: string; fullName: string }): Promise<void>
        }
    }
}

const DIR = '/Volumes/Projects/dovetail/demo-video'
const PROFILES = `${DIR}/profiles-final`
const CLIPS = `${DIR}/clips-final`
const BASE = 'http://127.0.0.1:5273'
const TRIP = 'a1e4c9d2-8f3b-4b7e-9c1a-2d6f8e4b7a01'
const PROGRESS_LOG = `${DIR}/progress-final.log`

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

let cursorX = 960
let cursorY = 620

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

async function glide(page: Page, x: number, y: number, ms = 620): Promise<void> {
    const fromX = cursorX
    const fromY = cursorY
    const steps = Math.max(12, Math.round(ms / 30))

    for (let i = 1; i <= steps; i++) {
        const t = easeInOut(i / steps)
        const moved = await guard(
            page.mouse.move(fromX + (x - fromX) * t, fromY + (y - fromY) * t).then(() => true),
            2_000,
            'mouse.move',
        )
        if (moved === undefined) break
        await sleep(ms / steps)
    }

    cursorX = x
    cursorY = y
}

/**
 * Like glide, but for motion that must stay in strict order while a mouse button is
 * held (dragging). `guard` is wrong here: it races each move against a timeout and
 * discards the call on a "loss", but the underlying CDP command is still in flight and
 * fires later out of order — that produces exactly the freeze-then-teleport artifact
 * this is meant to avoid. So: await every step directly, never skip one, and let
 * congestion just make the step slower rather than dropping it.
 */
async function glideStrict(page: Page, x: number, y: number, ms: number, steps = 14): Promise<void> {
    const fromX = cursorX
    const fromY = cursorY

    for (let i = 1; i <= steps; i++) {
        const t = easeInOut(i / steps)
        try {
            await page.mouse.move(fromX + (x - fromX) * t, fromY + (y - fromY) * t)
        } catch (error) {
            log(`    ⚠ glideStrict step ${i} failed: ${error instanceof Error ? error.message : String(error)}`)
        }
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

async function spotlight(page: Page, locator: Locator, loops = 1.25, ms = 1100): Promise<void> {
    const box = await locator.boundingBox({ timeout: 10_000 }).catch(() => null)
    if (!box) return

    const cx = box.x + box.width / 2
    const cy = box.y + box.height / 2
    const rx = Math.min((box.width / 2) * 0.42, 200)
    const ry = Math.min((box.height / 2) * 0.5, 58)

    await glide(page, cx + rx, cy, 400)

    const steps = Math.max(20, Math.round(ms / 28))
    for (let i = 1; i <= steps; i++) {
        const angle = (i / steps) * loops * Math.PI * 2
        const moved = await guard(
            page.mouse.move(cx + rx * Math.cos(angle), cy + ry * Math.sin(angle)).then(() => true),
            2_000,
            'spotlight move',
        )
        if (moved === undefined) break
        await sleep(ms / steps)
    }

    cursorX = cx + rx * Math.cos(loops * Math.PI * 2)
    cursorY = cy + ry * Math.sin(loops * Math.PI * 2)
    await sleep(120)
}

async function clickEl(page: Page, locator: Locator, settle = 600): Promise<void> {
    await sleep(150)
    const { x, y } = await centreOf(locator)
    await glide(page, x, y, 500)
    await sleep(150)
    await guard(page.mouse.down(), 3_000, 'mouse.down')
    await sleep(80)
    await guard(page.mouse.up(), 3_000, 'mouse.up')
    await sleep(settle)
}

async function cap(page: Page, title: string): Promise<void> {
    await guard(page.evaluate((t) => window.__demo?.caption(t, ''), title), 8_000, 'caption')
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
        startCursor: { x: 1360, y: 560 },
        run: async (page) => {
            await cap(page, 'The whole trip, one calendar')
            await glide(page, 960, 560, 1000)
            await scrollBy(page, 700, 1700)
            await sleep(1000)
        },
    },

    drag: {
        start: `/trips/${TRIP}?view=calendar`,
        startCursor: { x: 960, y: 620 },
        run: async (page) => {
            await cap(page, 'Drag to replan')

            const source = page
                .getByRole('grid', { name: 'Trip calendar' })
                .getByRole('button', { name: /View entry: Jenever tasting/ })
                .first()
            const target = page.getByRole('gridcell', { name: /Sunday, 21 February/i })

            await spotlight(page, source, 0.8, 700)

            const from = await centreOf(source)
            const box = await target.boundingBox({ timeout: 15_000 })
            if (!box) throw new Error('No target day cell')

            await glide(page, from.x, from.y, 500)
            await sleep(250)
            try {
                await page.mouse.down()
            } catch (error) {
                log(`    ⚠ drag down failed: ${error instanceof Error ? error.message : String(error)}`)
            }
            await sleep(400)
            await glideStrict(page, box.x + box.width / 2, box.y + box.height * 0.55, 1700)
            await sleep(500)
            try {
                await page.mouse.up()
            } catch (error) {
                log(`    ⚠ drag up failed: ${error instanceof Error ? error.message : String(error)}`)
            }
            await sleep(1300)
        },
    },

    day: {
        start: `/trips/${TRIP}/day/2027-02-22`,
        startCursor: { x: 900, y: 420 },
        run: async (page) => {
            await cap(page, 'Every day, hour by hour')
            const entry = page.getByText('Free IJ ferry to Amsterdam Noord for skyline views').first()
            await spotlight(page, entry, 0.9, 950).catch(() => undefined)
            await scrollBy(page, 320, 900)
            await sleep(400)
        },
    },

    map: {
        start: `/trips/${TRIP}?view=map`,
        startCursor: { x: 690, y: 470 },
        run: async (page) => {
            await cap(page, 'Everything on the map')
            await page
                .locator('[data-testid^="map-marker-"]')
                .first()
                .waitFor({ state: 'visible', timeout: 30_000 })
                .catch(() => undefined)
            await sleep(1200)
            await glide(page, 820, 430, 900)
            await sleep(300)
            await glide(page, 700, 520, 900)
            await sleep(300)
            await glide(page, 900, 400, 900)
            await sleep(600)
        },
    },

    wishlist: {
        start: `/trips/${TRIP}?view=wishlist`,
        startCursor: { x: 900, y: 480 },
        run: async (page) => {
            await cap(page, 'Ideas for later')
            const item = page.getByText("Bord'eau (Hotel de l'Europe)").first()
            // Scope to this item's own row rather than matching on the checkbox's
            // aria-label: that label flips from "Check off" to "Uncheck" the moment it's
            // checked, so a label-based locator re-resolves to a *different* row on any
            // retry after the first click actually lands.
            const checkbox = page
                .locator('label')
                .filter({ hasText: "Bord'eau (Hotel de l'Europe)" })
                .locator('input[type="checkbox"]')
            await spotlight(page, item, 0.8, 750).catch(() => undefined)

            // The whole point of the shot is this checkbox ending up checked, so verify
            // it landed under load and retry rather than silently cutting to an
            // unchecked box (congestion can otherwise eat the click entirely).
            for (let attempt = 0; attempt < 3; attempt++) {
                await clickEl(page, checkbox, 900).catch(() => undefined)
                if (await checkbox.isChecked().catch(() => false)) break
                log(`    ⚠ checkbox not checked after click, retry ${attempt + 1}`)
                await sleep(400)
            }

            // Hold on the checked/struck-through "Done" state so the click reads as
            // finished, not interrupted, before the shot cuts.
            await sleep(1000)
        },
    },
}

const ORDER = ['calendar', 'drag', 'day', 'map', 'wishlist'] as const

async function seedProfile(profileDir: string): Promise<void> {
    rmSync(profileDir, { recursive: true, force: true })

    const context = await chromium.launchPersistentContext(profileDir, {
        headless: true,
        viewport: { width: 1920, height: 1080 },
    })
    const page = context.pages()[0] ?? (await context.newPage())

    await page.goto(`${BASE}/?allTrips=1`)
    await page.waitForFunction(() => typeof window.__tripPlannerE2E?.seed === 'function', null, { timeout: 30_000 })
    await page.evaluate(async (data) => {
        const harness = window.__tripPlannerE2E!
        await harness.reset()
        await harness.seed(data)
        await harness.signIn()
        // Seeded rows only exist in the local cache, not the real backend, so staying
        // "online" makes every mutation try to sync against a row that doesn't exist
        // there and get rejected (visible on the wishlist checkbox: a real 406 from
        // Supabase, silently reverting the checked state). Offline keeps mutations
        // local-only; the resulting offline banner is hidden by the overlay CSS.
        await harness.setOnline('offline')
        await harness.setCurrentUser({ id: 'e2e-user', email: 'demo@dovetail.app', fullName: 'Demo Traveller' })
        window.localStorage.setItem('dovetail-e2e-subscription', 'active')
        window.dispatchEvent(new CustomEvent('dovetail-e2e-state-change', { detail: { key: 'subscription' } }))
    }, seedData)

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
    await seedProfile(profileDir)

    const context: BrowserContext = await chromium.launchPersistentContext(profileDir, {
        headless: true,
        viewport: { width: 1920, height: 1080 },
        deviceScaleFactor: 1,
        recordVideo: { dir: outDir, size: { width: 1920, height: 1080 } },
        args: ['--hide-scrollbars', '--force-color-profile=srgb'],
    })
    context.setDefaultTimeout(25_000)

    await context.addInitScript(overlayInitScript)

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
