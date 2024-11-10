<template>
    <div class="flex justify-around py-4 max-w-screen-lg mx-auto h-screen overflow-y-auto">
      <div class="flex flex-col gap-6 bg-gray-100">
        <div class="flex justify-between items-center grid-cols-3">
          <span v-if="currentStep > 1" class="last_step text-xl font-semibold cursor-pointer" @click="lastStep">
            上一步
          </span>
          <!--使限時連結功能置中-->
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
  
        <!--gif/iframe-->
        <div class="flex justify-center items-center" v-if="currentStep==1">
          <div class="w-[400px] h-[410px] rounded-lg border border-gray-300 relative shadow-numo-light-inset">
            <img :src="dogLoadGif" alt="dog loading pic" class="h-full w-full rounded-lg border border-gray-300"/>
          </div>
        </div>
        <div class="flex justify-center items-center" v-if="currentStep==2">
          <div class="w-[400px] h-[410px] rounded-lg border border-gray-300 relative shadow-numo-light-inset">
            <img :src="dogWorkGif" alt="dog working pic" class="h-full w-full rounded-lg border border-gray-300"/>
          </div>
        </div>
        <div class="flex justify-center items-center" v-if="currentStep==3">
          <div class="w-[400px] h-[410px] rounded-lg border border-gray-300 relative shadow-numo-light-inset">
            <img :src="deerWorkGif" alt="deer working pic" class="h-full w-full rounded-lg border border-gray-300"/>
          </div>
        </div>
        <div class="flex justify-center items-center" v-if="currentStep==4">
          
          <div class="w-[400px] h-[410px] rounded-lg border border-gray-300 relative shadow-numo-light-inset">
            <iframe src="https://opennccu.com/u/Naijia" scrolling="yes" class="h-full w-full rounded-lg border border-gray-300"></iframe>
          

          <!-- 陰影測試 
          <div class="relative w-[400px] h-[410px]">
           
            <div class="pointer-events-none absolute inset-0 rounded-lg border border-gray-300 shadow-numo-light-inset" style="z-index: 20;"></div>
            <div class="absolute bg-white" style="inset: 16px; z-index: 10;">
              <iframe src="https://opennccu.com/u/lulu" scrolling="yes" id="myIframe" class="border-0 w-full h-full"
              ></iframe>
            </div>
            -->
          </div>
        </div>
  
        <BottomBar :activeIndex="currentStep" />
  
        <TextField :activeIndex="currentStep" @updateLinkSelected="updateLinkSelected"/>
  
        <!--button們-->
        <!--fade待做 讓button有漸入效果-->
        <!--<transition name="fade">-->
        <div class="flex justify-center" v-if="currentStep==1">
          <button class="specialcta-btn shadow-special-cta-02 place-self-center rounded-10 px-6 py-3" @click="nextStep">
            <span class="text-[2vw] text-white min-[300px]:text-xl">下一步</span>
          </button>
        </div>
  
        <div class="flex justify-center" v-if="currentStep==2">
          <div @click="check" v-if="!linkSelected">
            <button class="bg-base-100 shadow-numo-modal place-self-center rounded-10 px-4 py-2">
              <span class=" text-white text-sm">您尚未選擇限時連結</span>
            </button>
          </div>
          <div v-else>
            <button class="specialcta-btn shadow-special-cta-02 place-self-center rounded-10 px-6 py-3" @click="nextStep">
              <span class="text-[2vw] text-white min-[300px]:text-xl">下一步</span>
            </button>
          </div>
        </div>
  
        <div class="flex justify-center" v-if="currentStep==3">
          <button class="specialcta-btn shadow-special-cta-02 place-self-center rounded-10 px-6 py-3" @click="nextStep">
            <span class="text-[2vw] text-white min-[300px]:text-xl">下一步</span>
          </button>
        </div>
  
        <div class="flex justify-center" v-if="currentStep==4">
          <button class="specialcta-btn shadow-special-cta-02 place-self-center rounded-10 px-6 py-3" @click="">
            <span class="text-[2vw] text-white min-[300px]:text-xl">馬上去設置</span>
          </button>
        </div>
  
      </div>
    </div>
  </template>
  
  <script setup>
    import '~/assets/css/tailwind base.css';
    import { ref, reactive } from 'vue';
    import { useRoute } from 'vue-router';
    import BottomBar from '@/components/tag_introduction/bottom_bar.vue';
    import TextField from '@/components/tag_introduction/text_field.vue';
  
    import dogLoadingGif from '@/assets/images/dogLoading.gif';
    import dogWorkingGif from '@/assets/images/dogWorking.gif';
    import deerWorkingGif from '@/assets/images/deerWorking.gif';
    const dogLoadGif = ref(dogLoadingGif);
    const dogWorkGif = ref(dogWorkingGif);
    const deerWorkGif = ref(deerWorkingGif);
    
    /*
    const route = useRoute();
    const { id } = route.params;
    */
   
    //測試用 可刪除
    document.getElementById('myIframe').addEventListener('load', function() { 
       this.style.padding = '10px'; 
       this.style.boxSizing = 'border-box'; 
      });
    //
  
    const currentStep = ref(1);
    const maxSteps = 4;
    const linkSelected = ref(false);
  
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
        linkSelected.value = false;
      }
    }
    function check(){
      alert("您尚未註冊！");
    }
  
    function updateLinkSelected(value) {
      linkSelected.value = value;
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

    /*以下均為測試*/
    .w-\[380px\]{
      width: 380px;
    }
    .h-\[380px\]{
      height: 380px;
    }
    .inset-0{
      top: 0px; 
      right: 0px; 
      bottom: 0px; 
      left: 0px;
    }
    .inset-4{
      top: 1rem; 
      right: 1rem; 
      bottom: 1rem; 
      left: 1rem;
    }
    .shadow-container::before { 
      content: '';
      position: absolute; 
      top: 0;
      left: 0;
       right: 0; 
       bottom: 0; 
       border-radius: 0.5rem; 
       box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
        pointer-events: none; 
        /* 確保這個陰影層不會干擾其他操作 */ 
      }
  </style>