<!--
  视频播放器弹窗
  - Teleport 到 <body>
  - 全屏半透明遮罩 + B站 iframe 嵌入
  - 响应式：桌面 16:9，移动端全宽
  - Esc 关闭，点击遮罩关闭
  - 打开时阻止页面滚动
-->
<template>
  <Teleport to="body">
    <Transition name="player">
      <div
        v-if="visible"
        class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
        @click.self="close"
      >
        <!-- 顶部工具栏 -->
        <div class="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3">
          <h3 class="text-sm text-white/90 font-medium truncate mr-4">
            {{ video?.title }}
          </h3>
          <button
            @click="close"
            class="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors flex-shrink-0"
            aria-label="关闭"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 视频嵌入区域 -->
        <div class="w-full max-w-5xl px-4 md:px-0">
          <div class="relative w-full" style="padding-top: 56.25%;">
            <iframe
              v-if="video"
              class="absolute top-0 left-0 w-full h-full rounded-lg"
              :src="embedUrl"
              allowfullscreen
              allow="autoplay; encrypted-media"
              frameborder="0"
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, watch, onMounted, onUnmounted } from 'vue'
import { getBilibiliEmbedUrl } from '@/data/videos.js'

const props = defineProps({
  visible: { type: Boolean, default: false },
  video: { type: Object, default: null },
})

const emit = defineEmits(['close'])

const embedUrl = computed(() => {
  return props.video ? getBilibiliEmbedUrl(props.video.bvid) : ''
})

function close() {
  emit('close')
}

function onKeyDown(e) {
  if (!props.visible) return
  if (e.key === 'Escape') close()
}

watch(() => props.visible, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
  } else {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', onKeyDown)
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', onKeyDown)
})
</script>

<style scoped>
.player-enter-active { transition: opacity 0.3s ease; }
.player-leave-active { transition: opacity 0.2s ease; }
.player-enter-from,
.player-leave-to { opacity: 0; }
</style>
