<template>
  <div class="page-container monthly-page">
    <van-nav-bar title="月月练" />
    <div class="content">
      <div class="card current-month" @click="startMonthly">
        <div class="month-badge">第 {{ currentMonth }} 月</div>
        <h3 class="month-title">本月综合测试</h3>
        <p class="month-desc">四科各1套试卷，每套约30题</p>
        <van-button type="primary" size="small" round color="#7B61FF">开始测试</van-button>
      </div>

      <div class="section-title">历史月练</div>
      <div v-if="history.length > 0" class="history-list">
        <div v-for="record in history" :key="record.id" class="card history-item" @click="viewResult(record.id!)">
          <div class="history-info">
            <span class="history-month">第{{ record.round }}月 · {{ subjectName(record.subject) }}</span>
            <span class="history-date">{{ formatDate(record.createTime) }}</span>
          </div>
          <div class="history-score">
            <span class="score-value">{{ record.score }}</span>
            <span class="score-label">分</span>
          </div>
        </div>
      </div>
      <van-empty v-else description="还没有月练记录" :image-size="80" />

      <div class="section-title">选择学科测试</div>
      <div class="subject-grid">
        <div v-for="s in subjects" :key="s.type" class="subject-card" :style="{ background: s.bgColor }" @click="startSubjectMonthly(s.type)">
          <van-icon :name="s.icon" size="28" :color="s.color" />
          <span class="subject-name" :style="{ color: s.color }">{{ s.name }}月练</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSubjectStore } from '@/stores/subject'
import { getPracticeRecords } from '@/composables/useDB'
import type { SubjectType, PracticeRecord } from '@/types'

const router = useRouter()
const subjectStore = useSubjectStore()
const subjects = computed(() => Object.values(subjectStore.subjects))
const currentMonth = computed(() => Math.ceil((new Date().getMonth() + 1 - 8) / 1) || 1)

const history = ref<PracticeRecord[]>([])

function subjectName(type: SubjectType) { return subjectStore.getSubject(type).name }
function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}/${d.getDate()}`
}
function startMonthly() { router.push('/monthly/0') }
function startSubjectMonthly(subject: SubjectType) { router.push(`/monthly/0?subject=${subject}`) }
function viewResult(id: number) { router.push(`/monthly/${id}/result`) }

onMounted(async () => { history.value = await getPracticeRecords('monthly') })
</script>

<style scoped lang="scss">
.monthly-page { padding-bottom: calc(60px + #{$safe-bottom}); }
.content { padding: 8px 0; }
.current-month {
  background: linear-gradient(135deg, #7B61FF 0%, #9D8AFF 100%);
  color: #fff; text-align: center; cursor: pointer;
  &:active { opacity: 0.9; }
}
.month-badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 12px; font-size: 12px; margin-bottom: 8px; }
.month-title { font-size: 20px; font-weight: 700; }
.month-desc { font-size: 13px; opacity: 0.85; margin: 4px 0 12px; }
.section-title { font-size: 14px; font-weight: 600; color: $color-text-secondary; padding: 16px 16px 8px; }
.history-list { display: flex; flex-direction: column; gap: 8px; }
.history-item { display: flex; align-items: center; justify-content: space-between; cursor: pointer; }
.history-info { display: flex; flex-direction: column; gap: 2px; }
.history-month { font-size: 14px; font-weight: 500; }
.history-date { font-size: 12px; color: $color-text-secondary; }
.history-score { text-align: center; }
.score-value { font-size: 22px; font-weight: 700; color: #7B61FF; }
.score-label { font-size: 12px; color: $color-text-secondary; }
.subject-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 0 16px; }
.subject-card { border-radius: 12px; padding: 20px 12px; display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; &:active { opacity: 0.8; } }
.subject-name { font-size: 14px; font-weight: 600; }
</style>
