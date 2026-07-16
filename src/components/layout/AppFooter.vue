<!--
  页脚组件
  - 社交媒体链接
  - 版权信息
  - 简洁设计
-->
<template>
  <footer class="border-t border-gray-100 bg-surface py-8 mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- 社交媒体 -->
        <div class="flex items-center gap-4">
          <a
            v-for="link in socialLinks"
            :key="link.label"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-muted hover:text-accent transition-colors p-1"
            :aria-label="link.label"
          >
            <span class="text-sm">{{ link.icon }} {{ link.label }}</span>
          </a>
        </div>

        <!-- 版权 -->
        <p class="text-sm text-muted">
          © {{ currentYear }} 光影记录. All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()

const socialLinks = [
  { label: 'GitHub', url: 'https://github.com/', icon: '🐙' },
  { label: 'Instagram', url: 'https://instagram.com/', icon: '📷' },
]
</script>
