<template>
  <div class="page-container games-page">
    <van-nav-bar title="放松游戏" />
    <div class="content">
      <!-- 总积分展示 -->
      <div class="card score-banner gradient-primary">
        <div class="banner-info">
          <h3 class="banner-title">游戏总积分</h3>
          <p class="banner-score">{{ totalScore }} <span>分</span></p>
          <p class="banner-tip">学习累了？来玩个游戏放松一下吧！</p>
        </div>
      </div>

      <!-- 学科游戏 -->
      <div v-for="s in subjects" :key="s.type" class="subject-games">
        <div class="section-title">
          <van-icon :name="s.icon" size="16" :color="s.color" />
          <span :style="{ color: s.color }">{{ s.name }}游戏</span>
        </div>
        <div class="game-grid">
          <div
            v-for="game in getGames(s.type)"
            :key="game.id"
            class="game-card"
            :style="{ background: s.bgColor }"
            @click="goGame(s.type, game.id)"
          >
            <van-icon :name="game.icon" size="28" :color="s.color" />
            <div class="game-info">
              <p class="game-name" :style="{ color: s.color }">{{ game.name }}</p>
              <p class="game-desc">{{ game.description }}</p>
              <div class="game-meta">
                <van-tag plain :color="s.color" size="medium">{{ difficultyText(game.difficulty) }}</van-tag>
                <span class="game-time">~{{ game.estimatedTime }}s</span>
              </div>
            </div>
            <van-icon name="arrow" size="14" color="#969799" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSubjectStore } from '@/stores/subject'
import { useGamesStore } from '@/stores/games'
import type { SubjectType, Difficulty } from '@/types'

const router = useRouter()
const subjectStore = useSubjectStore()
const gamesStore = useGamesStore()

const subjects = computed(() => Object.values(subjectStore.subjects))
const totalScore = computed(() => gamesStore.totalScore)

function getGames(type: SubjectType) {
  return gamesStore.getGamesBySubject(type)
}

function difficultyText(d: Difficulty) {
  return d === 1 ? '简单' : d === 2 ? '中等' : '困难'
}

function goGame(subject: SubjectType, gameId: string) {
  router.push(`/games/${subject}/${gameId}`)
}
</script>

<style scoped lang="scss">
.games-page { padding-bottom: calc(60px + #{$safe-bottom}); }
.content { padding: 8px 0; }

.score-banner { color: #fff; text-align: center; }
.banner-title { font-size: 14px; opacity: 0.85; }
.banner-score { font-size: 36px; font-weight: 700; margin: 4px 0; }
.banner-score span { font-size: 14px; }
.banner-tip { font-size: 12px; opacity: 0.85; }

.subject-games { margin-bottom: 8px; }
.section-title {
  display: flex; align-items: center; gap: 4px;
  padding: 12px 16px 8px;
  font-size: 15px; font-weight: 600;
}

.game-grid { display: flex; flex-direction: column; gap: 8px; padding: 0 16px; }
.game-card {
  display: flex; align-items: center; gap: 12px;
  padding: 12px; border-radius: 12px; cursor: pointer;
  &:active { opacity: 0.8; }
}
.game-info { flex: 1; }
.game-name { font-size: 15px; font-weight: 600; }
.game-desc { font-size: 12px; color: $color-text-secondary; margin-top: 2px; }
.game-meta { display: flex; gap: 8px; align-items: center; margin-top: 4px; }
.game-time { font-size: 11px; color: $color-text-secondary; }
</style>
