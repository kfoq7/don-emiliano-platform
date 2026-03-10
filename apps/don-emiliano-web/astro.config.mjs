// @ts-check
import path from 'node:path'

import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'
import preact from '@astrojs/preact'
import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
  integrations: [preact()],
  output: 'server',
  adapter: vercel(),
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },
})
