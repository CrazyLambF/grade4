// 英语每日词汇数据 - 按天分组，每天5-6个单词

export interface DailyWord {
  word: string
  phonetic: string
  meaning: string
  example: string
  exampleTranslation: string
}

export interface DayWords {
  day: number
  unit: number
  title: string
  words: DailyWord[]
}

export const dailyWordsData: DayWords[] = [
  { day: 1, unit: 1, title: 'Day 1 · 教室物品', words: [
    { word: 'classroom', phonetic: '/ˈklɑːsruːm/', meaning: '教室', example: 'This is my classroom.', exampleTranslation: '这是我的教室。' },
    { word: 'window', phonetic: '/ˈwɪndəʊ/', meaning: '窗户', example: 'Open the window, please.', exampleTranslation: '请打开窗户。' },
    { word: 'door', phonetic: '/dɔː/', meaning: '门', example: 'Close the door.', exampleTranslation: '关上门。' },
    { word: 'picture', phonetic: '/ˈpɪktʃə/', meaning: '图画', example: 'Put up the picture.', exampleTranslation: '挂上图画。' },
    { word: 'blackboard', phonetic: '/ˈblækbɔːd/', meaning: '黑板', example: 'Look at the blackboard.', exampleTranslation: '看黑板。' },
  ]},
  { day: 2, unit: 1, title: 'Day 2 · 教室方位', words: [
    { word: 'light', phonetic: '/laɪt/', meaning: '灯', example: 'Turn on the light.', exampleTranslation: '开灯。' },
    { word: 'near', phonetic: '/nɪə/', meaning: '在...附近', example: 'My seat is near the door.', exampleTranslation: '我的座位在门附近。' },
    { word: 'seat', phonetic: '/siːt/', meaning: '座位', example: 'Where is my seat?', exampleTranslation: '我的座位在哪？' },
    { word: 'floor', phonetic: '/flɔː/', meaning: '地板', example: 'The bag is on the floor.', exampleTranslation: '书包在地板上。' },
    { word: 'wall', phonetic: '/wɔːl/', meaning: '墙', example: 'The picture is on the wall.', exampleTranslation: '图画在墙上。' },
  ]},
  { day: 3, unit: 2, title: 'Day 3 · 文具物品', words: [
    { word: 'schoolbag', phonetic: '/ˈskuːlbæɡ/', meaning: '书包', example: 'My schoolbag is heavy.', exampleTranslation: '我的书包很重。' },
    { word: 'notebook', phonetic: '/ˈnəʊtbʊk/', meaning: '笔记本', example: 'I have a notebook.', exampleTranslation: '我有一个笔记本。' },
    { word: 'storybook', phonetic: '/ˈstɔːribʊk/', meaning: '故事书', example: 'I like reading storybooks.', exampleTranslation: '我喜欢读故事书。' },
    { word: 'key', phonetic: '/kiː/', meaning: '钥匙', example: 'Where is my key?', exampleTranslation: '我的钥匙在哪？' },
    { word: 'candy', phonetic: '/ˈkændi/', meaning: '糖果', example: 'I have some candy.', exampleTranslation: '我有一些糖果。' },
  ]},
  { day: 4, unit: 2, title: 'Day 4 · 学习用品', words: [
    { word: 'English book', phonetic: '/ˈɪŋɡlɪʃ bʊk/', meaning: '英语书', example: 'This is my English book.', exampleTranslation: '这是我的英语书。' },
    { word: 'math book', phonetic: '/mæθ bʊk/', meaning: '数学书', example: 'I like my math book.', exampleTranslation: '我喜欢我的数学书。' },
    { word: 'Chinese book', phonetic: '/ˈtʃaɪniːz bʊk/', meaning: '语文书', example: 'Open your Chinese book.', exampleTranslation: '打开语文书。' },
    { word: 'pen', phonetic: '/pen/', meaning: '钢笔', example: 'Write with a pen.', exampleTranslation: '用钢笔写。' },
    { word: 'pencil', phonetic: '/ˈpensl/', meaning: '铅笔', example: 'I have a pencil.', exampleTranslation: '我有一支铅笔。' },
  ]},
  { day: 5, unit: 3, title: 'Day 5 · 外貌描述', words: [
    { word: 'friend', phonetic: '/frend/', meaning: '朋友', example: 'He is my friend.', exampleTranslation: '他是我的朋友。' },
    { word: 'long hair', phonetic: '/lɒŋ heə/', meaning: '长头发', example: 'She has long hair.', exampleTranslation: '她有长头发。' },
    { word: 'short hair', phonetic: '/ʃɔːt heə/', meaning: '短头发', example: 'He has short hair.', exampleTranslation: '他有短头发。' },
    { word: 'thin', phonetic: '/θɪn/', meaning: '瘦的', example: 'My friend is thin.', exampleTranslation: '我的朋友很瘦。' },
    { word: 'strong', phonetic: '/strɒŋ/', meaning: '强壮的', example: 'He is strong.', exampleTranslation: '他很壮。' },
  ]},
  { day: 6, unit: 3, title: 'Day 6 · 性格描述', words: [
    { word: 'quiet', phonetic: '/ˈkwaɪət/', meaning: '安静的', example: 'She is quiet.', exampleTranslation: '她很安静。' },
    { word: 'tall', phonetic: '/tɔːl/', meaning: '高的', example: 'He is tall.', exampleTranslation: '他很高。' },
    { word: 'short', phonetic: '/ʃɔːt/', meaning: '矮的', example: 'My brother is short.', exampleTranslation: '我弟弟很矮。' },
    { word: 'friendly', phonetic: '/ˈfrendli/', meaning: '友好的', example: 'They are friendly.', exampleTranslation: '他们很友好。' },
    { word: 'cute', phonetic: '/kjuːt/', meaning: '可爱的', example: 'The baby is cute.', exampleTranslation: '宝宝很可爱。' },
  ]},
  { day: 7, unit: 4, title: 'Day 7 · 家的房间', words: [
    { word: 'home', phonetic: '/həʊm/', meaning: '家', example: 'Welcome to my home.', exampleTranslation: '欢迎来我家。' },
    { word: 'bedroom', phonetic: '/ˈbedruːm/', meaning: '卧室', example: 'This is my bedroom.', exampleTranslation: '这是我的卧室。' },
    { word: 'kitchen', phonetic: '/ˈkɪtʃɪn/', meaning: '厨房', example: 'Mom is in the kitchen.', exampleTranslation: '妈妈在厨房。' },
    { word: 'living room', phonetic: '/ˈlɪvɪŋ ruːm/', meaning: '客厅', example: 'We watch TV in the living room.', exampleTranslation: '我们在客厅看电视。' },
    { word: 'bathroom', phonetic: '/ˈbɑːθruːm/', meaning: '浴室', example: 'The bathroom is clean.', exampleTranslation: '浴室很干净。' },
  ]},
  { day: 8, unit: 4, title: 'Day 8 · 家居位置', words: [
    { word: 'study', phonetic: '/ˈstʌdi/', meaning: '书房', example: 'Dad is in the study.', exampleTranslation: '爸爸在书房。' },
    { word: 'phone', phonetic: '/fəʊn/', meaning: '电话', example: 'Where is the phone?', exampleTranslation: '电话在哪？' },
    { word: 'table', phonetic: '/ˈteɪbl/', meaning: '桌子', example: 'The keys are on the table.', exampleTranslation: '钥匙在桌上。' },
    { word: 'sofa', phonetic: '/ˈsəʊfə/', meaning: '沙发', example: 'The cat is on the sofa.', exampleTranslation: '猫在沙发上。' },
    { word: 'fridge', phonetic: '/frɪdʒ/', meaning: '冰箱', example: 'The food is in the fridge.', exampleTranslation: '食物在冰箱里。' },
  ]},
  { day: 9, unit: 5, title: 'Day 9 · 食物', words: [
    { word: 'beef', phonetic: '/biːf/', meaning: '牛肉', example: "I'd like some beef.", exampleTranslation: '我想要些牛肉。' },
    { word: 'chicken', phonetic: '/ˈtʃɪkɪn/', meaning: '鸡肉', example: 'Do you like chicken?', exampleTranslation: '你喜欢鸡肉吗？' },
    { word: 'rice', phonetic: '/raɪs/', meaning: '米饭', example: 'I eat rice every day.', exampleTranslation: '我每天吃米饭。' },
    { word: 'noodles', phonetic: '/ˈnuːdlz/', meaning: '面条', example: "I'd like some noodles.", exampleTranslation: '我想要些面条。' },
    { word: 'soup', phonetic: '/suːp/', meaning: '汤', example: 'The soup is hot.', exampleTranslation: '汤很烫。' },
  ]},
  { day: 10, unit: 5, title: 'Day 10 · 饮食相关', words: [
    { word: 'vegetable', phonetic: '/ˈvedʒtəbl/', meaning: '蔬菜', example: 'Eat more vegetables.', exampleTranslation: '多吃蔬菜。' },
    { word: 'fish', phonetic: '/fɪʃ/', meaning: '鱼', example: 'I like fish.', exampleTranslation: '我喜欢鱼。' },
    { word: 'bread', phonetic: '/bred/', meaning: '面包', example: "I'd like some bread.", exampleTranslation: '我想要些面包。' },
    { word: 'milk', phonetic: '/mɪlk/', meaning: '牛奶', example: 'Drink milk every morning.', exampleTranslation: '每天早上喝牛奶。' },
    { word: 'juice', phonetic: '/dʒuːs/', meaning: '果汁', example: "I'd like some juice.", exampleTranslation: '我想要些果汁。' },
  ]},
  { day: 11, unit: 6, title: 'Day 11 · 家庭成员', words: [
    { word: 'family', phonetic: '/ˈfæməli/', meaning: '家庭', example: 'I love my family.', exampleTranslation: '我爱我的家庭。' },
    { word: 'parents', phonetic: '/ˈpeərənts/', meaning: '父母', example: 'My parents are kind.', exampleTranslation: '我的父母很和蔼。' },
    { word: 'uncle', phonetic: '/ˈʌŋkl/', meaning: '叔叔/舅舅', example: 'My uncle is tall.', exampleTranslation: '我叔叔很高。' },
    { word: 'aunt', phonetic: '/ɑːnt/', meaning: '阿姨/姑姑', example: 'My aunt is a teacher.', exampleTranslation: '我阿姨是老师。' },
    { word: 'cousin', phonetic: '/ˈkʌzn/', meaning: '表兄弟/姐妹', example: 'My cousin is ten.', exampleTranslation: '我表哥十岁。' },
  ]},
  { day: 12, unit: 6, title: 'Day 12 · 家庭职业', words: [
    { word: 'baby', phonetic: '/ˈbeɪbi/', meaning: '婴儿', example: 'The baby is sleeping.', exampleTranslation: '宝宝在睡觉。' },
    { word: 'doctor', phonetic: '/ˈdɒktə/', meaning: '医生', example: 'My father is a doctor.', exampleTranslation: '我爸爸是医生。' },
    { word: 'driver', phonetic: '/ˈdraɪvə/', meaning: '司机', example: 'He is a bus driver.', exampleTranslation: '他是公交车司机。' },
    { word: 'nurse', phonetic: '/nɜːs/', meaning: '护士', example: 'My aunt is a nurse.', exampleTranslation: '我阿姨是护士。' },
    { word: 'teacher', phonetic: '/ˈtiːtʃə/', meaning: '老师', example: 'My mother is a teacher.', exampleTranslation: '我妈妈是老师。' },
  ]},
]
