<template>
  <div class="page-container profile-page">
    <van-nav-bar title="我的" />
    <div class="content">
      <!-- 用户信息 -->
      <div class="card user-card">
        <div class="avatar">
          <van-icon name="user-o" size="36" color="#4E8AF2" />
        </div>
        <div class="user-info">
          <h3 class="user-name">{{ userInfo?.name || '同学' }}</h3>
          <p class="user-meta">{{ userInfo?.grade || '四年级' }} · {{ userInfo?.semester || '上册' }}</p>
          <div class="streak-info">
            <van-icon name="fire-o" size="14" color="#FAAD14" />
            <span>连续学习 {{ userInfo?.streakDays || 0 }} 天</span>
          </div>
        </div>
        <van-button size="mini" plain type="primary" @click="editName = true">编辑</van-button>
      </div>

      <!-- 学习进度 -->
      <div class="section-title">学习进度</div>
      <div class="card">
        <div v-for="s in subjects" :key="s.type" class="progress-row">
          <van-icon :name="s.icon" size="18" :color="s.color" />
          <span class="progress-name">{{ s.name }}</span>
          <div class="progress-bar-wrap">
            <div class="progress-bar" :style="{ width: getProgress(s.type) + '%', background: s.color }"></div>
          </div>
          <span class="progress-text">{{ currentUnit(s.type) }}/{{ s.units.length }}</span>
        </div>
      </div>

      <!-- 功能列表 -->
      <div class="section-title">设置</div>
      <van-cell-group inset>
        <van-cell title="教材进度设置" icon="setting-o" is-link @click="showProgressSetting = true" />
        <van-cell title="数据备份" icon="down" is-link @click="exportData" />
        <van-cell title="数据恢复" icon="upgrade" is-link @click="importData" />
        <van-cell title="清空学习记录" icon="delete-o" is-link @click="clearData" />
      </van-cell-group>

      <div class="section-title">关于</div>
      <van-cell-group inset>
        <van-cell title="关于四上学习帮" icon="info-o" is-link @click="showAbout = true" />
        <van-cell title="使用指南" icon="question-o" is-link @click="showGuide = true" />
      </van-cell-group>

      <p class="version-text">四上学习帮 v1.0.0</p>
    </div>

    <!-- 编辑姓名 -->
    <van-dialog v-model:show="editName" title="编辑姓名" show-cancel-button @confirm="saveName">
      <van-field v-model="tempName" placeholder="请输入姓名" style="margin: 16px;" />
    </van-dialog>

    <!-- 进度设置 -->
    <van-popup v-model:show="showProgressSetting" position="bottom" round>
      <div class="popup-content">
        <h3>教材进度设置</h3>
        <div v-for="s in subjects" :key="s.type" class="progress-setting-item">
          <span class="setting-name" :style="{ color: s.color }">{{ s.name }}</span>
          <van-stepper v-model="tempProgress[s.type]" :min="1" :max="s.units.length" />
        </div>
        <van-button type="primary" block round color="#4E8AF2" @click="saveProgress" style="margin-top: 16px;">保存</van-button>
      </div>
    </van-popup>

    <!-- 关于 -->
    <van-dialog v-model:show="showAbout" title="关于四上学习帮">
      <div class="about-text">
        <p>四上学习帮 v1.0.0</p>
        <p>杭州小学四年级（上）学习辅助应用</p>
        <p>涵盖语文、数学、英语、科学四学科</p>
        <p>功能：预习、复习、周周练、月月练、错题本、放松游戏</p>
        <p>数据本地存储，无需账号</p>
      </div>
    </van-dialog>

    <!-- 使用指南 -->
    <van-dialog v-model:show="showGuide" title="使用指南">
      <div class="about-text">
        <p>1. 首页查看今日任务和快捷入口</p>
        <p>2. 进入学科模块预习和复习</p>
        <p>3. 每周完成周周练巩固知识</p>
        <p>4. 每月完成月月练模拟考试</p>
        <p>5. 错题自动收录到错题本</p>
        <p>6. 学习累了玩放松游戏</p>
        <p>7. 统计页查看学习进度和成绩</p>
      </div>
    </van-dialog>

    <!-- 隐藏的文件输入 -->
    <input ref="fileInput" type="file" accept=".json" style="display:none" @change="onFileSelected" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { showConfirmDialog, showToast } from 'vant'
import { useUserStore } from '@/stores/user'
import { useSubjectStore } from '@/stores/subject'
import { exportAllData, importAllData } from '@/composables/useDB'
import { db } from '@/composables/useDB'
import type { SubjectType } from '@/types'

const userStore = useUserStore()
const subjectStore = useSubjectStore()

const subjects = computed(() => Object.values(subjectStore.subjects))
const userInfo = computed(() => userStore.userInfo)

const editName = ref(false)
const tempName = ref('')
const showProgressSetting = ref(false)
const tempProgress = ref<Record<string, number>>({ chinese: 1, math: 1, english: 1, science: 1 })
const showAbout = ref(false)
const showGuide = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

function currentUnit(type: SubjectType) { return userInfo.value?.currentUnit[type] || 1 }
function getProgress(type: SubjectType) {
  const total = subjectStore.getSubject(type).units.length
  return Math.round((currentUnit(type) / total) * 100)
}

function saveName() {
  if (tempName.value.trim()) {
    userStore.updateUser({ name: tempName.value.trim() })
    showToast('保存成功')
  }
}

function saveProgress() {
  Object.entries(tempProgress.value).forEach(([k, v]) => {
    userStore.updateUnitProgress(k as SubjectType, v)
  })
  showProgressSetting.value = false
  showToast('进度已更新')
}

async function exportData() {
  const json = await exportAllData()
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `学习数据备份_${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
  showToast('数据已导出')
}

function importData() {
  fileInput.value?.click()
}

async function onFileSelected(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  try {
    const text = await file.text()
    await importAllData(text)
    showToast('数据恢复成功')
    await userStore.loadUser()
  } catch {
    showToast('数据恢复失败')
  }
  target.value = ''
}

async function clearData() {
  try {
    await showConfirmDialog({
      title: '警告',
      message: '确定要清空所有学习记录吗？此操作不可恢复！',
      confirmButtonText: '确定清空',
      confirmButtonColor: '#FF4D4F',
    })
    await db.studyRecords.clear()
    await db.mistakes.clear()
    await db.practices.clear()
    await db.gameRecords.clear()
    showToast('已清空所有记录')
  } catch {}
}

onMounted(async () => {
  await userStore.loadUser()
  if (userInfo.value) {
    tempName.value = userInfo.value.name
    tempProgress.value = { ...userInfo.value.currentUnit }
  }
})
</script>

<style scoped lang="scss">
.profile-page { padding-bottom: calc(60px + #{$safe-bottom}); }
.content { padding: 8px 0; }

.user-card { display: flex; align-items: center; gap: 12px; }
.avatar {
  width: 56px; height: 56px; border-radius: 50%;
  background: #EBF3FF; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.user-info { flex: 1; }
.user-name { font-size: 18px; font-weight: 700; color: $color-text-primary; }
.user-meta { font-size: 13px; color: $color-text-secondary; margin-top: 2px; }
.streak-info { display: flex; align-items: center; gap: 4px; margin-top: 4px; font-size: 12px; color: #FAAD14; }

.section-title { font-size: 14px; font-weight: 600; color: $color-text-secondary; padding: 16px 16px 8px; }

.progress-row { display: flex; align-items: center; gap: 8px; padding: 8px 0; }
.progress-name { font-size: 14px; width: 30px; }
.progress-bar-wrap { flex: 1; height: 6px; background: $color-bg; border-radius: 3px; overflow: hidden; }
.progress-bar { height: 100%; border-radius: 3px; transition: width 0.3s; }
.progress-text { font-size: 12px; color: $color-text-secondary; width: 40px; text-align: right; }

.version-text { text-align: center; font-size: 12px; color: $color-text-placeholder; padding: 16px; }

.popup-content { padding: 20px 16px calc(20px + #{$safe-bottom}); }
.popup-content h3 { text-align: center; margin-bottom: 16px; }
.progress-setting-item { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; }
.setting-name { font-size: 15px; font-weight: 600; }

.about-text { padding: 16px; font-size: 13px; color: $color-text-regular; line-height: 1.8; }
.about-text p { margin: 2px 0; }
</style>
