<template>
  <div class="flex justify-around py-4 max-w-screen-lg mx-auto h-screen overflow-y-auto">
    <div class="flex flex-col gap-6 bg-gray-100">
      <div class="flex relative justify-between items-center grid-cols-3">
        <span v-if="currentStep > 1" class="last_step text-xl font-semibold cursor-pointer flex items-center" @click="lastStep">
          <img src="~/assets/images/leftArrowIcon.png" class="w-8 h-8" alt="last step pic">
          <span>上一步</span>
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
          <img :src="dogLoadGif" class="h-full w-full rounded-lg border border-gray-300"/>
        </div>
      </div>

      <div class="flex justify-center items-center" v-if="currentStep==2">
        <div class="w-[400px] h-[410px] rounded-lg border border-gray-300 relative shadow-numo-light-inset">
          <img :src="dogWorkGif" alt="dog working pic" class="h-full w-full rounded-lg border border-gray-300"/>
        </div>
      </div>

      <div class="flex justify-center items-center" v-if="currentStep==3">
        <div v-if="linkToProfileCheck">
          <div class="w-[400px] h-[410px] rounded-lg border border-gray-300 relative shadow-numo-light-inset">
            <iframe :src="`https://opennccu.com/u/${id}`" scrolling="yes" class="h-full w-full rounded-lg border border-gray-300"></iframe>
          </div>
        </div>
        <div v-else>
          <div class="w-[400px] h-[410px] rounded-lg border border-gray-300 relative shadow-numo-light-inset">
            <img :src="deerWorkGif" alt="deer working pic" class="h-full w-full rounded-lg border border-gray-300"/>
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center" v-if="currentStep==4">
        <div class="w-[400px] h-[410px] rounded-lg border border-gray-300 relative shadow-numo-light-inset">
          <img :src="dogWorkGif" alt="dog working pic" class="h-full w-full rounded-lg border border-gray-300"/>
        </div>
      </div>

      <BottomBar :activeIndex="currentStep" />

      <TextField :activeIndex="currentStep" 
                  @updateLinkSelected="updateLinkSelected" 
                  :id="id" 
                  :linkToProfileCheck="linkToProfileCheck"
                  @linkToProfile="linkToProfile"
                  :showLinks="showLinks"/>

      <!--button們-->
      <!--fade待做 讓button有漸入效果-->
      <!--<transition name="fade">-->
      <div class="flex justify-center" v-if="currentStep==1">
        <button class="specialcta-btn shadow-special-cta-02 place-self-center rounded-10 px-6 py-3" @click="nextStep">
          <span class="text-[2vw] text-white min-[300px]:text-xl">下一步</span>
        </button>
      </div>

      <div class="flex justify-center" v-if="currentStep==2">
        <div v-if="linkSelected">
          <button class="specialcta-btn shadow-special-cta-02 place-self-center rounded-10 px-6 py-3" @click="nextStep">
            <span class="text-[2vw] text-white min-[300px]:text-xl">下一步</span>
          </button>
        </div>
        <div v-else>
          <button class="bg-base-100 shadow-numo-modal place-self-center rounded-10 px-4 py-2" @click="check">
            <span class=" text-white text-sm">您尚未選擇限時連結</span>
          </button>
        </div>
      </div>

      <div class="flex justify-center" v-if="currentStep==3">
        <div v-if="linkToProfileCheck">
          <button class="specialcta-btn shadow-special-cta-02 place-self-center rounded-10 px-6 py-3" @click="nextStep">
            <span class="text-[2vw] text-white min-[300px]:text-xl">下一步</span>
          </button>
        </div>

        <div v-else>
          <button class="bg-base-100 shadow-numo-modal place-self-center rounded-10 px-4 py-2" @click="">
              <span class=" text-white text-sm">趕緊查看吧！</span>
          </button>
        </div>
      </div>

      <div class="flex justify-center" v-if="currentStep==4">
        <button class="specialcta-btn shadow-special-cta-02 place-self-center rounded-10 px-6 py-3" @click="moveToNextPart">
          <span class="text-[2vw] text-white min-[300px]:text-xl">馬上去設置</span>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
  import '~/assets/css/tailwind base.css';
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import BottomBar from '@/components/tag_introduction/bottom_bar.vue';
  import TextField from '@/components/tag_introduction/text_field.vue';

  import dogLoadingGif from '@/assets/images/dogLoading.gif';
  import dogWorkingGif from '@/assets/images/dogWorking.gif';
  import deerWorkingGif from '@/assets/images/deerWorking.gif';
  const dogLoadGif = ref(dogLoadingGif);
  const dogWorkGif = ref(dogWorkingGif);
  const deerWorkGif = ref(deerWorkingGif);
  

  const route = useRoute();
  const id = route.params.id;

  const currentStep = ref(1);
  const maxSteps = 4;
  const linkSelected = ref(false);
  const linkToProfileCheck = ref(false);
  const showLinks = ref(false);

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
    if(currentStep.value != 2){
      linkToProfileCheck.value = false;
      showLinks.value = false;
    }
  }
  function check(){
    alert("您尚未註冊！");
  }

  function updateLinkSelected(value) {
    linkSelected.value = value;
  }

  function linkToProfile(value){
    linkToProfileCheck.value = value;
  }

  function moveToNextPart(){
    alert("移動到設置限時連結");
  }
</script>

<style lang="css">
  .skip_tutorial, .last_step{
    color:rgb(89, 204, 149);
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