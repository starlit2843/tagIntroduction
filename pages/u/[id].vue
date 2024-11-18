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
          <span v-if="currentStep <4" class="skip_tutorial text-xl font-semibold cursor-pointer" @click="skipTutorial">
            跳過教學
          </span>
          <span v-else class="text-xl font-semibold opacity-0">
            跳過教學
          </span>
        </div>
  
        <!--gif/iframe-->
        <div class="flex justify-center items-center" v-if="currentStep==1">
          <div class="w-[400px] h-[410px] rounded-lg border border-gray-300 relative shadow-numo-light-inset">
            <img :src="gif[currentStep]" class="h-full w-full rounded-lg border border-gray-300"/>
          </div>
        </div>
  
        <div class="flex justify-center items-center" v-if="currentStep==2">
          <div class="w-[400px] h-[410px] rounded-lg border border-gray-300 relative shadow-numo-light-inset">
            <img :src="gif[currentStep]" alt="dog working pic" class="h-full w-full rounded-lg border border-gray-300"/>
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
              <img :src="gif[currentStep]" alt="deer working pic" class="h-full w-full rounded-lg border border-gray-300"/>
            </div>
          </div>
        </div>
  
        <div class="flex justify-center items-center" v-if="currentStep==4">
          <div class="w-[400px] h-[410px] rounded-lg border border-gray-300 relative shadow-numo-light-inset">
            <img :src="gif[currentStep]" alt="dog working pic" class="h-full w-full rounded-lg border border-gray-300"/>
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

        <!--buttom 用v-for-->
        <MultiButton :amount ="multiButton[currentStep].amount" 
                      :button_list ="multiButton[currentStep].button_list"
                      :prerequisite="multiButton[currentStep].prerequisite"
                      @next_step="nextStep"/>

      </div>
    </div>
  </template>
  
  <script setup>
    import '~/assets/css/tailwind base.css';
    import { reactive, watch, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import BottomBar from '@/components/tag_introduction/bottom_bar.vue';
    import TextField from '@/components/tag_introduction/text_field.vue';
    import MultiButton from '@/components/tag_introduction/multipleButton.vue';
  
    import dogLoadingGif from '@/assets/images/dogLoading.gif';
    import dogWorkingGif from '@/assets/images/dogWorking.gif';
    import deerWorkingGif from '@/assets/images/deerWorking.gif';
    
  
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

    //gif
    const gif = {
      1: dogLoadingGif,
      2: dogWorkingGif,
      3: dogWorkingGif,
      4: deerWorkingGif
    }

    //文字說明設定
    const text = {
      text_content_list: [
        "每次報告、列印都在陌生電腦上登入私人帳號嗎？有了Open NCCU限時連結功能，再也不用煩惱了！",
        "在首頁點擊「編輯限時連結」並選擇你想要的連結吧",
        
      ] 

    }

    //按鈕設定
    //button
      //inner_button_amount: 頁面是否有大於一個的按鈕流程
      //inner_button_set: 流程中除了第一個按鈕外的其餘設定
      //type: b -> 藍綠色按鈕 ；g -> 灰色按鈕
      //content: 按鈕內容
      //function: next_step -> 下一頁 ； change -> 換頁面功能
      //changeto: 自行定義功能，功能於button.vue修改

    //multiButton
      //amount: 此步驟中的按鈕數
      //button_list: 按鈕的設定
      //prerequisite: 出現/交換的條件
        //為boolean
        //false -> 第一個按鈕
        //true -> 第二個按鈕
    const multiButton = reactive({
      //第一頁的button設定
      1: {
        amount: "1",
        button_list: [
          {
            type: "b",
            content: "下一步",
            function: "next_step"
          }
        ]
      },
      //第二頁的button設定
      2: {
        amount: "2",
        button_list: [
          {
            type: "g",
            content: "您尚未選擇限時連結",
            function: "change",
            changeto: "checkRegister"
          },
          {
              type: "b",
              content: "下一步",
              function: "next_step"
          }
        ],
        prerequisite: false
        //linkSelected
      },
      //第三頁的button設定
      3: {
        amount: "2",
        button_list: [
        {
          type: "g",
          content: "趕緊查看吧！",
          function: "change",
          changeto: ""
        },
        {
          type: "b",
          content: "下一步",
          function: "next_step"
        }
        ],
        prerequisite: false
        //linkToProfileCheck
      },
      //第四頁的button設定
      4: {
        amount: "1",
        button_list: [
          {
            type: "b",
            content: "馬上去設置",
            function: "change",
            changeto: "endTutorial"
          }
        ]
      },
    })

    watch(linkSelected, (newVal) => {
      multiButton[2].prerequisite = newVal;
    });

    watch(linkToProfileCheck, (newVal) => {
      multiButton[3].prerequisite = newVal;
    });


    //button type content function changeto @next_step="nextStep"
    //multipleButton amount button_list @next_step="nextStep"
  
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
      multiButton.value[2].prerequisite = value;
    }
  
    function linkToProfile(value){
      linkToProfileCheck.value = value;
      multiButton.value[3].prerequisite = value;
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