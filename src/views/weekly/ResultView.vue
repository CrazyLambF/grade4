<template>
  <div class="page-container result-page">
    <van-nav-bar title="周周练结果" left-arrow @click-left="$router.push('/weekly')" />
    <div class="content" v-if="record">
      <!-- 成绩展示 -->
      <div class="score-card" :style="{ background: scoreGradient }">
        <div class="score-circle">
          <span class="score-num">{{ record.score }}</span>
          <span class="score-unit">分</span>
        </div>
        <div class="score-grade">{{ grade }}</div>
        <div class="score-stats">
          <div class="stat">
            <span class="stat-value">{{ record.correctCount }}</span>
            <span class="stat-label">答对</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-value">{{ record.totalQuestions - record.correctCount }}</span>
            <span class="stat-label">答错</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-value">{{ record.correctRate }}%</span>
            <span class="stat-label">正确率</span>
          </div>
        </div>
      </div>

      <!-- 答题详情 -->
      <div class="section-title">答题详情</div>
      <div class="detail-list">
        <div v-for="(ans, i) in record.answers" :key="i" class="card detail-item">
          <div class="detail-header">
            <van-tag :color="ans.correct ? '#52C41A' : '#FF4D4F'" size="medium">{{ i + 1 }}</van-tag>
            <van-icon :name="ans.correct ? 'success' : 'cross'" :color="ans.correct ? '#52C41A' : '#FF4D4F'" size="16" />
          </div>
          <p class="detail-q">{{ getQuestion(ans.questionId)?.content || '题目加载中' }}</p>
          <div class="detail-answers">
            <p class="your-answer wrong" v-if="!ans.correct">
              你的答案：{{ ans.userAnswer || '未作答' }}
            </p>
            <p class="correct-answer">
              正确答案：{{ Array.isArray(getQuestion(ans.questionId)?.answer) ? (getQuestion(ans.questionId)?.answer as string[]).join('、') : getQuestion(ans.questionId)?.answer }}
            </p>
            <p class="analysis" v-if="getQuestion(ans.questionId)?.analysis">
              解析：{{ getQuestion(ans.questionId)?.analysis }}
            </p>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <van-button plain type="primary" block round @click="$router.push('/mistakes')">查看错题</van-button>
        <van-button type="primary" block round color="#4E8AF2" @click="$router.push('/weekly')">再来一练</van-button>
      </div>
    </div>
    <van-loading v-else type="spinner" style="display: block; margin: 100px auto;" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getPracticeRecord } from '@/composables/useDB'
import { useSubjectStore } from '@/stores/subject'
import type { PracticeRecord, Question, SubjectType } from '@/types'

const route = useRoute()
const subjectStore = useSubjectStore()

const record = ref<PracticeRecord | null>(null)
const allQuestions = ref<Record<string, Question>>({})

const scoreGradient = computed(() => {
  if (!record.value) return ''
  if (record.value.score >= 90) return 'linear-gradient(135deg, #52C41A 0%, #73D13D 100%)'
  if (record.value.score >= 70) return 'linear-gradient(135deg, #4E8AF2 0%, #6BA6FF 100%)'
  if (record.value.score >= 60) return 'linear-gradient(135deg, #FAAD14 0%, #FFC53D 100%)'
  return 'linear-gradient(135deg, #FF4D4F 0%, #FF7875 100%)'
})

const grade = computed(() => {
  if (!record.value) return ''
  const s = record.value.score
  if (s >= 90) return '优秀 ⭐'
  if (s >= 80) return '良好 👍'
  if (s >= 60) return '合格 ✅'
  return '继续加油 💪'
})

function getQuestion(qId: string) {
  return allQuestions.value[qId]
}

function loadAllQuestions(subject: SubjectType) {
  const config = subjectStore.getSubject(subject)
  config.units.forEach(u => {
    u.lessons.forEach(l => {
      l.reviewContent?.exercises.forEach(q => {
        allQuestions.value[q.id] = q
      })
    })
  })
}

onMounted(async () => {
  const id = Number(route.params.id)
  const r = await getPracticeRecord(id)
  record.value = r ?? null
  if (record.value) {
    loadAllQuestions(record.value.subject)
  }
})
</script>

<style scoped lang="scss">
.result-page { padding-bottom: 20px; }
.content { padding: 8px 0; }

.score-card { border-radius: 16px; padding: 24px; margin: 16px; text-align: center; color: #fff; }
.score-circle { display: flex; align-items: baseline; justify-content: center; gap: 4px; margin-bottom: 8px; }
.score-num { font-size: 48px; font-weight: 700; }
.score-unit { font-size: 18px; }
.score-grade { font-size: 18px; margin-bottom: 20px; }
.score-stats { display: flex; justify-content: center; align-items: center; gap: 24px; }
.stat { display: flex; flex-direction: column; align-items: center; }
.stat-value { font-size: 22px; font-weight: 700; }
.stat-label { font-size: 12px; opacity: 0.85; }
.stat-divider { width: 1px; height: 30px; background: rgba(255,255,255,0.3); }

.section-title { font-size: 14px; font-weight: 600; color: $color-text-secondary; padding: 16px 16px 8px; }

.detail-list { display: flex; flex-direction: column; gap: 8px; }
.detail-item { padding: 12px; }
.detail-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.detail-q { font-size: 14px; color: $color-text-primary; margin-bottom: 8px; }
.detail-answers { font-size: 13px; }
.your-answer { color: #FF4D4F; margin-bottom: 4px; }
.correct-answer { color: #52C41A; margin-bottom: 4px; }
.analysis { color: $color-text-secondary; line-height: 1.5; }

.action-buttons { display: flex; gap: 12px; padding: 16px; }
.action-buttons .van-button { flex: 1; }
</style>
