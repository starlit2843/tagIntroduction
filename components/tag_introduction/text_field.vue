<template>
    <div class="flex justify-center items-center">
      <div class="flex gap-5">
        <!-- 第一頁  -->
        <div
          v-if="activeIndex == 1"
        >
          <div class="flex justify-center items-center">
            <p class="break-all w-[370px] font-semibold">
                每次報告、列印都在陌生電腦上登入私人帳號嗎？  
                有了Open NCCU限時連結功能，再也不用煩惱了！
            </p>
          </div>
        </div>
  
        <!-- 第二頁 -->
        <div
          v-if="activeIndex == 2"
        >
            <div class="flex justify-center items-center">
              <p class="break-all w-[370px] font-semibold">
                在首頁點擊「編輯限時連結」並選擇你想要的連結吧
              </p>
            </div>
            <div class="flex justify-center items-center m-2" @click="">
              
              <div class="relative max-w-lg m-2 flex h-12 w-[350px] items-center cursor-default rounded-full shadow-numo-light-inset">
                <input v-model="message" placeholder="馬上新增限時連結#1" class="min-w-0 ml-2 grow bg-transparent px-4 h-full outline-none border-none transition-[padding] duration-300 ease-in-out rounded-full font-medium">
                <img src="~/assets/images/addLinkIcon.png" class="absolute right-[6%] top-1/2 transform -translate-y-1/2 w-6 h-6" alt="add link pic">
              </div>
              
            </div>
            <!--
            <div class="flex justify-center items-center">
              <form class="flex flex-grow px-0 m-2 relative w-[350px] items-center rounded-full ">
                  <div class="relative max-w-lg m-2 flex h-12 w-[350px] cursor-default rounded-full text-center shadow-numo-light-inset">
                      <input v-model="message" placeholder="馬上新增限時連結#1" class="min-w-0 grow bg-transparent px-4 h-full w-full outline-none border-none transition-[padding] duration-300 ease-in-out rounded-full font-medium">
                      <img src="~/assets/images/addLinkIcon.png" class="absolute right-[5%] top-1/2 transform -translate-y-1/2 w-5 h-5" alt="add link pic">
                  </div>
              </form>
            </div>
            <div class="flex justify-center items-center">
              <div class="flex gap-x-5">
                <button class="flex flex-row items-center justify-start gap-1 rounded-full span-2 px-6 py-4 font-sans font-bold text-base-content shadow-numo-card">
                  <p class="font-medium text-info text-center">
                    通識課期中報告
                  </p>
                </button>
                <button class="flex flex-row items-center justify-start gap-1 rounded-full span-2 px-6 py-4 font-sans font-bold text-base-content shadow-numo-card">
                  <p class="font-medium text-info text-center">
                    英文家教講義
                  </p>
                </button>
              </div>
            </div>
            -->
        </div>
  
        <!-- 第三頁 -->
        <div
          v-if="activeIndex == 3"
        >   <div class="flex justify-center items-center">
              <p class="break-all w-[370px] font-semibold">
                  按下儲存就大功告成啦！這個網站對外公開，不需登入就能使用～現在就打開個人頁面查看限時連結吧！
              </p>
            </div>
            <div class="flex justify-center items-center p-5" @click="">
              <button class="flex flex-row relative items-center w-[350px] justify-start gap-1 rounded-full font-sans font-bold text-base-content shadow-numo-icon">
                <p class="flex h-12 grow items-center text-info ml-5">https://opennccu.com/u/Naijia</p>
                <img src="~/assets/images/openLinkIcon.png" class="top-1/2 mr-5 w-5 h-5" alt="open link pic">
              </button>
            </div>
            <!--
            <div class="flex justify-center items-center">
              <button class="bg-base-100 shadow-numo-modal place-self-center rounded-10 px-5 py-2.5">
                <span class=" text-white text-sm">趕緊查看吧！</span>
              </button>
            </div>
            -->
        </div>
  
        <!-- 第四頁 -->
        <div
          v-if="activeIndex == 4"
        >
          <div class="flex justify-center items-center">
            <p class="break-all w-[370px] font-semibold">
                除此之外，最多還可以新增2個限時連結。
            </p>
          </div>
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
  
  <style scoped>
  .w-\[350px\]{
  width: 350px;
  }

  .right-\[6\%\]{
    right:6%
  }
  </style>
  