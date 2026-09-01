import type { Question } from '@/types'

export const mathExtraExercises: Question[] = [
  // 第一单元 - 万以上数的认识
  { id: 'ma-1-1-4', subject: 'math', unit: 1, lesson: 1, type: 'fill', difficulty: 1, content: '一个数由5个百万、3个万和6个百组成，这个数是______。', answer: '5030600', analysis: '5在百万位3在万位6在百位', knowledgePoints: ['数的组成'] },
  { id: 'ma-1-1-5', subject: 'math', unit: 1, lesson: 1, type: 'choice', difficulty: 2, content: '下面哪个数一个零也不读？', options: ['5005005', '5500000', '5050500', '5000505'], answer: '5500000', analysis: '万级末尾0不读', knowledgePoints: ['数的读法'] },
  { id: 'ma-1-2-3', subject: 'math', unit: 1, lesson: 2, type: 'fill', difficulty: 2, content: '9□8765000约等于9亿，□里最大填______。', answer: '4', analysis: '四舍五入千万位小于5舍去', knowledgePoints: ['近似数'] },
  { id: 'ma-1-2-4', subject: 'math', unit: 1, lesson: 2, type: 'choice', difficulty: 2, content: '省略万位后面尾数：4567800约等于', options: ['456万', '457万', '4568万', '456.78万'], answer: '457万', analysis: '千位8大于5进1', knowledgePoints: ['近似数'] },
  { id: 'ma-1-3-2', subject: 'math', unit: 1, lesson: 3, type: 'choice', difficulty: 1, content: '比较大小：999999○1000000，填什么？', options: ['>', '<', '=', '≈'], answer: '<', analysis: '999999是六位数，1000000是七位数', knowledgePoints: ['数的大小比较'] },
  // 第二单元 - 角的度量
  { id: 'ma-2-1-3', subject: 'math', unit: 2, lesson: 1, type: 'choice', difficulty: 1, content: '从一点引出两条射线组成的图形叫做什么？', options: ['线段', '直线', '角', '三角形'], answer: '角', analysis: '角由一个顶点和两条射线组成', knowledgePoints: ['角的概念'] },
  { id: 'ma-2-2-4', subject: 'math', unit: 2, lesson: 2, type: 'fill', difficulty: 2, content: '一个角是45度，它的2倍是______度，是______角。', answer: ['90', '直'], analysis: '45乘2等于90度是直角', knowledgePoints: ['角的计算'] },
  { id: 'ma-2-2-5', subject: 'math', unit: 2, lesson: 2, type: 'choice', difficulty: 2, content: '钟面上3时整时针和分针成什么角？', options: ['锐角', '直角', '钝角', '平角'], answer: '直角', analysis: '3时整夹角90度', knowledgePoints: ['钟面角'] },
  { id: 'ma-2-2-6', subject: 'math', unit: 2, lesson: 2, type: 'judge', difficulty: 1, content: '平角就是一条直线。', options: ['正确', '错误'], answer: '错误', analysis: '平角是180°的角，有顶点和两边，不是直线。', knowledgePoints: ['角的概念'] },
  // 第三单元 - 多位数乘两位数
  { id: 'ma-3-1-3', subject: 'math', unit: 3, lesson: 1, type: 'calculate', difficulty: 1, content: '300×20=', answer: '6000', analysis: '3×2=6，添4个0', knowledgePoints: ['口算乘法'] },
  { id: 'ma-3-2-3', subject: 'math', unit: 3, lesson: 2, type: 'calculate', difficulty: 1, content: '225×14=', answer: '3150', analysis: '225×14=3150', knowledgePoints: ['笔算乘法'] },
  { id: 'ma-3-2-4', subject: 'math', unit: 3, lesson: 2, type: 'calculate', difficulty: 2, content: '378×45=', answer: '17010', analysis: '378×45=17010', knowledgePoints: ['笔算乘法'] },
  { id: 'ma-3-3-2', subject: 'math', unit: 3, lesson: 3, type: 'fill', difficulty: 2, content: '已知36×5=180，则36×50=______。', answer: '1800', analysis: '因数5乘10积也乘10', knowledgePoints: ['积的变化规律'] },
  { id: 'ma-3-3-3', subject: 'math', unit: 3, lesson: 3, type: 'choice', difficulty: 2, content: '一个因数乘3另一个不变积怎么变？', options: ['不变', '乘3', '除以3', '乘9'], answer: '乘3', analysis: '一个因数不变另一个乘n积乘n', knowledgePoints: ['积的变化规律'] },
  // 第四单元 - 加法模型和乘法模型
  { id: 'ma-4-1-3', subject: 'math', unit: 4, lesson: 1, type: 'fill', difficulty: 1, content: '科技组有35人，美术组有27人，两组共有______人。', answer: '62', analysis: '35+27=62，总量=分量+分量', knowledgePoints: ['加法模型'] },
  { id: 'ma-4-2-3', subject: 'math', unit: 4, lesson: 2, type: 'calculate', difficulty: 1, content: '每支笔6元，买15支共多少元？', answer: '90', analysis: '6×15=90（元），总价=单价×数量', knowledgePoints: ['乘法模型一'] },
  { id: 'ma-4-2-4', subject: 'math', unit: 4, lesson: 2, type: 'choice', difficulty: 2, content: '买4本书共花了80元，每本书多少元？', options: ['320元', '20元', '84元', '76元'], answer: '20元', analysis: '单价=总价÷数量=80÷4=20元', knowledgePoints: ['乘法模型一变式'] },
  { id: 'ma-4-3-3', subject: 'math', unit: 4, lesson: 3, type: 'calculate', difficulty: 1, content: '自行车每分钟行300米，5分钟行多少米？', answer: '1500', analysis: '300×5=1500（米），路程=速度×时间', knowledgePoints: ['乘法模型二'] },
  { id: 'ma-4-3-4', subject: 'math', unit: 4, lesson: 3, type: 'choice', difficulty: 2, content: '一辆车4小时行了360千米，它的速度是？', options: ['90千米/时', '1440千米/时', '90千米', '356千米/时'], answer: '90千米/时', analysis: '速度=路程÷时间=360÷4=90千米/时', knowledgePoints: ['乘法模型二变式'] },
  // 第五单元 - 平行四边形和梯形
  { id: 'ma-5-1-3', subject: 'math', unit: 5, lesson: 1, type: 'choice', difficulty: 2, content: '同一平面内不重合的两条直线位置关系是？', options: ['平行或相交', '只能平行', '只能垂直', '只能相交'], answer: '平行或相交', analysis: '要么平行要么相交', knowledgePoints: ['位置关系'] },
  { id: 'ma-5-1-4', subject: 'math', unit: 5, lesson: 1, type: 'judge', difficulty: 1, content: '从直线外一点到这条直线的线段中，垂直线段最短。', options: ['正确', '错误'], answer: '正确', analysis: '点到直线的距离是垂直线段最短', knowledgePoints: ['点到直线的距离'] },
  { id: 'ma-5-2-3', subject: 'math', unit: 5, lesson: 2, type: 'choice', difficulty: 2, content: '长方形是特殊的什么图形？', options: ['梯形', '平行四边形', '三角形', '正方形'], answer: '平行四边形', analysis: '长方形两组对边平行', knowledgePoints: ['平行四边形'] },
  { id: 'ma-5-2-4', subject: 'math', unit: 5, lesson: 2, type: 'judge', difficulty: 1, content: '梯形的高可以有无数条。', options: ['正确', '错误'], answer: '正确', analysis: '两底之间可以画无数条垂直线段', knowledgePoints: ['梯形'] },
  // 第六单元 - 条形统计图
  { id: 'ma-6-1-2', subject: 'math', unit: 6, lesson: 1, type: 'choice', difficulty: 1, content: '条形统计图一格代表5，画3格表示多少？', options: ['3', '5', '15', '8'], answer: '15', analysis: '5×3=15', knowledgePoints: ['条形统计图'] },
  { id: 'ma-6-1-3', subject: 'math', unit: 6, lesson: 1, type: 'choice', difficulty: 2, content: '复式条形统计图与单式相比，优点是？', options: ['更美观', '可同时比较两组数据', '格子更多', '数据更大'], answer: '可同时比较两组数据', analysis: '复式条形统计图用不同颜色区分两组数据', knowledgePoints: ['复式条形统计图'] },
  // 第八单元 - 复习与关联
  { id: 'ma-8-1-2', subject: 'math', unit: 8, lesson: 1, type: 'choice', difficulty: 2, content: '鸡兔同笼，有头8个，脚26只，鸡有几只？', options: ['3', '5', '6', '2'], answer: '3', analysis: '假设全是兔：8×4=32只脚，多出32-26=6只脚，每只鸡比兔少2只脚，6÷2=3只鸡。', knowledgePoints: ['鸡兔同笼'] },
]
