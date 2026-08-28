import type { SubjectConfig, UnitItem } from '@/types'
import { englishExtraExercises } from './extraExercises'

export { englishExtraExercises }

const units: UnitItem[] = [
  {
    id: 1,
    title: 'Unit 1 · My Classroom',
    lessons: [
      {
        id: 1, title: 'My Classroom',
        previewContent: { guide: 'What\'s in your classroom? Learn classroom words!', keyPoints: ['classroom vocabulary', 'Where is...? It\'s...', 'prepositions'], audioUrl: '', words: [
          { word: 'classroom', phonetic: '/ˈklɑːsruːm/', meaning: '教室' },
          { word: 'window', phonetic: '/ˈwɪndəʊ/', meaning: '窗户' },
          { word: 'picture', phonetic: '/ˈpɪktʃə/', meaning: '图画' },
          { word: 'door', phonetic: '/dɔː/', meaning: '门' },
          { word: 'blackboard', phonetic: '/ˈblækbɔːd/', meaning: '黑板' },
          { word: 'light', phonetic: '/laɪt/', meaning: '灯' },
        ]},
        reviewContent: { knowledgeMap: [{ title: 'Key sentences', content: "Where is my seat? It's near the door.", children: [
          { title: 'Let\'s do', content: 'Open the door. Turn on the light. Close the window. Put up the picture.' },
        ]}], keyPoints: ['classroom words', 'Where is...? It\'s...', 'imperative sentences'], commonMistakes: ['window的w不发音部分学生易忽略'], exercises: [
          { id: 'en-1-1-1', subject: 'english', unit: 1, lesson: 1, type: 'choice', difficulty: 1, content: 'What does "window" mean?', options: ['门', '窗户', '灯', '图画'], answer: '窗户', analysis: 'window = 窗户', knowledgePoints: ['vocabulary'] },
          { id: 'en-1-1-2', subject: 'english', unit: 1, lesson: 1, type: 'choice', difficulty: 1, content: '"near the door" means?', options: ['在门上', '在门附近', '在门后', '在门外'], answer: '在门附近', analysis: 'near = 在...附近', knowledgePoints: ['prepositions'] },
          { id: 'en-1-1-3', subject: 'english', unit: 1, lesson: 1, type: 'fill', difficulty: 1, content: 'Turn on the ____（灯）.', answer: 'light', analysis: 'light = 灯', knowledgePoints: ['vocabulary'] },
        ]},
      },
    ],
  },
  {
    id: 2,
    title: 'Unit 2 · My Schoolbag',
    lessons: [
      {
        id: 1, title: 'My Schoolbag',
        previewContent: { guide: 'What\'s in your schoolbag? Learn school things!', keyPoints: ['school things', "What's in...?", 'How many'], audioUrl: '', words: [
          { word: 'schoolbag', phonetic: '/ˈskuːlbæɡ/', meaning: '书包' },
          { word: 'English book', phonetic: '/ˈɪŋɡlɪʃ bʊk/', meaning: '英语书' },
          { word: 'math book', phonetic: '/mæθ bʊk/', meaning: '数学书' },
          { word: 'notebook', phonetic: '/ˈnəʊtbʊk/', meaning: '笔记本' },
          { word: 'storybook', phonetic: '/ˈstɔːribʊk/', meaning: '故事书' },
          { word: 'key', phonetic: '/kiː/', meaning: '钥匙' },
        ]},
        reviewContent: { knowledgeMap: [{ title: 'Key sentences', content: "What's in your schoolbag? An English book, a math book and three storybooks.", children: [
          { title: 'How many', content: 'How many books do you have? I have 6.' },
        ]}], keyPoints: ['school items', "What's in...?", 'How many...?'], commonMistakes: ['storybook是一个词不是分开写'], exercises: [
          { id: 'en-2-1-1', subject: 'english', unit: 2, lesson: 1, type: 'choice', difficulty: 1, content: 'What does "notebook" mean?', options: ['故事书', '笔记本', '英语书', '钥匙'], answer: '笔记本', analysis: 'notebook = 笔记本', knowledgePoints: ['vocabulary'] },
          { id: 'en-2-1-2', subject: 'english', unit: 2, lesson: 1, type: 'fill', difficulty: 1, content: "What's in your ______(书包)?", answer: 'schoolbag', analysis: 'schoolbag = 书包', knowledgePoints: ['vocabulary'] },
        ]},
      },
    ],
  },
  {
    id: 3,
    title: 'Unit 3 · My Friends',
    lessons: [
      {
        id: 1, title: 'My Friends',
        previewContent: { guide: 'Describe your friends! What do they look like?', keyPoints: ['appearance', 'He/She is...', 'long/short hair'], audioUrl: '', words: [
          { word: 'friend', phonetic: '/frend/', meaning: '朋友' },
          { word: 'long hair', phonetic: '/lɒŋ heə/', meaning: '长头发' },
          { word: 'short hair', phonetic: '/ʃɔːt heə/', meaning: '短头发' },
          { word: 'thin', phonetic: '/θɪn/', meaning: '瘦的' },
          { word: 'strong', phonetic: '/strɒŋ/', meaning: '强壮的' },
          { word: 'quiet', phonetic: '/ˈkwaɪət/', meaning: '安静的' },
        ]},
        reviewContent: { knowledgeMap: [{ title: 'Key sentences', content: 'He is tall and strong. She has long hair and big eyes.' }], keyPoints: ['appearance words', 'He/She is/has...', 'describe people'], commonMistakes: ['is + 形容词, has + 名词(头发/眼睛)'], exercises: [
          { id: 'en-3-1-1', subject: 'english', unit: 3, lesson: 1, type: 'choice', difficulty: 1, content: '"thin" means?', options: ['胖的', '瘦的', '高的', '矮的'], answer: '瘦的', analysis: 'thin = 瘦的', knowledgePoints: ['vocabulary'] },
          { id: 'en-3-1-2', subject: 'english', unit: 3, lesson: 1, type: 'choice', difficulty: 2, content: 'She ___ long hair.', options: ['is', 'has', 'are', 'have'], answer: 'has', analysis: 'has + 名词(头发)。', knowledgePoints: ['grammar'] },
        ]},
      },
    ],
  },
  {
    id: 4,
    title: 'Unit 4 · My Home',
    lessons: [
      {
        id: 1, title: 'My Home',
        previewContent: { guide: 'Where are the things in your home?', keyPoints: ['rooms', 'Is she/he in...?', 'Yes/No questions'], audioUrl: '', words: [
          { word: 'home', phonetic: '/həʊm/', meaning: '家' },
          { word: 'bedroom', phonetic: '/ˈbedruːm/', meaning: '卧室' },
          { word: 'kitchen', phonetic: '/ˈkɪtʃɪn/', meaning: '厨房' },
          { word: 'living room', phonetic: '/ˈlɪvɪŋ ruːm/', meaning: '客厅' },
          { word: 'bathroom', phonetic: '/ˈbɑːθruːm/', meaning: '浴室' },
          { word: 'study', phonetic: '/ˈstʌdi/', meaning: '书房' },
        ]},
        reviewContent: { knowledgeMap: [{ title: 'Key sentences', content: 'Is she in the living room? Yes, she is. / No, she isn\'t.' }], keyPoints: ['room words', 'Is...in...?', 'Yes/No answers'], commonMistakes: ['living room是两个词'], exercises: [
          { id: 'en-4-1-1', subject: 'english', unit: 4, lesson: 1, type: 'choice', difficulty: 1, content: 'What does "kitchen" mean?', options: ['卧室', '厨房', '客厅', '浴室'], answer: '厨房', analysis: 'kitchen = 厨房', knowledgePoints: ['vocabulary'] },
          { id: 'en-4-1-2', subject: 'english', unit: 4, lesson: 1, type: 'fill', difficulty: 1, content: 'Is she in the ______(客厅)?', answer: 'living room', analysis: 'living room = 客厅', knowledgePoints: ['vocabulary'] },
        ]},
      },
    ],
  },
  {
    id: 5,
    title: "Unit 5 · Dinner's Ready",
    lessons: [
      {
        id: 1, title: "Dinner's Ready",
        previewContent: { guide: 'What would you like for dinner?', keyPoints: ['food words', 'What would you like?', "I'd like..."], audioUrl: '', words: [
          { word: 'beef', phonetic: '/biːf/', meaning: '牛肉' },
          { word: 'chicken', phonetic: '/ˈtʃɪkɪn/', meaning: '鸡肉' },
          { word: 'rice', phonetic: '/raɪs/', meaning: '米饭' },
          { word: 'noodles', phonetic: '/ˈnuːdlz/', meaning: '面条' },
          { word: 'soup', phonetic: '/suːp/', meaning: '汤' },
          { word: 'vegetable', phonetic: '/ˈvedʒtəbl/', meaning: '蔬菜' },
        ]},
        reviewContent: { knowledgeMap: [{ title: 'Key sentences', content: "What would you like? I'd like some beef and rice, please." }], keyPoints: ['food vocabulary', 'What would you like?', "I'd like..."], commonMistakes: ['chicken既是鸡肉也是小鸡'], exercises: [
          { id: 'en-5-1-1', subject: 'english', unit: 5, lesson: 1, type: 'choice', difficulty: 1, content: 'What does "beef" mean?', options: ['鸡肉', '牛肉', '米饭', '汤'], answer: '牛肉', analysis: 'beef = 牛肉', knowledgePoints: ['vocabulary'] },
          { id: 'en-5-1-2', subject: 'english', unit: 5, lesson: 1, type: 'fill', difficulty: 1, content: "I'd like some ______(面条).", answer: 'noodles', analysis: 'noodles = 面条', knowledgePoints: ['vocabulary'] },
        ]},
      },
    ],
  },
  {
    id: 6,
    title: 'Unit 6 · Meet My Family',
    lessons: [
      {
        id: 1, title: 'Meet My Family',
        previewContent: { guide: 'How many people are there in your family?', keyPoints: ['family members', 'How many people?', 'This is my...'], audioUrl: '', words: [
          { word: 'family', phonetic: '/ˈfæməli/', meaning: '家庭' },
          { word: 'parents', phonetic: '/ˈpeərənts/', meaning: '父母' },
          { word: 'uncle', phonetic: '/ˈʌŋkl/', meaning: '叔叔/舅舅' },
          { word: 'aunt', phonetic: '/ɑːnt/', meaning: '阿姨/姑姑' },
          { word: 'cousin', phonetic: '/ˈkʌzn/', meaning: '表兄弟/姐妹' },
          { word: 'baby', phonetic: '/ˈbeɪbi/', meaning: '婴儿' },
        ]},
        reviewContent: { knowledgeMap: [{ title: 'Key sentences', content: 'How many people are there in your family? There are three. My dad, my mom and me.' }], keyPoints: ['family members', 'How many people?', 'This is...'], commonMistakes: ['uncle/aunt不特指某一亲戚'], exercises: [
          { id: 'en-6-1-1', subject: 'english', unit: 6, lesson: 1, type: 'choice', difficulty: 1, content: 'What does "parents" mean?', options: ['叔叔', '父母', '表亲', '婴儿'], answer: '父母', analysis: 'parents = 父母（复数）', knowledgePoints: ['vocabulary'] },
          { id: 'en-6-1-2', subject: 'english', unit: 6, lesson: 1, type: 'fill', difficulty: 1, content: 'My father\'s brother is my ______.', answer: 'uncle', analysis: '父亲的兄弟是uncle。', knowledgePoints: ['family members'] },
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
