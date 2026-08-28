// 游戏排列引擎和分类引擎的辅助函数
export function placeWord(bankWords: string[], placed: string[], usedIdx: number[], i: number) {
  if (usedIdx.includes(i)) return
  placed.push(bankWords[i])
  usedIdx.push(i)
}

export function unplaceWord(placed: string[], usedIdx: number[], bankWords: string[], pi: number) {
  if (!placed[pi]) return
  const w = placed.splice(pi, 1)[0]
  const bi = bankWords.indexOf(w)
  const ui = usedIdx.indexOf(bi)
  if (ui >= 0) usedIdx.splice(ui, 1)
}

export function checkOrder(placed: string[], answer: string): boolean {
  return placed.join(' ') === answer
}
