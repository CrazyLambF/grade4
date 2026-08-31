import { getGameData } from '@/composables/useGameData'
import { placeWord, unplaceWord, checkOrder } from '@/composables/useGameHelpers'
import { useGamesStore } from '@/stores/games'
import { useSubjectStore } from '@/stores/subject'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { SubjectType } from '@/types'

function shuffle<T>(a: T[]): T[] { return [...a].sort(() => Math.random() - 0.5) }

export function useGameEngine() {
  const route = useRoute()
  const router = useRouter()
  const gamesStore = useGamesStore()
  const subjectStore = useSubjectStore()
  const subjectType = computed(() => route.params.subject as SubjectType)
  const gameId = computed(() => route.params.gameId as string)
  const gameConfig = computed(() => gamesStore.getGameConfig(gameId.value))
  const subjectColor = computed(() => subjectStore.getSubject(subjectType.value)?.color || '#4E8AF2')
  const diffText = computed(() => { const d = gameConfig.value?.difficulty || 2; return d === 1 ? '简单' : d === 2 ? '中等' : '困难' })

  const started = ref(false), score = ref(0), combo = ref(0), maxCombo = ref(0), correctCount = ref(0), wrongCount = ref(0)
  const remainingTime = ref(60), timerActive = ref(false), qIdx = ref(0), totalQ = ref(0)
  const fb = ref<'correct' | 'wrong' | ''>(''), showRes = ref(false), lastSel = ref(''), fillVal = ref('')
  // 连击特效
  const comboEffect = ref(false)
  let timer: any = null

  const gd = ref(getGameData(route.params.gameId as string))
  const eng = computed(() => gd.value.engine)
  const allData = ref<any[]>(gd.value.data)
  const cur = computed(() => allData.value[qIdx.value] || {})

  // 路由参数变化时（如组件被复用直接切换游戏），重新加载题目
  watch(() => route.params.gameId, (id) => {
    if (!id) return
    gd.value = getGameData(id as string)
    allData.value = gd.value.data
    sortCats.value = gd.value.sortCats || []
    sortKey.value = gd.value.sortKey || ''
    sortInst.value = gd.value.sortInst || ''
    started.value = false; score.value = 0; combo.value = 0; maxCombo.value = 0; correctCount.value = 0; wrongCount.value = 0
    qIdx.value = 0; totalQ.value = 0; fb.value = ''; showRes.value = false; lastSel.value = ''; fillVal.value = ''
    organSelectedSystem.value = ''; organBank.value = []; organPlaced.value = []; organUsedIdx.value = []; organShowResult.value = false; organCorrect.value = false
    // 翻牌记忆游戏重置
    flipCards.value = []; flippedIdx.value = []; matchedPairs.value = 0; flipLocked.value = false; flipMoves.value = 0
    if (timer) { clearInterval(timer); timer = null }; timerActive.value = false
  })

  const rulesText = computed(() => ({
    'qa-choice': '选出正确答案，连击越多得分越高！', 'qa-fill': '输入正确答案，限时挑战！',
    'poetry': '从字库中选字填入古诗空缺处！', 'match': '翻开卡片找到配对，用最少步数完成！',
    'order': '将打乱的内容排列成正确顺序！', 'sort': '将物品归入正确类别！',
    'organ-puzzle': '选择一个系统，按正确顺序排列器官！',
  }[eng.value] || '完成游戏获得积分！'))
  const fmtTime = computed(() => `${Math.floor(remainingTime.value / 60)}:${String(remainingTime.value % 60).padStart(2, '0')}`)

  // 进度条百分比
  const progressPercent = computed(() => {
    if (totalQ.value === 0) return 0
    return Math.round((qIdx.value / totalQ.value) * 100)
  })

  // 古诗
  const blankPos = ref<number[]>([]), filledBlanks = ref<Record<number, string>>({}), activeBlank = ref(-1), curHint = ref(''), wordBank = ref<string[]>([]), usedWords = ref<string[]>([])
  // 配对（翻牌记忆游戏）
  interface FlipCard { id: number; pairId: number; text: string; flipped: boolean; matched: boolean }
  const flipCards = ref<FlipCard[]>([])
  const flippedIdx = ref<number[]>([])  // 当前翻开的卡片索引（最多2张）
  const matchedPairs = ref(0)
  const flipLocked = ref(false)  // 翻牌锁定（动画进行中）
  const flipMoves = ref(0)       // 总翻牌次数
  // 排列
  const orderLen = ref(0), bankWords = ref<string[]>([]), placed = ref<string[]>([]), usedIdx = ref<number[]>([])
  // 分类
  const sortCats = ref(gd.value.sortCats || []), sortKey = ref(gd.value.sortKey || ''), sortInst = ref(gd.value.sortInst || ''), sortIdx = ref(0), sortTotal = ref(0)
  const curSortItem = computed(() => allData.value[sortIdx.value])

  // 器官拼图
  const organSystems = computed(() => [...new Set(allData.value.map((d: any) => d.system))])
  const organSelectedSystem = ref<string>('')
  const organBank = ref<any[]>([])       // 打乱的器官卡片
  const organPlaced = ref<any[]>([])     // 已放置的器官（按位置）
  const organUsedIdx = ref<number[]>([]) // 已用器官在 bank 中的索引
  const organShowResult = ref(false)     // 是否显示结果
  const organCorrect = ref(false)

  function showFB(t: 'correct' | 'wrong') {
    fb.value = t
    if (t === 'correct' && combo.value >= 3) { comboEffect.value = true; setTimeout(() => { comboEffect.value = false }, 1000) }
    setTimeout(() => { fb.value = '' }, 800)
  }

  function startGame() {
    started.value = true; score.value = 0; combo.value = 0; maxCombo.value = 0; correctCount.value = 0; wrongCount.value = 0; qIdx.value = 0
    if (['qa-choice', 'qa-fill'].includes(eng.value)) {
      remainingTime.value = 60; timerActive.value = true; totalQ.value = allData.value.length
      timer = setInterval(() => { if (remainingTime.value > 0) remainingTime.value--; else endGame() }, 1000)
    } else if (eng.value === 'poetry') setupPoetry()
    else if (eng.value === 'match') loadMatch()
    else if (eng.value === 'order') loadOrder()
    else if (eng.value === 'sort') sortTotal.value = allData.value.length
    else if (eng.value === 'organ-puzzle') { /* 等待用户选择系统 */ }
  }

  function onChoice(opt: string) {
    if (showRes.value) return; lastSel.value = opt; showRes.value = true
    if (opt === cur.value.answer) { score.value += 10 + combo.value * 2; combo.value++; maxCombo.value = Math.max(maxCombo.value, combo.value); correctCount.value++; showFB('correct') }
    else { combo.value = 0; wrongCount.value++; showFB('wrong') }
    setTimeout(() => { showRes.value = false; lastSel.value = ''; qIdx.value++; if (qIdx.value >= allData.value.length) endGame() }, 1000)
  }

  function onFill() {
    const ans = fillVal.value.trim(); if (!ans) return
    if (ans === cur.value.answer) { score.value += 10 + combo.value * 2; combo.value++; maxCombo.value = Math.max(maxCombo.value, combo.value); correctCount.value++; showFB('correct') }
    else { combo.value = 0; wrongCount.value++; showFB('wrong') }
    fillVal.value = ''; qIdx.value++; if (qIdx.value >= allData.value.length) endGame()
  }

  function setupPoetry() {
    const p = allData.value[qIdx.value]; if (!p?.poem) return
    blankPos.value = []; filledBlanks.value = {}; activeBlank.value = -1; curHint.value = ''; usedWords.value = []
    let from = 0; p.blanks.forEach((b: any) => { const pos = p.poem.indexOf(b.text, from); if (pos >= 0) { blankPos.value.push(pos); from = pos + b.text.length } })
    wordBank.value = shuffle([...p.blanks.map((b: any) => b.text), ...shuffle(['春风', '明月', '青山', '流水', '白云', '秋风', '落日']).slice(0, 4)])
  }
  function focusBlank(pos: number) { activeBlank.value = pos; const idx = blankPos.value.indexOf(pos); if (idx >= 0) curHint.value = allData.value[qIdx.value]?.blanks?.[idx]?.hint || '' }
  function selWord(w: string) {
    if (usedWords.value.includes(w)) return
    if (activeBlank.value < 0) { const n = blankPos.value.find(p => !filledBlanks.value[p]); if (n !== undefined) activeBlank.value = n }
    if (activeBlank.value >= 0) { filledBlanks.value[activeBlank.value] = w; usedWords.value.push(w); const n = blankPos.value.find(p => !filledBlanks.value[p]); if (n !== undefined) { activeBlank.value = n; focusBlank(n) } else checkPoetry() }
  }
  function checkPoetry() {
    const p = allData.value[qIdx.value]; let ok = true; p.blanks.forEach((b: any, i: number) => { if (filledBlanks.value[blankPos.value[i]] !== b.text) ok = false })
    if (ok) { score.value += 30 + combo.value * 5; combo.value++; maxCombo.value = Math.max(maxCombo.value, combo.value); correctCount.value++; showFB('correct') } else { combo.value = 0; wrongCount.value++; showFB('wrong') }
    setTimeout(() => { qIdx.value++; if (qIdx.value >= allData.value.length) endGame(); else setupPoetry() }, 1200)
  }

  // ===== 翻牌记忆游戏 =====
  function loadMatch() {
    const pairs = allData.value.slice(0, 6)
    const cards: FlipCard[] = []
    pairs.forEach((d, i) => {
      cards.push({ id: i * 2, pairId: i, text: d.left, flipped: false, matched: false })
      cards.push({ id: i * 2 + 1, pairId: i, text: d.right, flipped: false, matched: false })
    })
    flipCards.value = shuffle(cards)
    flippedIdx.value = []
    matchedPairs.value = 0
    flipLocked.value = false
    flipMoves.value = 0
  }

  function flipCard(idx: number) {
    if (flipLocked.value) return
    const card = flipCards.value[idx]
    if (card.flipped || card.matched) return

    card.flipped = true
    flippedIdx.value.push(idx)
    flipMoves.value++

    if (flippedIdx.value.length === 2) {
      flipLocked.value = true
      const [a, b] = flippedIdx.value
      const cardA = flipCards.value[a]
      const cardB = flipCards.value[b]

      if (cardA.pairId === cardB.pairId) {
        // 配对成功
        setTimeout(() => {
          cardA.matched = true
          cardB.matched = true
          matchedPairs.value++
          score.value += 20 + combo.value * 3
          combo.value++
          maxCombo.value = Math.max(maxCombo.value, combo.value)
          correctCount.value++
          showFB('correct')
          flippedIdx.value = []
          flipLocked.value = false
          if (matchedPairs.value >= 6) {
            // 额外奖励：步数越少分越多
            const bonus = Math.max(0, (18 - flipMoves.value) * 5)
            score.value += bonus
            setTimeout(() => endGame(), 800)
          }
        }, 500)
      } else {
        // 配对失败
        combo.value = 0
        wrongCount.value++
        showFB('wrong')
        setTimeout(() => {
          cardA.flipped = false
          cardB.flipped = false
          flippedIdx.value = []
          flipLocked.value = false
        }, 800)
      }
    }
  }

  function loadOrder() { const d = allData.value[qIdx.value]; orderLen.value = d.words.length; bankWords.value = shuffle(d.words); placed.value = []; usedIdx.value = [] }
  function onPlaceWord(i: number) { placeWord(bankWords.value, placed.value, usedIdx.value, i) }
  function onUnplaceWord(pi: number) { unplaceWord(placed.value, usedIdx.value, bankWords.value, pi) }
  function checkOrderResult() {
    const d = allData.value[qIdx.value]; const ok = checkOrder(placed.value, d.answer)
    if (ok) { score.value += 25 + combo.value * 5; combo.value++; maxCombo.value = Math.max(maxCombo.value, combo.value); correctCount.value++; showFB('correct') } else { combo.value = 0; wrongCount.value++; showFB('wrong') }
    qIdx.value++; if (qIdx.value < allData.value.length) loadOrder(); else endGame()
  }

  // ===== 器官拼图 =====
  function selectOrganSystem(sys: string) {
    organSelectedSystem.value = sys
    const organs = allData.value.filter((d: any) => d.system === sys)
    organBank.value = shuffle(organs)
    organPlaced.value = organs.map(() => null)
    organUsedIdx.value = []
    organShowResult.value = false
    organCorrect.value = false
  }

  function placeOrgan(bankIdx: number) {
    if (organUsedIdx.value.includes(bankIdx) || organShowResult.value) return
    const emptyIdx = organPlaced.value.findIndex(p => p === null)
    if (emptyIdx >= 0) {
      organPlaced.value[emptyIdx] = organBank.value[bankIdx]
      organUsedIdx.value.push(bankIdx)
    }
  }

  function unplaceOrgan(slotIdx: number) {
    if (organShowResult.value) return
    const organ = organPlaced.value[slotIdx]
    if (!organ) return
    const bankIdx = organBank.value.findIndex(o => o === organ)
    organPlaced.value[slotIdx] = null
    organUsedIdx.value = organUsedIdx.value.filter(i => i !== bankIdx)
  }

  function checkOrganResult() {
    const organs = allData.value.filter((d: any) => d.system === organSelectedSystem.value).sort((a: any, b: any) => a.order - b.order)
    organCorrect.value = organPlaced.value.every((p, i) => p && p.name === organs[i].name)
    organShowResult.value = true
    if (organCorrect.value) {
      score.value += 40 + combo.value * 5; combo.value++; maxCombo.value = Math.max(maxCombo.value, combo.value); correctCount.value++
    } else {
      combo.value = 0; wrongCount.value++
    }
    showFB(organCorrect.value ? 'correct' : 'wrong')
  }

  function nextOrganSystem() {
    organSelectedSystem.value = ''
    organBank.value = []; organPlaced.value = []; organUsedIdx.value = []
    organShowResult.value = false; organCorrect.value = false
    qIdx.value++
    if (qIdx.value >= organSystems.value.length) endGame()
  }

  function onSort(cat: string) {
    const item = allData.value[sortIdx.value]; if (!item) return
    if (item.category === cat) { score.value += 15 + combo.value * 3; combo.value++; maxCombo.value = Math.max(maxCombo.value, combo.value); correctCount.value++; showFB('correct') }
    else { combo.value = 0; wrongCount.value++; showFB('wrong') }
    sortIdx.value++; if (sortIdx.value >= allData.value.length) endGame()
  }

  async function endGame() {
    if (timer) clearInterval(timer); timerActive.value = false
    await gamesStore.recordGame({ subject: subjectType.value, gameId: gameId.value, gameName: gameConfig.value?.name || '', score: score.value, duration: 60 - remainingTime.value, difficulty: gameConfig.value?.difficulty || 2, createTime: new Date().toISOString() })
    router.replace(`/games/${subjectType.value}/${gameId.value}/result?score=${score.value}&correct=${correctCount.value}&wrong=${wrongCount.value}&combo=${maxCombo.value}`)
  }

  function destroy() { if (timer) clearInterval(timer) }

  return {
    gameConfig, subjectColor, diffText, started, score, combo, maxCombo, correctCount, wrongCount, remainingTime, timerActive, qIdx, totalQ, fb, showRes, lastSel, fillVal, comboEffect,
    eng, cur, rulesText, fmtTime, allData, progressPercent,
    blankPos, filledBlanks, activeBlank, curHint, wordBank, usedWords,
    flipCards, flippedIdx, matchedPairs, flipLocked, flipMoves, flipCard,
    orderLen, bankWords, placed, usedIdx,
    sortCats, sortKey, sortInst, sortIdx, sortTotal, curSortItem,
    organSystems, organSelectedSystem, organBank, organPlaced, organUsedIdx, organShowResult, organCorrect,
    startGame, onChoice, onFill, focusBlank, selWord,
    onPlaceWord, onUnplaceWord, checkOrderResult, onSort, endGame, destroy,
    selectOrganSystem, placeOrgan, unplaceOrgan, checkOrganResult, nextOrganSystem,
  }
}
