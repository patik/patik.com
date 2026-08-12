export type DatePrecision = 'day' | 'month' | 'year'

const MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

/**
 * Renders a partial ISO 8601 date (`YYYY`, `YYYY-MM`, or `YYYY-MM-DD`) at the precision the
 * source data claims, so an event only known to the month never invents a day.
 */
export function formatPartialDate(value: string, precision: DatePrecision): string {
    const [year, month, day] = value.split('-')

    if (precision === 'year') {
        return year
    }

    const monthIndex = Number(month) - 1

    if (precision === 'month') {
        return `${MONTH_NAMES[monthIndex]} ${year}`
    }

    return `${MONTH_NAMES[monthIndex]} ${Number(day)}, ${year}`
}

export function normalizeDatePrecision(datePrecision: string): DatePrecision {
    switch (datePrecision) {
        case 'day':
        case 'month':
        case 'year':
            return datePrecision
        default:
            throw new Error(`Unknown date precision: ${datePrecision}`)
    }
}
