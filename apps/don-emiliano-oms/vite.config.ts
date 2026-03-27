import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

process.loadEnvFile()

const host = process.env.TAURI_DEV_HOST

// https://vite.dev/config/
export default defineConfig(async () => ({
  plugins: [react(), tailwindcss()],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent Vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    // host: host || false,
    host: true,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // Vite to ignore watching
      ignored: ['**/src-tauri/**', '**/server/**'],
    },
    proxy: {
      '/api': {
        target: `${process.env.LOCAL_IP_ADDRESS}:8089`,
        changeOrigin: true,
        // This removes '/api' from the URL before sending it to the backend
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
}))
