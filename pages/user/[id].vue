<template>
  <div class="flex justify-around py-4 max-w-screen-lg mx-auto">
    <div class="flex flex-col gap-6 bg-gray-100">
      <div class="flex justify-between items-center grid-cols-3">
        <span v-if="currentStep > 1" class="last_step text-xl font-semibold cursor-pointer" @click="lastStep">
          上一步
        </span>
        <span v-else class="text-xl font-semibold opacity-0">
          上一步
        </span>
        <p class="text-xl text-gray-300 font-semibold text-center">
          限時連結功能指引
        </p>
        <span class="skip_tutorial text-xl font-semibold cursor-pointer" @click="skipTutorial">
          跳過教學
        </span>
      </div>
      <div class="flex justify-center items-center">
        <div class="w-[400px] h-[410px] rounded-lg border border-gray-300 relative shadow-numo-light-inset">
          <iframe src="https://opennccu.com/u/Naijia" scrolling="yes" class="h-full w-full rounded-lg border border-gray-300"></iframe>
        </div>
      </div>
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

<style scoped>
.w-\[400px\]{
  width: 400px;
}
.h-\[410px\]{
  height: 410px;
}

</style>