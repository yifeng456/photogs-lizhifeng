<!--
  首页精选作品网格
  - CSS Grid 自适应列数（1/2/3）
  - 图片悬停放大 + 标题叠加层
  - 点击跳转照片详情页
-->
<template>
  <section class="py-20 md:py-28 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 区域标题 -->
      <div class="text-center mb-16">
        <p class="text-sm uppercase tracking-[0.2em] text-accent font-medium mb-3">
          精选作品
        </p>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          从镜头中，看见世界
        </h2>
        <p class="text-muted max-w-lg mx-auto">
          每一张照片，都是一个关于光影与时间的瞬间
        </p>
      </div>

      <!-- 作品网格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <router-link
          v-for="photo in photos"
          :key="photo.id"
          :to="`/photo/${photo.id}`"
          class="group relative overflow-hidden rounded-xl bg-gray-100 cursor-pointer"
          :style="{ aspectRatio: photo.width / photo.height }"
        >
          <!-- 缩略图 -->
          <img
            :src="photo.thumbnail"
            :alt="photo.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          <!-- 悬停遮罩 + 信息 -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <h3 class="text-lg font-semibold text-white">{{ photo.title }}</h3>
            <p class="text-sm text-white/70 mt-1">{{ getCategoryLabel(photo.category) }}</p>
          </div>

          <!-- 骨架屏占位（图片加载前） -->
          <div class="absolute inset-0 bg-gray-200 -z-10 animate-pulse" />
        </router-link>
      </div>

      <!-- 查看全部 -->
      <div class="text-center mt-12">
        <router-link
          to="/gallery"
          class="inline-flex items-center gap-2 text-gray-600 hover:text-accent transition-colors font-medium"
        >
          查看全部作品
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { categories } from '@/data/categories.js'

defineProps({
  /** 照片列表（通常为 featuredPhotos，6-8 张） */
  photos: { type: Array, required: true },
})

function getCategoryLabel(key) {
  const cat = categories.find(c => c.key === key)
  return cat ? `${cat.icon} ${cat.label}` : key
}
</script>
