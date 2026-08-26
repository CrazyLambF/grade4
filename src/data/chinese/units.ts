import type { UnitItem } from '@/types'

export const chineseUnits: UnitItem[] = [
  {
    id: 1,
    title: '第一单元 · 自然奇观',
    lessons: [
      {
        id: 1,
        title: '观潮',
        previewContent: {
          guide: '钱塘江大潮自古以来被称为天下奇观。带着问题读课文：潮来前、潮来时、潮头过后各是怎样的景象？',
          keyPoints: ['了解钱塘江大潮的壮丽奇特', '学习按时间顺序描写景物', '体会比喻、夸张等修辞手法'],
          audioUrl: '',
          newWords: [
            { word: '潮', pinyin: 'cháo', meaning: '潮水', phrases: ['潮水', '涨潮'] },
            { word: '屹', pinyin: 'yì', meaning: '高耸', phrases: ['屹立'] },
            { word: '鼎', pinyin: 'dǐng', meaning: '古代器具', phrases: ['鼎沸'] },
            { word: '沸', pinyin: 'fèi', meaning: '水开', phrases: ['沸腾', '鼎沸'] },
          ],
        },
        reviewContent: {
          knowledgeMap: [
            { title: '文章结构', content: '潮来前→潮来时→潮头过后（时间顺序）', children: [
              { title: '潮来前', content: '江面平静，薄雾蒙蒙' },
              { title: '潮来时', content: '白线→拉长变粗→白浪翻滚→山崩地裂' },
              { title: '潮头过后', content: '余波涌来，风号浪吼' },
            ]},
            { title: '修辞手法', content: '比喻、夸张', children: [
              { title: '比喻', content: '犹如千万匹白色战马齐头并进' },
              { title: '夸张', content: '声音如同山崩地裂' },
            ]},
          ],
          keyPoints: ['天下奇观', '时间顺序描写', '比喻夸张修辞', '由远及近观察'],
          commonMistakes: ['"鼎"上半部分不是"目"', '"贯"笔顺先写毋再写贝'],
          exercises: [
            { id: 'cn-1-1-1', subject: 'chinese', unit: 1, lesson: 1, type: 'choice', difficulty: 1, content: '《观潮》的写作顺序是？', options: ['空间顺序', '时间顺序', '逻辑顺序', '事情发展顺序'], answer: '时间顺序', analysis: '按潮来前、潮来时、潮头过后时间顺序。', knowledgePoints: ['文章结构'] },
            { id: 'cn-1-1-2', subject: 'chinese', unit: 1, lesson: 1, type: 'choice', difficulty: 2, content: '"那声音如同山崩地裂"运用了什么修辞？', options: ['比喻', '夸张', '拟人', '排比'], answer: '夸张', analysis: '对声音的夸张描写。', knowledgePoints: ['修辞手法'] },
            { id: 'cn-1-1-3', subject: 'chinese', unit: 1, lesson: 1, type: 'fill', difficulty: 1, content: '钱塘江大潮自古以来被称为______。', answer: '天下奇观', analysis: '课文开篇点明。', knowledgePoints: ['课文内容'] },
            { id: 'cn-1-1-4', subject: 'chinese', unit: 1, lesson: 1, type: 'judge', difficulty: 1, content: '"人声鼎沸"形容人声喧闹像水在锅里沸腾。', options: ['正确', '错误'], answer: '正确', analysis: '鼎沸本意即锅水沸腾。', knowledgePoints: ['词语理解'] },
          ],
        },
      },
      {
        id: 2,
        title: '走月亮',
        previewContent: {
          guide: '在月光下行走是什么感受？读课文感受月夜景色美好。',
          keyPoints: ['体会月下漫步温馨', '学习感官描写', '感受亲情之美'],
          audioUrl: '',
          newWords: [
            { word: '淘', pinyin: 'táo', meaning: '淘洗', phrases: ['淘洗', '淘气'] },
            { word: '牵', pinyin: 'qiān', meaning: '拉', phrases: ['牵手'] },
            { word: '鹅', pinyin: 'é', meaning: '家禽', phrases: ['鹅卵石'] },
          ],
        },
        reviewContent: {
          knowledgeMap: [
            { title: '描写方法', content: '视觉、听觉、嗅觉多感官描写月夜' },
            { title: '情感主线', content: '母子亲情，温馨美好' },
          ],
          keyPoints: ['多感官描写', '月夜景色', '母子情深'],
          commonMistakes: ['"鹅卵石"不要写成"娥卵石"'],
          exercises: [
            { id: 'cn-1-2-1', subject: 'chinese', unit: 1, lesson: 2, type: 'choice', difficulty: 1, content: '《走月亮》主要表达什么情感？', options: ['思乡', '母子亲情', '自然之美', '童年回忆'], answer: '母子亲情', analysis: '通过走月亮表达母子温馨亲情。', knowledgePoints: ['文章情感'] },
          ],
        },
      },
      {
        id: 3,
        title: '现代诗二首',
        previewContent: {
          guide: '读《秋晚的江上》和《花牛歌》，感受现代诗韵律。',
          keyPoints: ['现代诗特点', '画面感', '想象与联想'],
          audioUrl: '',
          newWords: [{ word: '巢', pinyin: 'cháo', meaning: '鸟窝', phrases: ['鸟巢'] }, { word: '苇', pinyin: 'wěi', meaning: '芦苇', phrases: ['芦苇'] }],
        },
        reviewContent: {
          knowledgeMap: [{ title: '《秋晚的江上》', content: '秋日傍晚江面归鸟画面' }, { title: '《花牛歌》', content: '花牛在草地坐眠走做梦的悠闲' }],
          keyPoints: ['现代诗形式自由', '画面感强', '富有童趣'],
          commonMistakes: ['现代诗也讲究韵律'],
          exercises: [
            { id: 'cn-1-3-1', subject: 'chinese', unit: 1, lesson: 3, type: 'fill', difficulty: 1, content: '《花牛歌》的作者是______。', answer: '徐志摩', analysis: '徐志摩，现代著名诗人。', knowledgePoints: ['文学常识'] },
          ],
        },
      },
      {
        id: 4,
        title: '繁星',
        previewContent: {
          guide: '巴金笔下三次看星空有什么不同感受？',
          keyPoints: ['三次看星空', '情景交融', '联想与想象'],
          audioUrl: '',
          newWords: [{ word: '昧', pinyin: 'mèi', meaning: '昏暗', phrases: ['半明半昧'] }, { word: '坠', pinyin: 'zhuì', meaning: '落下', phrases: ['坠落'] }],
        },
        reviewContent: {
          knowledgeMap: [{ title: '三次看星空', content: '从前庭院→三年前南京→如今海上', children: [
            { title: '从前', content: '密密麻麻如回母亲怀里' },
            { title: '三年前', content: '星群密布如与朋友对话' },
            { title: '如今', content: '半明半昧如摇摇欲坠' },
          ]}],
          keyPoints: ['时间顺序', '不同时期不同感受', '情景交融'],
          commonMistakes: ['作者是巴金'],
          exercises: [
            { id: 'cn-1-4-1', subject: 'chinese', unit: 1, lesson: 4, type: 'choice', difficulty: 1, content: '《繁星》的作者是？', options: ['冰心', '巴金', '老舍', '鲁迅'], answer: '巴金', analysis: '巴金，现代著名作家。', knowledgePoints: ['文学常识'] },
          ],
        },
      },
    ],
  },
  {
    id: 2,
    title: '第二单元 · 策略提问',
    lessons: [
      {
        id: 1, title: '一个豆荚里的五粒豆',
        previewContent: { guide: '五粒豆各有怎样的命运？学会从不同角度提问。', keyPoints: ['阅读策略：提问', '多角度思考', '安徒生童话'], audioUrl: '', newWords: [{ word: '荚', pinyin: 'jiá', meaning: '豆类果实', phrases: ['豆荚'] }, { word: '豌', pinyin: 'wān', meaning: '植物', phrases: ['豌豆'] }] },
        reviewContent: { knowledgeMap: [{ title: '五粒豆命运', content: '飞向各处、落水沟、被鸽吃、给女孩希望' }, { title: '策略', content: '从内容、写法、联系生活角度提问' }], keyPoints: ['五粒豆不同命运', '提问策略', '平凡中的伟大'], commonMistakes: ['提问要围绕课文重点'], exercises: [
          { id: 'cn-2-1-1', subject: 'chinese', unit: 2, lesson: 1, type: 'choice', difficulty: 1, content: '《一个豆荚里的五粒豆》作者是？', options: ['格林兄弟', '安徒生', '王尔德', '卡雷尔'], answer: '安徒生', analysis: '安徒生，丹麦童话作家。', knowledgePoints: ['文学常识'] },
        ]},
      },
      {
        id: 2, title: '蝙蝠和雷达',
        previewContent: { guide: '蝙蝠夜间飞行靠什么？科学家怎么发现的？', keyPoints: ['科学小品文', '仿生学', '实验方法'], audioUrl: '', newWords: [{ word: '蝠', pinyin: 'fú', meaning: '蝙蝠', phrases: ['蝙蝠'] }, { word: '锐', pinyin: 'ruì', meaning: '锋利', phrases: ['敏锐'] }] },
        reviewContent: { knowledgeMap: [{ title: '三次实验', content: '蒙眼→灵活；塞耳→乱撞；封嘴→乱撞', children: [{ title: '结论', content: '蝙蝠靠嘴和耳朵配合探路' }] }, { title: '仿生学', content: '雷达原理来自蝙蝠探路' }], keyPoints: ['三次实验', '超声波原理', '雷达与蝙蝠联系'], commonMistakes: ['蝙蝠不靠眼睛夜间飞行'], exercises: [
          { id: 'cn-2-2-1', subject: 'chinese', unit: 2, lesson: 2, type: 'choice', difficulty: 2, content: '蝙蝠夜间飞行靠什么探路？', options: ['眼睛', '嘴和耳朵', '翅膀', '尾巴'], answer: '嘴和耳朵', analysis: '靠嘴发超声波耳朵接收回声探路。', knowledgePoints: ['课文内容'] },
          { id: 'cn-2-2-2', subject: 'chinese', unit: 2, lesson: 2, type: 'judge', difficulty: 1, content: '雷达原理和蝙蝠探路原理相似。', options: ['正确', '错误'], answer: '正确', analysis: '雷达发射无线电波接收反射波。', knowledgePoints: ['仿生学'] },
        ]},
      },
      {
        id: 3, title: '呼风唤雨的世纪',
        previewContent: { guide: '20世纪有哪些科技发明改变了生活？', keyPoints: ['科技发展', '对比今昔', '说明方法'], audioUrl: '', newWords: [{ word: '哲', pinyin: 'zhé', meaning: '智慧', phrases: ['哲学'] }, { word: '赖', pinyin: 'lài', meaning: '依靠', phrases: ['依赖'] }] },
        reviewContent: { knowledgeMap: [{ title: '中心', content: '20世纪科技飞速发展，人类呼风唤雨' }, { title: '说明方法', content: '作比较、举例子' }], keyPoints: ['科技改变生活', '作比较说明', '20世纪成就'], commonMistakes: ['"忽如一夜春风来"引用自岑参'], exercises: [
          { id: 'cn-2-3-1', subject: 'chinese', unit: 2, lesson: 3, type: 'fill', difficulty: 1, content: '20世纪是一个______的世纪。', answer: '呼风唤雨', analysis: '科技发达如呼风唤雨。', knowledgePoints: ['课文内容'] },
        ]},
      },
      {
        id: 4, title: '蝴蝶的家',
        previewContent: { guide: '下雨时蝴蝶躲在哪？感受对生命的关爱。', keyPoints: ['关爱生命', '观察思考', '疑问句'], audioUrl: '', newWords: [{ word: '撼', pinyin: 'hàn', meaning: '摇动', phrases: ['震撼'] }, { word: '雀', pinyin: 'què', meaning: '小鸟', phrases: ['麻雀'] }] },
        reviewContent: { knowledgeMap: [{ title: '情感', content: '对蝴蝶的关心担忧' }, { title: '写法', content: '反复提问表达关切' }], keyPoints: ['关爱小生命', '疑问句运用', '心理描写'], commonMistakes: ['文章未给出蝴蝶家的确定答案'], exercises: [] },
      },
    ],
  },
  {
    id: 3,
    title: '第三单元 · 连续观察',
    lessons: [
      {
        id: 1, title: '古诗三首',
        previewContent: { guide: '《暮江吟》《题西林壁》《雪梅》各写了什么？', keyPoints: ['古诗背诵', '诗意理解', '哲理感悟'], audioUrl: '', newWords: [{ word: '暮', pinyin: 'mù', meaning: '傍晚', phrases: ['暮色'] }, { word: '瑟', pinyin: 'sè', meaning: '风声', phrases: ['瑟瑟'] }, { word: '庐', pinyin: 'lú', meaning: '房屋', phrases: ['庐山'] }] },
        reviewContent: {
          knowledgeMap: [
            { title: '《暮江吟》', content: '白居易，深秋傍晚江面美景', children: [{ title: '名句', content: '一道残阳铺水中，半江瑟瑟半江红' }] },
            { title: '《题西林壁》', content: '苏轼，"当局者迷"哲理', children: [{ title: '名句', content: '不识庐山真面目，只缘身在此山中' }] },
            { title: '《雪梅》', content: '卢钺，梅雪争春各有长短', children: [{ title: '名句', content: '梅须逊雪三分白，雪却输梅一段香' }] },
          ],
          keyPoints: ['三首古诗必背', '《题西林壁》哲理', '《雪梅》对比手法'],
          commonMistakes: ['"题西林壁"作者苏轼非苏辙', '"逊"读xùn'],
          exercises: [
            { id: 'cn-3-1-1', subject: 'chinese', unit: 3, lesson: 1, type: 'fill', difficulty: 1, content: '不识庐山真面目，______。', answer: '只缘身在此山中', analysis: '苏轼《题西林壁》。', knowledgePoints: ['古诗默写'] },
            { id: 'cn-3-1-2', subject: 'chinese', unit: 3, lesson: 1, type: 'fill', difficulty: 1, content: '梅须逊雪三分白，______。', answer: '雪却输梅一段香', analysis: '卢钺《雪梅》。', knowledgePoints: ['古诗默写'] },
            { id: 'cn-3-1-3', subject: 'chinese', unit: 3, lesson: 1, type: 'choice', difficulty: 2, content: '《暮江吟》作者是？', options: ['白居易', '苏轼', '卢钺', '李白'], answer: '白居易', analysis: '唐代诗人白居易。', knowledgePoints: ['文学常识'] },
            { id: 'cn-3-1-4', subject: 'chinese', unit: 3, lesson: 1, type: 'choice', difficulty: 2, content: '"不识庐山真面目"蕴含什么哲理？', options: ['珍惜时间', '当局者迷', '梅花傲雪', '热爱自然'], answer: '当局者迷', analysis: '身处山中看不清全貌。', knowledgePoints: ['古诗理解'] },
          ],
        },
      },
      {
        id: 2, title: '爬山虎的脚',
        previewContent: { guide: '爬山虎怎么爬墙？观察植物生长变化。', keyPoints: ['连续观察', '细致描写', '叶圣陶'], audioUrl: '', newWords: [{ word: '操', pinyin: 'cāo', meaning: '做', phrases: ['操场'] }, { word: '嫩', pinyin: 'nèn', meaning: '柔弱', phrases: ['嫩绿'] }] },
        reviewContent: { knowledgeMap: [{ title: '观察顺序', content: '位置→形状→颜色→怎么爬' }, { title: '动词', content: '触、巴、拉、贴' }], keyPoints: ['连续观察', '动词精准', '叶圣陶作品'], commonMistakes: ['爬山虎的脚长在茎上不是叶上'], exercises: [
          { id: 'cn-3-2-1', subject: 'chinese', unit: 3, lesson: 2, type: 'choice', difficulty: 1, content: '《爬山虎的脚》作者是？', options: ['叶圣陶', '巴金', '老舍', '冰心'], answer: '叶圣陶', analysis: '叶圣陶，现代作家教育家。', knowledgePoints: ['文学常识'] },
        ]},
      },
      {
        id: 3, title: '蟋蟀的住宅',
        previewContent: { guide: '蟋蟀"住宅"有什么特点？怎么建造？', keyPoints: ['连续观察', '拟人手法', '法布尔'], audioUrl: '', newWords: [{ word: '宅', pinyin: 'zhái', meaning: '住所', phrases: ['住宅'] }, { word: '蔽', pinyin: 'bì', meaning: '遮挡', phrases: ['隐蔽'] }] },
        reviewContent: { knowledgeMap: [{ title: '住宅特点', content: '向阳、隐蔽、干燥、有门、有平台' }, { title: '建造', content: '选址→挖掘→修整' }], keyPoints: ['拟人手法', '住宅特点', '法布尔《昆虫记》'], commonMistakes: ['法布尔是法国人'], exercises: [
          { id: 'cn-3-3-1', subject: 'chinese', unit: 3, lesson: 3, type: 'choice', difficulty: 1, content: '《蟋蟀的住宅》作者是？', options: ['法布尔', '达尔文', '居里夫人', '牛顿'], answer: '法布尔', analysis: '法布尔，法国昆虫学家。', knowledgePoints: ['文学常识'] },
        ]},
      },
    ],
  },
  {
    id: 4,
    title: '第四单元 · 神话故事',
    lessons: [
      {
        id: 1, title: '盘古开天地',
        previewContent: { guide: '盘古怎么开天辟地？身体变成了什么？', keyPoints: ['神话故事', '想象力', '献身精神'], audioUrl: '', newWords: [{ word: '劈', pinyin: 'pī', meaning: '砍', phrases: ['劈开'] }, { word: '浊', pinyin: 'zhuó', meaning: '浑浊', phrases: ['浑浊'] }] },
        reviewContent: { knowledgeMap: [{ title: '开天过程', content: '沉睡→劈开混沌→顶天立地→化身万物', children: [{ title: '化身', content: '眼→日月，四肢→四极，血液→江河' }] }], keyPoints: ['盘古献身精神', '神话想象力', '化身为万物'], commonMistakes: ['盘古用斧劈天地是神话想象'], exercises: [
          { id: 'cn-4-1-1', subject: 'chinese', unit: 4, lesson: 1, type: 'fill', difficulty: 1, content: '盘古倒下后双眼变成了______和______。', answer: ['太阳', '月亮'], analysis: '左眼变太阳右眼变月亮。', knowledgePoints: ['课文内容'] },
        ]},
      },
      {
        id: 2, title: '精卫填海',
        previewContent: { guide: '精卫是谁？为什么要填海？', keyPoints: ['文言文神话', '文言词汇', '坚韧精神'], audioUrl: '', newWords: [{ word: '帝', pinyin: 'dì', meaning: '帝王', phrases: ['炎帝'] }, { word: '溺', pinyin: 'nì', meaning: '淹没', phrases: ['溺水'] }] },
        reviewContent: { knowledgeMap: [{ title: '文言文', content: '炎帝之少女名曰女娃，游于东海溺而不返' }, { title: '精神', content: '坚韧不拔不屈不挠' }], keyPoints: ['文言文诵读', '精卫坚韧精神', '《山海经》'], commonMistakes: ['精卫是女娃溺亡后变的鸟'], exercises: [
          { id: 'cn-4-2-1', subject: 'chinese', unit: 4, lesson: 2, type: 'fill', difficulty: 2, content: '炎帝之少女，名曰______。', answer: '女娃', analysis: '出自《山海经》。', knowledgePoints: ['文言文'] },
        ]},
      },
      {
        id: 3, title: '普罗米修斯',
        previewContent: { guide: '普罗米修斯为什么盗火？受了什么惩罚？', keyPoints: ['古希腊神话', '英雄精神', '为人类造福'], audioUrl: '', newWords: [{ word: '盗', pinyin: 'dào', meaning: '偷', phrases: ['盗取'] }] },
        reviewContent: { knowledgeMap: [{ title: '情节', content: '盗火→受罚→获救' }, { title: '精神', content: '为人类造福不畏强暴' }], keyPoints: ['普罗米修斯精神', '古希腊神话', '勇敢与牺牲'], commonMistakes: ['普罗米修斯是希腊神话人物'], exercises: [] },
      },
      {
        id: 4, title: '女娲补天',
        previewContent: { guide: '女娲怎么补天？用什么材料？', keyPoints: ['中国神话', '想象力', '拯救苍生'], audioUrl: '', newWords: [{ word: '塌', pinyin: 'tā', meaning: '倒下', phrases: ['塌陷'] }, { word: '冶', pinyin: 'yě', meaning: '熔炼', phrases: ['冶炼'] }] },
        reviewContent: { knowledgeMap: [{ title: '补天过程', content: '天塌→炼五彩石→补天→斩龟足撑天' }], keyPoints: ['女娲补天', '五彩石', '中国神话'], commonMistakes: ['补天用五彩石'], exercises: [] },
      },
    ],
  },
  {
    id: 5,
    title: '第五单元 · 把事情写清楚',
    lessons: [
      { id: 1, title: '麻雀', previewContent: { guide: '老麻雀为什么敢冲向猎狗？', keyPoints: ['写清经过', '屠格涅夫', '爱的力量'], audioUrl: '', newWords: [{ word: '嗅', pinyin: 'xiù', meaning: '闻', phrases: ['嗅觉'] }] }, reviewContent: { knowledgeMap: [{ title: '起因', content: '猎狗发现小麻雀' }, { title: '经过', content: '老麻雀飞下掩护' }, { title: '结果', content: '猎狗后退' }], keyPoints: ['写清起因经过结果', '细节描写', '爱的力量'], commonMistakes: ['屠格涅夫是俄国作家'], exercises: [] },
      },
      { id: 2, title: '爬天都峰', previewContent: { guide: '爬山遇到什么困难？怎么克服？', keyPoints: ['写清经过', '心理描写', '克服困难'], audioUrl: '', newWords: [{ word: '攀', pinyin: 'pān', meaning: '向上爬', phrases: ['攀登'] }] }, reviewContent: { knowledgeMap: [{ title: '顺序', content: '爬山前→爬山中→爬上峰顶' }], keyPoints: ['按顺序写事', '对话推动', '互相激励'], commonMistakes: ['天都峰是黄山主峰之一'], exercises: [] },
      },
    ],
  },
  {
    id: 6,
    title: '第六单元 · 童年生活',
    lessons: [
      { id: 1, title: '牛和鹅', previewContent: { guide: '为什么看牛和鹅角度不同态度不同？', keyPoints: ['多角度看问题', '换位思考', '童年趣事'], audioUrl: '', newWords: [{ word: '跪', pinyin: 'guì', meaning: '屈膝', phrases: ['跪下'] }] }, reviewContent: { knowledgeMap: [{ title: '道理', content: '角度不同看法不同' }], keyPoints: ['换角度思考', '金奎叔的话'], commonMistakes: ['怕鹅因为鹅会咬人'], exercises: [] } },
      { id: 2, title: '一只窝囊的大老虎', previewContent: { guide: '为什么老虎"窝囊"？感受童年天真。', keyPoints: ['童年趣事', '人物心理', '演出经历'], audioUrl: '', newWords: [{ word: '囊', pinyin: 'náng', meaning: '口袋', phrases: ['窝囊'] }] }, reviewContent: { knowledgeMap: [{ title: '梗概', content: '扮演老虎不会豁虎跳被笑但认真完成' }], keyPoints: ['童年演出', '心理描写', '认真就好'], commonMistakes: ['"窝囊"读nang轻声'], exercises: [] } },
      { id: 3, title: '陀螺', previewContent: { guide: '陀螺怎么玩？体会到什么道理？', keyPoints: ['童年玩具', '人不可貌相', '高洪波'], audioUrl: '', newWords: [{ word: '帅', pinyin: 'shuài', meaning: '英俊', phrases: ['元帅'] }] }, reviewContent: { knowledgeMap: [{ title: '中心句', content: '人不可貌相，海水不可斗量' }], keyPoints: ['陀螺游戏', '人不可貌相', '童年乐趣'], commonMistakes: ['"人不可貌相"是俗语'], exercises: [] } },
    ],
  },
  {
    id: 7,
    title: '第七单元 · 家国情怀',
    lessons: [
      {
        id: 1, title: '古诗三首',
        previewContent: { guide: '《出塞》《凉州词》《夏日绝句》表达怎样家国情怀？', keyPoints: ['边塞诗', '家国情怀', '古诗必背'], audioUrl: '', newWords: [{ word: '塞', pinyin: 'sài', meaning: '边塞', phrases: ['出塞'] }, { word: '征', pinyin: 'zhēng', meaning: '出征', phrases: ['出征'] }] },
        reviewContent: {
          knowledgeMap: [
            { title: '《出塞》', content: '王昌龄，怀念飞将军李广', children: [{ title: '名句', content: '但使龙城飞将在，不教胡马度阴山' }] },
            { title: '《凉州词》', content: '王翰，将士出征豪迈', children: [{ title: '名句', content: '葡萄美酒夜光杯，欲饮琵琶马上催' }] },
            { title: '《夏日绝句》', content: '李清照，赞项羽宁死不屈', children: [{ title: '名句', content: '生当作人杰，死亦为鬼雄' }] },
          ],
          keyPoints: ['三首必背', '家国情怀', '边塞诗特点'],
          commonMistakes: ['《夏日绝句》作者李清照不是李白'],
          exercises: [
            { id: 'cn-7-1-1', subject: 'chinese', unit: 7, lesson: 1, type: 'fill', difficulty: 1, content: '生当作人杰，______。', answer: '死亦为鬼雄', analysis: '李清照《夏日绝句》。', knowledgePoints: ['古诗默写'] },
            { id: 'cn-7-1-2', subject: 'chinese', unit: 7, lesson: 1, type: 'fill', difficulty: 1, content: '但使龙城飞将在，______。', answer: '不教胡马度阴山', analysis: '王昌龄《出塞》。', knowledgePoints: ['古诗默写'] },
            { id: 'cn-7-1-3', subject: 'chinese', unit: 7, lesson: 1, type: 'choice', difficulty: 2, content: '《夏日绝句》赞美了谁？', options: ['刘邦', '项羽', '韩信', '张良'], answer: '项羽', analysis: '李清照赞项羽宁死不渡江。', knowledgePoints: ['古诗理解'] },
          ],
        },
      },
      { id: 2, title: '为中华之崛起而读书', previewContent: { guide: '周恩来为什么立下这个志向？', keyPoints: ['家国情怀', '立志', '周恩来'], audioUrl: '', newWords: [{ word: '崛', pinyin: 'jué', meaning: '突起', phrases: ['崛起'] }] }, reviewContent: { knowledgeMap: [{ title: '背景', content: '少年周恩来目睹中国人在租界受欺' }, { title: '志向', content: '为中华之崛起而读书' }], keyPoints: ['立志报国', '周恩来少年故事'], commonMistakes: ['"崛起"读jué不是qū'], exercises: [] } },
      { id: 3, title: '梅兰芳蓄须', previewContent: { guide: '梅兰芳为什么蓄须？体现了什么精神？', keyPoints: ['民族气节', '爱国精神', '梅兰芳'], audioUrl: '', newWords: [{ word: '蓄', pinyin: 'xù', meaning: '留存', phrases: ['蓄须'] }] }, reviewContent: { knowledgeMap: [{ title: '事件', content: '抗日战争期间梅兰芳蓄须明志拒演' }], keyPoints: ['民族气节', '爱国精神'], commonMistakes: ['梅兰芳是京剧大师'], exercises: [] } },
      { id: 4, title: '延安，我把你追寻', previewContent: { guide: '为什么要追寻延安精神？', keyPoints: ['延安精神', '诗歌', '追寻理想'], audioUrl: '', newWords: [{ word: '延', pinyin: 'yán', meaning: '延长', phrases: ['延安'] }] }, reviewContent: { knowledgeMap: [{ title: '延安精神', content: '自力更生、艰苦奋斗' }], keyPoints: ['延安精神', '诗歌形式'], commonMistakes: ['延安在陕西省'], exercises: [] } },
    ],
  },
  {
    id: 8,
    title: '第八单元 · 史书故事',
    lessons: [
      { id: 1, title: '王戎不取道旁李', previewContent: { guide: '王戎为什么不取道旁李？', keyPoints: ['文言文', '观察思考', '《世说新语》'], audioUrl: '', newWords: [{ word: '戎', pinyin: 'róng', meaning: '姓氏', phrases: ['王戎'] }] }, reviewContent: { knowledgeMap: [{ title: '故事', content: '道旁李树多子折枝，诸儿竞取，唯戎不动，答曰"树在道边而多子，此必苦李"' }, { title: '道理', content: '善于观察思考' }], keyPoints: ['文言文理解', '观察思考', '《世说新语》'], commonMistakes: ['王戎是"竹林七贤"之一'], exercises: [
        { id: 'cn-8-1-1', subject: 'chinese', unit: 8, lesson: 1, type: 'choice', difficulty: 2, content: '王戎认为道旁李子是苦的原因是？', options: ['李子还没熟', '树在道边多子必苦李', '李子有毒', '别人摘过了'], answer: '树在道边多子必苦李', analysis: '王戎推理：如果在路边且果多没人摘，一定是苦的。', knowledgePoints: ['课文内容'] },
      ]} },
      { id: 2, title: '西门豹治邺', previewContent: { guide: '西门豹怎么惩治巫婆官绅的？', keyPoints: ['历史故事', '破除迷信', '智慧'], audioUrl: '', newWords: [{ word: '豹', pinyin: 'bào', meaning: '动物', phrases: ['西门豹'] }] }, reviewContent: { knowledgeMap: [{ title: '事件', content: '将巫婆投入河中惩治，破除河伯娶妇迷信' }, { title: '人物', content: '西门豹智慧果敢' }], keyPoints: ['破除迷信', '智慧勇敢', '历史故事'], commonMistakes: ['西门豹是战国时期人物'], exercises: [] },
      },
      { id: 3, title: '故事二则', previewContent: { guide: '《扁鹊治病》《纪昌学射》讲了什么道理？', keyPoints: ['寓言故事', '防微杜渐', '坚持不懈'], audioUrl: '', newWords: [{ word: '鹊', pinyin: 'què', meaning: '鸟', phrases: ['扁鹊'] }] }, reviewContent: { knowledgeMap: [{ title: '《扁鹊治病》', content: '蔡桓公讳疾忌医，小病变大病' }, { title: '《纪昌学射》', content: '纪昌苦练眼力终成射手' }], keyPoints: ['防微杜渐', '坚持不懈', '寓言道理'], commonMistakes: ['扁鹊是古代名医'], exercises: [] } },
    ],
  },
]
