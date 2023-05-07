export default function escapeCloudinaryString(str: string): string {
    // Special chars that must be backslashed for Cloudinary
    // https://cloudinary.com/documentation/search_api#expressions
    const specialChars = ['!', '(', ')', '{', '}', '[', ']', '*', '^', '~', '?', ':', '\\', '=', '&', '>', '<', '']

    return str
        .split('')
        .map((char) => {
            if (specialChars.includes(char)) {
                return `\\${char}`
            }

            return char
        })
        .join('')
}
