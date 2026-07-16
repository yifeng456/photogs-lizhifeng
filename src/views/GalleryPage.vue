<!--
  作品集页：分类筛选 + 瀑布流展示 + 照片灯箱
  - 支持 /gallery/:category 路由参数预筛选
  - 点击照片打开灯箱，支持键盘/手势切换
-->
<template>
  <div>
    <!-- 页面头部 -->
    <section class="pt-24 pb-8 border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-sm uppercase tracking-[0.2em] text-accent font-medium mb-3">
          作品集
        </p>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {{ categoryInfo.icon }} {{ categoryInfo.label }}
        </h1>
        <p class="text-muted max-w-lg">
          {{ categoryInfo.description }}
        </p>
      </div>
    </section>

    <!-- 内容区 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <!-- 分类筛选器 -->
      <div class="mb-10">
        <CategoryFilter
          :categories="categories"
          :active-category="currentCategory"
          :category-counts="categoryCounts"
          @select="handleCategoryChange"
        />
      </div>

      <!-- 瀑布流 -->
      <MasonryGrid
        :photos="filteredPhotos"
        @photo-click="openLightbox"
        @reset-filter="handleCategoryChange('all')"
      />
    </div>

    <!-- 照片灯箱 -->
    <PhotoLightbox
      :visible="lightboxVisible"
      :photos="filteredPhotos"
      :initial-index="lightboxIndex"
      @close="lightboxVisible = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CategoryFilter from '@/components/gallery/CategoryFilter.vue'
import MasonryGrid from '@/components/gallery/MasonryGrid.vue'
import PhotoLightbox from '@/components/photo/PhotoLightbox.vue'
import { usePhotos } from '@/composables/usePhotos.js'
import { useSEO } from '@/composables/useSEO.js'

const route = useRoute()
const router = useRouter()

const {
  categories,
  currentCategory,
  filteredPhotos,
  categoryInfo,
  categoryCounts,
  filterByCategory,
} = usePhotos()

// SEO：随分类变化动态更新描述
const seoDescription = computed(() => {
  const info = categoryInfo.value
  return info.key === 'all'
    ? '浏览全部摄影作品，涵盖风光、街拍、人像、夜景等多个主题'
    : `${info.icon} ${info.label}摄影作品 - ${info.description}`
})

useSEO({
  title: '作品集',
  description: seoDescription
})

// 灯箱状态
const lightboxVisible = ref(false)
const lightboxIndex = ref(0)

/** 处理分类切换：更新状态 + 同步 URL */
function handleCategoryChange(key) {
  filterByCategory(key)
  if (key === 'all') {
    router.replace('/gallery')
  } else {
    router.replace(`/gallery/${key}`)
  }
}

/** 点击照片 → 查找索引 → 打开灯箱 */
function openLightbox(photo) {
  const idx = filteredPhotos.value.findIndex(p => p.id === photo.id)
  lightboxIndex.value = idx >= 0 ? idx : 0
  lightboxVisible.value = true
}

// 路由参数变化时同步筛选状态（处理浏览器前进后退、直接访问 /gallery/:category）
function syncFromRoute() {
  const categoryParam = route.params.category
  if (categoryParam && categoryParam !== currentCategory.value) {
    filterByCategory(categoryParam)
  } else if (!categoryParam && currentCategory.value !== 'all') {
    filterByCategory('all')
  }
}

onMounted(syncFromRoute)
watch(() => route.params.category, syncFromRoute)
</script>
