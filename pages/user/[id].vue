<template>
  <div class="flex justify-around py-4 max-w-screen-lg mx-auto">
    <div class="flex flex-col gap-4 bg-gray-100">
      <div class="flex justify-between items-center grid-cols-3">
        <p></p>
        <p class="text-2xl text-gray-300 font-semibold text-center">
          限時連結功能指引
        </p>
        <span class="skip_tutorial text-2xl text-green-300 font-semibold cursor-pointer" @click="skipTutorial">
          跳過教學
        </span>
      </div>
      <iframe src="https://opennccu.com/u/Naijia" width="500" height="500" scrolling="yes" align="center"></iframe>
      <img src="~/assets/images/tutorial_1.png" width="500" alt="進度條圖示"/>
    </div>
  </div>
<<<<<<< HEAD
=======
  <div>
    <iframe src="https://www.nccu.edu.tw" width="500" scrolling="yes" align="center">
    </iframe>
  </div>
>>>>>>> a254450dba0f94cb969c0b3a350cfe6fdeaf5e4a
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const { id } = route.params;

function skipTutorial() {
  alert("跳過教學");
}
</script>
