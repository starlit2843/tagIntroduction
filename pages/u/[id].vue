<template>
    <div id="app" class="flex justify-around py-4 max-w-screen-lg mx-auto h-screen overflow-y-auto">
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
            {{ page_title }}
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
        <div v-if="currentStep==1">
          <Button :type="button1.type"
                  :content="button1.content"
                  :function ="button1.function"
                  @next_step="nextStep"/>
        </div>
  
        <div class="flex justify-center" v-if="currentStep==2">
          <div v-if="linkSelected">
            <Button :type="button2_2.type"
                  :content="button2_2.content"
                  :function ="button2_2.function"
                  @next_step="nextStep"/>
          </div>
          <div v-else>
            <Button :type="button2_1.type"
                  :content="button2_1.content"
                  :function ="button2_1.function"
                  :changeto ="button2_1.changeto"
                  @next_step="nextStep"/>
          </div>
        </div>
  
        <div class="flex justify-center" v-if="currentStep==3">
          <div v-if="linkToProfileCheck">
            <Button :type="button3_2.type"
                  :content="button3_2.content"
                  :function ="button3_2.function"
                  @next_step="nextStep"/>
          </div>
  
          <div v-else>
            <Button :type="button3_1.type"
                  :content="button3_1.content"
                  :function ="button3_1.function"
                  :changeto ="button3_1.changeto"
                  @next_step="nextStep"/>
          </div>
        </div>
  
        <div class="flex justify-center" v-if="currentStep==4">
          <Button :type="button4.type"
                  :content="button4.content"
                  :function ="button4.function"
                  :changeto ="button4.changeto"
                  @next_step="nextStep"/>
        </div>
  
        <!--buttom 用v-for-->
        <div v-for="step in step_amount" :key="step" class="flex justify-center items-center" v-if="currentStep === step">

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
    import Button from '@/components/tag_introduction/button.vue';
  
    import dogLoadingGif from '@/assets/images/dogLoading.gif';
    import dogWorkingGif from '@/assets/images/dogWorking.gif';
    import deerWorkingGif from '@/assets/images/deerWorking.gif';
    const dogLoadGif = ref(dogLoadingGif);
    const dogWorkGif = ref(dogWorkingGif);
    const deerWorkGif = ref(deerWorkingGif);
    
  
    const route = useRoute();
    const id = route.params.id;
  
    const currentStep = ref(1);
    const linkSelected = ref(false);
    const linkToProfileCheck = ref(false);
    const showLinks = ref(false);

    //接收按鈕是否被點擊、功能
    const buttonAction = ref("");
  
    //網站內容修改
    //步驟數量
    //待做
    const step_amount = 4;
    
    //網站上方置中的標題
    const page_title = '限時連結功能指引';

    //按鈕設定
    //inner_button_amount: 頁面是否有大於一個的按鈕流程
    //inner_button_set: 流程中除了第一個按鈕外的其餘設定
    //type: b -> 藍綠色按鈕 ；g -> 灰色按鈕
    //content: 按鈕內容
    //function: next_step -> 下一頁 ； change -> 換頁面功能
    //changeto: 自行定義功能，功能於button.vue修改
    const button1 = {
        type: "b",
        content: "下一步",
        function: "next_step"
    }
    const button2_1 = {
        type: "g",
        content: "您尚未選擇限時連結",
        function: "change",
        changeto: "checkRegister"
    }
    const button2_2 = {
        type: "b",
        content: "下一步",
        function: "next_step"
    }
    const button3_1 = {
        type: "g",
        content: "趕緊查看吧！",
        function: "change",
        changeto: ""
    }
    const button3_2 = {
        type: "b",
        content: "下一步",
        function: "next_step"
    }
    const button4 = {
        type: "b",
        content: "馬上去設置",
        function: "change",
        changeto: "endTutorial"
    }

    //button type content function changeto @next_step="nextStep"
  
    function skipTutorial() {
      alert("跳過教學");
    }
  
    function nextStep() {
      if (currentStep.value < step_amount) {
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
  
    function updateLinkSelected(value) {
      linkSelected.value = value;
    }
  
    function linkToProfile(value){
      linkToProfileCheck.value = value;
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