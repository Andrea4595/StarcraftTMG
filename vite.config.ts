import { defineConfig, runnerImport, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const DATA_EXPORT_FILE = 'data.json'

/** 유닛/택티컬/팩션 카드·키워드·토큰 전체를 외부에서 받아갈 수 있도록 `data.json`으로 내보낸다 */
function dataExportPlugin(): Plugin {
  const load = async () => {
    const { module } = await runnerImport<{ buildDataExport: () => unknown }>('./src/data/export.ts', {
      configFile: false,
    })
    return JSON.stringify(module.buildDataExport())
  }
  return {
    name: 'tmg-data-export',
    async generateBundle() {
      this.emitFile({ type: 'asset', fileName: DATA_EXPORT_FILE, source: await load() })
    },
    configureServer(server) {
      server.middlewares.use(`/StarcraftTMG/${DATA_EXPORT_FILE}`, async (_req, res) => {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.end(await load())
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/StarcraftTMG/',
  plugins: [
    react(),
    dataExportPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico'],
      workbox: {
        // 브라우저 주소창으로 data.json을 열었을 때 서비스워커가 앱 index.html로 바꿔치기하지 않도록
        navigateFallbackDenylist: [/\/data\.json$/],
      },
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
