import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserInfo, SubjectType } from '@/types'
import { getUserInfo, saveUserInfo } from '@/composables/useDB'

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
      const updated = { ...userInfo.value, ...info }
      await saveUserInfo(updated)
      userInfo.value = updated
    }
  }

  async function updateUnitProgress(subject: SubjectType, unit: number) {
    if (userInfo.value) {
      userInfo.value.currentUnit[subject] = unit
      await saveUserInfo(userInfo.value)
    }
  }

  async function checkStreak() {
    if (!userInfo.value) return
    const today = new Date().toISOString().split('T')[0]
    if (userInfo.value.lastStudyDate === today) return

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
    if (userInfo.value.lastStudyDate === yesterday) {
      userInfo.value.streakDays += 1
    } else {
      userInfo.value.streakDays = 1
    }
    userInfo.value.lastStudyDate = today
    await saveUserInfo(userInfo.value)
  }

  return { userInfo, isLoggedIn, loadUser, updateUser, updateUnitProgress, checkStreak }
})
