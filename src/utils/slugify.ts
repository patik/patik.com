/** Turns a display name into an anchor-safe slug. */
export function slugify(value: string): string {
    return value
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}
