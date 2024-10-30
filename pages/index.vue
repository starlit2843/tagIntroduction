<template>

<!--之前的-->
<div>
  <button class="flex flex-row items-center justify-start gap-1 rounded-md px-6 py-4 font-sans font-bold text-base-content shadow-numo-card">
    <span class="grow text-start text-primary-content"></span>
  </button>
</div>

<!--自調的-->
<div>
  <button class="specialcta-btn  shadow-special-cta-02 place-self-center rounded-10 px-6 py-3">
    <span class="text-[2vw] text-white min-[300px]:text-xl">下一步</span>
  </button>
</div>

<!--之前的-->
<form class="shadow-input daisy-input flex flex-grow px-0 m-2 focus-within:outline-0 focus:outline-0 focus-within:shadow-input relative w-full items-center rounded-full">
  <input type="text" placeholder="貼上批量選課代碼" class="min-w-0 grow bg-transparent px-4 h-full w-full !focus:outline-none focus:border-none transition-[padding] duration-300 ease-in-out rounded-full font-medium px-4" value="">
  <button class="hidden no-animation daisy-btn flex gap-2 font-bold min-h-[36px] min-w-[75px] px-5 shadow-numo" disabled="" aria-label="submit-button">

  </button>
</form>

<!--自調的-->
<form class="flex flex-grow px-0 m-2 relative w-full items-center rounded-full">
  <div class="relative max-w-lg m-2 flex h-12 cursor-default rounded-full text-center shadow-numo-light-inset">
    <input v-model="message" placeholder="像哀居一樣取一個ID吧！" class="min-w-0 grow bg-transparent px-4 h-full w-full outline-none border-none transition-[padding] duration-300 ease-in-out rounded-full font-medium">
  </div>
</form>

<!--之前的-->
  <div>
    <ComponentSheetButton></ComponentSheetButton>

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

import ComponentSheetButton from '~/components/Sheet/FullWidthButton.vue';


import { reactive } from 'vue'; const url = reactive({ key: 1, src: 'https://opennccu.com/u/lulu', });

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