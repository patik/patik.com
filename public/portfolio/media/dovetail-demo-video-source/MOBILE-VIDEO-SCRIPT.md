# Dovetail demo video — MOBILE cut

Companion to the desktop cut (`DEMO-VIDEO-PLAN.md`, shipped as `demo-video/dovetail-demo.mp4`,
16.6s). Same trip, same captions where they overlap, same end card — so the two read as a pair.

**Target:** ~15s, portrait, silent MP4 + poster frame.

Setup (patch, production build, seeding, ffmpeg assembly) is **identical to the desktop plan** —
follow §§1–2 and §6 of `DEMO-VIDEO-PLAN.md`. Only the differences are written out here.

Every UI detail below was verified against the running app at iPhone 14 size. Screenshots are in
`mobile/` (`01-triplist` … `07-next-day`).

---

## What's actually different on mobile

The mobile breakpoint is **≤639px** (`src/lib/useIsMobileViewport.ts`). Below it:

| | Desktop | Mobile |
|---|---|---|
| Calendar | 7-column grid | **vertical stack of full-width day cards** |
| Day navigation | header buttons | bottom **tab bar**: Day · Calendar · Map · Wishlist |
| Tapping a day | opens nothing | **opens the Day view** (`onDayClick` is mobile-only) |
| Drag and drop | works | **disabled** (`allowCalendarDragDrop = canEdit && !isMobileViewport`) |
| Header | full nav + controls | trip name + **☰ icon only** |
| Day view footer | inline | sticky bar: hotel name · share · **Today's Map** |
| Map | map + side "Places" list | map fills width, list is below the fold |

The two mobile-only affordances are the whole reason for this cut: **tap a day card to open it**,
and **the NEXT DAY card at the bottom of the day view**. They replace the desktop drag shot.

### The NEXT DAY card — verified

`src/components/day/DayViewTomorrowPreview.tsx`, `data-testid="tomorrow-preview"`. It sits after
the last entry of the day, above the sticky footer. It renders the label `NEXT DAY`, the first
entry of tomorrow with its type icon, a `time · address` line, and a chevron.

On 22 Feb it reads:

```
NEXT DAY
🗺  Amsterdam Museum (city history)
10:00 · Amstelstraat 1, 1017 DA Amsterdam            ›
```

Tapping it navigates `/day/2027-02-22` → `/day/2027-02-23`. Confirmed by clicking it.

---

## THE SCRIPT

Six shots, 15.0s. Record each clip long, trim to the stated duration.

---

**SHOT 1 — CALENDAR** · 0:00.0–0:02.5 · `/trips/netherlands-2027?view=calendar`

> CAPTION: **The whole trip, one calendar**

Opens on the vertical stack. "Thursday, 18 February · Amsterdam" is outlined as the active day,
three entries visible with times and type icons, "Met Hotel Amsterdam" on the card footer, and
"Friday, 19 February" beginning below. Tab bar sits at the bottom with **Calendar** lit green.

One slow scroll of ~600px so a second and third day card slide past. No taps.

---

**SHOT 2 — TAP INTO A DAY** · 0:02.5–0:05.0 · same URL

> CAPTION: **Tap a day to open it**

The finger indicator drifts onto the "Monday, 22 February" card, pulses, and the app pushes
straight into the Day view for that date. The tab bar's active tab slides from **Calendar** to
**Day**.

```
page.getByRole('gridcell', { name: /Monday, 22 February/i })
```

*If that locator misbehaves at mobile width, tap the card's date heading text instead — check
`.count()` first, per trap 8 in the desktop plan.*

---

**SHOT 3 — NEXT DAY** · 0:05.0–0:08.5 · lands on `/day/2027-02-22`

> CAPTION: **Next day, one tap**

The hero shot of this cut, and the longest beat. Three moves:

1. Hold ~0.6s on the timeline as it lands: 08:00 Breakfast at Scandinavian Embassy → 09:00
   Vondelpark walk → 10:20 Free IJ ferry, gaps spaced by real clock time.
2. Scroll to the bottom of the day, past Dinner at Blauw and Cocktails at Door 74, until the
   **NEXT DAY** card is fully in frame. It's ~82px tall, sitting just above the sticky footer.
3. Finger moves onto the card, pulses, and the view advances to **Tue, 23 Feb 2027** — the header
   date changes and a fresh timeline slides in starting with Amsterdam Museum at 10:00.

```
page.getByTestId('tomorrow-preview')      // verified: exactly 1 match
```

Let the new day settle for ~0.5s before the cut — the payoff is seeing the date header flip.

---

**SHOT 4 — MAP** · 0:08.5–0:11.0 · `/trips/netherlands-2027?view=map`

> CAPTION: **Everything on the map**

Type filter and "Near me (1 km)" across the top, "30 visible locations", then real Mapbox tiles
filling the width — pin cluster over Amsterdam, another over Haarlem, the plane pin at Schiphol.

Same warning as desktop: **wait on the marker, then trim hard.** Tiles plus geocoding take 8–14s.

```ts
await page.locator('[data-testid^="map-marker-"]').first()
    .waitFor({ state: 'visible', timeout: 30_000 }).catch(() => undefined)
```

Keep only the 2.5s after the map paints. No marker taps — it silently failed twice on desktop.

---

**SHOT 5 — WISHLIST** · 0:11.0–0:13.5 · `/trips/netherlands-2027?view=wishlist`

> CAPTION: **Ideas for later**

Filters stack vertically here ("Show unchecked only (17)", category and sort dropdowns), then
full-width cards: Bord'eau with its note and link, Restaurant Moeder's below. Finger taps the
first checkbox and it checks off.

```
page.getByLabel(/^Check off /).first()
```

The desktop agent needed a retry loop here (`checkbox not checked after click`) — keep it: tap,
verify checked, retry up to 3×.

---

**SHOT 6 — END CARD** · 0:13.5–0:15.0

Reuse the desktop end card exactly, re-rendered at portrait size. Full-bleed `#05201a`:

> **Dovetail**
> *React · TypeScript · Supabase · Mapbox · offline-first*

---

## Mobile-specific production notes

### 1. There is no cursor on a phone — draw a finger, not an arrow

The desktop overlay draws a macOS arrow. **On mobile that is wrong and looks it.** Replace it with
a touch indicator: a ~44px translucent circle, brand green at ~22% opacity with a 2px ring, that
glides to the target before each tap and pulses outward on `pointerdown`. Keep
`pointer-events: none`.

Hover states do not fire under touch emulation, so the `spotlight` ellipse trick from the desktop
cut does nothing useful here — **drop it**. Movement plus the tap pulse carries the attention.

### 2. Captions go at the TOP

The bottom of every mobile screen is occupied — tab bar always, sticky footer in the day view,
and the NEXT DAY card in shot 3. A bottom-left caption card covers exactly what the film is
about. Put the caption just under the header instead, full width minus 16px margins, single line,
~17px. The desktop 27px two-line card overflows 390px.

### 3. Device and video size

```ts
const context = await chromium.launchPersistentContext(profileDir, {
    ...devices['iPhone 14'],          // 390×844, hasTouch, isMobile
    deviceScaleFactor: 2,
    headless: true,
    recordVideo: { dir: outDir, size: { width: 780, height: 1688 } },
    args: ['--hide-scrollbars', '--force-color-profile=srgb'],
})
```

780×1688 is 1.3MP per frame — **lighter than the desktop 1080p capture**, so the screencast
congestion that plagued the desktop cut should bite less. Deliver native for maximum sharpness, or
upscale to 1080×1920 (1.38×, acceptable) if the portfolio wants a standard 9:16 slot.

If you go to `deviceScaleFactor: 3` / 1170×2532 for extra crispness, expect the congestion traps
to return — that's 3.0MP a frame, more than desktop was.

### 4. Tap, don't click

With `isMobile: true` and `hasTouch: true`, use `locator.tap()` rather than `.click()` / raw
`mouse.down()`. Drive the finger indicator's position with `page.mouse.move()` beforehand so it
travels to the target, then `tap()`.

### 5. Everything else

All ten traps in `DEMO-VIDEO-PLAN.md` §5 still apply — `mouse.wheel` hangs, never step an
animation from Node, `context.close()` hangs so `page.close()` + `video.saveAs()`, one profile
directory per shot, `appendFileSync` for progress logging, verify locators with `.count()`,
retry `boundingBox`, check for stale processes first.

---

## Frame check before shipping

Pull a frame every ~1.5s and look at all of them. Specifically confirm:

- Shot 2 ends on the **Day** tab lit, not Calendar.
- Shot 3's date header actually reads **Tue, 23 Feb 2027** at the end.
- Shot 4's map has painted tiles, not grey.
- No caption is sitting under the tab bar or clipped at 390px.
