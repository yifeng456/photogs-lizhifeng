<!-- 照片详情页：大图展示 + EXIF 信息 -->
<template>
  <div class="pt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <router-link to="/gallery" class="text-accent hover:underline text-sm mb-4 inline-block">
        ← 返回作品集
      </router-link>
      <h1 class="text-3xl font-bold text-gray-900 mb-4">照片详情</h1>
      <p class="text-muted">页面正在建设中...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = '照片详情 - 摄影作品集'
})
</script>
