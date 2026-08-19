import { chromium, devices } from 'playwright'
import { mkdirSync, rmSync } from 'node:fs'

const DIR = '/Volumes/Projects/dovetail/demo-video'
const CLIPS = `${DIR}/clips-mobile`
const outDir = `${CLIPS}/endcard`

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Self-contained end card. Deliberately NOT built on overlay-mobile's title card:
 * that renders over about:blank, which carries no <meta name="viewport">, so under
 * mobile emulation Chrome lays the page out at its default 980px width and scales it
 * down to 390 — shrinking every font by ~0.4x and making the text look tiny no matter
 * what size the CSS asks for. The app's own pages ship the meta tag, which is why
 * captions on real screens were sized correctly. Declaring it here fixes the scale.
 */
const END_CARD_HTML = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
    html, body { margin: 0; height: 100%; }
    body {
        background: #05201a; color: #fff;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, system-ui, sans-serif;
        display: flex; flex-direction: column;
        align-items: center; justify-content: center; gap: 20px;
        padding: 0 24px; text-align: center;
    }
    .main { font-size: 68px; font-weight: 700; letter-spacing: -.03em; line-height: 1.05; }
    .rule { width: 64px; height: 4px; border-radius: 2px; background: #35c397; }
    .sub {
        font-size: 26px; font-weight: 400; color: rgba(255,255,255,.72);
        letter-spacing: -.005em; line-height: 1.45; max-width: 330px;
    }
</style>
</head>
<body>
    <div class="main">Dovetail</div>
    <div class="rule"></div>
    <div class="sub">React · TypeScript · Supabase · Mapbox · offline-first</div>
</body>
</html>`

async function main(): Promise<void> {
    rmSync(outDir, { recursive: true, force: true })
    mkdirSync(outDir, { recursive: true })

    const browser = await chromium.launch({ headless: true })
    const context = await browser.newContext({
        ...devices['iPhone 14'],
        // See record-mobile.ts: the descriptor's viewport is only 390x664 and
        // recordVideo.size pads rather than scales, so set the viewport explicitly.
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 1,
        recordVideo: { dir: outDir, size: { width: 390, height: 844 } },
    })
    const page = await context.newPage()

    await page.setContent(END_CARD_HTML, { waitUntil: 'load' })
    await sleep(3200)

    const video = page.video()
    await page.close()
    await video?.saveAs(`${CLIPS}/endcard.webm`)
    await context.close()
    await browser.close()

    rmSync(outDir, { recursive: true, force: true })
    console.log('done')
}

main()
