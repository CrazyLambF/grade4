<template>
  <div class="page-container showcase-page">
    <van-nav-bar title="动画效果展示" left-arrow @click-left="$router.back()" />
    
    <div class="content">
      <div class="showcase-header">
        <h1 class="showcase-title">🎨 动画效果库</h1>
        <p class="showcase-desc">点击查看各种动画效果，为小学生学习应用增添游戏感</p>
      </div>
      
      <!-- 基础动画 -->
      <div class="section">
        <h2 class="section-title">🎯 基础动画</h2>
        <div class="animation-grid">
          <div class="animation-card" @click="playAnimation('pressBounce')">
            <div class="animation-demo press-bounce">
              <div class="demo-element"></div>
            </div>
            <p class="animation-name">弹跳按压</p>
            <p class="animation-desc">按钮、卡片</p>
          </div>
          
          <div class="animation-card" @click="playAnimation('shake')">
            <div class="animation-demo shake">
              <div class="demo-element"></div>
            </div>
            <p class="animation-name">抖动效果</p>
            <p class="animation-desc">错误反馈</p>
          </div>
          
          <div class="animation-card" @click="playAnimation('bounceScale')">
            <div class="animation-demo bounce-scale">
              <div class="demo-element"></div>
            </div>
            <p class="animation-name">弹跳放大</p>
            <p class="animation-desc">序号、图标</p>
          </div>
          
          <div class="animation-card" @click="playAnimation('pulse')">
            <div class="animation-demo pulse">
              <div class="demo-element"></div>
            </div>
            <p class="animation-name">脉冲效果</p>
            <p class="animation-desc">选中状态</p>
          </div>
        </div>
      </div>
      
      <!-- 反馈动画 -->
      <div class="section">
        <h2 class="section-title">✨ 反馈动画</h2>
        <div class="animation-grid">
          <div class="animation-card" @click="playAnimation('flashSuccess')">
            <div class="animation-demo flash-success">
              <div class="demo-element success"></div>
            </div>
            <p class="animation-name">成功闪光</p>
            <p class="animation-desc">正确答案</p>
          </div>
          
          <div class="animation-card" @click="playAnimation('flashError')">
            <div class="animation-demo flash-error">
              <div class="demo-element error"></div>
            </div>
            <p class="animation-name">错误闪光</p>
            <p class="animation-desc">错误答案</p>
          </div>
          
          <div class="animation-card" @click="playAnimation('wiggleLight')">
            <div class="animation-demo wiggle-light">
              <div class="demo-element"></div>
            </div>
            <p class="animation-name">轻微抖动</p>
            <p class="animation-desc">庆祝效果</p>
          </div>
          
          <div class="animation-card" @click="playAnimation('spinPress')">
            <div class="animation-demo spin-press">
              <div class="demo-element"></div>
            </div>
            <p class="animation-name">旋转按压</p>
            <p class="animation-desc">重做按钮</p>
          </div>
        </div>
      </div>
      
      <!-- 展开动画 -->
      <div class="section">
        <h2 class="section-title">📖 展开动画</h2>
        <div class="animation-grid">
          <div class="animation-card" @click="playAnimation('slideDown')">
            <div class="animation-demo slide-down">
              <div class="demo-element"></div>
            </div>
            <p class="animation-name">滑入效果</p>
            <p class="animation-desc">展开内容</p>
          </div>
          
          <div class="animation-card" @click="toggleExpand">
            <div class="animation-demo expand-demo">
              <div class="expand-header">
                <van-icon :name="expanded ? 'arrow-down' : 'arrow'" size="12" />
                <span>点击展开</span>
              </div>
              <transition name="collapse">
                <div v-if="expanded" class="expand-content">
                  <p>这是展开的内容</p>
                </div>
              </transition>
            </div>
            <p class="animation-name">展开/收起</p>
            <p class="animation-desc">知识点树</p>
          </div>
        </div>
      </div>
      
      <!-- 组合动画 -->
      <div class="section">
        <h2 class="section-title">🎭 组合动画</h2>
        <div class="animation-grid">
          <div class="animation-card" @click="playAnimation('successCombo')">
            <div class="animation-demo success-combo">
              <div class="demo-element success"></div>
            </div>
            <p class="animation-name">成功组合</p>
            <p class="animation-desc">闪光 + 脉冲</p>
          </div>
          
          <div class="animation-card" @click="playAnimation('errorCombo')">
            <div class="animation-demo error-combo">
              <div class="demo-element error"></div>
            </div>
            <p class="animation-name">错误组合</p>
            <p class="animation-desc">抖动 + 闪光</p>
          </div>
          
          <div class="animation-card" @click="playAnimation('buttonCombo')">
            <div class="animation-demo button-combo">
              <div class="demo-element button"></div>
            </div>
            <p class="animation-name">按钮组合</p>
            <p class="animation-desc">按压 + 阴影</p>
          </div>
          
          <div class="animation-card" @click="playAnimation('cardCombo')">
            <div class="animation-demo card-combo">
              <div class="demo-element card"></div>
            </div>
            <p class="animation-name">卡片组合</p>
            <p class="animation-desc">放大 + 旋转</p>
          </div>
        </div>
      </div>
      
      <!-- 交互示例 -->
      <div class="section">
        <h2 class="section-title">🎮 交互示例</h2>
        
        <!-- 按钮示例 -->
        <div class="example-card">
          <h3 class="example-title">按钮交互</h3>
          <div class="button-examples">
            <button class="example-btn primary">主要按钮</button>
            <button class="example-btn secondary">次要按钮</button>
            <button class="example-btn success">成功按钮</button>
            <button class="example-btn danger">危险按钮</button>
          </div>
          <p class="example-desc">点击查看按钮按压效果</p>
        </div>
        
        <!-- 卡片示例 -->
        <div class="example-card">
          <h3 class="example-title">卡片交互</h3>
          <div class="card-examples">
            <div class="example-card-item" v-for="i in 3" :key="i">
              <div class="card-icon">📚</div>
              <div class="card-content">
                <p class="card-title">学习卡片 {{ i }}</p>
                <p class="card-desc">点击查看卡片动画效果</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 选项示例 -->
        <div class="example-card">
          <h3 class="example-title">选项交互</h3>
          <div class="option-examples">
            <div 
              v-for="(option, index) in options" 
              :key="index"
              class="example-option"
              :class="option.status"
              @click="selectOption(index)"
            >
              <span class="option-letter">{{ String.fromCharCode(65 + index) }}</span>
              <span class="option-text">{{ option.text }}</span>
            </div>
          </div>
          <p class="example-desc">点击选项查看不同状态效果</p>
        </div>
      </div>
      
      <!-- 动画参数 -->
      <div class="section">
        <h2 class="section-title">⚙️ 动画参数</h2>
        <div class="params-card">
          <div class="param-item">
            <span class="param-label">快速动画</span>
            <span class="param-value">0.15s</span>
          </div>
          <div class="param-item">
            <span class="param-label">基础动画</span>
            <span class="param-value">0.25s</span>
          </div>
          <div class="param-item">
            <span class="param-label">慢速动画</span>
            <span class="param-value">0.4s</span>
          </div>
          <div class="param-item">
            <span class="param-label">弹跳缓动</span>
            <span class="param-value">cubic-bezier(0.68, -0.55, 0.265, 1.55)</span>
          </div>
          <div class="param-item">
            <span class="param-label">平滑缓动</span>
            <span class="param-value">cubic-bezier(0.4, 0, 0.2, 1)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const expanded = ref(false)
const options = reactive([
  { text: '选项A - 默认状态', status: 'default' },
  { text: '选项B - 选中状态', status: 'selected' },
  { text: '选项C - 正确答案', status: 'correct' },
  { text: '选项D - 错误答案', status: 'wrong' },
])

function playAnimation(name: string) {
  console.log('播放动画:', name)
  // 这里可以添加动画触发逻辑
}

function toggleExpand() {
  expanded.value = !expanded.value
}

function selectOption(index: number) {
  // 重置所有选项状态
  options.forEach(opt => opt.status = 'default')
  // 设置选中状态
  options[index].status = 'selected'
}
</script>

<style scoped lang="scss">
.showcase-page {
  padding-bottom: 40px;
}

.content {
  padding: 16px;
}

.showcase-header {
  text-align: center;
  margin-bottom: 32px;
}

.showcase-title {
  font-size: 24px;
  font-weight: 800;
  color: $color-text-primary;
  margin-bottom: 8px;
}

.showcase-desc {
  font-size: 14px;
  color: $color-text-secondary;
  line-height: 1.5;
}

.section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: $color-text-primary;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid $color-border;
}

.animation-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.animation-card {
  background: white;
  border-radius: 16px;
  padding: 16px;
  text-align: center;
  box-shadow: $shadow-sm;
  cursor: pointer;
  transition: all $duration-base $easing-bounce;
  
  &:active {
    transform: scale(0.95);
    box-shadow: $shadow-md;
  }
}

.animation-demo {
  width: 80px;
  height: 80px;
  margin: 0 auto 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $color-bg;
  border-radius: 12px;
}

.demo-element {
  width: 40px;
  height: 40px;
  background: $color-primary;
  border-radius: 8px;
  transition: all $duration-base $easing-bounce;
  
  &.success {
    background: $color-success;
  }
  
  &.error {
    background: $color-error;
  }
  
  &.button {
    background: $color-primary;
    border-radius: 20px;
    width: 60px;
    height: 30px;
  }
  
  &.card {
    background: white;
    border: 2px solid $color-border;
    width: 60px;
    height: 40px;
  }
}

.animation-name {
  font-size: 14px;
  font-weight: 600;
  color: $color-text-primary;
  margin-bottom: 4px;
}

.animation-desc {
  font-size: 12px;
  color: $color-text-secondary;
}

// 基础动画
.press-bounce .demo-element:active {
  animation: pressBounce 0.3s $easing-bounce;
}

.shake .demo-element:active {
  animation: shake 0.4s ease-in-out;
}

.bounce-scale .demo-element:active {
  animation: bounceScale 0.4s $easing-bounce;
}

.pulse .demo-element:active {
  animation: pulse 0.3s $easing-bounce;
}

// 反馈动画
.flash-success .demo-element:active {
  animation: flashSuccess 0.6s ease-out;
}

.flash-error .demo-element:active {
  animation: flashError 0.6s ease-out;
}

.wiggle-light .demo-element:active {
  animation: wiggleLight 0.5s ease-in-out;
}

.spin-press .demo-element:active {
  animation: spinPress 0.6s $easing-bounce;
}

// 展开动画
.slide-down .demo-element {
  transform: translateY(-10px);
  opacity: 0;
  transition: all $duration-slow $easing-smooth;
  
  &:active {
    transform: translateY(0);
    opacity: 1;
  }
}

.expand-demo {
  flex-direction: column;
  align-items: stretch;
  padding: 12px;
}

.expand-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: $color-text-primary;
  cursor: pointer;
  
  .van-icon {
    transition: transform $duration-base $easing-smooth;
  }
}

.expand-content {
  margin-top: 12px;
  padding: 12px;
  background: $color-bg;
  border-radius: 8px;
  font-size: 13px;
  color: $color-text-regular;
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

// 组合动画
.success-combo .demo-element:active {
  animation: flashSuccess 0.6s ease-out, pulse 0.3s $easing-bounce 0.3s;
}

.error-combo .demo-element:active {
  animation: shake 0.4s ease-in-out, flashError 0.6s ease-out;
}

.button-combo .demo-element:active {
  transform: scale(0.9);
  box-shadow: $shadow-md;
}

.card-combo .demo-element:active {
  transform: scale(0.98) rotate(-2deg);
  box-shadow: $shadow-md;
}

// 示例卡片
.example-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: $shadow-sm;
}

.example-title {
  font-size: 16px;
  font-weight: 700;
  color: $color-text-primary;
  margin-bottom: 16px;
}

.example-desc {
  font-size: 13px;
  color: $color-text-secondary;
  margin-top: 12px;
  text-align: center;
}

// 按钮示例
.button-examples {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.example-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all $duration-base $easing-bounce;
  
  &.primary {
    background: $color-primary;
    color: white;
    
    &:active {
      transform: scale(0.92);
      box-shadow: $shadow-md;
      filter: brightness(0.95);
    }
  }
  
  &.secondary {
    background: $color-bg;
    color: $color-primary;
    border: 2px solid $color-primary;
    
    &:active {
      transform: scale(0.92);
      background: lighten($color-primary, 40%);
    }
  }
  
  &.success {
    background: $color-success;
    color: white;
    
    &:active {
      transform: scale(0.92);
      box-shadow: 0 4px 12px rgba(0, 184, 148, 0.3);
    }
  }
  
  &.danger {
    background: $color-error;
    color: white;
    
    &:active {
      transform: scale(0.92);
      box-shadow: 0 4px 12px rgba(255, 118, 117, 0.3);
    }
  }
}

// 卡片示例
.card-examples {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.example-card-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: $color-bg;
  border-radius: 12px;
  cursor: pointer;
  transition: all $duration-base $easing-bounce;
  
  &:active {
    transform: scale(0.98) rotate(-1deg);
    box-shadow: $shadow-md;
    background: white;
  }
}

.card-icon {
  font-size: 24px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 12px;
  box-shadow: $shadow-sm;
}

.card-content {
  flex: 1;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: $color-text-primary;
  margin-bottom: 4px;
}

.card-desc {
  font-size: 13px;
  color: $color-text-secondary;
}

// 选项示例
.option-examples {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.example-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: $color-bg;
  border-radius: 10px;
  cursor: pointer;
  transition: all $duration-base $easing-bounce;
  border: 2px solid transparent;
  
  &.default {
    &:active {
      transform: scale(0.95);
      border-color: $color-primary;
      box-shadow: $shadow-sm;
    }
  }
  
  &.selected {
    background: lighten($color-primary, 40%);
    border-color: $color-primary;
    animation: pulse 0.3s $easing-bounce;
  }
  
  &.correct {
    background: lighten($color-success, 40%);
    border-color: $color-success;
    animation: flashSuccess 0.6s ease-out;
  }
  
  &.wrong {
    background: lighten($color-error, 40%);
    border-color: $color-error;
    animation: shake 0.4s ease-in-out, flashError 0.6s ease-out;
  }
}

.option-letter {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: $color-text-secondary;
  flex-shrink: 0;
}

.example-option.selected .option-letter {
  background: $color-primary;
  color: white;
}

.example-option.correct .option-letter {
  background: $color-success;
  color: white;
}

.example-option.wrong .option-letter {
  background: $color-error;
  color: white;
}

.option-text {
  font-size: 15px;
  color: $color-text-primary;
}

// 参数卡片
.params-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: $shadow-sm;
}

.param-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid $color-border;
  
  &:last-child {
    border-bottom: none;
  }
}

.param-label {
  font-size: 14px;
  font-weight: 600;
  color: $color-text-primary;
}

.param-value {
  font-size: 13px;
  color: $color-text-secondary;
  font-family: 'JetBrains Mono', monospace;
  background: $color-bg;
  padding: 4px 8px;
  border-radius: 6px;
}
</style>
