/**
 * 修正照片宽高数据 + 纠正旋转方向
 *
 * 背景：generate-photos-data.js 用 exifr 的 ImageWidth/ImageHeight 读取尺寸，
 * 但大量照片的 EXIF 里没有这两个字段，导致 66 张照片尺寸全部回退为 4000×3000，
 * 竖版照片被当成横版显示。
 *
 * 本脚本用 sharp 读取每张照片的真实像素尺寸，并处理 EXIF Orientation（5-8 表示
 * 需要旋转 90°/270°，显示尺寸需宽高互换），直接更新 src/data/photos.js。
 * 同时对 orientation != 1 的照片重新生成已旋转的缩略图。
 *
 * 用法：node scripts/fix-photo-dimensions.js
 */

import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.join(__dirname, '..')
const PHOTOS_DIR = path.join(PROJECT_ROOT, 'public', 'photos')
const THUMBNAIL_DIR = path.join(PHOTOS_DIR, 'thumbnails')
const OUTPUT_FILE = path.join(PROJECT_ROOT, 'src', 'data', 'photos.js')

const THUMBNAIL_WIDTH = 600
const THUMBNAIL_QUALITY = 80

// 分类中文标签
const CATEGORY_LABELS = {
  landscape: '风光',
  street: '街拍',
  portrait: '人像',
}

async function main() {
  console.log('🔍 读取当前照片数据...\n')
  const { photos } = await import(pathToFileURL(OUTPUT_FILE).href)

  let fixed = 0
  let rotated = 0
  let failed = 0

  for (const p of photos) {
    const fileName = path.basename(p.src)
    const filePath = path.join(PHOTOS_DIR, p.category, fileName)

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  文件不存在，跳过: ${fileName}`)
      continue
    }

    try {
      const meta = await sharp(filePath).metadata()
      const orientation = meta.orientation || 1
      const isRotated = orientation >= 5 && orientation <= 8
      // 显示尺寸：需旋转时宽高互换
      const dispW = isRotated ? meta.height : meta.width
      const dispH = isRotated ? meta.width : meta.height

      const changed = p.width !== dispW || p.height !== dispH
      if (changed) {
        console.log(`✅ 修正尺寸 ${fileName}: ${p.width}×${p.height} → ${dispW}×${dispH}`)
        p.width = dispW
        p.height = dispH
        fixed++
      }

      // 需要旋转的照片：重新生成已纠正方向的缩略图
      if (isRotated) {
        const baseName = path.basename(fileName, path.extname(fileName))
        const outPath = path.join(THUMBNAIL_DIR, `${baseName}.webp`)
        await sharp(filePath)
          .rotate() // 自动按 EXIF Orientation 纠正方向
          .resize({ width: THUMBNAIL_WIDTH, withoutEnlargement: true })
          .webp({ quality: THUMBNAIL_QUALITY })
          .toFile(outPath)
        console.log(`🔄 重生成缩略图（已旋转）: ${baseName}.webp`)
        rotated++
      }
    } catch (err) {
      console.error(`❌ ${fileName}: ${err.message}`)
      failed++
    }
  }

  // 重新生成 photos.js（按分类分组，保持结构清晰）
  const grouped = {}
  for (const cat of Object.keys(CATEGORY_LABELS)) {
    grouped[cat] = photos.filter(p => p.category === cat)
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
 * ⚡ 由 scripts/fix-photo-dimensions.js 修正宽高
 */
export const photos = [
${block(grouped.landscape, '风光')}
${block(grouped.street, '街拍')}
${block(grouped.portrait, '人像')}
]
`

  fs.writeFileSync(OUTPUT_FILE, fileContent, 'utf-8')

  console.log(`\n===== 修正完成 =====`)
  console.log(`修正尺寸: ${fixed} 张 | 重生成缩略图: ${rotated} 张 | 失败: ${failed}`)
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
