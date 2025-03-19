import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  root: 'src/demo',
  build: {
    outDir: '../../dist',
    emptyOutDir: true
  },
  plugins: [react()]
})
