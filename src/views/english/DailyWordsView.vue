<template>
  <div class="page-container daily-words-page">
    <!-- 卡通头部 -->
    <div class="hero-header">
      <div class="bubble-dot bubble-dot--1"></div>
      <div class="bubble-dot bubble-dot--2"></div>
      <div class="bubble-dot bubble-dot--3"></div>
      <div class="hero-content">
        <div class="hero-emoji anim-float">📚</div>
        <h2 class="hero-title">每日词汇</h2>
        <div class="hero-stats">
          <div class="stat-pill">
            <span class="stat-emoji">🔥</span>
            <span class="stat-num">{{ learnedCount }}</span>
            <span class="stat-unit">已学</span>
          </div>
          <div class="stat-pill">
            <span class="stat-emoji">⭐</span>
            <span class="stat-num">{{ masteredCount }}</span>
            <span class="stat-unit">已掌握</span>
          </div>
          <div class="stat-pill">
            <span class="stat-emoji">📝</span>
            <span class="stat-num">{{ wrongWords.length }}</span>
            <span class="stat-unit">错词</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 日期选择器 -->
    <div class="card day-selector-card">
      <div class="day-info">
        <span class="day-emoji">{{ currentDayData.emoji }}</span>
        <div>
          <span class="day-title">{{ currentDayData.title }}</span>
          <span class="day-unit">Unit {{ currentDayData.unit }}</span>
        </div>
      </div>
      <div class="day-switch">
        <div
          class="day-arrow-btn"
          :class="{ disabled: curDay <= 1 }"
          @click="prevDay"
        >←</div>
        <span class="day-num">Day {{ curDay }}</span>
        <div
          class="day-arrow-btn"
          :class="{ disabled: curDay >= dailyWordsData.length }"
          @click="nextDay"
        >→</div>
      </div>
    </div>

    <!-- 学习模式切换 -->
    <van-tabs v-model:active="mode" shrink>
      <van-tab title="📖 单词卡">
        <div class="card-list">
          <div
            v-for="(w, i) in currentDayData.words"
            :key="i"
            class="word-card-wrap"
            :class="{ flipped: flippedIdx === i }"
            :style="{ animationDelay: i * 0.08 + 's' }"
          >
            <!-- 正面 -->
            <div class="word-card-face word-card-front" @click="toggleFlip(i)">
              <div class="word-phonetic">{{ w.phonetic }}</div>
              <h3 class="word-text">{{ w.word }}</h3>
              <div class="word-pos">{{ w.pos }}</div>
              <div class="flip-hint">
                <span>👆 翻转看释义</span>
              </div>
              <div v-if="w.plural" class="word-plural-badge">复数: {{ w.plural }}</div>
            </div>
            <!-- 背面 -->
            <div class="word-card-face word-card-back" @click="toggleFlip(i)">
              <div class="back-emoji">💡</div>
              <p class="word-meaning">{{ w.meaning }}</p>
              <div class="word-divider"></div>
              <p class="word-example">{{ w.example }}</p>
              <p class="word-example-cn">{{ w.exampleTranslation }}</p>
            </div>
          </div>
        </div>
      </van-tab>

      <van-tab title="✏️ 拼写测试">
        <div class="spell-section">
          <!-- 进度条 -->
          <div class="spell-progress-bar">
            <div class="spell-progress-fill" :style="{ width: spellProgress + '%' }"></div>
          </div>
          <div class="spell-progress-text">
            <span>{{ spellIdx + 1 }} / {{ currentDayData.words.length }}</span>
            <div class="spell-stars">
              <span
                v-for="n in currentDayData.words.length"
                :key="n"
                class="spell-star"
                :class="{ earned: spellResults[n - 1] === 'correct', wrong: spellResults[n - 1] === 'wrong' }"
              >{{ spellResults[n - 1] === 'correct' ? '⭐' : spellResults[n - 1] === 'wrong' ? '❌' : '☆' }}</span>
            </div>
          </div>

          <!-- 测试卡片 -->
          <div class="card spell-card" v-if="!spellFinished">
            <p class="spell-phonetic">{{ curSpellWord.phonetic }}</p>
            <p class="spell-meaning">{{ curSpellWord.meaning }}</p>
            <p class="spell-pos">{{ curSpellWord.pos }}</p>
            <div class="spell-hint-letters">
              <span
                v-for="(ch, ci) in spellHintArr"
                :key="ci"
                class="hint-letter"
                :class="{ shown: ci < shownHintCount }"
              >{{ ci < shownHintCount ? ch : '_' }}</span>
            </div>
            <p class="spell-example" v-if="spellShowHint">{{ curSpellWord.example }}</p>
            <input
              v-model="spellAns"
              class="spell-input"
              placeholder="在这里拼写单词..."
              @keyup.enter="checkSpell"
              :disabled="spellFb !== ''"
              ref="spellInputRef"
            />
            <div class="spell-actions">
              <van-button size="small" plain round color="#2EC4B6" @click="showHint" :disabled="spellFb !== '' || spellShowHint">
                💡 提示
              </van-button>
              <van-button size="small" plain round color="#FDCB6E" @click="skipSpell" :disabled="spellFb !== ''">
                ⏭ 跳过
              </van-button>
            </div>
            <transition name="fade">
              <div v-if="spellFb" class="spell-feedback" :class="spellFb">
                <span class="fb-emoji">{{ spellFb === 'correct' ? '🎉' : '😅' }}</span>
                <div class="fb-text">
                  <p v-if="spellFb === 'correct'">拼写正确！</p>
                  <p v-else>
                    正确答案：<strong>{{ curSpellWord.word }}</strong>
                  </p>
                </div>
              </div>
            </transition>
          </div>

          <!-- 测试结果 -->
          <div class="card spell-result-card" v-else>
            <div class="result-emoji anim-bounce-in">{{ spellCorrectCount === currentDayData.words.length ? '🏆' : '💪' }}</div>
            <h3 class="result-title">测试完成！</h3>
            <div class="result-stats">
              <div class="result-stat-item">
                <span class="rs-num correct">{{ spellCorrectCount }}</span>
                <span class="rs-label">正确</span>
              </div>
              <div class="result-stat-item">
                <span class="rs-num wrong">{{ currentDayData.words.length - spellCorrectCount }}</span>
                <span class="rs-label">错误</span>
              </div>
              <div class="result-stat-item">
                <span class="rs-num">{{ Math.round(spellCorrectCount / currentDayData.words.length * 100) }}%</span>
                <span class="rs-label">正确率</span>
              </div>
            </div>
            <van-button type="primary" round block color="#2EC4B6" @click="restartSpell" style="margin-top: 16px;">
              🔄 再测一次
            </van-button>
          </div>
        </div>
      </van-tab>

      <van-tab title="🔗 中英配对">
        <div class="match-section">
          <p class="match-hint">👆 点击左右两侧的卡片进行配对</p>
          <div class="match-area">
            <div class="match-col match-col-left">
              <div
                v-for="w in matchLeft"
                :key="'l'+w.id"
                class="match-item"
                :class="{ selected: selL === w.id, matched: w.matched, wrong: wrongIds.includes('l'+w.id) }"
                @click="pickLeft(w.id)"
              >{{ w.text }}</div>
            </div>
            <div class="match-col match-col-right">
              <div
                v-for="w in matchRight"
                :key="'r'+w.id"
                class="match-item"
                :class="{ selected: selR === w.id, matched: w.matched, wrong: wrongIds.includes('r'+w.id) }"
                @click="pickRight(w.id)"
              >{{ w.text }}</div>
            </div>
          </div>
          <div class="match-progress">
            <span class="mp-text">已配对 {{ matchedCount }}/{{ matchLeft.length }}</span>
            <div class="mp-bar">
              <div class="mp-fill" :style="{ width: matchedCount / matchLeft.length * 100 + '%' }"></div>
            </div>
          </div>
          <transition name="fade">
            <div v-if="matchFinished" class="match-complete anim-bounce-in">
              <span class="mc-emoji">🎉</span>
              <p>全部配对完成！</p>
              <van-button size="small" round plain color="#2EC4B6" @click="loadMatch">🔄 再来一局</van-button>
            </div>
          </transition>
        </div>
      </van-tab>
    </van-tabs>

    <!-- 错词回顾 -->
    <div v-if="wrongWords.length > 0" class="card wrong-words-card">
      <div class="card-header">
        <div class="card-icon-wrap" style="background: #FFE5E5">
          <span>📝</span>
        </div>
        <span class="card-title">错词本 ({{ wrongWords.length }})</span>
      </div>
      <div class="wrong-words-list">
        <div v-for="w in wrongWordsDisplay" :key="w.word" class="wrong-word-item">
          <span class="ww-word">{{ w.word }}</span>
          <span class="ww-meaning">{{ w.meaning }}</span>
        </div>
      </div>
      <van-button size="small" plain round block color="#FF7675" @click="clearWrongWords" style="margin-top: 8px;">
        🗑️ 清空错词本
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { showToast } from 'vant'
import { dailyWordsData, type DailyWord } from '@/data/english/dailyWords'

// ==================== 学习进度（localStorage） ====================
const STORAGE_KEY = 'vocab_progress'

interface VocabProgress {
  learned: string[]        // 已学单词
  mastered: string[]       // 已掌握
  wrong: DailyWord[]       // 错词本
}

function loadProgress(): VocabProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { learned: [], mastered: [], wrong: [] }
}

function saveProgress(p: VocabProgress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
  } catch {}
}

const progress = ref<VocabProgress>(loadProgress())

const learnedCount = computed(() => progress.value.learned.length)
const masteredCount = computed(() => progress.value.mastered.length)
const wrongWords = computed(() => progress.value.wrong)
const wrongWordsDisplay = computed(() => progress.value.wrong.slice(-8))

function addLearned(word: string) {
  if (!progress.value.learned.includes(word)) {
    progress.value.learned.push(word)
    saveProgress(progress.value)
  }
}

function addWrongWord(w: DailyWord) {
  const exists = progress.value.wrong.some(x => x.word === w.word)
  if (!exists) {
    progress.value.wrong.push(w)
    saveProgress(progress.value)
  }
}

function removeWrongWord(word: string) {
  progress.value.wrong = progress.value.wrong.filter(w => w.word !== word)
  saveProgress(progress.value)
}

function clearWrongWords() {
  progress.value.wrong = []
  saveProgress(progress.value)
  showToast('错词本已清空')
}

// ==================== 日期选择 ====================
const curDay = ref(1)
const mode = ref(0)
const currentDayData = computed(() => dailyWordsData[curDay.value - 1] || dailyWordsData[0])

function prevDay() { if (curDay.value > 1) curDay.value-- }
function nextDay() { if (curDay.value < dailyWordsData.length) curDay.value++ }

// ==================== 单词卡模式 ====================
const flippedIdx = ref(-1)
function toggleFlip(i: number) {
  flippedIdx.value = flippedIdx.value === i ? -1 : i
  // 翻看过的词标记为已学
  const w = currentDayData.value.words[i]
  addLearned(w.word)
  // 如果翻到背面且该词不在错词本，标记为掌握
  if (flippedIdx.value === i && !progress.value.wrong.some(x => x.word === w.word)) {
    if (!progress.value.mastered.includes(w.word)) {
      progress.value.mastered.push(w.word)
      saveProgress(progress.value)
    }
  }
}

// ==================== 拼写测试模式 ====================
const spellIdx = ref(0)
const spellAns = ref('')
const spellFb = ref<'' | 'correct' | 'wrong'>('')
const spellResults = ref<('' | 'correct' | 'wrong')[]>([])
const spellShowHint = ref(false)
const shownHintCount = ref(0)
const spellFinished = ref(false)
const spellCorrectCount = ref(0)
const spellInputRef = ref<HTMLInputElement | null>(null)

const curSpellWord = computed(() => currentDayData.value.words[spellIdx.value] || {} as DailyWord)

const spellProgress = computed(() => {
  return (spellIdx.value / currentDayData.value.words.length) * 100
})

const spellHintArr = computed(() => {
  const w = curSpellWord.value.word || ''
  return w.split('')
})

function showHint() {
  spellShowHint.value = true
  if (shownHintCount.value === 0) {
    shownHintCount.value = 1
  } else if (shownHintCount.value < spellHintArr.value.length - 1) {
    shownHintCount.value++
  }
}

function checkSpell() {
  if (!spellAns.value.trim() || spellFb.value !== '') return
  const userAns = spellAns.value.trim().toLowerCase()
  const correctAns = curSpellWord.value.word.toLowerCase()

  if (userAns === correctAns) {
    spellFb.value = 'correct'
    spellResults.value[spellIdx.value] = 'correct'
    spellCorrectCount.value++
    // 从错词本移除
    removeWrongWord(curSpellWord.value.word)
  } else {
    spellFb.value = 'wrong'
    spellResults.value[spellIdx.value] = 'wrong'
    // 加入错词本
    addWrongWord(curSpellWord.value)
  }

  setTimeout(() => {
    spellFb.value = ''
    spellAns.value = ''
    spellShowHint.value = false
    shownHintCount.value = 0
    spellIdx.value++

    if (spellIdx.value >= currentDayData.value.words.length) {
      spellFinished.value = true
    } else {
      nextTick(() => spellInputRef.value?.focus())
    }
  }, 1800)
}

function skipSpell() {
  spellResults.value[spellIdx.value] = 'wrong'
  addWrongWord(curSpellWord.value)
  spellIdx.value++
  if (spellIdx.value >= currentDayData.value.words.length) {
    spellFinished.value = true
  }
}

function restartSpell() {
  spellIdx.value = 0
  spellAns.value = ''
  spellFb.value = ''
  spellResults.value = []
  spellShowHint.value = false
  shownHintCount.value = 0
  spellFinished.value = false
  spellCorrectCount.value = 0
  nextTick(() => spellInputRef.value?.focus())
}

// ==================== 中英配对模式 ====================
interface MatchItem { id: number; text: string; matched: boolean }
const matchLeft = ref<MatchItem[]>([])
const matchRight = ref<MatchItem[]>([])
const selL = ref<number | null>(null)
const selR = ref<number | null>(null)
const wrongIds = ref<string[]>([])
const matchFinished = ref(false)

const matchedCount = computed(() => matchLeft.value.filter(m => m.matched).length)

function shuffle<T>(a: T[]): T[] {
  return [...a].sort(() => Math.random() - 0.5)
}

function loadMatch() {
  const ws = currentDayData.value.words
  matchLeft.value = ws.map((w, i) => ({ id: i, text: w.word, matched: false }))
  matchRight.value = shuffle(ws.map((w, i) => ({ id: i, text: w.meaning, matched: false })))
  selL.value = null
  selR.value = null
  wrongIds.value = []
  matchFinished.value = false
}

function pickLeft(id: number) {
  if (matchLeft.value.find(m => m.id === id)?.matched) return
  selL.value = id
  checkMatch()
}

function pickRight(id: number) {
  if (matchRight.value.find(m => m.id === id)?.matched) return
  selR.value = id
  checkMatch()
}

function checkMatch() {
  if (selL.value !== null && selR.value !== null) {
    if (selL.value === selR.value) {
      matchLeft.value.find(m => m.id === selL.value)!.matched = true
      matchRight.value.find(m => m.id === selR.value)!.matched = true
      // 标记已学
      addLearned(currentDayData.value.words[selL.value].word)
      // 检查是否全部完成
      if (matchedCount.value === matchLeft.value.length) {
        matchFinished.value = true
      }
    } else {
      wrongIds.value = ['l' + selL.value, 'r' + selR.value]
      setTimeout(() => wrongIds.value = [], 600)
    }
    selL.value = null
    selR.value = null
  }
}

// ==================== 状态重置 ====================
watch([curDay, mode], () => {
  flippedIdx.value = -1
  spellIdx.value = 0
  spellAns.value = ''
  spellFb.value = ''
  spellResults.value = []
  spellShowHint.value = false
  shownHintCount.value = 0
  spellFinished.value = false
  spellCorrectCount.value = 0
  matchFinished.value = false
  if (mode.value === 2) loadMatch()
  if (mode.value === 1) {
    nextTick(() => spellInputRef.value?.focus())
  }
}, { immediate: true })

onMounted(() => {
  nextTick(() => {
    if (mode.value === 1) spellInputRef.value?.focus()
  })
})
</script>

<style scoped lang="scss">
.daily-words-page { padding-bottom: $spacing-xl; }

// ============================================
// 卡通头部
// ============================================
.hero-header {
  position: relative;
  overflow: hidden;
  padding: calc(52px + #{$safe-top}) $spacing-base $spacing-lg;
  border-radius: 0 0 $radius-xl $radius-xl;
  background: $gradient-english;
}

.hero-content { position: relative; z-index: 1; text-align: center; color: #fff; }

.hero-emoji { font-size: 40px; margin-bottom: 4px; }
.hero-title {
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: $spacing-md;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: $spacing-sm;
  flex-wrap: wrap;
}

.stat-pill {
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(8px);
  padding: 6px 14px;
  border-radius: $radius-pill;
  border: 2px solid rgba(255, 255, 255, 0.3);

  .stat-emoji { font-size: 14px; }
  .stat-num { font-size: $font-size-md; font-weight: $font-weight-bold; }
  .stat-unit { font-size: $font-size-xs; opacity: 0.9; }
}

// ============================================
// 日期选择器
// ============================================
.day-selector-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.day-info { display: flex; align-items: center; gap: $spacing-sm; }

.day-emoji { font-size: 24px; }

.day-title {
  display: block;
  font-size: $font-size-md;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
}

.day-unit {
  display: block;
  font-size: $font-size-xs;
  color: $color-text-secondary;
}

.day-switch { display: flex; align-items: center; gap: $spacing-sm; }

.day-arrow-btn {
  width: 32px;
  height: 32px;
  border-radius: $radius-sm;
  background: $color-english-bg;
  color: $color-english;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: $font-weight-bold;
  cursor: pointer;
  transition: all $duration-base $easing-bounce;

  &:active { transform: scale(0.85); }
  &.disabled { opacity: 0.3; pointer-events: none; }
}

.day-num {
  font-size: $font-size-sm;
  color: $color-english;
  font-weight: $font-weight-bold;
  min-width: 56px;
  text-align: center;
}

// ============================================
// 单词卡模式
// ============================================
.card-list { padding: $spacing-md 0; }

.word-card-wrap {
  perspective: 800px;
  height: 180px;
  margin-bottom: $spacing-md;
  animation: bounceIn 0.5s $easing-bounce backwards;
  cursor: pointer;
}

.word-card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: $radius-lg;
  padding: $spacing-lg $spacing-base;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.5s $easing-smooth;
  box-shadow: $shadow-card;
}

.word-card-front {
  background: linear-gradient(135deg, #FFFFFF 0%, #F8FFFE 100%);
  border: 2px solid $color-english-light;
}

.word-card-back {
  background: $gradient-english;
  color: #fff;
  transform: rotateY(180deg);
}

.word-card-wrap.flipped {
  .word-card-front { transform: rotateY(180deg); }
  .word-card-back { transform: rotateY(0deg); }
}

.word-phonetic {
  font-size: $font-size-sm;
  color: $color-english;
  margin-bottom: 4px;
}

.word-text {
  font-size: $font-size-xxl;
  font-weight: $font-weight-bold;
  color: $color-english;
  margin: 4px 0;
  text-align: center;
}

.word-pos {
  font-size: $font-size-xs;
  color: $color-text-secondary;
  background: $color-english-bg;
  padding: 2px 10px;
  border-radius: $radius-pill;
  font-weight: $font-weight-semibold;
}

.word-plural-badge {
  position: absolute;
  top: $spacing-sm;
  right: $spacing-sm;
  font-size: 10px;
  color: $color-text-secondary;
  background: $color-bg-alt;
  padding: 2px 8px;
  border-radius: $radius-pill;
}

.flip-hint {
  margin-top: auto;
  padding-top: $spacing-sm;

  span {
    font-size: $font-size-xs;
    color: $color-text-placeholder;
  }
}

// 背面样式
.back-emoji { font-size: 28px; margin-bottom: 4px; }

.word-meaning {
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.word-divider {
  width: 40px;
  height: 2px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: $radius-pill;
  margin: $spacing-sm 0;
}

.word-example {
  font-size: $font-size-sm;
  font-style: italic;
  opacity: 0.95;
}

.word-example-cn {
  font-size: $font-size-xs;
  opacity: 0.85;
  margin-top: 4px;
}

// ============================================
// 拼写测试模式
// ============================================
.spell-section { padding: $spacing-md 0; }

.spell-progress-bar {
  height: 8px;
  background: $color-bg-alt;
  border-radius: $radius-pill;
  overflow: hidden;
  margin-bottom: $spacing-sm;
}

.spell-progress-fill {
  height: 100%;
  background: $gradient-english;
  border-radius: $radius-pill;
  transition: width 0.3s $easing-smooth;
}

.spell-progress-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-md;
  font-size: $font-size-xs;
  color: $color-text-secondary;
}

.spell-stars { display: flex; gap: 2px; }

.spell-star { font-size: 12px; }

.spell-card {
  text-align: center;
  padding: $spacing-xl $spacing-base;
}

.spell-phonetic {
  font-size: $font-size-md;
  color: $color-english;
  margin-bottom: 4px;
}

.spell-meaning {
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
  margin-bottom: 4px;
}

.spell-pos {
  font-size: $font-size-xs;
  color: $color-text-secondary;
  background: $color-english-bg;
  padding: 2px 10px;
  border-radius: $radius-pill;
  display: inline-block;
  margin-bottom: $spacing-md;
}

.spell-hint-letters {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-bottom: $spacing-md;
  flex-wrap: wrap;
}

.hint-letter {
  display: inline-block;
  width: 28px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  font-size: $font-size-md;
  font-weight: $font-weight-bold;
  color: $color-english;
  background: $color-english-bg;
  border-radius: $radius-xs;
  border-bottom: 3px solid $color-english;
  transition: all $duration-base;

  &.shown {
    color: $color-english;
  }

  &:not(.shown) {
    color: $color-text-placeholder;
  }
}

.spell-example {
  font-size: $font-size-sm;
  color: $color-text-regular;
  font-style: italic;
  margin-bottom: $spacing-md;
  padding: $spacing-sm $spacing-base;
  background: $color-bg-alt;
  border-radius: $radius-sm;
}

.spell-input {
  width: 100%;
  height: 52px;
  border: 3px solid $color-english-light;
  border-radius: $radius-md;
  text-align: center;
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  outline: none;
  color: $color-text-primary;
  transition: all $duration-base;

  &:focus {
    border-color: $color-english;
    box-shadow: 0 0 0 4px rgba(46, 196, 182, 0.1);
  }

  &::placeholder {
    color: $color-text-placeholder;
    font-weight: $font-weight-regular;
  }
}

.spell-actions {
  display: flex;
  justify-content: center;
  gap: $spacing-sm;
  margin-top: $spacing-md;
}

.spell-feedback {
  margin-top: $spacing-md;
  padding: $spacing-md;
  border-radius: $radius-md;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;

  .fb-emoji { font-size: 28px; }
  .fb-text p { font-size: $font-size-base; }

  &.correct {
    background: $color-success-bg;
    .fb-text { color: $color-success; }
  }

  &.wrong {
    background: $color-error-bg;
    .fb-text { color: $color-error; }
    strong { font-size: $font-size-md; }
  }
}

// ============================================
// 拼写测试结果
// ============================================
.spell-result-card {
  text-align: center;
  padding: $spacing-xl $spacing-base;
}

.result-emoji { font-size: 48px; margin-bottom: $spacing-sm; }
.result-title {
  font-size: $font-size-lg;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
  margin-bottom: $spacing-lg;
}

.result-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: $spacing-md;
}

.result-stat-item { display: flex; flex-direction: column; align-items: center; }

.rs-num {
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;

  &.correct { color: $color-success; }
  &.wrong { color: $color-error; }
}

.rs-label {
  font-size: $font-size-xs;
  color: $color-text-secondary;
  margin-top: 2px;
}

// ============================================
// 中英配对模式
// ============================================
.match-section { padding: $spacing-md 0; }

.match-hint {
  font-size: $font-size-sm;
  color: $color-text-secondary;
  text-align: center;
  margin-bottom: $spacing-md;
}

.match-area {
  display: flex;
  gap: $spacing-sm;
}

.match-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.match-item {
  padding: $spacing-md $spacing-sm;
  border-radius: $radius-md;
  background: #fff;
  font-size: $font-size-sm;
  text-align: center;
  cursor: pointer;
  border: 3px solid transparent;
  transition: all $duration-base $easing-bounce;
  box-shadow: $shadow-xs;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active { transform: scale(0.95); }

  &.selected {
    border-color: $color-english;
    background: $color-english-bg;
    transform: scale(1.02);
  }

  &.matched {
    opacity: 0.25;
    pointer-events: none;
    text-decoration: line-through;
    background: $color-success-bg;
  }

  &.wrong {
    border-color: $color-error;
    background: $color-error-bg;
    animation: wiggle 0.4s ease;
  }
}

.match-progress {
  margin-top: $spacing-lg;
  text-align: center;
}

.mp-text {
  font-size: $font-size-xs;
  color: $color-text-secondary;
  display: block;
  margin-bottom: $spacing-xs;
}

.mp-bar {
  height: 6px;
  background: $color-bg-alt;
  border-radius: $radius-pill;
  overflow: hidden;
}

.mp-fill {
  height: 100%;
  background: $gradient-english;
  border-radius: $radius-pill;
  transition: width 0.3s $easing-smooth;
}

.match-complete {
  text-align: center;
  padding: $spacing-lg;
  background: $color-success-bg;
  border-radius: $radius-lg;
  margin-top: $spacing-md;

  .mc-emoji { font-size: 36px; display: block; margin-bottom: 4px; }
  p { font-size: $font-size-md; font-weight: $font-weight-bold; color: $color-success; margin-bottom: $spacing-md; }
}

// ============================================
// 错词本
// ============================================
.wrong-words-card { margin-top: $spacing-md; }

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
}

.wrong-words-list {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-xs;
}

.wrong-word-item {
  display: flex;
  align-items: center;
  gap: 6px;
  background: $color-error-bg;
  padding: 6px 12px;
  border-radius: $radius-pill;
}

.ww-word {
  font-size: $font-size-sm;
  font-weight: $font-weight-bold;
  color: $color-error;
}

.ww-meaning {
  font-size: $font-size-xs;
  color: $color-text-secondary;
}

// ============================================
// Fade 过渡
// ============================================
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
