/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/components/blog/**/*.tsx',
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './src/photos/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'accent-1': '#FAFAFA',
                'accent-2': '#EAEAEA',
                'accent-7': '#333',
                success: '#0070f3',
                cyan: '#79FFE1',
            },
            spacing: {
                28: '7rem',
            },
            letterSpacing: {
                tighter: '-.04em',
            },
            lineHeight: {
                tight: 1.2,
            },
            fontSize: {
                '5xl': '2.5rem',
                '6xl': '2.75rem',
                '7xl': '4.5rem',
                '8xl': '6.25rem',
            },
            boxShadow: {
                sm: '0 5px 10px rgba(0, 0, 0, 0.12)',
                md: '0 8px 30px rgba(0, 0, 0, 0.12)',
                // For photo gallery
                highlight: 'inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
            },
            screens: {
                // For photo gallery
                narrow: { raw: '(max-aspect-ratio: 3 / 2)' },
                wide: { raw: '(min-aspect-ratio: 3 / 2)' },
                'taller-than-854': { raw: '(min-height: 854px)' },
            },
        },
    },
    plugins: [],
    future: {
        // For photo gallery
        hoverOnlyWhenSupported: true,
    },
}
