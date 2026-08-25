import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/StarcraftTMG/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'StarcraftTMG 로스터 빌더 (비공식)',
        short_name: 'TMG 로스터 빌더',
        description: '스타크래프트 TMG(Tabletop Miniature Game) 비공식 로스터 빌더',
        lang: 'ko',
        theme_color: '#4e95d9',
        background_color: '#4e95d9',
        display: 'standalone',
        start_url: '/StarcraftTMG/',
        scope: '/StarcraftTMG/',
        icons: [
          { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
})
