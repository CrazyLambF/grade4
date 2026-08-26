<template>
  <div class="page-container mistakes-page">
    <van-nav-bar title="错题本" />
    <div class="content">
      <!-- 学科错题统计 -->
      <div class="subject-stats">
        <div v-for="s in subjects" :key="s.type" class="subject-stat-card" :style="{ background: s.bgColor }" @click="goSubject(s.type)">
          <van-icon :name="s.icon" size="24" :color="s.color" />
          <div class="stat-info">
            <span class="stat-name" :style="{ color: s.color }">{{ s.name }}</span>
            <span class="stat-count">{{ counts[s.type] || 0 }}题</span>
          </div>
        </div>
      </div>

      <!-- 最近错题 -->
      <div class="section-title">最近错题</div>
      <div v-if="recentMistakes.length > 0" class="mistake-list">
        <div v-for="m in recentMistakes" :key="m.id" class="card mistake-item">
          <div class="mistake-header">
            <van-tag :color="subjectColor(m.subject)" size="medium">{{ subjectName(m.subject) }}</van-tag>
            <span class="mistake-time">{{ formatDate(m.createTime) }}</span>
          </div>
          <p class="mistake-q">{{ m.question.content }}</p>
          <div class="mistake-answers">
            <p class="your-ans">你的答案：{{ Array.isArray(m.userAnswer) ? m.userAnswer.join('、') : m.userAnswer }}</p>
            <p class="correct-ans">正确答案：{{ Array.isArray(m.question.answer) ? m.question.answer.join('、') : m.question.answer }}</p>
          </div>
          <div class="mistake-actions">
            <van-button size="mini" plain :color="subjectColor(m.subject)" @click="retry(m)">重做</van-button>
            <van-button size="mini" type="success" plain @click="markMastered(m.id!)">已掌握</van-button>
          </div>
        </div>
      </div>
      <van-empty v-else description="还没有错题，继续加油！" :image-size="80" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSubjectStore } from '@/stores/subject'
import { useMistakesStore } from '@/stores/mistakes'
import { db } from '@/composables/useDB'
import type { SubjectType, MistakeRecord } from '@/types'

const router = useRouter()
const subjectStore = useSubjectStore()
const mistakesStore = useMistakesStore()

const subjects = computed(() => Object.values(subjectStore.subjects))
const counts = ref<Record<string, number>>({})
const recentMistakes = ref<MistakeRecord[]>([])

function subjectColor(type: SubjectType) { return subjectStore.getSubject(type).color }
function subjectName(type: SubjectType) { return subjectStore.getSubject(type).name }
function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}/${d.getDate()}`
}
function goSubject(type: SubjectType) { router.push(`/mistakes/${type}`) }

async function retry(m: MistakeRecord) {
  router.push(`/mistakes/${m.subject}`)
}

async function markMastered(id: number) {
  await mistakesStore.markMastered(id)
  await loadData()
}

async function loadData() {
  const all = await mistakesStore.loadAllMistakes()
  recentMistakes.value = all.slice(0, 10)
  const subjects: SubjectType[] = ['chinese', 'math', 'english', 'science']
  for (const s of subjects) {
    const list = await db.mistakes.where('subject').equals(s).and(m => !m.mastered).count()
    counts.value[s] = list
  }
}

onMounted(() => loadData())
</script>

<style scoped lang="scss">
.mistakes-page { padding-bottom: calc(60px + #{$safe-bottom}); }
.content { padding: 8px 0; }
.subject-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 0 16px; }
.subject-stat-card { border-radius: 12px; padding: 16px; display: flex; align-items: center; gap: 10px; cursor: pointer; &:active { opacity: 0.8; } }
.stat-info { display: flex; flex-direction: column; }
.stat-name { font-size: 14px; font-weight: 600; }
.stat-count { font-size: 12px; color: $color-text-secondary; }
.section-title { font-size: 14px; font-weight: 600; color: $color-text-secondary; padding: 16px 16px 8px; }
.mistake-list { display: flex; flex-direction: column; gap: 8px; }
.mistake-item { padding: 12px; }
.mistake-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.mistake-time { font-size: 11px; color: $color-text-secondary; }
.mistake-q { font-size: 14px; color: $color-text-primary; margin-bottom: 8px; }
.mistake-answers { font-size: 13px; margin-bottom: 8px; }
.your-ans { color: #FF4D4F; }
.correct-ans { color: #52C41A; }
.mistake-actions { display: flex; gap: 8px; }
</style>
