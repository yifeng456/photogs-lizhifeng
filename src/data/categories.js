/**
 * 分类配置
 * 每个分类包含 key（路由标识）、label（中文名）、icon（emoji图标）、description（描述）
 */
export const categories = [
  {
    key: 'all',
    label: '全部作品',
    icon: '📷',
    description: '所有摄影作品'
  },
  {
    key: 'landscape',
    label: '风光',
    icon: '🏔️',
    description: '山川湖海、日出日落，记录大自然的壮美'
  },
  {
    key: 'street',
    label: '街拍',
    icon: '🚶',
    description: '城市街头、人文纪实，捕捉生活的瞬间'
  },
  {
    key: 'portrait',
    label: '人像',
    icon: '👤',
    description: '人物肖像、情绪写真，定格光影中的面孔'
  },
  {
    key: 'night',
    label: '夜景',
    icon: '🌃',
    description: '华灯初上、星河璀璨，夜色中的光影故事'
  }
]

/** 根据 key 获取分类信息 */
export function getCategory(key) {
  return categories.find(c => c.key === key) || categories[0]
}
