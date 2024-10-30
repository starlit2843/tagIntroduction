<template>
  <div
    class="number-grid-model-shadow col-span-1 row-span-1 flex aspect-[5/4] place-items-center justify-center rounded-lg bg-base"
  >
    <button
      @click="clickedAction"
      class="m-auto flex h-full w-full justify-center text-center text-base-100"
    >
      <slot />
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  clickedAction: () => void;
}>();
</script>

<style scoped>
.number-grid-model-shadow {
  @apply shadow-[6.8px_5.8px_6.8px_-5.8px_rgba(0,0,0,0.11),5.9px_5.9px_17.6px_-13.7px_#878787,-4.9px_-4.9px_14.7px_#fcfcfc];
}
</style>
