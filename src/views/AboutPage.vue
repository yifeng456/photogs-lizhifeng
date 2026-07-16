<!-- 关于页：摄影师介绍 + 设备展示 -->
<template>
  <div class="pt-16">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">关于我</h1>
      <div class="prose max-w-none text-gray-600">
        <p>你好，我是一名摄影爱好者。</p>
        <p>这里记录了我的摄影作品和旅途中的点滴。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.title = '关于我 - 摄影作品集'
})
</script>
