# 动画效果使用指南

## 🎯 快速开始

### 1. 导入变量
确保你的组件已经导入了SCSS变量：
```scss
<style scoped lang="scss">
// 变量会自动导入，无需额外操作
</style>
```

### 2. 使用预定义动画
```scss
.my-element {
  transition: all $duration-base $easing-bounce;
  
  &:active {
    // 使用预定义动画
    animation: bounceScale 0.4s $easing-bounce;
  }
}
```

## 🎨 动画效果库

### 弹跳按压效果
适用于：按钮、卡片、可点击元素
```scss
.my-button {
  transition: all $duration-base $easing-bounce;
  
  &:active {
    animation: pressBounce 0.3s $easing-bounce;
  }
}
```

### 抖动效果
适用于：错误反馈、生字卡片
```scss
.error-element {
  animation: shake 0.4s ease-in-out;
}
```

### 弹跳放大
适用于：序号、图标、强调元素
```scss
.icon-element {
  transition: all $duration-base $easing-bounce;
  
  &:active {
    animation: bounceScale 0.4s $easing-bounce;
  }
}
```

### 成功闪光
适用于：正确答案、完成状态
```scss
.success-element {
  animation: flashSuccess 0.6s ease-out;
}
```

### 错误闪光
适用于：错误答案、失败状态
```scss
.error-element {
  animation: flashError 0.6s ease-out;
}
```

### 轻微抖动
适用于：成功反馈、庆祝效果
```scss
.celebration-element {
  animation: wiggleLight 0.5s ease-in-out;
}
```

### 滑入效果
适用于：展开内容、下拉菜单
```scss
.slide-content {
  animation: slideDown 0.4s $easing-smooth;
}
```

### 脉冲效果
适用于：选中状态、强调元素
```scss
.selected-element {
  animation: pulse 0.3s $easing-bounce;
}
```

### 旋转按压
适用于：重做按钮、刷新按钮
```scss
.refresh-button {
  &:active {
    animation: spinPress 0.6s $easing-bounce;
  }
}
```

## 🎯 使用场景示例

### 场景1：按钮交互
```scss
.action-button {
  padding: 12px 24px;
  border-radius: 8px;
  background: $color-primary;
  color: white;
  font-weight: 600;
  transition: all $duration-base $easing-bounce;
  cursor: pointer;
  
  &:active {
    transform: scale(0.95);
    box-shadow: $shadow-md;
  }
}
```

### 场景2：卡片交互
```scss
.info-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: $shadow-sm;
  transition: all $duration-base $easing-bounce;
  cursor: pointer;
  
  &:active {
    transform: scale(0.98);
    box-shadow: $shadow-md;
  }
}
```

### 场景3：选项选择
```scss
.option-item {
  padding: 12px;
  border-radius: 8px;
  background: $color-bg;
  border: 2px solid transparent;
  transition: all $duration-base $easing-bounce;
  cursor: pointer;
  
  &:active {
    transform: scale(0.95);
    border-color: $color-primary;
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
```

### 场景4：展开/收起
```scss
.expandable-section {
  .header {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    transition: all $duration-fast $easing-smooth;
    
    &:active {
      background-color: rgba(108, 92, 231, 0.05);
      transform: scale(0.98);
    }
    
    .arrow {
      transition: transform $duration-base $easing-smooth;
    }
    
    &.expanded .arrow {
      transform: rotate(180deg);
    }
  }
  
  .content {
    overflow: hidden;
    transition: all $duration-slow $easing-smooth;
    
    &.collapsed {
      opacity: 0;
      max-height: 0;
      transform: translateY(-10px);
    }
    
    &.expanded {
      opacity: 1;
      max-height: 300px;
      transform: translateY(0);
    }
  }
}
```

### 场景5：游戏化按钮
```scss
.game-button {
  padding: 12px 24px;
  border-radius: 24px;
  background: linear-gradient(135deg, $color-primary 0%, $color-primary-light 100%);
  color: white;
  font-weight: 700;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: all $duration-base $easing-bounce;
  box-shadow: $shadow-md;
  
  &:active {
    transform: scale(0.9);
    box-shadow: $shadow-lg;
    filter: brightness(0.95);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }
}
```

## ⚡ 性能优化技巧

### 1. 使用transform和opacity
```scss
// ✅ 推荐 - 性能好
.animated-element {
  transition: transform 0.3s ease, opacity 0.3s ease;
  
  &:active {
    transform: scale(0.95);
    opacity: 0.8;
  }
}

// ❌ 避免 - 性能差
.animated-element {
  transition: width 0.3s ease, height 0.3s ease;
  
  &:active {
    width: 95%;
    height: 95%;
  }
}
```

### 2. 使用will-change
```scss
.animated-element {
  will-change: transform, opacity;
  transition: all $duration-base $easing-bounce;
}
```

### 3. 避免过度动画
```scss
// ✅ 推荐 - 适度动画
.button {
  &:active {
    transform: scale(0.95);
  }
}

// ❌ 避免 - 过度动画
.button {
  &:active {
    transform: scale(0.9) rotate(5deg) skew(2deg);
    filter: brightness(1.2) saturate(1.5);
  }
}
```

## 🎨 颜色搭配建议

### 主色系
```scss
$color-primary: #6C5CE7;      // 主色
$color-primary-light: #A29BFE; // 浅主色
$color-primary-dark: #5A4BD1;  // 深主色
```

### 状态色
```scss
$color-success: #00B894;  // 成功
$color-warning: #FDCB6E;  // 警告
$color-error: #FF7675;    // 错误
$color-info: #74B9FF;     // 信息
```

### 背景色
```scss
$color-bg: #F8F9FE;       // 页面背景
$color-card: #FFFFFF;     // 卡片背景
$color-border: #E8ECF4;   // 边框颜色
```

## 📱 移动端适配

### 1. 触摸区域
```scss
.touch-target {
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### 2. 触摸反馈
```scss
.touchable {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  
  &:active {
    transform: scale(0.95);
  }
}
```

### 3. 滚动优化
```scss
.scroll-container {
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
}
```

## 🧪 测试清单

### 视觉测试
- [ ] 动画效果符合设计预期
- [ ] 颜色对比度符合无障碍标准
- [ ] 动画时长适中，不影响操作
- [ ] 阴影和边框效果正确

### 性能测试
- [ ] 动画流畅，无卡顿
- [ ] 内存使用正常
- [ ] 电池消耗合理
- [ ] 不同设备性能正常

### 兼容性测试
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] 微信内置浏览器
- [ ] 不同屏幕尺寸

### 无障碍测试
- [ ] 键盘导航正常
- [ ] 屏幕阅读器兼容
- [ ] 高对比度模式
- [ ] 减少动画模式

## 🔧 调试技巧

### 1. 慢速动画
```scss
// 调试时使用慢速动画
.debug-mode * {
  animation-duration: 2s !important;
  transition-duration: 2s !important;
}
```

### 2. 动画日志
```javascript
// 监听动画事件
element.addEventListener('animationstart', () => console.log('动画开始'));
element.addEventListener('animationend', () => console.log('动画结束'));
```

### 3. 性能监控
```javascript
// 监控动画性能
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log('动画性能:', entry);
  });
});
observer.observe({ entryTypes: ['animation'] });
```

## 📚 最佳实践

### 1. 一致性
- 使用统一的动画时长和缓动函数
- 保持动画风格一致
- 遵循设计系统规范

### 2. 可访问性
- 提供减少动画的选项
- 确保动画不影响内容可读性
- 支持键盘导航

### 3. 性能
- 使用transform和opacity
- 避免布局重排
- 合理使用will-change

### 4. 用户体验
- 动画时长适中
- 提供明确的视觉反馈
- 避免过度动画

---

**文档版本**：v1.0  
**最后更新**：2024年  
**适用范围**：四上学习帮所有页面  
