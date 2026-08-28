import type { SubjectConfig } from '@/types'
import { chineseUnits } from './units'
import { chineseRecitations } from './recitations'
import { chineseExtraExercises } from './extraExercises'

export { chineseRecitations, chineseExtraExercises }

export const chineseConfig: SubjectConfig = {
  type: 'chinese',
  name: '语文',
  icon: 'edit',
  color: '#FF8C42',
  bgColor: '#FFF5EE',
  units: chineseUnits,
}
