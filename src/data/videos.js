/**
 * 视频静态数据
 *
 * 上传步骤：
 *   1. 将视频上传到 Bilibili（https://member.bilibili.com）
 *   2. 发布后获取视频的 BV 号（地址栏：https://www.bilibili.com/video/BVxxxxxxxxxx）
 *   3. 将 BV 号填入对应视频的 bvid 字段
 *
 * 数据结构说明：
 * - id：唯一标识
 * - title：视频标题
 * - description：视频简介
 * - thumbnail：封面图（建议上传视频时在B站截取封面，填入图片链接）
 * - bvid：B站视频 BV 号（上传后填写）
 * - duration：视频时长（请手动填写）
 * - date：上传日期
 * - tags：标签数组
 * - featured：是否在首页精选展示
 *
 * ⚠️ bvid 需要到 B站上传视频后才能获取，目前为空
 * ⚠️ thumbnail 封面图建议在 B站上传后从视频截取
 */
export const videos = [
  {
    id: 1,
    title: '旅拍快剪',
    description: '旅途中的精彩瞬间，快节奏剪辑',
    thumbnail: '',
    bvid: 'BV1diKV62E1G',
    duration: '',
    date: '2025-07-16',
    tags: ['旅拍', '快剪', '混剪'],
    featured: true
  },
  {
    id: 2,
    title: '旅拍素材剪辑',
    description: '旅途拍摄素材精彩合集',
    thumbnail: '',
    bvid: 'BV1RBKV6LEyA',
    duration: '',
    date: '2025-07-16',
    tags: ['旅拍', '素材', '合集'],
    featured: true
  },
  {
    id: 3,
    title: '影视飓风素材成片-旅片混剪',
    description: '影视飓风风格旅拍混剪',
    thumbnail: '',
    bvid: 'BV1jiKV6mETD',
    duration: '',
    date: '2025-06-23',
    tags: ['旅拍', '混剪', '影视飓风'],
    featured: false
  },
  {
    id: 4,
    title: '影视飓风素材成片-Mac测评',
    description: 'Mac相关产品测评视频',
    thumbnail: '',
    bvid: 'BV1LBKV6jEg2',
    duration: '',
    date: '2025-06-23',
    tags: ['测评', 'Mac', '科技'],
    featured: false
  },
  {
    id: 5,
    title: '公司年会拍剪一条龙',
    description: '公司年会全程拍摄与剪辑',
    thumbnail: '',
    bvid: 'BV1LiKV6mEQW',
    duration: '',
    date: '2025-07-16',
    tags: ['年会', '活动', '商业'],
    featured: false
  },
  {
    id: 6,
    title: '公司晚会素材剪辑-含AI生成视频',
    description: '公司晚会素材剪辑，包含AI生成视频片段',
    thumbnail: '',
    bvid: '',
    duration: '',
    date: '2025-07-16',
    tags: ['晚会', 'AI', '商业', '剪辑'],
    featured: false
  },
]

/** B站嵌入 URL 生成 */
export function getBilibiliEmbedUrl(bvid) {
  return `//player.bilibili.com/player.html?bvid=${bvid}&page=1&autoplay=0&danmaku=0`
}

/** 根据 ID 获取视频 */
export function getVideoById(id) {
  return videos.find(v => v.id === Number(id)) || null
}
