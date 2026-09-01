import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/HomeView.vue'),
    meta: { title: '四上学习帮', showTabbar: true },
  },
  {
    path: '/subject/:subject',
    name: 'Subject',
    component: () => import('@/views/subject/SubjectView.vue'),
    meta: { title: '学科', showTabbar: false },
  },
  {
    path: '/subject/:subject/preview/:unit/:lesson',
    name: 'Preview',
    component: () => import('@/views/subject/PreviewView.vue'),
    meta: { title: '课前预习', showTabbar: false },
  },
  {
    path: '/subject/:subject/review/:unit/:lesson',
    name: 'Review',
    component: () => import('@/views/subject/ReviewView.vue'),
    meta: { title: '课后复习', showTabbar: false },
  },
  {
    path: '/weekly',
    name: 'Weekly',
    component: () => import('@/views/weekly/WeeklyListView.vue'),
    meta: { title: '周周练', showTabbar: true },
  },
  {
    path: '/weekly/:id',
    name: 'WeeklyPractice',
    component: () => import('@/views/weekly/PracticeView.vue'),
    meta: { title: '周周练答题', showTabbar: false },
  },
  {
    path: '/weekly/:id/result',
    name: 'WeeklyResult',
    component: () => import('@/views/weekly/ResultView.vue'),
    meta: { title: '周周练结果', showTabbar: false },
  },
  {
    path: '/monthly',
    name: 'Monthly',
    component: () => import('@/views/monthly/MonthlyListView.vue'),
    meta: { title: '月月练', showTabbar: true },
  },
  {
    path: '/monthly/:id',
    name: 'MonthlyPractice',
    component: () => import('@/views/monthly/PracticeView.vue'),
    meta: { title: '月月练答题', showTabbar: false },
  },
  {
    path: '/monthly/:id/result',
    name: 'MonthlyResult',
    component: () => import('@/views/monthly/ResultView.vue'),
    meta: { title: '月月练结果', showTabbar: false },
  },
  {
    path: '/mistakes',
    name: 'Mistakes',
    component: () => import('@/views/mistakes/MistakesView.vue'),
    meta: { title: '错题本', showTabbar: true },
  },
  {
    path: '/mistakes/:subject',
    name: 'SubjectMistakes',
    component: () => import('@/views/mistakes/SubjectMistakesView.vue'),
    meta: { title: '学科错题', showTabbar: false },
  },
  {
    path: '/games',
    name: 'Games',
    component: () => import('@/views/games/GameCenterView.vue'),
    meta: { title: '放松游戏', showTabbar: true },
  },
  {
    path: '/games/:subject/:gameId',
    name: 'GamePlay',
    component: () => import('@/views/games/GamePlayView.vue'),
    meta: { title: '游戏', showTabbar: false },
  },
  {
    path: '/games/:subject/:gameId/result',
    name: 'GameResult',
    component: () => import('@/views/games/GameResultView.vue'),
    meta: { title: '游戏结果', showTabbar: false },
  },
  {
    path: '/recitation',
    name: 'Recitation',
    component: () => import('@/views/chinese/RecitationView.vue'),
    meta: { title: '语文背诵', showTabbar: false },
  },
  {
    path: '/daily-calc',
    name: 'DailyCalc',
    component: () => import('@/views/math/DailyCalcView.vue'),
    meta: { title: '每日计算', showTabbar: false },
  },
  {
    path: '/daily-words',
    name: 'DailyWords',
    component: () => import('@/views/english/DailyWordsView.vue'),
    meta: { title: '每日词汇', showTabbar: false },
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: () => import('@/views/statistics/StatisticsView.vue'),
    meta: { title: '学习统计', showTabbar: true },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/profile/ProfileView.vue'),
    meta: { title: '我的', showTabbar: true },
  },
  {
    path: '/mood',
    name: 'Mood',
    component: () => import('@/views/mood/MoodView.vue'),
    meta: { title: '心情小屋', showTabbar: false },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to, _from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  next()
})

export default router
