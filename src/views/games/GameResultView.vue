<template>
  <div class="page-container game-result-page">
    <van-nav-bar title="游戏结果" left-arrow @click-left="$router.push('/games')" />
    <div class="content">
      <!-- 星级和分数卡片 -->
      <div class="result-card" :style="{ borderColor: subjectColor + '40' }">
        <div class="stars-row">
          <van-icon v-for="i in 3" :key="i" name="star" size="40"
            :color="i <= starCount ? '#FAAD14' : '#E0E0E0'" />
        </div>
        <h2 class="result-title">{{ resultText }}</h2>
        <div class="result-score">
          <span class="score-num" :style="{ color: subjectColor }">{{ score }}</span>
          <span class="score-unit">分</span>
        </div>
        <div class="result-best" v-if="bestScore > 0">
          历史最高：{{ bestScore }}分
          <van-tag v-if="isNewRecord" type="warning" size="medium">新纪录！</van-tag>
        </div>
      </div>

      <!-- 答题统计 -->
      <div class="stats-card card">
        <div class="stats-row">
          <div class="stat-item correct">
            <van-icon name="success" size="24" color="#52C41A" />
            <span class="stat-num">{{ correctCount }}</span>
            <span class="stat-label">答对</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item wrong">
            <van-icon name="cross" size="24" color="#FF4D4F" />
            <span class="stat-num">{{ wrongCount }}</span>
            <span class="stat-label">答错</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item accuracy">
            <van-icon name="chart-trending-o" size="24" :color="subjectColor" />
            <span class="stat-num">{{ accuracy }}%</span>
            <span class="stat-label">正确率</span>
          </div>
        </div>
      </div>

      <!-- 成就提示 -->
      <div v-if="achievements.length" class="achievement-list">
        <div v-for="ach in achievements" :key="ach" class="achievement-card card">
          <van-icon name="medal-o" size="28" color="#FAAD14" />
          <div class="ach-info">
            <p class="ach-title">{{ ach }}</p>
            <p class="ach-desc">继续保持，挑战更高分！</p>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <van-button plain type="primary" block round @click="$router.push('/games')">返回游戏中心</van-button>
        <van-button type="primary" block round :color="subjectColor" @click="playAgain">再来一局</van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGamesStore } from '@/stores/games'
import { useSubjectStore } from '@/stores/subject'
import type { SubjectType } from '@/types'

const route = useRoute()
const router = useRouter()
const gamesStore = useGamesStore()
const subjectStore = useSubjectStore()

const subjectType = computed(() => route.params.subject as SubjectType)
const gameId = computed(() => route.params.gameId as string)
const subject = computed(() => subjectStore.getSubject(subjectType.value))
const subjectColor = computed(() => subject.value?.color || '#4E8AF2')

const score = computed(() => Number(route.query.score) || 0)
const correctCount = computed(() => Number(route.query.correct) || 0)
const wrongCount = computed(() => Number(route.query.wrong) || 0)
const accuracy = computed(() => {
  const total = correctCount.value + wrongCount.value
  if (total === 0) return 0
  return Math.round((correctCount.value / total) * 100)
})

const bestScore = ref(0)
const isNewRecord = computed(() => score.value >= bestScore.value && score.value > 0)

const starCount = computed(() => {
  if (score.value >= 150) return 3
  if (score.value >= 80) return 2
  if (score.value > 0) return 1
  return 0
})

const resultText = computed(() => {
  if (score.value >= 150) return '太厉害了！'
  if (score.value >= 80) return '优秀！'
  if (score.value >= 40) return '不错！'
  if (score.value > 0) return '继续加油！'
  return '再试一次吧！'
})

const achievements = computed(() => {
  const list: string[] = []
  if (score.value >= 150) list.push('满分达人')
  if (correctCount.value >= 8 && wrongCount.value === 0) list.push('全对高手')
  if (score.value >= bestScore.value && score.value > 0 && bestScore.value > 0) list.push('突破自我')
  return list
})

function playAgain() {
  router.replace(`/games/${subjectType.value}/${gameId.value}`)
}

onMounted(async () => {
  bestScore.value = await gamesStore.getBestScore(subjectType.value, gameId.value)
})
</script>

<style scoped lang="scss">
.game-result-page { padding-bottom: 20px; }
.content { padding: 16px; }

.result-card {
  background: #fff; border-radius: 16px; padding: 32px 24px;
  text-align: center; margin-bottom: 16px; border: 2px solid transparent;
}
.stars-row { display: flex; justify-content: center; gap: 8px; margin-bottom: 12px; }
.result-title { font-size: 22px; font-weight: 700; color: $color-text-primary; margin-bottom: 12px; }
.result-score { display: flex; align-items: baseline; justify-content: center; gap: 4px; margin: 8px 0; }
.score-num { font-size: 56px; font-weight: 700; }
.score-unit { font-size: 20px; color: $color-text-secondary; }
.result-best { font-size: 14px; color: $color-text-secondary; display: flex; align-items: center; justify-content: center; gap: 6px; }

.stats-card { margin-bottom: 16px; }
.stats-row { display: flex; align-items: center; padding: 8px 0; }
.stat-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
.stat-num { font-size: 24px; font-weight: 700; color: $color-text-primary; }
.stat-label { font-size: 12px; color: $color-text-secondary; }
.stat-divider { width: 1px; height: 40px; background: $color-border; }

.achievement-list { margin-bottom: 16px; }
.achievement-card { display: flex; align-items: center; gap: 12px; padding: 14px 16px; margin-bottom: 8px; }
.ach-info { flex: 1; }
.ach-title { font-size: 15px; font-weight: 600; color: #FAAD14; }
.ach-desc { font-size: 12px; color: $color-text-secondary; margin-top: 2px; }

.action-buttons { display: flex; gap: 12px; }
.action-buttons .van-button { flex: 1; }
</style>
