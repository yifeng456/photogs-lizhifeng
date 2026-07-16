<!--
  根组件：提供全局布局框架
  - AppNavbar：顶部导航栏
  - <router-view>：页面内容
  - AppFooter：页脚
-->
<template>
  <div class="min-h-screen flex flex-col bg-white text-gray-900">
    <AppNavbar />
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="$route.fullPath" />
        </Transition>
      </router-view>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<style>
/* 页面过渡动画 */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
