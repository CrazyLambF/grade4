import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vant from 'vant'
import 'vant/lib/index.css'
import App from './App.vue'
import router from './router'
import './styles/global.scss'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(Vant)

// 全局错误处理：防止白屏
app.config.errorHandler = (err, _instance, info) => {
  console.error('Vue Error:', err, info)
}

// PWA Service Worker 更新处理
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/grade4/sw.js').then((reg) => {
      // 检测到新 SW 时自动刷新
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'activated') {
              // 新 SW 已激活，刷新页面加载最新资源
              window.location.reload()
            }
          })
        }
      })
    }).catch((err) => {
      console.warn('SW registration failed:', err)
    })

    // 监听 controller 变化（新 SW 接管）
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload()
    })
  })
}

// 路由错误恢复：chunk 加载失败时刷新页面
router.onError((error) => {
  if (error.message.includes('Failed to fetch dynamically imported module') ||
      error.message.includes('Importing a module script failed')) {
    // 旧缓存导致的 chunk 加载失败，清除 SW 并刷新
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((reg) => reg.unregister())
      })
    }
    window.location.reload()
  }
})

app.mount('#app')
