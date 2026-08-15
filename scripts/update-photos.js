/**
 * 一次性脚本：从作品集新文件夹导入照片，并删除指定照片
 *
 * 功能：
 *   1. 删除 src/data/photos.js 中的 IMG_6408、IMG_8028 两张照片
 *   2. 扫描 public/photos/landscape、public/photos/street 目录，
 *      找出尚未录入的新照片（文件名不在现有数据中）
 *   3. 为新照片读取 EXIF + sharp 真实宽高（含方向纠正）
 *   4. 重新生成 src/data/photos.js
 *
 * 用法：node scripts/update-photos.js
 */

import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.join(__dirname, '..')
const PHOTOS_DIR = path.join(PROJECT_ROOT, 'public', 'photos')
const OUTPUT_FILE = path.join(PROJECT_ROOT, 'src', 'data', 'photos.js')

const BASE_PREFIX = '/photogs-lizhifeng'

// 分类中文标签
const CATEGORY_LABELS = {
  landscape: '风光',
  street: '街拍',
  portrait: '人像',
}

// 要删除的照片文件名（不含路径，含扩展名）
const REMOVE_FILES = new Set(['IMG_6408.PNG', 'IMG_8028.JPG'])

async function main() {
  const { photos } = await import(pathToFileURL(OUTPUT_FILE).href)

  // 1. 删除指定照片
  const before = photos.length
  const remaining = photos.filter(p => !REMOVE_FILES.has(path.basename(p.src)))
  console.log(`🗑  删除 ${before - remaining.length} 张：${[...REMOVE_FILES].join(', ')}`)

  // 2. 找出新照片（现有数据中不存在的文件名）
  const existingNames = new Set(remaining.map(p => path.basename(p.src)))
  let maxId = remaining.reduce((m, p) => Math.max(m, p.id), 0)

  const newPhotos = []
  for (const [dirName, category] of Object.entries({
    landscape: 'landscape',
    street: 'street',
    portrait: 'portrait',
  })) {
    const dirPath = path.join(PHOTOS_DIR, dirName)
    if (!fs.existsSync(dirPath)) continue
    const files = fs.readdirSync(dirPath)
      .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
      .sort()

    for (const file of files) {
      if (existingNames.has(file)) continue // 已存在，跳过

      const filePath = path.join(dirPath, file)
      const baseName = path.parse(file).name
      maxId++
      newPhotos.push({
        id: maxId,
        title: baseName
          .replace(/[_\-\s]+/g, ' ')
          .replace(/\(\d+\)/g, '')
          .trim(),
        description: '',
        category,
        src: `${BASE_PREFIX}/photos/${dirName}/${file}`,
        thumbnail: `${BASE_PREFIX}/photos/thumbnails/${baseName}.webp`,
        width: 0,
        height: 0,
        date: '',
        exif: {},
        location: null,
        tags: [],
        featured: false,
        _filePath: filePath, // 临时字段，读完元数据后移除
      })
    }
  }

  console.log(`📥 发现新照片 ${newPhotos.length} 张，开始读取元数据...\n`)

  // 3. 为每张新照片读取 EXIF + 尺寸
  for (const p of newPhotos) {
    try {
      const exifr = await import('exifr')
      const data = await exifr.default.parse(p._filePath, {
        pick: [
          'Make', 'Model', 'LensModel',
          'FocalLength', 'FNumber', 'ExposureTime', 'ISO',
          'DateTimeOriginal',
        ]
      })
      if (data) {
        p.exif = {
          camera: data.Make && data.Model
            ? `${data.Make} ${data.Model}`
            : data.Model || null,
          lens: data.LensModel || null,
          focalLength: data.FocalLength ? `${Math.round(Number(data.FocalLength))}mm` : null,
          aperture: data.FNumber ? `f/${Number(data.FNumber)}` : null,
          shutterSpeed: data.ExposureTime
            ? (Number(data.ExposureTime) >= 1
                ? `${data.ExposureTime}s`
                : `1/${Math.round(1 / Number(data.ExposureTime))}s`)
            : null,
          iso: data.ISO || null,
        }
        const dt = data.DateTimeOriginal
        p.date = dt
          ? (typeof dt === 'string' ? dt.slice(0, 10) : dt.toISOString().slice(0, 10))
          : ''
      }
    } catch (e) {
      // EXIF 读取失败，保持空
    }

    try {
      const meta = await sharp(p._filePath).metadata()
      const orientation = meta.orientation || 1
      const isRotated = orientation >= 5 && orientation <= 8
      p.width = isRotated ? meta.height : meta.width
      p.height = isRotated ? meta.width : meta.height
    } catch (e) {
      p.width = 0
      p.height = 0
    }

    delete p._filePath
    console.log(`✅ ${path.basename(p.src)}  ${p.width}×${p.height}  ${p.exif.camera || '无相机信息'}`)
  }

  // 4. 合并 + 按分类分组 + 分类内按文件名排序
  const all = [...remaining, ...newPhotos]
  const grouped = {}
  for (const cat of Object.keys(CATEGORY_LABELS)) {
    grouped[cat] = all
      .filter(p => p.category === cat)
      .sort((a, b) => path.basename(a.src).localeCompare(path.basename(b.src)))
  }

  const fileContent = `/**
 * 照片静态数据（宽高已用 sharp 修正，含方向纠正）
 *
 * 数据结构说明：
 * - id：唯一标识
 * - title：作品标题
 * - description：作品描述
 * - category：分类 key（landscape/street/portrait）
 * - src：原图路径（public/photos/ 下）
 * - thumbnail：缩略图路径（public/photos/thumbnails/ 下）
 * - width / height：显示尺寸（已按 EXIF 方向纠正，用于布局计算纵横比）
 * - date：拍摄日期
 * - exif：拍摄参数（自动读取，可能有空值）
 * - location：拍摄地点（{ name, lat, lng }）
 * - tags：标签数组
 * - featured：是否在首页精选展示
 *
 * ⚡ 由 scripts/update-photos.js 生成
 */
export const photos = [
${block(grouped.landscape, '风光')}
${block(grouped.street, '街拍')}
${block(grouped.portrait, '人像')}
]
`

  fs.writeFileSync(OUTPUT_FILE, fileContent, 'utf-8')

  const total = grouped.landscape.length + grouped.street.length + grouped.portrait.length
  console.log(`\n===== 更新完成 =====`)
  console.log(`风光 ${grouped.landscape.length} 张 | 街拍 ${grouped.street.length} 张 | 人像 ${grouped.portrait.length} 张 | 总计 ${total} 张`)
}

function block(list, label) {
  if (!list || !list.length) return ''
  return `  // ===== ${label} (${list.length}张) =====\n${
    list.map(p => `  ${JSON.stringify(p, null, 2).replace(/\n/g, '\n  ')},\n`).join('')
  }`
}

main().catch(err => {
  console.error('❌ 脚本执行出错:', err)
  process.exit(1)
})
