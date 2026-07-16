/**
 * EXIF 数据格式化工具
 * 将原始 EXIF 值转为展示友好的中文格式
 */

/** 快门速度格式化 */
export function formatShutter(raw) {
  if (!raw) return '—'
  // 如果已经是格式化后的值（如 "1/125s"），直接返回
  if (typeof raw === 'string' && raw.includes('/')) return raw
  return raw
}

/** 光圈格式化 */
export function formatAperture(raw) {
  if (!raw) return '—'
  if (typeof raw === 'string') return raw
  return `f/${raw}`
}

/** 焦距格式化 */
export function formatFocalLength(raw) {
  if (!raw) return '—'
  if (typeof raw === 'string') return raw
  return `${Math.round(raw)}mm`
}

/** ISO 格式化 */
export function formatISO(raw) {
  if (!raw) return '—'
  return String(raw)
}

/** GPS 坐标转度分秒格式 */
export function formatGPS(lat, lng) {
  if (!lat || !lng) return null
  const latDir = lat >= 0 ? 'N' : 'S'
  const lngDir = lng >= 0 ? 'E' : 'W'
  return `${Math.abs(lat).toFixed(4)}°${latDir}, ${Math.abs(lng).toFixed(4)}°${lngDir}`
}

/** 日期格式化（YYYY-MM-DD → 中文格式） */
export function formatDate(dateStr) {
  if (!dateStr) return '—'
  // 兼容 exifr 返回的 Date 对象和字符串
  const d = typeof dateStr === 'string' ? new Date(dateStr) : dateStr
  if (isNaN(d.getTime())) return dateStr
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  return `${year}年${month}月${day}日`
}
