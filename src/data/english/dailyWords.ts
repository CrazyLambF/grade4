// 英语每日词汇数据 - PEP人教版四年级上册
// 按天分组，每天5-6个单词，覆盖6个单元全部核心词汇

export interface DailyWord {
  word: string
  phonetic: string
  meaning: string
  pos: string           // 词性 n./v./adj./prep.
  plural?: string       // 复数形式
  example: string
  exampleTranslation: string
}

export interface DayWords {
  day: number
  unit: number
  title: string
  emoji: string         // 主题emoji
  words: DailyWord[]
}

export const dailyWordsData: DayWords[] = [
  { day: 1, unit: 1, title: '教室物品', emoji: '🏫', words: [
    { word: 'classroom', phonetic: '/ˈklɑːsruːm/', meaning: '教室', pos: 'n.', example: 'This is my classroom.', exampleTranslation: '这是我的教室。' },
    { word: 'window', phonetic: '/ˈwɪndəʊ/', meaning: '窗户', pos: 'n.', plural: 'windows', example: 'Open the window, please.', exampleTranslation: '请打开窗户。' },
    { word: 'door', phonetic: '/dɔː/', meaning: '门', pos: 'n.', plural: 'doors', example: 'Close the door.', exampleTranslation: '关上门。' },
    { word: 'picture', phonetic: '/ˈpɪktʃə/', meaning: '图画', pos: 'n.', plural: 'pictures', example: 'Put up the picture.', exampleTranslation: '挂上图画。' },
    { word: 'blackboard', phonetic: '/ˈblækbɔːd/', meaning: '黑板', pos: 'n.', example: 'Look at the blackboard.', exampleTranslation: '看黑板。' },
    { word: 'light', phonetic: '/laɪt/', meaning: '灯', pos: 'n.', plural: 'lights', example: 'Turn on the light.', exampleTranslation: '开灯。' },
  ]},
  { day: 2, unit: 1, title: '教室方位', emoji: '🧭', words: [
    { word: 'near', phonetic: '/nɪə/', meaning: '在……附近', pos: 'prep.', example: 'My seat is near the door.', exampleTranslation: '我的座位在门附近。' },
    { word: 'seat', phonetic: '/siːt/', meaning: '座位', pos: 'n.', plural: 'seats', example: 'Where is my seat?', exampleTranslation: '我的座位在哪？' },
    { word: 'floor', phonetic: '/flɔː/', meaning: '地板', pos: 'n.', example: 'The bag is on the floor.', exampleTranslation: '书包在地板上。' },
    { word: 'wall', phonetic: '/wɔːl/', meaning: '墙', pos: 'n.', plural: 'walls', example: 'The picture is on the wall.', exampleTranslation: '图画在墙上。' },
    { word: 'TV', phonetic: '/ˌtiːˈviː/', meaning: '电视', pos: 'n.', example: 'The TV is near the window.', exampleTranslation: '电视在窗户旁边。' },
    { word: 'fan', phonetic: '/fæn/', meaning: '风扇', pos: 'n.', plural: 'fans', example: 'The fan is on the wall.', exampleTranslation: '风扇在墙上。' },
  ]},
  { day: 3, unit: 1, title: '教室活动', emoji: '✋', words: [
    { word: 'clean', phonetic: '/kliːn/', meaning: '打扫', pos: 'v.', example: 'Let me clean the window.', exampleTranslation: '让我来擦窗户。' },
    { word: 'open', phonetic: '/ˈəʊpən/', meaning: '打开', pos: 'v.', example: 'Open the door, please.', exampleTranslation: '请开门。' },
    { word: 'close', phonetic: '/kləʊz/', meaning: '关上', pos: 'v.', example: 'Close the window.', exampleTranslation: '关上窗户。' },
    { word: 'put up', phonetic: '/pʊt ʌp/', meaning: '张贴', pos: 'v.', example: 'Put up the picture.', exampleTranslation: '挂上图画。' },
    { word: 'turn on', phonetic: '/tɜːn ɒn/', meaning: '打开（电器）', pos: 'v.', example: 'Turn on the light.', exampleTranslation: '开灯。' },
    { word: 'turn off', phonetic: '/tɜːn ɒf/', meaning: '关掉（电器）', pos: 'v.', example: 'Turn off the fan.', exampleTranslation: '关掉风扇。' },
  ]},
  { day: 4, unit: 2, title: '文具物品', emoji: '🎒', words: [
    { word: 'schoolbag', phonetic: '/ˈskuːlbæɡ/', meaning: '书包', pos: 'n.', plural: 'schoolbags', example: 'My schoolbag is heavy.', exampleTranslation: '我的书包很重。' },
    { word: 'notebook', phonetic: '/ˈnəʊtbʊk/', meaning: '笔记本', pos: 'n.', plural: 'notebooks', example: 'I have a notebook.', exampleTranslation: '我有一个笔记本。' },
    { word: 'storybook', phonetic: '/ˈstɔːribʊk/', meaning: '故事书', pos: 'n.', plural: 'storybooks', example: 'I like reading storybooks.', exampleTranslation: '我喜欢读故事书。' },
    { word: 'key', phonetic: '/kiː/', meaning: '钥匙', pos: 'n.', plural: 'keys', example: 'Where is my key?', exampleTranslation: '我的钥匙在哪？' },
    { word: 'candy', phonetic: '/ˈkændi/', meaning: '糖果', pos: 'n.', plural: 'candies', example: 'I have some candy.', exampleTranslation: '我有一些糖果。' },
    { word: 'computer', phonetic: '/kəmˈpjuːtə/', meaning: '电脑', pos: 'n.', plural: 'computers', example: 'We have a new computer.', exampleTranslation: '我们有一台新电脑。' },
  ]},
  { day: 5, unit: 2, title: '学习用品', emoji: '📝', words: [
    { word: 'English book', phonetic: '/ˈɪŋɡlɪʃ bʊk/', meaning: '英语书', pos: 'n.', example: 'This is my English book.', exampleTranslation: '这是我的英语书。' },
    { word: 'math book', phonetic: '/mæθ bʊk/', meaning: '数学书', pos: 'n.', example: 'I like my math book.', exampleTranslation: '我喜欢我的数学书。' },
    { word: 'Chinese book', phonetic: '/ˈtʃaɪniːz bʊk/', meaning: '语文书', pos: 'n.', example: 'Open your Chinese book.', exampleTranslation: '打开语文书。' },
    { word: 'pen', phonetic: '/pen/', meaning: '钢笔', pos: 'n.', plural: 'pens', example: 'Write with a pen.', exampleTranslation: '用钢笔写。' },
    { word: 'pencil', phonetic: '/ˈpensl/', meaning: '铅笔', pos: 'n.', plural: 'pencils', example: 'I have a pencil.', exampleTranslation: '我有一支铅笔。' },
    { word: 'eraser', phonetic: '/ɪˈreɪzə/', meaning: '橡皮', pos: 'n.', plural: 'erasers', example: 'I need an eraser.', exampleTranslation: '我需要一块橡皮。' },
  ]},
  { day: 6, unit: 2, title: '颜色与数量', emoji: '🎨', words: [
    { word: 'red', phonetic: '/red/', meaning: '红色的', pos: 'adj.', example: 'I have a red pen.', exampleTranslation: '我有一支红笔。' },
    { word: 'blue', phonetic: '/bluː/', meaning: '蓝色的', pos: 'adj.', example: 'My bag is blue.', exampleTranslation: '我的书包是蓝色的。' },
    { word: 'green', phonetic: '/ɡriːn/', meaning: '绿色的', pos: 'adj.', example: 'The pencil is green.', exampleTranslation: '铅笔是绿色的。' },
    { word: 'yellow', phonetic: '/ˈjeləʊ/', meaning: '黄色的', pos: 'adj.', example: 'I like yellow rulers.', exampleTranslation: '我喜欢黄色的尺子。' },
    { word: 'what', phonetic: '/wɒt/', meaning: '什么', pos: 'pron.', example: 'What is in your bag?', exampleTranslation: '你书包里有什么？' },
    { word: 'colour', phonetic: '/ˈkʌlə/', meaning: '颜色', pos: 'n.', example: 'What colour is it?', exampleTranslation: '它是什么颜色的？' },
  ]},
  { day: 7, unit: 3, title: '外貌描述', emoji: '👤', words: [
    { word: 'friend', phonetic: '/frend/', meaning: '朋友', pos: 'n.', plural: 'friends', example: 'He is my friend.', exampleTranslation: '他是我的朋友。' },
    { word: 'long hair', phonetic: '/lɒŋ heə/', meaning: '长头发', pos: 'n.', example: 'She has long hair.', exampleTranslation: '她有长头发。' },
    { word: 'short hair', phonetic: '/ʃɔːt heə/', meaning: '短头发', pos: 'n.', example: 'He has short hair.', exampleTranslation: '他有短头发。' },
    { word: 'thin', phonetic: '/θɪn/', meaning: '瘦的', pos: 'adj.', example: 'My friend is thin.', exampleTranslation: '我的朋友很瘦。' },
    { word: 'strong', phonetic: '/strɒŋ/', meaning: '强壮的', pos: 'adj.', example: 'He is strong.', exampleTranslation: '他很壮。' },
    { word: 'tall', phonetic: '/tɔːl/', meaning: '高的', pos: 'adj.', example: 'He is tall.', exampleTranslation: '他很高。' },
  ]},
  { day: 8, unit: 3, title: '性格描述', emoji: '😊', words: [
    { word: 'quiet', phonetic: '/ˈkwaɪət/', meaning: '安静的', pos: 'adj.', example: 'She is quiet.', exampleTranslation: '她很安静。' },
    { word: 'short', phonetic: '/ʃɔːt/', meaning: '矮的', pos: 'adj.', example: 'My brother is short.', exampleTranslation: '我弟弟很矮。' },
    { word: 'friendly', phonetic: '/ˈfrendli/', meaning: '友好的', pos: 'adj.', example: 'They are friendly.', exampleTranslation: '他们很友好。' },
    { word: 'cute', phonetic: '/kjuːt/', meaning: '可爱的', pos: 'adj.', example: 'The baby is cute.', exampleTranslation: '宝宝很可爱。' },
    { word: 'his', phonetic: '/hɪz/', meaning: '他的', pos: 'pron.', example: 'His name is Tom.', exampleTranslation: '他的名字叫汤姆。' },
    { word: 'her', phonetic: '/hɜː/', meaning: '她的', pos: 'pron.', example: 'Her hair is long.', exampleTranslation: '她的头发很长。' },
  ]},
  { day: 9, unit: 3, title: '人物介绍', emoji: '🗣️', words: [
    { word: 'name', phonetic: '/neɪm/', meaning: '名字', pos: 'n.', plural: 'names', example: 'My name is Lily.', exampleTranslation: '我的名字叫莉莉。' },
    { word: 'he', phonetic: '/hiː/', meaning: '他', pos: 'pron.', example: 'He is my friend.', exampleTranslation: '他是我的朋友。' },
    { word: 'she', phonetic: '/ʃiː/', meaning: '她', pos: 'pron.', example: 'She is tall.', exampleTranslation: '她很高。' },
    { word: 'boy', phonetic: '/bɔɪ/', meaning: '男孩', pos: 'n.', plural: 'boys', example: 'The boy is my friend.', exampleTranslation: '那个男孩是我的朋友。' },
    { word: 'girl', phonetic: '/ɡɜːl/', meaning: '女孩', pos: 'n.', plural: 'girls', example: 'The girl is cute.', exampleTranslation: '那个女孩很可爱。' },
    { word: 'who', phonetic: '/huː/', meaning: '谁', pos: 'pron.', example: 'Who is he?', exampleTranslation: '他是谁？' },
  ]},
  { day: 10, unit: 4, title: '家的房间', emoji: '🏠', words: [
    { word: 'home', phonetic: '/həʊm/', meaning: '家', pos: 'n.', example: 'Welcome to my home.', exampleTranslation: '欢迎来我家。' },
    { word: 'bedroom', phonetic: '/ˈbedruːm/', meaning: '卧室', pos: 'n.', plural: 'bedrooms', example: 'This is my bedroom.', exampleTranslation: '这是我的卧室。' },
    { word: 'kitchen', phonetic: '/ˈkɪtʃɪn/', meaning: '厨房', pos: 'n.', plural: 'kitchens', example: 'Mom is in the kitchen.', exampleTranslation: '妈妈在厨房。' },
    { word: 'living room', phonetic: '/ˈlɪvɪŋ ruːm/', meaning: '客厅', pos: 'n.', example: 'We watch TV in the living room.', exampleTranslation: '我们在客厅看电视。' },
    { word: 'bathroom', phonetic: '/ˈbɑːθruːm/', meaning: '浴室', pos: 'n.', plural: 'bathrooms', example: 'The bathroom is clean.', exampleTranslation: '浴室很干净。' },
    { word: 'study', phonetic: '/ˈstʌdi/', meaning: '书房', pos: 'n.', plural: 'studies', example: 'Dad is in the study.', exampleTranslation: '爸爸在书房。' },
  ]},
  { day: 11, unit: 4, title: '家居物品', emoji: '🛋️', words: [
    { word: 'phone', phonetic: '/fəʊn/', meaning: '电话', pos: 'n.', plural: 'phones', example: 'Where is the phone?', exampleTranslation: '电话在哪？' },
    { word: 'table', phonetic: '/ˈteɪbl/', meaning: '桌子', pos: 'n.', plural: 'tables', example: 'The keys are on the table.', exampleTranslation: '钥匙在桌上。' },
    { word: 'sofa', phonetic: '/ˈsəʊfə/', meaning: '沙发', pos: 'n.', plural: 'sofas', example: 'The cat is on the sofa.', exampleTranslation: '猫在沙发上。' },
    { word: 'fridge', phonetic: '/frɪdʒ/', meaning: '冰箱', pos: 'n.', plural: 'fridges', example: 'The food is in the fridge.', exampleTranslation: '食物在冰箱里。' },
    { word: 'bed', phonetic: '/bed/', meaning: '床', pos: 'n.', plural: 'beds', example: 'My bed is big.', exampleTranslation: '我的床很大。' },
    { word: 'chair', phonetic: '/tʃeə/', meaning: '椅子', pos: 'n.', plural: 'chairs', example: 'Sit on the chair.', exampleTranslation: '坐在椅子上。' },
  ]},
  { day: 12, unit: 4, title: '方位介词', emoji: '📍', words: [
    { word: 'on', phonetic: '/ɒn/', meaning: '在……上面', pos: 'prep.', example: 'The book is on the desk.', exampleTranslation: '书在桌子上。' },
    { word: 'in', phonetic: '/ɪn/', meaning: '在……里面', pos: 'prep.', example: 'The cat is in the box.', exampleTranslation: '猫在盒子里。' },
    { word: 'under', phonetic: '/ˈʌndə/', meaning: '在……下面', pos: 'prep.', example: 'The ball is under the chair.', exampleTranslation: '球在椅子下面。' },
    { word: 'near', phonetic: '/nɪə/', meaning: '在……附近', pos: 'prep.', example: 'The phone is near the TV.', exampleTranslation: '电话在电视附近。' },
    { word: 'where', phonetic: '/weə/', meaning: '在哪里', pos: 'adv.', example: 'Where is my bag?', exampleTranslation: '我的书包在哪？' },
    { word: 'look', phonetic: '/lʊk/', meaning: '看', pos: 'v.', example: 'Look at my room.', exampleTranslation: '看看我的房间。' },
  ]},
  { day: 13, unit: 5, title: '食物', emoji: '🍽️', words: [
    { word: 'beef', phonetic: '/biːf/', meaning: '牛肉', pos: 'n.', example: "I'd like some beef.", exampleTranslation: '我想要些牛肉。' },
    { word: 'chicken', phonetic: '/ˈtʃɪkɪn/', meaning: '鸡肉', pos: 'n.', example: 'Do you like chicken?', exampleTranslation: '你喜欢鸡肉吗？' },
    { word: 'rice', phonetic: '/raɪs/', meaning: '米饭', pos: 'n.', example: 'I eat rice every day.', exampleTranslation: '我每天吃米饭。' },
    { word: 'noodles', phonetic: '/ˈnuːdlz/', meaning: '面条', pos: 'n.', example: "I'd like some noodles.", exampleTranslation: '我想要些面条。' },
    { word: 'soup', phonetic: '/suːp/', meaning: '汤', pos: 'n.', example: 'The soup is hot.', exampleTranslation: '汤很烫。' },
    { word: 'fish', phonetic: '/fɪʃ/', meaning: '鱼', pos: 'n.', example: 'I like fish.', exampleTranslation: '我喜欢鱼。' },
  ]},
  { day: 14, unit: 5, title: '饮食相关', emoji: '🥗', words: [
    { word: 'vegetable', phonetic: '/ˈvedʒtəbl/', meaning: '蔬菜', pos: 'n.', plural: 'vegetables', example: 'Eat more vegetables.', exampleTranslation: '多吃蔬菜。' },
    { word: 'bread', phonetic: '/bred/', meaning: '面包', pos: 'n.', example: "I'd like some bread.", exampleTranslation: '我想要些面包。' },
    { word: 'milk', phonetic: '/mɪlk/', meaning: '牛奶', pos: 'n.', example: 'Drink milk every morning.', exampleTranslation: '每天早上喝牛奶。' },
    { word: 'juice', phonetic: '/dʒuːs/', meaning: '果汁', pos: 'n.', example: "I'd like some juice.", exampleTranslation: '我想要些果汁。' },
    { word: 'water', phonetic: '/ˈwɔːtə/', meaning: '水', pos: 'n.', example: 'I want some water.', exampleTranslation: '我想要些水。' },
    { word: 'tea', phonetic: '/tiː/', meaning: '茶', pos: 'n.', example: 'Have a cup of tea.', exampleTranslation: '喝杯茶吧。' },
  ]},
  { day: 15, unit: 5, title: '餐具与用餐', emoji: '🍴', words: [
    { word: 'bowl', phonetic: '/bəʊl/', meaning: '碗', pos: 'n.', plural: 'bowls', example: 'I have a bowl of rice.', exampleTranslation: '我有一碗米饭。' },
    { word: 'fork', phonetic: '/fɔːk/', meaning: '叉子', pos: 'n.', plural: 'forks', example: 'Use a fork, please.', exampleTranslation: '请用叉子。' },
    { word: 'knife', phonetic: '/naɪf/', meaning: '刀', pos: 'n.', plural: 'knives', example: 'I need a knife.', exampleTranslation: '我需要一把刀。' },
    { word: 'spoon', phonetic: '/spuːn/', meaning: '勺子', pos: 'n.', plural: 'spoons', example: 'Use the spoon for soup.', exampleTranslation: '用勺子喝汤。' },
    { word: 'chopsticks', phonetic: '/ˈtʃɒpstɪks/', meaning: '筷子', pos: 'n.', example: 'I can use chopsticks.', exampleTranslation: '我会用筷子。' },
    { word: 'plate', phonetic: '/pleɪt/', meaning: '盘子', pos: 'n.', plural: 'plates', example: 'The plate is clean.', exampleTranslation: '盘子很干净。' },
  ]},
  { day: 16, unit: 5, title: '点餐用语', emoji: '📋', words: [
    { word: 'like', phonetic: '/laɪk/', meaning: '喜欢', pos: 'v.', example: 'I like chicken.', exampleTranslation: '我喜欢鸡肉。' },
    { word: 'want', phonetic: '/wɒnt/', meaning: '想要', pos: 'v.', example: 'I want some juice.', exampleTranslation: '我想要些果汁。' },
    { word: 'would', phonetic: '/wʊd/', meaning: '愿意（would like 想要）', pos: 'v.', example: "I'd like some milk.", exampleTranslation: '我想要些牛奶。' },
    { word: 'please', phonetic: '/pliːz/', meaning: '请', pos: 'int.', example: 'A glass of milk, please.', exampleTranslation: '请来一杯牛奶。' },
    { word: 'help', phonetic: '/help/', meaning: '帮助（Help yourself 请自便）', pos: 'v.', example: 'Help yourself to some fish.', exampleTranslation: '随便吃些鱼吧。' },
    { word: 'dinner', phonetic: '/ˈdɪnə/', meaning: '正餐', pos: 'n.', example: "What's for dinner?", exampleTranslation: '晚餐吃什么？' },
  ]},
  { day: 17, unit: 6, title: '家庭成员', emoji: '👨‍👩‍👧‍👦', words: [
    { word: 'family', phonetic: '/ˈfæməli/', meaning: '家庭', pos: 'n.', plural: 'families', example: 'I love my family.', exampleTranslation: '我爱我的家庭。' },
    { word: 'parents', phonetic: '/ˈpeərənts/', meaning: '父母', pos: 'n.', example: 'My parents are kind.', exampleTranslation: '我的父母很和蔼。' },
    { word: 'uncle', phonetic: '/ˈʌŋkl/', meaning: '叔叔/舅舅', pos: 'n.', plural: 'uncles', example: 'My uncle is tall.', exampleTranslation: '我叔叔很高。' },
    { word: 'aunt', phonetic: '/ɑːnt/', meaning: '阿姨/姑姑', pos: 'n.', plural: 'aunts', example: 'My aunt is a teacher.', exampleTranslation: '我阿姨是老师。' },
    { word: 'cousin', phonetic: '/ˈkʌzn/', meaning: '表兄弟/姐妹', pos: 'n.', plural: 'cousins', example: 'My cousin is ten.', exampleTranslation: '我表哥十岁。' },
    { word: 'baby', phonetic: '/ˈbeɪbi/', meaning: '婴儿', pos: 'n.', plural: 'babies', example: 'The baby is sleeping.', exampleTranslation: '宝宝在睡觉。' },
  ]},
  { day: 18, unit: 6, title: '家庭职业', emoji: '💼', words: [
    { word: 'doctor', phonetic: '/ˈdɒktə/', meaning: '医生', pos: 'n.', plural: 'doctors', example: 'My father is a doctor.', exampleTranslation: '我爸爸是医生。' },
    { word: 'driver', phonetic: '/ˈdraɪvə/', meaning: '司机', pos: 'n.', plural: 'drivers', example: 'He is a bus driver.', exampleTranslation: '他是公交车司机。' },
    { word: 'nurse', phonetic: '/nɜːs/', meaning: '护士', pos: 'n.', plural: 'nurses', example: 'My aunt is a nurse.', exampleTranslation: '我阿姨是护士。' },
    { word: 'teacher', phonetic: '/ˈtiːtʃə/', meaning: '老师', pos: 'n.', plural: 'teachers', example: 'My mother is a teacher.', exampleTranslation: '我妈妈是老师。' },
    { word: 'farmer', phonetic: '/ˈfɑːmə/', meaning: '农民', pos: 'n.', plural: 'farmers', example: 'My grandpa is a farmer.', exampleTranslation: '我爷爷是农民。' },
    { word: 'cook', phonetic: '/kʊk/', meaning: '厨师', pos: 'n.', plural: 'cooks', example: 'My uncle is a cook.', exampleTranslation: '我叔叔是厨师。' },
  ]},
  { day: 19, unit: 6, title: '称呼与代词', emoji: '💬', words: [
    { word: 'father', phonetic: '/ˈfɑːðə/', meaning: '父亲', pos: 'n.', plural: 'fathers', example: 'My father is tall.', exampleTranslation: '我爸爸很高。' },
    { word: 'mother', phonetic: '/ˈmʌðə/', meaning: '母亲', pos: 'n.', plural: 'mothers', example: 'My mother is kind.', exampleTranslation: '我妈妈很和蔼。' },
    { word: 'brother', phonetic: '/ˈbrʌðə/', meaning: '兄弟', pos: 'n.', plural: 'brothers', example: 'My brother is ten.', exampleTranslation: '我兄弟十岁。' },
    { word: 'sister', phonetic: '/ˈsɪstə/', meaning: '姐妹', pos: 'n.', plural: 'sisters', example: 'My sister is cute.', exampleTranslation: '我姐妹很可爱。' },
    { word: 'grandpa', phonetic: '/ˈɡrænpɑː/', meaning: '爷爷', pos: 'n.', example: 'My grandpa is a farmer.', exampleTranslation: '我爷爷是农民。' },
    { word: 'grandma', phonetic: '/ˈɡrænmɑː/', meaning: '奶奶', pos: 'n.', example: 'My grandma is kind.', exampleTranslation: '我奶奶很和蔼。' },
  ]},
  { day: 20, unit: 6, title: '综合复习', emoji: '⭐', words: [
    { word: 'people', phonetic: '/ˈpiːpl/', meaning: '人们', pos: 'n.', example: 'How many people are there?', exampleTranslation: '有多少人？' },
    { word: 'job', phonetic: '/dʒɒb/', meaning: '工作', pos: 'n.', plural: 'jobs', example: 'What is your job?', exampleTranslation: '你的工作是什么？' },
    { word: 'this', phonetic: '/ðɪs/', meaning: '这', pos: 'pron.', example: 'This is my family.', exampleTranslation: '这是我的家人。' },
    { word: 'that', phonetic: '/ðæt/', meaning: '那', pos: 'pron.', example: 'That is my uncle.', exampleTranslation: '那是我叔叔。' },
    { word: 'there', phonetic: '/ðeə/', meaning: '那里', pos: 'adv.', example: 'There are five people.', exampleTranslation: '有五口人。' },
    { word: 'but', phonetic: '/bʌt/', meaning: '但是', pos: 'conj.', example: 'He is short but strong.', exampleTranslation: '他矮但很强壮。' },
  ]},
]
