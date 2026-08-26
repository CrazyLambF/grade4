// 英语游戏题库

// 单词消消乐 — 中英配对
export const wordClearData = [
  { left: 'classroom', right: '教室' },
  { left: 'window', right: '窗户' },
  { left: 'door', right: '门' },
  { left: 'picture', right: '图画' },
  { left: 'blackboard', right: '黑板' },
  { left: 'schoolbag', right: '书包' },
  { left: 'notebook', right: '笔记本' },
  { left: 'kitchen', right: '厨房' },
  { left: 'bedroom', right: '卧室' },
  { left: 'beef', right: '牛肉' },
  { left: 'chicken', right: '鸡肉' },
  { left: 'friend', right: '朋友' },
  { left: 'family', right: '家庭' },
  { left: 'parents', right: '父母' },
  { left: 'uncle', right: '叔叔' },
]

// 听音选词（文字模拟音频）
export const listenPickData = [
  { word: 'classroom', phonetic: '/ˈklɑːsruːm/', options: ['classroom', 'classmate', 'classroom', 'classroom'], answer: 'classroom' },
  { word: 'window', phonetic: '/ˈwɪndəʊ/', options: ['window', 'widow', 'wind', 'window'], answer: 'window' },
  { word: 'picture', phonetic: '/ˈpɪktʃə/', options: ['picture', 'puncture', 'lecture', 'picture'], answer: 'picture' },
  { word: 'schoolbag', phonetic: '/ˈskuːlbæɡ/', options: ['schoolbag', 'handbag', 'schoolbag', 'backpack'], answer: 'schoolbag' },
  { word: 'kitchen', phonetic: '/ˈkɪtʃɪn/', options: ['kitchen', 'chicken', 'kitten', 'kitchen'], answer: 'kitchen' },
  { word: 'friend', phonetic: '/frend/', options: ['friend', 'fiend', 'trend', 'friend'], answer: 'friend' },
  { word: 'vegetable', phonetic: '/ˈvedʒtəbl/', options: ['vegetable', 'vegetable', 'vulnerable', 'visible'], answer: 'vegetable' },
  { word: 'bedroom', phonetic: '/ˈbedruːm/', options: ['bedroom', 'bathroom', 'bedroom', 'mushroom'], answer: 'bedroom' },
]

// 句子排排队 — 打乱单词排成正确句子
export const sentenceOrderData = [
  { words: ['What', 'would', 'you', 'like', '?'], answer: 'What would you like ?' },
  { words: ['I', 'would', 'like', 'some', 'beef', '.'], answer: 'I would like some beef .' },
  { words: ['Where', 'is', 'my', 'seat', '?'], answer: 'Where is my seat ?' },
  { words: ['It', 'is', 'near', 'the', 'door', '.'], answer: 'It is near the door .' },
  { words: ['How', 'many', 'people', 'are', 'there', '?'], answer: 'How many people are there ?' },
  { words: ['She', 'has', 'long', 'hair', '.'], answer: 'She has long hair .' },
  { words: ['Is', 'she', 'in', 'the', 'living', 'room', '?'], answer: 'Is she in the living room ?' },
  { words: ['Turn', 'on', 'the', 'light', '.'], answer: 'Turn on the light .' },
]

// 押韵小达人 — 选出押韵的单词
export const rhymeMasterData = [
  { word: 'cat', options: ['hat', 'dog', 'sun', 'book'], answer: 'hat' },
  { word: 'tree', options: ['see', 'moon', 'star', 'fish'], answer: 'see' },
  { word: 'book', options: ['look', 'pen', 'desk', 'chair'], answer: 'look' },
  { word: 'sun', options: ['run', 'eat', 'sleep', 'walk'], answer: 'run' },
  { word: 'light', options: ['night', 'day', 'door', 'floor'], answer: 'night' },
  { word: 'play', options: ['day', 'sit', 'stand', 'stop'], answer: 'day' },
  { word: 'door', options: ['floor', 'wall', 'roof', 'window'], answer: 'floor' },
  { word: 'bag', options: ['flag', 'desk', 'chair', 'bed'], answer: 'flag' },
]
