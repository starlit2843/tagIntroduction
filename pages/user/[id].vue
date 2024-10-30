<template>
  <div class="flex justify-around py-4 max-w-screen-lg mx-auto">
    <div class="flex flex-col gap-4 bg-gray-100">
      <div class="flex justify-between items-center">
        <p></p>
        <p class="text-2xl text-gray-300 font-semibold text-center">
          限時連結功能指引
        </p>
        <span class="skip_tutorial text-2xl font-semibold cursor-pointer" @click="skipTutorial">
          跳過教學
        </span>
      </div>
      <iframe src="https://opennccu.com/u/Naijia" width="500" height="500" class="mx-auto" scrolling="yes"></iframe>
      <img src="~/assets/images/tutorial_1.png" width="500" alt="進度條圖示" class="mx-auto"/>
      
      <div class="flex justify-center">
          <button class="specialcta-btn  shadow-special-cta-02 place-self-center rounded-10 px-6 py-3" @click="nextStep">
            <span class="text-[2vw] text-white min-[300px]:text-xl">下一步</span>
          </button>
        </div>
    </div>
  </div>
</template>

<script setup>
  import '~/assets/css/tailwind base.css';

  import { useRoute } from 'vue-router';

  const route = useRoute();
  const { id } = route.params;

  function skipTutorial() {
    alert("跳過教學");
  }

  function nextStep(){
    alert("下一步");
  }
</script>

<style lang="css">
  .skip_tutorial{
    color:darkseagreen;
  }
</style>
