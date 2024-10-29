<template>

<div>
  <button class="flex flex-row items-center justify-start gap-1 rounded-md px-6 py-4 font-sans font-bold text-base-content shadow-numo-card">
    <span class="grow text-start text-primary-content"></span>
  </button>
</div>

<div>
  <button class="specialcta-btn place-self-center rounded-10 px-6 py-3">
    <span class="text-[2vw] text-white min-[300px]:text-xl">下一步</span>
  </button>
</div>

<div class="relative max-w-lg m-2 flex h-12 cursor-default rounded-full text-center shadow-numo-light-inset">

</div>

  <div>
    <ComponentSheetButton></ComponentSheetButton>

  </div>
</template>

<script setup>
import '~/assets/css/tailwind base.css';
import '~/assets/css/tailwind.css';
import '~/assets/css/transition.css';
import ComponentSheetButton from '~/components/Sheet/FullWidthButton.vue';

</script>

<style>
/*因為特殊色在tailwind.config中經測試無法使用，因此先按照Figma的css稿件 */
.specialcta-btn {
  background: linear-gradient(93.24deg, #94ccb8 13.26%, #44aaba 82.72%);
  box-shadow: inset 3px 3px 10px rgba(255, 255, 255, 0.7),
    inset -3px -3px 10px #1693ba;
}

.rounded-10{border-radius:10px}
</style>