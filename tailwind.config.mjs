/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'accent-1': '#fafafa',
                'accent-2': '#eaeaea',
                'accent-7': '#333',
                success: '#0070f3',
                cyan: '#79ffe1',
            },
            spacing: {
                28: '7rem',
            },
            letterSpacing: {
                tighter: '-0.04em',
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
                highlight: 'inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
            },
        },
    },
}
