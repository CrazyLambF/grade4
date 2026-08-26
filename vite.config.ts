import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import postcsspxtoviewport from 'postcss-px-to-viewport'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '四上学习帮',
        short_name: '学习帮',
        theme_color: '#4E8AF2',
        background_color: '#F5F7FA',
        display: 'standalone',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
    postcss: {
      plugins: [
        postcsspxtoviewport({
          viewportWidth: 375,
          unitPrecision: 5,
          viewportUnit: 'vw',
          selectorBlackList: ['.van-'],
          minPixelValue: 1,
          mediaQuery: false,
        }),
      ],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vant: ['vant'],
          echarts: ['echarts', 'vue-echarts'],
          vendor: ['vue', 'vue-router', 'pinia', 'dexie'],
        },
      },
    },
  },
})
