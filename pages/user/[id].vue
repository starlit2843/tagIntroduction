<template>
  <div class="flex justify-around py-4 max-w-screen-lg mx-auto">
    <div class="flex flex-col gap-8 bg-gray-100">
      <div class="flex justify-between items-center grid-cols-3">
        <span class="last_step text-2xl font-semibold cursor-pointer" @click="lastStep" v-if="currentStep>1">
          上一步
        </span>
        <span class="last_step text-2xl font-semibold cursor-pointer" @click="lastStep" v-else>

        </span>
        <p class="text-2xl text-gray-300 font-semibold text-center">
          限時連結功能指引
        </p>
        <span class="skip_tutorial text-2xl font-semibold cursor-pointer" @click="skipTutorial">
          跳過教學
        </span>
      </div>
      <iframe src="https://opennccu.com/u/Naijia" width="400" height="400" scrolling="yes" align="center"></iframe>
      <BottomBar :activeIndex="currentStep" />
      <TextField :activeIndex="currentStep" />
      <div class="flex justify-center" v-if="currentStep<4">
        <button class="specialcta-btn shadow-special-cta-02 place-self-center rounded-10 px-6 py-3" @click="nextStep">
          <span class="text-[2vw] text-white min-[300px]:text-xl">下一步</span>
        </button>
      </div><div class="flex justify-center" v-if="currentStep==4">
        <button class="specialcta-btn shadow-special-cta-02 place-self-center rounded-10 px-6 py-3" @click="nextStep">
          <span class="text-[2vw] text-white min-[300px]:text-xl">馬上去設置</span>
        </button>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script setup>
  import '~/assets/css/tailwind base.css';
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import BottomBar from '~/components/tag_introduction/bottom_bar.vue';
  import TextField from '~/components/tag_introduction/text_field.vue';

  const route = useRoute();
  const { id } = route.params;

  const currentStep = ref(1);
  const maxSteps = 4;

  function skipTutorial() {
    alert("跳過教學");
  }

  function nextStep() {
    if (currentStep.value < maxSteps) {
      currentStep.value += 1;
    }
  }

  function lastStep() {
    if (currentStep.value > 1) {
      currentStep.value -= 1;
    }
  }
</script>

<style lang="css">
  .skip_tutorial, .last_step{
    color:darkseagreen;
  }
</style>