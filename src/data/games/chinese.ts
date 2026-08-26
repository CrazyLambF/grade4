// 语文游戏题库

// 古诗背诵填字 — 四上必背古诗
export const poetryFillData = [
  { poem: '一道残阳铺水中，半江瑟瑟半江红。', title: '暮江吟', author: '白居易', blanks: [
    { text: '残阳', hint: '落日余晖' },
    { text: '瑟瑟', hint: '碧绿色' },
    { text: '红', hint: '红色' },
  ]},
  { poem: '不识庐山真面目，只缘身在此山中。', title: '题西林壁', author: '苏轼', blanks: [
    { text: '庐山', hint: '山名' },
    { text: '面目', hint: '真实面貌' },
    { text: '缘', hint: '因为' },
  ]},
  { poem: '梅须逊雪三分白，雪却输梅一段香。', title: '雪梅', author: '卢钺', blanks: [
    { text: '逊', hint: '不及' },
    { text: '输', hint: '不如' },
    { text: '香', hint: '香味' },
  ]},
  { poem: '但使龙城飞将在，不教胡马度阴山。', title: '出塞', author: '王昌龄', blanks: [
    { text: '龙城', hint: '地名' },
    { text: '飞将', hint: '飞将军李广' },
    { text: '阴山', hint: '山名' },
  ]},
  { poem: '葡萄美酒夜光杯，欲饮琵琶马上催。', title: '凉州词', author: '王翰', blanks: [
    { text: '葡萄', hint: '水果' },
    { text: '夜光杯', hint: '发光的酒杯' },
    { text: '琵琶', hint: '乐器' },
  ]},
  { poem: '生当作人杰，死亦为鬼雄。', title: '夏日绝句', author: '李清照', blanks: [
    { text: '人杰', hint: '英雄豪杰' },
    { text: '鬼雄', hint: '鬼中英雄' },
  ]},
]

// 快问快答 — 文学常识
export const chineseQAData = [
  { q: '《观潮》的作者是？', options: ['赵宗成', '巴金', '老舍', '冰心'], answer: '赵宗成' },
  { q: '《繁星》的作者是？', options: ['冰心', '巴金', '老舍', '鲁迅'], answer: '巴金' },
  { q: '《爬山虎的脚》的作者是？', options: ['叶圣陶', '巴金', '老舍', '冰心'], answer: '叶圣陶' },
  { q: '《蟋蟀的住宅》的作者是哪国人？', options: ['英国', '法国', '美国', '德国'], answer: '法国' },
  { q: '《题西林壁》的作者是？', options: ['李白', '苏轼', '白居易', '卢钺'], answer: '苏轼' },
  { q: '"人声鼎沸"中"鼎"的意思是？', options: ['古代器具', '大声', '人多', '水开'], answer: '古代器具' },
  { q: '《精卫填海》出自哪部书？', options: ['《山海经》', '《西游记》', '《搜神记》', '《聊斋》'], answer: '《山海经》' },
  { q: '普罗米修斯是哪个神话的人物？', options: ['中国神话', '希腊神话', '埃及神话', '北欧神话'], answer: '希腊神话' },
  { q: '《暮江吟》的作者是？', options: ['白居易', '苏轼', '卢钺', '李白'], answer: '白居易' },
  { q: '《夏日绝句》赞美了谁？', options: ['刘邦', '项羽', '韩信', '张良'], answer: '项羽' },
  { q: '《出塞》的作者是？', options: ['王昌龄', '王翰', '李白', '杜甫'], answer: '王昌龄' },
  { q: '法布尔的代表作是？', options: ['《昆虫记》', '《自然史》', '《物种起源》', '《本草纲目》'], answer: '《昆虫记》' },
]

// 成语接龙 — 给出成语，选能接上的
export const idiomChainData = [
  { current: '一心一意', options: ['意气风发', '全心全意', '三心二意', '心猿意马'], answer: '意气风发' },
  { current: '画蛇添足', options: ['足智多谋', '画龙点睛', '蛇鼠一窝', '添砖加瓦'], answer: '足智多谋' },
  { current: '胸有成竹', options: ['竹报平安', '成竹在胸', '心事重重', '有备无患'], answer: '竹报平安' },
  { current: '手到擒来', options: ['来日方长', '擒贼擒王', '手忙脚乱', '到头一场空'], answer: '来日方长' },
  { current: '海阔天空', options: ['空前绝后', '阔步前进', '天高地厚', '海纳百川'], answer: '空前绝后' },
  { current: '光明正大', options: ['大公无私', '明察秋毫', '正大光明', '大有作为'], answer: '大公无私' },
  { current: '马到成功', options: ['功德无量', '到任视事', '成功在望', '马不停蹄'], answer: '功德无量' },
  { current: '言而有信', options: ['信以为真', '而言之有', '而有此理', '言出必行'], answer: '信以为真' },
  { current: '风和日丽', options: ['丽日当空', '和风细雨', '日丽风和', '风平浪静'], answer: '丽日当空' },
  { current: '学而不厌', options: ['厌难折冲', '而不思则罔', '学无止境', '不耻下问'], answer: '厌难折冲' },
]

// 词语消消乐 — 近义词/反义词配对
export const wordMatchData = [
  { left: '美丽', right: '漂亮（近义词）', pair: 1 },
  { left: '巨大', right: '庞大（近义词）', pair: 2 },
  { left: '安静', right: '喧闹（反义词）', pair: 3 },
  { left: '快乐', right: '悲伤（反义词）', pair: 4 },
  { left: '勇敢', right: '胆小（反义词）', pair: 5 },
  { left: '聪明', right: '智慧（近义词）', pair: 6 },
]
