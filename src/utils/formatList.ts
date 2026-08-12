/** Joins phrases into readable prose: "a", "a and b", "a, b, and c". */
export function formatList(parts: string[]): string {
    if (parts.length <= 2) {
        return parts.join(' and ')
    }

    const lastPart = parts[parts.length - 1]

    return `${parts.slice(0, -1).join(', ')}, and ${lastPart}`
}
