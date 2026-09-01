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

// 空气实验台 — 选择题（对应新教材第一单元"空气"）
export const airLabData = [
  { q: '空气是一种什么样的物质？', options: ['看不见摸不着的气体', '可以看见的液体', '固体的', '有时是液体'], answer: '看不见摸不着的气体' },
  { q: '空气能占据空间吗？', options: ['不能', '能', '只有有时能', '看情况'], answer: '能' },
  { q: '把杯子倒扣压入水中，杯子里的纸团会湿吗？', options: ['会湿', '不会湿', '湿一半', '完全浸没'], answer: '不会湿' },
  { q: '空气有质量吗？', options: ['没有', '有', '只有在大气球里才有', '不确定'], answer: '有' },
  { q: '用气球可以证明空气有质量，是因为？', options: ['气球颜色变了', '充气后气球变重了', '气球变大了', '气球飞了'], answer: '充气后气球变重了' },
  { q: '空气流动会形成什么？', options: ['雨', '风', '雪', '雾'], answer: '风' },
  { q: '热气球升空的原理是？', options: ['热空气比冷空气轻', '热空气比冷空气重', '热空气和冷空气一样重', '气球颜色影响'], answer: '热空气比冷空气轻' },
  { q: '风的成因是？', options: ['空气温度差异导致空气流动', '太阳直接吹出来的', '云朵推动的', '地球自转产生的'], answer: '空气温度差异导致空气流动' },
  { q: '打气筒能把空气打进气球，说明？', options: ['空气可以被压缩', '空气是固体', '空气不存在', '空气没有质量'], answer: '空气可以被压缩' },
  { q: '下列哪种情况说明空气能占据空间？', options: ['气球充气后变大', '水从杯子溢出', '石头沉入水底', '冰块融化'], answer: '气球充气后变大' },
  { q: '把空杯子倒扣压入水中，慢慢倾斜，会看到？', options: ['气泡冒出', '水变颜色', '杯子沉底', '没有变化'], answer: '气泡冒出' },
  { q: '空气被压缩后，体积会？', options: ['变大', '变小', '不变', '消失'], answer: '变小' },
  { q: '热空气上升，冷空气会怎样？', options: ['也上升', '下降补充', '不动', '向四周扩散'], answer: '下降补充' },
  { q: '下列哪个现象利用了空气流动的力量？', options: ['风车转动', '石头落地', '水结冰', '铁生锈'], answer: '风车转动' },
  { q: '自制打气筒利用了空气的什么特性？', options: ['空气可以被压缩和反弹', '空气有颜色', '空气有味道', '空气是固体'], answer: '空气可以被压缩和反弹' },
]
