import { computed, ref } from 'vue'
import { photos } from '@/data/photos.js'
import { categories } from '@/data/categories.js'

/**
 * 照片数据管理
 * 提供筛选、分页、查找等纯函数，无需 Pinia
 */
export function usePhotos() {
  const currentCategory = ref('all')

  /** 筛选后的照片列表 */
  const filteredPhotos = computed(() => {
    if (currentCategory.value === 'all') {
      return photos
    }
    return photos.filter(p => p.category === currentCategory.value)
  })

  /** 精选照片（首页展示） */
  const featuredPhotos = computed(() => {
    return photos.filter(p => p.featured).slice(0, 8)
  })

  /** 当前分类信息 */
  const categoryInfo = computed(() => {
    return categories.find(c => c.key === currentCategory.value) || categories[0]
  })

  /** 每个分类的照片数量 */
  const categoryCounts = computed(() => {
    const counts = { all: photos.length }
    categories.slice(1).forEach(c => {
      counts[c.key] = photos.filter(p => p.category === c.key).length
    })
    return counts
  })

  /** 根据分类筛选 */
  function filterByCategory(categoryKey) {
    currentCategory.value = categoryKey
  }

  /** 根据 ID 获取单张照片 */
  function getPhotoById(id) {
    return photos.find(p => p.id === Number(id)) || null
  }

  /** 获取相邻照片（用于灯箱前后切换） */
  function getAdjacentPhotos(id) {
    const list = filteredPhotos.value
    const index = list.findIndex(p => p.id === Number(id))
    return {
      prev: index > 0 ? list[index - 1] : null,
      next: index < list.length - 1 ? list[index + 1] : null,
    }
  }

  /** 获取同一分类的照片（用于详情页推荐） */
  function getRelatedPhotos(photo, limit = 4) {
    return photos
      .filter(p => p.category === photo.category && p.id !== photo.id)
      .slice(0, limit)
  }

  return {
    photos,
    categories,
    currentCategory,
    filteredPhotos,
    featuredPhotos,
    categoryInfo,
    categoryCounts,
    filterByCategory,
    getPhotoById,
    getAdjacentPhotos,
    getRelatedPhotos,
  }
}
