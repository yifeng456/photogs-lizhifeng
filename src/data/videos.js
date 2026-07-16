/**
 * 视频静态数据
 *
 * 视频托管方案：Bilibili（B站）
 *   1. 将视频上传到 Bilibili（https://member.bilibili.com）
 *   2. 发布后获取视频的 BV 号（地址栏：https://www.bilibili.com/video/BVxxxxxxxxxx）
 *   3. 将 BV 号填入下方数据中
 *
 * 数据结构说明：
 * - id：唯一标识
 * - title：视频标题
 * - description：视频简介
 * - thumbnail：封面图路径（放 public/photos/thumbnails/ 下，或使用外部图片链接）
 * - bvid：B站视频 BV 号（用于 iframe 嵌入播放）
 * - duration：视频时长（如 "3:25"）
 * - date：拍摄/上传日期
 * - tags：标签数组
 * - featured：是否在首页精选展示
 *
 * B站嵌入格式：
 *   https://player.bilibili.com/player.html?bvid=BVxxxxxxxxxx&page=1&autoplay=0
 *
 * ⚠️ 当前使用 B站公开视频的 BV 号作为示例，替换为你的视频时：
 *    1. 在 B站上传视频
 *    2. 替换 bvid、thumbnail、title 等字段
 */
export const videos = [
  {
    id: 1,
    title: '川西星空延时',
    description: '贡嘎雪山下的银河延时摄影，一夜之间记录整个星空的流转',
    thumbnail: 'https://picsum.photos/seed/video1/800/450',
    bvid: 'BV1GJ411x7h7',   // 示例：B站 4K 测试视频，替换为你的真实 BV 号
    duration: '3:25',
    date: '2025-08-15',
    tags: ['延时摄影', '星空', '川西', '银河'],
    featured: true
  },
  {
    id: 2,
    title: '城市光影日记',
    description: '穿梭在上海的大街小巷，用镜头记录城市的日夜光影变幻',
    thumbnail: 'https://picsum.photos/seed/video2/800/450',
    bvid: 'BV1GJ411x7h7',
    duration: '5:12',
    date: '2025-09-20',
    tags: ['城市', '光影', '上海', '街拍'],
    featured: false
  },
  {
    id: 3,
    title: '秋色物语',
    description: '秋天的北京，银杏金黄，红叶如火，最美的季节就此定格',
    thumbnail: 'https://picsum.photos/seed/video3/800/450',
    bvid: 'BV1GJ411x7h7',
    duration: '2:48',
    date: '2025-11-01',
    tags: ['秋天', '银杏', '红叶', '北京'],
    featured: true
  },
  {
    id: 4,
    title: '摄影后期教程：Lightroom 基础调色',
    description: '从零开始教你用 LR 给风光照片调出高级感色彩',
    thumbnail: 'https://picsum.photos/seed/video4/800/450',
    bvid: 'BV1GJ411x7h7',
    duration: '12:36',
    date: '2025-10-10',
    tags: ['教程', 'Lightroom', '后期', '调色'],
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
