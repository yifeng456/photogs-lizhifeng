<!--
  页脚组件
  - 社交媒体链接
  - 版权信息
  - 返回顶部按钮
-->
<template>
  <footer class="border-t border-gray-200 bg-surface py-10 mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <!-- Logo + 简介 -->
        <div class="text-center md:text-left">
          <p class="text-sm font-medium text-gray-700">📷 光影记录</p>
          <p class="text-xs text-muted mt-1">用镜头记录生活的美好瞬间</p>
        </div>

        <!-- 社交媒体 -->
        <div class="flex items-center gap-6">
          <a
            v-for="link in socialLinks"
            :key="link.label"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-muted hover:text-accent transition-colors text-sm"
            :aria-label="link.label"
          >
            {{ link.icon }} {{ link.label }}
          </a>
        </div>

        <!-- 版权 -->
        <p class="text-xs text-muted">
          © {{ currentYear }} 光影记录. All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()

const socialLinks = [
  { label: 'GitHub', url: 'https://github.com/yifeng456', icon: '🐙' },
  { label: 'Instagram', url: 'https://instagram.com/', icon: '📷' },
]
</script>
