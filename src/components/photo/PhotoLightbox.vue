<!--
  照片灯箱组件
  - Teleport 到 <body>，避免 z-index 问题
  - 全屏半透明遮罩 + 大图居中
  - 左右箭头切换（多张时显示）
  - 键盘导航：← 上一张 / → 下一张 / Esc 关闭
  - 移动端手势：左右滑动切换
  - 右上角关闭按钮 + 点击遮罩关闭
  - 底部缩略图导航条（可选，多张时显示）
  - 打开时阻止页面滚动
-->
<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="visible"
        ref="overlayRef"
        class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
        @click.self="close"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
      >
        <!-- 顶部工具栏 -->
        <div class="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3">
          <!-- 照片计数 -->
          <span class="text-sm text-white/70">
            {{ currentIndex + 1 }} / {{ photos.length }}
          </span>

          <!-- 照片标题（移动端隐藏） -->
          <span class="hidden sm:block text-sm text-white/80 font-medium truncate mx-4">
            {{ currentPhoto?.title }}
          </span>

          <!-- 关闭按钮 -->
          <button
            @click="close"
            class="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors ml-auto"
            aria-label="关闭"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 左箭头 -->
        <button
          v-if="hasPrev"
          @click.stop="goPrev"
          class="absolute left-2 md:left-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110"
          aria-label="上一张"
        >
          <svg class="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- 图片容器 -->
        <div class="relative flex items-center justify-center w-full h-full p-16 md:p-20">
          <!-- 加载动画 -->
          <Transition name="fade">
            <div
              v-if="imgLoading"
              class="absolute inset-0 flex items-center justify-center"
            >
              <div class="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          </Transition>

          <!-- 大图 -->
          <img
            :key="currentPhoto?.id"
            :src="currentPhoto?.src"
            :alt="currentPhoto?.title"
            class="max-h-full max-w-full object-contain select-none transition-opacity duration-200"
            :class="{ 'opacity-0': imgLoading, 'opacity-100': !imgLoading }"
            @load="imgLoading = false"
            draggable="false"
          />
        </div>

        <!-- 右箭头 -->
        <button
          v-if="hasNext"
          @click.stop="goNext"
          class="absolute right-2 md:right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110"
          aria-label="下一张"
        >
          <svg class="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- 底部缩略图导航条 -->
        <div
          v-if="photos.length > 1"
          class="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5"
        >
          <button
            v-for="(_, idx) in photos"
            :key="idx"
            @click="goTo(idx)"
            class="w-2 h-2 rounded-full transition-all duration-300"
            :class="idx === currentIndex
              ? 'bg-white w-4'
              : 'bg-white/40 hover:bg-white/60'"
            :aria-label="`第 ${idx + 1} 张`"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  /** 是否显示灯箱 */
  visible: { type: Boolean, default: false },
  /** 所有照片列表（用于前后切换） */
  photos: { type: Array, default: () => [] },
  /** 当前显示的照片在 photos 数组中的索引 */
  initialIndex: { type: Number, default: 0 },
})

const emit = defineEmits(['close'])

const currentIndex = ref(props.initialIndex)
const imgLoading = ref(true)
const overlayRef = ref(null)

// 触摸手势状态
let touchStartX = 0

// ===== 计算属性 =====

const currentPhoto = computed(() => props.photos[currentIndex.value] || null)
const hasPrev = computed(() => currentIndex.value > 0)
const hasNext = computed(() => currentIndex.value < props.photos.length - 1)

// ===== 导航方法 =====

function goPrev() {
  if (hasPrev.value) {
    imgLoading.value = true
    currentIndex.value--
  }
}

function goNext() {
  if (hasNext.value) {
    imgLoading.value = true
    currentIndex.value++
  }
}

function goTo(index) {
  if (index !== currentIndex.value && index >= 0 && index < props.photos.length) {
    imgLoading.value = true
    currentIndex.value = index
  }
}

function close() {
  emit('close')
}

// ===== 键盘导航 =====

function onKeyDown(e) {
  if (!props.visible) return
  switch (e.key) {
    case 'ArrowLeft':  goPrev(); break
    case 'ArrowRight': goNext(); break
    case 'Escape':     close();  break
  }
}

// ===== 移动端手势 =====

function onTouchStart(e) {
  touchStartX = e.touches[0].clientX
}

function onTouchEnd(e) {
  const diffX = e.changedTouches[0].clientX - touchStartX
  const threshold = 50 // 最小滑动距离（px）
  if (Math.abs(diffX) > threshold) {
    diffX > 0 ? goPrev() : goNext()
  }
}

// ===== 生命周期 =====

/** 打开/切换图片时阻止页面滚动 */
watch(() => props.visible, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
  } else {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', onKeyDown)
  }
})

/** 切换图片时重置加载状态 */
watch(() => props.initialIndex, (val) => {
  if (props.visible) {
    currentIndex.value = val
    imgLoading.value = true
  }
})

onMounted(() => {
  if (props.visible) {
    document.addEventListener('keydown', onKeyDown)
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', onKeyDown)
})
</script>

<style scoped>
/* 灯箱打开/关闭过渡 */
.lightbox-enter-active {
  transition: opacity 0.3s ease;
}
.lightbox-leave-active {
  transition: opacity 0.2s ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

/* 图片加载切换过渡 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
