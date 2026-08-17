import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { routes } from './fixtures/routes'

// Known pre-existing violations to suppress until they are fixed.
// Each entry documents the issue so it doesn't silently disappear.
// All dark-mode issues below stem from the site's dark theme not meeting WCAG AA contrast.
const knownViolations: Record<string, string[]> = {
    // TODO: Fix color-contrast — #428bca buttons are 3.63:1 (needs 4.5:1)
    // TODO: Fix link-name — some <a> elements have no discernible text
    '/code/user-scripts/': ['color-contrast', 'link-name'],
    // TODO: Fix color-contrast — back-link and other elements fail on dark bg
    '/travel/uzbekistan/photos/': ['color-contrast'],
    '/travel/uzbekistan/photos/samarkand/': ['color-contrast'],
}

for (const { path, label } of routes) {
    test(`${label}: no critical or serious accessibility violations`, async ({ page }) => {
        await page.goto(path)

        const results = await new AxeBuilder({ page }).analyze()

        const suppressed = knownViolations[path] ?? []

        const blocking = results.violations.filter(
            (v) => (v.impact === 'critical' || v.impact === 'serious') && !suppressed.includes(v.id),
        )

        expect(blocking, blocking.map((v) => `[${v.impact}] ${v.id}: ${v.description}`).join('\n')).toHaveLength(0)
    })
}
