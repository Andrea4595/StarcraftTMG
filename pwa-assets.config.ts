import { defineConfig, minimal2023Preset } from '@vite-pwa/assets-generator/config'

const BRAND_COLOR = '#4e95d9'

export default defineConfig({
  headLinkOptions: {
    preset: '2023',
  },
  preset: {
    ...minimal2023Preset,
    maskable: {
      ...minimal2023Preset.maskable,
      resizeOptions: { background: BRAND_COLOR },
    },
    apple: {
      ...minimal2023Preset.apple,
      resizeOptions: { background: BRAND_COLOR },
    },
  },
  images: ['public/icon.png'],
})
