<template>
  <SheetInviewSheet>
    <template #body>
      <div class="m-auto w-11/12 space-y-2">
        <div
          class="relative m-auto flex w-11/12 flex-col place-items-center space-y-6 pt-4"
        >
          <div class="w-full space-y-6">
            <div
              class="w-full rounded-md bg-info/40 py-2 text-center text-xs font-bold text-primary-content/60"
            >
              店家篩選
            </div>
            <What2EatStoreFiltering
              :selected-prices="selectedPrices"
              :selected-time="selectedTime"
              :selected-locations="selectedLocations"
              @selected-prices-change="
                (prices) => $emit('selectedPricesChange', prices)
              "
              @selected-time-change="
                (time) => $emit('selectedTimeChange', time)
              "
              @selected-locations-change="
                (locations) => $emit('selectedLocationsChange', locations)
              "
            />
          </div>
          <div
            class="sticky bottom-0 flex w-full flex-col place-items-center space-y-6 bg-base py-2"
          >
            <button
              @click="$emit('draw')"
              class="draw-button rounded-lg bg-course-primary px-4 py-2 text-center text-base"
            >
              開抽！
            </button>
            <div class="m-auto h-px w-11/12 bg-info/50" />
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="h-max bg-base text-center font-semibold">
        <div>{{ selectedList.name }}</div>
        <div class="text-xs">by @{{ selectedList.author }}</div>
      </div>
    </template>
  </SheetInviewSheet>
</template>

<script setup lang="ts">
const props = defineProps<{
  selectedList: { id: string; cover: string; name: string; author: string };
  selectedPrices: What2EatPriceSelection[];
  selectedTime: What2EatTimeSelection;
  selectedLocations: What2EatLocationSelection[];
}>();

const emit = defineEmits<{
  selectedPricesChange: [selections: What2EatPriceSelection[]];
  selectedTimeChange: [selection: What2EatTimeSelection];
  selectedLocationsChange: [selections: What2EatLocationSelection[]];
  draw: [];
}>();
</script>

<style scoped>
.search-bar-shadow {
  @apply shadow-[inset_-5px_-5px_15px_0_#fff,inset_-7px_-6px_7px_-6px_#fff,inset_3px_4px_10px_-2px_rgba(0,0,0,0.2)];
}
.draw-button {
  @apply shadow-[inner_0px_0px_8.2px_rgb(171,220,255)] drop-shadow-[-6px_-6px_18px_rgb(252,252,252),7px_7px_21.6px_-17px_rgb(135,135,135),8.4px_7.2px_8.4px_-7.2px_rgba(0,0,0,0.11)];
}
</style>
