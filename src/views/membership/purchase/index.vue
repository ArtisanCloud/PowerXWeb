<script setup lang="ts">
  import styles from './index.module.less';
</script>

<template>
  <div :class="styles.container">
    <span class="font-bold">购买会籍</span>
    <!-- 1. 加粗文字 -->
    <span class="font-bold">加粗文字</span>

    <!-- 2. 文字颜色 -->
    <span class="text-red-500">红色文字</span>

    <!-- 3. 文字大小 -->
    <span class="text-lg">大号文字</span>

    <!-- 4. 文字对齐 -->
    <span class="text-center">居中对齐文字</span>

    <!-- 5. 文字阴影 -->
    <span class="shadow-md">带阴影的文字</span>

    <!-- 6. 文字行高 -->
    <span class="leading-8">行高为 2 的文字</span>

    <!-- 7. 文字转换为大写 -->
    <span class="uppercase">大写文字</span>

    <!-- 8. 字体颜色、背景色、圆角、内边距等 -->
    <span class="text-white bg-blue-500 px-4 py-2 rounded-lg"
      >带背景和内边距的文字</span
    >
  </div>
</template>
