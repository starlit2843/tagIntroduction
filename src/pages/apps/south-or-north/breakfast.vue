<template>
  <div class="relative flex h-full w-full flex-col justify-start">
    <SouthOrNorthHeadBar
      :is-breakfast-mode="true"
      class="absolute my-0 flex-none"
    />
    <div class="relative top-[5%] h-max md:top-[10%]">
      <SouthOrNorthBreakfastSpinner
        :input-value="inputValue"
        :search-result="searchResult"
        :start-rotate="startRotate"
        class="relative"
      />
      <div
        :class="
          startRotate
            ? ['opacity-0 duration-[10ms]']
            : ['opacity-100 delay-500 duration-100']
        "
        class="background-shadow absolute top-[60%] left-1/2 h-max w-[70%] max-w-xs -translate-x-1/2 rounded-2xl bg-[rgba(213,222,234)]/30 px-6 py-5 backdrop-blur-md max-[520px]:top-[75%] max-[380px]:w-[60%] max-[380px]:px-4 max-[380px]:py-3 max-[375px]:top-[65%]"
      >
        <SouthOrNorthNumberGrid :is-breakfast-mode="true" :search="search" />
      </div>
    </div>
    <div
      v-if="startRotate"
      class="restart-button-shadow relative top-[18%] mx-auto h-max w-max rounded-lg text-lg font-bold"
    >
      <button @click="restartButtonClicked" class="h-full w-full px-10 py-3">
        重新輸入
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const inputValue = ref("");
const searchResult = ref("");
const startRotate = ref(false);

provide("inputValue", inputValue);

const search = () => {
  inputValue.value = useBuildingInputCheck(inputValue.value);
  if (inputValue.value != "請輸入正確代碼") {
    const result = useFindBuilding(inputValue.value);
    if (result == "綜院無此教室！") inputValue.value = result;
    else {
      startRotate.value = true;
      searchResult.value = "A: " + result.name;
    }
  }
};

const restartButtonClicked = () => {
  startRotate.value = false;
  searchResult.value = "";
  inputValue.value = "";
};
</script>

<style scoped>
.restart-button-shadow {
  @apply shadow-[3px_4px_8px_-2px_rgba(0,0,0,0.26),-7px_-6px_7px_-6px_#ffffff,-5px_-5px_15px_#ffffff,6px_6px_18px_-14px_#000000];
}

.background-shadow {
  @apply shadow-[4.7px_4px_4.7px_-4px_rgba(0,0,0,0.11),4px_4px_12px_-9.4px_#878787,-3.4px_-3.4px_20px_rgba(112,70,166,0.24)];
}
</style>
