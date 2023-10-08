import { getCodeFenceConfig } from '@src/lib/getCodeFenceConfig'

describe('getCodeFenceConfig', () => {
    describe('starting line number', () => {
        test('language-js::start-7', () => {
            expect(getCodeFenceConfig('language-js::start-7')).toStrictEqual({
                language: 'js',
                startingLineNumber: 7,
                lineProps: undefined,
            })
        })

        test('language-js::start-X', () => {
            expect(getCodeFenceConfig('language-js::start-X')).toStrictEqual({
                language: 'js',
                startingLineNumber: undefined,
                lineProps: undefined,
            })
        })
    })

    describe('line highlights', () => {
        test('language-js::highlight-2', () => {
            const result = getCodeFenceConfig('language-js::highlight-2')

            expect(result).toStrictEqual({
                language: 'js',
                lineProps: expect.any(Function),
                startingLineNumber: undefined,
            })

            if (!result.lineProps) {
                throw 'lineProps not defined'
            }

            // Test the `lineProps` function
            expect(result.lineProps(2)).toStrictEqual({ data: 'highlight' })
            expect(result.lineProps(3)).toStrictEqual({ data: undefined })
        })

        test('language-js::highlight-2,5-8', () => {
            const result = getCodeFenceConfig('language-js::highlight-2,5-8')

            expect(result).toStrictEqual({
                language: 'js',
                startingLineNumber: undefined,
                lineProps: expect.any(Function),
            })

            if (!result.lineProps) {
                throw 'lineProps not defined'
            }

            // Test the `lineProps` function
            expect(result.lineProps(2)).toStrictEqual({ data: 'highlight' })
            expect(result.lineProps(3)).toStrictEqual({ data: undefined })
            expect(result.lineProps(5)).toStrictEqual({ data: 'highlight' })
            expect(result.lineProps(6)).toStrictEqual({ data: 'highlight' })
            expect(result.lineProps(7)).toStrictEqual({ data: 'highlight' })
            expect(result.lineProps(8)).toStrictEqual({ data: 'highlight' })
            expect(result.lineProps(9)).toStrictEqual({ data: undefined })
        })
    })

    describe('both starting line number and line highlights', () => {
        test('language-js::highlight-2::start-7', () => {
            const result = getCodeFenceConfig('language-js::highlight-2::start-7')

            expect(result).toStrictEqual({
                language: 'js',
                lineProps: expect.any(Function),
                startingLineNumber: 7,
            })

            if (!result.lineProps) {
                throw 'lineProps not defined'
            }

            // Test the `lineProps` function
            expect(result.lineProps(2)).toStrictEqual({ data: 'highlight' })
            expect(result.lineProps(3)).toStrictEqual({ data: undefined })
        })

        test('language-js::start-7::highlight-2 (reverse order)', () => {
            const result = getCodeFenceConfig('language-js::start-7::highlight-2')

            expect(result).toStrictEqual({
                language: 'js',
                lineProps: expect.any(Function),
                startingLineNumber: 7,
            })

            if (!result.lineProps) {
                throw 'lineProps not defined'
            }

            // Test the `lineProps` function
            expect(result.lineProps(2)).toStrictEqual({ data: 'highlight' })
            expect(result.lineProps(3)).toStrictEqual({ data: undefined })
        })

        test('language-js::start-19::highlight-2,5-8', () => {
            const result = getCodeFenceConfig('language-js::start-19::highlight-2,5-8')

            expect(result).toStrictEqual({
                language: 'js',
                startingLineNumber: 19,
                lineProps: expect.any(Function),
            })

            if (!result.lineProps) {
                throw 'lineProps not defined'
            }

            // Test the `lineProps` function
            expect(result.lineProps(2)).toStrictEqual({ data: 'highlight' })
            expect(result.lineProps(3)).toStrictEqual({ data: undefined })
            expect(result.lineProps(5)).toStrictEqual({ data: 'highlight' })
            expect(result.lineProps(6)).toStrictEqual({ data: 'highlight' })
            expect(result.lineProps(7)).toStrictEqual({ data: 'highlight' })
            expect(result.lineProps(8)).toStrictEqual({ data: 'highlight' })
            expect(result.lineProps(9)).toStrictEqual({ data: undefined })
        })

        test('language-js::highlight-2,5-8::start-19 (reverse order)', () => {
            const result = getCodeFenceConfig('language-js::highlight-2,5-8::start-19')

            expect(result).toStrictEqual({
                language: 'js',
                startingLineNumber: 19,
                lineProps: expect.any(Function),
            })

            if (!result.lineProps) {
                throw 'lineProps not defined'
            }

            // Test the `lineProps` function
            expect(result.lineProps(2)).toStrictEqual({ data: 'highlight' })
            expect(result.lineProps(3)).toStrictEqual({ data: undefined })
            expect(result.lineProps(5)).toStrictEqual({ data: 'highlight' })
            expect(result.lineProps(6)).toStrictEqual({ data: 'highlight' })
            expect(result.lineProps(7)).toStrictEqual({ data: 'highlight' })
            expect(result.lineProps(8)).toStrictEqual({ data: 'highlight' })
            expect(result.lineProps(9)).toStrictEqual({ data: undefined })
        })
    })

    describe.each([
        ['typescript', '', '', { language: 'typescript', startingLineNumber: undefined, lineProps: undefined }, []],
        ['', '87', '', {}, []],
        ['', '', '32', {}, []],
        ['tsx', '34', '72', { language: 'tsx', startingLineNumber: 72, lineProps: expect.any(Function) }, [34]],
        ['java', '', '72', { language: 'java', startingLineNumber: 72, lineProps: undefined }, []],
        ['html', '7', '', { language: 'html', startingLineNumber: undefined, lineProps: expect.any(Function) }, [7]],
        [
            'html',
            '7,14',
            '',
            { language: 'html', startingLineNumber: undefined, lineProps: expect.any(Function) },
            [7, 14],
        ],
        [
            'html',
            '7,14-16',
            '',
            { language: 'html', startingLineNumber: undefined, lineProps: expect.any(Function) },
            [7, 14, 15, 16],
        ],
        [
            'html',
            '7,14-16',
            '8',
            { language: 'html', startingLineNumber: 8, lineProps: expect.any(Function) },
            [7, 14, 15, 16],
        ],
    ])('Combinations: %p, %p, %i', (language, highlight, start, expectedResult, expectedLineHighlights) => {
        const hasHighlights = Boolean(highlight) && Boolean(language)
        const langClass = language ? `language-${language}` : undefined
        const highlightClass = hasHighlights ? `highlight-${highlight}` : undefined
        const startClass = Boolean(language) && start ? `start-${start}` : undefined

        const className = [langClass, highlightClass, startClass].filter(Boolean).join('::')

        test(`Class name: ${className}, ${hasHighlights}`, () => {
            const result = getCodeFenceConfig(className)

            if (!language) {
                expect(className).toBe('')
            } else {
                expect(className).not.toBe('')
            }

            expect(result).toEqual(expectedResult)

            if (!hasHighlights) {
                // Nothing more to check for this test
                return
            }

            // Test the `lineProps` function to verify the  highlights

            expectedLineHighlights.forEach((line) => {
                if (!result.lineProps) {
                    throw 'lineProps not defined'
                }

                expect(result.lineProps(line)).toStrictEqual({ data: 'highlight' })
            })
        })
    })
})
