<template>
  <div v-if="!deleted" class="relative w-full">
    <button class="w-full overflow-hidden rounded-xl shadow-numo-card">
      <div class="flex aspect-[4/3] place-items-center overflow-hidden">
        <img :src="TempCover" alt="" class="w-full" />
      </div>
      <div
        class="truncate bg-gradient-to-b from-[#d9d9d9] to-[#ececec] px-1 py-2 font-bold"
      >
        校門左側
      </div>
    </button>
    <button @click="() => deleteList('')" class="absolute right-2">
      <Icon name="charm:circle-cross" class="h-5 w-5 text-error" />
    </button>
  </div>
</template>

<script setup lang="ts">
import TempCover from "~/assets/images/What2eat/GachaMachine.png";

const deleted = ref(false);

const deleteList = (id: string) => {
  deleted.value = true;
};
</script>

<style scoped></style>
