<template>

<!--之前的-->
<div>
  <button class="flex flex-row items-center justify-start gap-1 rounded-md px-6 py-4 font-sans font-bold text-base-content shadow-numo-card">
    <span class="grow text-start text-primary-content"></span>
  </button>
</div>

<!--自調的-->
<div class="flex justify-center items-center m-2" @click="nextStep">
  <button class="flex flex-row relative items-center w-[350px] justify-start gap-1 rounded-full font-sans font-bold text-base-content shadow-numo-icon">
    <p class="flex h-12 grow items-center text-info ml-5">https://opennccu.com/u/Naijia</p>
    <img src="~/assets/images/openLinkIcon.png" class="top-1/2 mr-5 w-5 h-5" alt="open link pic">
  </button>
</div>

<div>
  <button class="specialcta-btn  shadow-special-cta-02 place-self-center rounded-10 px-6 py-3">
    <span class="text-[2vw] text-white min-[300px]:text-xl">下一步</span>
  </button>
</div>

<!--自調的新東西-->
<div class="flex justify-center items-center">
  <div class="flex gap-5">
    <div class="specialcta-btn shadow-special-cta-02 rounded-30 w-24 py-1"></div>
    <div class="relative w-24 py-1 flex cursor-default rounded-full shadow-numo-light-inset"></div>
    <div class="relative w-24 py-1 flex cursor-default rounded-full shadow-numo-light-inset"></div>
    <div class="relative w-24 py-1 flex cursor-default rounded-full shadow-numo-light-inset"></div>
  </div>
</div>


<!--自調的-->
<div>
  <button class="bg-base-100 shadow-numo-modal place-self-center rounded-10 px-4 py-2">
    <span class=" text-white text-sm">趕緊查看吧！</span>
  </button>
</div>

<!--之前的-->
<form class="shadow-input daisy-input flex flex-grow px-0 m-2 focus-within:outline-0 focus:outline-0 focus-within:shadow-input relative w-full items-center rounded-full">
  <input type="text" placeholder="貼上批量選課代碼" class="min-w-0 grow bg-transparent px-4 h-full w-full !focus:outline-none focus:border-none transition-[padding] duration-300 ease-in-out rounded-full font-medium px-4" value="">
  <button class="hidden no-animation daisy-btn flex gap-2 font-bold min-h-[36px] min-w-[75px] px-5 shadow-numo" disabled="" aria-label="submit-button">

  </button>
</form>

<!--自調的，搭配下方前兩個 style scoped-->
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
                    英文家教講義
                  </p>
    </button>
    <button class="flex flex-row items-center justify-start gap-1 rounded-full span-2 px-6 py-4 font-sans font-bold text-base-content shadow-numo-card">
                  <p class="font-medium text-info text-center">
                    英文家教講義
        </p>
    </button>
  </div>
</div>

<!--之前的 But-->

  <div>
    <button class="flex flex-row items-center justify-start gap-1 rounded-lg span-2 px-6 py-4 font-sans font-bold text-base-content shadow-numo-card">
    </button>
  </div>

<!--自調的 But-->

<div>
    <button class="flex flex-row items-center justify-start gap-1 rounded-full span-2 px-6 py-4 font-sans font-bold text-base-content shadow-numo-card">
      <p class="text-xl text-info font-semibold text-center">
        英文家教講義
      </p>
    </button>
</div>

  <!--自調的-->
  <div h-9>
    <iframe :key="url.key" :src="url.src" width="600" height="500"></iframe>
  </div>

</template>

<script setup>
import '~/assets/css/tailwind base.css';
import '~/assets/css/tailwind.css';
import '~/assets/css/transition.css';

/*之前的 But*/
import ComponentSheetButton from '~/components/Sheet/FullWidthButton.vue';


import { reactive } from 'vue'; 
const url = reactive({ key: 1, src: 'https://opennccu.com/u/lulu', });

/*按鈕的內容*/
const message = ref('');
</script>

<style>
/*特殊色*/
.specialcta-btn {
  background: linear-gradient(93.24deg, #94ccb8 13.26%, #44aaba 82.72%);
  box-shadow: inset 3px 3px 10px rgba(255, 255, 255, 0.7),
    inset -3px -3px 10px #1693ba;
}

.rounded-10{border-radius:10px}
.outline-none:focus { outline: none}
.border-none:focus { border: none }
</style>

<style scoped>
.w-\[350px\]{
width: 350px;
}

.right-\[5\%\]{
  right:5%
}

.ml-5{margin-left:1.25rem}
</style>