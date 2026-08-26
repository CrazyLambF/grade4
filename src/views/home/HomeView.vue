<template>
  <div class="page-container home">
    <!-- 顶部问候 -->
    <div class="header gradient-primary">
      <div class="header-top">
        <div class="greeting">
          <p class="greeting-text">{{ greetingText }}，{{ userName }}</p>
          <p class="sub-text">今天是 {{ todayDate }}</p>
        </div>
        <div class="streak-badge">
          <van-icon name="fire-o" size="20" color="#FFD700" />
          <span>{{ streakDays }}天</span>
        </div>
      </div>
      <!-- 学习进度概览 -->
      <div class="progress-overview">
        <div v-for="s in subjects" :key="s.type" class="progress-item" @click="goSubject(s.type)">
          <div class="progress-icon" :style="{ background: s.color }">
            <van-icon :name="s.icon" size="22" color="#fff" />
          </div>
          <span class="progress-name">{{ s.name }}</span>
          <div class="progress-bar-wrap">
            <div class="progress-bar" :style="{ width: getProgress(s.type) + '%', background: s.color }"></div>
          </div>
          <span class="progress-text">{{ currentUnit(s.type) }}/{{ s.units.length }}单元</span>
        </div>
      </div>
    </div>

    <!-- 今日学习任务 -->
    <div class="card today-task">
      <div class="card-header">
        <van-icon name="clock-o" size="18" :color="primaryColor" />
        <span class="card-title">今日学习任务</span>
      </div>
      <div v-if="todayTasks.length > 0" class="task-list">
        <div v-for="(task, i) in todayTasks" :key="i" class="task-item" @click="goTask(task)">
          <div class="task-icon" :style="{ background: subjectColor(task.subject) }">
            <van-icon :name="subjectIcon(task.subject)" size="16" color="#fff" />
          </div>
          <div class="task-info">
            <p class="task-name">{{ task.name }}</p>
            <p class="task-desc">{{ task.desc }}</p>
          </div>
          <van-icon name="arrow" size="14" color="#969799" />
        </div>
      </div>
      <van-empty v-else description="今天暂无任务，去预习吧！" :image-size="60" />
    </div>

    <!-- 快捷入口 -->
    <div class="card quick-entry">
      <div class="card-header">
        <van-icon name="apps-o" size="18" :color="primaryColor" />
        <span class="card-title">快捷入口</span>
      </div>
      <div class="entry-grid">
        <div class="entry-item" @click="$router.push('/subject/chinese')">
          <div class="entry-icon" style="background: #FFF8EC"><van-icon name="edit" size="24" color="#F5A623" /></div>
          <span>课前预习</span>
        </div>
        <div class="entry-item" @click="$router.push('/subject/math')">
          <div class="entry-icon" style="background: #EBF3FF"><van-icon name="replay" size="24" color="#4E8AF2" /></div>
          <span>课后复习</span>
        </div>
        <div class="entry-item" @click="$router.push('/weekly')">
          <div class="entry-icon" style="background: #FFF0F0"><van-icon name="edit" size="24" color="#FF4D4F" /></div>
          <span>周周练</span>
        </div>
        <div class="entry-item" @click="$router.push('/monthly')">
          <div class="entry-icon" style="background: #F0FBEB"><van-icon name="records" size="24" color="#7ED321" /></div>
          <span>月月练</span>
        </div>
        <div class="entry-item" @click="$router.push('/games')">
          <div class="entry-icon" style="background: #F8F0FB"><van-icon name="game-o" size="24" color="#BD10E0" /></div>
          <span>放松游戏</span>
        </div>
        <div class="entry-item" @click="$router.push('/statistics')">
          <div class="entry-icon" style="background: #FFF8EC"><van-icon name="chart-trending-o" size="24" color="#F5A623" /></div>
          <span>学习统计</span>
        </div>
      </div>
    </div>

    <!-- 每日一言 -->
    <div class="card daily-quote">
      <van-icon name="comment-o" size="16" color="#969799" />
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

const primaryColor = '#4E8AF2'
const userName = computed(() => userStore.userInfo?.name || '同学')
const streakDays = computed(() => userStore.userInfo?.streakDays || 0)

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
.home { padding-bottom: calc(60px + #{$safe-bottom}); }

.header {
  padding: 60px 16px 16px;
  border-radius: 0 0 20px 20px;
  color: #fff;
}
.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.greeting-text { font-size: 20px; font-weight: 700; }
.sub-text { font-size: 13px; opacity: 0.85; margin-top: 4px; }
.streak-badge {
  display: flex; align-items: center; gap: 4px;
  background: rgba(255,255,255,0.2);
  padding: 6px 12px; border-radius: 20px;
  font-size: 14px; font-weight: 600;
}

.progress-overview {
  background: rgba(255,255,255,0.15);
  border-radius: 12px;
  padding: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.progress-item { display: flex; flex-direction: column; gap: 6px; }
.progress-icon {
  width: 32px; height: 32px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
}
.progress-name { font-size: 13px; }
.progress-bar-wrap {
  height: 4px; background: rgba(255,255,255,0.3);
  border-radius: 2px; overflow: hidden;
}
.progress-bar { height: 100%; border-radius: 2px; transition: width 0.3s; }
.progress-text { font-size: 11px; opacity: 0.8; }

.card-header {
  display: flex; align-items: center; gap: 6px; margin-bottom: 12px;
}
.card-title { font-size: 16px; font-weight: 600; color: $color-text-primary; }

.task-list { display: flex; flex-direction: column; gap: 10px; }
.task-item {
  display: flex; align-items: center; gap: 10px;
  padding: 10px; border-radius: 8px;
  background: $color-bg;
  cursor: pointer;
  &:active { background: darken($color-bg, 3%); }
}
.task-icon {
  width: 32px; height: 32px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.task-info { flex: 1; }
.task-name { font-size: 14px; font-weight: 500; color: $color-text-primary; }
.task-desc { font-size: 12px; color: $color-text-secondary; margin-top: 2px; }

.entry-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
}
.entry-item {
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  cursor: pointer;
  &:active { opacity: 0.7; }
}
.entry-icon {
  width: 48px; height: 48px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
}
.entry-item span { font-size: 12px; color: $color-text-regular; }

.daily-quote {
  display: flex; align-items: flex-start; gap: 8px;
}
.quote-text { font-size: 13px; color: $color-text-secondary; line-height: 1.6; flex: 1; }
</style>
