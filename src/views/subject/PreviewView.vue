<template>
  <div class="page-container preview-page">
    <van-nav-bar :title="lesson?.title" left-arrow @click-left="$router.back()" />
    <!-- 预习进度条 -->
    <div class="progress-bar-wrap" v-if="preview">
      <div class="progress-bar-inner" :style="{ width: scrollProgress + '%', background: subjectColor }"></div>
    </div>
    <div class="content" v-if="preview" @scroll="onScroll" ref="contentRef">
      <!-- 预习导学 -->
      <div class="card guide-card">
        <div class="card-header">
          <van-icon name="bulb-o" size="18" :color="subjectColor" />
          <span class="card-title">预习导学</span>
          <van-tag plain :color="subjectColor" size="medium" class="step-tag">第1步</van-tag>
        </div>
        <p class="guide-text">{{ preview.guide }}</p>
        <!-- 思考引导 -->
        <div class="think-box" v-if="preview.thinkQuestion">
          <van-icon name="question-o" size="14" :color="subjectColor" />
          <span>带着问题预习：{{ preview.thinkQuestion }}</span>
        </div>
      </div>

      <!-- 预习要点 -->
      <div class="card" v-if="preview.keyPoints && preview.keyPoints.length">
        <div class="card-header">
          <van-icon name="bookmark-o" size="18" :color="subjectColor" />
          <span class="card-title">预习要点</span>
          <van-tag plain :color="subjectColor" size="medium" class="step-tag">第2步</van-tag>
        </div>
        <div class="key-points">
          <div v-for="(point, i) in preview.keyPoints" :key="i" class="point-item">
            <span class="point-num" :style="{ background: subjectColor }">{{ i + 1 }}</span>
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
          <van-tag plain :color="subjectColor" size="medium" class="step-tag">第3步</van-tag>
          <span class="word-count">共{{ preview.newWords.length }}个</span>
        </div>
        <div class="word-list">
          <div v-for="(w, i) in preview.newWords" :key="i" class="word-item">
            <div class="word-char" :style="{ borderColor: subjectColor }">{{ w.word }}</div>
            <div class="word-detail">
              <div class="word-top">
                <p class="word-pinyin">{{ w.pinyin }}</p>
                <span class="word-strokes" v-if="w.strokes">{{ w.strokes }}画</span>
              </div>
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
          <van-tag plain :color="subjectColor" size="medium" class="step-tag">第3步</van-tag>
        </div>
        <div class="concept-list">
          <div v-for="(c, i) in preview.concepts" :key="i" class="concept-item" :style="{ borderLeftColor: subjectColor }">
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
          <van-tag plain :color="subjectColor" size="medium" class="step-tag">第3步</van-tag>
          <span class="word-count">共{{ preview.words.length }}个</span>
        </div>
        <div class="en-word-list">
          <div v-for="(w, i) in preview.words" :key="i" class="en-word-item">
            <div class="en-word-left">
              <div class="en-word-row">
                <p class="en-word">{{ w.word }}</p>
                <van-icon name="volume-o" size="16" :color="subjectColor" class="speak-btn" @click="speakWord(w.word)" />
              </div>
              <p class="en-phonetic">{{ w.phonetic }}</p>
            </div>
            <p class="en-meaning">{{ w.meaning }}</p>
          </div>
        </div>
      </div>

      <!-- 预习完成提示 -->
      <div class="complete-tip" v-if="allRead">
        <van-icon name="passed" size="16" :color="subjectColor" />
        <span>预习内容已全部浏览，准备好去复习了吗？</span>
      </div>

      <!-- 开始复习按钮 -->
      <div class="action-bar">
        <van-button type="primary" block round :color="subjectColor" :icon="allRead ? 'success' : 'arrow'" @click="goReview">
          {{ allRead ? '预习完成，去复习' : '去课后复习' }}
        </van-button>
      </div>
    </div>
    <van-empty v-else description="暂无预习内容" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSubjectStore } from '@/stores/subject'
import { usePracticeStore } from '@/stores/practice'
import type { SubjectType } from '@/types'

const route = useRoute()
const router = useRouter()
const store = useSubjectStore()
const practiceStore = usePracticeStore()

const subjectType = computed(() => route.params.subject as SubjectType)
const unitId = computed(() => Number(route.params.unit))
const lessonId = computed(() => Number(route.params.lesson))

const subject = computed(() => store.getSubject(subjectType.value))
const subjectColor = computed(() => subject.value?.color || '#4E8AF2')
const lesson = computed(() => store.getLesson(subjectType.value, unitId.value, lessonId.value))
const preview = computed(() => lesson.value?.previewContent)

const contentRef = ref<HTMLElement | null>(null)
const scrollProgress = ref(0)
const allRead = ref(false)
let recorded = false

function onScroll(e: Event) {
  const el = e.target as HTMLElement
  const max = el.scrollHeight - el.clientHeight
  if (max > 0) {
    scrollProgress.value = Math.min(100, Math.round((el.scrollTop / max) * 100))
    if (scrollProgress.value >= 90 && !allRead.value) {
      allRead.value = true
      recordPreview()
    }
  }
}

function recordPreview() {
  if (recorded) return
  recorded = true
  practiceStore.recordStudy({
    date: new Date().toISOString().split('T')[0],
    subject: subjectType.value,
    type: 'preview',
    duration: 0,
    unit: unitId.value,
    lesson: lessonId.value,
    completed: true,
  })
}

function speakWord(word: string) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(word)
    utterance.lang = 'en-US'
    utterance.rate = 0.8
    speechSynthesis.speak(utterance)
  }
}

function goReview() {
  if (!recorded) recordPreview()
  router.push(`/subject/${subjectType.value}/review/${unitId.value}/${lessonId.value}`)
}

onMounted(() => {
  // 重置状态
  scrollProgress.value = 0
  allRead.value = false
  recorded = false
})
</script>

<style scoped lang="scss">
.preview-page { padding-bottom: 20px; }

.progress-bar-wrap {
  position: sticky; top: 46px; z-index: 10;
  height: 3px; background: rgba(0,0,0,0.06);
  .progress-bar-inner { height: 100%; transition: width 0.2s; border-radius: 0 2px 2px 0; }
}

.content { padding-top: 8px; max-height: calc(100vh - 49px); overflow-y: auto; -webkit-overflow-scrolling: touch; }

.card-header { display: flex; align-items: center; gap: 6px; margin-bottom: 12px; }
.card-title { font-size: 16px; font-weight: 600; color: $color-text-primary; }
.step-tag { margin-left: auto; }
.word-count { font-size: 12px; color: $color-text-secondary; margin-left: auto; }

.guide-text { font-size: 14px; line-height: 1.8; color: $color-text-regular; }

.think-box {
  display: flex; align-items: flex-start; gap: 6px; margin-top: 10px;
  padding: 8px 10px; border-radius: 8px;
  background: rgba(108, 92, 231, 0.06);
  font-size: 13px; color: $color-text-regular; line-height: 1.5;
}

.key-points { display: flex; flex-direction: column; gap: 10px; }
.point-item { display: flex; align-items: flex-start; gap: 8px; font-size: 14px; color: $color-text-regular; line-height: 1.6; }
.point-num {
  width: 20px; height: 20px; border-radius: 50%; color: #fff;
  font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; margin-top: 1px;
  transition: all $duration-base $easing-bounce;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  
  &:active {
    animation: bounceScale 0.4s $easing-bounce;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
}

.word-list { display: flex; flex-direction: column; gap: 12px; }
.word-item { display: flex; gap: 12px; align-items: flex-start; }
.word-char {
  font-size: 24px; font-weight: 700; color: $color-text-primary;
  width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;
  text-align: center; border: 2px solid; border-radius: 10px; flex-shrink: 0;
  transition: all $duration-base $easing-bounce;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  
  &:active {
    animation: shake 0.4s ease-in-out;
    transform: scale(1.1);
    box-shadow: $shadow-md;
    background-color: rgba(108, 92, 231, 0.05);
  }
}
.word-detail { flex: 1; }
.word-top { display: flex; align-items: center; gap: 8px; }
.word-pinyin { font-size: 13px; color: $color-text-secondary; }
.word-strokes { font-size: 11px; color: $color-text-secondary; background: $color-bg; padding: 1px 6px; border-radius: 4px; }
.word-meaning { font-size: 14px; color: $color-text-primary; margin: 2px 0; }
.word-phrases { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 4px; }

.concept-list { display: flex; flex-direction: column; gap: 12px; }
.concept-item { 
  padding-left: 10px; 
  border-left: 3px solid #ddd;
  transition: all $duration-base $easing-smooth;
  cursor: pointer;
  border-radius: $radius-sm;
  padding: $spacing-sm $spacing-sm $spacing-sm 10px;
  -webkit-tap-highlight-color: transparent;
  
  &:active {
    transform: scale(0.98) rotate(-1deg);
    box-shadow: $shadow-md;
    background-color: rgba(108, 92, 231, 0.03);
    border-left-width: 4px;
  }
}
.concept-title { font-size: 15px; font-weight: 600; color: $color-text-primary; margin-bottom: 4px; }
.concept-desc { font-size: 14px; color: $color-text-regular; line-height: 1.6; }
.concept-example { display: flex; align-items: center; gap: 4px; margin-top: 6px; font-size: 13px; color: $color-text-secondary; background: $color-bg; padding: 6px 8px; border-radius: 6px; }

.en-word-list { display: flex; flex-direction: column; gap: 10px; }
.en-word-left { display: flex; flex-direction: column; gap: 2px; }
.en-word-row { display: flex; align-items: center; gap: 6px; }
.en-word { font-size: 16px; font-weight: 600; color: $color-text-primary; }
.speak-btn { 
  cursor: pointer; 
  transition: all $duration-fast $easing-bounce;
  border-radius: 50%;
  padding: 4px;
  -webkit-tap-highlight-color: transparent;
  
  &:active {
    transform: scale(1.3) rotate(15deg);
    color: $color-primary-dark;
    box-shadow: 0 2px 10px rgba(108, 92, 231, 0.35);
    background-color: rgba(108, 92, 231, 0.12);
  }
}
.en-phonetic { font-size: 12px; color: $color-text-secondary; }
.en-meaning { font-size: 14px; color: $color-text-regular; }

.en-word-item {
  display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid $color-border;
  transition: all $duration-base $easing-smooth;
  -webkit-tap-highlight-color: transparent;
  border-radius: $radius-sm;

  &:active {
    background-color: rgba(108, 92, 231, 0.04);
    transform: scale(0.98);
  }
}
.en-word-item:last-child { border-bottom: none; }

.complete-tip {
  display: flex; align-items: center; gap: 6px; justify-content: center;
  padding: 12px; font-size: 13px; color: $color-text-secondary;
  animation: fadeIn 0.4s ease;
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.action-bar { 
  padding: 8px 16px 16px;
  
  .van-button {
    transition: all $duration-base $easing-bounce;
    box-shadow: $shadow-md;
    -webkit-tap-highlight-color: transparent;
    
    &:active {
      transform: scale(0.92);
      box-shadow: $shadow-lg;
      filter: brightness(0.95);
    }
  }
}

// ============================================
// 关键帧动画
// ============================================
@keyframes bounceScale {
  0% { transform: scale(1); }
  30% { transform: scale(1.35); }
  60% { transform: scale(0.9); }
  100% { transform: scale(1); }
}

@keyframes shake {
  0% { transform: scale(1.1) rotate(0deg); }
  20% { transform: scale(1.1) rotate(-6deg); }
  40% { transform: scale(1.1) rotate(6deg); }
  60% { transform: scale(1.1) rotate(-4deg); }
  80% { transform: scale(1.1) rotate(4deg); }
  100% { transform: scale(1.1) rotate(0deg); }
}
</style>
