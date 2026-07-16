<!--
  EXIF 信息面板
  - 网格展示拍摄参数：相机、镜头、焦距、光圈、快门、ISO
  - 拍摄日期和地点（如有 GPS 坐标）
  - 无数据时显示 "—"
-->
<template>
  <div class="bg-gray-50 rounded-xl p-6">
    <h3 class="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      拍摄参数
    </h3>

    <!-- 参数网格 -->
    <dl class="grid grid-cols-2 gap-4 text-sm">
      <!-- 相机 -->
      <div>
        <dt class="text-muted text-xs mb-0.5">相机</dt>
        <dd class="text-gray-900 font-medium">{{ exif.camera || '—' }}</dd>
      </div>

      <!-- 镜头 -->
      <div>
        <dt class="text-muted text-xs mb-0.5">镜头</dt>
        <dd class="text-gray-900 font-medium">{{ exif.lens || '—' }}</dd>
      </div>

      <!-- 焦距 -->
      <div>
        <dt class="text-muted text-xs mb-0.5">焦距</dt>
        <dd class="text-gray-900 font-medium">{{ exif.focalLength || '—' }}</dd>
      </div>

      <!-- 光圈 -->
      <div>
        <dt class="text-muted text-xs mb-0.5">光圈</dt>
        <dd class="text-gray-900 font-medium">{{ exif.aperture || '—' }}</dd>
      </div>

      <!-- 快门 -->
      <div>
        <dt class="text-muted text-xs mb-0.5">快门速度</dt>
        <dd class="text-gray-900 font-medium">{{ exif.shutterSpeed || '—' }}</dd>
      </div>

      <!-- ISO -->
      <div>
        <dt class="text-muted text-xs mb-0.5">ISO</dt>
        <dd class="text-gray-900 font-medium">{{ exif.iso || '—' }}</dd>
      </div>
    </dl>

    <!-- 分隔线 -->
    <hr class="my-4 border-gray-200">

    <!-- 日期 -->
    <div class="mb-3">
      <dt class="text-muted text-xs mb-0.5">拍摄日期</dt>
      <dd class="text-gray-900 font-medium text-sm">{{ formattedDate }}</dd>
    </div>

    <!-- 拍摄地点 -->
    <div v-if="location">
      <dt class="text-muted text-xs mb-0.5">拍摄地点</dt>
      <dd class="text-gray-900 font-medium text-sm flex items-center gap-1">
        <svg class="w-3.5 h-3.5 flex-shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {{ location.name }}
      </dd>
    </div>

    <!-- 标签 -->
    <hr class="my-4 border-gray-200">
    <div v-if="tags && tags.length" class="flex flex-wrap gap-2">
      <span
        v-for="tag in tags"
        :key="tag"
        class="text-xs px-2.5 py-1 bg-white rounded-full text-gray-600 border border-gray-200"
      >
        #{{ tag }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  exif: { type: Object, default: () => ({}) },
  location: { type: Object, default: null },
  tags: { type: Array, default: () => [] },
  date: { type: String, default: '' },
})

const formattedDate = computed(() => {
  if (!props.date) return '—'
  const d = new Date(props.date)
  if (isNaN(d.getTime())) return props.date
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
})
</script>
