<template>
  <div class="page-container weekly-page">
    <van-nav-bar title="周周练" />
    <div class="content">
      <!-- 本周练习 -->
      <div class="card current-week" @click="startWeekly">
        <div class="week-badge">第 {{ currentWeek }} 周</div>
        <h3 class="week-title">本周综合练习</h3>
        <p class="week-desc">四科各15题，限时40分钟</p>
        <van-button type="primary" size="small" round color="#4E8AF2">开始练习</van-button>
      </div>

      <!-- 历史记录 -->
      <div class="section-title">历史周练</div>
      <div v-if="history.length > 0" class="history-list">
        <div v-for="record in history" :key="record.id" class="card history-item" @click="viewResult(record.id!)">
          <div class="history-info">
            <span class="history-week">第{{ record.round }}周 · {{ subjectName(record.subject) }}</span>
            <span class="history-date">{{ formatDate(record.createTime) }}</span>
          </div>
          <div class="history-score">
            <span class="score-value">{{ record.score }}</span>
            <span class="score-label">分</span>
          </div>
          <div class="history-rate">
            正确率 {{ record.correctRate }}%
          </div>
        </div>
      </div>
      <van-empty v-else description="还没有周练记录" :image-size="80" />

      <!-- 学科选择 -->
      <div class="section-title">选择学科练习</div>
      <div class="subject-grid">
        <div v-for="s in subjects" :key="s.type" class="subject-card" :style="{ background: s.bgColor }" @click="startSubjectWeekly(s.type)">
          <van-icon :name="s.icon" size="28" :color="s.color" />
          <span class="subject-name" :style="{ color: s.color }">{{ s.name }}周练</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSubjectStore } from '@/stores/subject'
import { usePracticeStore } from '@/stores/practice'
import { getPracticeRecords } from '@/composables/useDB'
import type { SubjectType, PracticeRecord } from '@/types'

const router = useRouter()
const subjectStore = useSubjectStore()
const practiceStore = usePracticeStore()

const subjects = computed(() => Object.values(subjectStore.subjects))
const currentWeek = computed(() => {
  // 简单计算：学期从9月1日开始
  const start = new Date(new Date().getFullYear(), 8, 1)
  const now = new Date()
  const diff = Math.floor((now.getTime() - start.getTime()) / (7 * 86400000)) + 1
  return Math.max(1, Math.min(diff, 20))
})

const history = ref<PracticeRecord[]>([])

function subjectName(type: SubjectType) {
  return subjectStore.getSubject(type).name
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

function startWeekly() {
  router.push(`/weekly/0`)
}

function startSubjectWeekly(subject: SubjectType) {
  router.push(`/weekly/0?subject=${subject}`)
}

function viewResult(id: number) {
  router.push(`/weekly/${id}/result`)
}

async function loadHistory() {
  history.value = await getPracticeRecords('weekly')
}

onMounted(() => {
  loadHistory()
})
</script>

<style scoped lang="scss">
.weekly-page { padding-bottom: calc(60px + #{$safe-bottom}); }
.content { padding: 8px 0; }

.current-week {
  background: linear-gradient(135deg, #4E8AF2 0%, #6BA6FF 100%);
  color: #fff;
  text-align: center;
  cursor: pointer;
  &:active { opacity: 0.9; }
}
.week-badge {
  display: inline-block; background: rgba(255,255,255,0.2);
  padding: 4px 12px; border-radius: 12px; font-size: 12px; margin-bottom: 8px;
}
.week-title { font-size: 20px; font-weight: 700; }
.week-desc { font-size: 13px; opacity: 0.85; margin: 4px 0 12px; }

.section-title { font-size: 14px; font-weight: 600; color: $color-text-secondary; padding: 16px 16px 8px; }

.history-list { display: flex; flex-direction: column; gap: 8px; }
.history-item { display: flex; align-items: center; justify-content: space-between; cursor: pointer; }
.history-info { display: flex; flex-direction: column; gap: 2px; }
.history-week { font-size: 14px; font-weight: 500; color: $color-text-primary; }
.history-date { font-size: 12px; color: $color-text-secondary; }
.history-score { text-align: center; }
.score-value { font-size: 22px; font-weight: 700; color: $color-primary; }
.score-label { font-size: 12px; color: $color-text-secondary; }
.history-rate { font-size: 12px; color: $color-text-secondary; }

.subject-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 0 16px; }
.subject-card {
  border-radius: 12px; padding: 20px 12px;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  cursor: pointer;
  &:active { opacity: 0.8; }
}
.subject-name { font-size: 14px; font-weight: 600; }
</style>
