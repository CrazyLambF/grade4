<template>
  <div class="page-container test-page">
    <van-nav-bar title="动画效果测试" left-arrow @click-left="$router.back()" />
    
    <div class="content">
      <h2 class="section-title">预习页面动画</h2>
      
      <!-- 预习要点序号 -->
      <div class="card">
        <h3 class="card-title">预习要点序号</h3>
        <div class="demo-row">
          <div v-for="i in 5" :key="i" class="point-num" :style="{ background: '#6C5CE7' }">{{ i }}</div>
        </div>
        <p class="demo-desc">点击序号查看弹跳效果</p>
      </div>
      
      <!-- 生字卡片 -->
      <div class="card">
        <h3 class="card-title">生字卡片</h3>
        <div class="demo-row">
          <div v-for="char in ['天', '地', '人', '和']" :key="char" class="word-char" style="border-color: #FF8C42;">{{ char }}</div>
        </div>
        <p class="demo-desc">点击生字查看抖动效果</p>
      </div>
      
      <!-- 核心概念卡片 -->
      <div class="card">
        <h3 class="card-title">核心概念卡片</h3>
        <div class="concept-item" style="border-left-color: #4E8AF2;">
          <h4 class="concept-title">数学概念</h4>
          <p class="concept-desc">加法交换律：a + b = b + a</p>
        </div>
        <p class="demo-desc">点击概念卡片查看旋转效果</p>
      </div>
      
      <!-- 英语发音按钮 -->
      <div class="card">
        <h3 class="card-title">英语发音按钮</h3>
        <div class="demo-row">
          <van-icon name="volume-o" size="24" color="#2EC4B6" class="speak-btn" />
          <span class="demo-text">Hello</span>
        </div>
        <p class="demo-desc">点击发音按钮查看放大效果</p>
      </div>
      
      <h2 class="section-title">复习页面动画</h2>
      
      <!-- 选项点击 -->
      <div class="card">
        <h3 class="card-title">选项点击</h3>
        <div class="q-options">
          <div class="q-option" @click="handleOptionClick('A')">
            <span class="opt-letter">A</span>
            <span>选项A</span>
          </div>
          <div class="q-option" @click="handleOptionClick('B')">
            <span class="opt-letter">B</span>
            <span>选项B</span>
          </div>
          <div class="q-option correct">
            <span class="opt-letter">C</span>
            <span>正确答案（闪光效果）</span>
          </div>
          <div class="q-option wrong">
            <span class="opt-letter">D</span>
            <span>错误答案（抖动效果）</span>
          </div>
        </div>
        <p class="demo-desc">点击选项查看按压效果，正确/错误答案有特殊反馈</p>
      </div>
      
      <!-- 知识点树 -->
      <div class="card">
        <h3 class="card-title">知识点树</h3>
        <div class="knowledge-tree">
          <div class="knowledge-node">
            <div class="node-header" @click="toggleNode">
              <van-icon :name="expanded ? 'arrow-down' : 'arrow'" size="12" color="#6C5CE7" />
              <span class="node-title">数学基础</span>
            </div>
            <transition name="collapse">
              <div v-if="expanded" class="node-children">
                <div class="child-node">
                  <span class="child-dot" style="background: #6C5CE7;"></span>
                  <div>
                    <p class="child-title">加法</p>
                    <p class="child-content">两个数相加的运算</p>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <p class="demo-desc">点击节点查看展开/收起动画</p>
      </div>
      
      <!-- 重做按钮 -->
      <div class="card">
        <h3 class="card-title">重做按钮</h3>
        <div class="retry-bar">
          <van-button plain round size="small" color="#6C5CE7" icon="refresh">重新答题</van-button>
        </div>
        <p class="demo-desc">点击重做按钮查看旋转效果</p>
      </div>
      
      <h2 class="section-title">学科主页动画</h2>
      
      <!-- 课程条目 -->
      <div class="card">
        <h3 class="card-title">课程条目</h3>
        <div class="lesson-item">
          <div class="lesson-info">
            <span class="lesson-dot" style="background: #6C5CE7;"></span>
            <span class="lesson-name">第一课：认识数字</span>
          </div>
          <div class="lesson-actions">
            <div class="lesson-btn lesson-btn--preview" style="border-color: #6C5CE7; color: #6C5CE7;">📖 预习</div>
            <div class="lesson-btn lesson-btn--review" style="background: #6C5CE7;">📝 复习</div>
          </div>
        </div>
        <p class="demo-desc">点击课程条目和按钮查看按压效果</p>
      </div>
      
      <!-- 游戏卡片 -->
      <div class="card">
        <h3 class="card-title">游戏卡片</h3>
        <div class="game-card">
          <div class="game-icon" style="background: #EBF3FF;">
            <van-icon name="game-o" size="26" color="#4E8AF2" />
          </div>
          <div class="game-info">
            <p class="game-name">数学小游戏</p>
            <p class="game-desc">锻炼计算能力</p>
          </div>
          <div class="game-arrow">→</div>
        </div>
        <p class="demo-desc">点击游戏卡片查看放大和箭头移动效果</p>
      </div>
      
      <h2 class="section-title">底部按钮动画</h2>
      
      <!-- 底部按钮 -->
      <div class="card">
        <h3 class="card-title">底部按钮</h3>
        <div class="action-bar">
          <van-button type="primary" block round color="#6C5CE7">去课后复习</van-button>
        </div>
        <p class="demo-desc">点击底部按钮查看按压效果</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const expanded = ref(false)

function toggleNode() {
  expanded.value = !expanded.value
}

function handleOptionClick(option: string) {
  console.log('点击了选项:', option)
}
</script>

<style scoped lang="scss">
.test-page {
  padding-bottom: 40px;
}

.content {
  padding: 16px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: $color-text-primary;
  margin: 24px 0 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid $color-border;
}

.demo-row {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 12px;
}

.demo-desc {
  font-size: 13px;
  color: $color-text-secondary;
  margin-top: 8px;
  font-style: italic;
}

.demo-text {
  font-size: 16px;
  font-weight: 600;
  color: $color-text-primary;
}

// 预习页面动画
.point-num {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all $duration-base $easing-bounce;
  cursor: pointer;
  
  &:active {
    animation: bounceScale 0.4s $easing-bounce;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
}

.word-char {
  font-size: 28px;
  font-weight: 700;
  color: $color-text-primary;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 2px solid;
  border-radius: 12px;
  transition: all $duration-base $easing-bounce;
  cursor: pointer;
  
  &:active {
    animation: shake 0.4s ease-in-out;
    transform: scale(1.1);
    box-shadow: $shadow-md;
    background-color: rgba(108, 92, 231, 0.05);
  }
}

.concept-item {
  padding-left: 12px;
  border-left: 3px solid #ddd;
  transition: all $duration-base $easing-smooth;
  cursor: pointer;
  border-radius: $radius-sm;
  padding: $spacing-sm $spacing-sm $spacing-sm 12px;
  
  &:active {
    transform: scale(0.98) rotate(-1deg);
    box-shadow: $shadow-md;
    background-color: rgba(108, 92, 231, 0.03);
    border-left-width: 4px;
  }
}

.concept-title {
  font-size: 15px;
  font-weight: 600;
  color: $color-text-primary;
  margin-bottom: 4px;
}

.concept-desc {
  font-size: 14px;
  color: $color-text-regular;
  line-height: 1.6;
}

.speak-btn {
  cursor: pointer;
  transition: all $duration-fast $easing-bounce;
  border-radius: 50%;
  padding: 8px;
  
  &:active {
    transform: scale(1.2);
    color: $color-primary-dark;
    box-shadow: 0 2px 8px rgba(108, 92, 231, 0.3);
    background-color: rgba(108, 92, 231, 0.1);
  }
}

// 复习页面动画
.q-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.q-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 10px;
  background: $color-bg;
  font-size: 15px;
  cursor: pointer;
  transition: all $duration-base $easing-bounce;
  border: 2px solid transparent;
  
  &:active:not(.disabled) {
    transform: scale(0.95);
    background-color: darken($color-bg, 5%);
    border-color: $color-primary-light;
    box-shadow: $shadow-sm;
  }
  
  &.correct {
    background: #E8F5E9;
    color: #2E7D32;
    border-color: #52C41A;
    animation: flashSuccess 0.6s ease-out;
  }
  
  &.wrong {
    background: #FFEBEE;
    color: #C62828;
    border-color: #FF4D4F;
    animation: shake 0.4s ease-in-out, flashError 0.6s ease-out;
  }
}

.opt-letter {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1.5px solid currentColor;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.knowledge-tree {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.node-header {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px;
  border-radius: $radius-sm;
  transition: all $duration-fast $easing-smooth;
  
  &:active {
    background-color: rgba(108, 92, 231, 0.05);
    transform: scale(0.98);
  }
  
  .van-icon {
    transition: transform $duration-base $easing-smooth;
  }
}

.node-title {
  font-size: 16px;
  font-weight: 600;
  color: $color-text-primary;
}

.node-children {
  margin-left: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.child-node {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.child-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-top: 8px;
  flex-shrink: 0;
}

.child-title {
  font-size: 14px;
  font-weight: 500;
  color: $color-text-primary;
}

.child-content {
  font-size: 13px;
  color: $color-text-secondary;
}

.collapse-enter-active, .collapse-leave-active {
  transition: all $duration-slow $easing-smooth;
  overflow: hidden;
}

.collapse-enter-from, .collapse-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

.collapse-enter-to, .collapse-leave-from {
  opacity: 1;
  max-height: 300px;
  transform: translateY(0);
}

.retry-bar {
  display: flex;
  justify-content: center;
  margin-top: 16px;
  
  .van-button {
    transition: all $duration-base $easing-bounce;
    
    &:active {
      animation: spinPress 0.6s $easing-bounce;
      box-shadow: $shadow-md;
    }
  }
}

// 学科主页动画
.lesson-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-md;
  border-radius: $radius-md;
  background: $color-bg;
  transition: all $duration-base $easing-bounce;
  cursor: pointer;

  &:active {
    transform: scale(0.97);
    background: darken($color-bg, 3%);
    box-shadow: $shadow-sm;
  }
}

.lesson-info {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
}

.lesson-dot {
  width: 8px;
  height: 8px;
  border-radius: $radius-circle;
  flex-shrink: 0;
}

.lesson-name {
  font-size: $font-size-base;
  color: $color-text-primary;
  font-weight: $font-weight-medium;
}

.lesson-actions {
  display: flex;
  gap: $spacing-sm;
}

.lesson-btn {
  font-size: $font-size-xs;
  padding: 6px 14px;
  border-radius: $radius-pill;
  font-weight: $font-weight-semibold;
  transition: all $duration-base $easing-bounce;
  cursor: pointer;

  &--preview {
    background: transparent;
    border: 2px solid;

    &:active {
      transform: scale(0.85);
      box-shadow: $shadow-md;
      background-color: rgba(108, 92, 231, 0.1);
    }
  }

  &--review {
    color: #fff;
    border: 2px solid transparent;

    &:active {
      transform: scale(0.85);
      box-shadow: $shadow-lg;
      filter: brightness(0.9);
    }
  }
}

.game-card {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  cursor: pointer;
  transition: all $duration-base $easing-bounce;
  padding: $spacing-md;
  border-radius: $radius-md;
  background: $color-card;

  &:active {
    transform: scale(0.97);
    box-shadow: $shadow-md;
    background-color: darken($color-card, 2%);
  }
}

.game-icon {
  width: 48px;
  height: 48px;
  border-radius: $radius-md;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.game-info {
  flex: 1;
}

.game-name {
  font-size: $font-size-md;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
}

.game-desc {
  font-size: $font-size-xs;
  color: $color-text-secondary;
  margin-top: 2px;
}

.game-arrow {
  font-size: 18px;
  color: $color-text-placeholder;
  font-weight: $font-weight-bold;
  transition: all $duration-base $easing-bounce;
}

.game-card:active .game-arrow {
  transform: translateX(6px);
  color: $color-primary;
}

// 底部按钮动画
.action-bar {
  padding: 8px 0;
  
  .van-button {
    transition: all $duration-base $easing-bounce;
    box-shadow: $shadow-md;
    
    &:active {
      transform: scale(0.92);
      box-shadow: $shadow-lg;
      filter: brightness(0.95);
    }
  }
}
</style>
