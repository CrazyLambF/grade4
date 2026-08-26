// 数学游戏题库

// 一分钟快问快答 — 口算
export const mathMinuteData = [
  { q: '80÷20=?', answer: '4' },
  { q: '150÷50=?', answer: '3' },
  { q: '25×4=?', answer: '100' },
  { q: '12×5=?', answer: '60' },
  { q: '96÷32=?', answer: '3' },
  { q: '15×6=?', answer: '90' },
  { q: '120÷40=?', answer: '3' },
  { q: '24×5=?', answer: '120' },
  { q: '180÷30=?', answer: '6' },
  { q: '35×2=?', answer: '70' },
  { q: '240÷60=?', answer: '4' },
  { q: '18×3=?', answer: '54' },
  { q: '360÷90=?', answer: '4' },
  { q: '45×2=?', answer: '90' },
  { q: '280÷70=?', answer: '4' },
  { q: '13×5=?', answer: '65' },
  { q: '420÷60=?', answer: '7' },
  { q: '16×4=?', answer: '64' },
  { q: '560÷80=?', answer: '7' },
  { q: '22×4=?', answer: '88' },
]

// 角度大挑战 — 根据角度判断类型
export const angleChallengeData = [
  { angle: 45, type: '锐角' },
  { angle: 90, type: '直角' },
  { angle: 135, type: '钝角' },
  { angle: 180, type: '平角' },
  { angle: 30, type: '锐角' },
  { angle: 60, type: '锐角' },
  { angle: 120, type: '钝角' },
  { angle: 270, type: '钝角' },
  { angle: 360, type: '周角' },
  { angle: 75, type: '锐角' },
]

// 算式消消乐 — 选出能组成正确等式的数字
export const formulaClearData = [
  { equation: '25×4=?', options: ['80', '100', '90', '110'], answer: '100' },
  { equation: '12×8=?', options: ['86', '96', '106', '108'], answer: '96' },
  { equation: '96÷32=?', options: ['2', '3', '4', '5'], answer: '3' },
  { equation: '15×6=?', options: ['80', '85', '90', '95'], answer: '90' },
  { equation: '280÷35=?', options: ['6', '7', '8', '9'], answer: '8' },
  { equation: '18×4=?', options: ['62', '72', '82', '92'], answer: '72' },
  { equation: '560÷80=?', options: ['6', '7', '8', '9'], answer: '7' },
  { equation: '13×5=?', options: ['55', '60', '65', '70'], answer: '65' },
]

// 图形分类大冒险 — 判断图形属于哪类
export const shapeSortData = [
  { name: '平行四边形', category: '平行四边形', options: ['平行四边形', '梯形', '三角形'] },
  { name: '长方形', category: '平行四边形', options: ['平行四边形', '梯形', '三角形'] },
  { name: '梯形', category: '梯形', options: ['平行四边形', '梯形', '三角形'] },
  { name: '等腰梯形', category: '梯形', options: ['平行四边形', '梯形', '三角形'] },
  { name: '锐角三角形', category: '三角形', options: ['平行四边形', '梯形', '三角形'] },
  { name: '直角三角形', category: '三角形', options: ['平行四边形', '梯形', '三角形'] },
  { name: '正方形', category: '平行四边形', options: ['平行四边形', '梯形', '三角形'] },
  { name: '直角梯形', category: '梯形', options: ['平行四边形', '梯形', '三角形'] },
]
