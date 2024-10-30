<template>
  <div
    class="relative mb-4 flex h-max w-full place-items-center rounded-lg bg-neutral-02/60 py-2 text-center text-sm font-bold text-base-content/60"
  >
    <div
      class="absolute h-6 w-1/2 rounded-md bg-white transition-all"
      :class="[selectedTab == 'myList' ? 'ml-2' : '-ml-2 translate-x-[100%]']"
    />
    <div @click="emits('tabChange', 'myList')" class="relative w-full">
      我的清單
    </div>
    <div @click="emits('tabChange', 'savedList')" class="relative w-full">
      已收藏清單
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  selectedTab: "myList" | "savedList";
}>();

const emits = defineEmits<{
  tabChange: [id: "myList" | "savedList"];
}>();
</script>

<style scoped></style>
