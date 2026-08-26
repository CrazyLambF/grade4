<template>
  <div class="page-container game-result-page">
    <van-nav-bar title="游戏结果" left-arrow @click-left="$router.push('/games')" />
    <div class="content">
      <div class="result-card">
        <van-icon :name="score >= 100 ? 'troph-o' : 'smile-o'" size="64" :color="score >= 100 ? '#FAAD14' : '#4E8AF2'" />
        <h2 class="result-title">{{ resultText }}</h2>
        <div class="result-score">
          <span class="score-num">{{ score }}</span>
          <span class="score-unit">分</span>
        </div>
        <div class="result-best" v-if="bestScore > 0">
          历史最高：{{ bestScore }}分
          <van-tag v-if="score >= bestScore && score > 0" type="warning" size="medium">新纪录！</van-tag>
        </div>
      </div>

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
const bestScore = ref(0)

const resultText = computed(() => {
  const s = score.value
  if (s >= 150) return '太厉害了！🏆'
  if (s >= 100) return '优秀！⭐'
  if (s >= 60) return '不错！👍'
  if (s > 0) return '继续加油！💪'
  return '再试一次吧！'
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
  background: #fff; border-radius: 16px; padding: 40px 24px;
  text-align: center; margin-bottom: 24px;
}
.result-title { font-size: 22px; font-weight: 700; color: $color-text-primary; margin: 16px 0; }
.result-score { display: flex; align-items: baseline; justify-content: center; gap: 4px; margin: 16px 0; }
.score-num { font-size: 56px; font-weight: 700; color: $color-primary; }
.score-unit { font-size: 20px; color: $color-text-secondary; }
.result-best { font-size: 14px; color: $color-text-secondary; display: flex; align-items: center; justify-content: center; gap: 6px; }
.action-buttons { display: flex; gap: 12px; }
.action-buttons .van-button { flex: 1; }
</style>
