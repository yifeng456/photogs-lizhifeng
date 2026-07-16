<!--
  顶部导航栏
  - 固定顶部，滚动时添加毛玻璃背景
  - 移动端：汉堡菜单展开
  - PC 端：横向导航链接
-->
<template>
  <nav
    class="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
    :class="isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="text-xl font-bold tracking-tight text-gray-900 hover:text-accent transition-colors">
          📷 光影记录
        </router-link>

        <!-- PC 端导航 -->
        <div class="hidden md:flex items-center gap-8">
          <router-link
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="text-sm font-medium text-gray-600 hover:text-accent transition-colors"
            active-class="text-accent"
          >
            {{ item.label }}
          </router-link>
        </div>

        <!-- 移动端汉堡按钮 -->
        <button
          class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          @click="mobileOpen = !mobileOpen"
          aria-label="菜单"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- 移动端菜单 -->
      <Transition name="mobile-menu">
        <div v-if="mobileOpen" class="md:hidden pb-4">
          <router-link
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="block py-2 text-sm font-medium text-gray-600 hover:text-accent transition-colors"
            active-class="text-accent"
            @click="mobileOpen = false"
          >
            {{ item.label }}
          </router-link>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

/** 导航项配置 */
const navItems = [
  { label: '首页', to: '/' },
  { label: '作品集', to: '/gallery' },
  { label: '关于我', to: '/about' },
]

const mobileOpen = ref(false)
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.2s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
