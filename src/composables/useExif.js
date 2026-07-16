import { ref } from 'vue'

/**
 * EXIF 信息解析
 * 封装 exifr 库，从图片文件中实时读取 EXIF 元数据
 * 注意：需要图片支持 CORS 或在同源下才能读取
 */
export function useExif() {
  const exifData = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  /**
   * 从图片 URL 读取 EXIF 信息
   * @param {string} imageUrl - 图片地址
   * @returns {Promise<Object|null>}
   */
  async function readExif(imageUrl) {
    isLoading.value = true
    error.value = null
    exifData.value = null

    try {
      const exifr = await import('exifr')
      const data = await exifr.default.parse(imageUrl, {
        // 指定需要读取的字段
        pick: [
          'Make', 'Model',
          'LensModel',
          'FocalLength',
          'FNumber',
          'ExposureTime',
          'ISO',
          'DateTimeOriginal',
          'GPSLatitude', 'GPSLongitude',
          'ImageWidth', 'ImageHeight',
        ]
      })

      // 格式化原始数据
      if (data) {
        exifData.value = {
          camera: data.Make && data.Model
            ? `${data.Make} ${data.Model}`
            : data.Model || null,
          lens: data.LensModel || null,
          focalLength: data.FocalLength
            ? `${Math.round(Number(data.FocalLength))}mm`
            : null,
          aperture: data.FNumber ? `f/${Number(data.FNumber)}` : null,
          shutterSpeed: data.ExposureTime
            ? formatShutterSpeed(data.ExposureTime)
            : null,
          iso: data.ISO || null,
          dateTaken: data.DateTimeOriginal || null,
          gps: data.GPSLatitude && data.GPSLongitude
            ? { lat: data.GPSLatitude, lng: data.GPSLongitude }
            : null,
          dimensions: data.ImageWidth && data.ImageHeight
            ? { width: data.ImageWidth, height: data.ImageHeight }
            : null,
        }
      }
      return exifData.value
    } catch (e) {
      // 跨域图片或非 JPEG 格式可能读取失败，这是正常情况
      error.value = e.message
      return null
    } finally {
      isLoading.value = false
    }
  }

  return { exifData, isLoading, error, readExif }
}

/**
 * 格式化快门速度
 * exifr 返回的快门速度是秒数（如 0.008 = 1/125）
 */
function formatShutterSpeed(seconds) {
  if (!seconds) return null
  const num = Number(seconds)
  if (num >= 1) {
    return `${num}s`
  }
  const denominator = Math.round(1 / num)
  return `1/${denominator}s`
}
