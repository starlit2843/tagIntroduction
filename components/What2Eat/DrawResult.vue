<template>
  <div class="absolute top-0 z-10 flex h-screen w-screen max-w-lg bg-black/60">
    <div
      class="relative m-auto h-3/4 min-h-[540px] w-4/5 rounded-2xl bg-base min-[380px]:h-3/5"
    >
      <div v-if="result" class="popup text-info">
        <img :src="icon[result.icon]" alt="" class="w-1/2" />
        <div class="px-8 text-center text-2xl text-info">{{ result.name }}</div>
        <button @click="$emit('reset')" class="select-button">
          就決定是你了
        </button>
        <button @click="$emit('reset')" class="reset-button">這我還好</button>
        <a
          :href="result.mapsUrl"
          class="flex w-7/12 place-items-center space-x-2 text-sm"
        >
          <Icon name="ph:map-pin" size="24" />
          <div class="w-full">{{ result.address.split("文山區")[1] }}</div>
        </a>
        <a
          :href="'tel:' + result.phone"
          class="flex w-7/12 place-items-center space-x-2 text-sm"
        >
          <Icon name="ic:baseline-local-phone" size="24" />
          <div class="w-full">{{ result.phone }}</div>
        </a>
      </div>
      <div v-else class="popup">
        <img :src="icon['notFound']" alt="" class="w-1/2" />
        <div class="text-3xl text-info">查無結果</div>
        <div class="text-center">
          <div>很遺憾，根據篩選條件，</div>
          <div>我們無法找到相應的餐廳。</div>
        </div>
        <div class="pb-4 text-center">
          <div>建議調整篩選條件，</div>
          <div>或尋找非政大區域的餐廳。</div>
        </div>
        <button @click="$emit('reset')" class="reset-button">
          回到搜尋頁面
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { filename } from "pathe/utils";

const props = defineProps<{
  result: What2EatShopType | undefined;
}>();

const emit = defineEmits<{
  reset: [];
}>();

const glob = import.meta.glob("~/assets/images/What2eat/icons/*.png", {
  eager: true,
});
const icon = Object.fromEntries(
  Object.entries(glob).map(([key, value]: [key: string, value: any]) => [
    filename(key),
    value.default,
  ])
);
</script>

<style scoped>
.popup {
  @apply flex h-full flex-col place-items-center justify-center space-y-4 text-lg font-bold;
}

.select-button {
  @apply w-3/5 rounded-lg bg-course-primary py-2 text-base shadow-[inner_0px_0px_8.2px_rgb(171,220,255)] drop-shadow-[-6px_-6px_18px_rgb(252,252,252),7px_7px_21.6px_-17px_rgb(135,135,135),8.4px_7.2px_8.4px_-7.2px_rgba(0,0,0,0.11)];
}

.reset-button {
  @apply w-3/5 rounded-lg py-2 text-base text-info/60 shadow-numo-light;
}
</style>
