// vite.config.ts
import { defineConfig } from "file:///Users/laiboam/WorkBuddy/%E5%9B%9B%E4%B8%8A%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/laiboam/WorkBuddy/%E5%9B%9B%E4%B8%8A%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { VitePWA } from "file:///Users/laiboam/WorkBuddy/%E5%9B%9B%E4%B8%8A%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/node_modules/vite-plugin-pwa/dist/index.js";
import postcsspxtoviewport from "file:///Users/laiboam/WorkBuddy/%E5%9B%9B%E4%B8%8A%E5%AD%A6%E4%B9%A0%E8%AE%A1%E5%88%92/node_modules/postcss-px-to-viewport/index.js";
import path from "path";
var __vite_injected_original_dirname = "/Users/laiboam/WorkBuddy/\u56DB\u4E0A\u5B66\u4E60\u8BA1\u5212";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "\u56DB\u4E0A\u5B66\u4E60\u5E2E",
        short_name: "\u5B66\u4E60\u5E2E",
        theme_color: "#4E8AF2",
        background_color: "#F5F7FA",
        display: "standalone",
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src")
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    },
    postcss: {
      plugins: [
        postcsspxtoviewport({
          viewportWidth: 375,
          unitPrecision: 5,
          viewportUnit: "vw",
          selectorBlackList: [".van-"],
          minPixelValue: 1,
          mediaQuery: false
        })
      ]
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vant: ["vant"],
          echarts: ["echarts", "vue-echarts"],
          vendor: ["vue", "vue-router", "pinia", "dexie"]
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbGFpYm9hbS9Xb3JrQnVkZHkvXHU1NkRCXHU0RTBBXHU1QjY2XHU0RTYwXHU4QkExXHU1MjEyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbGFpYm9hbS9Xb3JrQnVkZHkvXHU1NkRCXHU0RTBBXHU1QjY2XHU0RTYwXHU4QkExXHU1MjEyL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9sYWlib2FtL1dvcmtCdWRkeS8lRTUlOUIlOUIlRTQlQjglOEElRTUlQUQlQTYlRTQlQjklQTAlRTglQUUlQTElRTUlODglOTIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJ1xuaW1wb3J0IHBvc3Rjc3NweHRvdmlld3BvcnQgZnJvbSAncG9zdGNzcy1weC10by12aWV3cG9ydCdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICBWaXRlUFdBKHtcbiAgICAgIHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLFxuICAgICAgbWFuaWZlc3Q6IHtcbiAgICAgICAgbmFtZTogJ1x1NTZEQlx1NEUwQVx1NUI2Nlx1NEU2MFx1NUUyRScsXG4gICAgICAgIHNob3J0X25hbWU6ICdcdTVCNjZcdTRFNjBcdTVFMkUnLFxuICAgICAgICB0aGVtZV9jb2xvcjogJyM0RThBRjInLFxuICAgICAgICBiYWNrZ3JvdW5kX2NvbG9yOiAnI0Y1RjdGQScsXG4gICAgICAgIGRpc3BsYXk6ICdzdGFuZGFsb25lJyxcbiAgICAgICAgaWNvbnM6IFtcbiAgICAgICAgICB7IHNyYzogJy9pY29ucy9pY29uLTE5Mi5wbmcnLCBzaXplczogJzE5MngxOTInLCB0eXBlOiAnaW1hZ2UvcG5nJyB9LFxuICAgICAgICAgIHsgc3JjOiAnL2ljb25zL2ljb24tNTEyLnBuZycsIHNpemVzOiAnNTEyeDUxMicsIHR5cGU6ICdpbWFnZS9wbmcnIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxuICAgIH0sXG4gIH0sXG4gIGNzczoge1xuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgIHNjc3M6IHtcbiAgICAgICAgYWRkaXRpb25hbERhdGE6IGBAaW1wb3J0IFwiQC9zdHlsZXMvdmFyaWFibGVzLnNjc3NcIjtgLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHBvc3Rjc3M6IHtcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgcG9zdGNzc3B4dG92aWV3cG9ydCh7XG4gICAgICAgICAgdmlld3BvcnRXaWR0aDogMzc1LFxuICAgICAgICAgIHVuaXRQcmVjaXNpb246IDUsXG4gICAgICAgICAgdmlld3BvcnRVbml0OiAndncnLFxuICAgICAgICAgIHNlbGVjdG9yQmxhY2tMaXN0OiBbJy52YW4tJ10sXG4gICAgICAgICAgbWluUGl4ZWxWYWx1ZTogMSxcbiAgICAgICAgICBtZWRpYVF1ZXJ5OiBmYWxzZSxcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgIHZhbnQ6IFsndmFudCddLFxuICAgICAgICAgIGVjaGFydHM6IFsnZWNoYXJ0cycsICd2dWUtZWNoYXJ0cyddLFxuICAgICAgICAgIHZlbmRvcjogWyd2dWUnLCAndnVlLXJvdXRlcicsICdwaW5pYScsICdkZXhpZSddLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1QsU0FBUyxvQkFBb0I7QUFDNVYsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsZUFBZTtBQUN4QixPQUFPLHlCQUF5QjtBQUNoQyxPQUFPLFVBQVU7QUFKakIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osUUFBUTtBQUFBLE1BQ04sY0FBYztBQUFBLE1BQ2QsVUFBVTtBQUFBLFFBQ1IsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osYUFBYTtBQUFBLFFBQ2Isa0JBQWtCO0FBQUEsUUFDbEIsU0FBUztBQUFBLFFBQ1QsT0FBTztBQUFBLFVBQ0wsRUFBRSxLQUFLLHVCQUF1QixPQUFPLFdBQVcsTUFBTSxZQUFZO0FBQUEsVUFDbEUsRUFBRSxLQUFLLHVCQUF1QixPQUFPLFdBQVcsTUFBTSxZQUFZO0FBQUEsUUFDcEU7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLElBQ3BDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBLFFBQ0osZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxTQUFTO0FBQUEsUUFDUCxvQkFBb0I7QUFBQSxVQUNsQixlQUFlO0FBQUEsVUFDZixlQUFlO0FBQUEsVUFDZixjQUFjO0FBQUEsVUFDZCxtQkFBbUIsQ0FBQyxPQUFPO0FBQUEsVUFDM0IsZUFBZTtBQUFBLFVBQ2YsWUFBWTtBQUFBLFFBQ2QsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBLFVBQ1osTUFBTSxDQUFDLE1BQU07QUFBQSxVQUNiLFNBQVMsQ0FBQyxXQUFXLGFBQWE7QUFBQSxVQUNsQyxRQUFRLENBQUMsT0FBTyxjQUFjLFNBQVMsT0FBTztBQUFBLFFBQ2hEO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
