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
            <div class="node-header" @click="toggleNode(i)">
              <van-icon :name="expandedNodes.includes(i) ? 'arrow-down' : 'arrow'" size="12" :color="subjectColor" v-if="node.children?.length" />
              <span class="dot" :style="{ background: subjectColor }" v-else></span>
              <span class="node-title">{{ node.title }}</span>
            </div>
            <p class="node-content" v-if="!node.children?.length || expandedNodes.includes(i)">{{ node.content }}</p>
            <transition name="collapse">
              <div v-if="node.children?.length && expandedNodes.includes(i)" class="node-children">
                <div v-for="(child, j) in node.children" :key="j" class="child-node">
                  <span class="child-dot" :style="{ background: subjectColor }"></span>
                  <div>
                    <p class="child-title">{{ child.title }}</p>
                    <p class="child-content">{{ child.content }}</p>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <!-- 重点归纳 -->
      <div class="card" v-if="review.keyPoints && review.keyPoints.length">
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
      <div class="card" v-if="review.commonMistakes && review.commonMistakes.length">
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
      <div class="card" v-if="review.exercises && review.exercises.length">
        <div class="card-header">
          <van-icon name="edit" size="18" :color="subjectColor" />
          <span class="card-title">复习练习 ({{ review.exercises.length }}题)</span>
        </div>
        <!-- 答题进度统计 -->
        <div class="quiz-stats" v-if="answeredCount > 0">
          <div class="stats-bar">
            <div class="stats-segment correct" :style="{ width: correctPct + '%', background: subjectColor }"></div>
            <div class="stats-segment wrong" :style="{ width: wrongPct + '%' }"></div>
          </div>
          <div class="stats-text">
            <span>已答 {{ answeredCount }}/{{ review.exercises.length }}</span>
            <span class="stats-correct">正确 {{ correctCount }}</span>
            <span class="stats-wrong">错误 {{ wrongCount }}</span>
            <span class="stats-rate" v-if="answeredCount > 0">正确率 {{ Math.round(correctCount / answeredCount * 100) }}%</span>
          </div>
        </div>
        <div class="exercise-list">
          <div v-for="(q, i) in review.exercises" :key="q.id" class="exercise-item">
            <p class="q-content">
              <van-tag :color="subjectColor" size="medium">{{ i + 1 }}</van-tag>
              <van-tag plain :color="typeColor(q.type)" size="medium" class="type-tag">{{ typeLabel(q.type) }}</van-tag>
              {{ q.content }}
            </p>
            <!-- 选择题 -->
            <div v-if="q.type === 'choice'" class="q-options">
              <div
                v-for="(opt, j) in q.options"
                :key="j"
                class="q-option"
                :class="getOptionClass(q.id, opt, q.answer)"
                @click="selectAnswer(q, opt)"
              >
                <span class="opt-letter">{{ letterLabels[j] }}</span>
                <span>{{ opt }}</span>
              </div>
            </div>
            <!-- 判断题 -->
            <div v-else-if="q.type === 'judge'" class="q-options">
              <div
                v-for="opt in judgeOptions"
                :key="opt"
                class="q-option judge-opt"
                :class="getOptionClass(q.id, opt, q.answer)"
                @click="selectAnswer(q, opt)"
              >
                {{ opt }}
              </div>
            </div>
            <!-- 填空题 -->
            <div v-else class="q-fill">
              <van-field
                v-model="answers[q.id]"
                placeholder="请输入答案"
                :border="false"
                @blur="checkFill(q)"
              />
            </div>
            <!-- 答案解析 -->
            <transition name="fade">
              <div v-if="showAnswer[q.id]" class="q-analysis" :class="showAnswer[q.id]">
                <van-icon :name="showAnswer[q.id] === 'correct' ? 'success' : 'close'" size="14" :color="showAnswer[q.id] === 'correct' ? '#52C41A' : '#FF4D4F'" />
                <div>
                  <p class="answer-text">
                    {{ showAnswer[q.id] === 'correct' ? '回答正确！' : '回答错误' }}
                    <span class="answer-detail">正确答案：{{ Array.isArray(q.answer) ? q.answer.join('、') : q.answer }}</span>
                  </p>
                  <p class="analysis-text" v-if="q.analysis">{{ q.analysis }}</p>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <!-- 重做按钮 -->
        <div class="retry-bar" v-if="answeredCount >= review.exercises.length">
          <van-button plain round size="small" :color="subjectColor" icon="refresh" @click="retryAll">重新答题</van-button>
        </div>
      </div>

      <!-- 底部完成提示 -->
      <div class="bottom-tip" v-if="allAnswered">
        <van-icon name="trophy-o" size="16" :color="subjectColor" />
        <span>本课复习练习已完成！</span>
      </div>
    </div>
    <van-empty v-else description="暂无复习内容" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSubjectStore } from '@/stores/subject'
import { usePracticeStore } from '@/stores/practice'
import { useMistakesStore } from '@/stores/mistakes'
import type { Question } from '@/types'

const route = useRoute()
const store = useSubjectStore()
const practiceStore = usePracticeStore()
const mistakesStore = useMistakesStore()

const subjectType = computed(() => route.params.subject as any)
const unitId = computed(() => Number(route.params.unit))
const lessonId = computed(() => Number(route.params.lesson))

const subject = computed(() => store.getSubject(subjectType.value))
const subjectColor = computed(() => subject.value?.color || '#4E8AF2')
const lesson = computed(() => store.getLesson(subjectType.value, unitId.value, lessonId.value))
const review = computed(() => lesson.value?.reviewContent)

const answers = ref<Record<string, string>>({})
const showAnswer = ref<Record<string, 'correct' | 'wrong'>>({})
const expandedNodes = ref<number[]>([])
const mistakeRecorded = ref<Set<string>>(new Set()) // 防止重复记录错题
let reviewRecorded = false

const letterLabels = ['A', 'B', 'C', 'D', 'E']
const judgeOptions = ['正确', '错误']

// 答题统计
const answeredCount = computed(() => Object.keys(showAnswer.value).length)
const correctCount = computed(() => Object.values(showAnswer.value).filter(v => v === 'correct').length)
const wrongCount = computed(() => Object.values(showAnswer.value).filter(v => v === 'wrong').length)
const correctPct = computed(() => review.value?.exercises.length ? correctCount.value / review.value.exercises.length * 100 : 0)
const wrongPct = computed(() => review.value?.exercises.length ? wrongCount.value / review.value.exercises.length * 100 : 0)
const allAnswered = computed(() => review.value && review.value.exercises.length > 0 && answeredCount.value >= review.value.exercises.length)

function toggleNode(i: number) {
  const idx = expandedNodes.value.indexOf(i)
  if (idx >= 0) {
    expandedNodes.value.splice(idx, 1)
  } else {
    expandedNodes.value.push(i)
  }
}

function typeLabel(type: string): string {
  const map: Record<string, string> = { choice: '选择', fill: '填空', judge: '判断', match: '连线', calculate: '计算', reading: '阅读' }
  return map[type] || type
}

function typeColor(type: string): string {
  const map: Record<string, string> = { choice: '#4E8AF2', fill: '#FF8C42', judge: '#2EC4B6', match: '#E84393', calculate: '#9B59B6', reading: '#F39C12' }
  return map[type] || '#999'
}

function getOptionClass(qId: string, opt: string, correct: string | string[]): Record<string, boolean> {
  const result: Record<string, boolean> = {}
  const status = showAnswer.value[qId]
  const correctAnswer = Array.isArray(correct) ? correct[0] : correct
  if (status) {
    // 已答题：标出正确答案
    if (opt === correctAnswer) result.correct = true
    // 如果用户选错了，标出用户的错误选项
    if (status === 'wrong' && answers.value[qId] === opt) result.wrong = true
    // 已答题后不可再选
    result.disabled = true
  }
  return result
}

function selectAnswer(q: Question, selected: string) {
  if (showAnswer.value[q.id]) return // 已答题不可重选
  const correctAnswer = Array.isArray(q.answer) ? q.answer[0] : q.answer
  const isCorrect = selected === correctAnswer
  answers.value[q.id] = selected
  showAnswer.value[q.id] = isCorrect ? 'correct' : 'wrong'

  if (!isCorrect && !mistakeRecorded.value.has(q.id)) {
    mistakeRecorded.value.add(q.id)
    mistakesStore.addMistakeRecord({
      questionId: q.id,
      subject: subjectType.value,
      userAnswer: selected,
      source: `复习-${unitId.value}-${lessonId.value}`,
      createTime: new Date().toISOString(),
      retryCount: 0,
      mastered: false,
      question: q,
    })
  }

  checkAllDone()
}

function checkFill(q: Question) {
  if (showAnswer.value[q.id]) return
  const userAns = answers.value[q.id]?.trim()
  if (!userAns) return

  const correct = q.answer
  let isCorrect = false
  if (Array.isArray(correct)) {
    // 多个可接受答案
    isCorrect = correct.some(a => a.trim() === userAns)
  } else {
    isCorrect = correct.trim() === userAns
  }

  showAnswer.value[q.id] = isCorrect ? 'correct' : 'wrong'

  if (!isCorrect && !mistakeRecorded.value.has(q.id)) {
    mistakeRecorded.value.add(q.id)
    mistakesStore.addMistakeRecord({
      questionId: q.id,
      subject: subjectType.value,
      userAnswer: userAns,
      source: `复习-${unitId.value}-${lessonId.value}`,
      createTime: new Date().toISOString(),
      retryCount: 0,
      mastered: false,
      question: q,
    })
  }

  checkAllDone()
}

function checkAllDone() {
  if (allAnswered.value && !reviewRecorded) {
    reviewRecorded = true
    practiceStore.recordStudy({
      date: new Date().toISOString().split('T')[0],
      subject: subjectType.value,
      type: 'review',
      duration: 0,
      unit: unitId.value,
      lesson: lessonId.value,
      correctRate: answeredCount.value > 0 ? Math.round(correctCount.value / answeredCount.value * 100) : 0,
      completed: true,
    })
  }
}

function retryAll() {
  answers.value = {}
  showAnswer.value = {}
  mistakeRecorded.value.clear()
  reviewRecorded = false
}
</script>

<style scoped lang="scss">
.review-page { padding-bottom: 20px; }
.content { padding-top: 8px; }

.card-header { display: flex; align-items: center; gap: 6px; margin-bottom: 12px; }
.card-title { font-size: 16px; font-weight: 600; color: $color-text-primary; }

.knowledge-tree { display: flex; flex-direction: column; gap: 16px; }
.node-header { display: flex; align-items: center; gap: 6px; cursor: pointer; }
.dot { width: 6px; height: 6px; border-radius: 50%; }
.node-title { font-size: 15px; font-weight: 600; color: $color-text-primary; }
.node-content { font-size: 13px; color: $color-text-regular; margin: 4px 0 8px 18px; line-height: 1.6; }
.node-children { margin-left: 18px; display: flex; flex-direction: column; gap: 6px; }
.child-node { display: flex; gap: 6px; align-items: flex-start; }
.child-dot { width: 4px; height: 4px; border-radius: 50%; margin-top: 7px; flex-shrink: 0; }
.child-title { font-size: 13px; font-weight: 500; color: $color-text-primary; }
.child-content { font-size: 12px; color: $color-text-secondary; }

.collapse-enter-active, .collapse-leave-active { transition: all 0.25s ease; overflow: hidden; }
.collapse-enter-from, .collapse-leave-to { opacity: 0; max-height: 0; }
.collapse-enter-to, .collapse-leave-from { opacity: 1; max-height: 300px; }

.key-points { display: flex; flex-direction: column; gap: 8px; }
.point-item { display: flex; gap: 8px; align-items: center; font-size: 14px; color: $color-text-regular; }

.mistake-list { display: flex; flex-direction: column; gap: 8px; }
.mistake-item { display: flex; gap: 8px; align-items: flex-start; font-size: 13px; color: $color-text-regular; }
.mistake-num { width: 18px; height: 18px; border-radius: 50%; background: #FFEBEE; color: #FF4D4F; font-size: 11px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

.quiz-stats { margin-bottom: 14px; }
.stats-bar { display: flex; height: 6px; border-radius: 3px; background: $color-bg; overflow: hidden; }
.stats-segment { height: 100%; transition: width 0.3s ease; }
.stats-segment.correct { background: #52C41A; }
.stats-segment.wrong { background: #FF4D4F; }
.stats-text { display: flex; gap: 10px; font-size: 12px; color: $color-text-secondary; margin-top: 6px; }
.stats-correct { color: #52C41A; }
.stats-wrong { color: #FF4D4F; }
.stats-rate { margin-left: auto; font-weight: 600; color: $color-text-primary; }

.exercise-list { display: flex; flex-direction: column; gap: 16px; }
.exercise-item { border-bottom: 1px solid $color-border; padding-bottom: 12px; }
.exercise-item:last-child { border-bottom: none; }
.q-content { font-size: 14px; color: $color-text-primary; margin-bottom: 8px; display: flex; gap: 6px; align-items: flex-start; }
.type-tag { flex-shrink: 0; margin-top: 1px; }

.q-options { display: flex; flex-direction: column; gap: 6px; }
.q-option {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 12px; border-radius: 8px; background: $color-bg;
  font-size: 14px; cursor: pointer; transition: all 0.2s;
  border: 2px solid transparent;
}
.q-option:active { opacity: 0.7; }
.q-option.disabled { cursor: default; pointer-events: none; }
.q-option.correct { background: #E8F5E9; color: #2E7D32; border-color: #52C41A; }
.q-option.wrong { background: #FFEBEE; color: #C62828; border-color: #FF4D4F; }
.judge-opt { justify-content: center; font-size: 15px; }
.opt-letter {
  width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid currentColor;
  font-size: 12px; font-weight: 600; display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.q-fill { margin-top: 4px; }
.q-analysis { display: flex; gap: 6px; margin-top: 8px; padding: 10px; border-radius: 8px; }
.q-analysis.correct { background: #F0FFF0; }
.q-analysis.wrong { background: #FFF5F5; }
.answer-text { font-size: 13px; font-weight: 600; color: $color-text-primary; }
.answer-detail { font-weight: 400; color: $color-text-secondary; margin-left: 4px; }
.analysis-text { font-size: 12px; color: $color-text-secondary; margin-top: 2px; line-height: 1.5; }

.retry-bar { display: flex; justify-content: center; margin-top: 14px; }

.bottom-tip {
  display: flex; align-items: center; gap: 6px; justify-content: center;
  padding: 16px 0; font-size: 14px; font-weight: 600; color: $color-text-primary;
  animation: fadeIn 0.4s ease;
}
@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
