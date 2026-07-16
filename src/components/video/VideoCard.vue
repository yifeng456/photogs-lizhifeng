<!--
  视频封面卡片
  - 封面图 + 居中播放按钮
  - 悬停放大 + 标题叠加层
  - 时长标签（右下角）
-->
<template>
  <div
    class="group relative rounded-lg overflow-hidden bg-gray-100 cursor-pointer break-inside-avoid"
    @click="$emit('click')"
  >
    <!-- 封面图 -->
    <img
      :src="video.thumbnail"
      :alt="video.title"
      class="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
    />

    <!-- 居中播放按钮 -->
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-white">
        <svg class="w-6 h-6 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </div>
    </div>

    <!-- 时长标签 -->
    <span class="absolute bottom-3 right-3 text-xs px-2 py-0.5 rounded bg-black/70 text-white font-mono">
      {{ video.duration }}
    </span>

    <!-- 悬停标题 -->
    <div class="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <h3 class="text-sm font-semibold text-white truncate">{{ video.title }}</h3>
    </div>
  </div>
</template>

<script setup>
defineProps({
  video: { type: Object, required: true },
})

defineEmits(['click'])
</script>
