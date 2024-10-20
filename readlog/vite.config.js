import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './public/manifest.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: manifest,
      globalPatterins: ['**/*.{png,svg,ico,json,css,html,js}'],
      
    })
  ],
  assetsInclude: ['**/*.png', '**/*.svg', '**/*.ico', '**/*.xml', '**/*.webmanifest'],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      outDir: 'dist',
    },
  },
})
