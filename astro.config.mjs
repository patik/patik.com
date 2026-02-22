// @ts-check
import { fileURLToPath } from 'url'
import mdx from '@astrojs/mdx'
import netlify from '@astrojs/netlify'
import react from '@astrojs/react'
import expressiveCode from 'astro-expressive-code'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
    integrations: [
        expressiveCode({
            themes: ['github-dark', 'github-light'],
            frames: {
                showCopyToClipboardButton: true,
            },
            styleOverrides: {
                borderRadius: '0.25rem',
                borderWidth: '1px',
            },
            plugins: [
                {
                    name: 'add-line-numbers',
                    hooks: {
                        preprocessMetadata: ({ codeBlock }) => {
                            // Add showLineNumbers if not already present
                            // @ts-expect-error - showLineNumbers exists at runtime but not in types
                            if (!codeBlock.props.showLineNumbers) {
                                // @ts-expect-error - showLineNumbers exists at runtime but not in types
                                codeBlock.props.showLineNumbers = true
                            }
                        },
                    },
                },
            ],
        }),
        react(),
        mdx(),
    ],
    adapter: netlify(),
    vite: {
        resolve: {
            alias: {
                '@src': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
    },
})
