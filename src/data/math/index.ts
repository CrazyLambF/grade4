import type { SubjectConfig, UnitItem } from '@/types'
import { mathExtraExercises } from './extraExercises'

export { mathExtraExercises }

const units: UnitItem[] = [
  {
    id: 1,
    title: '第一单元 · 大数的认识',
    lessons: [
      {
        id: 1, title: '亿以内数的认识',
        previewContent: { guide: '比万更大的数怎么读、怎么写？', keyPoints: ['认识亿以内数', '数位顺序表', '十进制计数法'], audioUrl: '', concepts: [
          { title: '数位顺序表', description: '从右到左：个位、十位、百位、千位、万位、十万位、百万位、千万位', example: '3056 0000 读作：三千零五十六万' },
          { title: '十进制', description: '每相邻两个计数单位之间的进率都是10', example: '10个一万是十万，10个十万是一百万' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '数的读法', content: '从高位读起，万级按个级读法读，加"万"字' }, { title: '数的写法', content: '从高位写起，哪一位上一个也没有就写0' }], keyPoints: ['亿以内数读写', '数位顺序表', '0的读法（每级末尾不读）'], commonMistakes: ['每级末尾的0不读，中间0要读'], exercises: [
          { id: 'ma-1-1-1', subject: 'math', unit: 1, lesson: 1, type: 'fill', difficulty: 1, content: '30560000读作______。', answer: '三千零五十六万', analysis: '万级3056读三千零五十六，加万。', knowledgePoints: ['数的读法'] },
          { id: 'ma-1-1-2', subject: 'math', unit: 1, lesson: 1, type: 'choice', difficulty: 1, content: '10个一万是？', options: ['一百万', '十万', '一千万', '一亿'], answer: '十万', analysis: '相邻计数单位进率是10。', knowledgePoints: ['十进制'] },
          { id: 'ma-1-1-3', subject: 'math', unit: 1, lesson: 1, type: 'judge', difficulty: 1, content: '60050000读作六千零五万。', options: ['正确', '错误'], answer: '正确', analysis: '万级末尾0不读，中间0读零。', knowledgePoints: ['数的读法'] },
        ]},
      },
      {
        id: 2, title: '数的产生和十进制计数法',
        previewContent: { guide: '数是怎么产生的？自然数有什么特点？', keyPoints: ['自然数', '十进制计数法', '阿拉伯数字'], audioUrl: '', concepts: [{ title: '自然数', description: '表示物体个数的0,1,2,3...都是自然数', example: '最小的自然数是0，没有最大的自然数' }] },
        reviewContent: { knowledgeMap: [{ title: '自然数', content: '0,1,2,3...一个接一个' }, { title: '十进制', content: '每相邻两个计数单位进率都是10' }], keyPoints: ['自然数概念', '十进制计数法', '最小自然数是0'], commonMistakes: ['最小自然数是0不是1'], exercises: [
          { id: 'ma-1-2-1', subject: 'math', unit: 1, lesson: 2, type: 'choice', difficulty: 1, content: '最小的自然数是？', options: ['0', '1', '-1', '没有最小'], answer: '0', analysis: '最小的自然数是0。', knowledgePoints: ['自然数'] },
        ]},
      },
      {
        id: 3, title: '亿以上数的认识',
        previewContent: { guide: '亿以上的数怎么读写？怎么改写？', keyPoints: ['亿以上数读写', '数的改写', '近似数'], audioUrl: '', concepts: [{ title: '数的改写', description: '整万数去掉4个0加"万"，整亿数去掉8个0加"亿"', example: '50000 = 5万, 300000000 = 3亿' }] },
        reviewContent: { knowledgeMap: [{ title: '改写', content: '整万去4个0加万，整亿去8个0加亿' }, { title: '近似数', content: '四舍五入法' }], keyPoints: ['亿以上数读写', '改写和省略', '四舍五入'], commonMistakes: ['改写用等号=，省略用约等号≈'], exercises: [
          { id: 'ma-1-3-1', subject: 'math', unit: 1, lesson: 3, type: 'fill', difficulty: 1, content: '500000000改写成用"亿"作单位是______亿。', answer: '5', analysis: '去掉8个0加亿。', knowledgePoints: ['数的改写'] },
          { id: 'ma-1-3-2', subject: 'math', unit: 1, lesson: 3, type: 'choice', difficulty: 2, content: '7654000000省略亿位后面的尾数约是？', options: ['76亿', '77亿', '765亿', '8亿'], answer: '77亿', analysis: '千万位是6，五入，7+1=8... 实际 76.54亿≈77亿。', knowledgePoints: ['近似数'] },
        ]},
      },
    ],
  },
  {
    id: 2,
    title: '第二单元 · 公顷和平方千米',
    lessons: [
      {
        id: 1, title: '公顷和平方千米',
        previewContent: { guide: '测量土地面积用什么单位？', keyPoints: ['公顷', '平方千米', '面积单位换算'], audioUrl: '', concepts: [
          { title: '公顷', description: '边长100米的正方形面积是1公顷', example: '1公顷 = 10000平方米' },
          { title: '平方千米', description: '边长1千米(1000米)的正方形面积是1平方千米', example: '1平方千米 = 100公顷 = 1000000平方米' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '进率', content: '1平方千米=100公顷，1公顷=10000平方米' }], keyPoints: ['公顷和平方千米', '面积换算', '适用大区域'], commonMistakes: ['1公顷=10000平方米不是100平方米'], exercises: [
          { id: 'ma-2-1-1', subject: 'math', unit: 2, lesson: 1, type: 'fill', difficulty: 1, content: '1公顷=______平方米。', answer: '10000', analysis: '边长100米正方形面积=100×100=10000平方米。', knowledgePoints: ['面积换算'] },
          { id: 'ma-2-1-2', subject: 'math', unit: 2, lesson: 1, type: 'choice', difficulty: 2, content: '1平方千米=多少公顷？', options: ['10', '100', '1000', '10000'], answer: '100', analysis: '1平方千米=100公顷。', knowledgePoints: ['面积换算'] },
        ]},
      },
    ],
  },
  {
    id: 3,
    title: '第三单元 · 角的度量',
    lessons: [
      {
        id: 1, title: '线段、直线、射线',
        previewContent: { guide: '线段、直线、射线有什么区别？', keyPoints: ['线段两端有端点', '射线一端延伸', '直线两端延伸'], audioUrl: '', concepts: [
          { title: '线段', description: '有两个端点，可以量长度', example: 'AB线段' },
          { title: '射线', description: '一个端点，向一方无限延伸', example: '像手电筒的光' },
          { title: '直线', description: '没有端点，向两方无限延伸', example: '无法画出完整的直线' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '三种线', content: '线段（两端点）、射线（一端点）、直线（无端点）' }], keyPoints: ['线段可量长度', '射线直线不可量', '经过一点可画无数条直线'], commonMistakes: ['直线和射线不能量长度'], exercises: [
          { id: 'ma-3-1-1', subject: 'math', unit: 3, lesson: 1, type: 'choice', difficulty: 1, content: '有两个端点的是？', options: ['线段', '射线', '直线', '都不是'], answer: '线段', analysis: '线段有两个端点。', knowledgePoints: ['线段'] },
          { id: 'ma-3-1-2', subject: 'math', unit: 3, lesson: 1, type: 'judge', difficulty: 1, content: '直线可以量出长度。', options: ['正确', '错误'], answer: '错误', analysis: '直线无限延伸，不能量长度。', knowledgePoints: ['直线'] },
        ]},
      },
      {
        id: 2, title: '角的度量',
        previewContent: { guide: '怎么用量角器量角？', keyPoints: ['量角器使用', '角的单位"度"', '中心对顶点'], audioUrl: '', concepts: [{ title: '量角步骤', description: '中心对顶点，0刻度线对一边，另一边读数', example: '45°读作45度' }] },
        reviewContent: { knowledgeMap: [{ title: '量角方法', content: '点对点（中心对顶点），线对线（0线对一边），读刻度' }], keyPoints: ['量角器使用', '度(°)是角单位', '读内外圈刻度'], commonMistakes: ['注意读内圈还是外圈刻度'], exercises: [
          { id: 'ma-3-2-1', subject: 'math', unit: 3, lesson: 2, type: 'choice', difficulty: 1, content: '量角器的计量单位是？', options: ['厘米', '度', '克', '升'], answer: '度', analysis: '角的计量单位是度(°)。', knowledgePoints: ['角的度量'] },
        ]},
      },
      {
        id: 3, title: '角的分类',
        previewContent: { guide: '锐角、直角、钝角、平角、周角怎么区分？', keyPoints: ['锐角<90°', '直角=90°', '钝角90°~180°', '平角=180°', '周角=360°'], audioUrl: '', concepts: [
          { title: '角分类', description: '锐角(0°<角<90°)、直角(=90°)、钝角(90°<角<180°)、平角(=180°)、周角(=360°)', example: '1周角=2平角=4直角' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '角的关系', content: '1周角=2平角=4直角=360°' }], keyPoints: ['角分类', '周角最大', '1平角=2直角'], commonMistakes: ['平角不是最平的角，周角才是360°'], exercises: [
          { id: 'ma-3-3-1', subject: 'math', unit: 3, lesson: 3, type: 'choice', difficulty: 1, content: '直角等于多少度？', options: ['45°', '90°', '180°', '360°'], answer: '90°', analysis: '直角=90°。', knowledgePoints: ['角的分类'] },
          { id: 'ma-3-3-2', subject: 'math', unit: 3, lesson: 3, type: 'fill', difficulty: 2, content: '1周角=______平角=______直角。', answer: ['2', '4'], analysis: '1周角=360°=2×180°=4×90°。', knowledgePoints: ['角的关系'] },
          { id: 'ma-3-3-3', subject: 'math', unit: 3, lesson: 3, type: 'judge', difficulty: 1, content: '89°的角是锐角。', options: ['正确', '错误'], answer: '正确', analysis: '小于90°的角是锐角。', knowledgePoints: ['锐角'] },
        ]},
      },
    ],
  },
  {
    id: 4,
    title: '第四单元 · 三位数乘两位数',
    lessons: [
      {
        id: 1, title: '三位数乘两位数',
        previewContent: { guide: '三位数乘两位数怎么算？', keyPoints: ['竖式计算', '对齐数位', '第二步乘十位'], audioUrl: '', concepts: [{ title: '计算方法', description: '先用两位数个位乘三位数，再用十位乘，最后相加', example: '145×12=1740' }] },
        reviewContent: { knowledgeMap: [{ title: '笔算方法', content: '个位乘→十位乘（末位对十位）→相加' }], keyPoints: ['竖式对齐', '十位乘积末位对十位', '验算方法'], commonMistakes: ['十位乘时忘记对齐十位'], exercises: [
          { id: 'ma-4-1-1', subject: 'math', unit: 4, lesson: 1, type: 'calculate', difficulty: 1, content: '145×12=?', answer: '1740', analysis: '145×2=290, 145×10=1450, 290+1450=1740。', knowledgePoints: ['三位数乘两位数'] },
          { id: 'ma-4-1-2', subject: 'math', unit: 4, lesson: 1, type: 'calculate', difficulty: 2, content: '236×34=?', answer: '8024', analysis: '236×4=944, 236×30=7080, 944+7080=8024。', knowledgePoints: ['三位数乘两位数'] },
        ]},
      },
      {
        id: 2, title: '积的变化规律',
        previewContent: { guide: '一个因数不变，另一个因数乘几，积怎么变？', keyPoints: ['积的变化规律', '因数变化', '乘除关系'], audioUrl: '', concepts: [{ title: '规律', description: '一个因数不变，另一个因数乘几，积也乘几', example: '3×5=15, 3×50=150（5×10→15×10）' }] },
        reviewContent: { knowledgeMap: [{ title: '变化规律', content: '一个因数不变，另一因数×n，积也×n' }], keyPoints: ['积的变化规律', '因数与积关系'], commonMistakes: ['两个因数都变时不能简单套用'], exercises: [
          { id: 'ma-4-2-1', subject: 'math', unit: 4, lesson: 2, type: 'fill', difficulty: 2, content: '已知25×4=100，则25×40=______。', answer: '1000', analysis: '因数4×10，积也×10，100×10=1000。', knowledgePoints: ['积的变化规律'] },
        ]},
      },
    ],
  },
  {
    id: 5,
    title: '第五单元 · 平行四边形和梯形',
    lessons: [
      {
        id: 1, title: '平行与垂直',
        previewContent: { guide: '两条直线什么情况下平行？什么情况下垂直？', keyPoints: ['平行线', '垂直', '互相平行/垂直'], audioUrl: '', concepts: [
          { title: '平行', description: '在同一平面内不相交的两条直线', example: '铁轨两条轨道' },
          { title: '垂直', description: '两条直线相交成直角', example: '十字路口' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '平行', content: '同一平面内不相交' }, { title: '垂直', content: '相交成直角(90°)' }], keyPoints: ['平行定义', '垂直定义', '同一平面前提'], commonMistakes: ['平行和垂直必须在同一平面内'], exercises: [
          { id: 'ma-5-1-1', subject: 'math', unit: 5, lesson: 1, type: 'choice', difficulty: 1, content: '在同一平面内不相交的两条直线叫做？', options: ['相交线', '平行线', '垂线', '斜线'], answer: '平行线', analysis: '同一平面内不相交的两条直线互相平行。', knowledgePoints: ['平行'] },
          { id: 'ma-5-1-2', subject: 'math', unit: 5, lesson: 1, type: 'judge', difficulty: 1, content: '两条直线相交成直角时互相垂直。', options: ['正确', '错误'], answer: '正确', analysis: '相交成直角就是垂直。', knowledgePoints: ['垂直'] },
        ]},
      },
      {
        id: 2, title: '平行四边形和梯形',
        previewContent: { guide: '平行四边形和梯形各有什么特征？', keyPoints: ['平行四边形对边平行', '梯形只有一组对边平行', '高和底'], audioUrl: '', concepts: [
          { title: '平行四边形', description: '两组对边分别平行的四边形', example: '长方形是特殊的平行四边形' },
          { title: '梯形', description: '只有一组对边平行的四边形', example: '等腰梯形、直角梯形' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '平行四边形', content: '两组对边平行且相等' }, { title: '梯形', content: '只有一组对边平行（上底和下底）' }], keyPoints: ['平行四边形特征', '梯形特征', '高和底关系'], commonMistakes: ['长方形是特殊平行四边形，但平行四边形不一定是长方形'], exercises: [
          { id: 'ma-5-2-1', subject: 'math', unit: 5, lesson: 2, type: 'choice', difficulty: 1, content: '两组对边分别平行的四边形是？', options: ['梯形', '平行四边形', '三角形', '正方形'], answer: '平行四边形', analysis: '两组对边平行的是平行四边形。', knowledgePoints: ['平行四边形'] },
          { id: 'ma-5-2-2', subject: 'math', unit: 5, lesson: 2, type: 'choice', difficulty: 2, content: '只有一组对边平行的四边形是？', options: ['平行四边形', '梯形', '长方形', '正方形'], answer: '梯形', analysis: '只有一组对边平行的是梯形。', knowledgePoints: ['梯形'] },
        ]},
      },
    ],
  },
  {
    id: 6,
    title: '第六单元 · 除数是两位数的除法',
    lessons: [
      {
        id: 1, title: '口算除法',
        previewContent: { guide: '除数是整十数怎么口算？', keyPoints: ['整十数除法', '估算', '口算方法'], audioUrl: '', concepts: [{ title: '口算方法', description: '利用乘除逆运算或表内除法', example: '60÷30=2（想：30×2=60）' }] },
        reviewContent: { knowledgeMap: [{ title: '口算', content: '想乘法做除法' }, { title: '估算', content: '把被除数或除数看成接近的整十数' }], keyPoints: ['口算除法', '估算方法'], commonMistakes: ['估算时注意约等号'], exercises: [
          { id: 'ma-6-1-1', subject: 'math', unit: 6, lesson: 1, type: 'calculate', difficulty: 1, content: '80÷20=?', answer: '4', analysis: '想20×4=80。', knowledgePoints: ['口算除法'] },
          { id: 'ma-6-1-2', subject: 'math', unit: 6, lesson: 1, type: 'calculate', difficulty: 1, content: '150÷50=?', answer: '3', analysis: '想50×3=150。', knowledgePoints: ['口算除法'] },
        ]},
      },
      {
        id: 2, title: '笔算除法',
        previewContent: { guide: '除数是两位数的除法怎么列竖式？', keyPoints: ['试商方法', '四舍五入法试商', '余数要比除数小'], audioUrl: '', concepts: [{ title: '试商', description: '把除数看成整十数来试商，四舍五入法', example: '84÷21，把21看成20，84÷20≈4，试商4' }] },
        reviewContent: { knowledgeMap: [{ title: '笔算步骤', content: '试商→乘→减→比→落' }, { title: '试商方法', content: '四舍法（商偏大调小）、五入法（商偏小调大）' }], keyPoints: ['试商方法', '余数<除数', '四舍五入试商'], commonMistakes: ['余数必须比除数小'], exercises: [
          { id: 'ma-6-2-1', subject: 'math', unit: 6, lesson: 2, type: 'calculate', difficulty: 1, content: '96÷32=?', answer: '3', analysis: '32×3=96。', knowledgePoints: ['笔算除法'] },
          { id: 'ma-6-2-2', subject: 'math', unit: 6, lesson: 2, type: 'calculate', difficulty: 2, content: '280÷35=?', answer: '8', analysis: '35×8=280。', knowledgePoints: ['笔算除法'] },
          { id: 'ma-6-2-3', subject: 'math', unit: 6, lesson: 2, type: 'judge', difficulty: 1, content: '除法中余数必须比除数小。', options: ['正确', '错误'], answer: '正确', analysis: '余数<除数是除法基本原则。', knowledgePoints: ['余数'] },
        ]},
      },
    ],
  },
  {
    id: 7,
    title: '第七单元 · 条形统计图',
    lessons: [
      {
        id: 1, title: '条形统计图',
        previewContent: { guide: '条形统计图怎么画？怎么读？', keyPoints: ['条形统计图', '横轴纵轴', '一格代表几'], audioUrl: '', concepts: [{ title: '条形统计图', description: '用长短不同的直条表示数量的统计图', example: '纵轴表示数量，横轴表示类别' }] },
        reviewContent: { knowledgeMap: [{ title: '画法', content: '定纵轴横轴→定每格代表几→画直条→标数据' }, { title: '优点', content: '直观看出数量多少，便于比较' }], keyPoints: ['条形统计图画法', '一格代表数量', '直观比较'], commonMistakes: ['每格代表的数量要统一'], exercises: [
          { id: 'ma-7-1-1', subject: 'math', unit: 7, lesson: 1, type: 'choice', difficulty: 1, content: '条形统计图的优点是？', options: ['看出变化趋势', '直观看出数量多少', '计算平均数', '表示百分比'], answer: '直观看出数量多少', analysis: '条形统计图用直条长短直观比较。', knowledgePoints: ['条形统计图'] },
        ]},
      },
    ],
  },
  {
    id: 8,
    title: '第八单元 · 数学广角——优化',
    lessons: [
      {
        id: 1, title: '优化——沏茶问题',
        previewContent: { guide: '怎样合理安排时间最省？', keyPoints: ['统筹方法', '同时进行', '最优方案'], audioUrl: '', concepts: [{ title: '优化思想', description: '合理安排工序，同时进行的事同时做', example: '烧水时可以洗茶杯' }] },
        reviewContent: { knowledgeMap: [{ title: '优化', content: '找出可以同时进行的事，合理安排顺序' }], keyPoints: ['统筹安排', '同时进行', '最短时间'], commonMistakes: ['不是所有步骤都能同时做'], exercises: [
          { id: 'ma-8-1-1', subject: 'math', unit: 8, lesson: 1, type: 'choice', difficulty: 2, content: '沏茶时烧水10分钟，同时可以做什么？', options: ['洗茶杯2分钟', '找茶叶1分钟', '都可以', '都不行'], answer: '都可以', analysis: '烧水等待时可同时做其他事。', knowledgePoints: ['优化'] },
        ]},
      },
    ],
  },
]

export const mathConfig: SubjectConfig = {
  type: 'math',
  name: '数学',
  icon: 'chart-trending-o',
  color: '#4E8AF2',
  bgColor: '#EBF3FF',
  units,
}
