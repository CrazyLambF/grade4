// 学科类型
export type SubjectType = 'chinese' | 'math' | 'english' | 'science'

// 题型
export type QuestionType = 'choice' | 'fill' | 'judge' | 'match' | 'calculate' | 'reading'

// 难度
export type Difficulty = 1 | 2 | 3 // 简单/中等/困难

// 题目来源
export type QuestionSource = 'preview' | 'review' | 'weekly' | 'monthly'

// 题目接口
export interface Question {
  id: string
  subject: SubjectType
  unit: number
  lesson?: number
  type: QuestionType
  difficulty: Difficulty
  content: string
  options?: string[]
  answer: string | string[]
  analysis: string
  knowledgePoints: string[]
  source?: QuestionSource
}

// 连线题选项对
export interface MatchPair {
  left: string
  right: string
}

// 单元目录
export interface UnitItem {
  id: number
  title: string
  lessons: LessonItem[]
}

// 课文/章节
export interface LessonItem {
  id: number
  title: string
  previewContent?: PreviewContent
  reviewContent?: ReviewContent
}

// 预习内容
export interface PreviewContent {
  guide: string // 预习导学
  keyPoints: string[] // 预习要点
  newWords?: WordItem[] // 生字词（语文）
  audioUrl?: string // 音频地址
  concepts?: ConceptItem[] // 核心概念（数学/科学）
  words?: EnglishWord[] // 单词（英语）
}

// 生字
export interface WordItem {
  word: string
  pinyin: string
  strokes?: number
  meaning: string
  phrases: string[]
}

// 核心概念
export interface ConceptItem {
  title: string
  description: string
  example?: string
}

// 英语单词
export interface EnglishWord {
  word: string
  phonetic: string
  meaning: string
  audioUrl?: string
}

// 复习内容
export interface ReviewContent {
  knowledgeMap: KnowledgeNode[] // 知识点梳理
  keyPoints: string[] // 重点归纳
  commonMistakes: string[] // 易错点
  exercises: Question[] // 复习题
}

// 知识点节点
export interface KnowledgeNode {
  title: string
  content: string
  children?: KnowledgeNode[]
}

// 学习记录
export interface StudyRecord {
  id?: number
  date: string // YYYY-MM-DD
  subject: SubjectType
  type: 'preview' | 'review' | 'weekly' | 'monthly' | 'game'
  duration: number // 秒
  unit?: number
  lesson?: number
  score?: number
  correctRate?: number
  completed: boolean
}

// 错题记录
export interface MistakeRecord {
  id?: number
  questionId: string
  subject: SubjectType
  userAnswer: string | string[]
  source: string
  createTime: string
  retryCount: number
  mastered: boolean
  question: Question
}

// 周练记录
export interface PracticeRecord {
  id?: number
  type: 'weekly' | 'monthly'
  round: number // 第几周/月
  subject: SubjectType
  score: number
  correctRate: number
  totalQuestions: number
  correctCount: number
  duration: number
  createTime: string
  answers: PracticeAnswer[]
}

// 答题记录
export interface PracticeAnswer {
  questionId: string
  userAnswer: string | string[]
  correct: boolean
}

// 游戏记录
export interface GameRecord {
  id?: number
  subject: SubjectType
  gameId: string
  gameName: string
  score: number
  duration: number
  difficulty: Difficulty
  createTime: string
}

// 游戏积分
export interface GameScore {
  subject: SubjectType
  totalScore: number
  playCount: number
  bestScores: Record<string, number> // gameId -> best score
  achievements: string[] // 成就列表
}

// 用户信息
export interface UserInfo {
  id?: number
  name: string
  school?: string
  grade: string
  semester: string
  createdAt: string
  currentUnit: Record<SubjectType, number> // 各科当前进度
  streakDays: number
  lastStudyDate: string
}

// 学科配置
export interface SubjectConfig {
  type: SubjectType
  name: string
  icon: string
  color: string
  bgColor: string
  units: UnitItem[]
}

// 游戏配置
export interface GameConfig {
  id: string
  subject: SubjectType
  name: string
  icon: string
  description: string
  difficulty: Difficulty
  estimatedTime: number // 预计游戏时长（秒）
}
