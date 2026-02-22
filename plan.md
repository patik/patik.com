# Testing Plan: patik.com

## Goals

- Visual regression testing so dependency upgrades (Astro, Tailwind, React, etc.) can be verified with confidence
- Smoke tests to catch broken pages / routing regressions
- Accessibility checks as a bonus layer with minimal extra effort
- Low maintenance — no overengineering for a personal site

---

## Tool: Playwright

Single tool for all three test types. No additional frameworks needed.

```
pnpm add -D @playwright/test @axe-core/playwright
pnpm exec playwright install chromium
```

Chromium only — no need to test Firefox/WebKit for a personal site.

---

## Project structure

```
tests/
  smoke.spec.ts          # page load checks, key elements
  visual.spec.ts         # screenshot comparisons
  a11y.spec.ts           # axe-core accessibility scans
  fixtures/
    routes.ts            # shared list of URLs to test
tests-snapshots/         # committed baseline screenshots (auto-created by Playwright)
playwright.config.ts
```

---

## Configuration (`playwright.config.ts`)

- **Base URL**: `http://localhost:4321` (Astro's default dev port)
- **webServer**: Run `astro build && astro preview` before tests so they run against a real production build
- **Screenshot threshold**: `0.2` (lenient enough to ignore sub-pixel anti-aliasing differences across machines)
- **Viewport**: 1280×800 for desktop baseline; optionally add a 375×812 mobile viewport
- **Update snapshots**: via `--update-snapshots` flag (never auto-update in CI)

---

## Routes to test

Covers one instance of every distinct page template:

| Route                                      | Template                                  |
| ------------------------------------------ | ----------------------------------------- |
| `/`                                        | Home                                      |
| `/about`                                   | About                                     |
| `/blog`                                    | Blog index                                |
| `/blog/complete-cross-browser-console-log` | Blog post                                 |
| `/code`                                    | Code                                      |
| `/code/user-scripts`                       | Code sub-page                             |
| `/portfolio`                               | Portfolio                                 |
| `/travel`                                  | Travel index                              |
| `/travel/france`                           | Travel country page                       |
| `/travel/uzbekistan`                       | Travel country page (has photo sub-pages) |
| `/travel/uzbekistan/photos/1`              | Photo gallery page                        |

These are defined once in `tests/fixtures/routes.ts` and imported by all spec files.

---

## Smoke tests (`smoke.spec.ts`)

For each route:

- HTTP status 200 (no build errors, no broken dynamic routes)
- `<h1>` exists (page rendered, not blank)
- `<title>` is non-empty
- No JS console errors

These run fast and catch the most common regressions.

---

## Visual regression tests (`visual.spec.ts`)

For each route, take a full-page screenshot and compare to the committed baseline.

**Baseline workflow:**

1. First run: `pnpm playwright test --update-snapshots` — creates `tests-snapshots/`
2. Commit the baseline screenshots to git
3. Future runs: diffs against the baseline; fail on any change above threshold
4. After intentional UI changes: re-run with `--update-snapshots` and commit the updated screenshots

**Scope**: Full-page screenshots (not component-level). This is sufficient for catching layout regressions from upgrades and is much simpler than component-level snapshotting.

---

## Accessibility tests (`a11y.spec.ts`)

For each route, run `axe-core` via `@axe-core/playwright` and assert zero violations at the `critical` and `serious` levels. This catches real issues (missing alt text, low contrast, missing landmark roles) without being brittle.

---

## npm scripts

```json
"test": "playwright test",
"test:update-snapshots": "playwright test --update-snapshots",
"test:ui": "playwright test --ui"
```

---

## CI (GitHub Actions / Netlify)

Add a GitHub Actions workflow that:

1. Runs on push to `main` and on PRs
2. Installs Playwright browsers with caching
3. Runs `pnpm test`
4. On failure, uploads the Playwright HTML report as an artifact (makes diffs easy to inspect)

Netlify build is separate — tests run in CI before deploy, not as part of the Netlify build command.

---

## Implementation order

1. Install dependencies and set up `playwright.config.ts`
2. Create `tests/fixtures/routes.ts`
3. Write smoke tests
4. Write visual regression tests and generate initial baselines
5. Write accessibility tests
6. Add GitHub Actions workflow
7. Update `package.json` scripts

---

## What's out of scope

- Unit testing Astro components — pages are mostly static content, not complex logic
- Multi-browser testing — personal site, Chromium is sufficient
- Storybook or component-level visual testing — too heavyweight
- Performance testing (Lighthouse CI) — possible future addition if desired
