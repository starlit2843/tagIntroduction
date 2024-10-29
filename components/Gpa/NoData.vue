<template>
  <div
    class="flex h-1/3 max-h-[300px] w-2/3 min-w-[300px] flex-col rounded-30 bg-base font-bold shadow-numo-modal"
  >
    <div class="relative m-1 mb-0 flex grow items-center px-2">
      <img
        :src="LogoWithTitlePlain"
        alt=""
        class="z-10 aspect-auto h-9 w-full"
      />
      <div class="absolute right-0 z-20 mx-3 flex justify-center">
        <NuxtLink to="/" class="cursor-pointer">
          <Icon name="mdi:close" class="text-3xl" />
        </NuxtLink>
      </div>
      <!-- <img :src="Close" alt="" class="col-span-1 justify-self-end" /> -->
    </div>
    <div class="flex grow-2 items-center text-center text-lg">
      <div class="mb-3 w-full">
        <p>還沒匯入學籍資料嗎？</p>
        <p>立即點此匯入</p>
        <p>開啟GPA計算功能！</p>
      </div>
    </div>
    <div
      class="bg-secondary text-secondary-content flex grow cursor-pointer items-center justify-center rounded-b-30 p-1 text-xl"
    >
      <label for="updateData">
        <div class="cursor-pointer">前往匯入學籍資料</div>
        <input
          ref="file"
          type="file"
          id="updateData"
          class="hidden"
          accept="application/json"
          @change="handleUpdate()"
        />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import LogoWithTitlePlain from "~/assets/icon/LogoWithTitlePlain.svg?url";

const props = defineProps({
  scorelist: Scorelist,
});
const emits = defineEmits(["dataUpdated"]);

const file: Ref<any> = ref(null);
const fileReader = new FileReader();

fileReader.onload = async (e) => {
  const data = JSON.parse(e.target!.result as string);
  props.scorelist!.setScorelist(data as JSON);
  emits("dataUpdated");
};

async function handleUpdate() {
  fileReader.readAsText(file.value.files[0]);
}
</script>

<style scoped></style>
