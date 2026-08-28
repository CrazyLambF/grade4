// 四年级数学随机题目生成器
// 覆盖人教版四上各单元计算题型，按难度分层

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

// 确保除法结果为整数
function genDiv(divisorMin: number, divisorMax: number, quotientMin: number, quotientMax: number) {
  const divisor = randInt(divisorMin, divisorMax)
  const quotient = randInt(quotientMin, quotientMax)
  const dividend = divisor * quotient
  return { dividend, divisor, quotient }
}

// 确保减法结果为正
function genSub(minA: number, maxA: number, minB: number, maxB: number) {
  const a = randInt(minA, maxA)
  const b = randInt(minB, Math.min(maxB, a))
  return { a, b, result: a - b }
}

// ===== Unit 1: 大数的认识 =====
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
  // 按万分级
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
      // 10-19 时"一十"可简化为"十"（仅在 noLeading 时）
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

// ===== Unit 2: 公顷和平方千米 =====
function genArea(d: Difficulty): MathQuestion {
  const type = randInt(0, 2)
  if (type === 0) {
    // 平方米 → 公顷
    const sqm = randInt(1, 99) * 10000
    return { content: `${sqm.toLocaleString()} 平方米 = ______ 公顷`, answer: String(sqm / 10000), type: '面积换算', unit: 2 }
  } else if (type === 1) {
    // 公顷 → 平方千米
    const ha = randInt(1, 99) * 100
    return { content: `${ha} 公顷 = ______ 平方千米`, answer: String(ha / 100), type: '面积换算', unit: 2 }
  } else {
    // 平方千米 → 公顷
    const km = randInt(1, 99)
    return { content: `${km} 平方千米 = ______ 公顷`, answer: String(km * 100), type: '面积换算', unit: 2 }
  }
}

// ===== Unit 3: 角的度量 =====
function genAngle(d: Difficulty): MathQuestion {
  const type = randInt(0, 3)
  if (type === 0) {
    // 判断角类型
    const angle = pick([30, 45, 60, 89, 90, 91, 120, 135, 150, 175, 180, 270, 360])
    const typeStr = angle < 90 ? '锐角' : angle === 90 ? '直角' : angle < 180 ? '钝角' : angle === 180 ? '平角' : angle === 360 ? '周角' : '钝角'
    return { content: `${angle}° 是什么角？`, answer: typeStr, type: '角的分类', unit: 3 }
  } else if (type === 1) {
    // 角度计算
    const a = pick([30, 45, 60, 90])
    const mult = randInt(2, 5)
    const result = a * mult
    const typeStr = result < 90 ? '锐角' : result === 90 ? '直角' : result < 180 ? '钝角' : result === 180 ? '平角' : '周角'
    return { content: `${a}° × ${mult} = ______°（______角）`, answer: `${result}、${typeStr}`, type: '角度计算', unit: 3 }
  } else if (type === 2) {
    // 钟面角度
    const hour = randInt(1, 12)
    // 整点时针分针夹角 = hour * 30 (12点=0)
    const angle = hour === 12 ? 0 : hour * 30
    const typeStr = angle === 0 ? '周角' : angle < 90 ? '锐角' : angle === 90 ? '直角' : angle < 180 ? '钝角' : '平角'
    return { content: `钟面 ${hour} 时整，时针与分针成______角`, answer: typeStr, type: '钟面角', unit: 3 }
  } else {
    // 周角/平角/直角关系
    const q = randInt(1, 3)
    return { content: `${q} 个平角 = ______°`, answer: String(q * 180), type: '角的关系', unit: 3 }
  }
}

// ===== Unit 4: 三位数乘两位数 =====
function genMultiply(d: Difficulty): MathQuestion {
  const type = randInt(0, 2)
  if (type === 0) {
    // 三位数 × 两位数
    const a = d === 1 ? randInt(100, 300) : d === 2 ? randInt(100, 500) : randInt(100, 999)
    const b = d === 1 ? randInt(10, 30) : d === 2 ? randInt(12, 50) : randInt(12, 99)
    return { content: `${a} × ${b}`, answer: String(a * b), type: '三位数乘两位数', unit: 4 }
  } else if (type === 1) {
    // 积的变化规律
    const base = randInt(12, 50)
    const mult = randInt(2, 9)
    const factor = randInt(2, 9)
    return {
      content: `已知 ${base} × ${mult} = ${base * mult}，则 ${base} × ${mult * factor} = ______`,
      answer: String(base * mult * factor),
      type: '积的变化规律',
      unit: 4,
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
      unit: 4,
    }
  }
}

// ===== Unit 6: 除数是两位数的除法 =====
function genDivision(d: Difficulty): MathQuestion {
  const type = randInt(0, 2)
  if (type === 0) {
    // 口算除法（整十数）
    const { dividend, divisor, quotient } = genDiv(
      d === 1 ? 10 : 20, d === 1 ? 50 : 90, d === 1 ? 2 : 3, d === 1 ? 9 : 9
    )
    return { content: `${dividend} ÷ ${divisor}`, answer: String(quotient), type: '口算除法', unit: 6 }
  } else if (type === 1) {
    // 笔算除法
    const { dividend, divisor, quotient } = genDiv(
      d === 1 ? 11 : 21, d === 1 ? 30 : 99, 2, d === 3 ? 9 : 7
    )
    return { content: `${dividend} ÷ ${divisor}`, answer: String(quotient), type: '笔算除法', unit: 6 }
  } else {
    // 有余数除法
    const divisor = randInt(11, 50)
    const quotient = randInt(3, 20)
    const remainder = randInt(1, divisor - 1)
    const dividend = divisor * quotient + remainder
    return {
      content: `${dividend} ÷ ${divisor} = ______ 余 ______`,
      answer: `${quotient} 余 ${remainder}`,
      type: '有余数除法',
      unit: 6,
    }
  }
}

// ===== 四则混合运算 / 脱式计算 =====
function genMixedOp(d: Difficulty): MathQuestion {
  const type = randInt(0, 4)
  if (type === 0) {
    // a + b - c
    const a = randInt(100, 999), b = randInt(100, 999), c = randInt(10, a + b)
    return { content: `${a} + ${b} - ${c}`, answer: String(a + b - c), type: '加减混合', unit: 4 }
  } else if (type === 1) {
    // a × b + c
    const a = randInt(2, 9), b = randInt(10, 99), c = randInt(10, 99)
    return { content: `${a} × ${b} + ${c}`, answer: String(a * b + c), type: '乘加混合', unit: 4 }
  } else if (type === 2) {
    // a × b - c
    const a = randInt(2, 9), b = randInt(10, 99)
    const c = randInt(10, a * b - 1)
    return { content: `${a} × ${b} - ${c}`, answer: String(a * b - c), type: '乘减混合', unit: 4 }
  } else if (type === 3) {
    // a ÷ b × c
    const { dividend, divisor, quotient } = genDiv(11, 30, 2, 9)
    const c = randInt(2, 9)
    return { content: `${dividend} ÷ ${divisor} × ${c}`, answer: String(quotient * c), type: '除乘混合', unit: 6 }
  } else {
    // (a + b) ÷ c
    const c = randInt(2, 9)
    const b = randInt(1, 9)
    const quotient = randInt(5, 20)
    const a = quotient * c - b
    return { content: `(${a} + ${b}) ÷ ${c}`, answer: String(quotient), type: '带括号混合', unit: 6 }
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
    const { dividend, divisor, quotient } = genDiv(d === 1 ? 2 : 10, d === 1 ? 9 : 50, 2, 9)
    return { content: `${dividend} ÷ ${divisor}`, answer: String(quotient), type: '除法', unit: 0 }
  }
}

// ===== 主生成函数 =====
export type CalcCategory = 'mixed' | 'bigNum' | 'area' | 'angle' | 'multiply' | 'division' | 'mixedOp'

export const categoryConfig: { key: CalcCategory; label: string; icon: string }[] = [
  { key: 'mixed', label: '综合口算', icon: 'apps-o' },
  { key: 'bigNum', label: '大数认识', icon: 'newspaper-o' },
  { key: 'area', label: '面积换算', icon: 'fire-o' },
  { key: 'angle', label: '角的度量', icon: 'aim' },
  { key: 'multiply', label: '乘法运算', icon: 'cross' },
  { key: 'division', label: '除法运算', icon: 'divide' },
  { key: 'mixedOp', label: '混合运算', icon: 'exchange' },
]

export function generateQuestions(
  category: CalcCategory = 'mixed',
  difficulty: Difficulty = 2,
  count: number = 20
): MathQuestion[] {
  const generators: Record<CalcCategory, () => MathQuestion> = {
    mixed: () => {
      // 综合模式：随机从各类型抽取，基础口算占比稍高
      const r = randInt(0, 6)
      if (r === 0) return genBasicCalc(difficulty)
      const map: CalcCategory[] = ['bigNum', 'area', 'angle', 'multiply', 'division', 'mixedOp']
      return generators[map[r - 1]]()
    },
    bigNum: () => genBigNumber(difficulty),
    area: () => genArea(difficulty),
    angle: () => genAngle(difficulty),
    multiply: () => genMultiply(difficulty),
    division: () => genDivision(difficulty),
    mixedOp: () => genMixedOp(difficulty),
  }

  const questions: MathQuestion[] = []
  const seen = new Set<string>()

  let attempts = 0
  while (questions.length < count && attempts < count * 5) {
    attempts++
    const q = generators[category]()
    // 去重
    if (!seen.has(q.content)) {
      seen.add(q.content)
      questions.push(q)
    }
  }

  // 打乱顺序
  for (let i = questions.length - 1; i > 0; i--) {
    const j = randInt(0, i)
    ;[questions[i], questions[j]] = [questions[j], questions[i]]
  }

  return questions
}
