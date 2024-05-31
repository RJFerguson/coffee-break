import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

import path from 'path';

export default defineConfig({
    resolve: {
        alias: {
          '@': path.resolve(__dirname, './'),
          '@assets': path.resolve(__dirname, './src/assets'),
          '@components': path.resolve(__dirname, './src/components'),
        },
      },
  test: {
    coverage: {
      provider: 'v8' // or 'v8'
    },
    environment: 'happy-dom'
  },
  plugins: [react()]
})