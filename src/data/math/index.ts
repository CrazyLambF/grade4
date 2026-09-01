import type { SubjectConfig, UnitItem } from '@/types'
import { mathExtraExercises } from './extraExercises'

export { mathExtraExercises }

const units: UnitItem[] = [
  {
    id: 1,
    title: '第一单元 · 万以上数的认识',
    lessons: [
      {
        id: 1, title: '亿以内数的认识',
        previewContent: { guide: '比万更大的数怎么读、怎么写？认识亿以内的数位和计数单位。', keyPoints: ['认识亿以内数', '数位顺序表', '十进制计数法'], audioUrl: '', concepts: [
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
        id: 2, title: '亿以上数的认识',
        previewContent: { guide: '亿以上的数怎么读写？怎么改写和求近似数？', keyPoints: ['亿以上数读写', '数的改写', '近似数'], audioUrl: '', concepts: [{ title: '数的改写', description: '整万数去掉4个0加"万"，整亿数去掉8个0加"亿"', example: '50000 = 5万, 300000000 = 3亿' }] },
        reviewContent: { knowledgeMap: [{ title: '改写', content: '整万去4个0加万，整亿去8个0加亿' }, { title: '近似数', content: '四舍五入法' }], keyPoints: ['亿以上数读写', '改写和省略', '四舍五入'], commonMistakes: ['改写用等号=，省略用约等号≈'], exercises: [
          { id: 'ma-1-2-1', subject: 'math', unit: 1, lesson: 2, type: 'fill', difficulty: 1, content: '500000000改写成用"亿"作单位是______亿。', answer: '5', analysis: '去掉8个0加亿。', knowledgePoints: ['数的改写'] },
          { id: 'ma-1-2-2', subject: 'math', unit: 1, lesson: 2, type: 'choice', difficulty: 2, content: '7654000000省略亿位后面的尾数约是？', options: ['76亿', '77亿', '765亿', '8亿'], answer: '77亿', analysis: '千万位是6，五入，76.54亿≈77亿。', knowledgePoints: ['近似数'] },
        ]},
      },
      {
        id: 3, title: '数的大小比较和1亿有多大',
        previewContent: { guide: '大数怎么比较大小？1亿到底有多大？', keyPoints: ['位数不同比位数', '位数相同从高位比', '感受1亿的大小'], audioUrl: '', concepts: [{ title: '比较方法', description: '位数多的数大；位数相同从最高位起依次比较', example: '99999 < 100000（5位<6位）' }] },
        reviewContent: { knowledgeMap: [{ title: '大小比较', content: '先比位数，位数相同从高位起依次比' }, { title: '1亿有多大', content: '通过实验感受1亿的大小，如1亿粒大米约重多少' }], keyPoints: ['大数比较方法', '感受1亿'], commonMistakes: ['位数多的数一定大于位数少的数'], exercises: [
          { id: 'ma-1-3-1', subject: 'math', unit: 1, lesson: 3, type: 'choice', difficulty: 1, content: '下列哪个数最大？', options: ['999999', '1000000', '888888', '100000'], answer: '1000000', analysis: '1000000是七位数，其余是六位数。', knowledgePoints: ['数的大小比较'] },
        ]},
      },
    ],
  },
  {
    id: 2,
    title: '第二单元 · 角的度量',
    lessons: [
      {
        id: 1, title: '角的再认识',
        previewContent: { guide: '什么是角？角的大小和什么有关？', keyPoints: ['角的定义', '角的大小与两边张开程度有关', '角的大小与边长短无关'], audioUrl: '', concepts: [
          { title: '角', description: '从一点引出两条射线所组成的图形叫做角', example: '角由一个顶点和两条边组成' },
          { title: '角的大小', description: '角的大小取决于两边张开的程度，与边的长短无关', example: '张开的越大角越大' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '角的本质', content: '两条射线张开的大小' }], keyPoints: ['角由两条射线组成', '角的大小与边长短无关', '与张开程度有关'], commonMistakes: ['边画得长角就大——错误'], exercises: [
          { id: 'ma-2-1-1', subject: 'math', unit: 2, lesson: 1, type: 'choice', difficulty: 1, content: '角的大小与什么有关？', options: ['边的长短', '两边张开的程度', '顶点的位置', '边的粗细'], answer: '两边张开的程度', analysis: '角的大小取决于两边张开程度。', knowledgePoints: ['角的概念'] },
          { id: 'ma-2-1-2', subject: 'math', unit: 2, lesson: 1, type: 'judge', difficulty: 1, content: '角的两边越长，角越大。', options: ['正确', '错误'], answer: '错误', analysis: '角的大小与边长短无关。', knowledgePoints: ['角的概念'] },
        ]},
      },
      {
        id: 2, title: '角的度量',
        previewContent: { guide: '怎么用量角器量角？怎么画指定度数的角？', keyPoints: ['量角器使用', '角的单位"度"', '中心对顶点'], audioUrl: '', concepts: [{ title: '量角步骤', description: '中心对顶点，0刻度线对一边，另一边读数', example: '45°读作45度' }, { title: '画角步骤', description: '画一条射线，量角器中心对端点，0线对射线，找度数点一点，连成角', example: '画60°角' }] },
        reviewContent: { knowledgeMap: [{ title: '量角方法', content: '点对点（中心对顶点），线对线（0线对一边），读刻度' }, { title: '角的分类', content: '锐角<90°，直角=90°，钝角90°~180°，平角=180°，周角=360°' }], keyPoints: ['量角器使用', '度(°)是角单位', '1周角=2平角=4直角'], commonMistakes: ['注意读内圈还是外圈刻度'], exercises: [
          { id: 'ma-2-2-1', subject: 'math', unit: 2, lesson: 2, type: 'choice', difficulty: 1, content: '量角器的计量单位是？', options: ['厘米', '度', '克', '升'], answer: '度', analysis: '角的计量单位是度(°)。', knowledgePoints: ['角的度量'] },
          { id: 'ma-2-2-2', subject: 'math', unit: 2, lesson: 2, type: 'fill', difficulty: 2, content: '1周角=______平角=______直角。', answer: ['2', '4'], analysis: '1周角=360°=2×180°=4×90°。', knowledgePoints: ['角的关系'] },
          { id: 'ma-2-2-3', subject: 'math', unit: 2, lesson: 2, type: 'judge', difficulty: 1, content: '89°的角是锐角。', options: ['正确', '错误'], answer: '正确', analysis: '小于90°的角是锐角。', knowledgePoints: ['角的分类'] },
        ]},
      },
    ],
  },
  {
    id: 3,
    title: '第三单元 · 多位数乘两位数',
    lessons: [
      {
        id: 1, title: '口算乘法',
        previewContent: { guide: '两位数乘整十数、整百数怎么口算？', keyPoints: ['整十整百数乘法', '口算方法', '估算'], audioUrl: '', concepts: [{ title: '口算方法', description: '先把0前面的数相乘，再在积的末尾添上相应个数的0', example: '200×30=6000（2×3=6，添4个0）' }] },
        reviewContent: { knowledgeMap: [{ title: '口算', content: '先乘0前面的数，再添0' }, { title: '估算', content: '把因数看成接近的整十整百数' }], keyPoints: ['口算乘法', '估算方法'], commonMistakes: ['添0的个数要准确'], exercises: [
          { id: 'ma-3-1-1', subject: 'math', unit: 3, lesson: 1, type: 'calculate', difficulty: 1, content: '200×30=?', answer: '6000', analysis: '2×3=6，添4个0。', knowledgePoints: ['口算乘法'] },
          { id: 'ma-3-1-2', subject: 'math', unit: 3, lesson: 1, type: 'calculate', difficulty: 1, content: '120×40=?', answer: '4800', analysis: '12×4=48，添2个0。', knowledgePoints: ['口算乘法'] },
        ]},
      },
      {
        id: 2, title: '笔算乘法',
        previewContent: { guide: '多位数乘两位数怎么列竖式？连续进位怎么办？', keyPoints: ['竖式计算', '对齐数位', '连续进位'], audioUrl: '', concepts: [{ title: '计算方法', description: '先用两位数个位乘，再用十位乘（末位对十位），最后相加', example: '145×12=1740' }] },
        reviewContent: { knowledgeMap: [{ title: '笔算方法', content: '个位乘→十位乘（末位对十位）→相加' }, { title: '算理', content: '十位乘时实际是乘几十，所以末位对齐十位' }], keyPoints: ['竖式对齐', '十位乘积末位对十位', '连续进位'], commonMistakes: ['十位乘时忘记对齐十位', '进位忘记加'], exercises: [
          { id: 'ma-3-2-1', subject: 'math', unit: 3, lesson: 2, type: 'calculate', difficulty: 1, content: '145×12=?', answer: '1740', analysis: '145×2=290, 145×10=1450, 290+1450=1740。', knowledgePoints: ['笔算乘法'] },
          { id: 'ma-3-2-2', subject: 'math', unit: 3, lesson: 2, type: 'calculate', difficulty: 2, content: '236×34=?', answer: '8024', analysis: '236×4=944, 236×30=7080, 944+7080=8024。', knowledgePoints: ['笔算乘法'] },
        ]},
      },
      {
        id: 3, title: '积的变化规律',
        previewContent: { guide: '一个因数不变，另一个因数乘几，积怎么变？', keyPoints: ['积的变化规律', '因数变化', '乘除关系'], audioUrl: '', concepts: [{ title: '规律', description: '一个因数不变，另一个因数乘几，积也乘几', example: '3×5=15, 3×50=150（5×10→15×10）' }] },
        reviewContent: { knowledgeMap: [{ title: '变化规律', content: '一个因数不变，另一因数×n，积也×n' }], keyPoints: ['积的变化规律', '因数与积关系'], commonMistakes: ['两个因数都变时不能简单套用'], exercises: [
          { id: 'ma-3-3-1', subject: 'math', unit: 3, lesson: 3, type: 'fill', difficulty: 2, content: '已知25×4=100，则25×40=______。', answer: '1000', analysis: '因数4×10，积也×10，100×10=1000。', knowledgePoints: ['积的变化规律'] },
        ]},
      },
    ],
  },
  {
    id: 4,
    title: '第四单元 · 加法模型和乘法模型',
    lessons: [
      {
        id: 1, title: '总量与分量（加法模型）',
        previewContent: { guide: '什么是总量和分量？它们之间有什么关系？', keyPoints: ['总量=分量+分量', '分量=总量-分量', '模型意识'], audioUrl: '', concepts: [
          { title: '加法模型', description: '总量=分量+分量，把几个部分合并成整体', example: '上午47人+下午74人=总人数121人' },
          { title: '逆运算', description: '分量=总量-分量', example: '总人数-上午人数=下午人数' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '加法模型', content: '总量=分量+分量' }, { title: '逆运算', content: '分量=总量-分量' }], keyPoints: ['总量=分量+分量', '分量=总量-分量', '同一量在不同问题中可以是总量也可以是分量'], commonMistakes: ['不要只背公式，要理解结构'], exercises: [
          { id: 'ma-4-1-1', subject: 'math', unit: 4, lesson: 1, type: 'fill', difficulty: 1, content: '苹果120箱，梨85箱，一共______箱。', answer: '205', analysis: '120+85=205，总量=分量+分量。', knowledgePoints: ['加法模型'] },
          { id: 'ma-4-1-2', subject: 'math', unit: 4, lesson: 1, type: 'choice', difficulty: 2, content: '总量是200，一个分量是80，另一个分量是？', options: ['280', '120', '160', '100'], answer: '120', analysis: '分量=总量-分量=200-80=120。', knowledgePoints: ['加法模型逆运算'] },
        ]},
      },
      {
        id: 2, title: '单价、数量与总价（乘法模型一）',
        previewContent: { guide: '什么是单价、数量和总价？它们之间有什么关系？', keyPoints: ['总价=单价×数量', '单价=总价÷数量', '数量=总价÷单价'], audioUrl: '', concepts: [
          { title: '单价', description: '每件商品的价格', example: '牛奶每箱18元' },
          { title: '总价', description: '一共花的钱', example: '3箱牛奶共54元' },
          { title: '乘法模型', description: '总价=单价×数量', example: '18×3=54（元）' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '基本模型', content: '总价=单价×数量' }, { title: '变式', content: '单价=总价÷数量，数量=总价÷单价' }], keyPoints: ['总价=单价×数量', '三量互推', '单价就是每份的量'], commonMistakes: ['区分单价和总价'], exercises: [
          { id: 'ma-4-2-1', subject: 'math', unit: 4, lesson: 2, type: 'calculate', difficulty: 1, content: '足球每个85元，买12个共多少元？', answer: '1020', analysis: '85×12=1020（元），总价=单价×数量。', knowledgePoints: ['乘法模型一'] },
          { id: 'ma-4-2-2', subject: 'math', unit: 4, lesson: 2, type: 'choice', difficulty: 2, content: '5千克苹果共45元，每千克多少元？', options: ['225', '9', '40', '50'], answer: '9', analysis: '单价=总价÷数量=45÷5=9（元/千克）。', knowledgePoints: ['乘法模型一变式'] },
        ]},
      },
      {
        id: 3, title: '速度、时间与路程（乘法模型二）',
        previewContent: { guide: '什么是速度？速度、时间和路程有什么关系？', keyPoints: ['路程=速度×时间', '速度=路程÷时间', '时间=路程÷速度'], audioUrl: '', concepts: [
          { title: '速度', description: '单位时间内行驶的路程', example: '80米/分 读作80米每分' },
          { title: '乘法模型', description: '路程=速度×时间', example: '80×3=240（米）' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '基本模型', content: '路程=速度×时间' }, { title: '变式', content: '速度=路程÷时间，时间=路程÷速度' }], keyPoints: ['路程=速度×时间', '速度的复合单位（米/分、千米/时）', '三量互推'], commonMistakes: ['速度单位是复合单位，注意读写', '区分速度和路程'], exercises: [
          { id: 'ma-4-3-1', subject: 'math', unit: 4, lesson: 3, type: 'calculate', difficulty: 1, content: '汽车每小时行72千米，4小时行多少千米？', answer: '288', analysis: '72×4=288（千米），路程=速度×时间。', knowledgePoints: ['乘法模型二'] },
          { id: 'ma-4-3-2', subject: 'math', unit: 4, lesson: 3, type: 'choice', difficulty: 2, content: '小明3分钟走了240米，他的速度是？', options: ['720米/分', '80米/分', '720米', '80米'], answer: '80米/分', analysis: '速度=路程÷时间=240÷3=80（米/分）。', knowledgePoints: ['乘法模型二变式'] },
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
        reviewContent: { knowledgeMap: [{ title: '平行', content: '同一平面内不相交' }, { title: '垂直', content: '相交成直角(90°)' }, { title: '画垂线', content: '用三角板沿一条边画垂线' }, { title: '点到直线的距离', content: '从直线外一点到这条直线的垂直线段最短' }], keyPoints: ['平行定义', '垂直定义', '同一平面前提', '点到直线的距离'], commonMistakes: ['平行和垂直必须在同一平面内'], exercises: [
          { id: 'ma-5-1-1', subject: 'math', unit: 5, lesson: 1, type: 'choice', difficulty: 1, content: '在同一平面内不相交的两条直线叫做？', options: ['相交线', '平行线', '垂线', '斜线'], answer: '平行线', analysis: '同一平面内不相交的两条直线互相平行。', knowledgePoints: ['平行'] },
          { id: 'ma-5-1-2', subject: 'math', unit: 5, lesson: 1, type: 'judge', difficulty: 1, content: '两条直线相交成直角时互相垂直。', options: ['正确', '错误'], answer: '正确', analysis: '相交成直角就是垂直。', knowledgePoints: ['垂直'] },
        ]},
      },
      {
        id: 2, title: '平行四边形和梯形',
        previewContent: { guide: '平行四边形和梯形各有什么特征？它们之间有什么关系？', keyPoints: ['平行四边形对边平行', '梯形只有一组对边平行', '高和底'], audioUrl: '', concepts: [
          { title: '平行四边形', description: '两组对边分别平行的四边形', example: '长方形是特殊的平行四边形' },
          { title: '梯形', description: '只有一组对边平行的四边形', example: '等腰梯形、直角梯形' },
          { title: '四边形分类', description: '平行四边形和梯形都是特殊的四边形', example: '长方形→平行四边形→四边形' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '平行四边形', content: '两组对边平行且相等' }, { title: '梯形', content: '只有一组对边平行（上底和下底）' }, { title: '关系', content: '长方形是特殊的平行四边形，正方形是特殊的长方形' }], keyPoints: ['平行四边形特征', '梯形特征', '四边形分类关系'], commonMistakes: ['长方形是特殊平行四边形，但平行四边形不一定是长方形'], exercises: [
          { id: 'ma-5-2-1', subject: 'math', unit: 5, lesson: 2, type: 'choice', difficulty: 1, content: '两组对边分别平行的四边形是？', options: ['梯形', '平行四边形', '三角形', '正方形'], answer: '平行四边形', analysis: '两组对边平行的是平行四边形。', knowledgePoints: ['平行四边形'] },
          { id: 'ma-5-2-2', subject: 'math', unit: 5, lesson: 2, type: 'choice', difficulty: 2, content: '只有一组对边平行的四边形是？', options: ['平行四边形', '梯形', '长方形', '正方形'], answer: '梯形', analysis: '只有一组对边平行的是梯形。', knowledgePoints: ['梯形'] },
        ]},
      },
    ],
  },
  {
    id: 6,
    title: '第六单元 · 条形统计图',
    lessons: [
      {
        id: 1, title: '条形统计图',
        previewContent: { guide: '条形统计图怎么画？怎么读？单式和复式有什么区别？', keyPoints: ['条形统计图', '横轴纵轴', '一格代表几', '复式条形统计图'], audioUrl: '', concepts: [{ title: '条形统计图', description: '用长短不同的直条表示数量的统计图', example: '纵轴表示数量，横轴表示类别' }, { title: '复式条形统计图', description: '同时表示两组数据的条形统计图', example: '男生女生分别用不同颜色直条' }] },
        reviewContent: { knowledgeMap: [{ title: '画法', content: '定纵轴横轴→定每格代表几→画直条→标数据' }, { title: '优点', content: '直观看出数量多少，便于比较' }, { title: '复式', content: '同时展示两组数据便于对比分析' }], keyPoints: ['条形统计图画法', '一格代表数量', '直观比较', '复式条形统计图'], commonMistakes: ['每格代表的数量要统一'], exercises: [
          { id: 'ma-6-1-1', subject: 'math', unit: 6, lesson: 1, type: 'choice', difficulty: 1, content: '条形统计图的优点是？', options: ['看出变化趋势', '直观看出数量多少', '计算平均数', '表示百分比'], answer: '直观看出数量多少', analysis: '条形统计图用直条长短直观比较。', knowledgePoints: ['条形统计图'] },
        ]},
      },
    ],
  },
  {
    id: 7,
    title: '综合实践 · 寻找宝藏',
    lessons: [
      {
        id: 1, title: '寻找宝藏',
        previewContent: { guide: '利用方向和距离知识，绘制路线图，寻找宝藏位置！', keyPoints: ['方向与距离', '路线规划', '综合应用'], audioUrl: '', concepts: [{ title: '方位', description: '用方向和距离描述位置', example: '宝藏在东北方向200米处' }] },
        reviewContent: { knowledgeMap: [{ title: '综合应用', content: '结合方向、距离、测量等知识解决实际问题' }], keyPoints: ['方向与距离', '路线规划', '团队协作'], commonMistakes: ['注意方向的准确性'], exercises: [] },
      },
    ],
  },
  {
    id: 8,
    title: '第七单元 · 复习与关联',
    lessons: [
      {
        id: 1, title: '复习与关联',
        previewContent: { guide: '梳理全册知识，建立知识之间的联系。', keyPoints: ['知识梳理', '综合应用', '知识关联'], audioUrl: '', concepts: [{ title: '知识体系', description: '万以上数的认识→角的度量→乘法→数量模型→图形→统计', example: '各单元知识之间相互联系' }] },
        reviewContent: { knowledgeMap: [{ title: '数与运算', content: '万以上数的认识、多位数乘两位数' }, { title: '数量关系', content: '加法模型和乘法模型' }, { title: '图形与几何', content: '角的度量、平行四边形和梯形' }, { title: '统计', content: '条形统计图' }, { title: '鸡兔同笼', content: '用列表法、假设法解决鸡兔同笼问题' }], keyPoints: ['全册知识梳理', '知识关联', '综合解决问题'], commonMistakes: ['复习要建立知识间的联系'], exercises: [
          { id: 'ma-8-1-1', subject: 'math', unit: 8, lesson: 1, type: 'choice', difficulty: 2, content: '鸡兔同笼，有头10个，脚28只，兔有几只？', options: ['4', '6', '8', '2'], answer: '4', analysis: '假设全是鸡：10×2=20只脚，多出28-20=8只脚，每只兔比鸡多2只脚，8÷2=4只兔。', knowledgePoints: ['鸡兔同笼'] },
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
