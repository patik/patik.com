import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    testDir: './tests',
    snapshotDir: './tests-snapshots',
    fullyParallel: true,
    // Fail the build in CI if test.only is accidentally left in
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    reporter: [['html', { open: 'never' }]],
    use: {
        baseURL: 'http://localhost:4321',
        viewport: { width: 1020, height: 2000 },
        colorScheme: 'dark',
    },
    projects: [
        {
            name: 'chromium',
            // viewport must come AFTER the device spread — Desktop Chrome includes
            // viewport: { width: 1280, height: 720 } which would otherwise win.
            use: { ...devices['Desktop Chrome'], viewport: { width: 1020, height: 2000 } },
        },
    ],
    webServer: {
        // astro preview is blocked by the Netlify adapter; use serve instead.
        // Run `pnpm build` before running tests locally.
        // -s (SPA mode) serves root index.html for all paths — do NOT use it.
        // Without it, serve correctly handles directory indexes (/about/ → dist/about/index.html).
        command: 'serve dist -p 4321',
        url: 'http://localhost:4321',
        // Locally: reuse a running server if one exists (run `astro build` first)
        // CI: always start fresh (build step runs before test step)
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
    },
})
