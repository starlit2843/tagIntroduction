<template>
  <div class="relative flex h-full w-full flex-col justify-start">
    <SouthOrNorthHeadBar
      :is-breakfast-mode="false"
      class="absolute my-0 flex-none"
    />
    <div
      class="calculator-shadow m-auto h-max w-2/3 rounded-lg max-[500px]:w-5/6"
    >
      <div class="my-2 flex w-full place-items-center justify-center">
        <img :src="Icon" alt="" class="aspect-square w-10" />
        <div class="text-xl font-bold">南棟還是北棟？</div>
      </div>
      <div class="input-area-shadow m-auto h-max w-5/6 rounded-lg py-4">
        <div
          v-if="inputValue != ''"
          class="flex h-full place-items-center justify-between pl-4 text-2xl font-semibold"
        >
          {{ inputValue }}
          <SouthOrNorthMap />
        </div>
        <div
          v-else
          class="w-full py-0.5 text-center text-xl font-semibold text-info"
        >
          輸入代碼找出教室位置
        </div>
      </div>
      <div class="px-8 py-6">
        <div class="calculator-button-grid-shadow rounded-3xl p-2">
          <SouthOrNorthNumberGrid :is-breakfast-mode="false" :search="search" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from "~/assets/LogoAccent.png";

const inputValue = ref("");

provide("inputValue", inputValue);

const search = () => {
  inputValue.value = useBuildingInputCheck(inputValue.value);
  if (inputValue.value != "請輸入正確代碼") {
    const result = useFindBuilding(inputValue.value);
    if (result == "綜院無此教室！") inputValue.value = result;
    else {
      inputValue.value = "A: " + result.name;
    }
  }
};
</script>

<style scoped>
.calculator-shadow {
  @apply shadow-[7px_6px_7px_6px_rgba(0,0,0,0.11),6px_6px_18px_-14px_#878787,-5px_-5px_15px_#fcfcfc];
}

.input-area-shadow {
  @apply shadow-[inset_7px_6px_7px_-6px_rgba(0,0,0,0.11),inset_6px_6px_18px_-14px_#878787,inset_-5px_-5px_15px_#fcfcfc];
}

.calculator-button-grid-shadow {
  @apply shadow-[inset_1px_1px_6px_rgba(0,0,0,0.25)];
}
</style>
