<template>
  <div class="page-container statistics-page">
    <van-nav-bar title="学习统计" />
    <div class="content">
      <!-- 学习时长 -->
      <div class="card stat-card">
        <div class="card-header">
          <van-icon name="clock-o" size="18" color="#4E8AF2" />
          <span class="card-title">学习时长</span>
        </div>
        <div class="duration-grid">
          <div class="duration-item">
            <span class="duration-value">{{ todayDuration }}</span>
            <span class="duration-label">今日(分钟)</span>
          </div>
          <div class="duration-item">
            <span class="duration-value">{{ weekDuration }}</span>
            <span class="duration-label">本周(分钟)</span>
          </div>
          <div class="duration-item">
            <span class="duration-value">{{ monthDuration }}</span>
            <span class="duration-label">本月(分钟)</span>
          </div>
        </div>
      </div>

      <!-- 各科掌握度雷达图 -->
      <div class="card">
        <div class="card-header">
          <van-icon name="aim" size="18" color="#4E8AF2" />
          <span class="card-title">各科掌握度</span>
        </div>
        <v-chart :option="radarOption" style="height: 240px;" autoresize />
      </div>

      <!-- 成绩趋势 -->
      <div class="card">
        <div class="card-header">
          <van-icon name="chart-trending-o" size="18" color="#4E8AF2" />
          <span class="card-title">成绩趋势</span>
        </div>
        <v-chart :option="lineOption" style="height: 200px;" autoresize />
      </div>

      <!-- 学习建议 -->
      <div class="card">
        <div class="card-header">
          <van-icon name="bulb-o" size="18" color="#FAAD14" />
          <span class="card-title">学习建议</span>
        </div>
        <div class="suggestions">
          <div v-for="(s, i) in suggestions" :key="i" class="suggestion-item">
            <van-icon name="info-o" size="14" color="#FAAD14" />
            <span>{{ s }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { RadarChart, LineChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { usePracticeStore } from '@/stores/practice'
import { getPracticeRecords } from '@/composables/useDB'

use([CanvasRenderer, RadarChart, LineChart, TooltipComponent, LegendComponent, GridComponent])

const practiceStore = usePracticeStore()

const todayDuration = ref(0)
const weekDuration = ref(0)
const monthDuration = ref(0)
const subjectScores = ref<Record<string, number>>({ chinese: 0, math: 0, english: 0, science: 0 })
const scoreHistory = ref<{ date: string; score: number }[]>([])

const radarOption = computed(() => ({
  tooltip: {},
  radar: {
    indicator: [
      { name: '语文', max: 100 },
      { name: '数学', max: 100 },
      { name: '英语', max: 100 },
      { name: '科学', max: 100 },
    ],
  },
  series: [{
    type: 'radar',
    data: [{
      value: [subjectScores.value.chinese, subjectScores.value.math, subjectScores.value.english, subjectScores.value.science],
      name: '掌握度',
      areaStyle: { color: 'rgba(78,138,242,0.2)' },
      lineStyle: { color: '#4E8AF2' },
      itemStyle: { color: '#4E8AF2' },
    }],
  }],
}))

const lineOption = computed(() => ({
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: scoreHistory.value.map(s => s.date) },
  yAxis: { type: 'value', min: 0, max: 100 },
  series: [{
    data: scoreHistory.value.map(s => s.score),
    type: 'line',
    smooth: true,
    lineStyle: { color: '#4E8AF2' },
    itemStyle: { color: '#4E8AF2' },
    areaStyle: { color: 'rgba(78,138,242,0.1)' },
  }],
}))

const suggestions = computed(() => {
  const list: string[] = []
  const entries = Object.entries(subjectScores.value)
  const weakest = entries.reduce((min, cur) => cur[1] < min[1] ? cur : min)
  if (weakest[1] < 60) list.push(`${subjectName(weakest[0] as any)}掌握度较低(${weakest[1]}%)，建议多做练习`)
  const strongest = entries.reduce((max, cur) => cur[1] > max[1] ? cur : max)
  if (strongest[1] >= 80) list.push(`${subjectName(strongest[0] as any)}掌握度很高(${strongest[1]}%)，继续保持！`)
  if (todayDuration.value < 15) list.push('今日学习时长不足15分钟，加油哦！')
  if (todayDuration.value >= 30) list.push('今日学习已超30分钟，记得适当休息，可以玩个放松游戏！')
  return list.length > 0 ? list : ['继续坚持学习，你会越来越棒！']
})

function subjectName(type: string) {
  const map: Record<string, string> = { chinese: '语文', math: '数学', english: '英语', science: '科学' }
  return map[type] || type
}

async function loadData() {
  const today = new Date().toISOString().split('T')[0]
  const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0]
  const monthAgo = new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0]

  const todayRecords = await practiceStore.getRecordsByDateRange(today, today)
  const weekRecords = await practiceStore.getRecordsByDateRange(weekAgo, today)
  const monthRecords = await practiceStore.getRecordsByDateRange(monthAgo, today)

  todayDuration.value = Math.round(todayRecords.reduce((sum, r) => sum + r.duration, 0) / 60)
  weekDuration.value = Math.round(weekRecords.reduce((sum, r) => sum + r.duration, 0) / 60)
  monthDuration.value = Math.round(monthRecords.reduce((sum, r) => sum + r.duration, 0) / 60)

  // 从练习记录计算各科平均分
  const allPractices = await getPracticeRecords('weekly')
  const subjectAgg: Record<string, { total: number; count: number }> = { chinese: { total: 0, count: 0 }, math: { total: 0, count: 0 }, english: { total: 0, count: 0 }, science: { total: 0, count: 0 } }
  allPractices.forEach(p => {
    subjectAgg[p.subject].total += p.score
    subjectAgg[p.subject].count++
  })
  Object.entries(subjectAgg).forEach(([k, v]) => {
    subjectScores.value[k] = v.count > 0 ? Math.round(v.total / v.count) : 0
  })

  // 成绩历史
  scoreHistory.value = allPractices.slice(0, 10).reverse().map(p => ({
    date: new Date(p.createTime).toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' }),
    score: p.score,
  }))
}

onMounted(() => loadData())
</script>

<style scoped lang="scss">
.statistics-page { padding-bottom: calc(60px + #{$safe-bottom}); }
.content { padding: 8px 0; }
.card-header { display: flex; align-items: center; gap: 6px; margin-bottom: 12px; }
.card-title { font-size: 16px; font-weight: 600; color: $color-text-primary; }
.duration-grid { display: flex; justify-content: space-around; }
.duration-item { display: flex; flex-direction: column; align-items: center; }
.duration-value { font-size: 28px; font-weight: 700; color: $color-primary; }
.duration-label { font-size: 12px; color: $color-text-secondary; }
.suggestions { display: flex; flex-direction: column; gap: 8px; }
.suggestion-item { display: flex; gap: 6px; align-items: flex-start; font-size: 13px; color: $color-text-regular; }
</style>
