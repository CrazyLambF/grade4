<template>
  <van-tabbar v-model="active" route safe-area-inset-bottom>
    <van-tabbar-item to="/">
      <span>首页</span>
      <template #icon="props">
        <div class="tab-icon-wrap" :class="{ active: props.active }">
          <span class="tab-emoji">{{ props.active ? '🏠' : '🏡' }}</span>
        </div>
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/weekly">
      <span>周周练</span>
      <template #icon="props">
        <div class="tab-icon-wrap" :class="{ active: props.active }">
          <span class="tab-emoji">{{ props.active ? '✏️' : '📝' }}</span>
        </div>
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/games">
      <span>游戏</span>
      <template #icon="props">
        <div class="tab-icon-wrap" :class="{ active: props.active }">
          <span class="tab-emoji">{{ props.active ? '🎮' : '🕹️' }}</span>
        </div>
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/mistakes">
      <span>错题本</span>
      <template #icon="props">
        <div class="tab-icon-wrap" :class="{ active: props.active }">
          <span class="tab-emoji">{{ props.active ? '📔' : '📚' }}</span>
        </div>
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/profile">
      <span>我的</span>
      <template #icon="props">
        <div class="tab-icon-wrap" :class="{ active: props.active }">
          <span class="tab-emoji">{{ props.active ? '😊' : '🙂' }}</span>
        </div>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const active = ref(0)
</script>

<style scoped lang="scss">
.tab-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: $radius-md;
  transition: all $duration-base $easing-bounce;

  &.active {
    transform: translateY(-4px) scale(1.1);
    background: rgba(108, 92, 231, 0.1);
  }
}

.tab-emoji {
  font-size: 22px;
  line-height: 1;
  transition: transform $duration-base $easing-bounce;
}

// 覆盖 Vant tabbar-item 字体
:deep(.van-tabbar-item__text) {
  font-size: $font-size-xs;
  font-weight: $font-weight-medium;
}

:deep(.van-tabbar-item--active) {
  .van-tabbar-item__text {
    color: $color-primary;
    font-weight: $font-weight-bold;
  }
}
</style>
