<template>
    <div class="flex justify-center items-center">
      <div class="flex gap-5">
        <!-- 第一頁 -->
        <div
          v-if="activeIndex == 1"
          class="specialcta-btn shadow-special-cta-02 rounded-30 w-24 py-1"
        ></div>
        <div
          v-else
          class="relative w-24 py-1 flex cursor-default rounded-full shadow-numo-light-inset"
        ></div>
  
        <!-- 第二頁 -->
        <div
          v-if="activeIndex == 2"
          class="specialcta-btn shadow-special-cta-02 rounded-30 w-24 py-1"
        ></div>
        <div
          v-else
          class="relative w-24 py-1 flex cursor-default rounded-full shadow-numo-light-inset"
        ></div>
  
        <!-- 第三頁 -->
        <div
          v-if="activeIndex == 3"
          class="specialcta-btn shadow-special-cta-02 rounded-30 w-24 py-1"
        ></div>
        <div
          v-else
          class="relative w-24 py-1 flex cursor-default rounded-full shadow-numo-light-inset"
        ></div>
  
        <!-- 第四頁 -->
        <div
          v-if="activeIndex == 4"
          class="specialcta-btn shadow-special-cta-02 rounded-30 w-24 py-1"
        ></div>
        <div
          v-else
          class="relative w-24 py-1 flex cursor-default rounded-full shadow-numo-light-inset"
        ></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  // 接收 activeIndex 作為 prop 來控制按鈕位置
  const props = defineProps({
    activeIndex: {
      type: Number,
      required: true,
      default: 0
    }
  });
  </script>
  
  <style scoped>
  /* 如有需要可以在這裡加上樣式 */
  </style>
  