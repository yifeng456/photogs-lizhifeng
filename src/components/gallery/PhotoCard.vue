<!--
  单张照片卡片
  - 等高行布局：由父组件传入行高，本组件按照片宽高比计算宽度
  - 横向照片宽、竖向照片窄，均不变形
  - 悬停时显示标题和分类
  - 骨架屏加载占位
-->
<template>
  <div
    class="group relative rounded-lg overflow-hidden bg-gray-100 cursor-pointer"
    :style="cardStyle"
    @click="$emit('click')"
  >
    <!-- 图片 -->
    <img
      :src="photo.thumbnail"
      :alt="photo.title"
      class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
  /** 所在行的高度（px），等高行布局下必传 */
  height: { type: Number, required: true },
})

defineEmits(['click'])

const loaded = ref(false)

const categoryLabel = computed(() => {
  const cat = categories.find(c => c.key === props.photo.category)
  return cat ? `${cat.icon} ${cat.label}` : props.photo.category
})

const aspectRatio = computed(() => {
  const w = props.photo.width
  const h = props.photo.height
  return w && h ? w / h : 1
})

// flex-grow 设为宽高比：行内各照片按比例分配宽度，正好填满整行且不变形
const cardStyle = computed(() => ({
  flex: `${aspectRatio.value} 1 0`,
  height: `${props.height}px`,
  minWidth: 0,
}))
</script>
