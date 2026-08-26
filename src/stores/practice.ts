import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Question, StudyRecord } from '@/types'
import {
  addStudyRecord,
  getStudyRecordsByDate,
  getStudyRecordsByDateRange,
} from '@/composables/useDB'

export const usePracticeStore = defineStore('practice', () => {
  const todayRecords = ref<StudyRecord[]>([])

  async function recordStudy(record: Omit<StudyRecord, 'id'>) {
    await addStudyRecord(record as StudyRecord)
    await loadTodayRecords()
  }

  async function loadTodayRecords() {
    const today = new Date().toISOString().split('T')[0]
    todayRecords.value = await getStudyRecordsByDate(today)
  }

  async function getRecordsByDateRange(startDate: string, endDate: string) {
    return await getStudyRecordsByDateRange(startDate, endDate)
  }

  function generateWeeklyQuestions(allQuestions: Question[], count: number = 15): Question[] {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, Math.min(count, shuffled.length))
  }

  function generateMonthlyQuestions(allQuestions: Question[], count: number = 30): Question[] {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, Math.min(count, shuffled.length))
  }

  return { todayRecords, recordStudy, loadTodayRecords, getRecordsByDateRange, generateWeeklyQuestions, generateMonthlyQuestions }
})
