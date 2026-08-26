<template>
  <div class="qa-engine">
    <div class="qa-card">
      <p class="qa-question">{{ data.q }}</p>
      <div v-if="data.options" class="qa-options">
        <div v-for="(opt, i) in data.options" :key="i" class="qa-option"
          :class="{ 'opt-correct': showResult && opt === data.answer, 'opt-wrong': showResult && selected === opt && opt !== data.answer }"
          @click="select(opt)">
          <span class="opt-letter">{{ String.fromCharCode(65 + i) }}</span>
          <span>{{ opt }}</span>
        </div>
      </div>
      <div v-else class="qa-fill-area">
        <input :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
          class="qa-input" placeholder="输入答案" @keyup.enter="$emit('confirm')" ref="inputRef" />
        <van-button size="small" :color="color" @click="$emit('confirm')">确认</van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  data: any
  color: string
  showResult: boolean
  selected: string
  modelValue: string
}>()

const emit = defineEmits<{
  select: [val: string]
  confirm: []
  'update:modelValue': [val: string]
}>()

const inputRef = ref<HTMLInputElement | null>(null)

function select(val: string) {
  emit('select', val)
}

onMounted(() => {
  if (!props.data.options && inputRef.value) {
    inputRef.value.focus()
  }
})
</script>

<style scoped lang="scss">
.qa-card { background: #fff; border-radius: 12px; padding: 20px 16px; }
.qa-question { font-size: 18px; color: $color-text-primary; margin-bottom: 16px; text-align: center; line-height: 1.6; }
.qa-options { display: flex; flex-direction: column; gap: 10px; }
.qa-option {
  display: flex; gap: 10px; align-items: center;
  padding: 14px; border-radius: 10px; background: $color-bg;
  font-size: 16px; cursor: pointer; transition: all 0.2s;
  &:active { transform: scale(0.98); }
  &.opt-correct { background: #E8F5E9; color: #2E7D32; }
  &.opt-wrong { background: #FFEBEE; color: #C62828; }
}
.opt-letter {
  width: 28px; height: 28px; border-radius: 50%;
  background: #fff; display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 600; color: $color-text-secondary; flex-shrink: 0;
}
.qa-fill-area { display: flex; gap: 8px; align-items: center; }
.qa-input {
  flex: 1; height: 40px; border: 1px solid $color-border; border-radius: 8px;
  padding: 0 12px; font-size: 16px; outline: none;
  &:focus { border-color: $color-primary; }
}
</style>
