<template>
    <div class="flex justify-center items-center">
      <div class="flex gap-5">
        <!-- 第一頁 -->
        <div
          v-if="activeIndex == 1"
        >
            <p>
                每次報告、列印都在陌生電腦上登入私人帳號嗎？
            </p>
            <p>
                有了Open NCCU限時連結功能，再也不用煩惱了！
            </p>
        </div>
  
        <!-- 第二頁 -->
        <div
          v-if="activeIndex == 2"
        >
            <p>在首頁點擊「編輯限時連結」並選擇你想要的連結吧！</p>
            <form class="flex flex-grow px-0 m-2 relative w-full items-center rounded-full">
                <div class="relative max-w-lg m-2 flex h-12 cursor-default rounded-full text-center shadow-numo-light-inset">
                    <input v-model="message" placeholder="馬上新增限時連結#1" class="min-w-0 grow bg-transparent px-4 h-full w-full outline-none border-none transition-[padding] duration-300 ease-in-out rounded-full font-medium">
                </div>
            </form>
        </div>
  
        <!-- 第三頁 -->
        <div
          v-if="activeIndex == 3"
        >
            <p>
                按下儲存就大功告成啦！這個網站對外公開，不需登入
            </p>
            <p>
                就能使用～現在就打開個人頁面查看限時連結吧！
            </p>
        </div>
  
        <!-- 第四頁 -->
        <div
          v-if="activeIndex == 4"
        >
            <p>
                除此之外，最多還可以新增2個限時連結。
            </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    activeIndex: {
      type: Number,
      required: true,
      default: 0
    }
  });
  </script>
  
  