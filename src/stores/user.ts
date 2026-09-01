import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserInfo, SubjectType } from '@/types'
import { getUserInfo, saveUserInfo } from '@/composables/useDB'

// 深拷贝脱壳：确保不把 Vue 响应式 Proxy 传给 IndexedDB
function toPlain<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo | null>(null)
  const isLoggedIn = computed(() => userInfo.value !== null)

  async function loadUser() {
    const info = await getUserInfo()
    if (info) {
      userInfo.value = info
    } else {
      // 初始化默认用户
      const defaultUser: UserInfo = {
        name: '同学',
        grade: '四年级',
        semester: '上册',
        createdAt: new Date().toISOString(),
        currentUnit: { chinese: 1, math: 1, english: 1, science: 1 },
        streakDays: 0,
        lastStudyDate: '',
      }
      await saveUserInfo(defaultUser)
      userInfo.value = defaultUser
    }
  }

  async function updateUser(info: Partial<UserInfo>) {
    if (userInfo.value) {
      const updated = toPlain({ ...userInfo.value, ...info })
      await saveUserInfo(updated)
      userInfo.value = updated
    }
  }

  async function updateUnitProgress(subject: SubjectType, unit: number) {
    if (userInfo.value) {
      const plain = toPlain(userInfo.value)
      plain.currentUnit[subject] = unit
      await saveUserInfo(plain)
      userInfo.value = plain
    }
  }

  // 批量更新多个学科进度（避免并发调用 updateUnitProgress 时的竞态条件）
  async function updateMultipleUnitProgress(progress: Record<SubjectType, number>) {
    if (userInfo.value) {
      const plain = toPlain(userInfo.value)
      console.log('[updateMultipleUnitProgress] before:', JSON.stringify(plain.currentUnit), 'applying:', JSON.stringify(progress))
      Object.entries(progress).forEach(([k, v]) => {
        plain.currentUnit[k as SubjectType] = v
      })
      console.log('[updateMultipleUnitProgress] after:', JSON.stringify(plain.currentUnit))
      await saveUserInfo(plain)
      userInfo.value = plain
      console.log('[updateMultipleUnitProgress] userInfo.value updated, id =', plain.id)
    } else {
      console.warn('[updateMultipleUnitProgress] userInfo.value is null!')
    }
  }

  async function checkStreak() {
    if (!userInfo.value) return
    const today = new Date().toISOString().split('T')[0]
    if (userInfo.value.lastStudyDate === today) return

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
    const plain = toPlain(userInfo.value)
    if (plain.lastStudyDate === yesterday) {
      plain.streakDays += 1
    } else {
      plain.streakDays = 1
    }
    plain.lastStudyDate = today
    await saveUserInfo(plain)
    userInfo.value = plain
  }

  return { userInfo, isLoggedIn, loadUser, updateUser, updateUnitProgress, updateMultipleUnitProgress, checkStreak }
})
