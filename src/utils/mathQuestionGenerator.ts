// 四年级数学随机题目生成器
// 覆盖人教版2026秋版四上各单元计算题型，按难度分层

export interface MathQuestion {
  content: string       // 题目展示文本
  answer: string        // 正确答案
  type: string          // 题型标签
  unit: number          // 所属单元
}

export type Difficulty = 1 | 2 | 3

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pick<T>(arr: T[]): T {
  return arr[randInt(0, arr.length - 1)]
}

// 确保减法结果为正
function genSub(minA: number, maxA: number, minB: number, maxB: number) {
  const a = randInt(minA, maxA)
  const b = randInt(minB, Math.min(maxB, a))
  return { a, b, result: a - b }
}

// ===== Unit 1: 万以上数的认识 =====
function genBigNumber(d: Difficulty): MathQuestion {
  const type = randInt(0, 3)
  if (type === 0) {
    // 读数
    const digits = d === 1 ? randInt(5, 7) : d === 2 ? randInt(7, 8) : 9
    const num = randInt(10 ** (digits - 1), 10 ** digits - 1)
    return {
      content: `${num.toLocaleString()} 读作______（写汉字）`,
      answer: numToChineseRead(num),
      type: '大数读法',
      unit: 1,
    }
  } else if (type === 1) {
    // 比较大小
    const d1 = randInt(10000, 99999999)
    const d2 = randInt(10000, 99999999)
    return {
      content: `${d1.toLocaleString()} ○ ${d2.toLocaleString()} （填>、<或=）`,
      answer: d1 > d2 ? '>' : d1 < d2 ? '<' : '=',
      type: '大数比较',
      unit: 1,
    }
  } else if (type === 2) {
    // 四舍五入到万
    const num = randInt(100000, 9999999)
    const rounded = Math.round(num / 10000)
    return {
      content: `${num.toLocaleString()} 约等于______万`,
      answer: String(rounded),
      type: '四舍五入',
      unit: 1,
    }
  } else {
    // 改写成万/亿
    const useWan = Math.random() < 0.5
    if (useWan) {
      const wan = randInt(1, 9999)
      return {
        content: `${wan * 10000} 改写成以"万"为单位 = ______万`,
        answer: String(wan),
        type: '数的改写',
        unit: 1,
      }
    } else {
      const yi = randInt(1, 99)
      return {
        content: `${yi * 100000000} 改写成以"亿"为单位 = ______亿`,
        answer: String(yi),
        type: '数的改写',
        unit: 1,
      }
    }
  }
}

// 简易数字转中文读法（万以内级）
function numToChineseRead(num: number): string {
  const digitCN = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const str = String(num)
  const len = str.length
  if (len <= 4) return smallNumRead(str, digitCN)
  const wanPart = str.substring(0, len - 4)
  const gePart = str.substring(len - 4)
  let result = smallNumRead(wanPart, digitCN) + '万'
  const geTrim = gePart.replace(/^0+/, '')
  if (geTrim === '') {
    // 全零，不读
  } else if (gePart[0] === '0') {
    result += '零' + smallNumRead(gePart.replace(/^0+/, ''), digitCN, true)
  } else {
    result += smallNumRead(gePart, digitCN, true)
  }
  return result
}

function smallNumRead(str: string, digitCN: string[], noLeading = false): string {
  if (str.length === 0) return ''
  const units = ['', '十', '百', '千']
  let result = ''
  const len = str.length
  let hasNonZero = false
  for (let i = 0; i < len; i++) {
    const d = parseInt(str[i])
    const unitIdx = len - 1 - i
    if (d === 0) {
      if (hasNonZero && !result.endsWith('零')) result += '零'
    } else {
      if (d === 1 && unitIdx === 1 && (noLeading || str.length === 2 && i === 0)) {
        result += '十'
      } else {
        result += digitCN[d] + units[unitIdx]
      }
      hasNonZero = true
    }
  }
  result = result.replace(/零+$/, '')
  return result
}

// ===== Unit 2: 角的度量 =====
function genAngle(d: Difficulty): MathQuestion {
  const type = randInt(0, 3)
  if (type === 0) {
    // 判断角类型
    const angle = pick([30, 45, 60, 89, 90, 91, 120, 135, 150, 175, 180, 270, 360])
    const typeStr = angle < 90 ? '锐角' : angle === 90 ? '直角' : angle < 180 ? '钝角' : angle === 180 ? '平角' : angle === 360 ? '周角' : '钝角'
    return { content: `${angle}° 是什么角？`, answer: typeStr, type: '角的分类', unit: 2 }
  } else if (type === 1) {
    // 角度计算
    const a = pick([30, 45, 60, 90])
    const mult = randInt(2, 5)
    const result = a * mult
    const typeStr = result < 90 ? '锐角' : result === 90 ? '直角' : result < 180 ? '钝角' : result === 180 ? '平角' : '周角'
    return { content: `${a}° × ${mult} = ______°（______角）`, answer: `${result}、${typeStr}`, type: '角度计算', unit: 2 }
  } else if (type === 2) {
    // 钟面角度
    const hour = randInt(1, 12)
    const angle = hour === 12 ? 0 : hour * 30
    const typeStr = angle === 0 ? '周角' : angle < 90 ? '锐角' : angle === 90 ? '直角' : angle < 180 ? '钝角' : '平角'
    return { content: `钟面 ${hour} 时整，时针与分针成______角`, answer: typeStr, type: '钟面角', unit: 2 }
  } else {
    // 周角/平角/直角关系
    const q = randInt(1, 3)
    return { content: `${q} 个平角 = ______°`, answer: String(q * 180), type: '角的关系', unit: 2 }
  }
}

// ===== Unit 3: 多位数乘两位数 =====
function genMultiply(d: Difficulty): MathQuestion {
  const type = randInt(0, 2)
  if (type === 0) {
    // 多位数 × 两位数
    const a = d === 1 ? randInt(100, 300) : d === 2 ? randInt(100, 500) : randInt(100, 999)
    const b = d === 1 ? randInt(10, 30) : d === 2 ? randInt(12, 50) : randInt(12, 99)
    return { content: `${a} × ${b}`, answer: String(a * b), type: '多位数乘两位数', unit: 3 }
  } else if (type === 1) {
    // 积的变化规律
    const base = randInt(12, 50)
    const mult = randInt(2, 9)
    const factor = randInt(2, 9)
    return {
      content: `已知 ${base} × ${mult} = ${base * mult}，则 ${base} × ${mult * factor} = ______`,
      answer: String(base * mult * factor),
      type: '积的变化规律',
      unit: 3,
    }
  } else {
    // 估算
    const a = randInt(100, 999)
    const b = randInt(10, 99)
    const aR = Math.round(a / 100) * 100
    const bR = Math.round(b / 10) * 10
    return {
      content: `${a} × ${b} ≈ ______（估算）`,
      answer: String(aR * bR),
      type: '乘法估算',
      unit: 3,
    }
  }
}

// ===== Unit 4: 加法模型和乘法模型 =====
function genModel(d: Difficulty): MathQuestion {
  const type = randInt(0, 3)
  if (type === 0) {
    // 加法模型：总量=分量+分量
    const a = randInt(50, 500)
    const b = randInt(50, 500)
    return { content: `加法模型：${a} + ${b} = ______`, answer: String(a + b), type: '加法模型', unit: 4 }
  } else if (type === 1) {
    // 乘法模型一：总价=单价×数量
    const price = randInt(5, 50)
    const qty = randInt(2, 20)
    return { content: `总价模型：单价${price}元 × 数量${qty}个 = ______元`, answer: String(price * qty), type: '总价模型', unit: 4 }
  } else if (type === 2) {
    // 乘法模型二：路程=速度×时间
    const speed = randInt(60, 120)
    const time = randInt(2, 8)
    return { content: `路程模型：速度${speed}千米/时 × 时间${time}小时 = ______千米`, answer: String(speed * time), type: '路程模型', unit: 4 }
  } else {
    // 求分量/单价/速度
    const subType = randInt(0, 2)
    if (subType === 0) {
      const total = randInt(100, 500)
      const part = randInt(20, total - 1)
      return { content: `分量=总量-分量：${total} - ${part} = ______`, answer: String(total - part), type: '加法模型逆运算', unit: 4 }
    } else if (subType === 1) {
      const total = randInt(100, 500)
      const qty = randInt(2, 20)
      const price = Math.floor(total / qty)
      const actualTotal = price * qty
      return { content: `单价=总价÷数量：${actualTotal}元 ÷ ${qty}个 = ______元/个`, answer: String(price), type: '总价模型变式', unit: 4 }
    } else {
      const distance = randInt(120, 720)
      const time = randInt(2, 8)
      const speed = Math.floor(distance / time)
      const actualDistance = speed * time
      return { content: `速度=路程÷时间：${actualDistance}千米 ÷ ${time}小时 = ______千米/时`, answer: String(speed), type: '路程模型变式', unit: 4 }
    }
  }
}

// ===== 四则混合运算 / 脱式计算 =====
function genMixedOp(d: Difficulty): MathQuestion {
  const type = randInt(0, 4)
  if (type === 0) {
    // a + b - c
    const a = randInt(100, 999), b = randInt(100, 999), c = randInt(10, a + b)
    return { content: `${a} + ${b} - ${c}`, answer: String(a + b - c), type: '加减混合', unit: 3 }
  } else if (type === 1) {
    // a × b + c
    const a = randInt(2, 9), b = randInt(10, 99), c = randInt(10, 99)
    return { content: `${a} × ${b} + ${c}`, answer: String(a * b + c), type: '乘加混合', unit: 3 }
  } else if (type === 2) {
    // a × b - c
    const a = randInt(2, 9), b = randInt(10, 99)
    const c = randInt(10, a * b - 1)
    return { content: `${a} × ${b} - ${c}`, answer: String(a * b - c), type: '乘减混合', unit: 3 }
  } else if (type === 3) {
    // 总价模型综合
    const price1 = randInt(5, 30), qty1 = randInt(2, 10)
    const price2 = randInt(5, 30), qty2 = randInt(2, 10)
    return { content: `买${qty1}个${price1}元的和${qty2}个${price2}元的，共多少元？`, answer: String(price1 * qty1 + price2 * qty2), type: '总价综合', unit: 4 }
  } else {
    // 路程模型综合
    const speed = randInt(60, 100), time1 = randInt(2, 4), time2 = randInt(2, 4)
    return { content: `以${speed}千米/时先走${time1}小时，再走${time2}小时，共行多少千米？`, answer: String(speed * (time1 + time2)), type: '路程综合', unit: 4 }
  }
}

// ===== 简单口算（基础） =====
function genBasicCalc(d: Difficulty): MathQuestion {
  const ops = ['+', '-', '×', '÷']
  const op = pick(ops)
  if (op === '+') {
    const a = d === 1 ? randInt(10, 99) : randInt(100, 999)
    const b = d === 1 ? randInt(10, 99) : randInt(100, 999)
    return { content: `${a} + ${b}`, answer: String(a + b), type: '加法', unit: 0 }
  } else if (op === '-') {
    const { a, b, result } = genSub(d === 1 ? 50 : 500, d === 1 ? 99 : 999, 10, d === 1 ? 99 : 999)
    return { content: `${a} - ${b}`, answer: String(result), type: '减法', unit: 0 }
  } else if (op === '×') {
    const a = d === 1 ? randInt(2, 9) : randInt(10, 50)
    const b = randInt(2, d === 1 ? 9 : 20)
    return { content: `${a} × ${b}`, answer: String(a * b), type: '乘法', unit: 0 }
  } else {
    const divisor = randInt(2, d === 1 ? 9 : 50)
    const quotient = randInt(2, 9)
    const dividend = divisor * quotient
    return { content: `${dividend} ÷ ${divisor}`, answer: String(quotient), type: '除法', unit: 0 }
  }
}

// ===== 主生成函数 =====
export type CalcCategory = 'mixed' | 'bigNum' | 'angle' | 'multiply' | 'model' | 'mixedOp'

export const categoryConfig: { key: CalcCategory; label: string; icon: string }[] = [
  { key: 'mixed', label: '综合口算', icon: 'apps-o' },
  { key: 'bigNum', label: '万以上数的认识', icon: 'newspaper-o' },
  { key: 'angle', label: '角的度量', icon: 'aim' },
  { key: 'multiply', label: '乘法运算', icon: 'cross' },
  { key: 'model', label: '数量模型', icon: 'balance-o' },
  { key: 'mixedOp', label: '混合运算', icon: 'exchange' },
]

export function generateQuestions(
  category: CalcCategory = 'mixed',
  difficulty: Difficulty = 2,
  count: number = 20
): MathQuestion[] {
  const generators: Record<CalcCategory, () => MathQuestion> = {
    mixed: () => {
      const r = randInt(0, 5)
      if (r === 0) return genBasicCalc(difficulty)
      const map: CalcCategory[] = ['bigNum', 'angle', 'multiply', 'model', 'mixedOp']
      return generators[map[r - 1]]()
    },
    bigNum: () => genBigNumber(difficulty),
    angle: () => genAngle(difficulty),
    multiply: () => genMultiply(difficulty),
    model: () => genModel(difficulty),
    mixedOp: () => genMixedOp(difficulty),
  }

  const questions: MathQuestion[] = []
  const seen = new Set<string>()

  let attempts = 0
  while (questions.length < count && attempts < count * 5) {
    attempts++
    const q = generators[category]()
    if (!seen.has(q.content)) {
      seen.add(q.content)
      questions.push(q)
    }
  }

  for (let i = questions.length - 1; i > 0; i--) {
    const j = randInt(0, i)
    ;[questions[i], questions[j]] = [questions[j], questions[i]]
  }

  return questions
}
