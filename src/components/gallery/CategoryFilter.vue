<!--
  分类筛选按钮组
  - PC 端：居中排列的标签按钮
  - 移动端：横向可滚动的标签组
  - active 状态：高亮颜色 + 下划线
  - 每个标签显示分类名称和照片数量
-->
<template>
  <div class="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
    <div class="flex gap-2 sm:gap-3 pb-2 min-w-max sm:flex-wrap sm:justify-center">
      <button
        v-for="cat in categories"
        :key="cat.key"
        @click="$emit('select', cat.key)"
        class="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300"
        :class="activeCategory === cat.key
          ? 'bg-gray-900 text-white shadow-md'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
      >
        <span>{{ cat.icon }}</span>
        <span>{{ cat.label }}</span>
        <span
          class="text-xs px-1.5 py-0.5 rounded-full"
          :class="activeCategory === cat.key
            ? 'bg-white/20'
            : 'bg-gray-200 text-gray-500'"
        >
          {{ categoryCounts[cat.key] || 0 }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  /** 分类列表 */
  categories: { type: Array, required: true },
  /** 当前激活的分类 key */
  activeCategory: { type: String, required: true },
  /** 每个分类的照片数量 { landscape: 3, street: 3, ... } */
  categoryCounts: { type: Object, default: () => ({}) },
})

defineEmits(['select'])
</script>

<style scoped>
/* 隐藏滚动条，但保留滚动功能 */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
