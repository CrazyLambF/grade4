import type { SubjectConfig, UnitItem } from '@/types'

const units: UnitItem[] = [
  {
    id: 1,
    title: '第一单元 · 声音',
    lessons: [
      {
        id: 1, title: '听听声音',
        previewContent: { guide: '声音是怎么产生的？我们能听到哪些声音？', keyPoints: ['声音的产生', '声音的传播', '声音分类'], audioUrl: '', concepts: [
          { title: '声音产生', description: '声音由物体振动产生', example: '敲鼓时鼓面振动发出声音' },
          { title: '声音传播', description: '声音以波的形式通过介质传播', example: '空气、水、固体都能传声' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '声音产生', content: '物体振动产生声音', children: [
          { title: '振动停止', content: '振动停止，发声也停止' },
        ]}, { title: '声音传播', content: '需要介质（气体、液体、固体）', children: [
          { title: '真空', content: '真空中不能传声' },
        ]}], keyPoints: ['声音由振动产生', '声音需要介质传播', '振动停止发声停止'], commonMistakes: ['真空中不能传声'], exercises: [
          { id: 'sc-1-1-1', subject: 'science', unit: 1, lesson: 1, type: 'choice', difficulty: 1, content: '声音是由什么产生的？', options: ['光', '物体振动', '热', '电'], answer: '物体振动', analysis: '声音由物体振动产生。', knowledgePoints: ['声音产生'] },
          { id: 'sc-1-1-2', subject: 'science', unit: 1, lesson: 1, type: 'judge', difficulty: 1, content: '真空中可以传播声音。', options: ['正确', '错误'], answer: '错误', analysis: '真空没有介质，不能传声。', knowledgePoints: ['声音传播'] },
        ]},
      },
      {
        id: 2, title: '声音的变化',
        previewContent: { guide: '音高和音量有什么不同？', keyPoints: ['音高与振动频率', '音量与振幅', '声音变化'], audioUrl: '', concepts: [
          { title: '音高', description: '振动越快，音高越高；振动越慢，音高越低', example: '吉他细弦振动快，音高高' },
          { title: '音量', description: '振幅越大，音量越大；振幅越小，音量越小', example: '用力敲鼓振幅大，声音大' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '音高', content: '与振动频率有关，频率高音高高' }, { title: '音量', content: '与振幅有关，振幅大音量大' }], keyPoints: ['音高=振动频率', '音量=振幅大小', '音色=材质不同'], commonMistakes: ['音高和音量是不同的概念'], exercises: [
          { id: 'sc-1-2-1', subject: 'science', unit: 1, lesson: 2, type: 'choice', difficulty: 2, content: '音高与什么有关？', options: ['振幅', '振动频率', '材质', '温度'], answer: '振动频率', analysis: '振动越快频率越高，音高越高。', knowledgePoints: ['音高'] },
          { id: 'sc-1-2-2', subject: 'science', unit: 1, lesson: 2, type: 'choice', difficulty: 2, content: '音量与什么有关？', options: ['振动频率', '振幅', '材质', '颜色'], answer: '振幅', analysis: '振幅越大音量越大。', knowledgePoints: ['音量'] },
        ]},
      },
      {
        id: 3, title: '声音的传播',
        previewContent: { guide: '声音在不同物质中传播速度一样吗？', keyPoints: ['气体传声', '液体传声', '固体传声', '传播速度'], audioUrl: '', concepts: [
          { title: '传播速度', description: '固体>液体>气体', example: '铁轨传声比空气快' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '传声介质', content: '固体、液体、气体都能传声', children: [
          { title: '速度比较', content: '固体最快，液体次之，气体最慢' },
        ]}, { title: '降噪', content: '在声源处、传播过程中、人耳处降噪' }], keyPoints: ['三种介质都能传声', '固体传声最快', '降噪方法'], commonMistakes: ['声音在固体中传播最快'], exercises: [
          { id: 'sc-1-3-1', subject: 'science', unit: 1, lesson: 3, type: 'choice', difficulty: 1, content: '声音在哪种介质中传播最快？', options: ['气体', '液体', '固体', '真空'], answer: '固体', analysis: '固体传声最快。', knowledgePoints: ['传播速度'] },
        ]},
      },
    ],
  },
  {
    id: 2,
    title: '第二单元 · 呼吸与消化',
    lessons: [
      {
        id: 1, title: '呼吸器官',
        previewContent: { guide: '我们吸气呼气经过哪些器官？', keyPoints: ['呼吸器官', '吸气和呼气', '肺的作用'], audioUrl: '', concepts: [
          { title: '呼吸器官', description: '鼻腔→咽喉→气管→支气管→肺', example: '肺是主要的呼吸器官' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '呼吸过程', content: '鼻腔→咽→喉→气管→支气管→肺', children: [
          { title: '吸气', content: '空气进入肺部' },
          { title: '呼气', content: '排出二氧化碳' },
        ]}], keyPoints: ['呼吸器官顺序', '肺是主要呼吸器官', '吸进氧气呼出二氧化碳'], commonMistakes: ['肺不是消化器官'], exercises: [
          { id: 'sc-2-1-1', subject: 'science', unit: 2, lesson: 1, type: 'choice', difficulty: 1, content: '人体主要的呼吸器官是？', options: ['心脏', '肺', '胃', '肝'], answer: '肺', analysis: '肺是主要的呼吸器官。', knowledgePoints: ['呼吸器官'] },
        ]},
      },
      {
        id: 2, title: '食物中的营养',
        previewContent: { guide: '食物中含有哪些营养成分？', keyPoints: ['七大营养素', '蛋白质', '碳水化合物', '脂肪维生素'], audioUrl: '', concepts: [
          { title: '营养成分', description: '蛋白质、碳水化合物、脂肪、维生素、矿物质、水、膳食纤维', example: '肉类富含蛋白质，米饭富含碳水化合物' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '七大营养素', content: '蛋白质、碳水化合物、脂肪、维生素、矿物质、水、膳食纤维', children: [
          { title: '蛋白质', content: '长身体的营养（肉、蛋、奶）' },
          { title: '碳水', content: '提供能量（米饭、面条）' },
          { title: '维生素', content: '蔬菜水果中含量多' },
        ]}], keyPoints: ['七大营养素', '不同食物含不同营养', '均衡饮食'], commonMistakes: ['不是只吃肉就能长高'], exercises: [
          { id: 'sc-2-2-1', subject: 'science', unit: 2, lesson: 2, type: 'choice', difficulty: 1, content: '米饭面条主要含什么营养？', options: ['蛋白质', '碳水化合物', '脂肪', '维生素'], answer: '碳水化合物', analysis: '主食富含碳水化合物提供能量。', knowledgePoints: ['营养成分'] },
          { id: 'sc-2-2-2', subject: 'science', unit: 2, lesson: 2, type: 'choice', difficulty: 1, content: '蔬菜水果富含什么？', options: ['蛋白质', '脂肪', '维生素', '碳水'], answer: '维生素', analysis: '蔬果富含维生素。', knowledgePoints: ['营养成分'] },
        ]},
      },
      {
        id: 3, title: '消化器官',
        previewContent: { guide: '食物经过哪些消化器官？', keyPoints: ['消化器官顺序', '口腔胃小肠大肠', '消化过程'], audioUrl: '', concepts: [
          { title: '消化器官', description: '口腔→食道→胃→小肠→大肠→肛门', example: '胃负责磨碎食物，小肠负责吸收营养' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '消化顺序', content: '口腔→食道→胃→小肠→大肠', children: [
          { title: '口腔', content: '牙齿咀嚼，唾液初步消化' },
          { title: '胃', content: '胃酸磨碎食物' },
          { title: '小肠', content: '吸收大部分营养' },
          { title: '大肠', content: '吸收水分，形成粪便' },
        ]}], keyPoints: ['消化器官顺序', '小肠是主要吸收器官', '各器官功能'], commonMistakes: ['小肠不是最小的肠，是吸收最主要的'], exercises: [
          { id: 'sc-2-3-1', subject: 'science', unit: 2, lesson: 3, type: 'choice', difficulty: 2, content: '吸收营养最主要的器官是？', options: ['口腔', '胃', '小肠', '大肠'], answer: '小肠', analysis: '小肠是吸收营养的主要器官。', knowledgePoints: ['消化器官'] },
          { id: 'sc-2-3-2', subject: 'science', unit: 2, lesson: 3, type: 'choice', difficulty: 1, content: '食物消化的第一站是？', options: ['胃', '口腔', '小肠', '食道'], answer: '口腔', analysis: '口腔咀嚼是消化的开始。', knowledgePoints: ['消化顺序'] },
        ]},
      },
    ],
  },
  {
    id: 3,
    title: '第三单元 · 运动和力',
    lessons: [
      {
        id: 1, title: '力的认识',
        previewContent: { guide: '什么是力？力有什么作用？', keyPoints: ['力的概念', '力改变运动', '力的作用效果'], audioUrl: '', concepts: [
          { title: '力', description: '力可以使物体运动状态改变或发生形变', example: '推、拉、提、压都是力的作用' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '力的作用', content: '改变运动状态（快慢/方向）或使物体形变', children: [
          { title: '常见力', content: '拉力、推力、重力、摩擦力、弹力' },
        ]}], keyPoints: ['力改变运动或形变', '常见力类型', '力有大小和方向'], commonMistakes: ['力不只有推和拉'], exercises: [
          { id: 'sc-3-1-1', subject: 'science', unit: 3, lesson: 1, type: 'choice', difficulty: 1, content: '力的作用可以使物体？', options: ['只改变形状', '只改变运动', '改变运动或形状', '没有变化'], answer: '改变运动或形状', analysis: '力可以改变运动状态或使物体形变。', knowledgePoints: ['力的作用'] },
        ]},
      },
      {
        id: 2, title: '摩擦力',
        previewContent: { guide: '什么是摩擦力？怎样改变摩擦力大小？', keyPoints: ['摩擦力概念', '影响摩擦力因素', '增大减小摩擦'], audioUrl: '', concepts: [
          { title: '摩擦力', description: '两个物体接触面间阻碍相对运动的力', example: '推箱子时地面的阻力就是摩擦力' },
          { title: '影响因素', description: '接触面粗糙程度和压力大小', example: '冰面光滑摩擦小，砂纸粗糙摩擦大' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '摩擦力', content: '阻碍物体相对运动的力', children: [
          { title: '增大摩擦', content: '增加粗糙程度或增大压力（鞋底花纹）' },
          { title: '减小摩擦', content: '使表面光滑或加润滑油' },
        ]}], keyPoints: ['摩擦力方向', '影响因素', '增大减小方法'], commonMistakes: ['摩擦力不一定都是有害的'], exercises: [
          { id: 'sc-3-2-1', subject: 'science', unit: 3, lesson: 2, type: 'choice', difficulty: 1, content: '鞋底有花纹是为了？', options: ['美观', '减小摩擦', '增大摩擦防滑', '省材料'], answer: '增大摩擦防滑', analysis: '花纹增加粗糙度，增大摩擦防滑。', knowledgePoints: ['摩擦力应用'] },
          { id: 'sc-3-2-2', subject: 'science', unit: 3, lesson: 2, type: 'choice', difficulty: 2, content: '怎样减小摩擦力？', options: ['增加粗糙度', '增大压力', '加润滑油', '加重物体'], answer: '加润滑油', analysis: '润滑油使表面光滑减小摩擦。', knowledgePoints: ['减小摩擦'] },
        ]},
      },
      {
        id: 3, title: '弹簧测力计和设计小车',
        previewContent: { guide: '弹簧测力计怎么使用？怎样让小车跑得更远？', keyPoints: ['弹簧测力计', '力的测量', '设计小车'], audioUrl: '', concepts: [
          { title: '弹簧测力计', description: '利用弹簧伸长量来测量力的大小', example: '1N的力使弹簧伸长一定距离' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '测力计使用', content: '先调零→沿测量方向拉→读数', children: [
          { title: '单位', content: '牛顿(N)' },
        ]}, { title: '设计小车', content: '增大推力、减小摩擦力使小车跑更远' }], keyPoints: ['测力计使用方法', '单位牛顿(N)', '小车设计原理'], commonMistakes: ['力的单位是牛顿不是千克'], exercises: [
          { id: 'sc-3-3-1', subject: 'science', unit: 3, lesson: 3, type: 'choice', difficulty: 1, content: '力的单位是？', options: ['千克', '牛顿', '米', '秒'], answer: '牛顿', analysis: '力的单位是牛顿(N)。', knowledgePoints: ['力的单位'] },
          { id: 'sc-3-3-2', subject: 'science', unit: 3, lesson: 3, type: 'choice', difficulty: 2, content: '怎样让小车跑得更远？', options: ['增大摩擦', '减小推力', '增大推力减小摩擦', '加重小车'], answer: '增大推力减小摩擦', analysis: '推力大跑得远，摩擦小跑得远。', knowledgePoints: ['设计小车'] },
        ]},
      },
    ],
  },
]

export const scienceConfig: SubjectConfig = {
  type: 'science',
  name: '科学',
  icon: 'cluster-o',
  color: '#BD10E0',
  bgColor: '#F8F0FB',
  units,
}
