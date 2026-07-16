<!-- 作品集页：分类筛选 + 瀑布流展示 -->
<template>
  <div class="pt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">作品集</h1>
      <p class="text-muted">照片正在加载中...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = '作品集 - 摄影作品集'
})
</script>
