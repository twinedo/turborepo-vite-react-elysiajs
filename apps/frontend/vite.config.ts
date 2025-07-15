import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  server: {
    proxy: { 
      // Dev-only proxy (for local development)
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  // Production-optimized settings
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  preview: {
    port: 5173,
    strictPort: true,
  },
  resolve: {
    alias: {
      shared: '/packages/shared/src', // Keep your Turborepo alias
    },
  },
  optimizeDeps: {
    include: ['slick-carousel']
  }
})