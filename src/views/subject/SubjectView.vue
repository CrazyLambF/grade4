<template>
  <div class="page-container subject-page">
    <van-nav-bar :title="subject?.name" left-arrow @click-left="$router.back()" />
    <!-- 学科头部 -->
    <div class="subject-header" :style="{ background: subjectGradient }">
      <div class="bubble-dot bubble-dot--1"></div>
      <div class="bubble-dot bubble-dot--2"></div>
      <div class="bubble-dot bubble-dot--3"></div>

      <div class="subject-info">
        <div class="subject-emoji-wrap anim-float">
          <span class="subject-emoji">{{ subjectEmoji }}</span>
        </div>
        <div class="subject-text">
          <h2 class="subject-name">{{ subject?.name }}</h2>
          <p class="subject-desc">📚 {{ subject?.units.length }}个单元 · {{ totalLessons }}课</p>
        </div>
      </div>
    </div>

    <van-tabs v-model:active="activeTab" sticky offset-top="46">
      <van-tab title="单元目录">
        <div class="unit-list">
          <div v-for="(unit, ui) in subject?.units" :key="unit.id" class="card unit-card">
            <div class="unit-header">
              <div class="unit-badge" :style="{ background: subject?.color + '20', color: subject?.color }">
                {{ ui + 1 }}
              </div>
              <div class="unit-title">{{ unit.title }}</div>
            </div>
            <div class="lesson-list">
              <div
                v-for="lesson in unit.lessons"
                :key="lesson.id"
                class="lesson-item"
                @click="goPreview(unit.id, lesson.id)"
              >
                <div class="lesson-info">
                  <span class="lesson-dot" :style="{ background: subject?.color }"></span>
                  <span class="lesson-name">{{ lesson.title }}</span>
                </div>
                <div class="lesson-actions">
                  <div
                    class="lesson-btn lesson-btn--preview"
                    :style="{ borderColor: subject?.color, color: subject?.color }"
                    @click.stop="goPreview(unit.id, lesson.id)"
                  >📖 预习</div>
                  <div
                    class="lesson-btn lesson-btn--review"
                    :style="{ background: subject?.color }"
                    @click.stop="goReview(unit.id, lesson.id)"
                  >📝 复习</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="放松游戏">
        <div class="game-list">
          <div
            v-for="game in games"
            :key="game.id"
            class="card game-card"
            @click="goGame(game.id)"
          >
            <div class="game-icon" :style="{ background: subject?.bgColor }">
              <van-icon :name="game.icon" size="26" :color="subject?.color" />
            </div>
            <div class="game-info">
              <p class="game-name">{{ game.name }}</p>
              <p class="game-desc">{{ game.description }}</p>
            </div>
            <div class="game-arrow">→</div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSubjectStore } from '@/stores/subject'
import { useGamesStore } from '@/stores/games'
import type { SubjectType } from '@/types'

const route = useRoute()
const router = useRouter()
const subjectStore = useSubjectStore()
const gamesStore = useGamesStore()

const activeTab = ref(0)
const subjectType = computed(() => route.params.subject as SubjectType)
const subject = computed(() => subjectStore.getSubject(subjectType.value))
const games = computed(() => gamesStore.getGamesBySubject(subjectType.value))

const totalLessons = computed(() => {
  return subject.value?.units.reduce((sum, u) => sum + u.lessons.length, 0) ?? 0
})

const subjectGradient = computed(() => {
  const type = subjectType.value
  if (type === 'chinese') return 'linear-gradient(135deg, #FF8C42 0%, #FFB347 100%)'
  if (type === 'math') return 'linear-gradient(135deg, #4E8AF2 0%, #74B9FF 100%)'
  if (type === 'english') return 'linear-gradient(135deg, #2EC4B6 0%, #55EFC4 100%)'
  if (type === 'science') return 'linear-gradient(135deg, #E84393 0%, #FD79A8 100%)'
  return 'linear-gradient(135deg, #6C5CE7 0%, #A29BFE 100%)'
})

const subjectEmoji = computed(() => {
  const type = subjectType.value
  if (type === 'chinese') return '✍️'
  if (type === 'math') return '🔢'
  if (type === 'english') return '🌍'
  if (type === 'science') return '🔬'
  return '📖'
})

function goPreview(unitId: number, lessonId: number) {
  router.push(`/subject/${subjectType.value}/preview/${unitId}/${lessonId}`)
}
function goReview(unitId: number, lessonId: number) {
  router.push(`/subject/${subjectType.value}/review/${unitId}/${lessonId}`)
}
function goGame(gameId: string) {
  router.push(`/games/${subjectType.value}/${gameId}`)
}
</script>

<style scoped lang="scss">
.subject-page { padding-bottom: $spacing-xl; }

.subject-header {
  position: relative;
  overflow: hidden;
  padding: $spacing-lg $spacing-base;
  display: flex;
  align-items: center;
}

.subject-info {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  color: #fff;
  position: relative;
  z-index: 1;
}

.subject-emoji-wrap {
  width: 52px;
  height: 52px;
  border-radius: $radius-md;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.subject-emoji { font-size: 28px; }

.subject-name {
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.subject-desc {
  font-size: $font-size-sm;
  opacity: 0.9;
  margin-top: 2px;
}

// ============================================
// 单元目录
// ============================================
.unit-list { padding: $spacing-md 0; }

.unit-card {
  margin-bottom: $spacing-sm;
}

.unit-header {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  margin-bottom: $spacing-md;
}

.unit-badge {
  width: 28px;
  height: 28px;
  border-radius: $radius-sm;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $font-size-sm;
  font-weight: $font-weight-bold;
  flex-shrink: 0;
}

.unit-title {
  font-size: $font-size-md;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
}

.lesson-list { display: flex; flex-direction: column; gap: $spacing-sm; }

.lesson-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-md;
  border-radius: $radius-md;
  background: $color-bg;
  transition: all $duration-base $easing-smooth;

  &:active {
    transform: scale(0.97);
    background: darken($color-bg, 2%);
  }
}

.lesson-info { display: flex; align-items: center; gap: $spacing-sm; }

.lesson-dot {
  width: 8px;
  height: 8px;
  border-radius: $radius-circle;
  flex-shrink: 0;
}

.lesson-name {
  font-size: $font-size-base;
  color: $color-text-primary;
  font-weight: $font-weight-medium;
}

.lesson-actions { display: flex; gap: $spacing-sm; }

.lesson-btn {
  font-size: $font-size-xs;
  padding: 5px 12px;
  border-radius: $radius-pill;
  font-weight: $font-weight-semibold;
  transition: all $duration-base $easing-bounce;

  &--preview {
    background: transparent;
    border: 2px solid;

    &:active { transform: scale(0.9); }
  }

  &--review {
    color: #fff;
    border: 2px solid transparent;

    &:active { transform: scale(0.9); }
  }
}

// ============================================
// 游戏列表
// ============================================
.game-list { padding: $spacing-md 0; }

.game-card {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  cursor: pointer;
  transition: all $duration-base $easing-smooth;

  &:active {
    transform: scale(0.97);
    box-shadow: $shadow-sm;
  }
}

.game-icon {
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
  color: $color-text-primary;
}
.game-desc {
  font-size: $font-size-xs;
  color: $color-text-secondary;
  margin-top: 2px;
}

.game-arrow {
  font-size: 18px;
  color: $color-text-placeholder;
  font-weight: $font-weight-bold;
  transition: transform $duration-base;
}
.game-card:active .game-arrow { transform: translateX(4px); }
</style>
