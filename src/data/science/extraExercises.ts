import type { Question } from '@/types'

export const scienceExtraExercises: Question[] = [
  // ===== 第一单元 空气 =====
  // 第1课 感受空气
  { id: 'sc-1-1-3', subject: 'science', unit: 1, lesson: 1, type: 'fill', difficulty: 1, content: '空气是______、______、透明的气体。', answer: ['无色', '无味'], analysis: '空气无色无味透明。', knowledgePoints: ['空气特征'] },
  { id: 'sc-1-1-4', subject: 'science', unit: 1, lesson: 1, type: 'fill', difficulty: 2, content: '空气没有固定的______，会______。', answer: ['形状', '流动'], analysis: '空气是气体，没有固定形状会流动。', knowledgePoints: ['空气特征'] },
  { id: 'sc-1-1-5', subject: 'science', unit: 1, lesson: 1, type: 'judge', difficulty: 1, content: '空气看不见摸不着，所以不存在。', options: ['正确', '错误'], answer: '错误', analysis: '空气真实存在，只是看不见。', knowledgePoints: ['空气存在'] },
  { id: 'sc-1-1-6', subject: 'science', unit: 1, lesson: 1, type: 'choice', difficulty: 2, content: '下列哪个说明空气会流动？', options: ['气球鼓起', '风吹动树叶', '空气有质量', '空气透明'], answer: '风吹动树叶', analysis: '风就是空气流动形成的。', knowledgePoints: ['空气流动'] },
  // 第2课 空气能占据空间吗
  { id: 'sc-1-2-3', subject: 'science', unit: 1, lesson: 2, type: 'fill', difficulty: 1, content: '空气和固体、液体一样，能______空间。', answer: '占据', analysis: '空气能占据空间。', knowledgePoints: ['空气占据空间'] },
  { id: 'sc-1-2-4', subject: 'science', unit: 1, lesson: 2, type: 'fill', difficulty: 2, content: '杯子竖直倒扣入水中，杯底纸团不湿，是因为______占据了杯内空间。', answer: '空气', analysis: '杯内空气占据空间挡住水。', knowledgePoints: ['空气占据空间'] },
  { id: 'sc-1-2-5', subject: 'science', unit: 1, lesson: 2, type: 'choice', difficulty: 2, content: '倾斜倒扣的杯子会看到什么现象？', options: ['没有变化', '水中有气泡冒出，水进入杯中', '纸团湿了但没气泡', '杯子碎了'], answer: '水中有气泡冒出，水进入杯中', analysis: '倾斜时空气排出（冒泡），水进入杯中。', knowledgePoints: ['空气占据空间'] },
  // 第3课 空气占据的空间会改变吗
  { id: 'sc-1-3-3', subject: 'science', unit: 1, lesson: 3, type: 'fill', difficulty: 2, content: '空气可以被______，也可以被______，占据的空间会改变。', answer: ['压缩', '扩张'], analysis: '空气可压缩可扩张。', knowledgePoints: ['空气可压缩'] },
  { id: 'sc-1-3-4', subject: 'science', unit: 1, lesson: 3, type: 'fill', difficulty: 1, content: '水几乎不能被______，空气可以被______。', answer: ['压缩', '压缩'], analysis: '水不能压缩，空气可以压缩。', knowledgePoints: ['空气可压缩'] },
  { id: 'sc-1-3-5', subject: 'science', unit: 1, lesson: 3, type: 'choice', difficulty: 2, content: '压缩后的空气有什么特点？', options: ['有弹性', '变颜色', '变味道', '消失'], answer: '有弹性', analysis: '压缩空气有弹性，松手恢复。', knowledgePoints: ['空气弹性'] },
  { id: 'sc-1-3-6', subject: 'science', unit: 1, lesson: 3, type: 'judge', difficulty: 2, content: '水和空气一样都能被压缩。', options: ['正确', '错误'], answer: '错误', analysis: '水几乎不能被压缩，空气可以。', knowledgePoints: ['空气可压缩'] },
  // 第4课 空气有质量吗
  { id: 'sc-1-4-3', subject: 'science', unit: 1, lesson: 4, type: 'fill', difficulty: 2, content: '空气虽然很轻，但确实有______。', answer: '质量', analysis: '空气有质量。', knowledgePoints: ['空气有质量'] },
  { id: 'sc-1-4-4', subject: 'science', unit: 1, lesson: 4, type: 'fill', difficulty: 2, content: '充气后的篮球比没气时______（填"重"或"轻"）。', answer: '重', analysis: '充入空气后质量增加变重。', knowledgePoints: ['空气有质量'] },
  { id: 'sc-1-4-5', subject: 'science', unit: 1, lesson: 4, type: 'choice', difficulty: 2, content: '两个气球分别充气和未充气，放在天平两边，天平怎样？', options: ['平衡', '充气一侧下沉', '未充气一侧下沉', '无法判断'], answer: '充气一侧下沉', analysis: '充气后气球变重，天平向充气侧倾斜。', knowledgePoints: ['空气有质量'] },
  // 第5课 空气流动有力量
  { id: 'sc-1-5-3', subject: 'science', unit: 1, lesson: 5, type: 'fill', difficulty: 1, content: '空气流动时会产生______。', answer: '力量', analysis: '空气流动产生力量。', knowledgePoints: ['空气流动'] },
  { id: 'sc-1-5-4', subject: 'science', unit: 1, lesson: 5, type: 'fill', difficulty: 2, content: '风力发电利用的是空气流动的______。', answer: '力量', analysis: '风力发电利用空气流动的力量。', knowledgePoints: ['空气流动应用'] },
  { id: 'sc-1-5-5', subject: 'science', unit: 1, lesson: 5, type: 'choice', difficulty: 2, content: '下列哪个不是空气流动的应用？', options: ['风力发电', '帆船航行', '风车磨面', '烧开水'], answer: '烧开水', analysis: '烧开水是热能不是风力应用。', knowledgePoints: ['空气流动应用'] },
  // 第6课 我们来做"热气球"
  { id: 'sc-1-6-3', subject: 'science', unit: 1, lesson: 6, type: 'fill', difficulty: 2, content: '热空气比冷空气______，会向______运动。', answer: ['轻', '上'], analysis: '热空气比冷空气轻，向上运动。', knowledgePoints: ['热空气上升'] },
  { id: 'sc-1-6-4', subject: 'science', unit: 1, lesson: 6, type: 'fill', difficulty: 1, content: '热气球是利用______上升的原理升空的。', answer: '热空气', analysis: '热气球利用热空气上升原理。', knowledgePoints: ['热气球原理'] },
  { id: 'sc-1-6-5', subject: 'science', unit: 1, lesson: 6, type: 'choice', difficulty: 2, content: '厨房里热气向哪个方向飘？', options: ['向下', '向上', '向左', '向右'], answer: '向上', analysis: '热空气轻，向上运动。', knowledgePoints: ['热空气上升'] },
  { id: 'sc-1-6-6', subject: 'science', unit: 1, lesson: 6, type: 'judge', difficulty: 1, content: '暖气片通常装在房间下方，是因为热空气会上升。', options: ['正确', '错误'], answer: '正确', analysis: '热空气上升使全屋温暖。', knowledgePoints: ['热空气上升'] },
  // 第7课 风的成因
  { id: 'sc-1-7-3', subject: 'science', unit: 1, lesson: 7, type: 'fill', difficulty: 2, content: '风是由______对流形成的。', answer: '冷热空气', analysis: '冷热空气对流形成风。', knowledgePoints: ['风的成因'] },
  { id: 'sc-1-7-4', subject: 'science', unit: 1, lesson: 7, type: 'fill', difficulty: 2, content: '热空气上升后，______会流来补充，形成风。', answer: '冷空气', analysis: '热空气上升后冷空气流来补充。', knowledgePoints: ['风的成因'] },
  { id: 'sc-1-7-5', subject: 'science', unit: 1, lesson: 7, type: 'choice', difficulty: 2, content: '海边白天风通常从哪个方向吹来？', options: ['从陆地吹向海洋', '从海洋吹向陆地', '从上吹向下', '没有风'], answer: '从海洋吹向陆地', analysis: '白天陆地升温快热空气上升，海洋空气流来。', knowledgePoints: ['风的成因'] },
  // 第8课 自制打气筒
  { id: 'sc-1-8-3', subject: 'science', unit: 1, lesson: 8, type: 'fill', difficulty: 2, content: '打气筒是利用空气______的性质工作的。', answer: '可压缩', analysis: '打气筒利用空气可压缩性。', knowledgePoints: ['打气筒原理'] },
  { id: 'sc-1-8-4', subject: 'science', unit: 1, lesson: 8, type: 'fill', difficulty: 2, content: '打气筒中的______阀控制气流只往一个方向流动。', answer: '单向', analysis: '单向阀控制气流方向。', knowledgePoints: ['打气筒原理'] },
  { id: 'sc-1-8-5', subject: 'science', unit: 1, lesson: 8, type: 'choice', difficulty: 2, content: '打气筒推活塞时空气会怎样？', options: ['从进气口吸入', '被压缩从出气口排出', '消失', '变颜色'], answer: '被压缩从出气口排出', analysis: '推活塞压缩空气，从出气口排出。', knowledgePoints: ['打气筒原理'] },

  // ===== 第二单元 呼吸与消化 =====
  // 第1课 我们的呼吸与消化
  { id: 'sc-2-1-3', subject: 'science', unit: 2, lesson: 1, type: 'fill', difficulty: 1, content: '人体呼吸吸入______，呼出______。', answer: ['氧气', '二氧化碳'], analysis: '吸入氧气呼出二氧化碳。', knowledgePoints: ['呼吸'] },
  { id: 'sc-2-1-4', subject: 'science', unit: 2, lesson: 1, type: 'fill', difficulty: 2, content: '食物消化是为了给身体提供______。', answer: '营养', analysis: '消化吸收营养为身体供能。', knowledgePoints: ['消化'] },
  { id: 'sc-2-1-5', subject: 'science', unit: 2, lesson: 1, type: 'judge', difficulty: 1, content: '呼吸和消化都是维持生命的重要活动。', options: ['正确', '错误'], answer: '正确', analysis: '呼吸供氧消化供营养，都是生命活动。', knowledgePoints: ['呼吸与消化'] },
  // 第2课 认识呼吸器官
  { id: 'sc-2-2-3', subject: 'science', unit: 2, lesson: 2, type: 'fill', difficulty: 2, content: '呼吸器官的顺序：鼻腔→咽→喉→气管→支气管→______。', answer: '肺', analysis: '空气最终进入肺。', knowledgePoints: ['呼吸器官'] },
  { id: 'sc-2-2-4', subject: 'science', unit: 2, lesson: 2, type: 'fill', difficulty: 1, content: '人体主要的呼吸器官是______。', answer: '肺', analysis: '肺是主要呼吸器官。', knowledgePoints: ['呼吸器官'] },
  { id: 'sc-2-2-5', subject: 'science', unit: 2, lesson: 2, type: 'fill', difficulty: 2, content: '人呼出的气体中含有较多的______。', answer: '二氧化碳', analysis: '呼出二氧化碳。', knowledgePoints: ['呼吸'] },
  { id: 'sc-2-2-6', subject: 'science', unit: 2, lesson: 2, type: 'judge', difficulty: 2, content: '胃是呼吸器官。', options: ['正确', '错误'], answer: '错误', analysis: '胃是消化器官不是呼吸器官。', knowledgePoints: ['呼吸器官'] },
  // 第3课 呼吸的变化
  { id: 'sc-2-3-3', subject: 'science', unit: 2, lesson: 3, type: 'fill', difficulty: 2, content: '运动时呼吸会______，休息时呼吸会______。', answer: ['变快', '变慢'], analysis: '运动时呼吸加快休息时变慢。', knowledgePoints: ['呼吸变化'] },
  { id: 'sc-2-3-4', subject: 'science', unit: 2, lesson: 3, type: 'fill', difficulty: 2, content: '运动时身体需要更多的______，所以呼吸加快。', answer: '氧气', analysis: '运动需要更多氧气所以呼吸加快。', knowledgePoints: ['呼吸变化'] },
  { id: 'sc-2-3-5', subject: 'science', unit: 2, lesson: 3, type: 'choice', difficulty: 2, content: '安静状态下每分钟大约呼吸多少次？', options: ['约5次', '约20次', '约50次', '约100次'], answer: '约20次', analysis: '安静时每分钟约呼吸20次。', knowledgePoints: ['呼吸变化'] },
  // 第4课 测量肺活量
  { id: 'sc-2-4-3', subject: 'science', unit: 2, lesson: 4, type: 'fill', difficulty: 2, content: '肺活量是指一次尽力吸气后再尽力呼出的______总量。', answer: '气体', analysis: '肺活量是一次最大呼气量。', knowledgePoints: ['肺活量'] },
  { id: 'sc-2-4-4', subject: 'science', unit: 2, lesson: 4, type: 'fill', difficulty: 2, content: '经常______可以增大肺活量。', answer: '运动', analysis: '运动增大肺活量。', knowledgePoints: ['肺活量'] },
  { id: 'sc-2-4-5', subject: 'science', unit: 2, lesson: 4, type: 'judge', difficulty: 1, content: '肺活量越大通常身体越好。', options: ['正确', '错误'], answer: '正确', analysis: '肺活量大通常说明心肺功能好。', knowledgePoints: ['肺活量'] },
  // 第5课 口腔里的消化
  { id: 'sc-2-5-3', subject: 'science', unit: 2, lesson: 5, type: 'fill', difficulty: 2, content: '口腔中牙齿能______食物，唾液能初步消化。', answer: '咀嚼', analysis: '牙齿咀嚼食物。', knowledgePoints: ['口腔消化'] },
  { id: 'sc-2-5-4', subject: 'science', unit: 2, lesson: 5, type: 'fill', difficulty: 2, content: '馒头嚼久了有甜味，是因为唾液分解了______。', answer: '淀粉', analysis: '唾液中的酶分解淀粉为糖。', knowledgePoints: ['唾液作用'] },
  { id: 'sc-2-5-5', subject: 'science', unit: 2, lesson: 5, type: 'fill', difficulty: 1, content: '食物消化的第一站是______。', answer: '口腔', analysis: '口腔咀嚼是消化第一步。', knowledgePoints: ['口腔消化'] },
  { id: 'sc-2-5-6', subject: 'science', unit: 2, lesson: 5, type: 'judge', difficulty: 2, content: '口腔只是嚼碎食物，不参与消化。', options: ['正确', '错误'], answer: '错误', analysis: '口腔中唾液也在进行初步消化。', knowledgePoints: ['口腔消化'] },
  // 第6课 胃和小肠里的消化
  { id: 'sc-2-6-3', subject: 'science', unit: 2, lesson: 6, type: 'fill', difficulty: 2, content: '胃能分泌______帮助消化食物。', answer: '胃酸', analysis: '胃酸帮助消化。', knowledgePoints: ['胃的功能'] },
  { id: 'sc-2-6-4', subject: 'science', unit: 2, lesson: 6, type: 'fill', difficulty: 2, content: '吸收营养最主要的器官是______。', answer: '小肠', analysis: '小肠吸收大部分营养。', knowledgePoints: ['小肠'] },
  { id: 'sc-2-6-5', subject: 'science', unit: 2, lesson: 6, type: 'fill', difficulty: 2, content: '小肠内壁有______，可以增加吸收面积。', answer: '绒毛', analysis: '小肠绒毛增加吸收面积。', knowledgePoints: ['小肠'] },
  { id: 'sc-2-6-6', subject: 'science', unit: 2, lesson: 6, type: 'judge', difficulty: 2, content: '胃的主要功能是吸收营养。', options: ['正确', '错误'], answer: '错误', analysis: '胃的功能是磨碎食物暂时储存，小肠才吸收营养。', knowledgePoints: ['胃的功能'] },
  // 第7课 食物在身体里的旅行
  { id: 'sc-2-7-3', subject: 'science', unit: 2, lesson: 7, type: 'fill', difficulty: 2, content: '消化顺序：口腔→______→胃→______→大肠。', answer: ['食道', '小肠'], analysis: '消化顺序：口腔→食道→胃→小肠→大肠。', knowledgePoints: ['消化顺序'] },
  { id: 'sc-2-7-4', subject: 'science', unit: 2, lesson: 7, type: 'fill', difficulty: 2, content: '大肠的主要功能是吸收______形成粪便。', answer: '水分', analysis: '大肠吸收水分形成粪便。', knowledgePoints: ['大肠'] },
  { id: 'sc-2-7-5', subject: 'science', unit: 2, lesson: 7, type: 'choice', difficulty: 2, content: '食道的作用是什么？', options: ['咀嚼食物', '输送食物到胃', '吸收营养', '形成粪便'], answer: '输送食物到胃', analysis: '食道输送食物到胃。', knowledgePoints: ['消化顺序'] },
  // 第8课 呵护我们的器官
  { id: 'sc-2-8-3', subject: 'science', unit: 2, lesson: 8, type: 'fill', difficulty: 2, content: '保护呼吸器官应该不______、远离污染空气。', answer: '吸烟', analysis: '不吸烟保护肺。', knowledgePoints: ['保护器官'] },
  { id: 'sc-2-8-4', subject: 'science', unit: 2, lesson: 8, type: 'fill', difficulty: 2, content: '保护消化器官应该______、定时定量、均衡饮食。', answer: '细嚼慢咽', analysis: '细嚼慢咽保护消化器官。', knowledgePoints: ['保护器官'] },
  { id: 'sc-2-8-5', subject: 'science', unit: 2, lesson: 8, type: 'judge', difficulty: 1, content: '暴饮暴食会伤害消化器官。', options: ['正确', '错误'], answer: '正确', analysis: '暴饮暴食伤害胃和消化器官。', knowledgePoints: ['保护器官'] },
  { id: 'sc-2-8-6', subject: 'science', unit: 2, lesson: 8, type: 'choice', difficulty: 2, content: '雾霾天应该怎样保护呼吸器官？', options: ['不戴口罩外出', '戴口罩减少吸入污染物', '开窗通风', '在户外运动'], answer: '戴口罩减少吸入污染物', analysis: '雾霾天戴口罩保护呼吸器官。', knowledgePoints: ['保护器官'] },

  // ===== 第三单元 声音 =====
  // 第1课 声音是怎样产生的
  { id: 'sc-3-1-3', subject: 'science', unit: 3, lesson: 1, type: 'fill', difficulty: 1, content: '声音是由物体的______产生的。', answer: '振动', analysis: '物体振动产生声音。', knowledgePoints: ['声音产生'] },
  { id: 'sc-3-1-4', subject: 'science', unit: 3, lesson: 1, type: 'fill', difficulty: 2, content: '物体振动停止，______也就停止。', answer: '发声', analysis: '振动停止发声停止。', knowledgePoints: ['声音产生'] },
  { id: 'sc-3-1-5', subject: 'science', unit: 3, lesson: 1, type: 'fill', difficulty: 2, content: '声音以______的形式向四周传播。', answer: '声波', analysis: '声音以波的形式传播。', knowledgePoints: ['声音传播'] },
  { id: 'sc-3-1-6', subject: 'science', unit: 3, lesson: 1, type: 'judge', difficulty: 1, content: '正在发声的物体一定在振动。', options: ['正确', '错误'], answer: '正确', analysis: '声音由振动产生。', knowledgePoints: ['声音产生'] },
  // 第2课 声音的强弱
  { id: 'sc-3-2-3', subject: 'science', unit: 3, lesson: 2, type: 'fill', difficulty: 2, content: '声音的强弱叫______，与物体的______有关。', answer: ['音量', '振幅'], analysis: '音量与振幅有关。', knowledgePoints: ['音量'] },
  { id: 'sc-3-2-4', subject: 'science', unit: 3, lesson: 2, type: 'fill', difficulty: 2, content: '敲鼓用力越大，鼓面振幅越大，______越大。', answer: '音量', analysis: '振幅大音量大。', knowledgePoints: ['音量与振幅'] },
  { id: 'sc-3-2-5', subject: 'science', unit: 3, lesson: 2, type: 'judge', difficulty: 2, content: '音量和音高是同一个概念。', options: ['正确', '错误'], answer: '错误', analysis: '音量是强弱，音高是高低。', knowledgePoints: ['音量与音高'] },
  // 第3课 声音的高低
  { id: 'sc-3-3-3', subject: 'science', unit: 3, lesson: 3, type: 'fill', difficulty: 2, content: '声音的高低叫______，与物体的______有关。', answer: ['音高', '振动频率'], analysis: '音高与振动频率有关。', knowledgePoints: ['音高'] },
  { id: 'sc-3-3-4', subject: 'science', unit: 3, lesson: 3, type: 'fill', difficulty: 2, content: '物体振动越快，声音的______越高。', answer: '音高', analysis: '频率越高音高越高。', knowledgePoints: ['音高'] },
  { id: 'sc-3-3-5', subject: 'science', unit: 3, lesson: 3, type: 'choice', difficulty: 2, content: '弹吉他时弦越细声音怎样？', options: ['音高越高', '音高越低', '音量越大', '音量越小'], answer: '音高越高', analysis: '细弦振动快频率高。', knowledgePoints: ['音高'] },
  // 第4课 乐器的声音变化
  { id: 'sc-3-4-3', subject: 'science', unit: 3, lesson: 4, type: 'fill', difficulty: 2, content: '弦乐器弦越______音高越高，弦越______音高越低。', answer: ['细', '粗'], analysis: '细弦振动快音高高。', knowledgePoints: ['乐器音高'] },
  { id: 'sc-3-4-4', subject: 'science', unit: 3, lesson: 4, type: 'fill', difficulty: 2, content: '管乐器空气柱越______音高越低。', answer: '长', analysis: '空气柱越长振动越慢音高低。', knowledgePoints: ['乐器音高'] },
  { id: 'sc-3-4-5', subject: 'science', unit: 3, lesson: 4, type: 'choice', difficulty: 2, content: '下列哪个属于弦乐器？', options: ['鼓', '笛子', '小提琴', '锣'], answer: '小提琴', analysis: '小提琴通过拨弦发声是弦乐器。', knowledgePoints: ['乐器分类'] },
  // 第5课 设计我们的乐器
  { id: 'sc-3-5-3', subject: 'science', unit: 3, lesson: 5, type: 'fill', difficulty: 2, content: '碗里装水越多，敲击时音高越______。', answer: '低', analysis: '水越多振动部分越短音高低。', knowledgePoints: ['乐器设计'] },
  { id: 'sc-3-5-4', subject: 'science', unit: 3, lesson: 5, type: 'choice', difficulty: 2, content: '设计乐器时需要考虑什么？', options: ['颜色', '音高范围', '重量', '价格'], answer: '音高范围', analysis: '设计乐器要考虑音高范围。', knowledgePoints: ['乐器设计'] },
  // 第6课 改进我们的乐器
  { id: 'sc-3-6-3', subject: 'science', unit: 3, lesson: 6, type: 'fill', difficulty: 2, content: '工程实践的过程是：设计→制作→______→改进。', answer: '测试', analysis: '工程实践需要测试后改进。', knowledgePoints: ['工程迭代'] },
  { id: 'sc-3-6-4', subject: 'science', unit: 3, lesson: 6, type: 'choice', difficulty: 2, content: '乐器音高不准应该怎样做？', options: ['扔掉重做', '微调使音高更准', '不管它', '换乐器'], answer: '微调使音高更准', analysis: '通过微调改善音高准确性。', knowledgePoints: ['乐器改进'] },
  // 第7课 声音的传播
  { id: 'sc-3-7-3', subject: 'science', unit: 3, lesson: 7, type: 'fill', difficulty: 1, content: '声音在______中传播最快，在______中最慢。', answer: ['固体', '气体'], analysis: '固体最快气体最慢。', knowledgePoints: ['传播速度'] },
  { id: 'sc-3-7-4', subject: 'science', unit: 3, lesson: 7, type: 'fill', difficulty: 2, content: '声音不能在______中传播。', answer: '真空', analysis: '真空没有介质不能传声。', knowledgePoints: ['声音传播'] },
  { id: 'sc-3-7-5', subject: 'science', unit: 3, lesson: 7, type: 'fill', difficulty: 2, content: '降噪可以在声源处、______和人耳处进行。', answer: '传播过程中', analysis: '三个环节降噪。', knowledgePoints: ['降噪'] },
  { id: 'sc-3-7-6', subject: 'science', unit: 3, lesson: 7, type: 'choice', difficulty: 2, content: '哪种方法不能减少噪音？', options: ['戴耳塞', '关窗', '调大音量', '装隔音板'], answer: '调大音量', analysis: '调大音量是增加噪音。', knowledgePoints: ['降噪'] },
  // 第8课 保护听力
  { id: 'sc-3-8-3', subject: 'science', unit: 3, lesson: 8, type: 'fill', difficulty: 2, content: '长期处于______环境中会损伤听力。', answer: '噪音', analysis: '噪音损伤听力。', knowledgePoints: ['噪音危害'] },
  { id: 'sc-3-8-4', subject: 'science', unit: 3, lesson: 8, type: 'fill', difficulty: 2, content: '听音乐时音量不要超过______%。', answer: '60', analysis: '音量不超过60%保护听力。', knowledgePoints: ['保护听力'] },
  { id: 'sc-3-8-5', subject: 'science', unit: 3, lesson: 8, type: 'choice', difficulty: 2, content: '下列哪种行为会损伤听力？', options: ['控制音量听音乐', '远离鞭炮', '长期大音量戴耳机', '戴耳塞防护'], answer: '长期大音量戴耳机', analysis: '长期大音量戴耳机损伤听力。', knowledgePoints: ['保护听力'] },
]
