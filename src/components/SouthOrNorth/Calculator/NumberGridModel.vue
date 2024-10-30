<template>
  <div
    class="relative col-span-1 row-span-1 flex aspect-[4/4] place-items-center justify-center rounded-lg"
  >
    <button
      @click="clickedAction"
      class="z-10 m-auto flex h-full w-full justify-center text-center text-base-100"
    >
      <slot />
    </button>
    <img v-if="buttonType == 'delete'" :src="Delete" alt="" class="absolute" />
    <img v-if="buttonType == 'search'" :src="Search" alt="" class="absolute" />
    <img v-if="buttonType == 'default'" :src="Blank" alt="" class="absolute" />
  </div>
</template>

<script setup lang="ts">
import Blank from "~/assets/images/SouthOrNorth/Calculator/CalculatorBlank.png";
import Delete from "~/assets/images/SouthOrNorth/Calculator/CalculatorDelete.png";
import Search from "~/assets/images/SouthOrNorth/Calculator/CalculatorSearch.png";
const props = defineProps<{
  buttonType: "default" | "delete" | "search";
  clickedAction: () => void;
}>();
</script>

<style scoped>
.number-grid-model-shadow {
  @apply shadow-[6.8px_5.8px_6.8px_-5.8px_rgba(0,0,0,0.11),5.9px_5.9px_17.6px_-13.7px_#878787,-4.9px_-4.9px_14.7px_#fcfcfc];
}
</style>
