<template>
  <div class="page-container game-play-page">
    <van-nav-bar :title="gameConfig?.name" left-arrow @click-left="$router.back()">
      <template #right>
        <span class="game-timer" v-if="timerActive">{{ formatTime(remainingTime) }}</span>
      </template>
    </van-nav-bar>

    <div class="content" v-if="gameConfig">
      <!-- 游戏说明 -->
      <div class="card game-info-card" v-if="!started">
        <h3 class="game-name">{{ gameConfig.name }}</h3>
        <p class="game-desc">{{ gameConfig.description }}</p>
        <div class="game-rules">
          <van-icon name="info-o" size="14" color="#969799" />
          <span>{{ rulesText }}</span>
        </div>
        <van-button type="primary" block round :color="subjectColor" @click="startGame">开始游戏</van-button>
      </div>

      <!-- 快问快答/一分钟挑战类游戏 -->
      <div v-else-if="isQuickQAType" class="game-content">
        <div class="score-display">
          <span class="score-label">得分</span>
          <span class="score-value">{{ score }}</span>
          <span class="combo" v-if="combo > 1">连击 x{{ combo }}</span>
        </div>
        <div class="qa-card" v-if="currentQuestion">
          <p class="qa-question">{{ currentQuestion.content }}</p>
          <div class="qa-options">
            <div
              v-for="(opt, i) in currentQuestion.options || []"
              :key="i"
              class="qa-option"
              @click="answer(opt)"
            >
              {{ opt }}
            </div>
          </div>
          <div v-if="!currentQuestion.options" class="qa-fill">
            <van-field v-model="fillAnswer" placeholder="输入答案" @keyup.enter="answer(fillAnswer)" />
            <van-button size="small" :color="subjectColor" @click="answer(fillAnswer)">确认</van-button>
          </div>
        </div>
      </div>

      <!-- 连线/配对类游戏 -->
      <div v-else-if="isMatchType" class="game-content">
        <div class="score-display">
          <span class="score-label">得分</span>
          <span class="score-value">{{ score }}</span>
        </div>
        <p class="match-instruction">{{ gameConfig.description }}</p>
        <div class="match-area">
          <div class="match-left">
            <div
              v-for="item in matchItems"
              :key="'l' + item.id"
              class="match-item"
              :class="{ selected: selectedLeft === item.id, matched: item.matched }"
              @click="selectLeft(item.id)"
            >{{ item.left }}</div>
          </div>
          <div class="match-right">
            <div
              v-for="item in shuffledRight"
              :key="'r' + item.id"
              class="match-item"
              :class="{ selected: selectedRight === item.id, matched: item.matched }"
              @click="selectRight(item.id)"
            >{{ item.right }}</div>
          </div>
        </div>
      </div>

      <!-- 游戏结束 -->
      <div v-else class="game-content">
        <van-empty description="游戏加载中..." />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGamesStore, gameConfigs } from '@/stores/games'
import { useSubjectStore } from '@/stores/subject'
import { exportAllData } from '@/composables/useDB'
import type { SubjectType } from '@/types'

const route = useRoute()
const router = useRouter()
const gamesStore = useGamesStore()
const subjectStore = useSubjectStore()

const subjectType = computed(() => route.params.subject as SubjectType)
const gameId = computed(() => route.params.gameId as string)
const gameConfig = computed(() => gamesStore.getGameConfig(gameId.value))
const subject = computed(() => subjectStore.getSubject(subjectType.value))
const subjectColor = computed(() => subject.value?.color || '#4E8AF2')

const started = ref(false)
const score = ref(0)
const combo = ref(0)
const remainingTime = ref(60)
const timerActive = ref(false)
const fillAnswer = ref('')

// 快问快答类型
const isQuickQAType = computed(() => {
  return ['quick-qa', 'math-minute', 'listen-pick', 'rhyme-master'].includes(gameId.value)
})
const isMatchType = computed(() => {
  return ['word-match', 'word-clear', 'sound-connect', 'food-sort', 'formula-clear', 'shape-sort'].includes(gameId.value)
})

const rulesText = computed(() => {
  if (isQuickQAType.value) return '限时60秒，答对越多得分越高，连击有额外加分！'
  if (isMatchType.value) return '找出正确的配对，全部配对即过关！'
  return '完成游戏任务获得积分！'
})

// 题目数据
const questions = ref<any[]>([])
const currentQIndex = ref(0)
const currentQuestion = computed(() => questions.value[currentQIndex.value])

// 连线数据
const matchItems = ref<any[]>([])
const selectedLeft = ref<number | null>(null)
const selectedRight = ref<number | null>(null)
const shuffledRight = ref<any[]>([])

let timer: any = null

function formatTime(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

function startGame() {
  started.value = true
  score.value = 0
  combo.value = 0

  if (isQuickQAType.value) {
    loadQAQuestions()
    remainingTime.value = 60
    timerActive.value = true
    timer = setInterval(() => {
      if (remainingTime.value > 0) {
        remainingTime.value--
      } else {
        endGame()
      }
    }, 1000)
  } else if (isMatchType.value) {
    loadMatchItems()
  }
}

function loadQAQuestions() {
  // 根据学科加载题目
  const subj = subjectType.value
  const allQs: any[] = []
  subjectStore.getSubject(subj).units.forEach(u => {
    u.lessons.forEach(l => {
      l.reviewContent?.exercises.forEach(q => allQs.push(q))
    })
  })
  questions.value = allQs.sort(() => Math.random() - 0.5).slice(0, 20)
  currentQIndex.value = 0
}

function loadMatchItems() {
  // 根据游戏类型生成配对数据
  const subj = subjectType.value
  const items: any[] = []
  if (gameId.value === 'word-clear' && subj === 'english') {
    const words = [
      { left: 'classroom', right: '教室' },
      { left: 'window', right: '窗户' },
      { left: 'door', right: '门' },
      { left: 'kitchen', right: '厨房' },
      { left: 'beef', right: '牛肉' },
      { left: 'friend', right: '朋友' },
    ]
    words.forEach((w, i) => items.push({ id: i, ...w, matched: false }))
  } else if (gameId.value === 'sound-connect' && subj === 'science') {
    const pairs = [
      { left: '音高', right: '振动频率' },
      { left: '音量', right: '振幅大小' },
      { left: '音色', right: '材质不同' },
      { left: '传播速度', right: '固体最快' },
      { left: '声音产生', right: '物体振动' },
    ]
    pairs.forEach((p, i) => items.push({ id: i, ...p, matched: false }))
  } else {
    // 默认配对
    const pairs = [
      { left: 'A', right: '1' },
      { left: 'B', right: '2' },
      { left: 'C', right: '3' },
      { left: 'D', right: '4' },
    ]
    pairs.forEach((p, i) => items.push({ id: i, ...p, matched: false }))
  }
  matchItems.value = items
  shuffledRight.value = [...items].sort(() => Math.random() - 0.5)
}

function answer(ans: string) {
  if (!currentQuestion.value) return
  const correct = Array.isArray(currentQuestion.value.answer) ? currentQuestion.value.answer[0] : currentQuestion.value.answer
  if (ans === correct) {
    score.value += 10 + combo.value * 2
    combo.value++
  } else {
    combo.value = 0
  }
  fillAnswer.value = ''
  currentQIndex.value++
  if (currentQIndex.value >= questions.value.length) {
    endGame()
  }
}

function selectLeft(id: number) {
  if (matchItems.value.find(m => m.id === id)?.matched) return
  selectedLeft.value = id
  checkMatch()
}

function selectRight(id: number) {
  if (matchItems.value.find(m => m.id === id)?.matched) return
  selectedRight.value = id
  checkMatch()
}

function checkMatch() {
  if (selectedLeft.value !== null && selectedRight.value !== null) {
    if (selectedLeft.value === selectedRight.value) {
      matchItems.value.find(m => m.id === selectedLeft.value)!.matched = true
      shuffledRight.value.find(m => m.id === selectedRight.value)!.matched = true
      score.value += 20
      if (matchItems.value.every(m => m.matched)) {
        setTimeout(() => endGame(), 500)
      }
    }
    selectedLeft.value = null
    selectedRight.value = null
  }
}

async function endGame() {
  if (timer) clearInterval(timer)
  timerActive.value = false

  await gamesStore.recordGame({
    subject: subjectType.value,
    gameId: gameId.value,
    gameName: gameConfig.value?.name || '',
    score: score.value,
    duration: 60 - remainingTime.value,
    difficulty: gameConfig.value?.difficulty || 2,
    createTime: new Date().toISOString(),
  })

  router.replace(`/games/${subjectType.value}/${gameId.value}/result?score=${score.value}`)
}

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped lang="scss">
.game-play-page { padding-bottom: 20px; }
.game-timer { font-size: 16px; font-weight: 600; color: #FF4D4F; }
.content { padding: 8px 0; }

.game-info-card { text-align: center; }
.game-name { font-size: 20px; font-weight: 700; color: $color-text-primary; margin-bottom: 8px; }
.game-desc { font-size: 14px; color: $color-text-regular; margin-bottom: 16px; }
.game-rules { display: flex; gap: 4px; align-items: flex-start; font-size: 13px; color: $color-text-secondary; background: $color-bg; padding: 8px 12px; border-radius: 8px; margin-bottom: 16px; text-align: left; }

.game-content { padding: 12px 16px; }
.score-display {
  display: flex; align-items: baseline; justify-content: center; gap: 8px; margin-bottom: 16px;
}
.score-label { font-size: 14px; color: $color-text-secondary; }
.score-value { font-size: 32px; font-weight: 700; color: $color-primary; }
.combo { font-size: 14px; color: #FF4D4F; font-weight: 600; }

.qa-card {
  background: #fff; border-radius: 12px; padding: 20px 16px;
}
.qa-question { font-size: 18px; color: $color-text-primary; margin-bottom: 16px; text-align: center; line-height: 1.6; }
.qa-options { display: flex; flex-direction: column; gap: 10px; }
.qa-option {
  padding: 14px; border-radius: 10px; background: $color-bg;
  font-size: 16px; text-align: center; cursor: pointer; transition: all 0.2s;
  &:active { transform: scale(0.98); background: darken($color-bg, 5%); }
}
.qa-fill { display: flex; gap: 8px; align-items: center; }

.match-instruction { font-size: 14px; color: $color-text-secondary; text-align: center; margin-bottom: 16px; }
.match-area { display: flex; justify-content: space-between; gap: 16px; }
.match-left, .match-right { flex: 1; display: flex; flex-direction: column; gap: 8px; }
.match-item {
  padding: 12px; border-radius: 8px; background: #fff; font-size: 14px;
  text-align: center; cursor: pointer; border: 2px solid transparent; transition: all 0.2s;
  &:active { transform: scale(0.98); }
  &.selected { border-color: $color-primary; background: #EBF3FF; }
  &.matched { opacity: 0.3; pointer-events: none; }
}
</style>
