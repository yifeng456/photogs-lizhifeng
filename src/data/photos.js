/**
 * 照片静态数据
 *
 * 数据结构说明：
 * - id：唯一标识
 * - title：作品标题
 * - description：作品描述
 * - category：分类 key（对应 categories.js 中的 key）
 * - src：原图路径（放 public/photos/ 下）
 * - thumbnail：缩略图路径（放 public/photos/thumbnails/ 下）
 * - width / height：原图尺寸（用于瀑布流计算纵横比）
 * - date：拍摄日期
 * - exif：拍摄参数（相机、镜头、光圈等）
 * - location：拍摄地点（名称 + GPS 坐标）
 * - tags：标签数组
 * - featured：是否在首页精选展示
 *
 * ⚠️ 当前使用 picsum.photos 占位图，替换为真实照片时：
 *    1. 将原图放入 public/photos/[category]/
 *    2. 生成缩略图放入 public/photos/thumbnails/
 *    3. 更新 src 和 thumbnail 路径
 */
export const photos = [
  // ===== 风光 =====
  {
    id: 1,
    title: '雪山晨光',
    description: '清晨第一缕阳光洒在雪山顶峰，金色的光芒与白雪交相辉映',
    category: 'landscape',
    src: 'https://picsum.photos/seed/landscape1/2400/1600',
    thumbnail: 'https://picsum.photos/seed/landscape1/600/400',
    width: 2400,
    height: 1600,
    date: '2025-10-15',
    exif: {
      camera: 'Sony A7M4',
      lens: 'FE 24-70mm F2.8 GM II',
      focalLength: '35mm',
      aperture: 'f/8',
      shutterSpeed: '1/250s',
      iso: 100
    },
    location: { name: '贡嘎雪山，四川', lat: 29.5958, lng: 101.8789 },
    tags: ['雪山', '日出', '川西', '风光'],
    featured: true
  },
  {
    id: 2,
    title: '日落湖畔',
    description: '夕阳西下，湖面倒映着金色的天空与远山轮廓',
    category: 'landscape',
    src: 'https://picsum.photos/seed/landscape2/2400/1600',
    thumbnail: 'https://picsum.photos/seed/landscape2/600/400',
    width: 2400,
    height: 1600,
    date: '2025-09-20',
    exif: {
      camera: 'Sony A7M4',
      lens: 'FE 70-200mm F2.8 GM II',
      focalLength: '135mm',
      aperture: 'f/5.6',
      shutterSpeed: '1/125s',
      iso: 200
    },
    location: { name: '西湖，杭州', lat: 30.2412, lng: 120.1424 },
    tags: ['日落', '湖泊', '杭州', '风光'],
    featured: true
  },
  {
    id: 3,
    title: '云海翻涌',
    description: '登顶之后俯瞰云海，如临仙境',
    category: 'landscape',
    src: 'https://picsum.photos/seed/landscape3/2400/1600',
    thumbnail: 'https://picsum.photos/seed/landscape3/600/400',
    width: 2400,
    height: 1600,
    date: '2025-08-12',
    exif: {
      camera: 'Sony A7M4',
      lens: 'FE 16-35mm F2.8 GM II',
      focalLength: '16mm',
      aperture: 'f/11',
      shutterSpeed: '1/60s',
      iso: 100
    },
    location: { name: '黄山，安徽', lat: 30.1344, lng: 118.1676 },
    tags: ['云海', '黄山', '日出', '风光'],
    featured: false
  },

  // ===== 街拍 =====
  {
    id: 4,
    title: '雨夜街角',
    description: '雨后的街道映着霓虹灯光，行人匆匆',
    category: 'street',
    src: 'https://picsum.photos/seed/street1/2400/1600',
    thumbnail: 'https://picsum.photos/seed/street1/600/400',
    width: 2400,
    height: 1600,
    date: '2025-11-03',
    exif: {
      camera: 'Fujifilm X-T5',
      lens: 'XF 23mm F1.4 R LM WR',
      focalLength: '23mm',
      aperture: 'f/2.8',
      shutterSpeed: '1/60s',
      iso: 800
    },
    location: { name: '新宿，东京', lat: 35.6938, lng: 139.7034 },
    tags: ['雨夜', '东京', '霓虹', '街拍'],
    featured: true
  },
  {
    id: 5,
    title: '巷弄光影',
    description: '老城区的巷子里，阳光穿过晾晒的衣物洒下斑驳光影',
    category: 'street',
    src: 'https://picsum.photos/seed/street2/1600/2400',
    thumbnail: 'https://picsum.photos/seed/street2/400/600',
    width: 1600,
    height: 2400,
    date: '2025-10-28',
    exif: {
      camera: 'Fujifilm X-T5',
      lens: 'XF 56mm F1.2 R WR',
      focalLength: '56mm',
      aperture: 'f/2',
      shutterSpeed: '1/500s',
      iso: 400
    },
    location: { name: '老城区，上海', lat: 31.2244, lng: 121.4758 },
    tags: ['老城', '光影', '上海', '街拍'],
    featured: false
  },
  {
    id: 6,
    title: '站台等待',
    description: '地铁站台上等待列车的人们，各自的故事',
    category: 'street',
    src: 'https://picsum.photos/seed/street3/2400/1600',
    thumbnail: 'https://picsum.photos/seed/street3/600/400',
    width: 2400,
    height: 1600,
    date: '2025-09-15',
    exif: {
      camera: 'Fujifilm X-T5',
      lens: 'XF 23mm F1.4 R LM WR',
      focalLength: '23mm',
      aperture: 'f/4',
      shutterSpeed: '1/125s',
      iso: 1600
    },
    location: { name: '地铁站，北京', lat: 39.9153, lng: 116.4037 },
    tags: ['地铁', '北京', '人文', '街拍'],
    featured: true
  },

  // ===== 人像 =====
  {
    id: 7,
    title: '逆光笑容',
    description: '夕阳逆光中她的回眸一笑，温暖了整个秋天',
    category: 'portrait',
    src: 'https://picsum.photos/seed/portrait1/1600/2400',
    thumbnail: 'https://picsum.photos/seed/portrait1/400/600',
    width: 1600,
    height: 2400,
    date: '2025-10-20',
    exif: {
      camera: 'Sony A7M4',
      lens: 'FE 85mm F1.4 GM',
      focalLength: '85mm',
      aperture: 'f/1.4',
      shutterSpeed: '1/1000s',
      iso: 100
    },
    location: { name: '公园，深圳', lat: 22.5516, lng: 114.0981 },
    tags: ['逆光', '人像', '写真', '秋天'],
    featured: true
  },
  {
    id: 8,
    title: '咖啡时光',
    description: '午后的咖啡馆里，阳光透过窗户洒在她的侧脸',
    category: 'portrait',
    src: 'https://picsum.photos/seed/portrait2/2400/1600',
    thumbnail: 'https://picsum.photos/seed/portrait2/600/400',
    width: 2400,
    height: 1600,
    date: '2025-09-10',
    exif: {
      camera: 'Sony A7M4',
      lens: 'FE 50mm F1.2 GM',
      focalLength: '50mm',
      aperture: 'f/1.2',
      shutterSpeed: '1/250s',
      iso: 200
    },
    location: { name: '咖啡馆，成都', lat: 30.5728, lng: 104.0668 },
    tags: ['咖啡馆', '人像', '光影', '成都'],
    featured: false
  },
  {
    id: 9,
    title: '秋叶之舞',
    description: '漫天金黄的银杏叶中，她张开双臂拥抱秋天',
    category: 'portrait',
    src: 'https://picsum.photos/seed/portrait3/1600/2400',
    thumbnail: 'https://picsum.photos/seed/portrait3/400/600',
    width: 1600,
    height: 2400,
    date: '2025-11-01',
    exif: {
      camera: 'Sony A7M4',
      lens: 'FE 35mm F1.4 GM',
      focalLength: '35mm',
      aperture: 'f/1.8',
      shutterSpeed: '1/500s',
      iso: 100
    },
    location: { name: '银杏大道，北京', lat: 39.9244, lng: 116.4137 },
    tags: ['秋天', '银杏', '人像', '北京'],
    featured: false
  },

  // ===== 夜景 =====
  {
    id: 10,
    title: '城市星轨',
    description: '远离城市灯光的山顶，银河横跨天际',
    category: 'night',
    src: 'https://picsum.photos/seed/night1/2400/1600',
    thumbnail: 'https://picsum.photos/seed/night1/600/400',
    width: 2400,
    height: 1600,
    date: '2025-08-20',
    exif: {
      camera: 'Sony A7M4',
      lens: 'FE 14mm F1.8 GM',
      focalLength: '14mm',
      aperture: 'f/1.8',
      shutterSpeed: '15s',
      iso: 3200
    },
    location: { name: '牛背山，四川', lat: 29.8166, lng: 102.3667 },
    tags: ['星空', '银河', '夜景', '川西'],
    featured: true
  },
  {
    id: 11,
    title: '外滩夜色',
    description: '黄浦江畔的外滩夜景，万国建筑与陆家嘴遥相辉映',
    category: 'night',
    src: 'https://picsum.photos/seed/night2/2400/1600',
    thumbnail: 'https://picsum.photos/seed/night2/600/400',
    width: 2400,
    height: 1600,
    date: '2025-09-25',
    exif: {
      camera: 'Sony A7M4',
      lens: 'FE 24-70mm F2.8 GM II',
      focalLength: '24mm',
      aperture: 'f/8',
      shutterSpeed: '10s',
      iso: 100
    },
    location: { name: '外滩，上海', lat: 31.2416, lng: 121.4905 },
    tags: ['外滩', '上海', '城市夜景', '长曝光'],
    featured: false
  },
  {
    id: 12,
    title: '霓虹雨夜',
    description: '雨天的十字路口，霓虹灯牌在积水中映出绚烂倒影',
    category: 'night',
    src: 'https://picsum.photos/seed/night3/2400/1600',
    thumbnail: 'https://picsum.photos/seed/night3/600/400',
    width: 2400,
    height: 1600,
    date: '2025-10-05',
    exif: {
      camera: 'Fujifilm X-T5',
      lens: 'XF 23mm F1.4 R LM WR',
      focalLength: '23mm',
      aperture: 'f/2.8',
      shutterSpeed: '1/30s',
      iso: 1600
    },
    location: { name: '涩谷，东京', lat: 35.6580, lng: 139.7016 },
    tags: ['霓虹', '雨夜', '东京', '夜景'],
    featured: false
  }
]
