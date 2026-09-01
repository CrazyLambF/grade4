import type { SubjectConfig, UnitItem } from '@/types'
import { scienceExtraExercises } from './extraExercises'

export { scienceExtraExercises }

const units: UnitItem[] = [
  {
    id: 1,
    title: '第一单元 · 空气',
    lessons: [
      {
        id: 1, title: '感受空气',
        previewContent: { guide: '空气是什么样的？它有哪些基本特征？', keyPoints: ['空气无处不在', '无色无味透明', '没有固定形状', '会流动'], audioUrl: '', concepts: [
          { title: '空气的基本特征', description: '空气是无色、无味、透明的气体，没有固定形状，会流动', example: '用塑料袋捕捉空气，袋子里看不到颜色' },
          { title: '空气的存在', description: '空气真实存在于我们周围，无处不在', example: '挤压气球能感受到空气的存在' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '空气特征', content: '无色无味透明、无固定形状、会流动', children: [
          { title: '与水对比', content: '水有固定体积，空气没有固定形状和体积' },
        ]}, { title: '空气的作用', content: '生命生存的必备物质，动植物呼吸离不开空气' }], keyPoints: ['空气是无色无味透明的气体', '空气没有固定形状会流动', '空气无处不在真实存在'], commonMistakes: ['空气看不见不等于不存在'], exercises: [
          { id: 'sc-1-1-1', subject: 'science', unit: 1, lesson: 1, type: 'choice', difficulty: 1, content: '空气是一种什么样的气体？', options: ['有颜色有味道', '无色无味透明', '白色有味道', '蓝色透明'], answer: '无色无味透明', analysis: '空气是无色、无味、透明的气体。', knowledgePoints: ['空气特征'] },
          { id: 'sc-1-1-2', subject: 'science', unit: 1, lesson: 1, type: 'judge', difficulty: 1, content: '空气没有固定的形状。', options: ['正确', '错误'], answer: '正确', analysis: '空气是气体，没有固定形状。', knowledgePoints: ['空气特征'] },
        ]},
      },
      {
        id: 2, title: '空气能占据空间吗',
        previewContent: { guide: '看不见的空气能占据空间吗？怎样证明？', keyPoints: ['空气占据空间', '纸团不湿实验', '对比实验'], audioUrl: '', concepts: [
          { title: '占据空间', description: '空气和固体、液体一样，能占据一定的空间', example: '杯底纸团不湿实验证明空气占据空间' },
          { title: '实验方法', description: '将杯子竖直倒扣入水中，杯内空气阻挡水进入', example: '倾斜杯子时空气排出，水进入杯中' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '空气占据空间', content: '空气能占据一定的空间', children: [
          { title: '实验证据', content: '竖直倒扣杯子纸团不湿，倾斜杯子水进入冒泡' },
        ]}], keyPoints: ['空气能占据空间', '纸团不湿实验', '倾斜杯子空气排出水进入'], commonMistakes: ['空气看不见但确实占据空间'], exercises: [
          { id: 'sc-1-2-1', subject: 'science', unit: 1, lesson: 2, type: 'choice', difficulty: 1, content: '杯子竖直倒扣入水中，杯底纸团为什么不湿？', options: ['水不够深', '空气占据空间挡住水', '纸团防水', '杯子有盖'], answer: '空气占据空间挡住水', analysis: '杯内空气占据空间，水无法进入。', knowledgePoints: ['空气占据空间'] },
          { id: 'sc-1-2-2', subject: 'science', unit: 1, lesson: 2, type: 'judge', difficulty: 1, content: '倾斜倒扣的杯子，水会进入杯中。', options: ['正确', '错误'], answer: '正确', analysis: '倾斜时空气排出，水进入杯中。', knowledgePoints: ['空气占据空间'] },
        ]},
      },
      {
        id: 3, title: '空气占据的空间会改变吗',
        previewContent: { guide: '空气占据的空间是固定的吗？能被压缩吗？', keyPoints: ['空气可压缩', '空气可扩张', '与水对比'], audioUrl: '', concepts: [
          { title: '可压缩性', description: '空气可以被压缩，也可以扩张，占据的空间会改变', example: '用注射器推拉可以压缩或扩张空气' },
          { title: '与水的区别', description: '水几乎不能被压缩，空气可以被压缩', example: '注射器推水推不动，推空气可以压缩' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '空气可压缩', content: '空气占据的空间可以改变', children: [
          { title: '压缩', content: '用力推注射器，空气被压缩，体积变小' },
          { title: '扩张', content: '拉注射器，空气扩张，体积变大' },
          { title: '弹性', content: '压缩后的空气有弹性，松手会恢复' },
        ]}, { title: '与水的对比', content: '水几乎不能被压缩，空气可以被压缩' }], keyPoints: ['空气可以被压缩和扩张', '空气占据的空间会改变', '水不能被压缩空气可以'], commonMistakes: ['空气不能被压缩（实际可以）'], exercises: [
          { id: 'sc-1-3-1', subject: 'science', unit: 1, lesson: 3, type: 'choice', difficulty: 1, content: '用注射器压缩空气和压缩水，哪个能被压缩？', options: ['水能压缩', '空气能压缩', '都能压缩', '都不能压缩'], answer: '空气能压缩', analysis: '空气可以被压缩，水几乎不能。', knowledgePoints: ['空气可压缩'] },
          { id: 'sc-1-3-2', subject: 'science', unit: 1, lesson: 3, type: 'judge', difficulty: 1, content: '压缩后的空气有弹性。', options: ['正确', '错误'], answer: '正确', analysis: '压缩空气有弹性，松手会恢复原体积。', knowledgePoints: ['空气弹性'] },
        ]},
      },
      {
        id: 4, title: '空气有质量吗',
        previewContent: { guide: '空气有质量吗？怎样证明？', keyPoints: ['空气有质量', '天平实验', '测量方法'], audioUrl: '', concepts: [
          { title: '空气的质量', description: '空气虽然轻，但确实有质量', example: '充气后的篮球比没气时重' },
          { title: '实验方法', description: '用天平称量充气前后的气球对比', example: '两个气球一充气一不充气，天平倾斜' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '空气有质量', content: '空气虽然轻但确实有质量', children: [
          { title: '实验证据', content: '充气后气球变重，天平倾斜' },
          { title: '空气质量小', content: '空气很轻，但大量空气质量不可忽略' },
        ]}], keyPoints: ['空气有质量', '充气后变重', '用天平可以验证'], commonMistakes: ['空气没有质量（实际有）'], exercises: [
          { id: 'sc-1-4-1', subject: 'science', unit: 1, lesson: 4, type: 'choice', difficulty: 1, content: '怎样证明空气有质量？', options: ['看颜色', '用天平称充气前后', '闻气味', '摸温度'], answer: '用天平称充气前后', analysis: '充气前后质量变化可用天平称量。', knowledgePoints: ['空气有质量'] },
          { id: 'sc-1-4-2', subject: 'science', unit: 1, lesson: 4, type: 'judge', difficulty: 1, content: '空气非常轻，所以没有质量。', options: ['正确', '错误'], answer: '错误', analysis: '空气很轻但确实有质量。', knowledgePoints: ['空气有质量'] },
        ]},
      },
      {
        id: 5, title: '空气流动有力量',
        previewContent: { guide: '空气流动会产生什么力量？生活中有哪些应用？', keyPoints: ['空气流动产生力', '风力', '生活应用'], audioUrl: '', concepts: [
          { title: '空气流动', description: '空气流动时会产生力量，可以推动物体', example: '风扇吹动纸条、风车转动' },
          { title: '生活应用', description: '风力发电、帆船航行、风车磨面', example: '风力发电利用空气流动的力量' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '空气流动的力量', content: '空气流动产生力量可以推动物体', children: [
          { title: '风力大小', content: '流动越快力量越大' },
          { title: '应用', content: '风力发电、帆船、风车' },
        ]}], keyPoints: ['空气流动有力量', '风力可以推动物体', '风力发电是应用'], commonMistakes: ['空气流动没有力量（实际有）'], exercises: [
          { id: 'sc-1-5-1', subject: 'science', unit: 1, lesson: 5, type: 'choice', difficulty: 1, content: '下列哪个利用了空气流动的力量？', options: ['风力发电', '烧水', '看电视', '写作业'], answer: '风力发电', analysis: '风力发电利用空气流动的力量。', knowledgePoints: ['空气流动'] },
          { id: 'sc-1-5-2', subject: 'science', unit: 1, lesson: 5, type: 'judge', difficulty: 1, content: '风是空气流动形成的。', options: ['正确', '错误'], answer: '正确', analysis: '空气流动形成风。', knowledgePoints: ['空气流动'] },
        ]},
      },
      {
        id: 6, title: '我们来做"热气球"',
        previewContent: { guide: '热气球为什么能升空？热空气有什么特点？', keyPoints: ['热空气上升', '热气球原理', '冷热空气对比'], audioUrl: '', concepts: [
          { title: '热空气上升', description: '热空气比冷空气轻，会向上运动', example: '热气球加热内部空气后升空' },
          { title: '实验模拟', description: '用塑料袋和蜡烛模拟热气球升空', example: '蜡烛加热塑料袋内空气，袋子上升' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '热空气特点', content: '热空气比冷空气轻，会上升', children: [
          { title: '热气球原理', content: '加热气球内空气使其上升' },
          { title: '生活现象', content: '厨房热气向上飘、暖气片装在下方' },
        ]}], keyPoints: ['热空气比冷空气轻', '热空气会上升', '热气球利用热空气上升原理'], commonMistakes: ['热空气比冷空气重（实际更轻）'], exercises: [
          { id: 'sc-1-6-1', subject: 'science', unit: 1, lesson: 6, type: 'choice', difficulty: 1, content: '热气球为什么能升空？', options: ['热空气比冷空气轻上升', '气球很轻', '里面有氢气', '风把它吹上去'], answer: '热空气比冷空气轻上升', analysis: '加热后热空气上升使气球升空。', knowledgePoints: ['热空气上升'] },
          { id: 'sc-1-6-2', subject: 'science', unit: 1, lesson: 6, type: 'judge', difficulty: 1, content: '热空气会向下运动。', options: ['正确', '错误'], answer: '错误', analysis: '热空气比冷空气轻，向上运动。', knowledgePoints: ['热空气上升'] },
        ]},
      },
      {
        id: 7, title: '风的成因',
        previewContent: { guide: '风是怎么形成的？自然界中的风从哪里来？', keyPoints: ['风的形成', '冷热空气对流', '温差产生风'], audioUrl: '', concepts: [
          { title: '风的成因', description: '冷热空气流动形成风，热空气上升，冷空气流过来补充', example: '海边白天风从海吹向陆地' },
          { title: '对流实验', description: '用蜡烛和冰块模拟冷热空气对流产生风', example: '蜡烛上方热空气上升，侧面冷空气流来' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '风的形成', content: '冷热空气对流形成风', children: [
          { title: '过程', content: '热空气上升→冷空气流来补充→形成风' },
          { title: '自然现象', content: '海陆风、山谷风都是冷热空气对流形成' },
        ]}], keyPoints: ['风是空气流动形成的', '冷热空气对流产生风', '热空气上升冷空气补充'], commonMistakes: ['风是凭空产生的（实际是冷热空气对流）'], exercises: [
          { id: 'sc-1-7-1', subject: 'science', unit: 1, lesson: 7, type: 'choice', difficulty: 2, content: '自然界中风是怎样形成的？', options: ['空气自己流动', '冷热空气对流', '云推动的', '树摇晃产生的'], answer: '冷热空气对流', analysis: '冷热空气对流形成风。', knowledgePoints: ['风的成因'] },
          { id: 'sc-1-7-2', subject: 'science', unit: 1, lesson: 7, type: 'judge', difficulty: 1, content: '热空气上升后，冷空气会流来补充。', options: ['正确', '错误'], answer: '正确', analysis: '热空气上升后冷空气流来补充形成对流。', knowledgePoints: ['风的成因'] },
        ]},
      },
      {
        id: 8, title: '自制打气筒',
        previewContent: { guide: '打气筒是怎样工作的？怎样利用空气性质制作简易打气筒？', keyPoints: ['打气筒原理', '空气可压缩', '工程实践'], audioUrl: '', concepts: [
          { title: '打气筒原理', description: '利用空气可压缩的性质，通过活塞推拉将空气压入物体', example: '给篮球打气时活塞推压空气进入球内' },
          { title: '工程实践', description: '用注射器、单向阀等材料制作简易打气筒', example: '注射器加单向阀可做成简易打气筒' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '打气筒原理', content: '利用空气可压缩性质将空气压入物体', children: [
          { title: '结构', content: '活塞、气筒、单向阀' },
          { title: '工作过程', content: '拉活塞吸气→推活塞压气→单向阀控制方向' },
        ]}], keyPoints: ['打气筒利用空气可压缩性', '活塞推拉压缩空气', '单向阀控制气流方向'], commonMistakes: ['打气筒不是靠吸力而是靠压缩空气'], exercises: [
          { id: 'sc-1-8-1', subject: 'science', unit: 1, lesson: 8, type: 'choice', difficulty: 2, content: '打气筒是利用空气的什么性质工作的？', options: ['空气有颜色', '空气可压缩', '空气有味道', '空气透明'], answer: '空气可压缩', analysis: '打气筒利用空气可压缩性质工作。', knowledgePoints: ['打气筒原理'] },
          { id: 'sc-1-8-2', subject: 'science', unit: 1, lesson: 8, type: 'choice', difficulty: 2, content: '打气筒中单向阀的作用是什么？', options: ['让空气只往一个方向流动', '让空气来回流动', '阻止空气流动', '测量空气质量'], answer: '让空气只往一个方向流动', analysis: '单向阀控制气流方向，只进不出。', knowledgePoints: ['打气筒原理'] },
        ]},
      },
    ],
  },
  {
    id: 2,
    title: '第二单元 · 呼吸与消化',
    lessons: [
      {
        id: 1, title: '我们的呼吸与消化',
        previewContent: { guide: '我们每天呼吸和吃东西，身体里发生了什么？', keyPoints: ['呼吸系统', '消化系统', '两大系统合作'], audioUrl: '', concepts: [
          { title: '呼吸', description: '吸入氧气，呼出二氧化碳，维持生命活动', example: '跑步时呼吸加快，需要更多氧气' },
          { title: '消化', description: '食物经过消化器官，被分解吸收营养', example: '吃饭后食物经过口腔、胃、小肠等' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '呼吸与消化', content: '人体两大生命活动系统', children: [
          { title: '呼吸', content: '吸入氧气呼出二氧化碳' },
          { title: '消化', content: '食物分解吸收营养' },
        ]}], keyPoints: ['呼吸吸入氧气呼出二氧化碳', '消化分解食物吸收营养', '两大系统维持生命'], commonMistakes: ['呼吸和消化没有关系（都为身体供能）'], exercises: [
          { id: 'sc-2-1-1', subject: 'science', unit: 2, lesson: 1, type: 'choice', difficulty: 1, content: '人体吸入的是什么气体？', options: ['二氧化碳', '氧气', '氮气', '氢气'], answer: '氧气', analysis: '人体呼吸吸入氧气。', knowledgePoints: ['呼吸'] },
          { id: 'sc-2-1-2', subject: 'science', unit: 2, lesson: 1, type: 'judge', difficulty: 1, content: '食物消化是为了给身体提供营养。', options: ['正确', '错误'], answer: '正确', analysis: '消化吸收营养为身体供能。', knowledgePoints: ['消化'] },
        ]},
      },
      {
        id: 2, title: '认识呼吸器官',
        previewContent: { guide: '我们吸气呼气经过哪些器官？呼吸器官有哪些？', keyPoints: ['呼吸器官', '鼻腔→咽→喉→气管→支气管→肺', '肺的作用'], audioUrl: '', concepts: [
          { title: '呼吸器官', description: '鼻腔→咽→喉→气管→支气管→肺', example: '肺是主要的呼吸器官' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '呼吸过程', content: '鼻腔→咽→喉→气管→支气管→肺', children: [
          { title: '吸气', content: '空气进入肺部' },
          { title: '呼气', content: '排出二氧化碳' },
        ]}], keyPoints: ['呼吸器官顺序', '肺是主要呼吸器官', '吸进氧气呼出二氧化碳'], commonMistakes: ['肺不是消化器官'], exercises: [
          { id: 'sc-2-2-1', subject: 'science', unit: 2, lesson: 2, type: 'choice', difficulty: 1, content: '人体主要的呼吸器官是？', options: ['心脏', '肺', '胃', '肝'], answer: '肺', analysis: '肺是主要的呼吸器官。', knowledgePoints: ['呼吸器官'] },
          { id: 'sc-2-2-2', subject: 'science', unit: 2, lesson: 2, type: 'choice', difficulty: 2, content: '下列哪个不是呼吸器官？', options: ['鼻腔', '气管', '胃', '支气管'], answer: '胃', analysis: '胃是消化器官不是呼吸器官。', knowledgePoints: ['呼吸器官'] },
        ]},
      },
      {
        id: 3, title: '呼吸的变化',
        previewContent: { guide: '运动前后呼吸有什么变化？为什么会变化？', keyPoints: ['呼吸频率', '运动与呼吸', '氧气需求'], audioUrl: '', concepts: [
          { title: '呼吸变化', description: '运动时呼吸加快加深，休息时呼吸变慢变浅', example: '跑步后大口喘气，休息后呼吸平稳' },
          { title: '原因', description: '运动时身体需要更多氧气，所以呼吸加快', example: '运动时心跳也加快配合供氧' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '呼吸变化', content: '运动时呼吸加快，休息时变慢', children: [
          { title: '原因', content: '运动时身体需要更多氧气' },
          { title: '正常呼吸', content: '安静时每分钟约呼吸20次' },
        ]}], keyPoints: ['运动时呼吸加快', '身体需要更多氧气时呼吸变快', '休息时呼吸平稳'], commonMistakes: ['运动时呼吸变慢（实际变快）'], exercises: [
          { id: 'sc-2-3-1', subject: 'science', unit: 2, lesson: 3, type: 'choice', difficulty: 1, content: '运动后呼吸会怎样变化？', options: ['变慢', '变快', '不变', '停止'], answer: '变快', analysis: '运动时身体需要更多氧气，呼吸加快。', knowledgePoints: ['呼吸变化'] },
          { id: 'sc-2-3-2', subject: 'science', unit: 2, lesson: 3, type: 'judge', difficulty: 1, content: '运动时身体需要更多的氧气。', options: ['正确', '错误'], answer: '正确', analysis: '运动时身体需要更多氧气所以呼吸加快。', knowledgePoints: ['呼吸变化'] },
        ]},
      },
      {
        id: 4, title: '测量肺活量',
        previewContent: { guide: '什么是肺活量？怎样测量肺活量？', keyPoints: ['肺活量概念', '测量方法', '肺活量大小的因素'], audioUrl: '', concepts: [
          { title: '肺活量', description: '一次尽力吸气后再尽力呼出的气体总量', example: '运动员肺活量通常比普通人大' },
          { title: '测量方法', description: '用肺活量测量袋或吹嘴测量', example: '深吸气后对着测量袋尽力呼气' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '肺活量', content: '一次尽力呼出的最大气体量', children: [
          { title: '影响因素', content: '年龄、性别、运动习惯、身体发育' },
          { title: '提高方法', content: '经常运动可以增大肺活量' },
        ]}], keyPoints: ['肺活量是一次最大呼气量', '用测量袋测量', '运动可以增大肺活量'], commonMistakes: ['肺活量越大不一定代表越健康（但通常身体更好）'], exercises: [
          { id: 'sc-2-4-1', subject: 'science', unit: 2, lesson: 4, type: 'choice', difficulty: 1, content: '肺活量是指什么？', options: ['一次呼吸的量', '一次尽力吸气后尽力呼出的气体总量', '每分钟呼吸的量', '一口气能吸的量'], answer: '一次尽力吸气后尽力呼出的气体总量', analysis: '肺活量是一次尽力呼出的最大气体量。', knowledgePoints: ['肺活量'] },
          { id: 'sc-2-4-2', subject: 'science', unit: 2, lesson: 4, type: 'choice', difficulty: 2, content: '怎样可以提高肺活量？', options: ['多睡觉', '经常运动', '多吃东西', '少运动'], answer: '经常运动', analysis: '经常运动可以增大肺活量。', knowledgePoints: ['肺活量'] },
        ]},
      },
      {
        id: 5, title: '口腔里的消化',
        previewContent: { guide: '食物进入口腔后发生了什么？口腔怎样消化食物？', keyPoints: ['牙齿咀嚼', '唾液作用', '口腔消化'], audioUrl: '', concepts: [
          { title: '牙齿', description: '牙齿切碎磨碎食物，是消化的第一步', example: '门牙切断、臼齿磨碎食物' },
          { title: '唾液', description: '唾液含有酶，能初步消化食物中的淀粉', example: '馒头嚼久了有甜味，是唾液分解淀粉' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '口腔消化', content: '牙齿咀嚼+唾液初步消化', children: [
          { title: '牙齿', content: '切断、撕裂、磨碎食物' },
          { title: '唾液', content: '湿润食物、初步分解淀粉' },
        ]}], keyPoints: ['口腔是消化第一站', '牙齿咀嚼磨碎食物', '唾液初步消化淀粉'], commonMistakes: ['口腔只是嚼碎食物不消化（唾液也在消化）'], exercises: [
          { id: 'sc-2-5-1', subject: 'science', unit: 2, lesson: 5, type: 'choice', difficulty: 1, content: '食物消化的第一站是？', options: ['胃', '口腔', '小肠', '食道'], answer: '口腔', analysis: '口腔咀嚼是消化的开始。', knowledgePoints: ['口腔消化'] },
          { id: 'sc-2-5-2', subject: 'science', unit: 2, lesson: 5, type: 'choice', difficulty: 2, content: '馒头嚼久了有甜味是因为？', options: ['馒头本身是甜的', '唾液分解淀粉产生糖', '牙齿磨出甜味', '舌头尝出甜味'], answer: '唾液分解淀粉产生糖', analysis: '唾液中的酶初步分解淀粉为糖。', knowledgePoints: ['唾液作用'] },
        ]},
      },
      {
        id: 6, title: '胃和小肠里的消化',
        previewContent: { guide: '食物从口腔之后去了哪里？胃和小肠怎样消化食物？', keyPoints: ['胃的作用', '小肠的作用', '消化过程'], audioUrl: '', concepts: [
          { title: '胃', description: '胃分泌胃酸，磨碎食物，暂时储存', example: '胃像一个袋子，揉搓磨碎食物' },
          { title: '小肠', description: '小肠是主要吸收器官，吸收大部分营养', example: '小肠很长，内壁有绒毛增加吸收面积' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '胃的消化', content: '胃酸磨碎食物，暂时储存', children: [
          { title: '胃酸', content: '帮助消化食物' },
        ]}, { title: '小肠的消化', content: '吸收大部分营养', children: [
          { title: '主要器官', content: '小肠是吸收营养的主要器官' },
          { title: '绒毛', content: '小肠内壁有绒毛增加吸收面积' },
        ]}], keyPoints: ['胃磨碎食物分泌胃酸', '小肠是吸收营养的主要器官', '小肠很长内壁有绒毛'], commonMistakes: ['小肠不是最小的肠（是吸收最主要的）'], exercises: [
          { id: 'sc-2-6-1', subject: 'science', unit: 2, lesson: 6, type: 'choice', difficulty: 1, content: '吸收营养最主要的器官是？', options: ['口腔', '胃', '小肠', '大肠'], answer: '小肠', analysis: '小肠是吸收营养的主要器官。', knowledgePoints: ['小肠'] },
          { id: 'sc-2-6-2', subject: 'science', unit: 2, lesson: 6, type: 'choice', difficulty: 2, content: '胃的主要功能是什么？', options: ['吸收营养', '磨碎食物暂时储存', '形成粪便', '输送食物'], answer: '磨碎食物暂时储存', analysis: '胃分泌胃酸磨碎食物并暂时储存。', knowledgePoints: ['胃的功能'] },
        ]},
      },
      {
        id: 7, title: '食物在身体里的旅行',
        previewContent: { guide: '食物从入口到排出，经过了哪些器官？完整路线是什么？', keyPoints: ['消化器官顺序', '口腔→食道→胃→小肠→大肠', '各器官功能'], audioUrl: '', concepts: [
          { title: '消化路线', description: '口腔→食道→胃→小肠→大肠→肛门', example: '食物像一个旅行，依次经过各消化器官' },
          { title: '各器官功能', description: '口腔咀嚼、食道输送、胃磨碎、小肠吸收、大肠吸水', example: '每个器官有不同的消化功能' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '消化顺序', content: '口腔→食道→胃→小肠→大肠', children: [
          { title: '口腔', content: '牙齿咀嚼，唾液初步消化' },
          { title: '食道', content: '输送食物到胃' },
          { title: '胃', content: '胃酸磨碎食物' },
          { title: '小肠', content: '吸收大部分营养' },
          { title: '大肠', content: '吸收水分，形成粪便' },
        ]}], keyPoints: ['消化器官完整顺序', '各器官功能不同', '小肠吸收大肠吸水'], commonMistakes: ['消化顺序记错（口腔→食道→胃→小肠→大肠）'], exercises: [
          { id: 'sc-2-7-1', subject: 'science', unit: 2, lesson: 7, type: 'choice', difficulty: 2, content: '食物在身体里的旅行顺序是？', options: ['口腔→胃→食道→大肠→小肠', '口腔→食道→胃→小肠→大肠', '口腔→小肠→胃→食道→大肠', '口腔→食道→小肠→胃→大肠'], answer: '口腔→食道→胃→小肠→大肠', analysis: '消化顺序：口腔→食道→胃→小肠→大肠。', knowledgePoints: ['消化顺序'] },
          { id: 'sc-2-7-2', subject: 'science', unit: 2, lesson: 7, type: 'fill', difficulty: 2, content: '消化顺序：口腔→______→胃→小肠→大肠。', answer: '食道', analysis: '食道在口腔和胃之间输送食物。', knowledgePoints: ['消化顺序'] },
        ]},
      },
      {
        id: 8, title: '呵护我们的器官',
        previewContent: { guide: '怎样保护我们的呼吸器官和消化器官？', keyPoints: ['保护呼吸器官', '保护消化器官', '健康生活习惯'], audioUrl: '', concepts: [
          { title: '保护呼吸', description: '不吸烟、远离污染空气、多运动增强肺功能', example: '雾霾天戴口罩、不吸烟' },
          { title: '保护消化', description: '细嚼慢咽、定时定量、不暴饮暴食、少吃垃圾食品', example: '吃饭细嚼慢咽减轻胃的负担' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '保护呼吸器官', content: '不吸烟、远离污染、多运动', children: [
          { title: '具体做法', content: '雾霾天戴口罩、经常运动增强肺功能' },
        ]}, { title: '保护消化器官', content: '细嚼慢咽、定时定量、均衡饮食', children: [
          { title: '具体做法', content: '不暴饮暴食、少吃垃圾食品、多吃蔬果' },
        ]}], keyPoints: ['不吸烟保护肺', '细嚼慢咽保护胃', '均衡饮食保护消化器官'], commonMistakes: ['暴饮暴食不影响健康（实际伤害消化器官）'], exercises: [
          { id: 'sc-2-8-1', subject: 'science', unit: 2, lesson: 8, type: 'choice', difficulty: 1, content: '下列哪种做法能保护呼吸器官？', options: ['吸烟', '雾霾天不戴口罩', '经常运动增强肺功能', '在污染空气中运动'], answer: '经常运动增强肺功能', analysis: '运动增强肺功能，保护呼吸器官。', knowledgePoints: ['保护器官'] },
          { id: 'sc-2-8-2', subject: 'science', unit: 2, lesson: 8, type: 'choice', difficulty: 1, content: '保护消化器官应该怎样做？', options: ['暴饮暴食', '细嚼慢咽定时定量', '多吃垃圾食品', '快速吃完'], answer: '细嚼慢咽定时定量', analysis: '细嚼慢咽定时定量保护消化器官。', knowledgePoints: ['保护器官'] },
        ]},
      },
    ],
  },
  {
    id: 3,
    title: '第三单元 · 声音',
    lessons: [
      {
        id: 1, title: '声音是怎样产生的',
        previewContent: { guide: '声音是怎么产生的？发声的物体有什么共同点？', keyPoints: ['声音产生', '物体振动', '振动停止发声停止'], audioUrl: '', concepts: [
          { title: '声音产生', description: '声音由物体振动产生', example: '敲鼓时鼓面振动发出声音' },
          { title: '振动停止', description: '振动停止，发声也停止', example: '按住鼓面振动停止，声音消失' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '声音产生', content: '物体振动产生声音', children: [
          { title: '振动停止', content: '振动停止，发声也停止' },
        ]}], keyPoints: ['声音由振动产生', '振动停止发声停止', '发声物体都在振动'], commonMistakes: ['声音不是凭空产生的'], exercises: [
          { id: 'sc-3-1-1', subject: 'science', unit: 3, lesson: 1, type: 'choice', difficulty: 1, content: '声音是由什么产生的？', options: ['光', '物体振动', '热', '电'], answer: '物体振动', analysis: '声音由物体振动产生。', knowledgePoints: ['声音产生'] },
          { id: 'sc-3-1-2', subject: 'science', unit: 3, lesson: 1, type: 'judge', difficulty: 1, content: '振动停止，发声也停止。', options: ['正确', '错误'], answer: '正确', analysis: '振动停止发声停止。', knowledgePoints: ['声音产生'] },
        ]},
      },
      {
        id: 2, title: '声音的强弱',
        previewContent: { guide: '声音的强弱（音量）与什么有关？', keyPoints: ['音量', '振幅', '振幅大音量大'], audioUrl: '', concepts: [
          { title: '音量', description: '声音的强弱叫音量，与物体振幅有关', example: '用力敲鼓振幅大，声音大（音量大）' },
          { title: '振幅', description: '振幅越大，音量越大；振幅越小，音量越小', example: '轻轻拨弦振幅小，声音弱' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '声音强弱', content: '音量与振幅有关', children: [
          { title: '振幅大', content: '振幅大音量大（声音强）' },
          { title: '振幅小', content: '振幅小音量小（声音弱）' },
        ]}], keyPoints: ['音量是声音的强弱', '振幅大音量大', '用力敲振幅大声音强'], commonMistakes: ['音量和音高混淆（音量是强弱，音高是高低）'], exercises: [
          { id: 'sc-3-2-1', subject: 'science', unit: 3, lesson: 2, type: 'choice', difficulty: 1, content: '声音的强弱叫什么？', options: ['音高', '音量', '音色', '音调'], answer: '音量', analysis: '声音的强弱叫音量。', knowledgePoints: ['音量'] },
          { id: 'sc-3-2-2', subject: 'science', unit: 3, lesson: 2, type: 'choice', difficulty: 2, content: '用力敲鼓声音变大，是因为什么变大？', options: ['振动频率', '振幅', '材质', '温度'], answer: '振幅', analysis: '用力敲鼓振幅大，音量大。', knowledgePoints: ['音量与振幅'] },
        ]},
      },
      {
        id: 3, title: '声音的高低',
        previewContent: { guide: '声音的高低（音高）与什么有关？', keyPoints: ['音高', '振动频率', '频率高音高高'], audioUrl: '', concepts: [
          { title: '音高', description: '声音的高低叫音高，与振动频率有关', example: '吉他细弦振动快，音高高' },
          { title: '频率', description: '振动越快频率越高，音高越高；振动越慢频率越低，音高越低', example: '粗弦振动慢音高低，细弦振动快音高高' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '声音高低', content: '音高与振动频率有关', children: [
          { title: '频率高', content: '振动快频率高，音高高' },
          { title: '频率低', content: '振动慢频率低，音高低' },
        ]}], keyPoints: ['音高是声音的高低', '振动快频率高音高高', '振动慢频率低音高低'], commonMistakes: ['音高和音量混淆'], exercises: [
          { id: 'sc-3-3-1', subject: 'science', unit: 3, lesson: 3, type: 'choice', difficulty: 2, content: '音高与什么有关？', options: ['振幅', '振动频率', '材质', '温度'], answer: '振动频率', analysis: '振动越快频率越高，音高越高。', knowledgePoints: ['音高'] },
          { id: 'sc-3-3-2', subject: 'science', unit: 3, lesson: 3, type: 'choice', difficulty: 2, content: '吉他细弦比粗弦音高怎样？', options: ['音高更高', '音高更低', '一样高', '没有音高'], answer: '音高更高', analysis: '细弦振动快频率高，音高高。', knowledgePoints: ['音高'] },
        ]},
      },
      {
        id: 4, title: '乐器的声音变化',
        previewContent: { guide: '不同乐器怎样发出高低强弱不同的声音？', keyPoints: ['乐器发声', '弦乐器', '管乐器', '打击乐器'], audioUrl: '', concepts: [
          { title: '弦乐器', description: '弦的粗细、长短、松紧影响音高', example: '吉他、小提琴通过拨弦发声' },
          { title: '管乐器', description: '空气柱长短影响音高', example: '笛子、号通过吹气发声' },
          { title: '打击乐器', description: '敲击力度影响音量，材质影响音色', example: '鼓、锣通过敲击发声' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '乐器分类', content: '弦乐器、管乐器、打击乐器', children: [
          { title: '弦乐器', content: '弦粗细长短松紧影响音高' },
          { title: '管乐器', content: '空气柱长短影响音高' },
          { title: '打击乐器', content: '敲击力度影响音量' },
        ]}], keyPoints: ['弦粗短紧音高高', '管长音高低管短音高高', '敲击力度大音量大'], commonMistakes: ['弦越粗音高越高（实际弦越粗音高越低）'], exercises: [
          { id: 'sc-3-4-1', subject: 'science', unit: 3, lesson: 4, type: 'choice', difficulty: 2, content: '吉他弦越细，音高怎样？', options: ['音高越高', '音高越低', '不变', '没有音高'], answer: '音高越高', analysis: '细弦振动快频率高，音高高。', knowledgePoints: ['乐器音高'] },
          { id: 'sc-3-4-2', subject: 'science', unit: 3, lesson: 4, type: 'choice', difficulty: 2, content: '笛子堵住更多孔，空气柱变长，音高怎样？', options: ['音高越高', '音高越低', '不变', '没有音高'], answer: '音高越低', analysis: '空气柱越长振动越慢，音高越低。', knowledgePoints: ['乐器音高'] },
        ]},
      },
      {
        id: 5, title: '设计我们的乐器',
        previewContent: { guide: '怎样设计一个能发出不同音高的简易乐器？', keyPoints: ['乐器设计', '音高控制', '工程实践'], audioUrl: '', concepts: [
          { title: '设计要素', description: '选择材料、确定音高范围、设计结构', example: '用不同长度的管子做排箫' },
          { title: '材料选择', description: '碗、杯子、管子、橡皮筋等都可以做乐器', example: '碗里装不同水量敲出不同音高' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '乐器设计', content: '选材料→定音高→设计结构→制作测试', children: [
          { title: '音高控制', content: '通过改变长度、粗细、水量等控制音高' },
          { title: '测试改进', content: '制作后测试音高是否准确并调整' },
        ]}], keyPoints: ['设计乐器要考虑音高', '不同材料不同方法控制音高', '制作后要测试改进'], commonMistakes: ['随便做就行（需要设计音高）'], exercises: [
          { id: 'sc-3-5-1', subject: 'science', unit: 3, lesson: 5, type: 'choice', difficulty: 2, content: '碗里装不同水量敲击，水越多音高怎样？', options: ['音高越高', '音高越低', '不变', '没有音高'], answer: '音高越低', analysis: '水越多振动部分越短，音高越低。', knowledgePoints: ['乐器设计'] },
          { id: 'sc-3-5-2', subject: 'science', unit: 3, lesson: 5, type: 'judge', difficulty: 1, content: '设计乐器后需要测试和改进。', options: ['正确', '错误'], answer: '正确', analysis: '制作后要测试音高是否准确并调整改进。', knowledgePoints: ['乐器设计'] },
        ]},
      },
      {
        id: 6, title: '改进我们的乐器',
        previewContent: { guide: '怎样改进乐器让声音更好？工程实践的过程是什么？', keyPoints: ['测试改进', '音准调整', '工程迭代'], audioUrl: '', concepts: [
          { title: '改进方法', description: '通过测试发现问题，调整材料或结构改善音高和音量', example: '排箫管子长度微调使音高更准' },
          { title: '工程迭代', description: '设计→制作→测试→改进→再测试，不断优化', example: '工程师也是反复改进才做出好产品' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '改进过程', content: '测试→发现问题→调整→再测试', children: [
          { title: '音高调整', content: '微调长度、粗细、松紧使音高更准' },
          { title: '音量调整', content: '改变敲击力度或共鸣结构' },
        ]}], keyPoints: ['测试发现问题后改进', '微调使音高更准', '工程实践需要反复迭代'], commonMistakes: ['一次就能做好（需要反复改进）'], exercises: [
          { id: 'sc-3-6-1', subject: 'science', unit: 3, lesson: 6, type: 'choice', difficulty: 2, content: '乐器音高不准应该怎样做？', options: ['扔掉重做', '微调长度或粗细使音高更准', '不管它', '换一种乐器'], answer: '微调长度或粗细使音高更准', analysis: '通过微调改善音高准确性。', knowledgePoints: ['乐器改进'] },
          { id: 'sc-3-6-2', subject: 'science', unit: 3, lesson: 6, type: 'judge', difficulty: 1, content: '工程实践需要反复测试和改进。', options: ['正确', '错误'], answer: '正确', analysis: '工程实践是设计→制作→测试→改进的迭代过程。', knowledgePoints: ['工程迭代'] },
        ]},
      },
      {
        id: 7, title: '声音的传播',
        previewContent: { guide: '声音怎样传播？在不同物质中传播一样吗？', keyPoints: ['声音传播', '介质传声', '固体>液体>气体', '真空不传声'], audioUrl: '', concepts: [
          { title: '传播介质', description: '声音以波的形式通过气体、液体、固体传播', example: '空气、水、铁轨都能传声' },
          { title: '传播速度', description: '固体传声最快，液体次之，气体最慢', example: '铁轨传声比空气快' },
          { title: '真空', description: '真空中没有介质，不能传声', example: '月球上没有空气，不能传声' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '声音传播', content: '声音以波的形式通过介质传播', children: [
          { title: '介质', content: '气体、液体、固体都能传声' },
          { title: '速度', content: '固体最快，液体次之，气体最慢' },
          { title: '真空', content: '真空没有介质，不能传声' },
        ]}, { title: '降噪', content: '在声源处、传播过程中、人耳处降噪' }], keyPoints: ['声音需要介质传播', '固体传声最快气体最慢', '真空不能传声'], commonMistakes: ['真空能传声（实际不能）'], exercises: [
          { id: 'sc-3-7-1', subject: 'science', unit: 3, lesson: 7, type: 'choice', difficulty: 1, content: '声音在哪种介质中传播最快？', options: ['气体', '液体', '固体', '真空'], answer: '固体', analysis: '固体传声最快。', knowledgePoints: ['传播速度'] },
          { id: 'sc-3-7-2', subject: 'science', unit: 3, lesson: 7, type: 'judge', difficulty: 1, content: '真空中可以传播声音。', options: ['正确', '错误'], answer: '错误', analysis: '真空没有介质，不能传声。', knowledgePoints: ['声音传播'] },
        ]},
      },
      {
        id: 8, title: '保护听力',
        previewContent: { guide: '怎样保护我们的听力？噪音有什么危害？', keyPoints: ['噪音危害', '保护听力方法', '健康习惯'], audioUrl: '', concepts: [
          { title: '噪音危害', description: '长期处于噪音环境中会损伤听力', example: '长期戴耳机大音量听歌损伤听力' },
          { title: '保护方法', description: '远离噪音源、控制音量、戴耳塞', example: '听音乐音量不要太大、远离鞭炮' },
        ]},
        reviewContent: { knowledgeMap: [{ title: '噪音', content: '过大的声音是噪音，损伤听力', children: [
          { title: '噪音来源', content: '交通噪音、施工噪音、过大音量的音乐' },
        ]}, { title: '保护听力', content: '远离噪音、控制音量、戴耳塞', children: [
          { title: '具体做法', content: '音量不超过60%、不在噪音环境久留、戴防护耳塞' },
        ]}], keyPoints: ['噪音损伤听力', '远离噪音源', '控制音量保护听力'], commonMistakes: ['大音量听歌不影响听力（实际损伤）'], exercises: [
          { id: 'sc-3-8-1', subject: 'science', unit: 3, lesson: 8, type: 'choice', difficulty: 1, content: '下列哪种做法能保护听力？', options: ['大音量听音乐', '长时间戴耳机', '远离噪音源控制音量', '在鞭炮旁边不防护'], answer: '远离噪音源控制音量', analysis: '远离噪音源、控制音量保护听力。', knowledgePoints: ['保护听力'] },
          { id: 'sc-3-8-2', subject: 'science', unit: 3, lesson: 8, type: 'judge', difficulty: 1, content: '长期处于噪音环境中会损伤听力。', options: ['正确', '错误'], answer: '正确', analysis: '噪音会损伤听力。', knowledgePoints: ['噪音危害'] },
        ]},
      },
    ],
  },
]

export const scienceConfig: SubjectConfig = {
  type: 'science',
  name: '科学',
  icon: 'cluster-o',
  color: '#E84393',
  bgColor: '#FDF0F7',
  units,
}
