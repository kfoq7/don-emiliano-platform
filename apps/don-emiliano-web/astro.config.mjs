// @ts-check
import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'
import preact from '@astrojs/preact'
import vercel from '@astrojs/vercel'

// https://astro.build/config
export default defineConfig({
  integrations: [preact()],
  output: 'server',
  adapter: vercel(),
  build: {
    inlineStylesheets: 'always',
  },
  server: {
    host: true,
    allowedHosts: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
