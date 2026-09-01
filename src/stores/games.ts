import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { GameRecord, GameScore, SubjectType, GameConfig } from '@/types'
import { addGameRecord, getGameRecords, getBestGameScore } from '@/composables/useDB'

// 游戏配置
export const gameConfigs: GameConfig[] = [
  // 语文
  { id: 'poetry-fill', subject: 'chinese', name: '古诗背诵填字', icon: 'edit', description: '从必背古诗中挖空填字', difficulty: 2, estimatedTime: 120 },
  { id: 'quick-qa', subject: 'chinese', name: '快问快答', icon: 'question-o', description: '60秒文学常识挑战', difficulty: 2, estimatedTime: 60 },
  { id: 'idiom-chain', subject: 'chinese', name: '成语接龙闯关', icon: 'cluster-o', description: '成语接龙连击得分', difficulty: 3, estimatedTime: 180 },
  { id: 'word-match', subject: 'chinese', name: '词语消消乐', icon: 'apps-o', description: '近义词反义词配对消除', difficulty: 1, estimatedTime: 120 },
  // 数学
  { id: 'math-minute', subject: 'math', name: '一分钟快问快答', icon: 'clock-o', description: '60秒口算挑战', difficulty: 2, estimatedTime: 60 },
  { id: 'angle-challenge', subject: 'math', name: '角度大挑战', icon: 'aim', description: '拖动量角器测量角度', difficulty: 2, estimatedTime: 180 },
  { id: 'formula-clear', subject: 'math', name: '算式消消乐', icon: 'apps-o', description: '拖拽拼成正确等式', difficulty: 2, estimatedTime: 150 },
  { id: 'shape-sort', subject: 'math', name: '图形分类大冒险', icon: 'cluster-o', description: '限时图形分类挑战', difficulty: 1, estimatedTime: 90 },
  // 英语
  { id: 'word-clear', subject: 'english', name: '单词消消乐', icon: 'apps-o', description: '中英单词配对消除', difficulty: 1, estimatedTime: 120 },
  { id: 'listen-pick', subject: 'english', name: '听音选词', icon: 'service-o', description: '听发音选正确单词', difficulty: 2, estimatedTime: 90 },
  { id: 'sentence-order', subject: 'english', name: '句子排排队', icon: 'bars', description: '排列单词组成正确句子', difficulty: 2, estimatedTime: 150 },
  { id: 'rhyme-master', subject: 'english', name: '押韵小达人', icon: 'music-o', description: '选出押韵单词', difficulty: 2, estimatedTime: 90 },
  // 科学
  { id: 'sound-connect', subject: 'science', name: '声音传播连线', icon: 'link-o', description: '声音特性与因素配对', difficulty: 2, estimatedTime: 120 },
  { id: 'food-sort', subject: 'science', name: '食物营养分类', icon: 'gift-o', description: '食物拖入营养类别框', difficulty: 1, estimatedTime: 120 },
  { id: 'organ-puzzle', subject: 'science', name: '器官拼图', icon: 'cluster-o', description: '拼装人体器官并了解功能', difficulty: 3, estimatedTime: 180 },
  { id: 'air-lab', subject: 'science', name: '空气实验台', icon: 'aim', description: '空气性质趣味问答', difficulty: 3, estimatedTime: 180 },
]

export const useGamesStore = defineStore('games', () => {
  const gameHistory = ref<GameRecord[]>([])
  const scores = ref<Record<string, GameScore>>({})
  const totalScore = computed(() => {
    return Object.values(scores.value).reduce((sum, s) => sum + s.totalScore, 0)
  })

  function getGamesBySubject(subject: SubjectType): GameConfig[] {
    return gameConfigs.filter(g => g.subject === subject)
  }

  function getGameConfig(gameId: string): GameConfig | undefined {
    return gameConfigs.find(g => g.id === gameId)
  }

  async function recordGame(record: Omit<GameRecord, 'id'>) {
    await addGameRecord(record as GameRecord)
    // 更新积分
    const subject = record.subject
    if (!scores.value[subject]) {
      scores.value[subject] = {
        subject,
        totalScore: 0,
        playCount: 0,
        bestScores: {},
        achievements: [],
      }
    }
    scores.value[subject].totalScore += record.score
    scores.value[subject].playCount += 1
    const prev = scores.value[subject].bestScores[record.gameId] ?? 0
    if (record.score > prev) {
      scores.value[subject].bestScores[record.gameId] = record.score
    }
    await loadGameHistory(subject)
  }

  async function loadGameHistory(subject?: SubjectType) {
    gameHistory.value = await getGameRecords(subject)
  }

  async function getBestScore(subject: string, gameId: string): Promise<number> {
    return await getBestGameScore(subject, gameId)
  }

  function getAchievements(subject: SubjectType): string[] {
    return scores.value[subject]?.achievements ?? []
  }

  return { gameHistory, scores, totalScore, getGamesBySubject, getGameConfig, recordGame, loadGameHistory, getBestScore, getAchievements }
})
