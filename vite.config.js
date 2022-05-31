import { defineConfig } from 'vite'
import EnvironmentPlugin from 'vite-plugin-environment';

import react from '@vitejs/plugin-react'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), EnvironmentPlugin('all', { prefix: '' })],
  base: "/music-player/",
  define: {
    'process.env': {}
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
})
