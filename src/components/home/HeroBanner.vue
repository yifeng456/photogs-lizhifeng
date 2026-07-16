<!--
  首页全屏主视觉横幅
  - 全屏高度，背景大图 + 渐变遮罩
  - 居中标题 + 副标题 + CTA 按钮
  - 向下滚动箭头指示器
-->
<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- 背景大图 -->
    <div class="absolute inset-0 z-0">
      <img
        :src="heroImage"
        alt=""
        class="w-full h-full object-cover"
        loading="eager"
      />
      <!-- 渐变遮罩 -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
    </div>

    <!-- 内容层 -->
    <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <!-- 小标签 -->
      <p class="text-sm uppercase tracking-[0.3em] text-white/80 mb-6 animate-fade-in">
        个人摄影作品集
      </p>

      <!-- 主标题 -->
      <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-delay">
        {{ title }}
      </h1>

      <!-- 副标题 -->
      <p class="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay-2">
        {{ subtitle }}
      </p>

      <!-- CTA 按钮组 -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-delay-3">
        <router-link
          to="/gallery"
          class="px-8 py-3.5 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
        >
          浏览作品集
        </router-link>
        <router-link
          to="/about"
          class="px-8 py-3.5 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
        >
          关于我
        </router-link>
      </div>
    </div>

    <!-- 向下滚动指示器 -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50 animate-bounce">
      <span class="text-xs tracking-widest uppercase">Scroll</span>
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </section>
</template>

<script setup>
defineProps({
  /** 背景大图地址 */
  heroImage: { type: String, required: true },
  /** 主标题 */
  title: { type: String, default: '光影记录' },
  /** 副标题 */
  subtitle: { type: String, default: '用镜头记录生活的美好瞬间' },
})
</script>

<style scoped>
/* 淡入动画序列 */
.animate-fade-in {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
}
.animate-fade-in-delay {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out 0.2s forwards;
}
.animate-fade-in-delay-2 {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out 0.4s forwards;
}
.animate-fade-in-delay-3 {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out 0.6s forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
