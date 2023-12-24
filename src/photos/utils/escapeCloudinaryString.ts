export default function escapeCloudinaryString(str: string): string {
    // Special chars that must be backslashed for Cloudinary
    // https://cloudinary.com/documentation/search_api#expressions
    const specialChars = ['!', '(', ')', '{', '}', '[', ']', '*', '^', '~', '?', ':', '\\', '=', '&', '>', '<']

    const chars = str.split('')

    return chars
        .map((char, index) => {
            // Make sure previous char wasn't already a backslash
            if (specialChars.includes(char) && chars[index - 1] !== '\\') {
                return `\\${char}`
            }

            return char
        })
        .join('')
}
