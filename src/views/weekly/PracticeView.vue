<template>
  <div class="page-container practice-page">
    <van-nav-bar title="周周练" left-arrow @click-left="$router.back()">
      <template #right>
        <span class="timer">{{ formatTime(remainingTime) }}</span>
      </template>
    </van-nav-bar>

    <!-- 答题卡 -->
    <div class="answer-card-bar" @click="showAnswerCard = true">
      <span>答题卡 ({{ answeredCount }}/{{ questions.length }})</span>
      <van-icon name="apps-o" size="16" />
    </div>

    <!-- 题目区域 -->
    <div class="question-area" v-if="questions.length > 0">
      <div class="question-card">
        <div class="q-header">
          <van-tag :color="subjectColor" size="medium">{{ subjectName }}</van-tag>
          <van-tag plain type="primary" size="medium">第 {{ currentIndex + 1 }} 题</van-tag>
          <span class="q-type">{{ typeText(currentQuestion.type) }}</span>
        </div>
        <p class="q-content">{{ currentQuestion.content }}</p>

        <!-- 选择题 -->
        <div v-if="currentQuestion.type === 'choice'" class="q-options">
          <div
            v-for="(opt, i) in currentQuestion.options"
            :key="i"
            class="q-option"
            :class="{ selected: userAnswers[currentQuestion.id] === opt }"
            @click="selectAnswer(currentQuestion.id, opt)"
          >
            <span class="opt-label">{{ String.fromCharCode(65 + i) }}</span>
            <span>{{ opt }}</span>
          </div>
        </div>

        <!-- 判断题 -->
        <div v-else-if="currentQuestion.type === 'judge'" class="q-options">
          <div
            v-for="opt in currentQuestion.options"
            :key="opt"
            class="q-option"
            :class="{ selected: userAnswers[currentQuestion.id] === opt }"
            @click="selectAnswer(currentQuestion.id, opt)"
          >
            <span>{{ opt }}</span>
          </div>
        </div>

        <!-- 填空题/计算题 -->
        <div v-else class="q-fill">
          <van-field v-model="userAnswers[currentQuestion.id]" placeholder="请输入答案" clearable />
        </div>
      </div>

      <!-- 导航按钮 -->
      <div class="nav-buttons">
        <van-button v-if="currentIndex > 0" plain type="primary" @click="prev">上一题</van-button>
        <van-button v-if="currentIndex < questions.length - 1" type="primary" :color="subjectColor" @click="next">下一题</van-button>
        <van-button v-else type="danger" @click="submit">提交</van-button>
      </div>
    </div>

    <!-- 答题卡弹窗 -->
    <van-popup v-model:show="showAnswerCard" position="bottom" round>
      <div class="answer-card-popup">
        <h3>答题卡</h3>
        <div class="card-grid">
          <div
            v-for="(q, i) in questions"
            :key="q.id"
            class="card-num"
            :class="{ answered: userAnswers[q.id], current: i === currentIndex }"
            @click="goTo(i)"
          >{{ i + 1 }}</div>
        </div>
        <van-button type="primary" block round :color="subjectColor" @click="submit">提交试卷</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showDialog } from 'vant'
import { useSubjectStore } from '@/stores/subject'
import { usePracticeStore } from '@/stores/practice'
import { useMistakesStore } from '@/stores/mistakes'
import { addPracticeRecord } from '@/composables/useDB'
import type { Question, SubjectType } from '@/types'

const route = useRoute()
const router = useRouter()
const subjectStore = useSubjectStore()
const practiceStore = usePracticeStore()
const mistakesStore = useMistakesStore()

const subjectType = computed(() => (route.query.subject as SubjectType) || 'chinese')
const subject = computed(() => subjectStore.getSubject(subjectType.value))
const subjectColor = computed(() => subject.value?.color || '#4E8AF2')
const subjectName = computed(() => subject.value?.name || '综合')

const questions = ref<Question[]>([])
const currentIndex = ref(0)
const userAnswers = ref<Record<string, string>>({})
const showAnswerCard = ref(false)

const currentQuestion = computed(() => questions.value[currentIndex.value])
const answeredCount = computed(() => Object.keys(userAnswers.value).length)

// 倒计时
const totalTime = 40 * 60
const remainingTime = ref(totalTime)
let timer: ReturnType<typeof setInterval> | null = null

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

function typeText(type: string) {
  const map: Record<string, string> = { choice: '选择题', fill: '填空题', judge: '判断题', calculate: '计算题', match: '连线题', reading: '阅读理解' }
  return map[type] || type
}

function selectAnswer(qId: string, answer: string) {
  userAnswers.value[qId] = answer
}

function prev() { currentIndex.value-- }
function next() { currentIndex.value++ }
function goTo(index: number) {
  currentIndex.value = index
  showAnswerCard.value = false
}

async function submit() {
  try {
    await showDialog({
      title: '确认提交',
      message: `已答${answeredCount.value}题，未答${questions.value.length - answeredCount.value}题，确定提交吗？`,
      showCancelButton: true,
    })
  } catch {
    return
  }

  let correctCount = 0
  for (const q of questions.value) {
    const userAns = userAnswers.value[q.id]
    const correctAns = Array.isArray(q.answer) ? (q.answer[0] ?? '') : q.answer
    if (userAns === correctAns) {
      correctCount++
    } else {
      // 错题入错题本，单条失败不阻断其他错题记录
      try {
        await mistakesStore.addMistakeRecord({
          questionId: q.id,
          subject: q.subject,
          userAnswer: userAns || '未作答',
          source: 'weekly',
          createTime: new Date().toISOString(),
          retryCount: 0,
          mastered: false,
          question: q,
        })
      } catch {
        console.error('错题记录失败:', q.id)
      }
    }
  }

  const score = Math.round((correctCount / questions.value.length) * 100)
  const correctRate = Math.round((correctCount / questions.value.length) * 100)

  const recordId = await addPracticeRecord({
    type: 'weekly',
    round: Math.ceil((new Date().getTime() - new Date(new Date().getFullYear(), 8, 1).getTime()) / (7 * 86400000)),
    subject: subjectType.value,
    score,
    correctRate,
    totalQuestions: questions.value.length,
    correctCount,
    duration: totalTime - remainingTime.value,
    createTime: new Date().toISOString(),
    answers: questions.value.map(q => ({
      questionId: q.id,
      userAnswer: userAnswers.value[q.id] || '',
      correct: (Array.isArray(q.answer) ? (q.answer[0] ?? '') : q.answer) === userAnswers.value[q.id],
    })),
  })

  if (timer) clearInterval(timer)
  router.replace(`/weekly/${recordId}/result`)
}

function generateQuestions(): Question[] {
  const all: Question[] = []
  subject.value?.units.forEach(u => {
    u.lessons.forEach(l => {
      l.reviewContent?.exercises.forEach(e => all.push(e))
    })
  })
  return practiceStore.generateWeeklyQuestions(all, 15)
}

onMounted(() => {
  questions.value = generateQuestions()
  timer = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--
    } else {
      submit()
    }
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped lang="scss">
.practice-page { padding-bottom: 20px; }
.timer { font-size: 16px; font-weight: 600; color: #FF4D4F; }

.answer-card-bar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 16px; background: #fff; border-bottom: 1px solid $color-border;
  font-size: 14px; color: $color-text-regular; cursor: pointer;
}

.question-area { padding: 12px 0; }
.question-card {
  background: #fff; border-radius: 12px; padding: 16px; margin: 0 16px;
}
.q-header { display: flex; gap: 6px; align-items: center; margin-bottom: 12px; }
.q-type { font-size: 12px; color: $color-text-secondary; margin-left: auto; }
.q-content { font-size: 16px; color: $color-text-primary; line-height: 1.8; margin-bottom: 16px; }

.q-options { display: flex; flex-direction: column; gap: 8px; }
.q-option {
  display: flex; gap: 8px; align-items: center;
  padding: 12px; border-radius: 8px; background: $color-bg;
  font-size: 14px; cursor: pointer; transition: all $duration-base $easing-bounce;
  border: 2px solid transparent;
  
  &:active { 
    transform: scale(0.95);
    background-color: darken($color-bg, 5%);
    border-color: $color-primary;
    box-shadow: $shadow-sm;
  }
  &.selected { 
    background: #EBF3FF; 
    border: 2px solid $color-primary;
    animation: pulse 0.3s $easing-bounce;
  }
}
.opt-label {
  width: 24px; height: 24px; border-radius: 50%;
  background: #fff; display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 600; color: $color-text-secondary; flex-shrink: 0;
}
.q-option.selected .opt-label { background: $color-primary; color: #fff; }

.nav-buttons { display: flex; justify-content: space-between; padding: 16px; gap: 12px; }
.nav-buttons .van-button { flex: 1; }

.answer-card-popup { padding: 20px 16px calc(20px + #{$safe-bottom}); }
.answer-card-popup h3 { text-align: center; margin-bottom: 16px; }
.card-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; margin-bottom: 20px; }
.card-num {
  width: 100%; aspect-ratio: 1; border-radius: 8px;
  background: $color-bg; display: flex; align-items: center; justify-content: center;
  font-size: 14px; color: $color-text-regular; cursor: pointer;
  &.answered { background: $color-primary; color: #fff; }
  &.current { border: 2px solid $color-primary; }
}
</style>
