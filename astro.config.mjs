// @ts-check
import mdx from '@astrojs/mdx'
import netlify from '@astrojs/netlify'
import react from '@astrojs/react'
import { defineConfig } from 'astro/config'
import { fileURLToPath } from 'url'

// https://astro.build/config
export default defineConfig({
    integrations: [react(), mdx()],
    adapter: netlify(),
    vite: {
        resolve: {
            alias: {
                '@src': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
    },
})
