<!--
  照片详情页
  - 左侧/上方：大图展示
  - 右侧/下方：EXIF 信息面板
  - 底部：同分类推荐 + 前后导航
  - 404 检测：ID 无效时重定向到作品集
-->
<template>
  <div v-if="photo" class="pt-16">
    <!-- 顶部导航栏 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <button
        @click="$router.back()"
        class="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        返回作品集
      </button>
    </div>

    <!-- 主体内容：两栏布局 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      <div class="lg:flex lg:gap-10">
        <!-- 左侧：大图 -->
        <div class="lg:flex-1 mb-8 lg:mb-0">
          <div class="relative rounded-xl overflow-hidden bg-gray-100">
            <img
              :src="photo.src"
              :alt="photo.title"
              class="w-full h-auto block"
              loading="eager"
            />
          </div>

          <!-- 前后照片导航 -->
          <div class="flex items-center justify-between mt-4">
            <button
              v-if="prevPhoto"
              @click="navigateTo(prevPhoto.id)"
              class="flex items-center gap-1 text-sm text-muted hover:text-accent transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              上一张
            </button>
            <span v-else class="w-16" />

            <button
              v-if="nextPhoto"
              @click="navigateTo(nextPhoto.id)"
              class="flex items-center gap-1 text-sm text-muted hover:text-accent transition-colors"
            >
              下一张
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <span v-else class="w-16" />
          </div>
        </div>

        <!-- 右侧：信息面板 -->
        <div class="lg:w-80 space-y-6">
          <!-- 标题与描述 -->
          <div>
            <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ photo.title }}</h1>
            <p class="text-muted leading-relaxed">{{ photo.description }}</p>
          </div>

          <!-- EXIF 面板 -->
          <ExifPanel
            :exif="photo.exif"
            :location="photo.location"
            :tags="photo.tags"
            :date="photo.date"
          />
        </div>
      </div>

      <!-- 底部：同分类推荐 -->
      <section v-if="relatedPhotos.length" class="mt-16 pt-12 border-t border-gray-100">
        <h2 class="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          {{ categoryInfo?.icon }} 更多{{ categoryInfo?.label }}作品
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <router-link
            v-for="related in relatedPhotos"
            :key="related.id"
            :to="`/photo/${related.id}`"
            class="group relative rounded-lg overflow-hidden bg-gray-100 cursor-pointer"
            :style="{ aspectRatio: `${related.width}/${related.height}` }"
          >
            <img
              :src="related.thumbnail"
              :alt="related.title"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <p class="text-white text-xs font-medium truncate">{{ related.title }}</p>
            </div>
          </router-link>
        </div>
      </section>
    </div>
  </div>

  <!-- 照片不存在 -->
  <div v-else class="pt-16">
    <div class="flex items-center justify-center min-h-[70vh]">
      <div class="text-center">
        <p class="text-6xl mb-4">📷</p>
        <p class="text-lg text-muted mb-6">照片未找到</p>
        <router-link
          to="/gallery"
          class="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          浏览作品集
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ExifPanel from '@/components/photo/ExifPanel.vue'
import { usePhotos } from '@/composables/usePhotos.js'
import { useSEO } from '@/composables/useSEO.js'
import { categories } from '@/data/categories.js'

const route = useRoute()
const router = useRouter()

const {
  getPhotoById,
  getAdjacentPhotos,
  getRelatedPhotos,
} = usePhotos()

/** 从路由参数中加载照片 */
const id = computed(() => Number(route.params.id))
const photo = computed(() => getPhotoById(id.value))

/** 相邻照片（同分类） */
const adjacent = computed(() => getAdjacentPhotos(id.value))
const prevPhoto = computed(() => adjacent.value.prev)
const nextPhoto = computed(() => adjacent.value.next)

/** 同分类推荐 */
const relatedPhotos = computed(() => {
  return photo.value ? getRelatedPhotos(photo.value, 4) : []
})

/** 分类信息 */
const categoryInfo = computed(() => {
  return photo.value
    ? categories.find(c => c.key === photo.value.category)
    : null
})

// SEO：照片标题 + 描述
useSEO({
  title: photo.value?.title || '照片详情',
  description: photo.value?.description || '摄影作品展示',
  image: photo.value?.thumbnail || ''
})

/** 切换到另一张照片（保持在同一路由结构内） */
function navigateTo(newId) {
  window.scrollTo({ top: 0, behavior: 'instant' })
  router.replace(`/photo/${newId}`)
}

// ID 无效时重定向到作品集
watch(id, (val) => {
  if (!getPhotoById(val)) {
    router.replace('/gallery')
  }
}, { immediate: true })
</script>
