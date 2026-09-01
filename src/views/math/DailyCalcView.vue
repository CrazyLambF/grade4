<template>
  <div class="page-container daily-calc-page">
    <van-nav-bar title="每日计算" left-arrow @click-left="$router.back()" />
    <div class="content">
      <!-- 顶部信息 -->
      <div class="card info-card">
        <div class="date-display">
          <van-icon name="clock-o" size="16" color="#4E8AF2" />
          <span>{{ todayStr }}</span>
          <span class="date-sep">·</span>
          <span>第 {{ round }} 组</span>
        </div>
      </div>

      <!-- 题型选择（未开始时显示） -->
      <div v-if="!started" class="setup-section">
        <div class="card">
          <p class="setup-title">选择题型</p>
          <div class="cat-grid">
            <div
              v-for="cat in categories"
              :key="cat.key"
              class="cat-item"
              :class="{ active: selectedCat === cat.key }"
              @click="selectedCat = cat.key"
            >
              <van-icon :name="cat.icon" size="22" :color="selectedCat === cat.key ? '#fff' : '#4E8AF2'" />
              <span>{{ cat.label }}</span>
            </div>
          </div>
        </div>

        <div class="card diff-card">
          <p class="setup-title">选择难度</p>
          <div class="diff-row">
            <div
              v-for="d in [{ v: 1, l: '简单' }, { v: 2, l: '中等' }, { v: 3, l: '困难' }]"
              :key="d.v"
              class="diff-btn"
              :class="{ active: difficulty === d.v }"
              @click="difficulty = d.v as 1|2|3"
            >{{ d.l }}</div>
          </div>
        </div>

        <div class="card count-card">
          <p class="setup-title">题目数量</p>
          <div class="diff-row">
            <div
              v-for="c in [10, 15, 20, 30]"
              :key="c"
              class="diff-btn"
              :class="{ active: questionCount === c }"
              @click="questionCount = c"
            >{{ c }}题</div>
          </div>
        </div>

        <van-button type="primary" block round color="#4E8AF2" size="large" @click="startTest" style="margin-top: 16px">
          <van-icon name="play-o" size="18" /> 开始练习
        </van-button>
      </div>

      <!-- 答题区 -->
      <div v-else-if="!finished" class="qa-section">
        <div class="progress-bar">
          <div class="prog-left">
            <span class="prog-num">{{ qIdx + 1 }} / {{ questions.length }}</span>
            <van-tag plain color="#4E8AF2" size="medium">{{ currentQ.type }}</van-tag>
          </div>
          <span class="timer" v-if="timerActive">{{ fmtTime }}</span>
        </div>
        <div class="prog-track">
          <div class="prog-fill" :style="{ width: ((qIdx) / questions.length * 100) + '%' }"></div>
        </div>
        <div class="card question-card">
          <p class="question-text">{{ currentQ.content }}</p>
          <div class="answer-area">
            <input ref="inputRef" v-model="userAns" class="answer-input" placeholder="输入答案" @keyup.enter="submitAnswer" inputmode="text" />
            <van-button type="primary" color="#4E8AF2" @click="submitAnswer" :disabled="!userAns.trim()">确认</van-button>
          </div>
        </div>
        <div class="feedback" v-if="lastFb">
          <van-icon :name="lastFb === 'correct' ? 'success' : 'cross'" :color="lastFb === 'correct' ? '#52C41A' : '#FF4D4F'" size="28" />
          <span :style="{ color: lastFb === 'correct' ? '#52C41A' : '#FF4D4F' }">{{ lastFb === 'correct' ? '答对了！' : '答案是 ' + currentQ.answer }}</span>
        </div>
        <!-- 连击 -->
        <div class="combo-badge" v-if="combo >= 3">连击 x{{ combo }} 🔥</div>
      </div>

      <!-- 结果区 -->
      <div v-else class="result-section">
        <div class="card result-card">
          <van-icon :name="correctCount >= questions.length * 0.8 ? 'trophy-o' : 'smile-o'" size="56" :color="correctCount >= questions.length * 0.8 ? '#FAAD14' : '#4E8AF2'" />
          <h3>{{ correctCount >= questions.length * 0.8 ? '太棒了！' : '继续加油！' }}</h3>
          <div class="result-stats">
            <div class="rstat"><span class="rstat-num" style="color:#52C41A">{{ correctCount }}</span><span class="rstat-label">正确</span></div>
            <div class="rstat"><span class="rstat-num" style="color:#FF4D4F">{{ wrongCount }}</span><span class="rstat-label">错误</span></div>
            <div class="rstat"><span class="rstat-num" style="color:#4E8AF2">{{ accuracy }}%</span><span class="rstat-label">正确率</span></div>
            <div class="rstat"><span class="rstat-num" style="color:#FAAD14">{{ totalTime }}s</span><span class="rstat-label">用时</span></div>
          </div>
          <div class="result-best" v-if="maxCombo >= 3">
            <van-icon name="fire-o" size="14" color="#FF4D4F" />
            <span>最高连击 x{{ maxCombo }}</span>
          </div>
        </div>
        <!-- 错题回顾 -->
        <div class="card wrong-list" v-if="wrongList.length">
          <p class="wrong-list-title">错题回顾</p>
          <div v-for="(w, i) in wrongList" :key="i" class="wrong-item">
            <span class="wrong-q">{{ w.content }}</span>
            <span class="wrong-your">你的答案：{{ w.userAns }}</span>
            <span class="wrong-correct">正确：{{ w.answer }}</span>
          </div>
        </div>
        <div class="action-row">
          <van-button plain type="primary" block round @click="restart">再来一组</van-button>
          <van-button type="primary" block round color="#4E8AF2" @click="backToSetup">换题型</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import {
  generateQuestions, categoryConfig,
  type MathQuestion, type Difficulty, type CalcCategory,
} from '@/utils/mathQuestionGenerator'

// 状态
const todayStr = ref('')
const round = ref(1)
const started = ref(false)
const finished = ref(false)

// 设置
const categories = categoryConfig
const selectedCat = ref<CalcCategory>('mixed')
const difficulty = ref<Difficulty>(2)
const questionCount = ref(20)

// 答题
const questions = ref<MathQuestion[]>([])
const qIdx = ref(0)
const userAns = ref('')
const correctCount = ref(0)
const wrongCount = ref(0)
const lastFb = ref<'' | 'correct' | 'wrong'>('')
const inputRef = ref<HTMLInputElement | null>(null)
const combo = ref(0)
const maxCombo = ref(0)
const wrongList = ref<{ content: string; answer: string; userAns: string }[]>([])

// 计时
const timerActive = ref(false)
const remainingTime = ref(0)
const startTime = ref(0)
const totalTime = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const currentQ = computed(() => questions.value[qIdx.value] ?? { content: '', answer: '', type: '', unit: 0 } as MathQuestion)
const accuracy = computed(() => {
  const t = correctCount.value + wrongCount.value
  return t === 0 ? 0 : Math.round((correctCount.value / t) * 100)
})
const fmtTime = computed(() => `${Math.floor(remainingTime.value / 60)}:${String(remainingTime.value % 60).padStart(2, '0')}`)

function startTest() {
  questions.value = generateQuestions(selectedCat.value, difficulty.value, questionCount.value)
  qIdx.value = 0
  correctCount.value = 0
  wrongCount.value = 0
  combo.value = 0
  maxCombo.value = 0
  wrongList.value = []
  userAns.value = ''
  lastFb.value = ''
  finished.value = false
  started.value = true

  startTime.value = Date.now()
  timerActive.value = true
  remainingTime.value = questionCount.value * 15 // 每题15秒
  timer = setInterval(() => {
    if (remainingTime.value > 0) remainingTime.value--
    else finishTest()
  }, 1000)

  nextTick(() => inputRef.value?.focus())
}

function submitAnswer() {
  const ans = userAns.value.trim()
  if (!ans) return

  const q = currentQ.value
  const isCorrect = ans === q.answer

  if (isCorrect) {
    correctCount.value++
    combo.value++
    if (combo.value > maxCombo.value) maxCombo.value = combo.value
    lastFb.value = 'correct'
  } else {
    wrongCount.value++
    combo.value = 0
    lastFb.value = 'wrong'
    wrongList.value.push({ content: q.content, answer: q.answer, userAns: ans })
  }

  userAns.value = ''
  setTimeout(() => {
    lastFb.value = ''
    qIdx.value++
    if (qIdx.value >= questions.value.length) finishTest()
    else nextTick(() => inputRef.value?.focus())
  }, 1000)
}

function finishTest() {
  if (timer) clearInterval(timer)
  timerActive.value = false
  totalTime.value = Math.round((Date.now() - startTime.value) / 1000)
  finished.value = true
}

function restart() {
  round.value++
  startTest()
}

function backToSetup() {
  started.value = false
  finished.value = false
  if (timer) clearInterval(timer)
  timerActive.value = false
}

onMounted(() => {
  const n = new Date()
  todayStr.value = `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-${String(n.getDate()).padStart(2, '0')}`
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped lang="scss">
.daily-calc-page { padding-bottom: 20px; }
.content { padding: 8px 16px; }

.info-card { margin-bottom: 12px; }
.date-display { display: flex; align-items: center; gap: 6px; font-size: 14px; color: $color-text-secondary; }
.date-sep { margin: 0 4px; color: $color-text-placeholder; }

/* 设置区 */
.setup-section { }
.setup-title { font-size: 15px; font-weight: 600; color: $color-text-primary; margin-bottom: 12px; }
.cat-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
.cat-item { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 12px 4px; border-radius: 10px; background: $color-bg; font-size: 12px; color: $color-text-regular; cursor: pointer; transition: all 0.2s; &:active { transform: scale(0.96); } &.active { background: #4E8AF2; color: #fff; } }
.diff-card, .count-card { margin-top: 12px; }
.diff-row { display: flex; gap: 8px; }
.diff-btn { flex: 1; text-align: center; padding: 10px; border-radius: 10px; background: $color-bg; font-size: 14px; color: $color-text-regular; cursor: pointer; transition: all 0.2s; &:active { transform: scale(0.96); } &.active { background: #4E8AF2; color: #fff; font-weight: 600; } }

/* 答题区 */
.qa-section { }
.progress-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.prog-left { display: flex; align-items: center; gap: 8px; }
.prog-num { font-size: 14px; color: $color-text-secondary; }
.timer { color: #FF4D4F; font-weight: 600; font-size: 16px; }
.prog-track { height: 4px; background: $color-border; border-radius: 2px; margin-bottom: 12px; overflow: hidden; }
.prog-fill { height: 100%; background: #4E8AF2; border-radius: 2px; transition: width 0.3s; }
.question-card { text-align: center; padding: 32px 16px; }
.question-text { font-size: 26px; font-weight: 700; color: $color-text-primary; margin-bottom: 20px; line-height: 1.6; }
.answer-area { display: flex; gap: 8px; justify-content: center; align-items: center; }
.answer-input { width: 180px; height: 44px; border: 2px solid #4E8AF2; border-radius: 8px; text-align: center; font-size: 20px; font-weight: 600; outline: none; &:focus { box-shadow: 0 0 0 3px rgba(78, 138, 242, 0.15); } }
.feedback { display: flex; align-items: center; gap: 8px; justify-content: center; margin-top: 12px; font-size: 15px; }
.combo-badge { text-align: center; margin-top: 8px; font-size: 16px; color: #FF4D4F; font-weight: 700; }

/* 结果区 */
.result-section { }
.result-card { text-align: center; padding: 32px 16px; }
.result-card h3 { font-size: 22px; font-weight: 700; margin: 12px 0; color: $color-text-primary; }
.result-stats { display: flex; justify-content: center; gap: 20px; }
.rstat { display: flex; flex-direction: column; align-items: center; }
.rstat-num { font-size: 24px; font-weight: 700; }
.rstat-label { font-size: 12px; color: $color-text-secondary; }
.result-best { display: flex; align-items: center; gap: 4px; justify-content: center; margin-top: 12px; font-size: 14px; color: #FF4D4F; }

.wrong-list { margin-top: 12px; }
.wrong-list-title { font-size: 15px; font-weight: 600; color: $color-text-primary; margin-bottom: 10px; }
.wrong-item { display: flex; flex-direction: column; gap: 2px; padding: 8px 0; border-bottom: 1px solid $color-border; &:last-child { border-bottom: none; } }
.wrong-q { font-size: 15px; color: $color-text-primary; }
.wrong-your { font-size: 13px; color: #FF4D4F; }
.wrong-correct { font-size: 13px; color: #52C41A; }

.action-row { display: flex; gap: 12px; margin-top: 16px; }
.action-row .van-button { flex: 1; }
</style>
