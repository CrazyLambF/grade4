import type { Question } from '@/types'

export const englishExtraExercises: Question[] = [
  // Unit 1 - Helping at home
  { id: 'en-1-1-5', subject: 'english', unit: 1, lesson: 1, type: 'choice', difficulty: 1, content: 'What does "farmer" mean?', options: ['医生', '农民', '护士', '工人'], answer: '农民', analysis: 'farmer = 农民', knowledgePoints: ['vocabulary'] },
  { id: 'en-1-1-6', subject: 'english', unit: 1, lesson: 1, type: 'fill', difficulty: 1, content: 'I can ______(扫) the floor.', answer: 'sweep', analysis: 'sweep = 扫', knowledgePoints: ['vocabulary'] },
  { id: 'en-1-1-7', subject: 'english', unit: 1, lesson: 1, type: 'choice', difficulty: 2, content: 'My father is ______ office worker.', options: ['a', 'an', 'the', '/'], answer: 'an', analysis: 'office以元音开头用an。', knowledgePoints: ['grammar'] },
  { id: 'en-1-1-8', subject: 'english', unit: 1, lesson: 1, type: 'judge', difficulty: 1, content: 'can后面接动词原形。', options: ['正确', '错误'], answer: '正确', analysis: 'can + 动词原形，无人称变化。', knowledgePoints: ['grammar'] },
  // Unit 2 - My friends
  { id: 'en-2-1-4', subject: 'english', unit: 2, lesson: 1, type: 'choice', difficulty: 1, content: 'What does "strong" mean?', options: ['瘦的', '强壮的', '高的', '有趣的'], answer: '强壮的', analysis: 'strong = 强壮的', knowledgePoints: ['vocabulary'] },
  { id: 'en-2-1-5', subject: 'english', unit: 2, lesson: 1, type: 'fill', difficulty: 1, content: 'She is tall and ______(瘦的).', answer: 'thin', analysis: 'thin = 瘦的', knowledgePoints: ['vocabulary'] },
  { id: 'en-2-1-6', subject: 'english', unit: 2, lesson: 1, type: 'choice', difficulty: 2, content: "What's your friend's name? ______ name is Tom.", options: ['His', 'He', 'She', 'Her'], answer: 'His', analysis: 'Tom是男孩，用His name is...', knowledgePoints: ['grammar'] },
  // Unit 3 - Places we live in
  { id: 'en-3-1-4', subject: 'english', unit: 3, lesson: 1, type: 'choice', difficulty: 1, content: 'What does "hospital" mean?', options: ['图书馆', '医院', '商店', '公园'], answer: '医院', analysis: 'hospital = 医院', knowledgePoints: ['vocabulary'] },
  { id: 'en-3-1-5', subject: 'english', unit: 3, lesson: 1, type: 'fill', difficulty: 1, content: 'I often take a ______(散步) in the park.', answer: 'walk', analysis: 'take a walk = 散步', knowledgePoints: ['phrases'] },
  { id: 'en-3-1-6', subject: 'english', unit: 3, lesson: 1, type: 'choice', difficulty: 2, content: 'There ______ a shop over there.', options: ['is', 'are', 'am', 'be'], answer: 'is', analysis: 'a shop是单数，用is。', knowledgePoints: ['grammar'] },
  // Unit 4 - Helping in the community
  { id: 'en-4-1-4', subject: 'english', unit: 4, lesson: 1, type: 'choice', difficulty: 1, content: 'What does "cleaner" mean?', options: ['司机', '清洁工', '厨师', '快递员'], answer: '清洁工', analysis: 'cleaner = 清洁工', knowledgePoints: ['vocabulary'] },
  { id: 'en-4-1-5', subject: 'english', unit: 4, lesson: 1, type: 'fill', difficulty: 1, content: 'A ______(快递员) brings packages to our home.', answer: 'delivery worker', analysis: 'delivery worker = 快递员', knowledgePoints: ['vocabulary'] },
  { id: 'en-4-1-6', subject: 'english', unit: 4, lesson: 1, type: 'choice', difficulty: 2, content: 'He often ______ people cross the road.', options: ['help', 'helps', 'helping', 'to help'], answer: 'helps', analysis: 'He是第三人称单数，动词加s。', knowledgePoints: ['grammar'] },
  // Unit 5 - The weather and us
  { id: 'en-5-1-4', subject: 'english', unit: 5, lesson: 1, type: 'choice', difficulty: 1, content: 'What does "cloudy" mean?', options: ['晴朗的', '多云的', '下雨的', '下雪的'], answer: '多云的', analysis: 'cloudy = 多云的', knowledgePoints: ['vocabulary'] },
  { id: 'en-5-1-5', subject: 'english', unit: 5, lesson: 1, type: 'fill', difficulty: 1, content: "It's ______(温暖的) in spring.", answer: 'warm', analysis: 'warm = 温暖的', knowledgePoints: ['vocabulary'] },
  { id: 'en-5-1-6', subject: 'english', unit: 5, lesson: 1, type: 'choice', difficulty: 2, content: 'I can ______ a kite on windy days.', options: ['fly', 'flying', 'flies', 'to fly'], answer: 'fly', analysis: 'can + 动词原形fly。', knowledgePoints: ['grammar'] },
  // Unit 6 - Changing for the seasons
  { id: 'en-6-1-5', subject: 'english', unit: 6, lesson: 1, type: 'choice', difficulty: 1, content: 'What does "spring" mean?', options: ['春天', '夏天', '秋天', '冬天'], answer: '春天', analysis: 'spring = 春天', knowledgePoints: ['vocabulary'] },
  { id: 'en-6-1-6', subject: 'english', unit: 6, lesson: 1, type: 'fill', difficulty: 1, content: 'In winter, I wear a ______(外套).', answer: 'coat', analysis: 'coat = 外套', knowledgePoints: ['vocabulary'] },
  { id: 'en-6-1-7', subject: 'english', unit: 6, lesson: 1, type: 'choice', difficulty: 2, content: '—Whose socks are these? —They are ______.', options: ['mine', 'my', 'I', 'me'], answer: 'mine', analysis: 'mine = my socks，名词性物主代词后面不加名词。', knowledgePoints: ['grammar'] },
  { id: 'en-6-1-8', subject: 'english', unit: 6, lesson: 1, type: 'judge', difficulty: 1, content: 'snowman的复数形式是snowmen。', options: ['正确', '错误'], answer: '正确', analysis: 'man变men，snowman变snowmen。', knowledgePoints: ['grammar'] },
]
