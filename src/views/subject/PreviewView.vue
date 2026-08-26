<template>
  <div class="page-container preview-page">
    <van-nav-bar :title="lesson?.title" left-arrow @click-left="$router.back()" />
    <div class="content" v-if="preview">
      <!-- 预习导学 -->
      <div class="card guide-card">
        <div class="card-header">
          <van-icon name="bulb-o" size="18" :color="subjectColor" />
          <span class="card-title">预习导学</span>
        </div>
        <p class="guide-text">{{ preview.guide }}</p>
      </div>

      <!-- 预习要点 -->
      <div class="card">
        <div class="card-header">
          <van-icon name="bookmark-o" size="18" :color="subjectColor" />
          <span class="card-title">预习要点</span>
        </div>
        <div class="key-points">
          <div v-for="(point, i) in preview.keyPoints" :key="i" class="point-item">
            <span class="point-dot" :style="{ background: subjectColor }"></span>
            <span>{{ point }}</span>
          </div>
        </div>
      </div>

      <!-- 音频播放（语文/英语） -->
      <div class="card" v-if="preview.audioUrl">
        <div class="card-header">
          <van-icon name="service-o" size="18" :color="subjectColor" />
          <span class="card-title">课文朗读</span>
        </div>
        <audio controls :src="preview.audioUrl" style="width: 100%"></audio>
      </div>

      <!-- 生字词（语文） -->
      <div class="card" v-if="preview.newWords && preview.newWords.length">
        <div class="card-header">
          <van-icon name="edit" size="18" :color="subjectColor" />
          <span class="card-title">生字词</span>
        </div>
        <div class="word-list">
          <div v-for="(w, i) in preview.newWords" :key="i" class="word-item">
            <div class="word-char">{{ w.word }}</div>
            <div class="word-detail">
              <p class="word-pinyin">{{ w.pinyin }}</p>
              <p class="word-meaning">{{ w.meaning }}</p>
              <div class="word-phrases">
                <van-tag v-for="(p, j) in w.phrases" :key="j" plain :color="subjectColor" size="medium">{{ p }}</van-tag>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 核心概念（数学/科学） -->
      <div class="card" v-if="preview.concepts && preview.concepts.length">
        <div class="card-header">
          <van-icon name="cluster-o" size="18" :color="subjectColor" />
          <span class="card-title">核心概念</span>
        </div>
        <div class="concept-list">
          <div v-for="(c, i) in preview.concepts" :key="i" class="concept-item">
            <h4 class="concept-title">{{ c.title }}</h4>
            <p class="concept-desc">{{ c.description }}</p>
            <div v-if="c.example" class="concept-example">
              <van-icon name="example-o" size="14" :color="subjectColor" />
              <span>例：{{ c.example }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 单词预习（英语） -->
      <div class="card" v-if="preview.words && preview.words.length">
        <div class="card-header">
          <van-icon name="comment-o" size="18" :color="subjectColor" />
          <span class="card-title">单词预习</span>
        </div>
        <div class="en-word-list">
          <div v-for="(w, i) in preview.words" :key="i" class="en-word-item">
            <div class="en-word-left">
              <p class="en-word">{{ w.word }}</p>
              <p class="en-phonetic">{{ w.phonetic }}</p>
            </div>
            <p class="en-meaning">{{ w.meaning }}</p>
          </div>
        </div>
      </div>

      <!-- 开始复习按钮 -->
      <div style="padding: 16px;">
        <van-button type="primary" block round :color="subjectColor" @click="goReview">
          去课后复习
        </van-button>
      </div>
    </div>
    <van-empty v-else description="暂无预习内容" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSubjectStore } from '@/stores/subject'

const route = useRoute()
const router = useRouter()
const store = useSubjectStore()

const subjectType = computed(() => route.params.subject as any)
const unitId = computed(() => Number(route.params.unit))
const lessonId = computed(() => Number(route.params.lesson))

const subject = computed(() => store.getSubject(subjectType.value))
const subjectColor = computed(() => subject.value?.color || '#4E8AF2')
const lesson = computed(() => store.getLesson(subjectType.value, unitId.value, lessonId.value))
const preview = computed(() => lesson.value?.previewContent)

function goReview() {
  router.push(`/subject/${subjectType.value}/review/${unitId.value}/${lessonId.value}`)
}
</script>

<style scoped lang="scss">
.preview-page { padding-bottom: 20px; }
.content { padding-top: 8px; }
.card-header { display: flex; align-items: center; gap: 6px; margin-bottom: 12px; }
.card-title { font-size: 16px; font-weight: 600; color: $color-text-primary; }
.guide-text { font-size: 14px; line-height: 1.8; color: $color-text-regular; }

.key-points { display: flex; flex-direction: column; gap: 10px; }
.point-item { display: flex; align-items: flex-start; gap: 8px; font-size: 14px; color: $color-text-regular; }
.point-dot { width: 6px; height: 6px; border-radius: 50%; margin-top: 7px; flex-shrink: 0; }

.word-list { display: flex; flex-direction: column; gap: 12px; }
.word-item { display: flex; gap: 12px; align-items: flex-start; }
.word-char { font-size: 24px; font-weight: 700; color: $color-text-primary; width: 40px; text-align: center; }
.word-detail { flex: 1; }
.word-pinyin { font-size: 13px; color: $color-text-secondary; }
.word-meaning { font-size: 14px; color: $color-text-primary; margin: 2px 0; }
.word-phrases { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 4px; }

.concept-list { display: flex; flex-direction: column; gap: 16px; }
.concept-title { font-size: 15px; font-weight: 600; color: $color-text-primary; margin-bottom: 4px; }
.concept-desc { font-size: 14px; color: $color-text-regular; line-height: 1.6; }
.concept-example { display: flex; align-items: center; gap: 4px; margin-top: 6px; font-size: 13px; color: $color-text-secondary; background: $color-bg; padding: 6px 8px; border-radius: 6px; }

.en-word-list { display: flex; flex-direction: column; gap: 10px; }
.en-word-item { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid $color-border; }
.en-word-item:last-child { border-bottom: none; }
.en-word { font-size: 16px; font-weight: 600; color: $color-text-primary; }
.en-phonetic { font-size: 12px; color: $color-text-secondary; }
.en-meaning { font-size: 14px; color: $color-text-regular; }
</style>
