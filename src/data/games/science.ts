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
  { left: '液体传声', right: '比气体快' },
  { left: '拨动橡皮筋越紧', right: '音高越高' },
  { left: '用力敲鼓', right: '音量越大' },
  { left: '耳朵结构', right: '鼓膜振动' },
  { left: '喇叭振动', right: '空气振动' },
]

// 食物营养分类 — 食物归入营养类别
export const foodSortData = [
  { food: '米饭', category: '碳水', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '面条', category: '碳水', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '面包', category: '碳水', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '馒头', category: '碳水', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '土豆', category: '碳水', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '牛肉', category: '蛋白质', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '鸡蛋', category: '蛋白质', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '牛奶', category: '蛋白质', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '鱼肉', category: '蛋白质', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '豆腐', category: '蛋白质', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '鸡肉', category: '蛋白质', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '花生油', category: '脂肪', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '黄油', category: '脂肪', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '核桃', category: '脂肪', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '肥肉', category: '脂肪', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '芝麻', category: '脂肪', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '胡萝卜', category: '维生素', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '苹果', category: '维生素', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '菠菜', category: '维生素', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '橙子', category: '维生素', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '西红柿', category: '维生素', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
  { food: '黄瓜', category: '维生素', options: ['碳水', '蛋白质', '脂肪', '维生素'] },
]

// 人体器官拼图 — 排列器官正确顺序（呼吸/消化）
// svg: 简笔SVG path（24x24 viewBox），color: 卡片配色
export const organPuzzleData = [
  // 呼吸系统
  { name: '鼻腔', system: '呼吸系统', order: 1, func: '过滤、温暖、湿润空气', color: '#5B8DEF',
    svg: '<path d="M12 3c-2 0-3 2-3 4v3c-2 0-3 1-3 2v5c0 1 1 2 2 2h8c1 0 2-1 2-2v-5c0-1-1-2-3-2V7c0-2-1-4-3-4z" fill="#E8F0FE" stroke="#5B8DEF" stroke-width="1.5"/><circle cx="10" cy="8" r="0.8" fill="#5B8DEF"/><circle cx="14" cy="8" r="0.8" fill="#5B8DEF"/>' },
  { name: '咽', system: '呼吸系统', order: 2, func: '空气和食物的共同通道', color: '#7B68EE',
    svg: '<path d="M9 3h6v4l-1 4 1 8H9l1-8-1-4V3z" fill="#F0EDFF" stroke="#7B68EE" stroke-width="1.5"/><path d="M9 7h6" stroke="#7B68EE" stroke-width="1"/>' },
  { name: '喉', system: '呼吸系统', order: 3, func: '发声器官，气体通道', color: '#9B30FF',
    svg: '<path d="M10 3h4l-1 3 2 3-1 4 1 5H9l1-5-1-4 2-3-1-3z" fill="#F5E6FF" stroke="#9B30FF" stroke-width="1.5"/><circle cx="12" cy="9" r="1" fill="#9B30FF"/>' },
  { name: '气管', system: '呼吸系统', order: 4, func: '空气进出肺的通道', color: '#00BCD4',
    svg: '<rect x="9" y="3" width="6" height="16" rx="2" fill="#E0F7FA" stroke="#00BCD4" stroke-width="1.5"/><line x1="9" y1="7" x2="15" y2="7" stroke="#00BCD4" stroke-width="1"/><line x1="9" y1="11" x2="15" y2="11" stroke="#00BCD4" stroke-width="1"/><line x1="9" y1="15" x2="15" y2="15" stroke="#00BCD4" stroke-width="1"/>' },
  { name: '支气管', system: '呼吸系统', order: 5, func: '连接气管和肺', color: '#26A69A',
    svg: '<path d="M12 3v6M12 9l-4 4M12 9l4 4M8 13v5M16 13v5" fill="none" stroke="#26A69A" stroke-width="2" stroke-linecap="round"/><circle cx="8" cy="18" r="1.5" fill="#E0F2F1" stroke="#26A69A"/><circle cx="16" cy="18" r="1.5" fill="#E0F2F1" stroke="#26A69A"/>' },
  { name: '肺', system: '呼吸系统', order: 6, func: '主要呼吸器官，进行气体交换', color: '#FF7043',
    svg: '<path d="M12 4v10M8 7c-3 0-4 3-4 6s1 5 4 5 4-2 4-5V7H8zM16 7c3 0 4 3 4 6s-1 5-4 5-4-2-4-5V7h4z" fill="#FBE9E7" stroke="#FF7043" stroke-width="1.5"/>' },
  // 消化系统
  { name: '口腔', system: '消化系统', order: 1, func: '咀嚼、初步消化食物', color: '#FF9800',
    svg: '<path d="M4 8c0-2 3-4 8-4s8 2 8 4v5c0 4-4 7-8 7s-8-3-8-7V8z" fill="#FFF3E0" stroke="#FF9800" stroke-width="1.5"/><path d="M7 10h10M7 13h10" stroke="#FF9800" stroke-width="1"/><rect x="9" y="11" width="1.5" height="2" fill="#FF9800"/><rect x="13.5" y="11" width="1.5" height="2" fill="#FF9800"/>' },
  { name: '食道', system: '消化系统', order: 2, func: '输送食物到胃', color: '#AB47BC',
    svg: '<rect x="10" y="3" width="4" height="14" rx="2" fill="#F3E5F5" stroke="#AB47BC" stroke-width="1.5"/><path d="M10 8c1 1 3 1 4 0M10 12c1 1 3 1 4 0" stroke="#AB47BC" stroke-width="0.8" fill="none"/>' },
  { name: '胃', system: '消化系统', order: 3, func: '暂时储存并初步消化食物', color: '#EF5350',
    svg: '<path d="M8 4c4 0 8 2 8 6 0 3-2 5-5 5-2 0-3-1-3-3 0-3-1-5-3-5-2 0 3-3 3-3z" fill="#FFEBEE" stroke="#EF5350" stroke-width="1.5"/><path d="M10 9c1-1 3-1 4 0" stroke="#EF5350" stroke-width="0.8" fill="none"/>' },
  { name: '小肠', system: '消化系统', order: 4, func: '主要消化吸收营养', color: '#FFA726',
    svg: '<path d="M4 6c4-2 6 2 4 4s-4 4 0 6 6-2 4-4-4-4 0-6 6 2 4 4-4 4 0 6" fill="none" stroke="#FFA726" stroke-width="2" stroke-linecap="round"/>' },
  { name: '大肠', system: '消化系统', order: 5, func: '吸收水分、形成粪便', color: '#8D6E63',
    svg: '<path d="M5 5h14v3H8v4h11v3H8v4h11" fill="none" stroke="#8D6E63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' },
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
  { q: '用更大的力拉弹簧，弹簧会？', options: ['伸长更多', '变短', '不变', '断裂'], answer: '伸长更多' },
  { q: '气球小车喷气后向前运动，是因为？', options: ['空气推力', '重力', '磁力', '浮力'], answer: '空气推力' },
  { q: '下列能增大摩擦的是？', options: ['滑冰鞋加轮子', '汽车防滑链', '抹油', '抛光表面'], answer: '汽车防滑链' },
  { q: '下列能减小摩擦的是？', options: ['车轮轴承加滚珠', '鞋底花纹', '砂纸', '刹车片'], answer: '车轮轴承加滚珠' },
  { q: '物体往下滑时，阻碍它下滑的力是？', options: ['拉力', '摩擦力', '磁力', '浮力'], answer: '摩擦力' },
  { q: '要测量一个苹果的重量，应该用？', options: ['尺子', '弹簧测力计', '量筒', '温度计'], answer: '弹簧测力计' },
  { q: '两个同学拔河，绳子不动说明？', options: ['没有力', '两边拉力相等', '只有一边用力', '重力消失'], answer: '两边拉力相等' },
]
