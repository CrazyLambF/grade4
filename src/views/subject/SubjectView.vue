<template>
  <div class="page-container subject-page">
    <van-nav-bar :title="subject?.name" left-arrow @click-left="$router.back()" />
    <div class="subject-header" :style="{ background: subject?.color }">
      <div class="subject-info">
        <van-icon :name="subject?.icon" size="28" color="#fff" />
        <div>
          <h2 class="subject-name">{{ subject?.name }}</h2>
          <p class="subject-desc">{{ subject?.units.length }}个单元 · {{ totalLessons }}课</p>
        </div>
      </div>
    </div>

    <van-tabs v-model:active="activeTab" sticky offset-top="46">
      <van-tab title="单元目录">
        <div class="unit-list">
          <div v-for="unit in subject?.units" :key="unit.id" class="card unit-card">
            <div class="unit-title">{{ unit.title }}</div>
            <div class="lesson-list">
              <div
                v-for="lesson in unit.lessons"
                :key="lesson.id"
                class="lesson-item"
                @click="goPreview(unit.id, lesson.id)"
              >
                <div class="lesson-info">
                  <span class="lesson-name">{{ lesson.title }}</span>
                </div>
                <div class="lesson-actions">
                  <van-button size="mini" plain :color="subject?.color" @click.stop="goPreview(unit.id, lesson.id)">预习</van-button>
                  <van-button size="mini" :color="subject?.color" @click.stop="goReview(unit.id, lesson.id)">复习</van-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="放松游戏">
        <div class="game-list">
          <div v-for="game in games" :key="game.id" class="card game-card" @click="goGame(game.id)">
            <div class="game-icon" :style="{ background: subject?.bgColor }">
              <van-icon :name="game.icon" size="24" :color="subject?.color" />
            </div>
            <div class="game-info">
              <p class="game-name">{{ game.name }}</p>
              <p class="game-desc">{{ game.description }}</p>
            </div>
            <van-icon name="arrow" size="14" color="#969799" />
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
.subject-page { padding-bottom: 20px; }
.subject-header {
  padding: 16px;
  display: flex; align-items: center;
}
.subject-info {
  display: flex; align-items: center; gap: 12px; color: #fff;
}
.subject-name { font-size: 20px; font-weight: 700; }
.subject-desc { font-size: 13px; opacity: 0.85; margin-top: 2px; }

.unit-list { padding: 12px 0; }
.unit-title { font-size: 16px; font-weight: 600; margin-bottom: 12px; color: $color-text-primary; }
.lesson-list { display: flex; flex-direction: column; gap: 8px; }
.lesson-item {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 12px; border-radius: 8px; background: $color-bg;
  &:active { background: darken($color-bg, 3%); }
}
.lesson-name { font-size: 14px; color: $color-text-primary; }
.lesson-actions { display: flex; gap: 6px; }

.game-list { padding: 12px 0; }
.game-card {
  display: flex; align-items: center; gap: 12px; cursor: pointer;
  &:active { opacity: 0.7; }
}
.game-icon {
  width: 44px; height: 44px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.game-info { flex: 1; }
.game-name { font-size: 15px; font-weight: 500; color: $color-text-primary; }
.game-desc { font-size: 12px; color: $color-text-secondary; margin-top: 2px; }
</style>
