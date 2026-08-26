import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { MistakeRecord, SubjectType } from '@/types'
import { addMistake, getMistakesBySubject, markMistakeMastered } from '@/composables/useDB'

export const useMistakesStore = defineStore('mistakes', () => {
  const mistakes = ref<MistakeRecord[]>([])
  const mistakesBySubject = ref<Record<string, MistakeRecord[]>>({})

  async function addMistakeRecord(record: Omit<MistakeRecord, 'id'>) {
    await addMistake(record as MistakeRecord)
  }

  async function loadMistakesBySubject(subject: SubjectType) {
    const list = await getMistakesBySubject(subject)
    mistakesBySubject.value[subject] = list
    return list
  }

  async function loadAllMistakes() {
    const subjects: SubjectType[] = ['chinese', 'math', 'english', 'science']
    const all: MistakeRecord[] = []
    for (const s of subjects) {
      const list = await getMistakesBySubject(s)
      all.push(...list)
    }
    mistakes.value = all
    return all
  }

  async function markMastered(id: number) {
    await markMistakeMastered(id)
  }

  function getCountBySubject(subject: SubjectType): number {
    return mistakesBySubject.value[subject]?.length ?? 0
  }

  return { mistakes, mistakesBySubject, addMistakeRecord, loadMistakesBySubject, loadAllMistakes, markMastered, getCountBySubject }
})
