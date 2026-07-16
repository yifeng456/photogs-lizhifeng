/**
 * 缩略图批量生成脚本
 *
 * 用法：
 *   1. npm install sharp    （首次运行前安装）
 *   2. node scripts/generate-thumbnails.js
 *
 * 功能：遍历 public/photos/ 下所有分类目录的图片文件（.jpg/.png/.jpeg），
 *       生成 600px 宽的 WebP 缩略图，输出到 public/photos/thumbnails/
 *
 * 特色：
 *   - 已存在缩略图则跳过（增量处理）
 *   - 保留宽高比，高度自动计算
 *   - 视频封面图（以 video- 开头的 PNG/JPG）同样处理
 */

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PHOTOS_DIR = path.join(__dirname, '..', 'public', 'photos')
const THUMBNAIL_DIR = path.join(PHOTOS_DIR, 'thumbnails')
const THUMBNAIL_WIDTH = 600
const QUALITY = 80

// 图片格式
const IMAGE_EXTS = ['.jpg', '.jpeg', '.png']

async function main() {
  // 确保缩略图目录存在
  if (!fs.existsSync(THUMBNAIL_DIR)) {
    fs.mkdirSync(THUMBNAIL_DIR, { recursive: true })
  }

  let total = 0
  let skipped = 0
  let generated = 0
  let failed = 0

  // 遍历所有子目录
  const dirs = fs.readdirSync(PHOTOS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory() && d.name !== 'thumbnails')

  for (const dir of dirs) {
    const dirPath = path.join(PHOTOS_DIR, dir.name)
    const files = fs.readdirSync(dirPath)

    for (const file of files) {
      const ext = path.extname(file).toLowerCase()
      if (!IMAGE_EXTS.includes(ext)) continue

      total++
      const baseName = path.basename(file, ext)
      const outputName = `${baseName}.webp`
      const outputPath = path.join(THUMBNAIL_DIR, outputName)

      // 已存在则跳过
      if (fs.existsSync(outputPath)) {
        console.log(`⏭  跳过（已存在）: ${outputName}`)
        skipped++
        continue
      }

      const inputPath = path.join(dirPath, file)
      try {
        await sharp(inputPath)
          .resize({ width: THUMBNAIL_WIDTH, withoutEnlargement: true })
          .webp({ quality: QUALITY })
          .toFile(outputPath)

        const stats = fs.statSync(outputPath)
        const sizeKB = (stats.size / 1024).toFixed(1)
        console.log(`✅ ${outputName} (${sizeKB} KB)`)
        generated++
      } catch (err) {
        console.error(`❌ ${file}: ${err.message}`)
        failed++
      }
    }
  }

  // 汇总
  console.log(`\n===== 缩略图生成完成 =====`)
  console.log(`总计: ${total} 张 | 生成: ${generated} | 跳过: ${skipped} | 失败: ${failed}`)
}

main().catch(err => {
  console.error('脚本执行出错:', err.message)
  process.exit(1)
})
