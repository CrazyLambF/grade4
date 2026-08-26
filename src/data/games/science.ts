// 科学游戏题库

// 声音传播连线 — 特性与因素配对
export const soundConnectData = [
  { left: '音高', right: '振动频率' },
  { left: '音量', right: '振幅大小' },
  { left: '音色', right: '材质不同' },
  { left: '传播最快', right: '固体' },
  { left: '传播最慢', right: '气体' },
  { left: '声音产生', right: '物体振动' },
  { left: '不能传声', right: '真空' },
]

// 食物营养分类 — 食物归入营养类别
export const foodSortData = [
  { food: '米饭', category: '碳水', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '面条', category: '碳水', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '面包', category: '碳水', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '牛肉', category: '蛋白质', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '鸡蛋', category: '蛋白质', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '牛奶', category: '蛋白质', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '花生油', category: '脂肪', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '黄油', category: '脂肪', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '核桃', category: '脂肪', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '胡萝卜', category: '维生素', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '苹果', category: '维生素', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '菠菜', category: '维生素', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
]

// 器官拼图 — 排列呼吸器官正确顺序
export const organPuzzleData = [
  { name: '鼻腔', order: 1, function: '过滤、温暖、湿润空气' },
  { name: '咽', order: 2, function: '空气和食物的共同通道' },
  { name: '喉', order: 3, function: '发声器官，气体通道' },
  { name: '气管', order: 4, function: '空气进出肺的通道' },
  { name: '支气管', order: 5, function: '连接气管和肺' },
  { name: '肺', order: 6, function: '主要呼吸器官，进行气体交换' },
]

// 力的实验台 — 选择题
export const forceLabData = [
  { q: '力的单位是？', options: ['千克', '牛顿(N)', '米', '秒'], answer: '牛顿(N)' },
  { q: '弹簧测力计是根据什么原理工作的？', options: ['弹簧越长力越大', '弹簧伸长量与力成正比', '弹簧颜色变化', '弹簧温度变化'], answer: '弹簧伸长量与力成正比' },
  { q: '怎样让小车跑得更远？', options: ['增大摩擦力', '减小推力', '增大推力减小摩擦', '加重小车'], answer: '增大推力减小摩擦' },
  { q: '鞋底有花纹是为了？', options: ['美观', '减小摩擦', '增大摩擦防滑', '省材料'], answer: '增大摩擦防滑' },
  { q: '怎样减小摩擦力？', options: ['增加粗糙度', '增大压力', '加润滑油', '加重物体'], answer: '加润滑油' },
  { q: '摩擦力的方向与运动方向？', options: ['相同', '相反', '垂直', '无关'], answer: '相反' },
  { q: '使用弹簧测力计前要先做什么？', options: ['直接测量', '调零', '拆卸', '加水'], answer: '调零' },
  { q: '以下哪个是力可以使物体发生的变化？', options: ['只改变形状', '只改变运动', '改变运动或形状', '没有变化'], answer: '改变运动或形状' },
]
