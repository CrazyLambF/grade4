import {
  poetryFillData, chineseQAData, idiomChainData, wordMatchData,
  mathMinuteData, angleChallengeData, formulaClearData, shapeSortData,
  wordClearData, listenPickData, sentenceOrderData, rhymeMasterData,
  soundConnectData, foodSortData, organPuzzleData, forceLabData,
} from '@/data/games'

function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5) }

export function getGameData(gameId: string): { engine: string; data: any[]; sortCats?: string[]; sortKey?: string; sortInst?: string } {
  switch (gameId) {
    case 'quick-qa': return { engine: 'qa-choice', data: shuffle(chineseQAData) }
    case 'math-minute': return { engine: 'qa-fill', data: shuffle(mathMinuteData) }
    case 'listen-pick': return { engine: 'qa-choice', data: shuffle(listenPickData).map(d => ({ q: `听发音 [${d.phonetic}] 选词`, options: d.options, answer: d.answer })) }
    case 'rhyme-master': return { engine: 'qa-choice', data: shuffle(rhymeMasterData).map(d => ({ q: `选出与 "${d.word}" 押韵的单词`, options: d.options, answer: d.answer })) }
    case 'angle-challenge': return { engine: 'qa-choice', data: shuffle(angleChallengeData).map(d => ({ q: `${d.angle}°是什么角？`, options: ['锐角', '直角', '钝角', '平角', '周角'], answer: d.type })) }
    case 'formula-clear': return { engine: 'qa-choice', data: shuffle(formulaClearData) }
    case 'idiom-chain': return { engine: 'qa-choice', data: shuffle(idiomChainData).map(d => ({ q: `"${d.current}"接哪个成语？`, options: d.options, answer: d.answer })) }
    case 'force-lab': return { engine: 'qa-choice', data: shuffle(forceLabData) }
    case 'poetry-fill': return { engine: 'poetry', data: shuffle(poetryFillData) }
    case 'word-match': return { engine: 'match', data: wordMatchData.map(d => ({ left: d.left, right: d.right })) }
    case 'word-clear': return { engine: 'match', data: wordClearData.map(d => ({ left: d.left, right: d.right })) }
    case 'sound-connect': return { engine: 'match', data: soundConnectData.map(d => ({ left: d.left, right: d.right })) }
    case 'sentence-order': return { engine: 'order', data: shuffle(sentenceOrderData) }
    case 'organ-puzzle': return { engine: 'organ-puzzle', data: organPuzzleData }
    case 'shape-sort': return { engine: 'sort', data: shuffle(shapeSortData), sortCats: ['平行四边形', '梯形', '三角形'], sortKey: 'name', sortInst: '将图形归入类别' }
    case 'food-sort': return { engine: 'sort', data: shuffle(foodSortData), sortCats: ['碳水', '蛋白质', '脂肪', '维生素'], sortKey: 'food', sortInst: '将食物归入营养类别' }
    default: return { engine: 'qa-choice', data: [] }
  }
}
