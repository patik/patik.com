import { fileURLToPath } from 'url'
import { unified } from '@astrojs/markdown-remark'
import react from '@astrojs/react'
import { defineConfig } from 'astro/config'
import rehypeExpressiveCode, { type ExpressiveCodeBlock } from 'rehype-expressive-code'
import rehypePullRequestImages from './scripts/rehype-pull-request-images.mts'

type LineNumberedBlock = ExpressiveCodeBlock & { props: { showLineNumbers?: boolean } }

// https://astro.build/config
export default defineConfig({
    integrations: [react()],
    markdown: {
        processor: unified({
            rehypePlugins: [
                rehypePullRequestImages,
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
                                    preprocessMetadata: ({ codeBlock }: { codeBlock: LineNumberedBlock }) => {
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
