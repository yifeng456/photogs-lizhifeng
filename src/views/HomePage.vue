<!-- 首页：Hero 横幅 + 精选作品网格 -->
<template>
  <div class="pt-16">
    <div class="flex items-center justify-center min-h-[60vh] bg-gray-50">
      <div class="text-center">
        <h1 class="text-5xl font-bold text-gray-900 mb-4">光影记录</h1>
        <p class="text-xl text-muted">用镜头记录生活的美好瞬间</p>
        <router-link
          to="/gallery"
          class="inline-block mt-8 px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          浏览作品集
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = '首页 - 摄影作品集'
})
</script>
