<template>
  <div class="page-container game-play-page">
    <van-nav-bar :title="gameConfig?.name" left-arrow @click-left="$router.back()">
      <template #right><span class="game-timer" v-if="timerActive">{{ fmtTime }}</span></template>
    </van-nav-bar>
    <div class="content" v-if="gameConfig">
      <!-- 游戏开始前 -->
      <div class="card game-info-card" v-if="!started">
        <div class="game-icon-large" :style="{ background: subjectColor + '20' }">
          <van-icon :name="gameConfig.icon" size="40" :color="subjectColor" />
        </div>
        <h3 class="game-name">{{ gameConfig.name }}</h3>
        <p class="game-desc">{{ gameConfig.description }}</p>
        <div class="game-rules">
          <van-icon name="info-o" size="14" color="#969799" />
          <span>{{ rulesText }}</span>
        </div>
        <div class="game-meta-row">
          <van-tag plain :color="subjectColor">{{ diffText }}</van-tag>
          <van-tag plain type="primary">约{{ gameConfig.estimatedTime }}秒</van-tag>
        </div>
        <van-button type="primary" block round :color="subjectColor" @click="startGame" class="start-btn">
          <van-icon name="play-o" size="18" style="margin-right: 4px" /> 开始游戏
        </van-button>
      </div>

      <!-- 游戏进行中 -->
      <div v-else class="game-content">
        <!-- 顶部状态栏 -->
        <div class="game-status-bar" :style="{ '--subject-color': subjectColor }">
          <div class="score-display">
            <span class="score-label">得分</span>
            <span class="score-value" :class="{ 'score-pop': fb === 'correct' }">{{ score }}</span>
          </div>
          <transition name="combo-pop">
            <div v-if="combo > 1" class="combo-badge" :class="{ 'combo-fire': combo >= 5 }">
              <span class="combo-icon">{{ combo >= 5 ? '🔥' : '⚡' }}</span>
              <span>连击 x{{ combo }}</span>
            </div>
          </transition>
          <div class="progress-display" v-if="totalQ > 0">{{ qIdx + 1 }}/{{ totalQ }}</div>
          <div class="progress-display" v-else-if="eng === 'match'">{{ matchedPairs }}/6</div>
          <div class="progress-display" v-else-if="eng === 'sort'">{{ sortIdx }}/{{ sortTotal }}</div>
        </div>

        <!-- 进度条 -->
        <div class="progress-bar-wrap" v-if="totalQ > 0 || eng === 'match' || eng === 'sort'">
          <div class="progress-bar" :style="{
            width: (eng === 'match' ? (matchedPairs / 6 * 100) : eng === 'sort' ? (sortIdx / sortTotal * 100) : progressPercent) + '%',
            background: subjectColor
          }"></div>
        </div>

        <!-- 连击特效 -->
        <transition name="combo-effect">
          <div v-if="comboEffect" class="combo-effect-overlay">
            <div class="combo-effect-text">{{ combo }}连击！</div>
          </div>
        </transition>

        <!-- 反馈遮罩 -->
        <transition name="feedback">
          <div v-if="fb" class="feedback-overlay" :class="fb">
            <div class="feedback-icon" :class="fb">
              <van-icon :name="fb === 'correct' ? 'success' : 'cross'" size="48" :color="fb === 'correct' ? '#52C41A' : '#FF4D4F'" />
            </div>
            <div class="feedback-text" :class="fb">{{ fb === 'correct' ? '太棒了！' : '再想想' }}</div>
          </div>
        </transition>

        <!-- ====== 选择题引擎 ====== -->
        <transition name="question-slide" mode="out-in">
          <div v-if="eng === 'qa-choice'" :key="qIdx" class="qa-card">
            <div class="qa-question-wrap">
              <span class="qa-q-num">第{{ qIdx + 1 }}题</span>
              <p class="qa-question">{{ cur.q }}</p>
            </div>
            <div class="qa-options">
              <div
                v-for="(opt, i) in cur.options"
                :key="i"
                class="qa-option"
                :class="{
                  'opt-correct': showRes && opt === cur.answer,
                  'opt-wrong': showRes && lastSel === opt && opt !== cur.answer,
                  'opt-disabled': showRes
                }"
                @click="onChoice(opt)"
              >
                <span class="opt-letter" :class="{
                  'letter-correct': showRes && opt === cur.answer,
                  'letter-wrong': showRes && lastSel === opt && opt !== cur.answer
                }">{{ String.fromCharCode(65 + i) }}</span>
                <span class="opt-text">{{ opt }}</span>
                <van-icon v-if="showRes && opt === cur.answer" name="success" size="18" color="#52C41A" class="opt-check" />
              </div>
            </div>
          </div>
        </transition>

        <!-- ====== 填空题引擎 ====== -->
        <div v-if="eng === 'qa-fill'" class="qa-card">
          <div class="qa-question-wrap">
            <span class="qa-q-num">第{{ qIdx + 1 }}题</span>
            <p class="qa-question">{{ cur.q }}</p>
          </div>
          <div class="qa-fill-area">
            <input v-model="fillVal" class="qa-input" placeholder="输入答案..." @keyup.enter="onFill" :style="{ '--focus-color': subjectColor }" />
            <van-button size="small" :color="subjectColor" round @click="onFill">确认</van-button>
          </div>
        </div>

        <!-- ====== 古诗填字引擎 ====== -->
        <transition name="question-slide" mode="out-in">
          <div v-if="eng === 'poetry'" :key="qIdx" class="poetry-card">
            <div class="poetry-header">
              <span class="poetry-title">《{{ cur.title }}》</span>
              <span class="poetry-author">— {{ cur.author }}</span>
            </div>
            <div class="poetry-text">
              <template v-for="(ch, i) in (cur.poem || '')" :key="i">
                <span
                  v-if="blankPos.includes(i)"
                  class="poetry-blank"
                  :class="{ active: activeBlank === i, filled: filledBlanks[i] }"
                  @click="focusBlank(i)"
                >{{ filledBlanks[i] || '___' }}</span>
                <span v-else>{{ ch }}</span>
              </template>
            </div>
            <div class="poetry-hint" v-if="curHint">
              <van-icon name="bulb-o" size="14" color="#FAAD14" /> 提示：{{ curHint }}
            </div>
            <div class="poetry-word-bank">
              <span
                v-for="w in wordBank"
                :key="w"
                class="word-bank-item"
                :class="{ used: usedWords.includes(w) }"
                @click="selWord(w)"
              >{{ w }}</span>
            </div>
            <div class="poetry-progress">
              第{{ qIdx + 1 }}/{{ allData.length }}首
            </div>
          </div>
        </transition>

        <!-- ====== 翻牌记忆游戏引擎 ====== -->
        <div v-if="eng === 'match'" class="match-card">
          <p class="match-instruction">翻开卡片找到配对，用最少步数完成！</p>
          <div class="flip-stats">
            <span class="flip-stat">步数：{{ flipMoves }}</span>
            <span class="flip-stat">已配对：{{ matchedPairs }}/6</span>
          </div>
          <div class="flip-grid">
            <div
              v-for="(card, idx) in flipCards"
              :key="card.id"
              class="flip-card-3d"
              :class="{ flipped: card.flipped || card.matched, matched: card.matched, locked: flipLocked }"
              @click="flipCard(idx)"
            >
              <div class="flip-card-inner">
                <div class="flip-card-front" :style="{ '--subject-color': subjectColor }">
                  <van-icon name="question-o" size="28" :color="subjectColor" />
                </div>
                <div class="flip-card-back" :style="{ borderColor: card.matched ? '#52C41A' : subjectColor }">
                  <span class="flip-card-text">{{ card.text }}</span>
                  <van-icon v-if="card.matched" name="success" size="16" color="#52C41A" class="flip-card-check" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ====== 排列引擎 ====== -->
        <transition name="question-slide" mode="out-in">
          <div v-if="eng === 'order'" :key="qIdx" class="order-card">
            <p class="order-instruction">将打乱的内容排列成正确顺序</p>
            <div class="order-answer-area">
              <div
                class="order-slot"
                v-for="i in orderLen"
                :key="i"
                @click="onUnplaceWord(i - 1)"
              >
                <span v-if="placed[i - 1]" class="order-word-placed" :style="{ background: subjectColor }">{{ placed[i - 1] }}</span>
              </div>
            </div>
            <div class="word-bank">
              <span
                v-for="(w, i) in bankWords"
                :key="i"
                class="order-word-bank"
                :class="{ used: usedIdx.includes(i) }"
                @click="onPlaceWord(i)"
              >{{ w }}</span>
            </div>
            <div class="order-actions">
              <van-button size="small" :color="subjectColor" round @click="checkOrderResult" :disabled="placed.length === 0">
                确认排列
              </van-button>
            </div>
          </div>
        </transition>

        <!-- ====== 分类引擎 ====== -->
        <div v-if="eng === 'sort'" class="sort-card">
          <p class="sort-instruction">{{ sortInst }}</p>
          <transition name="sort-slide" mode="out-in">
            <div :key="sortIdx" class="sort-current-wrap" v-if="curSortItem">
              <div class="sort-current" :style="{ '--subject-color': subjectColor }">
                {{ curSortItem[sortKey] }}
              </div>
            </div>
          </transition>
          <div class="sort-categories" :style="{ gridTemplateColumns: sortCats.length > 3 ? '1fr 1fr' : '1fr 1fr 1fr' }">
            <div
              v-for="cat in sortCats"
              :key="cat"
              class="sort-cat-btn"
              :style="{ '--cat-color': subjectColor }"
              @click="onSort(cat)"
            >{{ cat }}</div>
          </div>
          <div class="sort-progress">剩余 {{ sortTotal - sortIdx }} 项</div>
        </div>

        <!-- ====== 器官拼图引擎 ====== -->
        <div v-if="eng === 'organ-puzzle'" class="organ-card">
          <template v-if="!organSelectedSystem">
            <p class="organ-instruction">选择一个身体系统开始拼图</p>
            <div class="organ-sys-grid">
              <div v-for="sys in organSystems" :key="sys" class="organ-sys-btn" @click="selectOrganSystem(sys)">
                <div class="organ-sys-icon" v-html="getSystemSvg(sys)"></div>
                <span class="organ-sys-name">{{ sys }}</span>
                <span class="organ-sys-desc">{{ sys === '呼吸系统' ? '空气的旅行路线' : '食物的旅行路线' }}</span>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="organ-header">
              <span class="organ-sys-tag" :style="{ background: subjectColor + '15', color: subjectColor }">{{ organSelectedSystem }}</span>
              <p class="organ-instruction">按正确顺序排列器官（从入口到出口）</p>
            </div>
            <div class="organ-slots">
              <div
                v-for="(slot, i) in organPlaced"
                :key="i"
                class="organ-slot"
                :class="{ filled: slot, correct: organShowResult && slot && isOrganCorrect(slot, i), wrong: organShowResult && slot && !isOrganCorrect(slot, i) }"
                @click="unplaceOrgan(i)"
              >
                <span class="organ-slot-num">{{ i + 1 }}</span>
                <div v-if="slot" class="organ-slot-content">
                  <div class="organ-slot-icon" v-html="wrapSvg(slot.svg, 36)"></div>
                  <span class="organ-slot-name">{{ slot.name }}</span>
                </div>
                <span v-else class="organ-slot-empty">点击下方器官放入</span>
              </div>
            </div>
            <div class="organ-bank" v-if="!organShowResult">
              <div
                v-for="(organ, i) in organBank"
                :key="i"
                class="organ-bank-card"
                :class="{ used: organUsedIdx.includes(i) }"
                :style="{ borderColor: organ.color }"
                @click="placeOrgan(i)"
              >
                <div class="organ-bank-icon" v-html="wrapSvg(organ.svg, 36)"></div>
                <span class="organ-bank-name">{{ organ.name }}</span>
              </div>
            </div>
            <div class="organ-actions" v-if="!organShowResult">
              <van-button size="small" plain @click="selectOrganSystem('')">返回选系统</van-button>
              <van-button size="small" :color="subjectColor" :disabled="organPlaced.filter(p => p).length < organPlaced.length" @click="checkOrganResult">确认排列</van-button>
            </div>
            <div class="organ-result" v-if="organShowResult">
              <div class="organ-result-header">
                <van-icon :name="organCorrect ? 'success' : 'cross'" size="32" :color="organCorrect ? '#52C41A' : '#FF4D4F'" />
                <span :style="{ color: organCorrect ? '#52C41A' : '#FF4D4F', fontWeight: 600 }">{{ organCorrect ? '排列正确！' : '有错误，看正确顺序' }}</span>
              </div>
              <div class="organ-correct-list">
                <div v-for="(organ, i) in getOrganCorrectOrder()" :key="i" class="organ-correct-item">
                  <span class="organ-correct-num">{{ i + 1 }}</span>
                  <div class="organ-correct-icon" v-html="wrapSvg(organ.svg, 32)"></div>
                  <div class="organ-correct-info">
                    <span class="organ-correct-name">{{ organ.name }}</span>
                    <span class="organ-correct-func">{{ organ.func }}</span>
                  </div>
                </div>
              </div>
              <van-button size="small" type="primary" :color="subjectColor" round @click="nextOrganSystem">下一个系统</van-button>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div v-else class="card not-found">
      <van-icon name="warning-o" size="40" color="#FAAD14" />
      <p class="nf-title">未找到该游戏</p>
      <p class="nf-desc">游戏配置不存在或已下线</p>
      <van-button plain type="primary" @click="$router.replace('/games')">返回游戏中心</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue'
import { useGameEngine } from '@/composables/useGameEngine'

const g = useGameEngine()
const {
  gameConfig, subjectColor, diffText, started, score, combo, maxCombo, correctCount, wrongCount, remainingTime, timerActive, qIdx, totalQ, fb, showRes, lastSel, fillVal, comboEffect,
  eng, cur, rulesText, fmtTime, allData, progressPercent,
  blankPos, filledBlanks, activeBlank, curHint, wordBank, usedWords,
  flipCards, flippedIdx, matchedPairs, flipLocked, flipMoves, flipCard,
  orderLen, bankWords, placed, usedIdx,
  sortCats, sortKey, sortInst, sortIdx, sortTotal, curSortItem,
  organSystems, organSelectedSystem, organBank, organPlaced, organUsedIdx, organShowResult, organCorrect,
  startGame, onChoice, onFill, focusBlank, selWord,
  onPlaceWord, onUnplaceWord, checkOrderResult, onSort, destroy,
  selectOrganSystem, placeOrgan, unplaceOrgan, checkOrganResult, nextOrganSystem,
} = g

// 器官拼图辅助函数
function isOrganCorrect(slot: any, idx: number): boolean {
  if (!slot) return false
  const organs = allData.value.filter((d: any) => d.system === organSelectedSystem.value).sort((a: any, b: any) => a.order - b.order)
  return organs[idx] && slot.name === organs[idx].name
}
function getOrganCorrectOrder(): any[] {
  return allData.value.filter((d: any) => d.system === organSelectedSystem.value).sort((a: any, b: any) => a.order - b.order)
}
function getSystemSvg(sys: string): string {
  if (sys === '呼吸系统') {
    return wrapSvg('<path d="M12 4v10M8 7c-3 0-4 3-4 6s1 5 4 5 4-2 4-5V7H8zM16 7c3 0 4 3 4 6s-1 5-4 5-4-2-4-5V7h4z" fill="#FBE9E7" stroke="#FF7043" stroke-width="1.5"/>', 32)
  }
  return wrapSvg('<path d="M5 5h14v3H8v4h11v3H8v4h11" fill="none" stroke="#8D6E63" stroke-width="2" stroke-linecap="round"/>', 32)
}
function wrapSvg(inner: string, size: number): string {
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`
}

onUnmounted(() => destroy())
</script>

<style scoped lang="scss">
.game-play-page { padding-bottom: 20px; }
.game-timer { font-size: 16px; font-weight: 600; color: #FF4D4F; }
.not-found { text-align: center; padding: 40px 20px; }
.nf-title { font-size: 18px; font-weight: 700; color: $color-text-primary; margin: 12px 0 6px; }
.nf-desc { font-size: 13px; color: $color-text-secondary; margin-bottom: 16px; }
.content { padding: 8px 0; }

/* ===== 开始页 ===== */
.game-info-card { text-align: center; }
.game-icon-large {
  width: 72px; height: 72px; border-radius: 20px;
  display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;
}
.game-name { font-size: 20px; font-weight: 700; color: $color-text-primary; margin-bottom: 8px; }
.game-desc { font-size: 14px; color: $color-text-regular; margin-bottom: 16px; }
.game-rules {
  display: flex; gap: 4px; align-items: flex-start; font-size: 13px;
  color: $color-text-secondary; background: $color-bg; padding: 8px 12px;
  border-radius: 8px; margin-bottom: 12px; text-align: left;
}
.game-meta-row { display: flex; gap: 8px; justify-content: center; }
.start-btn { margin-top: 16px; font-size: 16px; font-weight: 600; height: 44px; }

/* ===== 游戏进行中 ===== */
.game-content { padding: 12px 16px; }
.game-status-bar {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 8px;
}
.score-display { display: flex; align-items: baseline; gap: 6px; }
.score-label { font-size: 14px; color: $color-text-secondary; }
.score-value {
  font-size: 28px; font-weight: 700; color: var(--subject-color, #{$color-primary});
  transition: transform 0.2s;
  &.score-pop { animation: scorePop 0.4s; }
}
@keyframes scorePop { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.2); } }
.combo-badge {
  font-size: 14px; color: #FF4D4F; font-weight: 600; background: #FFF0F0;
  padding: 4px 12px; border-radius: 12px; display: flex; align-items: center; gap: 4px;
  &.combo-fire { background: linear-gradient(135deg, #FF6B35, #FF4D4F); color: #fff; }
}
.combo-icon { font-size: 14px; }
.progress-display { font-size: 14px; color: $color-text-secondary; }

/* 进度条 */
.progress-bar-wrap {
  height: 4px; background: #E8E8E8; border-radius: 2px;
  margin-bottom: 16px; overflow: hidden;
}
.progress-bar {
  height: 100%; border-radius: 2px; transition: width 0.4s ease;
}

/* 连击特效 */
.combo-effect-overlay {
  position: fixed; top: 35%; left: 50%; transform: translate(-50%, -50%);
  z-index: 100; pointer-events: none;
}
.combo-effect-text {
  font-size: 32px; font-weight: 800; color: #FF6B35;
  text-shadow: 0 0 20px rgba(255, 107, 53, 0.5);
  animation: comboPulse 1s;
}
@keyframes comboPulse {
  0% { transform: scale(0.5); opacity: 0; }
  30% { transform: scale(1.3); opacity: 1; }
  100% { transform: scale(1); opacity: 0; }
}
.combo-effect-enter-active, .combo-effect-leave-active { transition: opacity 0.3s; }
.combo-effect-enter-from, .combo-effect-leave-to { opacity: 0; }

/* 反馈遮罩 */
.feedback-overlay {
  position: fixed; top: 40%; left: 50%; transform: translate(-50%, -50%);
  z-index: 99; background: rgba(255, 255, 255, 0.95); border-radius: 20px;
  width: 140px; padding: 16px; display: flex; flex-direction: column; align-items: center; gap: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}
.feedback-icon {
  width: 64px; height: 64px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  &.correct { background: #E8F5E9; }
  &.wrong { background: #FFEBEE; }
}
.feedback-text {
  font-size: 15px; font-weight: 700;
  &.correct { color: #52C41A; }
  &.wrong { color: #FF4D4F; }
}
.feedback-enter-active, .feedback-leave-active { transition: all 0.3s; }
.feedback-enter-from { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
.feedback-leave-to { opacity: 0; transform: translate(-50%, -50%) scale(1.2); }

/* 题目切换动画 */
.question-slide-enter-active, .question-slide-leave-active { transition: all 0.3s; }
.question-slide-enter-from { opacity: 0; transform: translateX(20px); }
.question-slide-leave-to { opacity: 0; transform: translateX(-20px); }

/* ===== 选择题 ===== */
.qa-card { background: #fff; border-radius: 16px; padding: 20px 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
.qa-question-wrap { text-align: center; margin-bottom: 16px; }
.qa-q-num { font-size: 12px; color: $color-text-secondary; background: $color-bg; padding: 3px 10px; border-radius: 10px; }
.qa-question { font-size: 18px; color: $color-text-primary; margin-top: 10px; line-height: 1.6; }
.qa-options { display: flex; flex-direction: column; gap: 10px; }
.qa-option {
  display: flex; gap: 10px; align-items: center; padding: 14px; border-radius: 12px;
  background: $color-bg; font-size: 16px; cursor: pointer; transition: all 0.25s;
  border: 2px solid transparent;
  &:active { transform: scale(0.97); }
  &.opt-correct { background: #E8F5E9; border-color: #52C41A; }
  &.opt-wrong { background: #FFEBEE; border-color: #FF4D4F; animation: shake 0.4s; }
  &.opt-disabled { pointer-events: none; }
}
.opt-letter {
  width: 28px; height: 28px; border-radius: 50%; background: #fff;
  display: flex; align-items: center; justify-content: center; font-size: 13px;
  font-weight: 600; color: $color-text-secondary; flex-shrink: 0; transition: all 0.25s;
  &.letter-correct { background: #52C41A; color: #fff; }
  &.letter-wrong { background: #FF4D4F; color: #fff; }
}
.opt-text { flex: 1; }
.opt-check { margin-left: auto; }
.qa-fill-area { display: flex; gap: 8px; align-items: center; }
.qa-input {
  flex: 1; height: 44px; border: 2px solid $color-border; border-radius: 10px;
  padding: 0 14px; font-size: 16px; outline: none; transition: border-color 0.2s;
  &:focus { border-color: var(--focus-color, #{$color-primary}); }
}

/* ===== 古诗 ===== */
.poetry-card { }
.poetry-header { text-align: center; margin-bottom: 16px; }
.poetry-title { font-size: 18px; font-weight: 700; color: $color-text-primary; }
.poetry-author { font-size: 13px; color: $color-text-secondary; margin-left: 6px; }
.poetry-text {
  font-size: 20px; line-height: 2.4; text-align: center; color: $color-text-primary;
  background: linear-gradient(135deg, #FFFBF0 0%, #FFF5E6 100%); border-radius: 16px;
  padding: 24px 16px; margin-bottom: 12px; font-family: 'KaiTi', 'STKaiti', serif;
  box-shadow: 0 2px 12px rgba(255, 140, 66, 0.08);
}
.poetry-blank {
  display: inline-block; min-width: 48px; border-bottom: 2px solid #FF8C42;
  color: #FF8C42; font-weight: 700; cursor: pointer; transition: all 0.2s;
  &.active { background: #FFF3E0; border-radius: 6px; }
  &.filled { color: #52C41A; border-color: #52C41A; animation: fillBounce 0.3s; }
}
@keyframes fillBounce { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.15); } }
.poetry-hint {
  font-size: 13px; color: #FAAD14; text-align: center; margin-bottom: 12px;
  background: #FFFBE6; padding: 8px 12px; border-radius: 8px; display: flex; align-items: center; gap: 4px; justify-content: center;
}
.poetry-word-bank { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
.word-bank-item {
  background: linear-gradient(135deg, #FFF5E6, #FFE8CC); padding: 8px 16px; border-radius: 10px;
  font-size: 16px; cursor: pointer; transition: all 0.2s; border: 1px solid transparent;
  &:active { transform: scale(0.92); }
  &.used { opacity: 0.25; pointer-events: none; }
}
.poetry-progress { text-align: center; font-size: 12px; color: $color-text-secondary; margin-top: 12px; }

/* ===== 翻牌记忆游戏 ===== */
.match-card { }
.match-instruction { font-size: 14px; color: $color-text-secondary; text-align: center; margin-bottom: 8px; }
.flip-stats {
  display: flex; justify-content: center; gap: 16px; margin-bottom: 16px;
  font-size: 13px; color: $color-text-secondary;
}
.flip-stats .flip-stat { background: $color-bg; padding: 4px 12px; border-radius: 10px; }
.flip-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
  perspective: 800px;
}
.flip-card-3d {
  aspect-ratio: 3 / 4; cursor: pointer; position: relative;
  &.locked { pointer-events: none; }
}
.flip-card-inner {
  width: 100%; height: 100%; position: relative;
  transform-style: preserve-3d; transition: transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
}
.flip-card-3d.flipped .flip-card-inner { transform: rotateY(180deg); }
.flip-card-front, .flip-card-back {
  position: absolute; width: 100%; height: 100%; backface-visibility: hidden;
  border-radius: 12px; display: flex; align-items: center; justify-content: center;
}
.flip-card-front {
  background: linear-gradient(135deg, var(--subject-color, #6C5CE7) 0%, rgba(255,255,255,0.85) 100%);
  border: 2px solid var(--subject-color, #6C5CE7);
  box-shadow: 0 4px 12px rgba(108, 92, 231, 0.15);
}
.flip-card-back {
  background: #fff; border: 2px solid; transform: rotateY(180deg);
  flex-direction: column; gap: 6px; padding: 8px; text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}
.flip-card-3d.matched .flip-card-back {
  background: #E8F5E9; animation: matchPulse 0.5s;
}
@keyframes matchPulse {
  0% { transform: rotateY(180deg) scale(1); }
  50% { transform: rotateY(180deg) scale(1.08); }
  100% { transform: rotateY(180deg) scale(1); }
}
.flip-card-text {
  font-size: 13px; font-weight: 600; color: $color-text-primary;
  word-break: break-all; line-height: 1.3;
}
.flip-card-check { position: absolute; top: 4px; right: 4px; }

/* ===== 排列 ===== */
.order-card { }
.order-instruction { font-size: 14px; color: $color-text-secondary; text-align: center; margin-bottom: 16px; }
.order-answer-area {
  min-height: 56px; background: #fff; border-radius: 12px; padding: 8px;
  display: flex; flex-wrap: wrap; gap: 6px; align-items: center; justify-content: center;
  margin-bottom: 16px; border: 2px dashed $color-border;
}
.order-slot {
  min-width: 40px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center;
}
.order-word-placed {
  color: #fff; padding: 6px 14px; border-radius: 8px; font-size: 14px; font-weight: 600;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.word-bank { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
.order-word-bank {
  background: $color-bg; padding: 8px 14px; border-radius: 10px; font-size: 14px;
  cursor: pointer; transition: all 0.2s; border: 1px solid transparent;
  &:active { transform: scale(0.92); }
  &.used { opacity: 0.25; pointer-events: none; }
}
.order-actions { text-align: center; margin-top: 16px; }

/* ===== 分类 ===== */
.sort-card { }
.sort-instruction { font-size: 14px; color: $color-text-secondary; text-align: center; margin-bottom: 16px; }
.sort-current-wrap { min-height: 100px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
.sort-current {
  font-size: 24px; font-weight: 700; color: $color-text-primary;
  background: #fff; padding: 20px 36px; border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  border-top: 4px solid var(--subject-color, #{$color-primary});
}
.sort-categories { display: grid; gap: 10px; }
.sort-cat-btn {
  padding: 16px; border-radius: 12px; font-size: 16px; font-weight: 600;
  text-align: center; cursor: pointer; transition: all 0.2s;
  background: #fff; color: $color-text-primary; border: 2px solid $color-border;
  &:active { transform: scale(0.96); border-color: var(--cat-color, #{$color-primary}); }
}
.sort-progress { text-align: center; font-size: 13px; color: $color-text-secondary; margin-top: 12px; }
.sort-slide-enter-active, .sort-slide-leave-active { transition: all 0.3s; }
.sort-slide-enter-from { opacity: 0; transform: translateY(-15px); }
.sort-slide-leave-to { opacity: 0; transform: translateY(15px); }

/* ===== 器官拼图 ===== */
.organ-card { }
.organ-instruction { font-size: 14px; color: $color-text-secondary; text-align: center; margin-bottom: 16px; }
.organ-header { text-align: center; margin-bottom: 12px; }
.organ-sys-tag {
  display: inline-block; padding: 4px 14px; border-radius: 12px;
  font-size: 13px; font-weight: 600; margin-bottom: 8px;
}
.organ-sys-grid { display: flex; flex-direction: column; gap: 12px; }
.organ-sys-btn {
  display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 20px;
  background: #fff; border-radius: 14px; border: 2px solid $color-border; cursor: pointer; transition: all 0.2s;
  &:active { transform: scale(0.97); border-color: $color-primary; }
}
.organ-sys-icon { display: flex; align-items: center; justify-content: center; }
.organ-sys-name { font-size: 17px; font-weight: 700; color: $color-text-primary; }
.organ-sys-desc { font-size: 12px; color: $color-text-secondary; }
.organ-slots { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
.organ-slot {
  display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px;
  background: #fff; border: 2px dashed $color-border; min-height: 56px; transition: all 0.2s;
  &:active { opacity: 0.7; }
  &.filled { border-style: solid; border-color: #C8C9CC; }
  &.correct { border-color: #52C41A; background: #E8F5E9; }
  &.wrong { border-color: #FF4D4F; background: #FFEBEE; }
}
.organ-slot-num {
  width: 24px; height: 24px; border-radius: 50%; background: $color-bg;
  display: flex; align-items: center; justify-content: center; font-size: 13px;
  font-weight: 700; color: $color-text-secondary; flex-shrink: 0;
}
.organ-slot-content { display: flex; align-items: center; gap: 8px; flex: 1; }
.organ-slot-icon { display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.organ-slot-name { font-size: 16px; font-weight: 600; color: $color-text-primary; }
.organ-slot-empty { font-size: 13px; color: $color-text-placeholder; }
.organ-bank { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 16px; }
.organ-bank-card {
  display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 10px 4px;
  background: #fff; border-radius: 10px; border: 2px solid; cursor: pointer; transition: all 0.2s;
  &:active { transform: scale(0.95); }
  &.used { opacity: 0.25; pointer-events: none; }
}
.organ-bank-icon { display: flex; align-items: center; justify-content: center; }
.organ-bank-name { font-size: 12px; color: $color-text-primary; font-weight: 600; }
.organ-actions { display: flex; gap: 8px; justify-content: center; }
.organ-result { text-align: center; }
.organ-result-header { display: flex; align-items: center; gap: 8px; justify-content: center; margin-bottom: 16px; }
.organ-correct-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; text-align: left; }
.organ-correct-item { display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: $color-bg; border-radius: 10px; }
.organ-correct-icon { display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.organ-correct-num {
  width: 22px; height: 22px; border-radius: 50%; background: #52C41A; color: #fff;
  display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0;
}
.organ-correct-info { display: flex; flex-direction: column; gap: 2px; flex: 1; }
.organ-correct-name { font-size: 14px; font-weight: 600; color: $color-text-primary; }
.organ-correct-func { font-size: 12px; color: $color-text-secondary; }

@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }
</style>
