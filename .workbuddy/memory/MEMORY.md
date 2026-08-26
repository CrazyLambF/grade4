# 四上学习计划 — 项目记忆

## 项目概述
- 杭州小学四年级（上）学习H5应用，名称"四上学习帮"
- 技术栈：Vue 3 + Vite + TypeScript + Vant 4 + Pinia + IndexedDB
- 四学科：语文(部编版)、数学(人教版)、英语(PEP人教版)、科学(教科版)
- 核心功能：预习、复习、周周练、月月练、错题本、学习统计
- 数据本地存储，无需账号系统

## 文件位置
- 项目计划功能清单：`/项目计划功能清单.md`
- 项目入口：`src/main.ts`
- 路由配置：`src/router/index.ts`
- 数据库：`src/composables/useDB.ts`（Dexie.js/IndexedDB）
- 题库数据：`src/data/{chinese,math,english,science}/`
- Pinia stores：`src/stores/{user,subject,practice,mistakes,games}.ts`

## 技术约定
- 移动端适配：postcss-px-to-viewport，设计稿375px
- SCSS全局变量在 `src/styles/variables.scss`，通过 vite additionalData 自动注入
- PWA 已配置 vite-plugin-pwa
- 代码分包：vant/echarts/vendor 单独打包
- 开发命令：`npm run dev`（带--host支持手机真机调试）
- 构建命令：`npm run build`
