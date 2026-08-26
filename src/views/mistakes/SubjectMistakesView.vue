<template>
  <div class="page-container">
    <van-nav-bar :title="subjectName + '错题'" left-arrow @click-left="$router.back()" />
    <div class="content" v-if="mistakes.length > 0">
      <div v-for="m in mistakes" :key="m.id" class="card mistake-item">
        <p class="mistake-q">{{ m.question.content }}</p>
        <div class="mistake-answers">
          <p class="your-ans">你的答案：{{ Array.isArray(m.userAnswer) ? m.userAnswer.join('、') : m.userAnswer }}</p>
          <p class="correct-ans">正确答案：{{ Array.isArray(m.question.answer) ? m.question.answer.join('、') : m.question.answer }}</p>
          <p class="analysis">解析：{{ m.question.analysis }}</p>
        </div>
        <div class="mistake-actions">
          <van-button size="mini" plain :color="subjectColor" @click="retry(m)">重做</van-button>
          <van-button size="mini" type="success" plain @click="markMastered(m.id!)">已掌握</van-button>
        </div>
      </div>
    </div>
    <van-empty v-else description="该学科暂无错题" :image-size="80" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSubjectStore } from '@/stores/subject'
import { useMistakesStore } from '@/stores/mistakes'
import type { SubjectType, MistakeRecord } from '@/types'

const route = useRoute()
const subjectStore = useSubjectStore()
const mistakesStore = useMistakesStore()

const subjectType = computed(() => route.params.subject as SubjectType)
const subject = computed(() => subjectStore.getSubject(subjectType.value))
const subjectName = computed(() => subject.value?.name || '学科')
const subjectColor = computed(() => subject.value?.color || '#4E8AF2')
const mistakes = ref<MistakeRecord[]>([])

function retry(m: MistakeRecord) {
  const correctAns = Array.isArray(m.question.answer) ? m.question.answer[0] : m.question.answer
  const userAns = prompt(m.question.content + '\n请输入答案：')
  if (userAns !== null) {
    if (userAns.trim() === correctAns) {
      alert('回答正确！')
      markMastered(m.id!)
    } else {
      alert('答案错误，正确答案是：' + correctAns)
    }
  }
}

async function markMastered(id: number) {
  await mistakesStore.markMastered(id)
  await loadData()
}

async function loadData() {
  mistakes.value = await mistakesStore.loadMistakesBySubject(subjectType.value)
}

onMounted(() => loadData())
</script>

<style scoped lang="scss">
.content { padding: 8px 0; }
.mistake-item { padding: 12px; }
.mistake-q { font-size: 14px; color: $color-text-primary; margin-bottom: 8px; }
.mistake-answers { font-size: 13px; margin-bottom: 8px; }
.your-ans { color: #FF4D4F; }
.correct-ans { color: #52C41A; }
.analysis { color: $color-text-secondary; margin-top: 4px; }
.mistake-actions { display: flex; gap: 8px; }
</style>
