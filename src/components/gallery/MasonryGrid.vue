<!--
  等高行布局网格
  - 每行照片高度统一，横向照片宽、竖向照片窄，整齐对齐不变形
  - 用 ResizeObserver 监听容器宽度，响应式重排
  - 断点自适应：手机 / 平板 / 桌面不同目标行高
-->
<template>
  <section>
    <!-- 结果提示 -->
    <p class="text-sm text-muted mb-6">
      共 <span class="text-gray-700 font-medium">{{ photos.length }}</span> 张作品
      <span v-if="photos.length === 0" class="ml-2">— 暂无照片</span>
    </p>

    <!-- 等高行网格 -->
    <div ref="containerRef" class="w-full">
      <!-- key 绑定照片集合签名：分类切换时重放淡入动画，窗口缩放时保持稳定不闪烁 -->
      <div :key="signature" class="grid-fade">
        <div
          v-for="(row, index) in rows"
          :key="index"
          class="flex items-start"
          :style="{ gap: `${gap}px`, marginBottom: `${gap}px` }"
        >
          <PhotoCard
            v-for="photo in row.photos"
            :key="photo.id"
            :photo="photo"
            :height="row.height"
            @click="$emit('photo-click', photo)"
          />
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div
      v-if="photos.length === 0"
      class="flex flex-col items-center justify-center py-20 text-center"
    >
      <span class="text-6xl mb-4">📭</span>
      <p class="text-lg text-gray-500">该分类下暂无作品</p>
      <button
        @click="$emit('reset-filter')"
        class="mt-4 text-accent hover:underline text-sm font-medium"
      >
        查看全部作品
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import PhotoCard from './PhotoCard.vue'
import { computeJustifiedLayout } from '@/utils/justifiedLayout.js'

const props = defineProps({
  /** 要展示的照片列表 */
  photos: { type: Array, required: true },
})

defineEmits(['photo-click', 'reset-filter'])

const containerRef = ref(null)
const containerWidth = ref(0)

// 响应式布局参数：按容器宽度分档
const gap = computed(() => (containerWidth.value < 640 ? 8 : 12))
const targetRowHeight = computed(() => {
  const w = containerWidth.value
  if (w < 640) return 150
  if (w < 1024) return 210
  return 260
})

// 计算等高行布局
const rows = computed(() =>
  computeJustifiedLayout(props.photos, containerWidth.value, {
    targetRowHeight: targetRowHeight.value,
    gap: gap.value,
  })
)

// 照片集合签名：用于分类切换时重放淡入动画
const signature = computed(() => props.photos.map(p => p.id).join(','))

let resizeObserver = null
onMounted(() => {
  resizeObserver = new ResizeObserver(entries => {
    const width = entries[0]?.contentRect?.width || 0
    containerWidth.value = Math.round(width)
  })
  if (containerRef.value) {
    resizeObserver.observe(containerRef.value)
  }
})
onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})
</script>

<style scoped>
/* 分类切换时的淡入动画（缩放触发重排时不影响，因为 key 未变） */
.grid-fade {
  animation: gridFadeIn 0.4s ease-out;
}
@keyframes gridFadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
</style>
