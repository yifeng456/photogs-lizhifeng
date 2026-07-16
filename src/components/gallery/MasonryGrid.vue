<!--
  瀑布流布局网格
  - CSS Columns 实现，无需 JS 计算位置
  - 断点自适应：手机 2 列 / 平板 3 列 / 桌面 4 列
  - TransitionGroup 实现筛选切换动画
-->
<template>
  <section>
    <!-- 结果提示 -->
    <p class="text-sm text-muted mb-6">
      共 <span class="text-gray-700 font-medium">{{ photos.length }}</span> 张作品
      <span v-if="photos.length === 0" class="ml-2">— 暂无照片</span>
    </p>

    <!-- 瀑布流网格 -->
    <TransitionGroup
      name="masonry"
      tag="div"
      class="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
    >
      <PhotoCard
        v-for="photo in photos"
        :key="photo.id"
        :photo="photo"
        @click="$emit('photo-click', photo)"
        class="break-inside-avoid"
      />
    </TransitionGroup>

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
import PhotoCard from './PhotoCard.vue'

defineProps({
  /** 要展示的照片列表 */
  photos: { type: Array, required: true },
})

defineEmits(['photo-click', 'reset-filter'])
</script>

<style scoped>
/* 筛选切换时的过渡动画 */
.masonry-enter-active {
  transition: all 0.4s ease-out;
}
.masonry-leave-active {
  transition: all 0.3s ease-in;
  position: absolute;
}
.masonry-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.97);
}
.masonry-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}
.masonry-move {
  transition: transform 0.4s ease;
}
</style>
