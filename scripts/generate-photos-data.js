/**
 * 从实际照片文件生成 photos.js 数据
 *
 * 用法：node scripts/generate-photos-data.js
 *
 * 功能：
 *   1. 扫描 public/photos/ 下三个分类目录（landscape/street/portrait）
 *   2. 用 exifr 读取每张照片的 EXIF 信息
 *   3. 生成 src/data/photos.js 文件
 *
 * 输出字段：
 *   id, title（文件名）、description、category、src、thumbnail、
 *   width、height、date、exif、tags、featured
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.join(__dirname, '..')
const PHOTOS_DIR = path.join(PROJECT_ROOT, 'public', 'photos')
const OUTPUT_FILE = path.join(PROJECT_ROOT, 'src', 'data', 'photos.js')

// 分类映射：目录名 → key
const CATEGORY_MAP = {
  'landscape': 'landscape',
  'street': 'street',
  'portrait': 'portrait',
}

// 分类中文标签
const CATEGORY_LABELS = {
  landscape: '风光',
  street: '街拍',
  portrait: '人像',
}

async function main() {
  console.log('🔍 开始扫描照片目录...\n')

  let idCounter = 0
  const allPhotos = []

  for (const [dirName, categoryKey] of Object.entries(CATEGORY_MAP)) {
    const dirPath = path.join(PHOTOS_DIR, dirName)
    if (!fs.existsSync(dirPath)) {
      console.log(`⚠️  目录不存在: ${dirPath}`)
      continue
    }

    const files = fs.readdirSync(dirPath)
      .filter(f => /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/.test(f))
      .sort()

    console.log(`📁 ${CATEGORY_LABELS[categoryKey]} (${files.length} 张)`)

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      idCounter++
      const filePath = path.join(dirPath, file)
      const ext = path.extname(file).toLowerCase()
      const baseName = path.basename(file, path.extname(file))

      // 读取 EXIF
      let exif = null
      let width = 0, height = 0
      let dateTaken = null
      try {
        const exifr = await import('exifr')
        const data = await exifr.default.parse(filePath, {
          pick: [
            'Make', 'Model', 'LensModel',
            'FocalLength', 'FNumber', 'ExposureTime', 'ISO',
            'DateTimeOriginal',
            'ImageWidth', 'ImageHeight',
          ]
        })
        if (data) {
          exif = {
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
          width = data.ImageWidth || 0
          height = data.ImageHeight || 0
          dateTaken = data.DateTimeOriginal || null
        }
      } catch (e) {
        // EXIF 读取失败，使用默认值
      }

      // 文件名作为标题（去掉序号前缀和多余符号）
      const title = baseName
        .replace(/[_\-\s]+/g, ' ')
        .replace(/\(\d+\)/g, '')
        .trim()

      const photo = {
        id: idCounter,
        title: title || `作品 ${idCounter}`,
        description: '',
        category: categoryKey,
        src: `/photos/${dirName}/${file}`,
        thumbnail: `/photos/thumbnails/${baseName}.webp`,
        width: width || 4000,
        height: height || 3000,
        date: dateTaken
          ? (typeof dateTaken === 'string' ? dateTaken.slice(0, 10) : dateTaken.toISOString().slice(0, 10))
          : '',
        exif: exif || {},
        location: null,
        tags: [],
        featured: i < 3,   // 每个分类前 3 张为精选
      }
      allPhotos.push(photo)

      // 进度
      if ((i + 1) % 10 === 0 || i === files.length - 1) {
        console.log(`   ${i + 1}/${files.length} ${exif ? '✅' : '⚠️ 无EXIF'}`)
      }
    }
    console.log('')
  }

  // 生成文件内容
  const label = CATEGORY_LABELS
  const categoryComment = Object.entries(CATEGORY_MAP)
    .map(([dir, key]) => `  // ===== ${label[key]} =====`)

  // 按分类分组
  const grouped = {}
  for (const cat of Object.values(CATEGORY_MAP)) {
    grouped[cat] = allPhotos.filter(p => p.category === cat)
  }

  const fileContent = `/**
 * 照片静态数据（自动生成于 ${new Date().toISOString().slice(0, 10)}）
 *
 * 数据结构说明：
 * - id：唯一标识
 * - title：作品标题
 * - description：作品描述（请手动填写）
 * - category：分类 key（landscape/street/portrait）
 * - src：原图路径（public/photos/ 下）
 * - thumbnail：缩略图路径（public/photos/thumbnails/ 下）
 * - width / height：原图尺寸（用于瀑布流计算纵横比）
 * - date：拍摄日期
 * - exif：拍摄参数（自动读取，可能有空值）
 * - location：拍摄地点（{ name, lat, lng }，请手动填写）
 * - tags：标签数组（请手动填写）
 * - featured：是否在首页精选展示
 *
 * ⚡ 由 scripts/generate-photos-data.js 自动生成
 * 📝 title/description/location/tags 字段需手动补充完善
 */
export const photos = [
${generateCategoryBlock(grouped.landscape, '风光')}
${generateCategoryBlock(grouped.street, '街拍')}
${generateCategoryBlock(grouped.portrait, '人像')}
]
`

  fs.writeFileSync(OUTPUT_FILE, fileContent, 'utf-8')
  console.log(`✅ 已生成 ${OUTPUT_FILE}`)
  console.log(`📊 总计: ${allPhotos.length} 张照片`)
  console.log(`💡 请手动补充每张照片的 title、description、location、tags 字段`)
}

function generateCategoryBlock(photos, label) {
  if (!photos || photos.length === 0) return ''
  return `  // ===== ${label} (${photos.length}张) =====\n${
    photos.map(p => `  ${JSON.stringify(p, null, 2).replace(/\n/g, '\n  ')},\n`).join('')
  }`
}

main().catch(err => {
  console.error('❌ 脚本执行出错:', err.message)
  process.exit(1)
})
