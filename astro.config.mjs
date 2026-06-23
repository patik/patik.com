// @ts-check
import { fileURLToPath } from 'url'
import { unified } from '@astrojs/markdown-remark'
import react from '@astrojs/react'
import { defineConfig } from 'astro/config'
import rehypeExpressiveCode from 'rehype-expressive-code'

// https://astro.build/config
export default defineConfig({
    integrations: [react()],
    markdown: {
        processor: unified({
            rehypePlugins: [
                [
                    rehypeExpressiveCode,
                    {
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
                                    /**
                                     * @param {{ codeBlock: import('rehype-expressive-code').ExpressiveCodeBlock & { props: { showLineNumbers?: boolean } } }} args
                                     */
                                    preprocessMetadata: ({ codeBlock }) => {
                                        // Add showLineNumbers if not already present.
                                        if (!codeBlock.props.showLineNumbers) {
                                            codeBlock.props.showLineNumbers = true
                                        }
                                    },
                                },
                            },
                        ],
                    },
                ],
            ],
        }),
    },
    vite: {
        resolve: {
            alias: {
                '@src': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
    },
})
