<!--
  视频作品页
  - 网格展示视频列表
  - 点击弹出 B站 iframe 播放器
-->
<template>
  <div>
    <!-- 页面头部 -->
    <section class="pt-24 pb-8 border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-sm uppercase tracking-[0.2em] text-accent font-medium mb-3">
          视频作品
        </p>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          🎬 光影短片
        </h1>
        <p class="text-muted max-w-lg">
          用动态影像讲述光影故事，延时摄影、旅拍短片、后期教程
        </p>
      </div>
    </section>

    <!-- 视频网格 -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- 结果提示 -->
      <p class="text-sm text-muted mb-8">
        共 <span class="text-gray-700 font-medium">{{ videos.length }}</span> 部视频
      </p>

      <!-- 网格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <VideoCard
          v-for="video in videos"
          :key="video.id"
          :video="video"
          @click="openPlayer(video)"
        />
      </div>

      <!-- 空状态 -->
      <div
        v-if="videos.length === 0"
        class="flex flex-col items-center justify-center py-20 text-center"
      >
        <span class="text-6xl mb-4">🎬</span>
        <p class="text-lg text-gray-500">暂无视频作品</p>
      </div>
    </section>

    <!-- 视频播放器弹窗 -->
    <VideoPlayer
      :visible="playerVisible"
      :video="currentVideo"
      @close="playerVisible = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VideoCard from '@/components/video/VideoCard.vue'
import VideoPlayer from '@/components/video/VideoPlayer.vue'
import { videos } from '@/data/videos.js'
import { useSEO } from '@/composables/useSEO.js'

// SEO
useSEO({
  title: '视频作品',
  description: '光影短片 - 延时摄影、旅拍短片、摄影后期教程'
})

// 播放器状态
const playerVisible = ref(false)
const currentVideo = ref(null)

function openPlayer(video) {
  currentVideo.value = video
  playerVisible.value = true
}
</script>
