import { expect, test, type Locator, type Page } from '@playwright/test'

/**
 * The football page pre-renders one panel per view/sort combination and toggles `hidden`, so
 * "which panel is visible" is the observable contract for every control and query-string state.
 */
function getVisiblePanel(page: Page): Locator {
    return page.locator('[data-view-panel]:not([hidden])')
}

async function gotoFootball(page: Page, query = ''): Promise<void> {
    await page.goto(`/football/${query}`)
}

test('defaults to the most recent matches by date', async ({ page }): Promise<void> => {
    await gotoFootball(page)

    await expect(getVisiblePanel(page)).toHaveAttribute('id', 'football-panel-date-desc')
    await expect(page.getByRole('button', { name: 'By Date' })).toHaveAttribute('aria-pressed', 'true')
})

test('switching to the earliest order swaps the panel and the URL', async ({ page }): Promise<void> => {
    await gotoFootball(page)

    await page.getByRole('button', { name: 'Earliest' }).click()

    await expect(getVisiblePanel(page)).toHaveAttribute('id', 'football-panel-date-asc')
    await expect(page).toHaveURL(/[?&]order=asc/)
})

test('the date views list the same matches in opposite order', async ({ page }): Promise<void> => {
    await gotoFootball(page)

    const newestFirst = await getVisiblePanel(page).locator('h3').allInnerTexts()

    await page.getByRole('button', { name: 'Earliest' }).click()

    const oldestFirst = await getVisiblePanel(page).locator('h3').allInnerTexts()

    expect(oldestFirst).toEqual([...newestFirst].reverse())
})

test('switching to the team view exposes the team sort controls', async ({ page }): Promise<void> => {
    await gotoFootball(page)

    await page.getByRole('button', { name: 'By Team' }).click()

    await expect(getVisiblePanel(page)).toHaveAttribute('id', 'football-panel-team-name')
    await expect(page.getByRole('button', { name: 'Times seen' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Most recent' })).toBeHidden()
    await expect(page).toHaveURL(/[?&]view=team/)
})

test('sorting teams by times seen puts the most-attended team first', async ({ page }): Promise<void> => {
    await gotoFootball(page)

    await page.getByRole('button', { name: 'By Team' }).click()
    await page.getByRole('button', { name: 'Times seen' }).click()

    await expect(getVisiblePanel(page)).toHaveAttribute('id', 'football-panel-team-count')

    const counts = await getVisiblePanel(page).locator('[data-team-anchor] [aria-label*="attended"]').allInnerTexts()
    const parsedCounts = counts.map((badgeText) => Number.parseInt(badgeText, 10))

    expect(parsedCounts.length).toBeGreaterThan(1)

    expect(parsedCounts).toEqual([...parsedCounts].sort((first, second) => second - first))
})

test('restores the team view from the query string on load', async ({ page }): Promise<void> => {
    await gotoFootball(page, '?view=team&teamSort=count')

    await expect(getVisiblePanel(page)).toHaveAttribute('id', 'football-panel-team-count')
    await expect(page.getByRole('button', { name: 'Times seen' })).toHaveAttribute('aria-pressed', 'true')
})

test('falls back to the default view for an unknown query string', async ({ page }): Promise<void> => {
    await gotoFootball(page, '?view=nonsense&order=sideways')

    await expect(getVisiblePanel(page)).toHaveAttribute('id', 'football-panel-date-desc')
})

test('following a team link opens that team card in the team view', async ({ page }): Promise<void> => {
    await gotoFootball(page)

    const teamLink = getVisiblePanel(page).locator('[data-team-link]').first()
    const teamName = await teamLink.innerText()
    const teamAnchor = await teamLink.getAttribute('data-team-anchor-target')

    await teamLink.click()

    await expect(getVisiblePanel(page)).toHaveAttribute('id', 'football-panel-team-count')
    await expect(page).toHaveURL(new RegExp(`#${teamAnchor}$`))

    const target = getVisiblePanel(page).locator(`[data-team-anchor="${teamAnchor}"]`)

    await expect(target).toBeVisible()
    await expect(target.getByRole('heading', { name: teamName })).toBeVisible()
})

test('goals and match facts stay collapsed until opened', async ({ page }): Promise<void> => {
    await gotoFootball(page)

    const firstCard = getVisiblePanel(page).locator('article').first()
    const disclosure = firstCard.locator('details')

    await expect(disclosure.locator('summary')).toContainText('Goals')
    await expect(disclosure.locator('ul')).toBeHidden()

    await disclosure.locator('summary').click()

    await expect(disclosure.locator('ul')).toBeVisible()
})
