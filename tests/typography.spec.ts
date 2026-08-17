import { expect, test } from '@playwright/test'

test('font size adjustment stays with the sans role', async ({ page }) => {
    await page.goto('/blog/detailed-console-logging/')

    const fontSizeAdjust = await page.evaluate(() => {
        const heading = document.querySelector('article h1')
        const date = document.querySelector('article time')
        const inlineCode = document.querySelector('article code')

        if (!heading || !date || !inlineCode) {
            throw new Error('The representative blog typography was not rendered')
        }

        return {
            body: getComputedStyle(document.body).fontSizeAdjust,
            heading: getComputedStyle(heading).fontSizeAdjust,
            date: getComputedStyle(date).fontSizeAdjust,
            inlineCode: getComputedStyle(inlineCode).fontSizeAdjust,
        }
    })

    expect(fontSizeAdjust).toEqual({
        body: '0.486',
        heading: 'none',
        date: 'none',
        inlineCode: 'none',
    })
})

test('section headings keep the fluid heading margin', async ({ page }) => {
    await page.goto('/code/user-scripts/')

    const headingSpacing = await page
        .getByRole('heading', { name: 'Twitter avatar in menu' })
        .evaluate((heading) => {
            const styles = getComputedStyle(heading)

            return {
                fontSize: Number.parseFloat(styles.fontSize),
                marginBottom: Number.parseFloat(styles.marginBottom),
            }
        })

    expect(headingSpacing.marginBottom).toBeCloseTo(headingSpacing.fontSize / 2, 1)
})

test('the embedded review panel owns its text rendering', async ({ page }) => {
    await page.goto('/portfolio/pull-requests/react-query-v5-upgrade/')

    const panelStyles = await page.evaluate(() => {
        const panelHeading = document.querySelector('[class*="ghTitle"]')
        const panelParagraph = document.querySelector('[class*="ghBody"] p')
        const panelTable = document.querySelector('[class*="ghBody"] table')
        const panelCode = document.querySelector('[class*="ghBody"] code')

        if (!panelHeading || !panelParagraph || !panelTable || !panelCode) {
            throw new Error('The representative review content was not rendered')
        }

        return {
            heading: {
                fontSizeAdjust: getComputedStyle(panelHeading).fontSizeAdjust,
                overflowWrap: getComputedStyle(panelHeading).overflowWrap,
                textWrap: getComputedStyle(panelHeading).textWrap,
            },
            paragraphTextWrap: getComputedStyle(panelParagraph).textWrap,
            tableNumbers: getComputedStyle(panelTable).fontVariantNumeric,
            codeFontSizeAdjust: getComputedStyle(panelCode).fontSizeAdjust,
        }
    })

    expect(panelStyles).toEqual({
        heading: {
            fontSizeAdjust: '0.486',
            overflowWrap: 'normal',
            textWrap: 'wrap',
        },
        paragraphTextWrap: 'wrap',
        tableNumbers: 'normal',
        codeFontSizeAdjust: 'none',
    })
})
