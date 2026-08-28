import type { Question } from '@/types'

// 语文补充练习题
export const chineseExtraExercises: Question[] = [
  // === 第一单元 ===
  { id: 'cn-1-1-5', subject: 'chinese', unit: 1, lesson: 1, type: 'fill', difficulty: 1, content: '浪潮越来越近，犹如______齐头并进。', answer: '千万匹白色战马', analysis: '比喻句，将浪潮比作战马。', knowledgePoints: ['课文背诵', '比喻'] },
  { id: 'cn-1-1-6', subject: 'chinese', unit: 1, lesson: 1, type: 'choice', difficulty: 1, content: '"人声鼎沸"的意思是？', options: ['水沸腾了', '人声喧闹像水在锅里沸腾', '很多人在煮饭', '声音很小'], answer: '人声喧闹像水在锅里沸腾', analysis: '鼎沸本意即锅水沸腾。', knowledgePoints: ['词语理解'] },
  { id: 'cn-1-1-7', subject: 'chinese', unit: 1, lesson: 1, type: 'judge', difficulty: 1, content: '"浩浩荡荡"形容水势广阔壮大。', options: ['正确', '错误'], answer: '正确', analysis: '浩浩荡荡形容水势大或气势大。', knowledgePoints: ['词语理解'] },
  { id: 'cn-1-2-2', subject: 'chinese', unit: 1, lesson: 2, type: 'fill', difficulty: 1, content: '《走月亮》中"我"和______一起走月亮。', answer: '阿妈', analysis: '课文写"我"和阿妈月下散步。', knowledgePoints: ['课文内容'] },
  { id: 'cn-1-2-3', subject: 'chinese', unit: 1, lesson: 2, type: 'choice', difficulty: 2, content: '《走月亮》运用了什么描写方法？', options: ['只写视觉', '多感官描写', '只写听觉', '只写心理'], answer: '多感官描写', analysis: '视觉听觉嗅觉多感官描写。', knowledgePoints: ['写作手法'] },
  { id: 'cn-1-3-2', subject: 'chinese', unit: 1, lesson: 3, type: 'choice', difficulty: 1, content: '《秋晚的江上》描写的画面有？', options: ['归鸟和夕阳', '春雨和燕子', '冬雪和梅花', '秋风和落叶'], answer: '归鸟和夕阳', analysis: '诗中写归鸟斜阳。', knowledgePoints: ['诗歌内容'] },
  { id: 'cn-1-4-2', subject: 'chinese', unit: 1, lesson: 4, type: 'fill', difficulty: 1, content: '《繁星》作者巴金，三次看星空分别在从前、______和如今。', answer: '三年前', analysis: '从前庭院、三年前南京、如今海上。', knowledgePoints: ['课文内容'] },

  // === 第二单元 ===
  { id: 'cn-2-1-2', subject: 'chinese', unit: 2, lesson: 1, type: 'choice', difficulty: 2, content: '五粒豆中哪粒最有价值？', options: ['飞向世界的', '落水沟的', '给女孩希望的', '被鸽子吃的'], answer: '给女孩希望的', analysis: '给生病女孩带来希望的豌豆最有价值。', knowledgePoints: ['课文理解'] },
  { id: 'cn-2-2-3', subject: 'chinese', unit: 2, lesson: 2, type: 'fill', difficulty: 1, content: '蝙蝠探路靠______和______配合。', answer: ['嘴', '耳朵'], analysis: '嘴发超声波，耳朵接收回声。', knowledgePoints: ['课文内容'] },
  { id: 'cn-2-2-4', subject: 'chinese', unit: 2, lesson: 2, type: 'choice', difficulty: 2, content: '雷达的天线相当于蝙蝠的什么？', options: ['眼睛', '嘴', '耳朵', '翅膀'], answer: '嘴', analysis: '雷达天线发射电波相当于蝙蝠嘴发超声波。', knowledgePoints: ['仿生学'] },
  { id: 'cn-2-3-2', subject: 'chinese', unit: 2, lesson: 3, type: 'choice', difficulty: 2, content: '"忽如一夜春风来"出自谁的诗？', options: ['李白', '岑参', '杜甫', '白居易'], answer: '岑参', analysis: '引自岑参《白雪歌送武判官归京》。', knowledgePoints: ['文学常识'] },

  // === 第三单元 ===
  { id: 'cn-3-1-5', subject: 'chinese', unit: 3, lesson: 1, type: 'fill', difficulty: 1, content: '一道残阳铺水中，______。', answer: '半江瑟瑟半江红', analysis: '白居易《暮江吟》。', knowledgePoints: ['古诗默写'] },
  { id: 'cn-3-1-6', subject: 'chinese', unit: 3, lesson: 1, type: 'fill', difficulty: 1, content: '横看成岭侧成峰，______。', answer: '远近高低各不同', analysis: '苏轼《题西林壁》。', knowledgePoints: ['古诗默写'] },
  { id: 'cn-3-1-7', subject: 'chinese', unit: 3, lesson: 1, type: 'choice', difficulty: 2, content: '"梅须逊雪三分白"用了什么手法？', options: ['拟人', '对比', '夸张', '排比'], answer: '对比', analysis: '梅雪对比各有长短。', knowledgePoints: ['修辞手法'] },
  { id: 'cn-3-2-2', subject: 'chinese', unit: 3, lesson: 2, type: 'choice', difficulty: 2, content: '爬山虎的脚长在什么地方？', options: ['叶子上', '茎上', '根部', '花上'], answer: '茎上', analysis: '爬山虎的脚长在茎上。', knowledgePoints: ['课文内容'] },
  { id: 'cn-3-2-3', subject: 'chinese', unit: 3, lesson: 2, type: 'fill', difficulty: 1, content: '爬山虎的脚触着墙的时候，六七根细丝的头上就变成小圆片，______。', answer: '巴住墙', analysis: '动词"巴"准确描写。', knowledgePoints: ['课文背诵'] },
  { id: 'cn-3-3-2', subject: 'chinese', unit: 3, lesson: 3, type: 'choice', difficulty: 2, content: '蟋蟀住宅的特点不包括？', options: ['向阳', '潮湿', '隐蔽', '干燥'], answer: '潮湿', analysis: '蟋蟀选择干燥向阳的地方。', knowledgePoints: ['课文内容'] },
  { id: 'cn-3-3-3', subject: 'chinese', unit: 3, lesson: 3, type: 'judge', difficulty: 1, content: '《蟋蟀的住宅》用了拟人手法。', options: ['正确', '错误'], answer: '正确', analysis: '把蟋蟀的窝称为"住宅"是拟人。', knowledgePoints: ['修辞手法'] },

  // === 第四单元 ===
  { id: 'cn-4-1-2', subject: 'chinese', unit: 4, lesson: 1, type: 'fill', difficulty: 1, content: '盘古倒下后，他的血液变成了______。', answer: '江河', analysis: '血液变江河。', knowledgePoints: ['课文内容'] },
  { id: 'cn-4-1-3', subject: 'chinese', unit: 4, lesson: 1, type: 'choice', difficulty: 2, content: '盘古开天地体现的精神是？', options: ['自私自利', '献身精神', '贪婪', '懒惰'], answer: '献身精神', analysis: '盘古化身为万物是献身精神。', knowledgePoints: ['文章主旨'] },
  { id: 'cn-4-2-2', subject: 'chinese', unit: 4, lesson: 2, type: 'choice', difficulty: 2, content: '精卫填海选自哪本书？', options: ['《山海经》', '《搜神记》', '《西游记》', '《聊斋》'], answer: '《山海经》', analysis: '出自《山海经·北山经》。', knowledgePoints: ['文学常识'] },
  { id: 'cn-4-2-3', subject: 'chinese', unit: 4, lesson: 2, type: 'judge', difficulty: 1, content: '精卫是女娃溺亡后变的鸟。', options: ['正确', '错误'], answer: '正确', analysis: '女娃溺水后化为精卫鸟。', knowledgePoints: ['课文内容'] },
  { id: 'cn-4-3-1', subject: 'chinese', unit: 4, lesson: 3, type: 'choice', difficulty: 2, content: '普罗米修斯盗火是为了？', options: ['自己取暖', '为人类造福', '反抗宙斯', '炫耀本领'], answer: '为人类造福', analysis: '为人类盗火受罚是英雄行为。', knowledgePoints: ['文章主旨'] },
  { id: 'cn-4-4-1', subject: 'chinese', unit: 4, lesson: 4, type: 'fill', difficulty: 1, content: '女娲用______来补天。', answer: '五彩石', analysis: '女娲炼五彩石补天。', knowledgePoints: ['课文内容'] },

  // === 第五单元 ===
  { id: 'cn-5-1-1', subject: 'chinese', unit: 5, lesson: 1, type: 'choice', difficulty: 1, content: '《麻雀》作者是？', options: ['屠格涅夫', '托尔斯泰', '契诃夫', '普希金'], answer: '屠格涅夫', analysis: '屠格涅夫，俄国作家。', knowledgePoints: ['文学常识'] },
  { id: 'cn-5-1-2', subject: 'chinese', unit: 5, lesson: 1, type: 'choice', difficulty: 2, content: '老麻雀冲向猎狗是因为？', options: ['害怕', '保护小麻雀', '找食物', '迷路了'], answer: '保护小麻雀', analysis: '母爱/父爱的力量使老麻雀奋不顾身。', knowledgePoints: ['文章主旨'] },
  { id: 'cn-5-2-1', subject: 'chinese', unit: 5, lesson: 2, type: 'choice', difficulty: 1, content: '《爬天都峰》告诉我们什么道理？', options: ['山太高不能爬', '互相激励就能克服困难', '一个人爬山最好', '爬山浪费时间'], answer: '互相激励就能克服困难', analysis: '老爷爷和"我"互相鼓励爬上峰顶。', knowledgePoints: ['文章主旨'] },
  { id: 'cn-5-2-2', subject: 'chinese', unit: 5, lesson: 2, type: 'fill', difficulty: 1, content: '天都峰在______。', answer: '黄山', analysis: '天都峰是黄山主峰之一。', knowledgePoints: ['常识'] },

  // === 第六单元 ===
  { id: 'cn-6-1-1', subject: 'chinese', unit: 6, lesson: 1, type: 'choice', difficulty: 2, content: '《牛和鹅》告诉我们什么道理？', options: ['牛比鹅好', '角度不同看法不同', '鹅很凶', '要怕鹅'], answer: '角度不同看法不同', analysis: '金奎叔的话启示换角度思考。', knowledgePoints: ['文章主旨'] },
  { id: 'cn-6-3-1', subject: 'chinese', unit: 6, lesson: 3, type: 'fill', difficulty: 1, content: '人不可貌相，______。', answer: '海水不可斗量', analysis: '《陀螺》中心句，俗语。', knowledgePoints: ['课文背诵'] },
  { id: 'cn-6-3-2', subject: 'chinese', unit: 6, lesson: 3, type: 'choice', difficulty: 1, content: '《陀螺》作者是？', options: ['高洪波', '冰心', '老舍', '巴金'], answer: '高洪波', analysis: '高洪波，儿童文学作家。', knowledgePoints: ['文学常识'] },

  // === 第七单元 ===
  { id: 'cn-7-1-4', subject: 'chinese', unit: 7, lesson: 1, type: 'fill', difficulty: 1, content: '葡萄美酒夜光杯，______。', answer: '欲饮琵琶马上催', analysis: '王翰《凉州词》。', knowledgePoints: ['古诗默写'] },
  { id: 'cn-7-1-5', subject: 'chinese', unit: 7, lesson: 1, type: 'choice', difficulty: 2, content: '"但使龙城飞将在"中的"飞将军"指？', options: ['霍去病', '李广', '卫青', '岳飞'], answer: '李广', analysis: '飞将军指汉代名将李广。', knowledgePoints: ['古诗理解'] },
  { id: 'cn-7-1-6', subject: 'chinese', unit: 7, lesson: 1, type: 'choice', difficulty: 2, content: '《出塞》《凉州词》《夏日绝句》的共同主题是？', options: ['思乡', '家国情怀', '田园', '送别'], answer: '家国情怀', analysis: '三首诗都体现爱国情怀。', knowledgePoints: ['诗歌主题'] },
  { id: 'cn-7-2-1', subject: 'chinese', unit: 7, lesson: 2, type: 'fill', difficulty: 1, content: '为______而读书。', answer: '中华之崛起', analysis: '周恩来少年立志。', knowledgePoints: ['课文内容'] },
  { id: 'cn-7-2-2', subject: 'chinese', unit: 7, lesson: 2, type: 'choice', difficulty: 2, content: '周恩来立下志向的原因是？', options: ['考试成绩好', '目睹中国人受欺', '老师要求', '父亲命令'], answer: '目睹中国人受欺', analysis: '在租界看到中国人被欺负而立志。', knowledgePoints: ['课文内容'] },
  { id: 'cn-7-3-1', subject: 'chinese', unit: 7, lesson: 3, type: 'choice', difficulty: 2, content: '梅兰芳蓄须的原因是？', options: ['生病了', '拒演明志', '赶时髦', '怕冷'], answer: '拒演明志', analysis: '抗日战争期间蓄须拒演体现民族气节。', knowledgePoints: ['课文内容'] },
  { id: 'cn-7-4-1', subject: 'chinese', unit: 7, lesson: 4, type: 'fill', difficulty: 1, content: '延安精神的核心是______和艰苦奋斗。', answer: '自力更生', analysis: '延安精神：自力更生、艰苦奋斗。', knowledgePoints: ['课文内容'] },

  // === 第八单元 ===
  { id: 'cn-8-1-2', subject: 'chinese', unit: 8, lesson: 1, type: 'choice', difficulty: 2, content: '《王戎不取道旁李》选自？', options: ['《论语》', '《世说新语》', '《史记》', '《左传》'], answer: '《世说新语》', analysis: '南朝刘义庆编《世说新语》。', knowledgePoints: ['文学常识'] },
  { id: 'cn-8-1-3', subject: 'chinese', unit: 8, lesson: 1, type: 'fill', difficulty: 2, content: '诸儿竞走取之，唯______不动。', answer: '戎', analysis: '只有王戎不动。', knowledgePoints: ['文言文'] },
  { id: 'cn-8-2-1', subject: 'chinese', unit: 8, lesson: 2, type: 'choice', difficulty: 2, content: '西门豹治邺用什么方法惩治巫婆？', options: ['打骂', '投河', '罚款', '驱赶'], answer: '投河', analysis: '以"请"河伯为名投巫婆入河。', knowledgePoints: ['课文内容'] },
  { id: 'cn-8-2-2', subject: 'chinese', unit: 8, lesson: 2, type: 'judge', difficulty: 1, content: '西门豹治邺是历史故事不是神话。', options: ['正确', '错误'], answer: '正确', analysis: '西门豹是战国时期人物。', knowledgePoints: ['文学常识'] },
  { id: 'cn-8-3-1', subject: 'chinese', unit: 8, lesson: 3, type: 'choice', difficulty: 2, content: '《扁鹊治病》告诉什么道理？', options: ['要听医生话', '防微杜渐', '不要看病', '生病正常'], answer: '防微杜渐', analysis: '蔡桓公讳疾忌医致小病变大病。', knowledgePoints: ['寓言道理'] },
  { id: 'cn-8-3-2', subject: 'chinese', unit: 8, lesson: 3, type: 'choice', difficulty: 2, content: '《纪昌学射》告诉什么道理？', options: ['射箭容易', '坚持不懈才能成功', '天赋最重要', '不要学射箭'], answer: '坚持不懈才能成功', analysis: '纪昌苦练眼力终成射手。', knowledgePoints: ['寓言道理'] },

  // === 修辞手法专项 ===
  { id: 'cn-rx-1', subject: 'chinese', unit: 0, type: 'choice', difficulty: 2, content: '"飞流直下三千尺"用了什么修辞？', options: ['比喻', '夸张', '拟人', '排比'], answer: '夸张', analysis: '"三千尺"是夸张。', knowledgePoints: ['修辞手法'] },
  { id: 'cn-rx-2', subject: 'chinese', unit: 0, type: 'choice', difficulty: 2, content: '"月亮像一个大玉盘"用了什么修辞？', options: ['比喻', '拟人', '夸张', '排比'], answer: '比喻', analysis: '把月亮比作玉盘。', knowledgePoints: ['修辞手法'] },
  { id: 'cn-rx-3', subject: 'chinese', unit: 0, type: 'choice', difficulty: 2, content: '"小草在微风中点头微笑"用了什么修辞？', options: ['比喻', '拟人', '夸张', '反问'], answer: '拟人', analysis: '把小草当人来写。', knowledgePoints: ['修辞手法'] },
  { id: 'cn-rx-4', subject: 'chinese', unit: 0, type: 'fill', difficulty: 2, content: '"葡萄美酒夜光杯"中"夜光杯"是指______。', answer: '能发光的玉杯', analysis: '夜光杯是一种美玉制成的杯子的美称。', knowledgePoints: ['词语理解'] },

  // === 成语专项 ===
  { id: 'cn-cy-1', subject: 'chinese', unit: 0, type: 'choice', difficulty: 2, content: '"拔苗助长"告诉我们什么道理？', options: ['做事要快', '不能急于求成', '种田辛苦', '苗长得慢'], answer: '不能急于求成', analysis: '违背规律反而坏事。', knowledgePoints: ['成语理解'] },
  { id: 'cn-cy-2', subject: 'chinese', unit: 0, type: 'choice', difficulty: 2, content: '下列哪个成语形容人声喧闹？', options: ['鸦雀无声', '人声鼎沸', '寂静无声', '万籁俱寂'], answer: '人声鼎沸', analysis: '鼎沸形容喧闹。', knowledgePoints: ['成语'] },
  { id: 'cn-cy-3', subject: 'chinese', unit: 0, type: 'fill', difficulty: 2, content: '形容非常安静，一点声音也没有的成语是______。', answer: '鸦雀无声', analysis: '鸦雀无声形容非常安静。', knowledgePoints: ['成语'] },
]
