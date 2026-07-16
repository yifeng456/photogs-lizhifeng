<!--
  单张照片卡片
  - 缩略图按原图比例展示
  - 悬停时显示标题和分类
  - 骨架屏加载占位
-->
<template>
  <div
    class="group relative rounded-lg overflow-hidden bg-gray-100 mb-4 cursor-pointer break-inside-avoid"
    @click="$emit('click')"
  >
    <!-- 图片 -->
    <img
      :src="photo.thumbnail"
      :alt="photo.title"
      class="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
      :style="{ aspectRatio: `${photo.width}/${photo.height}` }"
      loading="lazy"
      @load="loaded = true"
    />

    <!-- 悬停遮罩 + 信息 -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
      <h3 class="text-sm font-semibold text-white truncate">{{ photo.title }}</h3>
      <p class="text-xs text-white/70 mt-0.5">{{ categoryLabel }}</p>
    </div>

    <!-- 骨架屏占位 -->
    <div
      v-if="!loaded"
      class="absolute inset-0 bg-gray-200 animate-pulse"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { categories } from '@/data/categories.js'

const props = defineProps({
  photo: { type: Object, required: true },
})

defineEmits(['click'])

const loaded = ref(false)

const categoryLabel = computed(() => {
  const cat = categories.find(c => c.key === props.photo.category)
  return cat ? `${cat.icon} ${cat.label}` : props.photo.category
})
</script>
