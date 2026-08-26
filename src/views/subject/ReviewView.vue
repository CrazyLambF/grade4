<template>
  <div class="page-container review-page">
    <van-nav-bar :title="lesson?.title" left-arrow @click-left="$router.back()" />
    <div class="content" v-if="review">
      <!-- 知识点梳理 -->
      <div class="card">
        <div class="card-header">
          <van-icon name="cluster-o" size="18" :color="subjectColor" />
          <span class="card-title">知识点梳理</span>
        </div>
        <div class="knowledge-tree">
          <div v-for="(node, i) in review.knowledgeMap" :key="i" class="knowledge-node">
            <div class="node-header">
              <van-icon name="arrow-down" size="12" :color="subjectColor" v-if="node.children?.length" />
              <span class="dot" :style="{ background: subjectColor }" v-else></span>
              <span class="node-title">{{ node.title }}</span>
            </div>
            <p class="node-content">{{ node.content }}</p>
            <div v-if="node.children?.length" class="node-children">
              <div v-for="(child, j) in node.children" :key="j" class="child-node">
                <span class="child-dot" :style="{ background: subjectColor }"></span>
                <div>
                  <p class="child-title">{{ child.title }}</p>
                  <p class="child-content">{{ child.content }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 重点归纳 -->
      <div class="card">
        <div class="card-header">
          <van-icon name="star-o" size="18" :color="subjectColor" />
          <span class="card-title">重点归纳</span>
        </div>
        <div class="key-points">
          <div v-for="(p, i) in review.keyPoints" :key="i" class="point-item">
            <van-icon name="success" size="14" :color="subjectColor" />
            <span>{{ p }}</span>
          </div>
        </div>
      </div>

      <!-- 易错点提醒 -->
      <div class="card" v-if="review.commonMistakes.length">
        <div class="card-header">
          <van-icon name="warning-o" size="18" color="#FF4D4F" />
          <span class="card-title">易错点提醒</span>
        </div>
        <div class="mistake-list">
          <div v-for="(m, i) in review.commonMistakes" :key="i" class="mistake-item">
            <span class="mistake-num">{{ i + 1 }}</span>
            <span>{{ m }}</span>
          </div>
        </div>
      </div>

      <!-- 复习练习 -->
      <div class="card" v-if="review.exercises.length">
        <div class="card-header">
          <van-icon name="edit" size="18" :color="subjectColor" />
          <span class="card-title">复习练习 ({{ review.exercises.length }}题)</span>
        </div>
        <div class="exercise-list">
          <div v-for="(q, i) in review.exercises" :key="q.id" class="exercise-item">
            <p class="q-content">
              <van-tag :color="subjectColor" size="medium">{{ i + 1 }}</van-tag>
              {{ q.content }}
            </p>
            <div v-if="q.type === 'choice'" class="q-options">
              <div
                v-for="(opt, j) in q.options"
                :key="j"
                class="q-option"
                :class="{ correct: showAnswer[q.id] === 'correct' && opt === q.answer, wrong: showAnswer[q.id] === 'wrong' && answers[q.id] === opt }"
                @click="selectAnswer(q.id, opt, q.answer)"
              >
                {{ opt }}
              </div>
            </div>
            <div v-else-if="q.type === 'judge'" class="q-options">
              <div
                v-for="opt in q.options"
                :key="opt"
                class="q-option"
                :class="{ correct: showAnswer[q.id] === 'correct' && opt === q.answer }"
                @click="selectAnswer(q.id, opt, q.answer)"
              >
                {{ opt }}
              </div>
            </div>
            <div v-else class="q-fill">
              <van-field v-model="answers[q.id]" placeholder="请输入答案" @blur="checkFill(q.id, q.answer)" />
            </div>
            <transition name="fade">
              <div v-if="showAnswer[q.id]" class="q-analysis">
                <van-icon name="info-o" size="14" :color="showAnswer[q.id] === 'correct' ? '#52C41A' : '#FF4D4F'" />
                <div>
                  <p class="answer-text">正确答案：{{ Array.isArray(q.answer) ? q.answer.join('、') : q.answer }}</p>
                  <p class="analysis-text">{{ q.analysis }}</p>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <van-empty v-else description="暂无复习内容" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSubjectStore } from '@/stores/subject'

const route = useRoute()
const store = useSubjectStore()

const subjectType = computed(() => route.params.subject as any)
const unitId = computed(() => Number(route.params.unit))
const lessonId = computed(() => Number(route.params.lesson))

const subject = computed(() => store.getSubject(subjectType.value))
const subjectColor = computed(() => subject.value?.color || '#4E8AF2')
const lesson = computed(() => store.getLesson(subjectType.value, unitId.value, lessonId.value))
const review = computed(() => lesson.value?.reviewContent)

const answers = ref<Record<string, string>>({})
const showAnswer = ref<Record<string, string>>({})

function selectAnswer(qId: string, selected: string, correct: string | string[]) {
  answers.value[qId] = selected
  const correctAnswer = Array.isArray(correct) ? correct[0] : correct
  showAnswer.value[qId] = selected === correctAnswer ? 'correct' : 'wrong'
}

function checkFill(qId: string, correct: string | string[]) {
  const userAns = answers.value[qId]?.trim()
  const correctAnswer = Array.isArray(correct) ? correct.join('') : correct
  if (userAns) {
    showAnswer.value[qId] = userAns === correctAnswer ? 'correct' : 'wrong'
  }
}
</script>

<style scoped lang="scss">
.review-page { padding-bottom: 20px; }
.content { padding-top: 8px; }
.card-header { display: flex; align-items: center; gap: 6px; margin-bottom: 12px; }
.card-title { font-size: 16px; font-weight: 600; color: $color-text-primary; }

.knowledge-tree { display: flex; flex-direction: column; gap: 16px; }
.node-header { display: flex; align-items: center; gap: 6px; }
.dot { width: 6px; height: 6px; border-radius: 50%; }
.node-title { font-size: 15px; font-weight: 600; color: $color-text-primary; }
.node-content { font-size: 13px; color: $color-text-regular; margin: 4px 0 8px 18px; line-height: 1.6; }
.node-children { margin-left: 18px; display: flex; flex-direction: column; gap: 6px; }
.child-node { display: flex; gap: 6px; align-items: flex-start; }
.child-dot { width: 4px; height: 4px; border-radius: 50%; margin-top: 7px; flex-shrink: 0; }
.child-title { font-size: 13px; font-weight: 500; color: $color-text-primary; }
.child-content { font-size: 12px; color: $color-text-secondary; }

.key-points { display: flex; flex-direction: column; gap: 8px; }
.point-item { display: flex; gap: 8px; align-items: center; font-size: 14px; color: $color-text-regular; }

.mistake-list { display: flex; flex-direction: column; gap: 8px; }
.mistake-item { display: flex; gap: 8px; align-items: flex-start; font-size: 13px; color: $color-text-regular; }
.mistake-num { width: 18px; height: 18px; border-radius: 50%; background: #FFEBEE; color: #FF4D4F; font-size: 11px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

.exercise-list { display: flex; flex-direction: column; gap: 16px; }
.exercise-item { border-bottom: 1px solid $color-border; padding-bottom: 12px; }
.exercise-item:last-child { border-bottom: none; }
.q-content { font-size: 14px; color: $color-text-primary; margin-bottom: 8px; display: flex; gap: 6px; align-items: flex-start; }
.q-options { display: flex; flex-direction: column; gap: 6px; }
.q-option { padding: 8px 12px; border-radius: 8px; background: $color-bg; font-size: 14px; cursor: pointer; transition: all 0.2s; }
.q-option:active { opacity: 0.7; }
.q-option.correct { background: #E8F5E9; color: #2E7D32; }
.q-option.wrong { background: #FFEBEE; color: #C62828; }
.q-fill { margin-top: 4px; }
.q-analysis { display: flex; gap: 6px; margin-top: 8px; padding: 8px; border-radius: 6px; background: $color-bg; }
.answer-text { font-size: 13px; font-weight: 500; color: $color-text-primary; }
.analysis-text { font-size: 12px; color: $color-text-secondary; margin-top: 2px; line-height: 1.5; }
</style>
