import Dexie, { type Table } from 'dexie'
import type { StudyRecord, MistakeRecord, PracticeRecord, GameRecord, UserInfo } from '@/types'

export class StudyDB extends Dexie {
  studyRecords!: Table<StudyRecord, number>
  mistakes!: Table<MistakeRecord, number>
  practices!: Table<PracticeRecord, number>
  gameRecords!: Table<GameRecord, number>
  userInfo!: Table<UserInfo, number>

  constructor() {
    super('sxsxxb_db')
    this.version(1).stores({
      studyRecords: '++id, date, subject, type, completed',
      mistakes: '++id, questionId, subject, mastered, createTime',
      practices: '++id, type, round, subject, createTime',
      gameRecords: '++id, subject, gameId, score, createTime',
      userInfo: '++id',
    })
  }
}

export const db = new StudyDB()

// 深拷贝脱壳：将 Vue 响应式对象转为普通对象，避免 IndexedDB DataCloneError
function toRaw<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

// 用户信息操作
export async function getUserInfo(): Promise<UserInfo | undefined> {
  return await db.userInfo.toCollection().first()
}

export async function saveUserInfo(info: UserInfo): Promise<number> {
  const raw = toRaw(info)
  const existing = await getUserInfo()
  if (existing && existing.id !== undefined) {
    // 用 put 完整替换，避免 update/modify 内部的合并操作触发 DataCloneError
    return await db.userInfo.put({ ...raw, id: existing.id })
  }
  return await db.userInfo.add(raw)
}

// 学习记录操作
export async function addStudyRecord(record: StudyRecord): Promise<number> {
  return await db.studyRecords.add(toRaw(record))
}

export async function getStudyRecordsByDate(date: string): Promise<StudyRecord[]> {
  return await db.studyRecords.where('date').equals(date).toArray()
}

export async function getStudyRecordsByDateRange(startDate: string, endDate: string): Promise<StudyRecord[]> {
  return await db.studyRecords.where('date').between(startDate, endDate, true, true).toArray()
}

// 错题操作
export async function addMistake(record: MistakeRecord): Promise<number> {
  const existing = await db.mistakes.where('questionId').equals(record.questionId).first()
  if (existing) {
    return await db.mistakes.update(existing.id!, { retryCount: existing.retryCount + 1, mastered: false })
  }
  return await db.mistakes.add(toRaw(record))
}

export async function getMistakesBySubject(subject: string): Promise<MistakeRecord[]> {
  return await db.mistakes.where('subject').equals(subject).and(m => !m.mastered).toArray()
}

export async function getAllMistakes(): Promise<MistakeRecord[]> {
  // Dexie 的 where().equals() 不支持 boolean false，用 .and() 过滤
  return await db.mistakes.filter(m => !m.mastered).toArray()
}

export async function markMistakeMastered(id: number): Promise<void> {
  await db.mistakes.update(id, { mastered: true })
}

// 练习记录操作
export async function addPracticeRecord(record: PracticeRecord): Promise<number> {
  return await db.practices.add(toRaw(record))
}

export async function getPracticeRecords(type: string): Promise<PracticeRecord[]> {
  return await db.practices.where('type').equals(type).reverse().sortBy('createTime')
}

export async function getPracticeRecord(id: number): Promise<PracticeRecord | undefined> {
  return await db.practices.get(id)
}

// 游戏记录操作
export async function addGameRecord(record: GameRecord): Promise<number> {
  return await db.gameRecords.add(toRaw(record))
}

export async function getGameRecords(subject?: string): Promise<GameRecord[]> {
  if (subject) {
    return await db.gameRecords.where('subject').equals(subject).reverse().sortBy('createTime')
  }
  return await db.gameRecords.reverse().sortBy('createTime')
}

export async function getBestGameScore(subject: string, gameId: string): Promise<number> {
  const records = await db.gameRecords
    .where('subject').equals(subject)
    .and(r => r.gameId === gameId)
    .toArray()
  return records.length > 0 ? Math.max(...records.map(r => r.score)) : 0
}

// 数据导出导入
export async function exportAllData(): Promise<string> {
  const data = {
    studyRecords: await db.studyRecords.toArray(),
    mistakes: await db.mistakes.toArray(),
    practices: await db.practices.toArray(),
    gameRecords: await db.gameRecords.toArray(),
    userInfo: await db.userInfo.toArray(),
    exportDate: new Date().toISOString(),
  }
  return JSON.stringify(data, null, 2)
}

// 验证导入数据结构：每个字段必须是数组
function validateImportData(data: unknown): data is Record<string, unknown[]> {
  if (!data || typeof data !== 'object') return false
  const obj = data as Record<string, unknown>
  const requiredKeys = ['studyRecords', 'mistakes', 'practices', 'gameRecords', 'userInfo']
  for (const key of requiredKeys) {
    if (key in obj && !Array.isArray(obj[key])) return false
  }
  return true
}

export async function importAllData(jsonStr: string): Promise<{ success: boolean; message: string }> {
  let data: unknown
  try {
    data = JSON.parse(jsonStr)
  } catch {
    return { success: false, message: 'JSON 格式无效，无法解析' }
  }
  if (!validateImportData(data)) {
    return { success: false, message: '数据结构不正确，缺少必要字段' }
  }
  const d = data as { studyRecords?: unknown[]; mistakes?: unknown[]; practices?: unknown[]; gameRecords?: unknown[]; userInfo?: unknown[] }
  await db.transaction('rw', db.studyRecords, db.mistakes, db.practices, db.gameRecords, db.userInfo, async () => {
    await db.studyRecords.clear()
    await db.mistakes.clear()
    await db.practices.clear()
    await db.gameRecords.clear()
    await db.userInfo.clear()
    if (d.studyRecords) await db.studyRecords.bulkAdd(d.studyRecords as StudyRecord[])
    if (d.mistakes) await db.mistakes.bulkAdd(d.mistakes as MistakeRecord[])
    if (d.practices) await db.practices.bulkAdd(d.practices as PracticeRecord[])
    if (d.gameRecords) await db.gameRecords.bulkAdd(d.gameRecords as GameRecord[])
    if (d.userInfo) await db.userInfo.bulkAdd(d.userInfo as UserInfo[])
  })
  return { success: true, message: '数据导入成功' }
}
