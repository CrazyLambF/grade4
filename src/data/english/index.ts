import type { SubjectConfig, UnitItem } from '@/types'
import { englishExtraExercises } from './extraExercises'

export { englishExtraExercises }

const units: UnitItem[] = [
  {
    id: 1,
    title: 'Unit 1 · Helping at home',
    lessons: [
      {
        id: 1, title: 'Helping at home',
        previewContent: { guide: 'What does your family do? How can you help at home? Learn jobs and chores!', keyPoints: ['jobs vocabulary', "What's ...'s job?", 'can/can\'t for ability', 'chore words'], audioUrl: '', words: [
          { word: 'job', phonetic: '/dʒɒb/', meaning: '工作；职业' },
          { word: 'doctor', phonetic: '/ˈdɒktə/', meaning: '医生' },
          { word: 'nurse', phonetic: '/nɜːs/', meaning: '护士' },
          { word: 'farmer', phonetic: '/ˈfɑːmə/', meaning: '农民' },
          { word: 'worker', phonetic: '/ˈwɜːkə/', meaning: '工人' },
          { word: 'busy', phonetic: '/ˈbɪzi/', meaning: '忙碌的' },
          { word: 'tired', phonetic: '/ˈtaɪəd/', meaning: '疲倦的' },
          { word: 'cook', phonetic: '/kʊk/', meaning: '烹饪；厨师' },
          { word: 'clean', phonetic: '/kliːn/', meaning: '打扫；干净的' },
          { word: 'sweep', phonetic: '/swiːp/', meaning: '扫' },
          { word: 'floor', phonetic: '/flɔː/', meaning: '地板；地面' },
          { word: 'helpful', phonetic: '/ˈhelpfəl/', meaning: '有帮助的；有用的' },
        ]},
        reviewContent: { knowledgeMap: [
          { title: '询问职业', content: "What's your father's job? He's a doctor. / What's your mother's job? She's a nurse." },
          { title: '谈论能力', content: "Can you help? Yes, I can. I can clean my room. / Can she help? Yes, she can. She can do some chores.", children: [
            { title: 'can句型', content: 'can + 动词原形，无人称变化。否定：can\'t' },
          ]},
          { title: '做家务', content: 'Mum and Dad are busy and tired. What can we do for them? We can do some chores.' },
        ], keyPoints: ['职业词汇', "What's ...'s job?", 'can/can\'t句型', 'do some chores / sweep the floor / clean the room / look after'], commonMistakes: ['can后面接动词原形', 'office worker前用an不用a', 'Is this your father? 回答用Yes, it is. 不用he'], exercises: [
          { id: 'en-1-1-1', subject: 'english', unit: 1, lesson: 1, type: 'choice', difficulty: 1, content: 'What does "nurse" mean?', options: ['医生', '护士', '农民', '工人'], answer: '护士', analysis: 'nurse = 护士', knowledgePoints: ['vocabulary'] },
          { id: 'en-1-1-2', subject: 'english', unit: 1, lesson: 1, type: 'choice', difficulty: 1, content: "—What's your father's job? —______ a factory worker.", options: ['He', 'She', 'He\'s', 'She\'s'], answer: "He's", analysis: '用He\'s = He is，男性用he。', knowledgePoints: ['grammar'] },
          { id: 'en-1-1-3', subject: 'english', unit: 1, lesson: 1, type: 'fill', difficulty: 1, content: 'I can ______(打扫) my room.', answer: 'clean', analysis: 'clean = 打扫', knowledgePoints: ['vocabulary'] },
          { id: 'en-1-1-4', subject: 'english', unit: 1, lesson: 1, type: 'choice', difficulty: 2, content: '—Can you sweep the floor? —Yes, I ______.', options: ['do', 'can', 'am', 'is'], answer: 'can', analysis: 'can问can答。', knowledgePoints: ['grammar'] },
        ]},
      },
    ],
  },
  {
    id: 2,
    title: 'Unit 2 · My friends',
    lessons: [
      {
        id: 1, title: 'My friends',
        previewContent: { guide: 'Who is your best friend? What does he/she look like? Learn to describe friends!', keyPoints: ['appearance words', "What's ...'s name?", 'Who is your best friend?', 'often + verb'], audioUrl: '', words: [
          { word: 'friend', phonetic: '/frend/', meaning: '朋友' },
          { word: 'best friend', phonetic: '/best frend/', meaning: '最好的朋友' },
          { word: 'tall', phonetic: '/tɔːl/', meaning: '高的' },
          { word: 'strong', phonetic: '/strɒŋ/', meaning: '强壮的' },
          { word: 'thin', phonetic: '/θɪn/', meaning: '瘦的' },
          { word: 'funny', phonetic: '/ˈfʌni/', meaning: '有趣的' },
          { word: 'short hair', phonetic: '/ʃɔːt heə/', meaning: '短发' },
          { word: 'long hair', phonetic: '/lɒŋ heə/', meaning: '长发' },
          { word: 'always', phonetic: '/ˈɔːlweɪz/', meaning: '总是' },
          { word: 'both', phonetic: '/bəʊθ/', meaning: '两者都' },
        ]},
        reviewContent: { knowledgeMap: [
          { title: '询问朋友名字', content: "What's your friend's name? His/Her name is ..." },
          { title: '询问最好的朋友', content: "Who is your best friend? Chen Jie. She's funny. She often makes me smile." },
          { title: '描述外貌', content: 'He is tall and strong. / She has long hair and big eyes.', children: [
            { title: 'is vs has', content: 'is + 形容词(tall/strong/thin)，has + 名词(hair/eyes)' },
          ]},
          { title: '经常做某事', content: 'He often helps me with English. / She often makes me smile.' },
        ], keyPoints: ['外貌描述词汇', "What's ...'s name? / Who's your best friend?", 'is + 形容词 / has + 名词', 'often + 动词'], commonMistakes: ['is + 形容词，has + 名词', 'often后接动词原形或第三人称单数'], exercises: [
          { id: 'en-2-1-1', subject: 'english', unit: 2, lesson: 1, type: 'choice', difficulty: 1, content: 'What does "funny" mean?', options: ['瘦的', '有趣的', '高的', '强壮的'], answer: '有趣的', analysis: 'funny = 有趣的', knowledgePoints: ['vocabulary'] },
          { id: 'en-2-1-2', subject: 'english', unit: 2, lesson: 1, type: 'choice', difficulty: 2, content: 'She ___ long hair and big eyes.', options: ['is', 'has', 'are', 'have'], answer: 'has', analysis: 'has + 名词(头发/眼睛)。', knowledgePoints: ['grammar'] },
          { id: 'en-2-1-3', subject: 'english', unit: 2, lesson: 1, type: 'fill', difficulty: 1, content: "______ is your best friend? —Tom. He's tall and strong.", answer: 'Who', analysis: 'Who询问是谁。', knowledgePoints: ['grammar'] },
        ]},
      },
    ],
  },
  {
    id: 3,
    title: 'Unit 3 · Places we live in',
    lessons: [
      {
        id: 1, title: 'Places we live in',
        previewContent: { guide: 'What places are in your community? Learn community places and activities!', keyPoints: ['community places', 'There is/are ...', 'I often play there', 'favourite place'], audioUrl: '', words: [
          { word: 'playground', phonetic: '/ˈpleɪɡraʊnd/', meaning: '游乐场；操场' },
          { word: 'park', phonetic: '/pɑːk/', meaning: '公园' },
          { word: 'hospital', phonetic: '/ˈhɒspɪtl/', meaning: '医院' },
          { word: 'shop', phonetic: '/ʃɒp/', meaning: '商店' },
          { word: 'toilet', phonetic: '/ˈtɔɪlət/', meaning: '厕所；卫生间' },
          { word: 'bus stop', phonetic: '/bʌs stɒp/', meaning: '公交车站' },
          { word: 'library', phonetic: '/ˈlaɪbrəri/', meaning: '图书馆' },
          { word: 'place', phonetic: '/pleɪs/', meaning: '地方；场所' },
          { word: 'there', phonetic: '/ðeə/', meaning: '（表示存在或发生）' },
          { word: 'favourite', phonetic: '/ˈfeɪvərɪt/', meaning: '最喜欢的' },
          { word: 'walk', phonetic: '/wɔːk/', meaning: '散步；行走' },
          { word: 'buy', phonetic: '/baɪ/', meaning: '购买' },
        ]},
        reviewContent: { knowledgeMap: [
          { title: 'There be句型', content: 'There is a playground. / There are many people. / There is a Taiji club too.', children: [
            { title: 'is vs are', content: '单数用is，复数用are' },
          ]},
          { title: '社区活动', content: 'I often play there with my friends. / go shopping / take a walk / do sports / see a doctor' },
          { title: '最喜欢的地点', content: 'My favourite place in my community is the museum.' },
        ], keyPoints: ['社区场所词汇', 'There is/are句型', '描述社区活动', 'My favourite place is...'], commonMistakes: ['There is + 单数，There are + 复数', 'over there = 在那边'], exercises: [
          { id: 'en-3-1-1', subject: 'english', unit: 3, lesson: 1, type: 'choice', difficulty: 1, content: 'What does "library" mean?', options: ['医院', '图书馆', '商店', '公园'], answer: '图书馆', analysis: 'library = 图书馆', knowledgePoints: ['vocabulary'] },
          { id: 'en-3-1-2', subject: 'english', unit: 3, lesson: 1, type: 'fill', difficulty: 1, content: '______ is a park in our community.', answer: 'There', analysis: 'There is + 单数名词表示"有"。', knowledgePoints: ['grammar'] },
          { id: 'en-3-1-3', subject: 'english', unit: 3, lesson: 1, type: 'choice', difficulty: 2, content: 'There ______ many people in the park.', options: ['is', 'are', 'am', 'be'], answer: 'are', analysis: 'many people是复数，用are。', knowledgePoints: ['grammar'] },
        ]},
      },
    ],
  },
  {
    id: 4,
    title: 'Unit 4 · Helping in the community',
    lessons: [
      {
        id: 1, title: 'Helping in the community',
        previewContent: { guide: 'How do people help the community? Learn about community helpers!', keyPoints: ['community helpers', 'What do people do to help?', 'He/She often helps...', 'make the bed'], audioUrl: '', words: [
          { word: 'firefighter', phonetic: '/ˈfaɪəfaɪtə/', meaning: '消防队员' },
          { word: 'police officer', phonetic: '/pəˈliːs ˈɒfɪsə/', meaning: '警察；警员' },
          { word: 'driver', phonetic: '/ˈdraɪvə/', meaning: '司机' },
          { word: 'cleaner', phonetic: '/ˈkliːnə/', meaning: '清洁工' },
          { word: 'cook', phonetic: '/kʊk/', meaning: '厨师' },
          { word: 'delivery worker', phonetic: '/dɪˈlɪvəri ˈwɜːkə/', meaning: '快递员' },
          { word: 'volunteer', phonetic: '/ˌvɒlənˈtɪə/', meaning: '志愿者' },
          { word: 'everyone', phonetic: '/ˈevriwʌn/', meaning: '每人' },
          { word: 'make the bed', phonetic: '/meɪk ðə bed/', meaning: '铺床' },
          { word: 'tell', phonetic: '/tel/', meaning: '讲述；告诉' },
          { word: 'old', phonetic: '/əʊld/', meaning: '过去的；年纪大的；老的' },
          { word: 'why', phonetic: '/waɪ/', meaning: '为什么' },
        ]},
        reviewContent: { knowledgeMap: [
          { title: '社区帮助者', content: 'firefighter / police officer / driver / cleaner / cook / delivery worker / volunteer' },
          { title: '帮助社区', content: 'What do people do to help the community? He often helps people.' },
          { title: '日常帮助', content: 'make the bed / take photos / tell funny stories / draw a picture / help others / cross the road' },
        ], keyPoints: ['社区职业词汇', 'He/She often helps...', 'make the bed / help others'], commonMistakes: ['everyone后接单数动词', 'police officer前用a'], exercises: [
          { id: 'en-4-1-1', subject: 'english', unit: 4, lesson: 1, type: 'choice', difficulty: 1, content: 'What does "firefighter" mean?', options: ['司机', '消防队员', '清洁工', '厨师'], answer: '消防队员', analysis: 'firefighter = 消防队员', knowledgePoints: ['vocabulary'] },
          { id: 'en-4-1-2', subject: 'english', unit: 4, lesson: 1, type: 'fill', difficulty: 1, content: 'A ______(志愿者) helps the community.', answer: 'volunteer', analysis: 'volunteer = 志愿者', knowledgePoints: ['vocabulary'] },
          { id: 'en-4-1-3', subject: 'english', unit: 4, lesson: 1, type: 'choice', difficulty: 2, content: 'Everyone ______ help others.', options: ['can', 'are', 'is', 'do'], answer: 'can', analysis: 'everyone后用单数，can无人称变化。', knowledgePoints: ['grammar'] },
        ]},
      },
    ],
  },
  {
    id: 5,
    title: 'Unit 5 · The weather and us',
    lessons: [
      {
        id: 1, title: 'The weather and us',
        previewContent: { guide: 'How is the weather today? What do you do on sunny days? Learn weather words!', keyPoints: ['weather words', "How's the weather?", "It's sunny/windy/cloudy", 'What do you do on... days?'], audioUrl: '', words: [
          { word: 'weather', phonetic: '/ˈweðə/', meaning: '天气' },
          { word: 'sunny', phonetic: '/ˈsʌni/', meaning: '阳光充足的；晴朗的' },
          { word: 'hot', phonetic: '/hɒt/', meaning: '热的' },
          { word: 'cold', phonetic: '/kəʊld/', meaning: '冷的' },
          { word: 'windy', phonetic: '/ˈwɪndi/', meaning: '多风的' },
          { word: 'cloudy', phonetic: '/ˈklaʊdi/', meaning: '多云的' },
          { word: 'rainy', phonetic: '/ˈreɪni/', meaning: '阴雨的' },
          { word: 'snowy', phonetic: '/ˈsnəʊi/', meaning: '多雪的' },
          { word: 'warm', phonetic: '/wɔːm/', meaning: '温暖的' },
          { word: 'cool', phonetic: '/kuːl/', meaning: '凉爽的' },
          { word: 'rain', phonetic: '/reɪn/', meaning: '下雨；雨' },
          { word: 'tomorrow', phonetic: '/təˈmɒrəʊ/', meaning: '在明天' },
          { word: 'kite', phonetic: '/kaɪt/', meaning: '风筝' },
          { word: 'snowman', phonetic: '/ˈsnəʊmæn/', meaning: '雪人' },
        ]},
        reviewContent: { knowledgeMap: [
          { title: '天气表达', content: "How's the weather today? It's sunny. / It's windy and cold." },
          { title: '天气活动', content: 'What do you do on sunny days? I go swimming. / I fly a kite. / I make a snowman.' },
          { title: '明天天气', content: "It will be rainy tomorrow. Take an umbrella!" },
        ], keyPoints: ['天气词汇', "How's the weather? It's...", '天气活动搭配', 'fly a kite / make a snowman / go swimming'], commonMistakes: ['天气用It\'s + 形容词', 'snowman复数是snowmen'], exercises: [
          { id: 'en-5-1-1', subject: 'english', unit: 5, lesson: 1, type: 'choice', difficulty: 1, content: 'What does "windy" mean?', options: ['晴朗的', '多风的', '多云的', '下雨的'], answer: '多风的', analysis: 'windy = 多风的', knowledgePoints: ['vocabulary'] },
          { id: 'en-5-1-2', subject: 'english', unit: 5, lesson: 1, type: 'fill', difficulty: 1, content: "How's the weather? It's ______(晴朗的).", answer: 'sunny', analysis: 'sunny = 晴朗的', knowledgePoints: ['vocabulary'] },
          { id: 'en-5-1-3', subject: 'english', unit: 5, lesson: 1, type: 'choice', difficulty: 2, content: 'I can fly a kite on ______ days.', options: ['rainy', 'windy', 'snowy', 'hot'], answer: 'windy', analysis: '放风筝需要有风的天。', knowledgePoints: ['comprehension'] },
        ]},
      },
    ],
  },
  {
    id: 6,
    title: 'Unit 6 · Changing for the seasons',
    lessons: [
      {
        id: 1, title: 'Changing for the seasons',
        previewContent: { guide: 'What do you wear in different seasons? Which season do you like? Learn seasons and clothes!', keyPoints: ['season words', 'clothes words', 'Which season do you like?', 'Whose... is this?'], audioUrl: '', words: [
          { word: 'season', phonetic: '/ˈsiːzn/', meaning: '季节' },
          { word: 'spring', phonetic: '/sprɪŋ/', meaning: '春天' },
          { word: 'summer', phonetic: '/ˈsʌmə/', meaning: '夏天' },
          { word: 'autumn', phonetic: '/ˈɔːtəm/', meaning: '秋天' },
          { word: 'winter', phonetic: '/ˈwɪntə/', meaning: '冬天' },
          { word: 'sweater', phonetic: '/ˈswetə/', meaning: '毛衣' },
          { word: 'coat', phonetic: '/kəʊt/', meaning: '大衣；外套' },
          { word: 'shirt', phonetic: '/ʃɜːt/', meaning: '衬衫' },
          { word: 'dress', phonetic: '/dres/', meaning: '连衣裙' },
          { word: 'sock', phonetic: '/sɒk/', meaning: '短袜' },
          { word: 'whose', phonetic: '/huːz/', meaning: '谁的' },
          { word: 'mine', phonetic: '/maɪn/', meaning: '我的' },
          { word: 'wear', phonetic: '/weə/', meaning: '穿；戴' },
          { word: 'which', phonetic: '/wɪtʃ/', meaning: '哪一个' },
          { word: 'snow', phonetic: '/snəʊ/', meaning: '下雪；雪' },
        ]},
        reviewContent: { knowledgeMap: [
          { title: '询问物品主人', content: "Whose sweater is this? It's your dad's. / Whose socks are these? They're mine." },
          { title: '询问季节偏好', content: 'Which season do you like? Winter. I can play in the snow and make a snowman.' },
          { title: '季节与穿衣', content: 'In spring, wear a sweater. In summer, wear a T-shirt. In winter, wear a coat.' },
          { title: '名词性物主代词', content: 'mine = my ... (It\'s mine = It\'s my sweater)', children: [
            { title: 'whose句型', content: 'Whose + 单数 + is this? / Whose + 复数 + are these?' },
          ]},
        ], keyPoints: ['四季词汇', '衣物词汇', 'Whose... is this? It\'s...', 'Which season do you like?'], commonMistakes: ['Whose = 谁的，Who = 谁', 'mine是名词性物主代词，后面不加名词', 'sock常以复数形式socks出现'], exercises: [
          { id: 'en-6-1-1', subject: 'english', unit: 6, lesson: 1, type: 'choice', difficulty: 1, content: 'What does "winter" mean?', options: ['春天', '夏天', '秋天', '冬天'], answer: '冬天', analysis: 'winter = 冬天', knowledgePoints: ['vocabulary'] },
          { id: 'en-6-1-2', subject: 'english', unit: 6, lesson: 1, type: 'choice', difficulty: 2, content: '—Whose sweater is this? —______.', options: ['Yes, it is', "It's my dad's", 'I like it', 'It\'s warm'], answer: "It's my dad's", analysis: 'Whose问谁的，回答用名词所有格。', knowledgePoints: ['grammar'] },
          { id: 'en-6-1-3', subject: 'english', unit: 6, lesson: 1, type: 'fill', difficulty: 1, content: 'Which ______(季节) do you like?', answer: 'season', analysis: 'season = 季节', knowledgePoints: ['vocabulary'] },
          { id: 'en-6-1-4', subject: 'english', unit: 6, lesson: 1, type: 'choice', difficulty: 2, content: 'I can make a ______ in winter.', options: ['kite', 'snowman', 'cake', 'card'], answer: 'snowman', analysis: '冬天可以堆雪人make a snowman。', knowledgePoints: ['comprehension'] },
        ]},
      },
    ],
  },
]

export const englishConfig: SubjectConfig = {
  type: 'english',
  name: '英语',
  icon: 'comment-o',
  color: '#2EC4B6',
  bgColor: '#E8F8F6',
  units,
}
