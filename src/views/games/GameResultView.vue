<template>
  <div class="page-container game-result-page">
    <van-nav-bar title="游戏结果" left-arrow @click-left="$router.push('/games')" />
    <div class="content">
      <!-- 星级和分数卡片 -->
      <div class="result-card" :style="{ '--subject-color': subjectColor }">
        <!-- 庆祝emoji -->
        <div class="celebration-emoji" v-if="starCount >= 2">{{ starCount === 3 ? '🏆' : '🎉' }}</div>

        <div class="stars-row">
          <van-icon
            v-for="i in 3"
            :key="i"
            name="star"
            size="44"
            :color="i <= starCount ? '#FAAD14' : '#E0E0E0'"
            :class="{ 'star-pop': i <= starCount }"
            :style="{ animationDelay: (i * 0.15) + 's' }"
          />
        </div>
        <h2 class="result-title">{{ resultText }}</h2>
        <div class="result-score">
          <span class="score-num" :style="{ color: subjectColor }">{{ score }}</span>
          <span class="score-unit">分</span>
        </div>
        <div class="result-best" v-if="bestScore > 0">
          历史最高：{{ bestScore }}分
          <van-tag v-if="isNewRecord" type="warning" size="medium" round>🎉 新纪录！</van-tag>
        </div>
      </div>

      <!-- 答题统计 -->
      <div class="stats-card card">
        <div class="stats-row">
          <div class="stat-item correct">
            <div class="stat-icon-wrap correct-bg"><van-icon name="success" size="22" color="#52C41A" /></div>
            <span class="stat-num">{{ correctCount }}</span>
            <span class="stat-label">答对</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item wrong">
            <div class="stat-icon-wrap wrong-bg"><van-icon name="cross" size="22" color="#FF4D4F" /></div>
            <span class="stat-num">{{ wrongCount }}</span>
            <span class="stat-label">答错</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item accuracy">
            <div class="stat-icon-wrap" :style="{ background: subjectColor + '15' }"><van-icon name="chart-trending-o" size="22" :color="subjectColor" /></div>
            <span class="stat-num">{{ accuracy }}%</span>
            <span class="stat-label">正确率</span>
          </div>
        </div>
        <!-- 最高连击 -->
        <div class="combo-row" v-if="maxCombo > 0">
          <span class="combo-label">⚡ 最高连击</span>
          <span class="combo-value">x{{ maxCombo }}</span>
        </div>
      </div>

      <!-- 成就提示 -->
      <transition-group name="ach-slide" tag="div" class="achievement-list" v-if="achievements.length">
        <div v-for="(ach, i) in achievements" :key="ach" class="achievement-card card" :style="{ animationDelay: (i * 0.1) + 's' }">
          <div class="ach-icon-wrap">
            <van-icon name="medal-o" size="28" color="#FAAD14" />
          </div>
          <div class="ach-info">
            <p class="ach-title">{{ ach.title }}</p>
            <p class="ach-desc">{{ ach.desc }}</p>
          </div>
        </div>
      </transition-group>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <van-button plain type="primary" block round @click="$router.push('/games')">
          <van-icon name="apps-o" size="16" style="margin-right: 4px" /> 游戏中心
        </van-button>
        <van-button type="primary" block round :color="subjectColor" @click="playAgain">
          <van-icon name="replay" size="16" style="margin-right: 4px" /> 再来一局
        </van-button>
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
const maxCombo = computed(() => Number(route.query.combo) || 0)
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
  const list: { title: string; desc: string }[] = []
  if (score.value >= 150) list.push({ title: '满分达人', desc: '分数超过150，完美发挥！' })
  if (correctCount.value >= 8 && wrongCount.value === 0) list.push({ title: '全对高手', desc: '全部答对，零失误！' })
  if (maxCombo.value >= 5) list.push({ title: '连击之王', desc: `最高${maxCombo.value}连击！` })
  if (score.value >= bestScore.value && score.value > 0 && bestScore.value > 0) list.push({ title: '突破自我', desc: '超越历史最高分！' })
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
  background: linear-gradient(135deg, #fff 0%, var(--subject-color, #{$color-primary}) 0.08% 100%);
  border-radius: 20px; padding: 32px 24px;
  text-align: center; margin-bottom: 16px;
  position: relative; overflow: hidden;
}
.celebration-emoji {
  font-size: 48px; margin-bottom: 8px; animation: bounceIn 0.6s;
}
@keyframes bounceIn {
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); }
}
.stars-row { display: flex; justify-content: center; gap: 8px; margin-bottom: 12px; }
.star-pop { animation: starPop 0.4s both; }
@keyframes starPop {
  0% { transform: scale(0) rotate(-30deg); opacity: 0; }
  60% { transform: scale(1.3) rotate(10deg); opacity: 1; }
  100% { transform: scale(1) rotate(0); }
}
.result-title { font-size: 22px; font-weight: 700; color: $color-text-primary; margin-bottom: 12px; }
.result-score { display: flex; align-items: baseline; justify-content: center; gap: 4px; margin: 8px 0; }
.score-num { font-size: 56px; font-weight: 700; }
.score-unit { font-size: 20px; color: $color-text-secondary; }
.result-best {
  font-size: 14px; color: $color-text-secondary;
  display: flex; align-items: center; justify-content: center; gap: 6px;
}

.stats-card { margin-bottom: 16px; }
.stats-row { display: flex; align-items: center; padding: 12px 0; }
.stat-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
.stat-icon-wrap {
  width: 40px; height: 40px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; margin-bottom: 4px;
  &.correct-bg { background: #E8F5E9; }
  &.wrong-bg { background: #FFEBEE; }
}
.stat-num { font-size: 24px; font-weight: 700; color: $color-text-primary; }
.stat-label { font-size: 12px; color: $color-text-secondary; }
.stat-divider { width: 1px; height: 48px; background: $color-border; }

.combo-row {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 8px 0 0; border-top: 1px solid #f5f5f5; margin-top: 4px;
}
.combo-label { font-size: 13px; color: $color-text-secondary; }
.combo-value { font-size: 18px; font-weight: 700; color: #FF6B35; }

.achievement-list { margin-bottom: 16px; }
.achievement-card {
  display: flex; align-items: center; gap: 12px; padding: 14px 16px; margin-bottom: 8px;
  animation: achSlideIn 0.4s both;
}
@keyframes achSlideIn {
  0% { transform: translateX(-20px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}
.ach-icon-wrap {
  width: 44px; height: 44px; border-radius: 12px;
  background: linear-gradient(135deg, #FFF8E1, #FFE082);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.ach-info { flex: 1; }
.ach-title { font-size: 15px; font-weight: 700; color: #FAAD14; }
.ach-desc { font-size: 12px; color: $color-text-secondary; margin-top: 2px; }

.action-buttons { display: flex; gap: 12px; }
.action-buttons .van-button { flex: 1; font-weight: 600; }

.ach-slide-enter-active, .ach-slide-leave-active { transition: all 0.3s; }
.ach-slide-enter-from { opacity: 0; transform: translateX(-20px); }
.ach-slide-leave-to { opacity: 0; transform: translateX(20px); }
</style>
