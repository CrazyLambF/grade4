import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SubjectConfig, SubjectType } from '@/types'
import { chineseConfig } from '@/data/chinese'
import { mathConfig } from '@/data/math'
import { englishConfig } from '@/data/english'
import { scienceConfig } from '@/data/science'

export const useSubjectStore = defineStore('subject', () => {
  const subjects = ref<Record<SubjectType, SubjectConfig>>({
    chinese: chineseConfig,
    math: mathConfig,
    english: englishConfig,
    science: scienceConfig,
  })

  function getSubject(type: SubjectType): SubjectConfig {
    return subjects.value[type]
  }

  function getUnit(type: SubjectType, unitId: number) {
    return subjects.value[type].units.find(u => u.id === unitId)
  }

  function getLesson(type: SubjectType, unitId: number, lessonId: number) {
    const unit = getUnit(type, unitId)
    return unit?.lessons.find(l => l.id === lessonId)
  }

  return { subjects, getSubject, getUnit, getLesson }
})
