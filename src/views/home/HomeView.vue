<template>
  <div class="page-container home">
    <!-- 顶部卡通问候区 -->
    <div class="hero-header">
      <!-- 装饰气泡 -->
      <div class="bubble-dot bubble-dot--1"></div>
      <div class="bubble-dot bubble-dot--2"></div>
      <div class="bubble-dot bubble-dot--3"></div>
      <!-- 飘浮的小星星 -->
      <div class="floating-star s1">⭐</div>
      <div class="floating-star s2">✨</div>

      <div class="header-top">
        <div class="greeting">
          <p class="greeting-emoji">{{ greetingEmoji }}</p>
          <p class="greeting-text">{{ greetingText }}，{{ userName }}！</p>
          <p class="sub-text">📅 {{ todayDate }}</p>
        </div>
        <div class="streak-badge anim-float">
          <span class="flame">🔥</span>
          <div class="streak-info">
            <span class="streak-num">{{ streakDays }}</span>
            <span class="streak-unit">天</span>
          </div>
        </div>
      </div>

      <!-- 学科进度卡片 -->
      <div class="progress-overview">
        <div
          v-for="s in subjects"
          :key="s.type"
          class="progress-item"
          @click="goSubject(s.type)"
        >
          <div class="progress-icon-wrap" :style="{ background: s.bgColor }">
            <van-icon :name="s.icon" size="22" :color="s.color" />
          </div>
          <div class="progress-detail">
            <div class="progress-top-row">
              <span class="progress-name">{{ s.name }}</span>
              <span class="progress-text">{{ currentUnit(s.type) }}/{{ s.units.length }}</span>
            </div>
            <div class="progress-bar-wrap">
              <div
                class="progress-bar"
                :style="{ width: getProgress(s.type) + '%', background: s.color }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 情绪调整入口 -->
    <div class="mood-entry-card" @click="$router.push('/mood')">
      <div class="mood-entry-left">
        <div class="mood-entry-emoji anim-float">🌈</div>
        <div class="mood-entry-text">
          <p class="mood-entry-title">心情小屋</p>
          <p class="mood-entry-desc">不开心？来这儿找安慰～</p>
        </div>
      </div>
      <div class="mood-entry-right">
        <span class="mood-entry-tag">{{ todayMoodEmoji }}</span>
        <span class="mood-entry-arrow">→</span>
      </div>
    </div>

    <!-- 今日学习任务 -->
    <div class="card today-task-card">
      <div class="card-header">
        <div class="card-icon-wrap gradient-sunny">
          <span>📋</span>
        </div>
        <span class="card-title">今日学习任务</span>
        <span class="task-count" v-if="todayTasks.length > 0">{{ todayTasks.length }}项</span>
      </div>
      <div v-if="todayTasks.length > 0" class="task-list">
        <div
          v-for="(task, i) in todayTasks"
          :key="i"
          class="task-item"
          :style="{ animationDelay: i * 0.1 + 's' }"
          @click="goTask(task)"
        >
          <div class="task-icon" :style="{ background: subjectColor(task.subject) + '20' }">
            <van-icon :name="subjectIcon(task.subject)" size="18" :color="subjectColor(task.subject)" />
          </div>
          <div class="task-info">
            <p class="task-name">{{ task.name }}</p>
            <p class="task-desc">{{ task.desc }}</p>
          </div>
          <div class="task-arrow">→</div>
        </div>
      </div>
      <div v-else class="empty-task">
        <span class="empty-emoji">🎉</span>
        <p>今天暂无任务，去预习吧！</p>
      </div>
    </div>

    <!-- 快捷入口 -->
    <div class="card quick-entry-card">
      <div class="card-header">
        <div class="card-icon-wrap gradient-primary">
          <span>🚀</span>
        </div>
        <span class="card-title">快捷入口</span>
      </div>
      <div class="entry-grid">
        <div class="entry-item" @click="$router.push('/subject/chinese')">
          <div class="entry-icon" style="background: #FFF5EE">
            <span class="entry-emoji">📖</span>
          </div>
          <span>课前预习</span>
        </div>
        <div class="entry-item" @click="$router.push('/subject/math')">
          <div class="entry-icon" style="background: #EBF3FF">
            <span class="entry-emoji">📝</span>
          </div>
          <span>课后复习</span>
        </div>
        <div class="entry-item" @click="$router.push('/recitation')">
          <div class="entry-icon" style="background: #FFF5EE">
            <span class="entry-emoji">🎤</span>
          </div>
          <span>语文背诵</span>
        </div>
        <div class="entry-item" @click="$router.push('/daily-calc')">
          <div class="entry-icon" style="background: #EBF3FF">
            <span class="entry-emoji">🧮</span>
          </div>
          <span>每日计算</span>
        </div>
        <div class="entry-item" @click="$router.push('/daily-words')">
          <div class="entry-icon" style="background: #E8F8F6">
            <span class="entry-emoji">🔤</span>
          </div>
          <span>每日词汇</span>
        </div>
        <div class="entry-item" @click="$router.push('/weekly')">
          <div class="entry-icon" style="background: #FFE5E5">
            <span class="entry-emoji">✏️</span>
          </div>
          <span>周周练</span>
        </div>
        <div class="entry-item" @click="$router.push('/monthly')">
          <div class="entry-icon" style="background: #E8F8F6">
            <span class="entry-emoji">🏆</span>
          </div>
          <span>月月练</span>
        </div>
        <div class="entry-item" @click="$router.push('/games')">
          <div class="entry-icon" style="background: #FDF0F7">
            <span class="entry-emoji">🎮</span>
          </div>
          <span>放松游戏</span>
        </div>
      </div>
    </div>

    <!-- 每日一言 -->
    <div class="card daily-quote-card">
      <div class="quote-deco">💬</div>
      <p class="quote-text">{{ dailyQuote }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useSubjectStore } from '@/stores/subject'
import type { SubjectType } from '@/types'

const router = useRouter()
const userStore = useUserStore()
const subjectStore = useSubjectStore()

const userName = computed(() => userStore.userInfo?.name || '同学')
const streakDays = computed(() => userStore.userInfo?.streakDays || 0)

// 今日心情 emoji（从 localStorage 读取最近一次记录）
const todayMoodEmoji = computed(() => {
  try {
    const raw = localStorage.getItem('mood_records')
    if (raw) {
      const records = JSON.parse(raw)
      if (Array.isArray(records) && records.length > 0) {
        const today = new Date()
        const todayStr = `${today.getMonth() + 1}/${today.getDate()}`
        const todayRecord = records.find((r: { date: string }) => r.date?.startsWith(todayStr))
        if (todayRecord) return todayRecord.emoji
        return records[0].emoji
      }
    }
  } catch { /* ignore */ }
  return '💭'
})

const subjects = computed(() => Object.values(subjectStore.subjects))

const greetingText = computed(() => {
  const h = new Date().getHours()
  if (h < 6) return '夜深了'
  if (h < 9) return '早上好'
  if (h < 12) return '上午好'
  if (h < 14) return '中午好'
  if (h < 18) return '下午好'
  return '晚上好'
})

const greetingEmoji = computed(() => {
  const h = new Date().getHours()
  if (h < 6) return '🌙'
  if (h < 9) return '☀️'
  if (h < 12) return '🌤️'
  if (h < 14) return '🌞'
  if (h < 18) return '🌤️'
  return '🌟'
})

const todayDate = computed(() => {
  const d = new Date()
  const week = ['日', '一', '二', '三', '四', '五', '六']
  return `${d.getMonth() + 1}月${d.getDate()}日 星期${week[d.getDay()]}`
})

const quotes = [
  '学而时习之，不亦说乎。 ——《论语》',
  '读书破万卷，下笔如有神。 ——杜甫',
  '千里之行，始于足下。 ——《老子》',
  '少壮不努力，老大徒伤悲。 ——《汉乐府》',
  '纸上得来终觉浅，绝知此事要躬行。 ——陆游',
  '业精于勤，荒于嬉；行成于思，毁于随。 ——韩愈',
  '杭州西湖天下景，学习也要日日新。',
]
const dailyQuote = computed(() => quotes[new Date().getDate() % quotes.length])

const todayTasks = ref([
  { subject: 'chinese' as SubjectType, name: '语文预习', desc: '第七单元 古诗三首' },
  { subject: 'math' as SubjectType, name: '数学复习', desc: '第六单元 除法笔算' },
  { subject: 'english' as SubjectType, name: '英语预习', desc: 'Unit 3 My Friends' },
])

function currentUnit(type: SubjectType) {
  return userStore.userInfo?.currentUnit[type] || 1
}
function getProgress(type: SubjectType) {
  const total = subjectStore.getSubject(type).units.length
  return Math.round((currentUnit(type) / total) * 100)
}
function subjectColor(type: SubjectType) {
  return subjectStore.getSubject(type).color
}
function subjectIcon(type: SubjectType) {
  return subjectStore.getSubject(type).icon
}
function goSubject(type: SubjectType) {
  router.push(`/subject/${type}`)
}
function goTask(task: { subject: SubjectType; name: string }) {
  router.push(`/subject/${task.subject}`)
}

onMounted(() => {
  userStore.loadUser()
  userStore.checkStreak()
})
</script>

<style scoped lang="scss">
.home { padding-bottom: calc(#{$tabbar-height} + #{$safe-bottom} + 12px); }

// ============================================
// 顶部 Hero 区域
// ============================================
.hero-header {
  position: relative;
  overflow: hidden;
  padding: calc(56px + #{$safe-top}) $spacing-base $spacing-lg;
  border-radius: 0 0 $radius-xl $radius-xl;
  background: $gradient-primary;
  color: #fff;
}

.floating-star {
  position: absolute;
  font-size: 16px;
  animation: float 3s ease-in-out infinite;
  pointer-events: none;
  &.s1 { top: 16px; right: 24px; animation-delay: 0s; }
  &.s2 { top: 50px; right: 60px; font-size: 12px; animation-delay: 1.5s; }
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: $spacing-lg;
  position: relative;
  z-index: 1;
}

.greeting-emoji {
  font-size: 32px;
  margin-bottom: 2px;
}
.greeting-text {
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.sub-text {
  font-size: $font-size-sm;
  opacity: 0.9;
  margin-top: 4px;
}

.streak-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(8px);
  padding: 8px 14px;
  border-radius: $radius-pill;
  border: 2px solid rgba(255, 255, 255, 0.3);

  .flame { font-size: 18px; }
  .streak-info { display: flex; align-items: baseline; gap: 2px; }
  .streak-num { font-size: $font-size-lg; font-weight: $font-weight-bold; }
  .streak-unit { font-size: $font-size-xs; opacity: 0.9; }
}

// ============================================
// 学科进度概览
// ============================================
.progress-overview {
  background: rgba(255, 255, 255, 0.95);
  border-radius: $radius-lg;
  padding: $spacing-base;
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.progress-item {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  cursor: pointer;
  transition: transform $duration-base $easing-bounce;

  &:active { transform: scale(0.97); }
}

.progress-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: $radius-md;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.progress-detail { flex: 1; }

.progress-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.progress-name {
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
}

.progress-text {
  font-size: $font-size-xs;
  color: $color-text-secondary;
}

.progress-bar-wrap {
  height: 8px;
  background: $color-bg-alt;
  border-radius: $radius-pill;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  border-radius: $radius-pill;
  transition: width 0.5s $easing-smooth;
}

// ============================================
// 卡片通用
// ============================================
.card-header {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  margin-bottom: $spacing-md;
}

.card-icon-wrap {
  width: 32px;
  height: 32px;
  border-radius: $radius-sm;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.card-title {
  font-size: $font-size-md;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
  flex: 1;
}

.task-count {
  font-size: $font-size-xs;
  color: $color-text-secondary;
  background: $color-bg-alt;
  padding: 2px 10px;
  border-radius: $radius-pill;
  font-weight: $font-weight-semibold;
}

// ============================================
// 情绪调整入口
// ============================================
.mood-entry-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: $spacing-base $spacing-base $spacing-sm;
  padding: $spacing-md $spacing-base;
  border-radius: $radius-lg;
  background: linear-gradient(135deg, #F3E8FF 0%, #E8DBFF 100%);
  border: 2px solid rgba(162, 155, 254, 0.2);
  cursor: pointer;
  transition: all $duration-base $easing-bounce;
  animation: bounceIn 0.5s $easing-bounce;

  &:active {
    transform: scale(0.97);
    box-shadow: $shadow-sm;
  }
}

.mood-entry-left {
  display: flex;
  align-items: center;
  gap: $spacing-md;
}

.mood-entry-emoji {
  font-size: 36px;
}

.mood-entry-title {
  font-size: $font-size-md;
  font-weight: $font-weight-bold;
  color: #5A4BD1;
}

.mood-entry-desc {
  font-size: $font-size-xs;
  color: #8B7FE0;
  margin-top: 2px;
}

.mood-entry-right {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
}

.mood-entry-tag {
  font-size: 24px;
}

.mood-entry-arrow {
  font-size: 18px;
  color: #A29BFE;
  font-weight: $font-weight-bold;
}

// ============================================
// 今日任务
// ============================================
.task-list { display: flex; flex-direction: column; gap: $spacing-sm; }

.task-item {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-md;
  border-radius: $radius-md;
  background: $color-bg;
  cursor: pointer;
  transition: all $duration-base $easing-smooth;
  animation: bounceIn 0.5s $easing-bounce backwards;

  &:active {
    transform: scale(0.97);
    background: darken($color-bg, 2%);
  }
}

.task-icon {
  width: 36px;
  height: 36px;
  border-radius: $radius-sm;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.task-info { flex: 1; }
.task-name {
  font-size: $font-size-base;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
}
.task-desc {
  font-size: $font-size-xs;
  color: $color-text-secondary;
  margin-top: 2px;
}

.task-arrow {
  font-size: 18px;
  color: $color-text-placeholder;
  transition: transform $duration-base;
}
.task-item:active .task-arrow {
  transform: translateX(4px);
}

.empty-task {
  text-align: center;
  padding: $spacing-xl 0;
  .empty-emoji { font-size: 40px; display: block; margin-bottom: 8px; }
  p { font-size: $font-size-sm; color: $color-text-secondary; }
}

// ============================================
// 快捷入口
// ============================================
.entry-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $spacing-md;
}

.entry-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: transform $duration-base $easing-bounce;

  &:active { transform: scale(0.88); }
}

.entry-icon {
  width: 52px;
  height: 52px;
  border-radius: $radius-md;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all $duration-base;

  .entry-emoji { font-size: 26px; }
}

.entry-item span {
  font-size: $font-size-xs;
  color: $color-text-regular;
  font-weight: $font-weight-medium;
}

// ============================================
// 每日一言
// ============================================
.daily-quote-card {
  display: flex;
  align-items: flex-start;
  gap: $spacing-sm;
  background: linear-gradient(135deg, #FFF9E6 0%, #FFF5EE 100%);
  border: 2px solid rgba(255, 200, 100, 0.15);
}

.quote-deco { font-size: 20px; flex-shrink: 0; }

.quote-text {
  font-size: $font-size-sm;
  color: #8B6914;
  line-height: 1.7;
  flex: 1;
  font-weight: $font-weight-medium;
}
</style>
