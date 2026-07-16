<!--
  关于页：摄影师介绍 + 器材展示 + 联系方式
  - 顶部个人卡片（头像 + 简介）
  - 器材装备网格
  - 联系方式
-->
<template>
  <div>
    <!-- 页面头部横幅 -->
    <section class="pt-24 pb-8 border-b border-gray-100">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-sm uppercase tracking-[0.2em] text-accent font-medium mb-3">
          关于我
        </p>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900">
          用镜头，与世界对话
        </h1>
      </div>
    </section>

    <!-- 个人卡片 -->
    <section class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex flex-col sm:flex-row items-center gap-8 mb-12">
        <!-- 头像 -->
        <div class="flex-shrink-0">
          <div class="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <span class="text-5xl">📷</span>
          </div>
        </div>

        <!-- 基本信息 -->
        <div class="text-center sm:text-left">
          <h2 class="text-2xl font-bold text-gray-900 mb-1">你好，我是志峰</h2>
          <p class="text-muted text-sm mb-4">摄影爱好者 · 旅行记录者 · 光影追逐者</p>
          <p class="text-gray-600 leading-relaxed text-sm">
            热爱摄影始于一次川西之旅，从此爱上了用镜头记录光影的方式。
            对我而言，摄影不仅是按下快门的瞬间，更是与世界的对话——
            用取景框重新发现被忽略的美好，用光影讲述每一个独特的故事。
          </p>
        </div>
      </div>

      <!-- 统计数据 -->
      <div class="grid grid-cols-3 gap-4 mb-16">
        <div class="text-center p-4 rounded-xl bg-gray-50">
          <p class="text-2xl font-bold text-gray-900">{{ photoCount }}</p>
          <p class="text-xs text-muted mt-1">作品数</p>
        </div>
        <div class="text-center p-4 rounded-xl bg-gray-50">
          <p class="text-2xl font-bold text-gray-900">{{ categoryCount }}</p>
          <p class="text-xs text-muted mt-1">主题分类</p>
        </div>
        <div class="text-center p-4 rounded-xl bg-gray-50">
          <p class="text-2xl font-bold text-gray-900">2</p>
          <p class="text-xs text-muted mt-1">年摄影之路</p>
        </div>
      </div>
    </section>

    <!-- 器材装备 -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-100">
      <h2 class="text-xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        我的装备
      </h2>

      <div class="grid md:grid-cols-2 gap-6">
        <div
          v-for="gear in gearList"
          :key="gear.name"
          class="flex gap-4 p-5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <!-- 图标 -->
          <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-white flex items-center justify-center text-2xl shadow-sm">
            {{ gear.icon }}
          </div>
          <!-- 信息 -->
          <div class="min-w-0">
            <h3 class="font-semibold text-gray-900 text-sm">{{ gear.name }}</h3>
            <p class="text-xs text-muted mt-0.5">{{ gear.description }}</p>
            <span class="inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full bg-white text-muted border border-gray-200">
              {{ gear.type }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系方式 -->
    <section class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-100">
      <h2 class="text-xl font-bold text-gray-900 mb-8 text-center">联系我</h2>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          v-for="contact in contacts"
          :key="contact.label"
          :href="contact.url"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
        >
          <span class="text-lg">{{ contact.icon }}</span>
          <span>{{ contact.label }}</span>
        </a>
      </div>

      <!-- 合作说明 -->
      <p class="text-center text-xs text-muted mt-8">
        如果你也热爱摄影，或者有合作意向，欢迎通过以上方式联系我
        <br class="hidden sm:block">
        一起在光影的世界里，发现更多美好
      </p>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePhotos } from '@/composables/usePhotos.js'
import { categories } from '@/data/categories.js'

const { photos } = usePhotos()

const photoCount = computed(() => photos.length)
const categoryCount = computed(() => categories.length - 1) // 排除 "all"

/** 器材列表 */
const gearList = [
  {
    icon: '📷',
    name: 'Sony A7M4',
    description: '全画幅微单主力机，3300 万像素',
    type: '机身',
  },
  {
    icon: '🔭',
    name: 'FE 24-70mm F2.8 GM II',
    description: '标准变焦，风光街拍万金油',
    type: '镜头',
  },
  {
    icon: '🖼️',
    name: 'FE 85mm F1.4 GM',
    description: '人像大光圈定焦，奶油般虚化',
    type: '镜头',
  },
  {
    icon: '🌟',
    name: 'FE 14mm F1.8 GM',
    description: '超广角大光圈，星空银河利器',
    type: '镜头',
  },
  {
    icon: '📸',
    name: 'Fujifilm X-T5',
    description: '复古旁轴画质机，街头随身利器',
    type: '机身',
  },
  {
    icon: '👁️',
    name: 'XF 23mm F1.4 R LM WR',
    description: '等效 35mm 人文视角，街拍之眼',
    type: '镜头',
  },
]

/** 联系方式 */
const contacts = [
  { icon: '🐙', label: 'GitHub', url: 'https://github.com/yifeng456' },
  { icon: '📷', label: 'Instagram', url: 'https://instagram.com/' },
  { icon: '📧', label: 'Email', url: 'mailto:hello@example.com' },
]
</script>
