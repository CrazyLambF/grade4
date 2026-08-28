<template>
  <div class="page-container game-play-page">
    <van-nav-bar :title="gameConfig?.name" left-arrow @click-left="$router.back()">
      <template #right><span class="game-timer" v-if="timerActive">{{ fmtTime }}</span></template>
    </van-nav-bar>
    <div class="content" v-if="gameConfig">
      <div class="card game-info-card" v-if="!started">
        <div class="game-icon-large" :style="{ background: subjectColor + '20' }"><van-icon :name="gameConfig.icon" size="40" :color="subjectColor" /></div>
        <h3 class="game-name">{{ gameConfig.name }}</h3>
        <p class="game-desc">{{ gameConfig.description }}</p>
        <div class="game-rules"><van-icon name="info-o" size="14" color="#969799" /><span>{{ rulesText }}</span></div>
        <div class="game-meta-row"><van-tag plain :color="subjectColor">{{ diffText }}</van-tag><van-tag plain type="primary">约{{ gameConfig.estimatedTime }}秒</van-tag></div>
        <van-button type="primary" block round :color="subjectColor" @click="startGame" style="margin-top:16px">开始游戏</van-button>
      </div>
      <div v-else class="game-content">
        <div class="game-status-bar">
          <div class="score-display"><span class="score-label">得分</span><span class="score-value">{{ score }}</span></div>
          <div class="combo-badge" v-if="combo > 1">连击 x{{ combo }}</div>
          <div class="progress-display" v-if="totalQ > 0">{{ qIdx + 1 }}/{{ totalQ }}</div>
        </div>
        <transition name="feedback"><div v-if="fb" class="feedback-overlay" :class="fb"><van-icon :name="fb === 'correct' ? 'success' : 'cross'" size="48" :color="fb === 'correct' ? '#52C41A' : '#FF4D4F'" /></div></transition>

        <!-- 选择题引擎 -->
        <div v-if="eng === 'qa-choice'" class="qa-card">
          <p class="qa-question">{{ cur.q }}</p>
          <div class="qa-options">
            <div v-for="(opt, i) in cur.options" :key="i" class="qa-option" :class="{ 'opt-correct': showRes && opt === cur.answer, 'opt-wrong': showRes && lastSel === opt && opt !== cur.answer }" @click="onChoice(opt)">
              <span class="opt-letter">{{ String.fromCharCode(65 + i) }}</span><span>{{ opt }}</span>
            </div>
          </div>
        </div>
        <!-- 填空题引擎 -->
        <div v-else-if="eng === 'qa-fill'" class="qa-card">
          <p class="qa-question">{{ cur.q }}</p>
          <div class="qa-fill-area"><input v-model="fillVal" class="qa-input" placeholder="输入答案" @keyup.enter="onFill" /><van-button size="small" :color="subjectColor" @click="onFill">确认</van-button></div>
        </div>
        <!-- 古诗填字引擎 -->
        <div v-else-if="eng === 'poetry'" class="poetry-card">
          <div class="poetry-header"><span class="poetry-title">《{{ cur.title }}》</span><span class="poetry-author">— {{ cur.author }}</span></div>
          <div class="poetry-text"><template v-for="(ch, i) in (cur.poem || '')" :key="i"><span v-if="blankPos.includes(i)" class="poetry-blank" :class="{ active: activeBlank === i, filled: filledBlanks[i] }" @click="focusBlank(i)">{{ filledBlanks[i] || '___' }}</span><span v-else>{{ ch }}</span></template></div>
          <div class="poetry-hint" v-if="curHint">提示：{{ curHint }}</div>
          <div class="poetry-word-bank"><span v-for="w in wordBank" :key="w" class="word-bank-item" :class="{ used: usedWords.includes(w) }" @click="selWord(w)">{{ w }}</span></div>
        </div>
        <!-- 配对引擎 -->
        <div v-else-if="eng === 'match'" class="match-card">
          <p class="match-instruction">点击左右进行匹配</p>
          <div class="match-area">
            <div class="match-col"><div v-for="item in matchItems" :key="'l' + item.id" class="match-item" :class="{ selected: selL === item.id, matched: item.matched, wrong: wrongIds.includes(item.id) }" @click="selLeft(item.id)">{{ item.left }}</div></div>
            <div class="match-col"><div v-for="item in shuffledR" :key="'r' + item.id" class="match-item" :class="{ selected: selR === item.id, matched: item.matched, wrong: wrongIds.includes(item.id) }" @click="selRight(item.id)">{{ item.right }}</div></div>
          </div>
          <div class="match-progress">已配对 {{ matchedCount }}/{{ matchItems.length }}</div>
        </div>
        <!-- 排列引擎 -->
        <div v-else-if="eng === 'order'" class="order-card">
          <p class="order-instruction">将打乱的内容排列成正确顺序</p>
          <div class="order-answer-area"><div class="order-slot" v-for="i in orderLen" :key="i" @click="onUnplaceWord(i - 1)"><span v-if="placed[i - 1]" class="order-word-placed">{{ placed[i - 1] }}</span></div></div>
          <div class="word-bank"><span v-for="(w, i) in bankWords" :key="i" class="order-word-bank" :class="{ used: usedIdx.includes(i) }" @click="onPlaceWord(i)">{{ w }}</span></div>
          <div style="text-align: center; margin-top: 12px"><van-button size="small" :color="subjectColor" @click="checkOrderResult" :disabled="placed.length === 0">确认排列</van-button></div>
        </div>
        <!-- 分类引擎 -->
        <div v-else-if="eng === 'sort'" class="sort-card">
          <p class="sort-instruction">{{ sortInst }}</p>
          <div class="sort-display"><transition name="slide" mode="out-in"><div :key="sortIdx" class="sort-current" v-if="curSortItem">{{ curSortItem[sortKey] }}</div></transition></div>
          <div class="sort-categories" :style="{ gridTemplateColumns: sortCats.length > 3 ? '1fr 1fr' : '1fr 1fr 1fr' }"><div v-for="cat in sortCats" :key="cat" class="sort-cat-btn" @click="onSort(cat)">{{ cat }}</div></div>
          <div class="sort-progress">剩余 {{ sortTotal - sortIdx }} 项</div>
        </div>
        <!-- 器官拼图引擎 -->
        <div v-else-if="eng === 'organ-puzzle'" class="organ-card">
          <!-- 选择系统 -->
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
          <!-- 排列区 -->
          <template v-else>
            <div class="organ-header">
              <span class="organ-sys-tag">{{ organSelectedSystem }}</span>
              <p class="organ-instruction">按正确顺序排列器官（从入口到出口）</p>
            </div>

            <!-- 答案排列区：带序号的槽位 -->
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

            <!-- 器官卡片库 -->
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

            <!-- 确认按钮 -->
            <div class="organ-actions" v-if="!organShowResult">
              <van-button size="small" plain @click="selectOrganSystem('')">返回选系统</van-button>
              <van-button size="small" :color="subjectColor" :disabled="organPlaced.filter(p => p).length < organPlaced.length" @click="checkOrganResult">确认排列</van-button>
            </div>

            <!-- 结果展示 -->
            <div class="organ-result" v-if="organShowResult">
              <div class="organ-result-header">
                <van-icon :name="organCorrect ? 'success' : 'cross'" size="32" :color="organCorrect ? '#52C41A' : '#FF4D4F'" />
                <span :style="{ color: organCorrect ? '#52C41A' : '#FF4D4F', fontWeight: 600 }">{{ organCorrect ? '排列正确！' : '有错误，看正确顺序' }}</span>
              </div>
              <!-- 正确顺序展示（带功能说明） -->
              <div class="organ-correct-list">
                <div
                  v-for="(organ, i) in getOrganCorrectOrder()"
                  :key="i"
                  class="organ-correct-item"
                >
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
  gameConfig, subjectColor, diffText, started, score, combo, correctCount, wrongCount, remainingTime, timerActive, qIdx, totalQ, fb, showRes, lastSel, fillVal,
  eng, cur, rulesText, fmtTime, allData,
  blankPos, filledBlanks, activeBlank, curHint, wordBank, usedWords,
  matchItems, shuffledR, selL, selR, wrongIds, matchedCount,
  orderLen, bankWords, placed, usedIdx,
  sortCats, sortKey, sortInst, sortIdx, sortTotal, curSortItem,
  organSystems, organSelectedSystem, organBank, organPlaced, organUsedIdx, organShowResult, organCorrect,
  startGame, onChoice, onFill, focusBlank, selWord,
  selLeft, selRight, onPlaceWord, onUnplaceWord, checkOrderResult, onSort, destroy,
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
.game-info-card { text-align: center; }
.game-icon-large { width: 72px; height: 72px; border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
.game-name { font-size: 20px; font-weight: 700; color: $color-text-primary; margin-bottom: 8px; }
.game-desc { font-size: 14px; color: $color-text-regular; margin-bottom: 16px; }
.game-rules { display: flex; gap: 4px; align-items: flex-start; font-size: 13px; color: $color-text-secondary; background: $color-bg; padding: 8px 12px; border-radius: 8px; margin-bottom: 12px; text-align: left; }
.game-meta-row { display: flex; gap: 8px; justify-content: center; }
.game-content { padding: 12px 16px; }
.game-status-bar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.score-display { display: flex; align-items: baseline; gap: 6px; }
.score-label { font-size: 14px; color: $color-text-secondary; }
.score-value { font-size: 28px; font-weight: 700; color: $color-primary; }
.combo-badge { font-size: 14px; color: #FF4D4F; font-weight: 600; background: #FFF0F0; padding: 4px 10px; border-radius: 12px; }
.progress-display { font-size: 14px; color: $color-text-secondary; }
.feedback-overlay { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 99; background: rgba(255, 255, 255, 0.95); border-radius: 50%; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15); }
.feedback-enter-active, .feedback-leave-active { transition: all 0.3s; }
.feedback-enter-from { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
.feedback-leave-to { opacity: 0; transform: translate(-50%, -50%) scale(1.2); }

.qa-card { background: #fff; border-radius: 12px; padding: 20px 16px; }
.qa-question { font-size: 18px; color: $color-text-primary; margin-bottom: 16px; text-align: center; line-height: 1.6; }
.qa-options { display: flex; flex-direction: column; gap: 10px; }
.qa-option { display: flex; gap: 10px; align-items: center; padding: 14px; border-radius: 10px; background: $color-bg; font-size: 16px; cursor: pointer; transition: all 0.2s; &:active { transform: scale(0.98); } &.opt-correct { background: #E8F5E9; color: #2E7D32; } &.opt-wrong { background: #FFEBEE; color: #C62828; } }
.opt-letter { width: 28px; height: 28px; border-radius: 50%; background: #fff; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; color: $color-text-secondary; flex-shrink: 0; }
.qa-fill-area { display: flex; gap: 8px; align-items: center; }
.qa-input { flex: 1; height: 40px; border: 1px solid $color-border; border-radius: 8px; padding: 0 12px; font-size: 16px; outline: none; &:focus { border-color: $color-primary; } }

.poetry-card { }
.poetry-header { text-align: center; margin-bottom: 16px; }
.poetry-title { font-size: 18px; font-weight: 700; color: $color-text-primary; }
.poetry-author { font-size: 13px; color: $color-text-secondary; margin-left: 6px; }
.poetry-text { font-size: 20px; line-height: 2.4; text-align: center; color: $color-text-primary; background: #fff; border-radius: 12px; padding: 24px 16px; margin-bottom: 12px; font-family: 'KaiTi', 'STKaiti', serif; }
.poetry-blank { display: inline-block; min-width: 48px; border-bottom: 2px solid $color-primary; color: $color-primary; font-weight: 700; cursor: pointer; transition: all 0.2s; &.active { background: #EBF3FF; border-radius: 4px; } &.filled { color: #52C41A; border-color: #52C41A; } }
.poetry-hint { font-size: 13px; color: #FAAD14; text-align: center; margin-bottom: 12px; background: #FFFBE6; padding: 6px 12px; border-radius: 6px; }
.poetry-word-bank { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
.word-bank-item { background: $color-bg; padding: 8px 16px; border-radius: 8px; font-size: 16px; cursor: pointer; transition: all 0.2s; &:active { transform: scale(0.95); } &.used { opacity: 0.3; pointer-events: none; } }

.match-card { }
.match-instruction { font-size: 14px; color: $color-text-secondary; text-align: center; margin-bottom: 16px; }
.match-area { display: flex; justify-content: space-between; gap: 12px; }
.match-col { flex: 1; display: flex; flex-direction: column; gap: 8px; }
.match-item { padding: 14px 10px; border-radius: 10px; background: #fff; font-size: 14px; text-align: center; cursor: pointer; border: 2px solid transparent; transition: all 0.2s; &:active { transform: scale(0.97); } &.selected { border-color: $color-primary; background: #EBF3FF; } &.matched { opacity: 0.25; pointer-events: none; text-decoration: line-through; } &.wrong { border-color: #FF4D4F; background: #FFEBEE; animation: shake 0.4s; } }
.match-progress { text-align: center; font-size: 13px; color: $color-text-secondary; margin-top: 12px; }
@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }

.order-card { }
.order-instruction { font-size: 14px; color: $color-text-secondary; text-align: center; margin-bottom: 16px; }
.order-answer-area { min-height: 56px; background: #fff; border-radius: 12px; padding: 8px; display: flex; flex-wrap: wrap; gap: 6px; align-items: center; justify-content: center; margin-bottom: 16px; border: 2px dashed $color-border; }
.order-slot { min-width: 40px; height: 36px; border-radius: 6px; display: flex; align-items: center; justify-content: center; }
.order-word-placed { background: $color-primary; color: #fff; padding: 6px 12px; border-radius: 6px; font-size: 14px; }
.word-bank { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
.order-word-bank { background: $color-bg; padding: 8px 14px; border-radius: 8px; font-size: 14px; cursor: pointer; transition: all 0.2s; &:active { transform: scale(0.95); } &.used { opacity: 0.3; pointer-events: none; } }

.sort-card { }
.sort-instruction { font-size: 14px; color: $color-text-secondary; text-align: center; margin-bottom: 16px; }
.sort-display { min-height: 80px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
.sort-current { font-size: 24px; font-weight: 700; color: $color-text-primary; background: #fff; padding: 16px 32px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06); }
.sort-categories { display: grid; gap: 10px; }
.sort-cat-btn { padding: 16px; border-radius: 10px; font-size: 16px; font-weight: 600; text-align: center; cursor: pointer; transition: all 0.2s; background: $color-bg; color: $color-text-primary; &:active { transform: scale(0.97); } }
.sort-progress { text-align: center; font-size: 13px; color: $color-text-secondary; margin-top: 12px; }
.slide-enter-active, .slide-leave-active { transition: all 0.3s; }
.slide-enter-from { opacity: 0; transform: translateX(20px); }
.slide-leave-to { opacity: 0; transform: translateX(-20px); }

/* 器官拼图 */
.organ-card { }
.organ-instruction { font-size: 14px; color: $color-text-secondary; text-align: center; margin-bottom: 16px; }
.organ-header { text-align: center; margin-bottom: 12px; }
.organ-sys-tag { display: inline-block; background: #F3E5F5; color: #9C27B0; padding: 4px 14px; border-radius: 12px; font-size: 13px; font-weight: 600; margin-bottom: 8px; }
.organ-sys-grid { display: flex; flex-direction: column; gap: 12px; }
.organ-sys-btn { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 20px; background: #fff; border-radius: 14px; border: 2px solid $color-border; cursor: pointer; transition: all 0.2s; &:active { transform: scale(0.97); border-color: $color-primary; } }
.organ-sys-icon { display: flex; align-items: center; justify-content: center; }
.organ-sys-name { font-size: 17px; font-weight: 700; color: $color-text-primary; }
.organ-sys-desc { font-size: 12px; color: $color-text-secondary; }
.organ-slots { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
.organ-slot { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; background: #fff; border: 2px dashed $color-border; min-height: 56px; transition: all 0.2s; &:active { opacity: 0.7; } &.filled { border-style: solid; border-color: #C8C9CC; } &.correct { border-color: #52C41A; background: #E8F5E9; } &.wrong { border-color: #FF4D4F; background: #FFEBEE; } }
.organ-slot-num { width: 24px; height: 24px; border-radius: 50%; background: $color-bg; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: $color-text-secondary; flex-shrink: 0; }
.organ-slot-content { display: flex; align-items: center; gap: 8px; flex: 1; }
.organ-slot-icon { display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.organ-slot-name { font-size: 16px; font-weight: 600; color: $color-text-primary; }
.organ-slot-empty { font-size: 13px; color: $color-text-placeholder; }
.organ-bank { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 16px; }
.organ-bank-card { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 10px 4px; background: #fff; border-radius: 10px; border: 2px solid; cursor: pointer; transition: all 0.2s; &:active { transform: scale(0.95); } &.used { opacity: 0.25; pointer-events: none; } }
.organ-bank-icon { display: flex; align-items: center; justify-content: center; }
.organ-bank-name { font-size: 12px; color: $color-text-primary; font-weight: 600; }
.organ-actions { display: flex; gap: 8px; justify-content: center; }
.organ-result { text-align: center; }
.organ-result-header { display: flex; align-items: center; gap: 8px; justify-content: center; margin-bottom: 16px; }
.organ-correct-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; text-align: left; }
.organ-correct-item { display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: $color-bg; border-radius: 10px; }
.organ-correct-icon { display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.organ-correct-num { width: 22px; height: 22px; border-radius: 50%; background: #52C41A; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0; }
.organ-correct-info { display: flex; flex-direction: column; gap: 2px; flex: 1; }
.organ-correct-name { font-size: 14px; font-weight: 600; color: $color-text-primary; }
.organ-correct-func { font-size: 12px; color: $color-text-secondary; }
</style>
