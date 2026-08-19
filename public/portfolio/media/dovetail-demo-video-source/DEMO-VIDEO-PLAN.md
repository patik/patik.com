# Dovetail demo video — build plan

Target: a **15-second**, 1920×1080, silent MP4 for patik.com/portfolio, replacing the current
screenshot. Six shots, no narration, short on-screen captions.

This document is self-contained. Everything in it has been verified against the repo at
`/Volumes/Projects/dovetail` except where marked **UNVERIFIED**.

---

## 1. Why the app has to be prepared first

The demo must show a **logged-in** user, but the app only authenticates via Google/Apple OAuth —
an agent cannot log in. The way in is the app's own E2E harness (`src/lib/e2e.ts`), which fakes
auth and seeds the local Dexie store. Two problems with using it as-is:

1. The harness is disabled in production builds (`isE2EMode()` requires `!PROD`).
2. In E2E mode the map view renders a **fake stub**, not real Mapbox.

Both are fixed by a 3-line local patch. It must be reverted when the video is done.

### The patch

```diff
--- a/src/lib/e2e.ts
+++ b/src/lib/e2e.ts
 export function isE2EMode(): boolean {
-    return !import.meta.env.PROD && import.meta.env.VITE_E2E === 'true'
+    return import.meta.env.VITE_E2E === 'true'
 }

--- a/src/components/map/TripMapView.tsx
+++ b/src/components/map/TripMapView.tsx
-    const useE2ETestMap = !import.meta.env.PROD && import.meta.env.VITE_E2E === 'true'
+    const useE2ETestMap = !import.meta.env.PROD && import.meta.env.VITE_E2E_TEST_MAP === 'true'

--- a/src/components/map/PinOverrideDialog.tsx
+++ b/src/components/map/PinOverrideDialog.tsx
-    const useE2ETestMap = !import.meta.env.PROD && import.meta.env.VITE_E2E === 'true'
+    const useE2ETestMap = !import.meta.env.PROD && import.meta.env.VITE_E2E_TEST_MAP === 'true'
```

`VITE_E2E_TEST_MAP` is never set, so the real Mapbox map renders while the harness stays on.
Playwright's own suite is unaffected only while the patch is reverted — **do not commit it**.

### Build and serve

```bash
cd /Volumes/Projects/dovetail && VITE_E2E=true bun run build && bunx vite preview --host 127.0.0.1 --port 5273 --strictPort
```

**A production build is mandatory, not a nicety.** Against the Vite dev server the calendar is so
slow to scroll that Playwright commands queue behind the video screencast and locator queries time
out after 20s. The production build eliminates this.

### Revert when done

```bash
cd /Volumes/Projects/dovetail && git checkout -- src/lib/e2e.ts src/components/map/TripMapView.tsx src/components/map/PinOverrideDialog.tsx
```

---

## 2. Seed data

The Netherlands demo trip lives in `scripts/seed-netherlands-2027.sql` (trip
`b38f34b8-…`, 22 days, 18 Feb – 11 Mar 2027, Amsterdam → Delft → Rotterdam → Den Haag →
Utrecht → Haarlem). It is a Postgres script, so it must be converted to a harness payload:
82 entries, 17 wishlist items, 2 notes, 6 entries carrying pickup/dropoff detail.

A working converter exists at `build-seed.ts` (see §7) producing `netherlands-seed.json`.
Use trip id `netherlands-2027` and `user_id: 'e2e-user'`. Times are `HH:MM` strings.

Seeding runs in a **throwaway pass before recording**, into a persistent browser profile the
recording pass then reuses — so the seeding never appears on camera:

```ts
await page.goto(`${BASE}/?allTrips=1`)
await page.waitForFunction(() => typeof window.__tripPlannerE2E?.seed === 'function')
await page.evaluate(async (data) => {
    const h = window.__tripPlannerE2E!
    await h.reset()
    await h.seed(data)
    await h.signIn()
    await h.setOnline('online')            // harness defaults to OFFLINE — always set this
    await h.setCurrentUser({ id: 'e2e-user', email: 'demo@dovetail.app', fullName: 'Demo Traveller' })
    window.localStorage.setItem('dovetail-e2e-subscription', 'active')   // hides the free-plan upsell
    window.dispatchEvent(new CustomEvent('dovetail-e2e-state-change', { detail: { key: 'subscription' } }))
}, seedData)
```

Add two filler trips so the trip list doesn't look empty if you use it:
"Japan in Autumn" (2026-10-03 → 10-18) and "Lisbon Long Weekend" (2027-05-13 → 05-17).

---

## 3. THE SCRIPT

Six shots, 15.0s. Every shot is recorded as its own clip, then trimmed to the exact length in
the table. Record each clip ~4–6s longer than needed and cut the dead frames off the front —
this is the whole reason the shot list has fixed durations.

Caption style for a 15s cut: **one line, no subtitle**, ~30px, bottom-left card. The two-line
captions used in the earlier 2-minute cut are unreadable at 2.5s a beat.

---

**SHOT 1 — CALENDAR** · 0:00.0–0:03.0 · `/trips/netherlands-2027?view=calendar`

> CAPTION: **The whole trip, one calendar**

Open on the full grid: five cities colour-coded, 22 days, entries stacked by real clock time.
Cursor drifts from centre-right to centre. One slow scroll down ~700px, stopping while the
Rotterdam week is on screen. No clicks.

*Why it opens the film: it is the only shot that shows the product's actual thesis — a whole
multi-city trip legible at a glance.*

---

**SHOT 2 — DRAG** · 0:03.0–0:06.0 · same URL

> CAPTION: **Drag to replan**

The money shot. Cursor circles "Jenever tasting at Wynand Fockink" (Sat 20), presses, drags it
into Sunday 21. A ghost follows the cursor and a dashed placeholder opens in the target day; the
entry lands and the column reflows.

```
source: page.getByRole('grid', { name: 'Trip calendar' })
            .getByRole('button', { name: /View entry: Jenever tasting/ }).first()
target: page.getByRole('gridcell', { name: /Sunday, 21 February/i })
```

Drag mechanics: `mouse.move` to source → `mouse.down()` → pause 420ms → glide to
`(box.x + box.width/2, box.y + box.height*0.55)` over ~1400ms → pause 520ms → `mouse.up()`.

---

**SHOT 3 — DAY VIEW** · 0:06.0–0:08.5 · `/trips/netherlands-2027/day/2027-02-22`

> CAPTION: **Every day, hour by hour**

A single dense Amsterdam day — breakfast 08:00 through cocktails at Door 74 at 21:15 — laid out
on a real timeline with gaps proportional to real time. Cursor circles one entry
("Free IJ ferry to Amsterdam Noord for skyline views"). Short scroll. No clicks.

---

**SHOT 4 — MAP** · 0:08.5–0:11.5 · `/trips/netherlands-2027?view=map`

> CAPTION: **Everything on the map**

Real Mapbox tiles, ~30 geocoded pins across the Randstad, place list on the right. Cursor traces
a slow arc across the pin cluster over Amsterdam.

**Record this clip long and trim hard.** Tiles plus geocoding take 8–14s, and the first recorded
attempt sat static for 34s. Wait on the marker, don't sleep blindly:

```ts
await page.locator('[data-testid^="map-marker-"]').first()
    .waitFor({ state: 'visible', timeout: 30_000 }).catch(() => undefined)
```

Then keep only the 3s after the map is painted. Do not attempt a marker-click popup — it silently
failed twice and is not worth the risk at this length.

---

**SHOT 5 — WISHLIST** · 0:11.5–0:13.5 · `/trips/netherlands-2027?view=wishlist`

> CAPTION: **Ideas for later**

Unscheduled ideas with categories and notes — Kinderdijk windmills, Gouda cheese market,
"Buy museumkaart". Cursor circles one item, then clicks its checkbox and it checks off.

```
page.getByLabel(/^Check off /).first()
```

---

**SHOT 6 — END CARD** · 0:13.5–0:15.0

Hard cut to a full-bleed dark green card (`#05201a`).

> **Dovetail**
> *React · TypeScript · Supabase · Mapbox · offline-first*

Craig: swap that subtitle for whatever the portfolio page wants — a URL, or nothing.

---

### Cut for time

Deliberately **not** in the 15s cut, in the order I'd add them back if it grows to 20–25s:
timeline/compact density toggle · entry detail dialog with pickup/dropoff notes · search ·
trip notes with the private-note badge · trip list.

**Drop the dark-theme shot.** It is the one thing I could not get working: setting
`themePreference: 'dark'` in the persisted store gets clobbered because the app re-persists its
in-memory state, and three workarounds (seed-time write, `addInitScript`, write-then-reload) all
came back light. A combined write-and-reload in a single `evaluate` was mid-test when I stopped —
**UNVERIFIED**. Not worth it for 1.5s.

---

## 4. Recording harness

Headless Chromium, one persistent context **per shot**, `recordVideo` at 1920×1080.

```ts
const context = await chromium.launchPersistentContext(profileDir, {
    headless: true,
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    recordVideo: { dir: outDir, size: { width: 1920, height: 1080 } },
    args: ['--hide-scrollbars', '--force-color-profile=srgb'],
})
context.setDefaultTimeout(25_000)
```

### Synthetic cursor — required

**Playwright never records the real mouse pointer.** Without a drawn cursor the video is a
slideshow of unexplained state changes. Inject via `context.addInitScript`: a fixed-position SVG
arrow that follows `mousemove` (capture phase), plus a ripple on `mousedown`, plus the caption
card. `pointer-events: none` throughout. Because it listens to real events dispatched by
`page.mouse.*`, it stays in sync for free, and hover states light up naturally.

A working implementation is in `overlay.ts` (§7).

### Motion helpers

- `glide(page, x, y, ms)` — eased `mouse.move` in ~`ms/30` steps. Never jump the cursor.
- `spotlight(page, locator, loops, ms)` — traces a small ellipse **inside** the element
  (`rx = min(width/2 * 0.42, 200)`, `ry = min(height/2 * 0.5, 58)`) so its hover state stays lit
  while the pointer circles. This is what makes "look at this" read on a still frame.
- `scrollBy(page, total, ms)` — see the traps below.

---

## 5. Traps — read this before writing code

Each of these cost real time to find.

1. **`page.mouse.wheel` hangs forever in headless.** Never use it. Scroll with one native smooth
   scroll fired into the page, then `sleep` without touching CDP:
   ```ts
   await page.evaluate((amount) => findScrollable().scrollBy({ top: amount, behavior: 'smooth' }), total)
   await sleep(ms)
   ```
   `findScrollable()` walks up from `document.elementFromPoint(innerWidth/2, innerHeight/2)` to the
   first ancestor with `overflow-y: auto|scroll` and real overflow.

2. **Never step an animation from Node.** Driving a scroll with ~55 `evaluate` calls made a 2s
   scroll take **37s** — the commands queue behind the video screencast while the page repaints.
   One call, then sleep.

3. **`requestAnimationFrame` inside `evaluate` stalls** in headless (throttled), so an in-page rAF
   animation loop that the script awaits will hang too. Fire-and-forget only.

4. **`context.close()` hangs with `recordVideo`.** Close the page first and save explicitly:
   ```ts
   const video = page.video()
   await page.close()
   await video?.saveAs(`${CLIPS}/${name}.webm`)
   await context.close()
   ```
   Wrap all three in timeouts — they still fire warnings but the file gets written.

5. **Guard every CDP call.** Wrap in `Promise.race` against a timeout that logs and continues.
   Congestion is transient; an unguarded call can stall for minutes.

6. **One profile directory per shot.** A guard firing on close can leave a browser alive holding
   the profile lock, and the *next* shot's `launchPersistentContext` then hangs **forever**. This
   presented as a totally unrelated segment freezing.

7. **`console.log` is block-buffered** when redirected to a file. Use `appendFileSync` for progress
   or you will conclude a healthy run is hung and kill it. I did this twice.

8. **Strict-mode locator collisions**, both real:
   - `/View entry: Jenever tasting/` matches **2** (one hidden) → scope to the `Trip calendar` grid.
   - `/Next day/` matches **2** (the button, and the next-day preview card) → use
     `{ name: 'Next day', exact: true }`.
   Verify any new locator with `.count()` before building a shot on it.

9. **Retry measurement.** `boundingBox()` can time out purely from congestion. Retry 3× with a
   1.5s gap before treating it as a real failure.

10. **Check for stale processes before every run.** I lost a diagnosis to two recorder processes
    racing over one profile. `pgrep -f record.ts` first — and note an `until ! pgrep -f "…"` wait
    loop will match *its own* command string and spin forever.

---

## 6. Assembly

Encode each clip to a normalised MP4, trimming to the script's exact durations, then concat:

```bash
ffmpeg -y -ss <start> -t <dur> -i clips/<name>.webm \
  -vf "fps=30,scale=1920:1080:flags=lanczos,format=yuv420p" \
  -c:v libx264 -preset medium -crf 20 -profile:v high -an out/parts/<name>.mp4

ffmpeg -y -f concat -safe 0 -i out/concat.txt -c copy -movflags +faststart out/dovetail-demo.mp4
ffmpeg -y -ss 4 -i out/dovetail-demo.mp4 -frames:v 1 -q:v 3 out/dovetail-demo-poster.jpg
```

Expect ~1.2MB at 15s. `yuv420p` + `+faststart` are what make it play everywhere and stream from a
static host.

### Verify before shipping

Do not trust the logs — a shot can "succeed" and be 30s of a frozen screen (the map did exactly
this). Pull a frame every ~2s and look at them:

```bash
ffmpeg -y -ss <t> -i out/dovetail-demo.mp4 -frames:v 1 -vf "scale=820:-1" frames/chk-<t>.png
```

---

## 7. Reference implementation

A working (2-minute-cut) harness exists in this session's scratchpad:

```
/private/tmp/claude-501/-Volumes-Projects-dovetail/b5f4577c-a80e-4f0b-8561-66e50097d600/scratchpad/demo/
├── build-seed.ts            SQL → harness JSON converter (works)
├── netherlands-seed.json    82 entries / 17 wishlist / 2 notes
├── overlay.ts               cursor + ripple + caption + title card (works)
├── record.ts                segmented recorder with all guards (works)
├── demo-mode.patch          the 3-line patch from §1
└── clips/*.webm             12 recorded clips
```

**This directory is session-scoped and will not survive.** Copy it somewhere durable before
starting, or treat this document as the spec and rebuild — everything needed is in §§1–6.

The existing clips are usable raw material for the 15s cut: `calendar` (9.2s), `drag` (14.3s),
`day` (11.7s), `map` (14.5s), `wishlist` (11.1s) all contain the shots above and could be trimmed
rather than re-recorded. They carry the old two-line captions, though, so a clean re-record with
one-line captions will look better.
