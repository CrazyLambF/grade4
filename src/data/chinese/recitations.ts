// 语文必背内容数据

export interface RecitationItem {
  id: string
  title: string
  author: string
  dynasty?: string
  type: 'poetry' | 'text'
  content: string
  keySentences: string[]
  translation?: string
  background?: string        // 创作背景
  difficulty: 1 | 2 | 3      // 难度：1简单 2中等 3困难
  stars: number              // 背诵星数（满分3）
}

// 必背古诗和文言文
export const chineseRecitations: RecitationItem[] = [
  {
    id: 'rec-mjy',
    title: '暮江吟',
    author: '白居易',
    dynasty: '唐',
    type: 'poetry',
    content: '一道残阳铺水中，半江瑟瑟半江红。\n可怜九月初三夜，露似真珠月似弓。',
    keySentences: ['一道残阳铺水中', '半江瑟瑟半江红', '露似真珠月似弓'],
    translation: '夕阳余辉铺在江面，江水一半碧绿一半通红。最可爱的是九月初三夜晚，露水像珍珠月亮像弯弓。',
    background: '白居易赴任杭州途中，傍晚在江边所见美景，写下了这首描写江边落日的名篇。',
    difficulty: 1,
    stars: 0,
  },
  {
    id: 'rec-tslb',
    title: '题西林壁',
    author: '苏轼',
    dynasty: '宋',
    type: 'poetry',
    content: '横看成岭侧成峰，远近高低各不同。\n不识庐山真面目，只缘身在此山中。',
    keySentences: ['横看成岭侧成峰', '不识庐山真面目', '只缘身在此山中'],
    translation: '正面看是岭侧面看是峰，远近高低各不同。看不清庐山真面目，只因身在此山中。',
    background: '苏轼游庐山后题写在西林寺墙壁上，借观山感悟"当局者迷"的哲理。',
    difficulty: 2,
    stars: 0,
  },
  {
    id: 'rec-xm',
    title: '雪梅',
    author: '卢钺',
    dynasty: '宋',
    type: 'poetry',
    content: '梅雪争春未肯降，骚人阁笔费评章。\n梅须逊雪三分白，雪却输梅一段香。',
    keySentences: ['梅雪争春未肯降', '梅须逊雪三分白', '雪却输梅一段香'],
    translation: '梅花不如雪白，雪不如梅花香。各有所长各有所短。',
    background: '诗人以梅雪争春为喻，说明事物各有所长也各有所短，富有哲理。',
    difficulty: 2,
    stars: 0,
  },
  {
    id: 'rec-cs',
    title: '出塞',
    author: '王昌龄',
    dynasty: '唐',
    type: 'poetry',
    content: '秦时明月汉时关，万里长征人未还。\n但使龙城飞将在，不教胡马度阴山。',
    keySentences: ['秦时明月汉时关', '但使龙城飞将在', '不教胡马度阴山'],
    translation: '只要有飞将军在，就不会让敌人越过阴山。',
    background: '王昌龄边塞诗代表作，借汉代飞将军李广，表达对良将的渴望和保家卫国的决心。',
    difficulty: 3,
    stars: 0,
  },
  {
    id: 'rec-lzc',
    title: '凉州词',
    author: '王翰',
    dynasty: '唐',
    type: 'poetry',
    content: '葡萄美酒夜光杯，欲饮琵琶马上催。\n醉卧沙场君莫笑，古来征战几人回？',
    keySentences: ['葡萄美酒夜光杯', '醉卧沙场君莫笑', '古来征战几人回'],
    translation: '美酒倒满夜光杯，琵琶声催促出征。醉倒沙场不要笑，自古征战几人回。',
    background: '王翰描写边塞将士出征前豪饮的场景，豪迈中透着悲壮。',
    difficulty: 3,
    stars: 0,
  },
  {
    id: 'rec-xrjj',
    title: '夏日绝句',
    author: '李清照',
    dynasty: '宋',
    type: 'poetry',
    content: '生当作人杰，死亦为鬼雄。\n至今思项羽，不肯过江东。',
    keySentences: ['生当作人杰', '死亦为鬼雄', '不肯过江东'],
    translation: '活着要做杰出的人，死了也要当英雄。至今思念项羽，宁死不退回江东。',
    background: '李清照借赞美项羽宁死不辱，讽刺南宋朝廷偏安一隅、不思收复中原。',
    difficulty: 2,
    stars: 0,
  },
  {
    id: 'rec-jwhh',
    title: '精卫填海',
    author: '《山海经》',
    type: 'text',
    content: '炎帝之少女，名曰女娃。女娃游于东海，溺而不返，故为精卫，常衔西山之木石，以堙于东海。',
    keySentences: ['炎帝之少女', '名曰女娃', '故为精卫', '常衔西山之木石'],
    translation: '炎帝小女儿女娃在东海溺亡，化为精卫鸟，常衔西山木石填东海。',
    background: '出自《山海经·北山经》，讲述炎帝之女化为精卫鸟衔石填海的故事，象征不屈不挠的精神。',
    difficulty: 2,
    stars: 0,
  },
  {
    id: 'rec-wrng',
    title: '王戎不取道旁李',
    author: '《世说新语》',
    type: 'text',
    content: '王戎七岁，尝与诸小儿游。看道边李树多子折枝，诸儿竞走取之，唯戎不动。人问之，答曰："树在道边而多子，此必苦李。"取之，信然。',
    keySentences: ['尝与诸小儿游', '诸儿竞走取之', '唯戎不动', '此必苦李'],
    translation: '王戎七岁时看到路边李树果实多，别人争着摘，他不动，说路边果多必是苦李。果然如此。',
    background: '出自《世说新语·雅量》，七岁王戎善于观察思考，以理推断"道旁苦李"。',
    difficulty: 3,
    stars: 0,
  },
]
