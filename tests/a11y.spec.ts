import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { routes } from './fixtures/routes'

for (const { path, label } of routes) {
    test(`${label}: no critical or serious accessibility violations`, async ({ page }) => {
        await page.goto(path)

        const results = await new AxeBuilder({ page }).analyze()

        const blocking = results.violations.filter(
            (violation) => violation.impact === 'critical' || violation.impact === 'serious',
        )

        expect(
            blocking,
            blocking.map((violation) => `[${violation.impact}] ${violation.id}: ${violation.description}`).join('\n'),
        ).toHaveLength(0)
    })
}
