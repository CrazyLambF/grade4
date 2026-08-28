<template>
  <div class="page-container recitation-page">
    <van-nav-bar title="语文背诵" left-arrow @click-left="$router.back()" />
    <div class="content">
      <div class="rec-banner">
        <div class="rec-banner-bg"></div>
        <div class="rec-banner-content">
          <div class="rec-banner-left">
            <van-icon name="medal-o" size="32" color="#fff" />
            <div>
              <p class="rec-banner-title">背诵闯关</p>
              <p class="rec-banner-sub">已获 {{ totalStars }} 颗星 / 共 {{ maxStars }} 颗</p>
            </div>
          </div>
          <div class="rec-banner-stars">
            <van-icon v-for="i in 3" :key="i" name="star" size="16" :color="i <= Math.ceil(totalStars / Math.max(maxStars,1) * 3) ? '#FFD700' : 'rgba(255,255,255,0.3)'" />
          </div>
        </div>
      </div>

      <van-tabs v-model:active="activeTab" sticky :offset-top="46">
        <van-tab title="诗歌卡片">
          <div class="rec-list">
            <div v-for="item in poetryList" :key="item.id" class="poem-card" :class="{ flipped: flippedId === item.id }" @click="flipCard(item.id)">
              <div class="poem-front" :style="{ background: getCardGradient(item.id) }">
                <div class="poem-card-top">
                  <span class="poem-dynasty">{{ item.dynasty }}</span>
                  <span class="poem-diff">{{ '★'.repeat(item.difficulty) }}</span>
                </div>
                <h3 class="poem-card-title">《{{ item.title }}》</h3>
                <p class="poem-card-author">{{ item.author }}</p>
                <div class="poem-card-stars">
                  <van-icon v-for="i in 3" :key="i" name="star" size="18" :color="i <= getStars(item.id) ? '#FFD700' : 'rgba(0,0,0,0.15)'" />
                </div>
                <p class="poem-card-hint">点击翻转查看全文</p>
              </div>
              <div class="poem-back">
                <h3 class="poem-back-title">《{{ item.title }}》</h3>
                <p class="poem-back-text">{{ item.content }}</p>
                <div class="poem-back-translation" v-if="item.translation"><van-icon name="description" size="13" color="#969799" /><span>{{ item.translation }}</span></div>
                <div class="poem-back-bg" v-if="item.background"><van-icon name="notes-o" size="13" color="#F5A623" /><span>{{ item.background }}</span></div>
                <van-button size="small" type="primary" color="#F5A623" round @click.stop="startChallenge(item)">去闯关</van-button>
              </div>
            </div>
          </div>
        </van-tab>

        <van-tab title="背诵闯关">
          <div v-if="!challengeItem" class="challenge-pick">
            <p class="challenge-pick-title">选择一首诗开始闯关</p>
            <div class="challenge-pick-grid">
              <div v-for="item in poetryList" :key="item.id" class="challenge-pick-card" :style="{ borderColor: getStars(item.id) > 0 ? '#FFD700' : '#EBEDF0' }" @click="startChallenge(item)">
                <div class="cp-stars">
                  <van-icon v-for="i in 3" :key="i" name="star" size="14" :color="i <= getStars(item.id) ? '#FFD700' : '#E0E0E0'" />
                </div>
                <h4 class="cp-title">{{ item.title }}</h4>
                <p class="cp-author">{{ item.dynasty }}·{{ item.author }}</p>
                <span class="cp-diff">{{ '★'.repeat(item.difficulty) }}</span>
              </div>
            </div>
          </div>
          <div v-else class="challenge-area">
            <div class="challenge-header">
              <van-button size="mini" plain icon="arrow-left" @click="exitChallenge">返回</van-button>
              <h3>《{{ challengeItem.title }}》</h3>
              <span class="challenge-total-stars">{{ getStars(challengeItem.id) }}/3 ★</span>
            </div>
            <div class="challenge-progress">
              <div v-for="lv in 3" :key="lv" class="cp-step" :class="{ active: challengeLevel === lv, done: getStars(challengeItem.id) >= lv }">
                <span class="cp-step-num">{{ lv }}</span>
                <span class="cp-step-name">{{ levelNames[lv - 1] }}</span>
              </div>
            </div>

            <div v-if="challengeLevel === 1" class="level-area">
              <p class="level-desc">大声朗读，记住每一句！</p>
              <div class="level-poem">
                <p class="level-line" v-for="(line, i) in challengeLines" :key="i" :style="{ opacity: showMemo && hiddenLines.includes(i) ? 0.12 : 1, transition: 'opacity 0.5s' }">{{ line }}</p>
              </div>
              <div class="level-actions">
                <van-button v-if="!showMemo" type="primary" color="#F5A623" round @click="startMemo">我记好了</van-button>
                <template v-else>
                  <van-button plain round @click="showMemo = false">再看一次</van-button>
                  <van-button type="primary" color="#F5A623" round @click="passLevel(1)">通过 →</van-button>
                </template>
              </div>
            </div>

            <div v-if="challengeLevel === 2" class="level-area">
              <p class="level-desc">补全诗句中空缺的字！</p>
              <div class="fill-area">
                <div v-for="(q, i) in fillQuestions" :key="i" class="fill-line">
                  <template v-for="(seg, j) in q.segments" :key="j">
                    <input v-if="seg.type === 'blank'" v-model="q.userAns" class="fill-input" :class="{ ok: q.checked && q.correct, no: q.checked && !q.correct }" placeholder="?" :maxlength="seg.text.length" @keyup.enter="checkAllFill" />
                    <span v-else>{{ seg.text }}</span>
                  </template>
                  <van-icon v-if="q.checked" :name="q.correct ? 'success' : 'cross'" size="16" :color="q.correct ? '#52C41A' : '#FF4D4F'" />
                </div>
              </div>
              <div class="fill-feedback" v-if="fillChecked">
                <p :class="fillAllCorrect ? 'all-ok' : 'has-no'">{{ fillAllCorrect ? '太棒了！全部正确！' : '答对 ' + fillCorrectCount + '/' + fillQuestions.length + '，再试试' }}</p>
                <van-button v-if="fillAllCorrect" type="primary" color="#F5A623" round @click="passLevel(2)">通过 →</van-button>
                <van-button v-else plain round @click="resetFill">重新填</van-button>
              </div>
              <van-button v-else type="primary" color="#F5A623" round block @click="checkAllFill">提交检查</van-button>
            </div>

            <div v-if="challengeLevel === 3" class="level-area">
              <p class="level-desc">凭记忆默写出整首诗！</p>
              <div class="dictate-area">
                <div v-for="(line, i) in challengeLines" :key="i" class="dictate-line">
                  <input v-model="dictateAns[i]" class="dictate-input" :class="{ ok: dictateChecked && dictateAns[i] && dictateAns[i].trim() === line, no: dictateChecked && (!dictateAns[i] || dictateAns[i].trim() !== line) }" :placeholder="'第' + (i + 1) + '句'" />
                </div>
              </div>
              <div class="fill-feedback" v-if="dictateChecked">
                <p :class="dictateAllCorrect ? 'all-ok' : 'has-no'">{{ dictateAllCorrect ? '完美！你是背诵达人！' : '答对 ' + dictateCorrectCount + '/' + challengeLines.length + '，继续加油' }}</p>
                <van-button v-if="dictateAllCorrect" type="primary" color="#F5A623" round @click="passLevel(3)">完成闯关 ★</van-button>
                <van-button v-else plain round @click="resetDictate">重新默写</van-button>
              </div>
              <van-button v-else type="primary" color="#F5A623" round block @click="checkDictate">提交默写</van-button>
            </div>
          </div>
        </van-tab>

        <van-tab title="诗句排序">
          <div v-if="!orderItem" class="order-pick">
            <p class="challenge-pick-title">选一首诗来排序诗句吧！</p>
            <div class="challenge-pick-grid">
              <div v-for="item in poetryList" :key="item.id" class="challenge-pick-card" @click="startOrder(item)">
                <h4 class="cp-title">{{ item.title }}</h4>
                <p class="cp-author">{{ item.dynasty }}·{{ item.author }}</p>
              </div>
            </div>
          </div>
          <div v-else class="order-area">
            <div class="challenge-header">
              <van-button size="mini" plain icon="arrow-left" @click="orderItem = null">返回</van-button>
              <h3>《{{ orderItem.title }}》</h3>
              <span></span>
            </div>
            <p class="order-desc">把打乱的诗句排成正确的顺序</p>
            <div class="order-answers">
              <div v-for="(w, i) in orderPlaced" :key="'p' + i" class="order-slot" @click="unplaceOrder(i)">
                <span v-if="w" class="order-placed-chip">{{ w }}</span>
              </div>
            </div>
            <div class="order-bank">
              <span v-for="(w, i) in orderBank" :key="'b' + i" class="order-bank-chip" :class="{ used: orderUsed.includes(i) }" @click="placeOrder(i)">{{ w }}</span>
            </div>
            <div class="order-feedback" v-if="orderChecked">
              <p :class="orderCorrect ? 'all-ok' : 'has-no'">{{ orderCorrect ? '排序正确！' : '再想想顺序吧' }}</p>
            </div>
            <van-button v-if="!orderChecked" type="primary" color="#F5A623" round block :disabled="orderPlaced.filter(p => p).length < orderBank.length" @click="checkOrder">确认排序</van-button>
            <van-button v-else plain round block @click="resetOrder">再来一次</van-button>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <van-overlay :show="showSuccess" @click="showSuccess = false">
      <div class="success-modal" @click.stop>
        <div class="success-stars">
          <van-icon v-for="i in 3" :key="i" name="star" size="40" :color="i <= successStars ? '#FFD700' : '#E0E0E0'" />
        </div>
        <h3 class="success-title">{{ successStars === 3 ? '完美通关！' : '闯关成功！' }}</h3>
        <p class="success-desc">获得 {{ successStars }} 颗星</p>
        <p class="success-poem">《{{ challengeItem?.title }}》</p>
        <van-button type="primary" color="#F5A623" round block @click="showSuccess = false">继续</van-button>
      </div>
    </van-overlay>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { chineseRecitations, type RecitationItem } from '@/data/chinese/recitations'

const activeTab = ref(0)
const poetryList = computed(() => chineseRecitations.filter(r => r.type === 'poetry'))

// ===== 星星进度（localStorage）=====
const STORAGE_KEY = 'recite_stars'
function loadStars(): Record<string, number> {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } catch { return {} }
}
function saveStars(data: Record<string, number>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
const starData = ref<Record<string, number>>(loadStars())
function getStars(id: string) { return starData.value[id] || 0 }
function setStars(id: string, stars: number) {
  if (stars > (starData.value[id] || 0)) {
    starData.value[id] = stars
    saveStars(starData.value)
  }
}
const totalStars = computed(() => Object.values(starData.value).reduce((s, v) => s + v, 0))
const maxStars = computed(() => poetryList.value.length * 3)

// ===== 卡片翻转 =====
const flippedId = ref<string | null>(null)
function flipCard(id: string) { flippedId.value = flippedId.value === id ? null : id }

const gradients: Record<string, string> = {
  'rec-mjy': 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
  'rec-tslb': 'linear-gradient(135deg, #4E8AF2, #6BA6FF)',
  'rec-xm': 'linear-gradient(135deg, #56C596, #A8E6CF)',
  'rec-cs': 'linear-gradient(135deg, #BD10E0, #9B30FF)',
  'rec-lzc': 'linear-gradient(135deg, #F5A623, #FFC93C)',
  'rec-xrjj': 'linear-gradient(135deg, #7ED321, #B8E986)',
  'rec-lc': 'linear-gradient(135deg, #50C9C3, #96DED1)',
  'rec-ce': 'linear-gradient(135deg, #6C5CE7, #A29BFE)',
}
function getCardGradient(id: string) { return gradients[id] || 'linear-gradient(135deg, #F5A623, #FFC93C)' }

// ===== 背诵闯关 =====
const levelNames = ['看文背诵', '填空背诵', '全默写']
const challengeItem = ref<RecitationItem | null>(null)
const challengeLevel = ref(0)
const challengeLines = computed(() => challengeItem.value?.content.split('\n') || [])
const showMemo = ref(false)
const hiddenLines = ref<number[]>([])
const showSuccess = ref(false)
const successStars = ref(0)

function startChallenge(item: RecitationItem) {
  challengeItem.value = item
  const existing = getStars(item.id)
  challengeLevel.value = existing >= 1 ? (existing >= 2 ? 3 : 2) : 1
  activeTab.value = 1
  initLevel()
}
function exitChallenge() { challengeItem.value = null; challengeLevel.value = 0 }

function initLevel() {
  showMemo.value = false; hiddenLines.value = []
  fillQuestions.value = []; fillChecked.value = false
  dictateAns.value = []; dictateChecked.value = false
  if (challengeLevel.value === 2) genFillQuestions()
  else if (challengeLevel.value === 3) dictateAns.value = challengeLines.value.map(() => '')
}

function startMemo() {
  const lines = challengeLines.value
  const hideCount = Math.max(1, Math.floor(lines.length / 2))
  hiddenLines.value = lines.map((_, i) => i).sort(() => Math.random() - 0.5).slice(0, hideCount)
  showMemo.value = true
}

function passLevel(level: number) {
  const item = challengeItem.value
  if (!item) return
  setStars(item.id, level)
  successStars.value = level
  showSuccess.value = true
}

// ===== Level 2: 填空 =====
interface FillQ { segments: { type: 'text' | 'blank'; text: string }[]; userAns: string; answer: string; checked: boolean; correct: boolean }
const fillQuestions = ref<FillQ[]>([])
const fillChecked = ref(false)
const fillCorrectCount = computed(() => fillQuestions.value.filter(q => q.correct).length)
const fillAllCorrect = computed(() => fillQuestions.value.length > 0 && fillCorrectCount.value === fillQuestions.value.length)

function genFillQuestions() {
  const lines = challengeLines.value
  fillQuestions.value = lines.map(line => {
    // 找标点分隔的部分
    const parts = line.split(/([，。！？])/).filter(p => p.length > 0)
    // 找一个长度>=2的语义段来挖空
    const candidates: { idx: number; text: string }[] = []
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].length >= 2 && !/[，。！？]/.test(parts[i])) candidates.push({ idx: i, text: parts[i] })
    }
    if (candidates.length === 0) {
      return { segments: [{ type: 'text', text: line }], userAns: '', answer: '', checked: false, correct: false }
    }
    const target = candidates[Math.floor(Math.random() * candidates.length)]
    const segments: { type: 'text' | 'blank'; text: string }[] = []
    for (let i = 0; i < parts.length; i++) {
      if (i === target.idx) segments.push({ type: 'blank', text: target.text })
      else segments.push({ type: 'text', text: parts[i] })
    }
    return { segments, userAns: '', answer: target.text, checked: false, correct: false }
  })
}

function checkAllFill() {
  fillQuestions.value.forEach(q => {
    q.correct = q.userAns.trim() === q.answer
    q.checked = true
  })
  fillChecked.value = true
}
function resetFill() {
  fillQuestions.value.forEach(q => { q.userAns = ''; q.checked = false; q.correct = false })
  fillChecked.value = false
}

// ===== Level 3: 全默写 =====
const dictateAns = ref<string[]>([])
const dictateChecked = ref(false)
const dictateCorrectCount = computed(() => {
  let c = 0
  challengeLines.value.forEach((line, i) => {
    if (dictateAns.value[i] && dictateAns.value[i].trim() === line) c++
  })
  return c
})
const dictateAllCorrect = computed(() => challengeLines.value.length > 0 && dictateCorrectCount.value === challengeLines.value.length)

function checkDictate() { dictateChecked.value = true }
function resetDictate() {
  dictateAns.value = challengeLines.value.map(() => '')
  dictateChecked.value = false
}

// ===== Tab 3: 诗句排序 =====
const orderItem = ref<RecitationItem | null>(null)
const orderBank = ref<string[]>([])
const orderPlaced = ref<string[]>([])
const orderUsed = ref<number[]>([])
const orderChecked = ref(false)
const orderCorrect = computed(() => {
  if (!orderItem.value) return false
  const correctLines = orderItem.value.content.split('\n')
  return orderPlaced.value.every((p, i) => p === correctLines[i])
})

function startOrder(item: RecitationItem) {
  orderItem.value = item
  orderBank.value = [...item.content.split('\n')].sort(() => Math.random() - 0.5)
  orderPlaced.value = item.content.split('\n').map(() => '')
  orderUsed.value = []
  orderChecked.value = false
}
function placeOrder(bankIdx: number) {
  if (orderUsed.value.includes(bankIdx)) return
  const emptyIdx = orderPlaced.value.findIndex(p => !p)
  if (emptyIdx >= 0) {
    orderPlaced.value[emptyIdx] = orderBank.value[bankIdx]
    orderUsed.value.push(bankIdx)
  }
}
function unplaceOrder(slotIdx: number) {
  const word = orderPlaced.value[slotIdx]
  if (!word) return
  const bankIdx = orderBank.value.indexOf(word)
  orderPlaced.value[slotIdx] = ''
  orderUsed.value = orderUsed.value.filter(i => i !== bankIdx)
}
function checkOrder() { orderChecked.value = true }
function resetOrder() {
  if (!orderItem.value) return
  orderBank.value = [...orderItem.value.content.split('\n')].sort(() => Math.random() - 0.5)
  orderPlaced.value = orderItem.value.content.split('\n').map(() => '')
  orderUsed.value = []
  orderChecked.value = false
}
</script>

<style scoped lang="scss">
.recitation-page { padding-bottom: 20px; }
.content { padding: 0; }

/* 横幅 */
.rec-banner { position: relative; margin: 8px 16px 0; border-radius: 16px; overflow: hidden; }
.rec-banner-bg { position: absolute; inset: 0; background: linear-gradient(135deg, #F5A623, #FF7847); }
.rec-banner-content { position: relative; display: flex; align-items: center; justify-content: space-between; padding: 16px; color: #fff; }
.rec-banner-left { display: flex; align-items: center; gap: 10px; }
.rec-banner-title { font-size: 18px; font-weight: 700; }
.rec-banner-sub { font-size: 12px; opacity: 0.85; margin-top: 2px; }
.rec-banner-stars { display: flex; gap: 2px; }

/* 诗歌卡片 - 翻转 */
.rec-list { padding: 12px 16px; }
.poem-card { position: relative; height: 200px; margin-bottom: 14px; border-radius: 16px; cursor: pointer; perspective: 800px; }
.poem-front, .poem-back { position: absolute; inset: 0; border-radius: 16px; backface-visibility: hidden; transition: transform 0.6s; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; }
.poem-front { transform: rotateY(0); color: #fff; }
.poem-back { transform: rotateY(180deg); background: #fff; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
.poem-card.flipped .poem-front { transform: rotateY(180deg); }
.poem-card.flipped .poem-back { transform: rotateY(0); }
.poem-card-top { position: absolute; top: 12px; left: 12px; right: 12px; display: flex; justify-content: space-between; }
.poem-dynasty { font-size: 12px; background: rgba(255,255,255,0.25); padding: 2px 8px; border-radius: 10px; }
.poem-diff { font-size: 12px; color: rgba(255,255,255,0.8); }
.poem-card-title { font-size: 22px; font-weight: 700; margin-bottom: 6px; text-shadow: 0 1px 4px rgba(0,0,0,0.15); }
.poem-card-author { font-size: 14px; opacity: 0.85; }
.poem-card-stars { display: flex; gap: 4px; margin: 10px 0 6px; }
.poem-card-hint { font-size: 11px; opacity: 0.7; }
.poem-back-title { font-size: 16px; font-weight: 700; color: $color-text-primary; margin-bottom: 10px; }
.poem-back-text { font-size: 16px; line-height: 2; color: $color-text-primary; font-family: 'KaiTi', 'STKaiti', serif; text-align: center; margin-bottom: 10px; }
.poem-back-translation { display: flex; gap: 4px; align-items: flex-start; font-size: 12px; color: $color-text-secondary; background: $color-bg; padding: 6px 10px; border-radius: 8px; margin-bottom: 6px; text-align: left; }
.poem-back-bg { display: flex; gap: 4px; align-items: flex-start; font-size: 12px; color: #F5A623; background: #FFF8EC; padding: 6px 10px; border-radius: 8px; margin-bottom: 12px; text-align: left; }

/* 闯关选诗 */
.challenge-pick { padding: 16px; }
.challenge-pick-title { font-size: 15px; color: $color-text-secondary; text-align: center; margin-bottom: 16px; }
.challenge-pick-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.challenge-pick-card { background: #fff; border-radius: 14px; padding: 16px 12px; text-align: center; border: 2px solid #EBEDF0; cursor: pointer; transition: all 0.2s; &:active { transform: scale(0.96); } }
.cp-stars { display: flex; gap: 2px; justify-content: center; margin-bottom: 6px; }
.cp-title { font-size: 16px; font-weight: 700; color: $color-text-primary; }
.cp-author { font-size: 12px; color: $color-text-secondary; margin: 4px 0; }
.cp-diff { font-size: 12px; color: #FAAD14; }

/* 闯关区 */
.challenge-area { padding: 12px 16px; }
.challenge-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.challenge-header h3 { font-size: 16px; font-weight: 700; color: $color-text-primary; }
.challenge-total-stars { font-size: 14px; color: #FAAD14; font-weight: 600; }
.challenge-progress { display: flex; justify-content: space-between; margin-bottom: 20px; position: relative; }
.challenge-progress::before { content: ''; position: absolute; top: 14px; left: 16%; right: 16%; height: 2px; background: $color-border; z-index: 0; }
.cp-step { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1; }
.cp-step-num { width: 28px; height: 28px; border-radius: 50%; background: #fff; border: 2px solid $color-border; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: $color-text-secondary; }
.cp-step.active .cp-step-num { border-color: #F5A623; background: #F5A623; color: #fff; }
.cp-step.done .cp-step-num { border-color: #52C41A; background: #52C41A; color: #fff; }
.cp-step-name { font-size: 11px; color: $color-text-secondary; }
.cp-step.active .cp-step-name { color: #F5A623; font-weight: 600; }
.cp-step.done .cp-step-name { color: #52C41A; }

.level-area { background: #fff; border-radius: 14px; padding: 20px 16px; }
.level-desc { font-size: 14px; color: $color-text-secondary; text-align: center; margin-bottom: 16px; }
.level-poem { text-align: center; margin-bottom: 16px; }
.level-line { font-size: 20px; line-height: 2.2; color: $color-text-primary; font-family: 'KaiTi', 'STKaiti', serif; transition: opacity 0.5s; }
.level-actions { display: flex; gap: 8px; justify-content: center; }

/* 填空 */
.fill-area { margin-bottom: 16px; }
.fill-line { font-size: 18px; line-height: 2.4; font-family: 'KaiTi', 'STKaiti', serif; color: $color-text-primary; display: flex; align-items: center; flex-wrap: wrap; gap: 0; }
.fill-input { border: none; border-bottom: 2px solid #F5A623; min-width: 40px; max-width: 100px; font-size: 18px; text-align: center; outline: none; font-family: 'KaiTi', 'STKaiti', serif; color: #F5A623; background: #FFF8EC; border-radius: 4px 4px 0 0; padding: 0 4px; margin: 0 2px; &.ok { border-color: #52C41A; color: #52C41A; background: #E8F5E9; } &.no { border-color: #FF4D4F; color: #FF4D4F; background: #FFEBEE; } }
.fill-feedback { text-align: center; margin-bottom: 12px; }
.all-ok { font-size: 16px; color: #52C41A; font-weight: 700; margin-bottom: 8px; }
.has-no { font-size: 14px; color: #FF4D4F; margin-bottom: 8px; }

/* 全默写 */
.dictate-area { margin-bottom: 16px; }
.dictate-line { margin-bottom: 8px; }
.dictate-input { width: 100%; border: 2px solid $color-border; border-radius: 10px; padding: 10px 14px; font-size: 18px; font-family: 'KaiTi', 'STKaiti', serif; color: $color-text-primary; outline: none; background: $color-bg; transition: all 0.2s; &:focus { border-color: #F5A623; background: #fff; } &.ok { border-color: #52C41A; color: #52C41A; background: #E8F5E9; } &.no { border-color: #FF4D4F; color: #FF4D4F; background: #FFEBEE; } }

/* 诗句排序 */
.order-pick { padding: 16px; }
.order-area { padding: 12px 16px; }
.order-desc { font-size: 14px; color: $color-text-secondary; text-align: center; margin-bottom: 16px; }
.order-answers { min-height: 60px; background: #fff; border-radius: 12px; padding: 8px; display: flex; flex-wrap: wrap; gap: 6px; align-items: center; justify-content: center; margin-bottom: 16px; border: 2px dashed $color-border; }
.order-slot { min-width: 100px; min-height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
.order-placed-chip { background: #F5A623; color: #fff; padding: 8px 14px; border-radius: 8px; font-size: 14px; font-family: 'KaiTi', 'STKaiti', serif; }
.order-bank { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 16px; }
.order-bank-chip { background: $color-bg; padding: 8px 14px; border-radius: 8px; font-size: 14px; cursor: pointer; font-family: 'KaiTi', 'STKaiti', serif; transition: all 0.2s; &:active { transform: scale(0.95); } &.used { opacity: 0.3; pointer-events: none; } }
.order-feedback { text-align: center; margin-bottom: 12px; }

/* 成功弹窗 */
.success-modal { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 280px; background: #fff; border-radius: 20px; padding: 28px 24px; text-align: center; }
.success-stars { display: flex; gap: 8px; justify-content: center; margin-bottom: 12px; }
.success-title { font-size: 20px; font-weight: 700; color: $color-text-primary; }
.success-desc { font-size: 14px; color: #FAAD14; margin: 6px 0; }
.success-poem { font-size: 13px; color: $color-text-secondary; margin-bottom: 16px; }
</style>
