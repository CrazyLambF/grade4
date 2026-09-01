<template>
  <div class="page-container profile-page">
    <van-nav-bar title="我的" />
    <div class="content">
      <!-- 用户信息卡片 -->
      <div class="user-hero-card">
        <div class="bubble-dot bubble-dot--1"></div>
        <div class="bubble-dot bubble-dot--2"></div>
        <div class="bubble-dot bubble-dot--3"></div>

        <div class="user-info-row">
          <div class="avatar-wrap">
            <div class="avatar-emoji anim-float">{{ streakDays > 0 ? '🦸' : '🧒' }}</div>
          </div>
          <div class="user-info">
            <h3 class="user-name">{{ userInfo?.name || '同学' }}</h3>
            <p class="user-meta">{{ userInfo?.grade || '四年级' }} · {{ userInfo?.semester || '上册' }}</p>
            <div class="streak-info">
              <span class="streak-flame">🔥</span>
              <span>连续学习 {{ userInfo?.streakDays || 0 }} 天</span>
            </div>
          </div>
          <div class="edit-btn" @click="editName = true">
            ✏️ <span>编辑</span>
          </div>
        </div>
      </div>

      <!-- 学习进度 -->
      <div class="section-title-bar">
        <span class="section-emoji">📊</span>
        <span class="section-title-text">学习进度</span>
      </div>
      <div class="card">
        <div v-for="s in subjects" :key="s.type" class="progress-row">
          <div class="progress-icon-wrap" :style="{ background: s.bgColor }">
            <van-icon :name="s.icon" size="18" :color="s.color" />
          </div>
          <span class="progress-name">{{ s.name }}</span>
          <div class="progress-bar-wrap">
            <div class="progress-bar" :style="{ width: getProgress(s.type) + '%', background: s.color }"></div>
          </div>
          <span class="progress-text">{{ currentUnit(s.type) }}/{{ s.units.length }}</span>
        </div>
      </div>

      <!-- 功能列表 -->
      <div class="section-title-bar">
        <span class="section-emoji">⚙️</span>
        <span class="section-title-text">设置</span>
      </div>
      <div class="card settings-card">
        <div class="setting-item" @click="showProgressSetting = true">
          <span class="setting-emoji">📚</span>
          <span class="setting-name">教材进度设置</span>
          <span class="setting-arrow">→</span>
        </div>
        <div class="setting-divider"></div>
        <div class="setting-item" @click="exportData">
          <span class="setting-emoji">💾</span>
          <span class="setting-name">数据备份</span>
          <span class="setting-arrow">→</span>
        </div>
        <div class="setting-divider"></div>
        <div class="setting-item" @click="importData">
          <span class="setting-emoji">📥</span>
          <span class="setting-name">数据恢复</span>
          <span class="setting-arrow">→</span>
        </div>
        <div class="setting-divider"></div>
        <div class="setting-item setting-item--danger" @click="clearData">
          <span class="setting-emoji">🗑️</span>
          <span class="setting-name">清空学习记录</span>
          <span class="setting-arrow">→</span>
        </div>
      </div>

      <div class="section-title-bar">
        <span class="section-emoji">ℹ️</span>
        <span class="section-title-text">关于</span>
      </div>
      <div class="card settings-card">
        <div class="setting-item" @click="showAbout = true">
          <span class="setting-emoji">📱</span>
          <span class="setting-name">关于四上学习帮</span>
          <span class="setting-arrow">→</span>
        </div>
        <div class="setting-divider"></div>
        <div class="setting-item" @click="showGuide = true">
          <span class="setting-emoji">❓</span>
          <span class="setting-name">使用指南</span>
          <span class="setting-arrow">→</span>
        </div>
      </div>

      <p class="version-text">四上学习帮 v1.0.0 ✨</p>
    </div>

    <!-- 编辑姓名 -->
    <van-dialog v-model:show="editName" title="✏️ 编辑姓名" show-cancel-button @confirm="saveName">
      <van-field v-model="tempName" placeholder="请输入姓名" style="margin: 16px;" />
    </van-dialog>

    <!-- 进度设置 -->
    <van-popup v-model:show="showProgressSetting" position="bottom" round>
      <div class="popup-content">
        <h3 class="popup-title">📚 教材进度设置</h3>
        <div v-for="s in subjects" :key="s.type" class="progress-setting-item">
          <div class="setting-name-wrap">
            <div class="setting-icon-mini" :style="{ background: s.bgColor }">
              <van-icon :name="s.icon" size="16" :color="s.color" />
            </div>
            <span class="setting-name-text" :style="{ color: s.color }">{{ s.name }}</span>
          </div>
          <van-stepper v-model="tempProgress[s.type]" :min="1" :max="s.units.length" />
        </div>
        <van-button type="primary" block round color="#6C5CE7" @click="saveProgress" style="margin-top: 16px;">
          💾 保存
        </van-button>
      </div>
    </van-popup>

    <!-- 关于 -->
    <van-dialog v-model:show="showAbout" title="📱 关于四上学习帮">
      <div class="about-text">
        <p>四上学习帮 v1.0.0</p>
        <p>杭州小学四年级（上）学习辅助应用</p>
        <p>涵盖语文、数学、英语、科学四学科</p>
        <p>功能：预习、复习、周周练、月月练、错题本、放松游戏</p>
        <p>数据本地存储，无需账号</p>
      </div>
    </van-dialog>

    <!-- 使用指南 -->
    <van-dialog v-model:show="showGuide" title="❓ 使用指南">
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
import { ref, reactive, computed, onMounted, watch } from 'vue'
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
const streakDays = computed(() => userInfo.value?.streakDays || 0)

const editName = ref(false)
const tempName = ref('')
const showProgressSetting = ref(false)
const tempProgress = reactive<Record<string, number>>({ chinese: 1, math: 1, english: 1, science: 1 })
const showAbout = ref(false)
const showGuide = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

// 每次打开进度设置弹窗时，同步当前实际进度到 tempProgress
watch(showProgressSetting, (show) => {
  if (show && userInfo.value) {
    Object.assign(tempProgress, userInfo.value.currentUnit)
  }
})

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

async function saveProgress() {
  // 构建完整的进度对象，一次性批量更新（避免逐个 async 调用产生竞态条件）
  const progress = {} as Record<SubjectType, number>
  Object.entries(tempProgress).forEach(([k, v]) => {
    progress[k as SubjectType] = v
  })
  console.log('[saveProgress] tempProgress:', JSON.stringify(tempProgress))
  console.log('[saveProgress] progress to save:', JSON.stringify(progress))
  await userStore.updateMultipleUnitProgress(progress)
  console.log('[saveProgress] after update, userInfo.currentUnit:', JSON.stringify(userStore.userInfo?.currentUnit))
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
    const result = await importAllData(text)
    if (!result.success) {
      showToast(result.message)
      return
    }
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
      title: '⚠️ 警告',
      message: '确定要清空所有学习记录吗？\n此操作不可恢复！',
      confirmButtonText: '确定清空',
      confirmButtonColor: '#FF7675',
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
    Object.assign(tempProgress, userInfo.value.currentUnit)
  }
})
</script>

<style scoped lang="scss">
.profile-page { padding-bottom: calc(#{$tabbar-height} + #{$safe-bottom} + 12px); }
.content { padding: $spacing-sm 0; }

// ============================================
// 用户卡片
// ============================================
.user-hero-card {
  position: relative;
  overflow: hidden;
  margin: $spacing-sm $spacing-base;
  padding: $spacing-lg $spacing-base;
  border-radius: $radius-lg;
  background: $gradient-primary;
  box-shadow: $shadow-md;
}

.user-info-row {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  position: relative;
  z-index: 1;
}

.avatar-wrap {
  width: 60px;
  height: 60px;
  border-radius: $radius-md;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
}

.avatar-emoji { font-size: 36px; }

.user-info { flex: 1; color: #fff; }
.user-name {
  font-size: $font-size-lg;
  font-weight: $font-weight-bold;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.user-meta {
  font-size: $font-size-sm;
  opacity: 0.9;
  margin-top: 2px;
}
.streak-info {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 6px;
  font-size: $font-size-xs;
  background: rgba(255, 255, 255, 0.2);
  padding: 3px 10px;
  border-radius: $radius-pill;
  width: fit-content;

  .streak-flame { font-size: 12px; }
}

.edit-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  background: rgba(255, 255, 255, 0.25);
  padding: 8px 12px;
  border-radius: $radius-md;
  font-size: $font-size-xs;
  color: #fff;
  cursor: pointer;
  transition: all $duration-base $easing-bounce;
  border: 2px solid rgba(255, 255, 255, 0.3);

  &:active { transform: scale(0.9); }
  span { font-size: 10px; }
}

// ============================================
// Section 标题
// ============================================
.section-title-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: $spacing-base $spacing-base $spacing-sm;
}

.section-emoji { font-size: 16px; }
.section-title-text {
  font-size: $font-size-base;
  font-weight: $font-weight-bold;
  color: $color-text-secondary;
}

// ============================================
// 进度行
// ============================================
.progress-row {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-sm 0;
}

.progress-icon-wrap {
  width: 32px;
  height: 32px;
  border-radius: $radius-sm;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.progress-name {
  font-size: $font-size-sm;
  width: 32px;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
}

.progress-bar-wrap {
  flex: 1;
  height: 8px;
  background: $color-bg-alt;
  border-radius: $radius-pill;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  border-radius: $radius-pill;
  transition: width 0.5s $easing-smooth;
}

.progress-text {
  font-size: $font-size-xs;
  color: $color-text-secondary;
  width: 44px;
  text-align: right;
  font-weight: $font-weight-medium;
}

// ============================================
// 设置列表
// ============================================
.settings-card { padding: $spacing-xs $spacing-base; }

.setting-item {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-md $spacing-sm;
  cursor: pointer;
  transition: all $duration-base;
  border-radius: $radius-sm;

  &:active { background: $color-bg; transform: scale(0.98); }

  &--danger .setting-name { color: $color-error; }
}

.setting-emoji { font-size: 20px; flex-shrink: 0; }
.setting-name {
  flex: 1;
  font-size: $font-size-base;
  color: $color-text-primary;
  font-weight: $font-weight-medium;
}

.setting-arrow {
  font-size: 16px;
  color: $color-text-placeholder;
  font-weight: $font-weight-bold;
  transition: transform $duration-base;
}
.setting-item:active .setting-arrow { transform: translateX(4px); }

.setting-divider {
  height: 1px;
  background: $color-border;
  margin: 0 $spacing-sm;
}

// ============================================
// 版本号
// ============================================
.version-text {
  text-align: center;
  font-size: $font-size-xs;
  color: $color-text-placeholder;
  padding: $spacing-lg;
  font-weight: $font-weight-medium;
}

// ============================================
// 弹窗
// ============================================
.popup-content {
  padding: $spacing-xl $spacing-base calc(#{$spacing-xl} + #{$safe-bottom});
}

.popup-title {
  text-align: center;
  margin-bottom: $spacing-lg;
  font-size: $font-size-lg;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
}

.progress-setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-sm 0;
}

.setting-name-wrap { display: flex; align-items: center; gap: $spacing-sm; }

.setting-icon-mini {
  width: 28px;
  height: 28px;
  border-radius: $radius-xs;
  display: flex;
  align-items: center;
  justify-content: center;
}

.setting-name-text {
  font-size: $font-size-md;
  font-weight: $font-weight-semibold;
}

.about-text {
  padding: $spacing-base;
  font-size: $font-size-sm;
  color: $color-text-regular;
  line-height: 1.8;
  p { margin: 2px 0; }
}
</style>
