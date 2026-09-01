<template>
  <div class="page-container mood-page">
    <van-nav-bar title="心情小屋" left-arrow @click-left="$router.back()">
      <template #right>
        <span class="streak-emoji anim-float">🌈</span>
      </template>
    </van-nav-bar>

    <!-- 顶部情绪选择区 -->
    <div class="mood-hero">
      <div class="bubble-dot bubble-dot--1"></div>
      <div class="bubble-dot bubble-dot--2"></div>
      <div class="floating-star s1">✨</div>
      <div class="floating-star s2">💫</div>

      <p class="hero-question">{{ userName }}，你现在心情怎么样？</p>
      <p class="hero-hint">点一个小脸脸告诉小屋吧～</p>

      <div class="mood-picker">
        <div
          v-for="m in moods"
          :key="m.id"
          class="mood-face"
          :class="{ active: selectedMood === m.id }"
          @click="selectMood(m.id)"
        >
          <span class="mood-emoji">{{ m.emoji }}</span>
          <span class="mood-label">{{ m.label }}</span>
        </div>
      </div>
    </div>

    <!-- 选完情绪后显示的内容 -->
    <template v-if="selectedMood">
      <!-- 安慰/共鸣话语 -->
      <div class="card comfort-card anim-bounce-in" :style="{ background: currentMood.bg }">
        <div class="comfort-emoji anim-heartbeat">{{ currentMood.emoji }}</div>
        <p class="comfort-title">{{ currentMood.title }}</p>
        <p class="comfort-text">{{ comfortText }}</p>
        <div class="comfort-actions">
          <van-button size="small" round plain :color="currentMood.color" @click="refreshComfort">
            🔄 换一句
          </van-button>
          <van-button size="small" round :color="currentMood.color" @click="showExercise = true">
            做个小练习 →
          </van-button>
        </div>
      </div>

      <!-- 呼吸放松区 -->
      <div class="card breath-card">
        <div class="card-header">
          <div class="card-icon-wrap gradient-sky">
            <span>🌬️</span>
          </div>
          <span class="card-title">呼吸放松</span>
        </div>
        <p class="breath-desc">跟着圆圈一起呼吸，慢慢来～</p>
        <div class="breath-circle-wrap" @click="toggleBreath">
          <div class="breath-circle" :class="{ breathing: isBreathing }">
            <span class="breath-text">{{ breathPhaseText }}</span>
          </div>
        </div>
        <p class="breath-tip">{{ isBreathing ? '点击停止' : '点击开始' }} · 已完成 {{ breathCycles }} 轮</p>
      </div>

      <!-- 今日小确幸记录 -->
      <div class="card gratitude-card">
        <div class="card-header">
          <div class="card-icon-wrap gradient-sunny">
            <span>🌻</span>
          </div>
          <span class="card-title">今天有什么开心的事？</span>
        </div>
        <van-field
          v-model="gratitudeText"
          type="textarea"
          placeholder="比如：今天吃到了喜欢的冰淇淋，或者帮同学捡了笔……写下来会更开心哦！"
          :maxlength="100"
          show-word-limit
          rows="2"
          autosize
        />
        <div class="gratitude-list" v-if="gratitudeRecords.length > 0">
          <div
            v-for="(g, i) in gratitudeRecords"
            :key="i"
            class="gratitude-item anim-pop-in"
          >
            <span class="gratitude-bullet">✨</span>
            <span class="gratitude-text">{{ g.text }}</span>
            <span class="gratitude-time">{{ g.time }}</span>
          </div>
        </div>
        <van-button
          v-if="gratitudeText.trim()"
          block
          round
          color="#FDCB6E"
          class="gratitude-save-btn"
          @click="saveGratitude"
        >
          记下来 📝
        </van-button>
      </div>

      <!-- 心情日记本 -->
      <div class="card diary-card">
        <div class="card-header">
          <div class="card-icon-wrap" style="background: #F3E8FF">
            <span>📔</span>
          </div>
          <span class="card-title">心情日记本</span>
          <span class="diary-count" v-if="moodHistory.length > 0">{{ moodHistory.length }}条</span>
        </div>
        <div v-if="moodHistory.length > 0" class="diary-list">
          <div
            v-for="(record, i) in moodHistory.slice(0, 10)"
            :key="i"
            class="diary-item"
          >
            <span class="diary-emoji">{{ record.emoji }}</span>
            <div class="diary-info">
              <span class="diary-mood">{{ record.label }}</span>
              <span class="diary-date">{{ record.date }}</span>
            </div>
            <div class="diary-chart" v-if="moodHistory.length >= 3">
              <div
                class="diary-bar"
                v-for="(r, j) in moodHistory.slice(Math.max(0, moodHistory.length - 7))"
                :key="j"
                :style="{
                  height: (r.score * 4 + 8) + 'px',
                  background: r.color,
                  opacity: r.date === record.date ? 1 : 0.3
                }"
              ></div>
            </div>
          </div>
        </div>
        <div v-else class="diary-empty">
          <span class="diary-empty-emoji">🌸</span>
          <p>还没有记录哦，选一个心情开始吧～</p>
        </div>
      </div>
    </template>

    <!-- PERMA 小练习弹窗 -->
    <van-popup v-model:show="showExercise" position="bottom" round :style="{ maxHeight: '80%' }">
      <div class="exercise-popup">
        <h3 class="exercise-title">🌟 心情小练习</h3>
        <p class="exercise-subtitle">选一个试试，做完心情会变好哦！</p>
        <div class="exercise-list">
          <div
            v-for="(ex, i) in exercises"
            :key="i"
            class="exercise-item"
            :style="{ background: ex.bg }"
            @click="doExercise(ex)"
          >
            <span class="exercise-emoji">{{ ex.emoji }}</span>
            <div class="exercise-info">
              <p class="exercise-name">{{ ex.name }}</p>
              <p class="exercise-desc">{{ ex.desc }}</p>
            </div>
            <span class="exercise-arrow">→</span>
          </div>
        </div>
        <van-button block round plain @click="showExercise = false" class="exercise-close">
          关闭
        </van-button>
      </div>
    </van-popup>

    <!-- 练习详情弹窗 -->
    <van-popup v-model:show="showExerciseDetail" position="center" round :style="{ width: '88%' }">
      <div class="exercise-detail">
        <div class="exercise-detail-emoji anim-bounce-in">{{ currentExercise?.emoji }}</div>
        <h3 class="exercise-detail-title">{{ currentExercise?.name }}</h3>
        <p class="exercise-detail-desc">{{ currentExercise?.detail }}</p>
        <div class="exercise-detail-input" v-if="currentExercise?.needInput">
          <van-field
            v-model="exerciseAnswer"
            type="textarea"
            :placeholder="currentExercise.placeholder"
            rows="3"
            autosize
            :maxlength="200"
          />
        </div>
        <van-button
          block
          round
          :color="currentMood.color"
          class="exercise-detail-btn"
          @click="finishExercise"
        >
          {{ exerciseAnswer.trim() ? '记录下来 ✨' : '我做完啦！' }}
        </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const userName = computed(() => userStore.userInfo?.name || '同学')

// ============================================
// 情绪定义（5种基础情绪 + 颜色 + 安慰语）
// ============================================
interface Mood {
  id: string
  emoji: string
  label: string
  color: string
  bg: string
  title: string
  score: number
  comforts: string[]
}

const moods: Mood[] = [
  {
    id: 'happy', emoji: '😄', label: '开心', color: '#FF8C42', bg: 'linear-gradient(135deg, #FFF5EE 0%, #FFE8D5 100%)',
    title: '看到你开心，小屋也跟着亮了！', score: 5,
    comforts: [
      '开心的时候，记得好好享受这份感觉～把它装进口袋，下次难过的时候拿出来看看。',
      '你笑起来的样子一定很可爱！要不要把这件开心的事写下来，让它变成永远的回忆？',
      '太好了！开心的时候别忘了和好朋友分享，快乐会变成双倍哦！',
      '今天的你像小太阳一样亮闪闪的，继续保持吧～',
    ],
  },
  {
    id: 'calm', emoji: '😊', label: '平静', color: '#2EC4B6', bg: 'linear-gradient(135deg, #E8F8F6 0%, #D4F0EB 100%)',
    title: '平静很好，像湖面一样安稳。', score: 4,
    comforts: [
      '平静是一种很棒的状态，像大树一样稳稳地站在那里，什么都不怕。',
      '不一定要开心才算好哦，平平静静也是一种幸福。',
      '现在的你就像蓝天上的白云，轻轻的、慢慢的，挺好的～',
      '平静的时候最适合做点喜欢的事，看本书、画幅画，享受这一刻吧。',
    ],
  },
  {
    id: 'sad', emoji: '😢', label: '难过', color: '#74B9FF', bg: 'linear-gradient(135deg, #EBF5FF 0%, #D6EAFF 100%)',
    title: '难过的时候，小屋抱抱你。', score: 2,
    comforts: [
      '难过没关系的，眼泪是心里的小雨，下完了天就晴了。小屋在这里陪着你。',
      '每个人都有难过的时候，这不代表你不好，只代表你在乎的事情很重要。',
      '难过的时候可以哭出来，也可以找个安静的地方待一会儿。等你准备好了，小屋还在这里。',
      '如果心里像压了一块石头，试试深呼吸三次——吸气……呼气……你已经在慢慢变好了。',
    ],
  },
  {
    id: 'angry', emoji: '😤', label: '生气', color: '#FF7675', bg: 'linear-gradient(135deg, #FFE5E5 0%, #FFD4D4 100%)',
    title: '生气是正常的，小帽帮你慢慢消气。', score: 1,
    comforts: [
      '生气说明有你觉得不公平的事情，这很正常。先做3次深呼吸，等气消一点再想办法。',
      '生气的时候，试试从1数到10。数完后，你会发现心里平静了一点点。',
      '你可以生气的，但别让生气控制你。你是情绪的主人，不是它的奴隶哦。',
      '如果有人让你生气，先离开一下，去喝口水、看看窗外，等平静了再说话。',
    ],
  },
  {
    id: 'worried', emoji: '😰', label: '担心', color: '#A29BFE', bg: 'linear-gradient(135deg, #F3E8FF 0%, #E8DBFF 100%)',
    title: '担心的时候，小屋陪你一起想办法。', score: 2,
    comforts: [
      '担心是因为你在乎结果，这说明你很用心。不过有些事情不是你能控制的，先把能做的做好吧。',
      '试试把担心的事说出来或写下来，说出来就已经好了一半。',
      '担心就像天上的乌云，看起来很大，但风吹过来就会散的。现在的你比乌云强多了。',
      '想一想：最坏的结果是什么？真的发生了会怎样？很多时候，事情没有我们担心的那么糟。',
    ],
  },
]

const selectedMood = ref('')
const comfortIndex = ref(0)

const currentMood = computed(() => moods.find(m => m.id === selectedMood.value) || moods[0])
const comfortText = computed(() => {
  const m = currentMood.value
  return m.comforts[comfortIndex.value % m.comforts.length]
})

function selectMood(id: string) {
  selectedMood.value = id
  comfortIndex.value = 0
  saveMoodRecord(id)
}

function refreshComfort() {
  comfortIndex.value++
}

// ============================================
// 心情记录（localStorage 简单持久化）
// ============================================
interface MoodRecord {
  id: string
  emoji: string
  label: string
  color: string
  score: number
  date: string
}

const STORAGE_KEY_MOOD = 'mood_records'
const STORAGE_KEY_GRATITUDE = 'gratitude_records'

const moodHistory = ref<MoodRecord[]>([])
const gratitudeRecords = ref<{ text: string; time: string }[]>([])
const gratitudeText = ref('')

function loadMoodHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MOOD)
    if (raw) moodHistory.value = JSON.parse(raw)
  } catch { /* ignore */ }
}

function saveMoodRecord(moodId: string) {
  const m = moods.find(x => x.id === moodId)
  if (!m) return
  const now = new Date()
  const record: MoodRecord = {
    id: m.id, emoji: m.emoji, label: m.label, color: m.color, score: m.score,
    date: `${now.getMonth() + 1}/${now.getDate()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
  }
  moodHistory.value.unshift(record)
  if (moodHistory.value.length > 50) moodHistory.value = moodHistory.value.slice(0, 50)
  try {
    localStorage.setItem(STORAGE_KEY_MOOD, JSON.stringify(moodHistory.value))
  } catch { /* ignore */ }
}

function loadGratitude() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_GRATITUDE)
    if (raw) gratitudeRecords.value = JSON.parse(raw)
  } catch { /* ignore */ }
}

function saveGratitude() {
  const text = gratitudeText.value.trim()
  if (!text) return
  const now = new Date()
  gratitudeRecords.value.unshift({
    text,
    time: `${now.getMonth() + 1}/${now.getDate()}`,
  })
  if (gratitudeRecords.value.length > 20) gratitudeRecords.value = gratitudeRecords.value.slice(0, 20)
  try {
    localStorage.setItem(STORAGE_KEY_GRATITUDE, JSON.stringify(gratitudeRecords.value))
  } catch { /* ignore */ }
  gratitudeText.value = ''
  showToast({ message: '记好啦！开心的事要常常想起～', position: 'middle' })
}

// ============================================
// 呼吸放松动画
// ============================================
const isBreathing = ref(false)
const breathPhase = ref(0) // 0=准备 1=吸气 2=屏息 3=呼气
const breathCycles = ref(0)
let breathTimer: ReturnType<typeof setInterval> | null = null

const breathPhaseText = computed(() => {
  if (!isBreathing.value) return '👉 点击开始'
  if (breathPhase.value === 1) return '吸气…'
  if (breathPhase.value === 2) return '屏住…'
  if (breathPhase.value === 3) return '呼气…'
  return '准备…'
})

function toggleBreath() {
  if (isBreathing.value) {
    stopBreath()
  } else {
    startBreath()
  }
}

function startBreath() {
  isBreathing.value = true
  breathPhase.value = 1
  let phaseCount = 0
  // 吸气4s → 屏息4s → 呼气6s = 14s/轮
  breathTimer = setInterval(() => {
    phaseCount++
    if (phaseCount <= 4) {
      breathPhase.value = 1 // 吸气
    } else if (phaseCount <= 8) {
      breathPhase.value = 2 // 屏息
    } else if (phaseCount <= 14) {
      breathPhase.value = 3 // 呼气
    } else {
      phaseCount = 0
      breathCycles.value++
      breathPhase.value = 1
    }
  }, 1000)
}

function stopBreath() {
  isBreathing.value = false
  breathPhase.value = 0
  if (breathTimer) {
    clearInterval(breathTimer)
    breathTimer = null
  }
  if (breathCycles.value > 0) {
    showToast({ message: `完成了 ${breathCycles.value} 轮呼吸，很棒！`, position: 'middle' })
  }
}

// ============================================
// PERMA 小练习
// ============================================
interface Exercise {
  emoji: string
  name: string
  desc: string
  bg: string
  detail: string
  needInput: boolean
  placeholder: string
}

const showExercise = ref(false)
const showExerciseDetail = ref(false)
const currentExercise = ref<Exercise | null>(null)
const exerciseAnswer = ref('')

const exercises: Exercise[] = [
  {
    emoji: '🎉', name: '今天的小确幸', desc: '想3件今天发生的开心小事',
    bg: 'linear-gradient(135deg, #FFF5EE 0%, #FFE8D5 100%)',
    detail: '闭上眼睛想一想，今天有没有发生什么让你嘴角上扬的小事？比如吃到了好吃的、朋友对你笑了、或者作业做对了。想出3件，写在下面吧！',
    needInput: true,
    placeholder: '1. …\n2. …\n3. …',
  },
  {
    emoji: '💪', name: '我做到了！', desc: '想想最近完成的一件了不起的事',
    bg: 'linear-gradient(135deg, #EBF3FF 0%, #D6EAFF 100%)',
    detail: '不一定要是大事哦——按时起床、完成作业、帮妈妈做家务，都算！想想你最近做到了什么让你自己觉得"嘿，还不错"的事？',
    needInput: true,
    placeholder: '我做到了……',
  },
  {
    emoji: '🤗', name: '感谢一个人', desc: '想一个你想说谢谢的人',
    bg: 'linear-gradient(135deg, #E8F8F6 0%, #D4F0EB 100%)',
    detail: '有没有一个人，最近帮了你或者对你很好？可以是爸爸妈妈、老师、同学，甚至是你自己！想想TA做了什么，你想对TA说什么？',
    needInput: true,
    placeholder: '我想感谢…因为…',
  },
  {
    emoji: '🌟', name: '我的超能力', desc: '找出自己最棒的一个优点',
    bg: 'linear-gradient(135deg, #FDF0F7 0%, #F8DCEC 100%)',
    detail: '每个人都有超能力！你的可能是很会画画、跑步很快、字写得好看、或者很会安慰朋友。你的超能力是什么呢？',
    needInput: true,
    placeholder: '我的超能力是……',
  },
  {
    emoji: '🎈', name: '放飞烦恼', desc: '把烦恼装进气球，放飞它',
    bg: 'linear-gradient(135deg, #F3E8FF 0%, #E8DBFF 100%)',
    detail: '想象你手里有一个大气球，把现在烦恼的事都吹进气球里——然后松手，看着它飞得越来越高、越来越远，直到看不见。烦恼也跟着飞走了。',
    needInput: false,
    placeholder: '',
  },
]

function doExercise(ex: Exercise) {
  currentExercise.value = ex
  exerciseAnswer.value = ''
  showExercise.value = false
  showExerciseDetail.value = true
}

function finishExercise() {
  showExerciseDetail.value = false
  showToast({ message: '太棒了！你正在照顾自己的心情 ✨', position: 'middle', duration: 2000 })
  exerciseAnswer.value = ''
}

// ============================================
// 生命周期
// ============================================
onMounted(() => {
  userStore.loadUser()
  loadMoodHistory()
  loadGratitude()
})

onUnmounted(() => {
  if (breathTimer) clearInterval(breathTimer)
})

// 选中情绪时滚动到安慰卡片
watch(selectedMood, (val) => {
  if (val) {
    // 给 DOM 一点时间渲染
    setTimeout(() => {
      const el = document.querySelector('.comfort-card')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }
})
</script>

<style scoped lang="scss">
.mood-page { padding-bottom: calc(#{$tabbar-height} + #{$safe-bottom} + 20px); }

.streak-emoji { font-size: 20px; }

// ============================================
// 顶部情绪选择
// ============================================
.mood-hero {
  position: relative;
  overflow: hidden;
  padding: calc(56px + #{$safe-top}) $spacing-base $spacing-xl;
  border-radius: 0 0 $radius-xl $radius-xl;
  background: linear-gradient(135deg, #A29BFE 0%, #6C5CE7 100%);
  color: #fff;
  text-align: center;
}

.mood-hero .floating-star {
  position: absolute;
  font-size: 16px;
  animation: float 3s ease-in-out infinite;
  pointer-events: none;
  &.s1 { top: 16px; right: 24px; }
  &.s2 { top: 50px; left: 30px; font-size: 12px; animation-delay: 1.5s; }
}

.hero-question {
  font-size: $font-size-lg;
  font-weight: $font-weight-bold;
  margin-bottom: $spacing-xs;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.hero-hint {
  font-size: $font-size-sm;
  opacity: 0.85;
  margin-bottom: $spacing-lg;
}

.mood-picker {
  display: flex;
  justify-content: center;
  gap: $spacing-md;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}

.mood-face {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: $spacing-sm $spacing-md;
  border-radius: $radius-lg;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all $duration-base $easing-bounce;

  &:active { transform: scale(0.9); }

  &.active {
    background: rgba(255, 255, 255, 0.95);
    border-color: rgba(255, 255, 255, 0.6);
    transform: scale(1.1);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);

    .mood-emoji { transform: scale(1.1); }
    .mood-label { color: $color-primary; }
  }
}

.mood-emoji {
  font-size: 32px;
  transition: transform $duration-base;
}

.mood-label {
  font-size: $font-size-xs;
  color: rgba(255, 255, 255, 0.9);
  font-weight: $font-weight-semibold;
}

// ============================================
// 卡片通用
// ============================================
.card-header {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  margin-bottom: $spacing-md;
}

.card-icon-wrap {
  width: 32px;
  height: 32px;
  border-radius: $radius-sm;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.card-title {
  font-size: $font-size-md;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
  flex: 1;
}

// ============================================
// 安慰卡片
// ============================================
.comfort-card {
  text-align: center;
  padding: $spacing-xl $spacing-base;
  margin-top: $spacing-base;
  border: none;
}

.comfort-emoji {
  font-size: 48px;
  margin-bottom: $spacing-sm;
}

.comfort-title {
  font-size: $font-size-md;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
  margin-bottom: $spacing-sm;
}

.comfort-text {
  font-size: $font-size-base;
  color: $color-text-regular;
  line-height: 1.8;
  margin-bottom: $spacing-lg;
  padding: 0 $spacing-sm;
}

.comfort-actions {
  display: flex;
  justify-content: center;
  gap: $spacing-sm;
}

// ============================================
// 呼吸放松
// ============================================
.breath-desc {
  font-size: $font-size-sm;
  color: $color-text-secondary;
  text-align: center;
  margin-bottom: $spacing-lg;
}

.breath-circle-wrap {
  display: flex;
  justify-content: center;
  padding: $spacing-lg 0;
  cursor: pointer;
}

.breath-circle {
  width: 120px;
  height: 120px;
  border-radius: $radius-circle;
  background: linear-gradient(135deg, #A8DCFF 0%, #74B9FF 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(116, 185, 255, 0.3);
  transition: transform 4s ease-in-out, background 2s;

  &.breathing {
    animation: breathPulse 14s ease-in-out infinite;
  }
}

@keyframes breathPulse {
  0% { transform: scale(0.8); background: linear-gradient(135deg, #A8DCFF 0%, #74B9FF 100%); }
  28.6% { transform: scale(1.3); background: linear-gradient(135deg, #74B9FF 0%, #6C5CE7 100%); }
  57.1% { transform: scale(1.3); background: linear-gradient(135deg, #6C5CE7 0%, #A29BFE 100%); }
  100% { transform: scale(0.8); background: linear-gradient(135deg, #A8DCFF 0%, #74B9FF 100%); }
}

.breath-text {
  font-size: $font-size-sm;
  font-weight: $font-weight-bold;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.breath-tip {
  text-align: center;
  font-size: $font-size-xs;
  color: $color-text-secondary;
  margin-top: $spacing-sm;
}

// ============================================
// 今日小确幸
// ============================================
.gratitude-card { margin-top: $spacing-sm; }

.gratitude-list {
  margin-top: $spacing-md;
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
}

.gratitude-item {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-sm $spacing-md;
  background: #FFF9E6;
  border-radius: $radius-sm;
}

.gratitude-bullet { font-size: 14px; flex-shrink: 0; }

.gratitude-text {
  flex: 1;
  font-size: $font-size-sm;
  color: $color-text-primary;
  font-weight: $font-weight-medium;
}

.gratitude-time {
  font-size: $font-size-xs;
  color: $color-text-secondary;
  flex-shrink: 0;
}

.gratitude-save-btn {
  margin-top: $spacing-md;
  font-weight: $font-weight-bold !important;
}

// ============================================
// 心情日记本
// ============================================
.diary-card { margin-top: $spacing-sm; }

.diary-count {
  font-size: $font-size-xs;
  color: $color-text-secondary;
  background: $color-bg-alt;
  padding: 2px 10px;
  border-radius: $radius-pill;
  font-weight: $font-weight-semibold;
}

.diary-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.diary-item {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-sm $spacing-md;
  border-radius: $radius-sm;
  background: $color-bg;
}

.diary-emoji { font-size: 24px; flex-shrink: 0; }

.diary-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.diary-mood {
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
}

.diary-date {
  font-size: $font-size-xs;
  color: $color-text-secondary;
}

.diary-chart {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 28px;
}

.diary-bar {
  width: 6px;
  border-radius: 3px;
  transition: opacity $duration-base;
}

.diary-empty {
  text-align: center;
  padding: $spacing-xl 0;

  .diary-empty-emoji { font-size: 40px; display: block; margin-bottom: 8px; }
  p { font-size: $font-size-sm; color: $color-text-secondary; }
}

// ============================================
// PERMA 练习弹窗
// ============================================
.exercise-popup {
  padding: $spacing-xl $spacing-base calc(#{$safe-bottom} + #{$spacing-lg});
}

.exercise-title {
  text-align: center;
  font-size: $font-size-lg;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
  margin-bottom: $spacing-xs;
}

.exercise-subtitle {
  text-align: center;
  font-size: $font-size-sm;
  color: $color-text-secondary;
  margin-bottom: $spacing-lg;
}

.exercise-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  margin-bottom: $spacing-lg;
}

.exercise-item {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-md;
  border-radius: $radius-md;
  cursor: pointer;
  transition: transform $duration-base $easing-bounce;

  &:active { transform: scale(0.97); }
}

.exercise-emoji { font-size: 28px; flex-shrink: 0; }

.exercise-info { flex: 1; }
.exercise-name {
  font-size: $font-size-base;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
}
.exercise-desc {
  font-size: $font-size-xs;
  color: $color-text-secondary;
  margin-top: 2px;
}

.exercise-arrow {
  font-size: 18px;
  color: $color-text-placeholder;
}

.exercise-close { margin-top: $spacing-sm; }

// ============================================
// 练习详情弹窗
// ============================================
.exercise-detail {
  padding: $spacing-xl $spacing-lg;
  text-align: center;
}

.exercise-detail-emoji {
  font-size: 48px;
  margin-bottom: $spacing-sm;
}

.exercise-detail-title {
  font-size: $font-size-md;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
  margin-bottom: $spacing-sm;
}

.exercise-detail-desc {
  font-size: $font-size-sm;
  color: $color-text-regular;
  line-height: 1.8;
  margin-bottom: $spacing-lg;
  text-align: left;
}

.exercise-detail-input {
  margin-bottom: $spacing-lg;
  text-align: left;
}

.exercise-detail-btn {
  font-weight: $font-weight-bold !important;
}
</style>
