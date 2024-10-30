<template>
  <div
    class="relative flex h-20 w-20 snap-center snap-always place-items-center justify-center"
  >
    <button
      v-if="index == selectedIndex"
      @click="$emit('draw')"
      class="block aspect-square h-full w-full overflow-hidden rounded-full p-1.5"
    >
      <img :src="GoButton" alt="" class="aspect-square w-full" />
    </button>
    <button
      v-else
      class="block aspect-square h-full w-full overflow-hidden rounded-full p-1.5"
    >
      <img
        v-if="collection.cover != ''"
        :src="collection.cover"
        alt=""
        class="w-full"
      />
      <img v-else :src="ListIconPlaceholder" alt="" class="h-full w-full" />
    </button>
  </div>
</template>

<script setup lang="ts">
import GoButton from "~/assets/images/What2eat/GoButton.png";
import ListIconPlaceholder from "~/assets/images/What2eat/ListCoverPlaceHolder.png";

const props = defineProps<{
  index: number;
  selectedIndex: number;
  collection: {
    id: string;
    cover: string;
  };
}>();

const emit = defineEmits<{
  draw: [];
}>();
</script>

<style scoped>
.go-button-shadow {
  @apply drop-shadow-[0_2px_0.83px_0_rgba(0,0,0,0.08),0_0.41px_0.83px_0_rgba(0,0,0,0.15),0_-0.83px_0.63px_0.41px_rgba(255,255,255,0.25),0_-0.83px_2.49px_0_rgba(255,255,255,0.45)];
}
</style>
