<template>
  <div class="page-container games-page">
    <!-- 顶部积分 Banner -->
    <div class="hero-banner">
      <div class="bubble-dot bubble-dot--1"></div>
      <div class="bubble-dot bubble-dot--2"></div>
      <div class="bubble-dot bubble-dot--3"></div>

      <div class="banner-content">
        <div class="banner-emoji anim-float">🎮</div>
        <h3 class="banner-title">游戏总积分</h3>
        <div class="banner-score-row">
          <span class="banner-score">{{ totalScore }}</span>
          <span class="banner-unit">分</span>
        </div>
        <p class="banner-tip">学习累了？来玩个游戏放松一下吧！</p>
      </div>
    </div>

    <div class="content">
      <!-- 最近游戏记录 -->
      <div v-if="recentGames.length" class="card recent-section">
        <div class="section-header">
          <div class="section-label-wrap">
            <span class="section-emoji">⏱️</span>
            <span class="section-label">最近游玩</span>
          </div>
          <span class="section-badge">{{ recentGames.length }}局</span>
        </div>
        <div class="recent-list">
          <router-link
            v-for="g in recentGames.slice(0, 3)"
            :key="g.id"
            class="recent-item"
            :to="{ name: 'GamePlay', params: { subject: g.subject, gameId: g.gameId } }"
          >
            <div class="recent-icon" :style="{ background: getSubjectColor(g.subject) + '18' }">
              <van-icon :name="getGameIcon(g.gameId)" size="22" :color="getSubjectColor(g.subject)" />
            </div>
            <div class="recent-info">
              <p class="recent-name">{{ g.gameName }}</p>
              <p class="recent-time">{{ formatTime(g.createTime) }}</p>
            </div>
            <div class="recent-score">
              <span class="recent-score-num" :style="{ color: getSubjectColor(g.subject) }">{{ g.score }}</span>
              <span class="recent-score-unit">分</span>
            </div>
          </router-link>
        </div>
      </div>

      <!-- 每日推荐 -->
      <router-link
        class="card daily-recommend-card"
        :style="{ background: dailyColor + '12' }"
        :to="{ name: 'GamePlay', params: { subject: dailyGame.subject, gameId: dailyGame.id } }"
      >
        <div class="daily-gift anim-float">🎁</div>
        <div class="daily-info">
          <p class="daily-label">✨ 今日推荐</p>
          <p class="daily-name" :style="{ color: dailyColor }">{{ dailyGame.name }}</p>
          <p class="daily-desc">{{ dailyGame.description }}</p>
        </div>
        <div class="daily-arrow" :style="{ color: dailyColor }">→</div>
      </router-link>

      <!-- 学科游戏 -->
      <div v-for="s in subjects" :key="s.type" class="subject-games">
        <div class="section-title-bar">
          <div class="section-title-icon" :style="{ background: s.bgColor }">
            <van-icon :name="s.icon" size="16" :color="s.color" />
          </div>
          <span class="section-title-text" :style="{ color: s.color }">{{ s.name }}游戏</span>
          <div class="section-title-deco" :style="{ background: s.color + '20' }"></div>
        </div>
        <div class="game-grid">
          <router-link
            v-for="game in getGames(s.type)"
            :key="game.id"
            class="game-card"
            :style="{ background: s.bgColor }"
            :to="{ name: 'GamePlay', params: { subject: s.type, gameId: game.id } }"
          >
            <div class="game-card-icon" :style="{ background: 'rgba(255,255,255,0.8)' }">
              <van-icon :name="game.icon" size="26" :color="s.color" />
            </div>
            <div class="game-info">
              <p class="game-name" :style="{ color: s.color }">{{ game.name }}</p>
              <p class="game-desc">{{ game.description }}</p>
              <div class="game-meta">
                <span class="game-difficulty" :style="difficultyStyle(game.difficulty, s.color)">
                  {{ difficultyText(game.difficulty) }}
                </span>
                <span class="game-time">⏱ ~{{ game.estimatedTime }}s</span>
                <span v-if="bestScores[game.id]" class="game-best">🏆 {{ bestScores[game.id] }}</span>
              </div>
            </div>
            <div class="game-arrow">→</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useSubjectStore } from '@/stores/subject'
import { useGamesStore, gameConfigs } from '@/stores/games'
import { getGameRecords } from '@/composables/useDB'
import type { SubjectType, Difficulty, GameRecord } from '@/types'

const subjectStore = useSubjectStore()
const gamesStore = useGamesStore()

const subjects = computed(() => Object.values(subjectStore.subjects))
const totalScore = computed(() => gamesStore.totalScore)
const recentGames = ref<GameRecord[]>([])
const bestScores = ref<Record<string, number>>({})

// 每日推荐：按日期取模轮换
const dailyGame = computed(() => {
  const day = Math.floor(Date.now() / 86400000)
  return gameConfigs[day % gameConfigs.length]
})
const dailyColor = computed(() => {
  return subjectStore.getSubject(dailyGame.value.subject)?.color || '#6C5CE7'
})

function getGames(type: SubjectType) {
  return gamesStore.getGamesBySubject(type)
}

function difficultyText(d: Difficulty) {
  return d === 1 ? '简单' : d === 2 ? '中等' : '困难'
}

function difficultyStyle(d: Difficulty, color: string) {
  if (d === 1) return { background: '#E0F8F2', color: '#00B894' }
  if (d === 2) return { background: '#FFF5DC', color: '#E67E22' }
  return { background: '#FFE5E5', color: '#FF7675' }
}

function getSubjectColor(subject: string) {
  return subjectStore.getSubject(subject as SubjectType)?.color || '#6C5CE7'
}

function getGameIcon(gameId: string) {
  return gameConfigs.find(g => g.id === gameId)?.icon || 'game-o'
}

function formatTime(iso: string) {
  const d = new Date(iso)
  const now = new Date()
  const diff = (now.getTime() - d.getTime()) / 1000
  if (diff < 60) return '刚刚'
  if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`
  if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`
  return `${d.getMonth() + 1}/${d.getDate()}`
}

onMounted(async () => {
  recentGames.value = await getGameRecords()
  // 计算各游戏最高分
  for (const g of gameConfigs) {
    const best = await gamesStore.getBestScore(g.subject, g.id)
    if (best > 0) bestScores.value[g.id] = best
  }
})
</script>

<style scoped lang="scss">
.games-page { padding-bottom: calc(#{$tabbar-height} + #{$safe-bottom} + 12px); }
.content { padding: 0 0 $spacing-base; }

a.recent-item, a.game-card, a.daily-recommend-card {
  text-decoration: none;
  color: inherit;
  -webkit-tap-highlight-color: transparent;
}

// ============================================
// 顶部 Banner
// ============================================
.hero-banner {
  position: relative;
  overflow: hidden;
  padding: calc(52px + #{$safe-top}) $spacing-base $spacing-xl;
  border-radius: 0 0 $radius-xl $radius-xl;
  background: $gradient-primary;
  text-align: center;
  color: #fff;
}

.banner-content { position: relative; z-index: 1; }

.banner-emoji {
  font-size: 48px;
  margin-bottom: 4px;
}

.banner-title {
  font-size: $font-size-sm;
  opacity: 0.9;
  font-weight: $font-weight-medium;
}

.banner-score-row {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
  margin: 4px 0;
}

.banner-score {
  font-size: 40px;
  font-weight: $font-weight-bold;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.banner-unit { font-size: $font-size-base; opacity: 0.85; }

.banner-tip {
  font-size: $font-size-xs;
  opacity: 0.85;
  margin-top: 4px;
}

// ============================================
// 最近游戏
// ============================================
.recent-section { margin-top: $spacing-base; }

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: $spacing-md;
}

.section-label-wrap { display: flex; align-items: center; gap: 6px; }
.section-emoji { font-size: 16px; }
.section-label {
  font-size: $font-size-md;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
}

.section-badge {
  font-size: $font-size-xs;
  color: $color-primary;
  background: rgba(108, 92, 231, 0.1);
  padding: 3px 12px;
  border-radius: $radius-pill;
  font-weight: $font-weight-semibold;
}

.recent-list { display: flex; flex-direction: column; gap: $spacing-sm; }

.recent-item {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-sm 0;
  transition: transform $duration-base;

  &:active { transform: scale(0.97); }
}

.recent-icon {
  width: 40px;
  height: 40px;
  border-radius: $radius-md;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.recent-info { flex: 1; }
.recent-name {
  font-size: $font-size-base;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
}
.recent-time {
  font-size: $font-size-xs;
  color: $color-text-secondary;
  margin-top: 2px;
}

.recent-score { display: flex; align-items: baseline; gap: 2px; }
.recent-score-num { font-size: $font-size-xl; font-weight: $font-weight-bold; }
.recent-score-unit { font-size: $font-size-xs; color: $color-text-secondary; }

// ============================================
// 每日推荐
// ============================================
.daily-recommend-card {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  margin: $spacing-base $spacing-base;
  padding: $spacing-base;
  border-radius: $radius-lg;
  border: 2px solid transparent;
  transition: all $duration-base $easing-smooth;
  cursor: pointer;

  &:active { transform: scale(0.97); }
}

.daily-gift { font-size: 32px; flex-shrink: 0; }

.daily-info { flex: 1; }
.daily-label { font-size: $font-size-xs; color: $color-text-secondary; }
.daily-name {
  font-size: $font-size-md;
  font-weight: $font-weight-bold;
  margin: 2px 0;
}
.daily-desc { font-size: $font-size-xs; color: $color-text-secondary; }

.daily-arrow { font-size: 20px; font-weight: $font-weight-bold; }

// ============================================
// 学科游戏区
// ============================================
.subject-games { margin-bottom: $spacing-sm; }

.section-title-bar {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-base $spacing-base $spacing-sm;
}

.section-title-icon {
  width: 28px;
  height: 28px;
  border-radius: $radius-sm;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-title-text {
  font-size: $font-size-md;
  font-weight: $font-weight-bold;
}

.section-title-deco {
  flex: 1;
  height: 2px;
  border-radius: $radius-pill;
  margin-left: 4px;
}

.game-grid {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
  padding: 0 $spacing-base;
}

.game-card {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-md;
  border-radius: $radius-lg;
  cursor: pointer;
  transition: all $duration-base $easing-smooth;

  &:active {
    transform: scale(0.97);
    box-shadow: $shadow-sm;
  }
}

.game-card-icon {
  width: 48px;
  height: 48px;
  border-radius: $radius-md;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.game-info { flex: 1; }
.game-name {
  font-size: $font-size-md;
  font-weight: $font-weight-bold;
}
.game-desc {
  font-size: $font-size-xs;
  color: $color-text-secondary;
  margin-top: 2px;
}

.game-meta {
  display: flex;
  gap: $spacing-sm;
  align-items: center;
  margin-top: 6px;
}

.game-difficulty {
  font-size: $font-size-xs;
  padding: 2px 8px;
  border-radius: $radius-pill;
  font-weight: $font-weight-semibold;
}

.game-time {
  font-size: $font-size-xs;
  color: $color-text-secondary;
}

.game-best {
  font-size: $font-size-xs;
  color: #E67E22;
  font-weight: $font-weight-semibold;
}

.game-arrow {
  font-size: 18px;
  color: $color-text-placeholder;
  font-weight: $font-weight-bold;
  transition: transform $duration-base;
}
.game-card:active .game-arrow { transform: translateX(4px); }
</style>
