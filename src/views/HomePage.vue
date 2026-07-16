<!--
  首页
  - HeroBanner：全屏主视觉 + 渐入动画
  - FeaturedGrid：精选作品网格 + 悬停效果
-->
<template>
  <div>
    <!-- Hero 横幅 -->
    <HeroBanner
      :hero-image="randomHeroImage"
      title="光影记录"
      subtitle="用镜头记录生活的美好瞬间，每一张照片，都是一段故事"
    />

    <!-- 精选作品 -->
    <FeaturedGrid :photos="featuredPhotos" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import HeroBanner from '@/components/home/HeroBanner.vue'
import FeaturedGrid from '@/components/home/FeaturedGrid.vue'
import { usePhotos } from '@/composables/usePhotos.js'
import { useSEO } from '@/composables/useSEO.js'

const { photos, featuredPhotos } = usePhotos()

// SEO
useSEO({
  title: '首页',
  description: '个人摄影作品展示 - 用镜头记录生活的美好瞬间，风光、街拍、人像、夜景摄影作品集'
})

/** 从精选照片中随机选一张作为 Hero 背景 */
const randomHeroImage = computed(() => {
  const featured = featuredPhotos.value
  if (featured.length > 0) {
    return featured[Math.floor(Math.random() * featured.length)].src
  }
  // 兜底：从全部照片中选
  return photos.length > 0 ? photos[0].src : ''
})
</script>
