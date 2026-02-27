// @ts-check
import path from 'node:path'

import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

import preact from '@astrojs/preact'

// https://astro.build/config
export default defineConfig({
  integrations: [preact()],
  output: 'server',
  server: {
    host: true,
    allowedHosts: true,
  },
  vite: {
    plugins: [tailwindcss()],
    // resolve: {
    //   alias: {
    //     '@': path.resolve('./'),
    //   },
    // },
  },
})
