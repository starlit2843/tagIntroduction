<template>
  <div class="relative flex py-4">
    <div class="aspect-square w-1/4 overflow-hidden rounded-full">
      <img :src="TempCover" alt="" />
    </div>

    <div class="flex w-1/2 flex-col justify-center space-y-2 px-2">
      <div class="font-bold">拉麵人</div>
      <div class="flex place-items-center space-x-4">
        <div class="flex place-items-center space-x-0.5">
          <Icon name="ic:sharp-person" />
          <div>@open.nccu</div>
        </div>
        <div class="flex place-items-center space-x-0.5">
          <Icon name="ic:round-bookmark" class="text-course-primary" />
          <div>10</div>
        </div>
      </div>
    </div>

    <div class="flex w-1/4 flex-col place-items-center justify-around">
      <div class="text-xs">3 hours ago</div>
      <div
        @click="() => removeFromSaved('')"
        class="flex h-7 w-7 place-items-center rounded-md"
        :class="[
          saved
            ? 'to-65% bg-gradient-to-br from-[#8fcbf5] to-[#6492db]'
            : 'bg-info',
        ]"
      >
        <div class="m-auto h-1 w-3.5 rounded-full bg-base" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TempCover from "~/assets/images/What2eat/GachaMachine.png";

const saved = ref(true);

const removeFromSaved = (id: string) => {
  saved.value = false;
};
</script>

<style scoped></style>
