import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SubjectConfig, SubjectType, Question } from '@/types'
import { chineseConfig, chineseExtraExercises } from '@/data/chinese'
import { mathConfig, mathExtraExercises } from '@/data/math'
import { englishConfig, englishExtraExercises } from '@/data/english'
import { scienceConfig, scienceExtraExercises } from '@/data/science'

const extraExercisesMap: Record<SubjectType, Question[]> = {
  chinese: chineseExtraExercises,
  math: mathExtraExercises,
  english: englishExtraExercises,
  science: scienceExtraExercises,
}

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

  // 获取某学科所有练习题（单元内复习题 + 补充练习题）
  function getAllQuestions(type: SubjectType): Question[] {
    const units = subjects.value[type].units
    const unitQuestions: Question[] = []
    units.forEach(u => {
      u.lessons.forEach(l => {
        if (l.reviewContent?.exercises) {
          unitQuestions.push(...l.reviewContent.exercises)
        }
      })
    })
    const extras = extraExercisesMap[type] || []
    return [...unitQuestions, ...extras]
  }

  // 获取某学科某单元的练习题（含补充题）
  function getUnitQuestions(type: SubjectType, unitId: number): Question[] {
    const unit = getUnit(type, unitId)
    const unitQuestions: Question[] = []
    unit?.lessons.forEach(l => {
      if (l.reviewContent?.exercises) {
        unitQuestions.push(...l.reviewContent.exercises)
      }
    })
    const extras = (extraExercisesMap[type] || []).filter(q => q.unit === unitId)
    return [...unitQuestions, ...extras]
  }

  return { subjects, getSubject, getUnit, getLesson, getAllQuestions, getUnitQuestions }
})
