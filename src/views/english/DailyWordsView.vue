<template>
  <div class="page-container daily-words-page">
    <van-nav-bar title="每日词汇" left-arrow @click-left="$router.back()" />
    <div class="content">
      <!-- 日期选择 -->
      <div class="card day-selector">
        <div class="day-info">
          <van-icon name="calendar-o" size="18" color="#7ED321" />
          <span class="day-title">{{ currentDayData.title }}</span>
        </div>
        <div class="day-switch">
          <van-button size="small" plain icon="arrow-left" @click="prevDay" :disabled="curDay <= 1" />
          <span class="day-num">第 {{ curDay }} 天</span>
          <van-button size="small" plain icon="arrow" @click="nextDay" :disabled="curDay >= dailyWordsData.length" />
        </div>
      </div>

      <!-- 学习模式切换 -->
      <van-tabs v-model:active="mode" shrink>
        <van-tab title="单词卡">单词卡</van-tab>
        <van-tab title="拼写测试">拼写测试</van-tab>
        <van-tab title="中英配对">中英配对</van-tab>
      </van-tabs>

      <!-- 单词卡模式 -->
      <div v-if="mode === 0" class="card-list">
        <div v-for="(w, i) in currentDayData.words" :key="i" class="card word-card" :class="{ flipped: flippedIdx === i }">
          <div class="word-card-front" @click="toggleFlip(i)">
            <div class="word-phonetic">{{ w.phonetic }}</div>
            <h3 class="word-text">{{ w.word }}</h3>
            <van-icon name="eye-o" size="16" color="#969799" />
            <p class="word-hint">点击查看释义</p>
          </div>
          <div v-if="flippedIdx === i" class="word-card-back">
            <p class="word-meaning">{{ w.meaning }}</p>
            <p class="word-example">{{ w.example }}</p>
            <p class="word-example-cn">{{ w.exampleTranslation }}</p>
          </div>
        </div>
      </div>

      <!-- 拼写测试模式 -->
      <div v-else-if="mode === 1" class="spell-section">
        <div class="progress-bar"><span>{{ spellIdx + 1 }} / {{ currentDayData.words.length }}</span></div>
        <div class="card spell-card">
          <p class="spell-phonetic">{{ curSpellWord.phonetic }}</p>
          <p class="spell-meaning">{{ curSpellWord.meaning }}</p>
          <p class="spell-example">{{ curSpellWord.example }}</p>
          <input v-model="spellAns" class="spell-input" placeholder="拼写单词" @keyup.enter="checkSpell" />
          <van-button type="primary" color="#7ED321" block round @click="checkSpell" style="margin-top:12px">确认</van-button>
          <div v-if="spellFb" class="spell-feedback" :class="spellFb">
            <van-icon :name="spellFb === 'correct' ? 'success' : 'cross'" size="24" />
            <span>{{ spellFb === 'correct' ? '正确！' : '答案是: ' + curSpellWord.word }}</span>
          </div>
        </div>
      </div>

      <!-- 中英配对模式 -->
      <div v-else class="match-section">
        <p class="match-hint">点击左右两侧进行配对</p>
        <div class="match-area">
          <div class="match-col">
            <div v-for="w in matchLeft" :key="'l'+w.id" class="match-item" :class="{ selected: selL === w.id, matched: w.matched, wrong: wrongIds.includes(w.id) }" @click="pickLeft(w.id)">{{ w.text }}</div>
          </div>
          <div class="match-col">
            <div v-for="w in matchRight" :key="'r'+w.id" class="match-item" :class="{ selected: selR === w.id, matched: w.matched, wrong: wrongIds.includes(w.id) }" @click="pickRight(w.id)">{{ w.text }}</div>
          </div>
        </div>
        <div class="match-progress">已配对 {{ matchedCount }}/{{ matchLeft.length }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { dailyWordsData } from '@/data/english/dailyWords'

const curDay = ref(1)
const mode = ref(0)
const currentDayData = computed(() => dailyWordsData[curDay.value - 1] || dailyWordsData[0])

function prevDay() { if (curDay.value > 1) curDay.value-- }
function nextDay() { if (curDay.value < dailyWordsData.length) curDay.value++ }

// 单词卡
const flippedIdx = ref(-1)
function toggleFlip(i: number) { flippedIdx.value = flippedIdx.value === i ? -1 : i }

// 拼写测试
const spellIdx = ref(0), spellAns = ref(''), spellFb = ref<'' | 'correct' | 'wrong'>('')
const curSpellWord = computed(() => currentDayData.value.words[spellIdx.value] || {})
function checkSpell() {
  if (!spellAns.value.trim()) return
  if (spellAns.value.trim().toLowerCase() === curSpellWord.value.word.toLowerCase()) { spellFb.value = 'correct' } else { spellFb.value = 'wrong' }
  setTimeout(() => { spellFb.value = ''; spellAns.value = ''; spellIdx.value++; if (spellIdx.value >= currentDayData.value.words.length) spellIdx.value = 0 }, 1500)
}

// 中英配对
const matchLeft = ref<any[]>([]), matchRight = ref<any[]>([])
const selL = ref<number|null>(null), selR = ref<number|null>(null), wrongIds = ref<number[]>([])
const matchedCount = computed(() => matchLeft.value.filter(m => m.matched).length)
function shuffle<T>(a: T[]): T[] { return [...a].sort(() => Math.random() - 0.5) }
function loadMatch() {
  const ws = currentDayData.value.words
  matchLeft.value = ws.map((w, i) => ({ id: i, text: w.word, matched: false }))
  matchRight.value = shuffle(ws.map((w, i) => ({ id: i, text: w.meaning, matched: false })))
  selL.value = null; selR.value = null; wrongIds.value = []
}
function pickLeft(id: number) { if (matchLeft.value.find(m => m.id === id)?.matched) return; selL.value = id; checkMatch() }
function pickRight(id: number) { if (matchRight.value.find(m => m.id === id)?.matched) return; selR.value = id; checkMatch() }
function checkMatch() {
  if (selL.value !== null && selR.value !== null) {
    if (selL.value === selR.value) {
      matchLeft.value.find(m => m.id === selL.value)!.matched = true
      matchRight.value.find(m => m.id === selR.value)!.matched = true
    } else { wrongIds.value = [selL.value, selR.value]; setTimeout(() => wrongIds.value = [], 600) }
    selL.value = null; selR.value = null
  }
}

watch([curDay, mode], () => {
  flippedIdx.value = -1; spellIdx.value = 0; spellAns.value = ''; spellFb.value = ''
  if (mode.value === 2) loadMatch()
}, { immediate: true })
</script>

<style scoped lang="scss">
.daily-words-page { padding-bottom: 20px; }
.content { padding: 8px 16px; }
.day-selector { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.day-info { display: flex; align-items: center; gap: 6px; }
.day-title { font-size: 15px; font-weight: 600; color: $color-text-primary; }
.day-switch { display: flex; align-items: center; gap: 8px; }
.day-num { font-size: 14px; color: $color-text-secondary; min-width: 56px; text-align: center; }
.card-list { margin-top: 12px; }
.word-card { text-align: center; padding: 20px 16px; margin-bottom: 10px; }
.word-card-front { cursor: pointer; }
.word-phonetic { font-size: 14px; color: $color-text-secondary; }
.word-text { font-size: 24px; font-weight: 700; color: #7ED321; margin: 8px 0; }
.word-hint { font-size: 12px; color: $color-text-secondary; margin-top: 4px; }
.word-card-back { margin-top: 12px; padding-top: 12px; border-top: 1px solid $color-border; }
.word-meaning { font-size: 18px; font-weight: 600; color: $color-text-primary; }
.word-example { font-size: 14px; color: $color-text-regular; margin-top: 8px; font-style: italic; }
.word-example-cn { font-size: 13px; color: $color-text-secondary; margin-top: 4px; }
.progress-bar { font-size: 14px; color: $color-text-secondary; margin-bottom: 8px; }
.spell-card { text-align: center; padding: 24px 16px; }
.spell-phonetic { font-size: 16px; color: $color-text-secondary; }
.spell-meaning { font-size: 22px; font-weight: 700; color: $color-text-primary; margin: 8px 0; }
.spell-example { font-size: 14px; color: $color-text-regular; font-style: italic; margin-bottom: 16px; }
.spell-input { width: 80%; height: 44px; border: 2px solid #7ED321; border-radius: 8px; text-align: center; font-size: 20px; outline: none; }
.spell-feedback { margin-top: 12px; display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 15px; }
.spell-feedback.correct { color: #52C41A; }
.spell-feedback.wrong { color: #FF4D4F; }
.match-hint { font-size: 14px; color: $color-text-secondary; text-align: center; margin: 12px 0; }
.match-area { display: flex; gap: 12px; }
.match-col { flex: 1; display: flex; flex-direction: column; gap: 8px; }
.match-item { padding: 14px 10px; border-radius: 10px; background: #fff; font-size: 14px; text-align: center; cursor: pointer; border: 2px solid transparent; transition: all 0.2s; &.selected { border-color: #7ED321; background: #F0FBEB; } &.matched { opacity: 0.25; pointer-events: none; text-decoration: line-through; } &.wrong { border-color: #FF4D4F; background: #FFEBEE; } }
.match-progress { text-align: center; font-size: 13px; color: $color-text-secondary; margin-top: 12px; }
</style>
