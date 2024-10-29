<template>
  <SheetTopSheet>
    <template v-slot:button="{ handleOpen }">
      <div class="mr-2 cursor-pointer">
        <button @click="handleOpen" class="flex place-items-center">
          <Icon
            name="ph:question-bold"
            class="mr-1 h-full w-full text-3xl font-bold text-base-100"
          />
        </button>
      </div>
    </template>
    <template v-slot:modal="{ handleClose }">
      <div class="flex flex-col place-items-center justify-items-end gap-y-3">
        <div class="mt-2 h-max select-none text-2xl font-bold">
          哪個是南棟、哪個是北棟？
        </div>
        <img
          :src="MapImg"
          alt=""
          draggable="false"
          class="h-11/12 aspect-auto w-11/12 select-none rounded-md"
        />
      </div>
    </template>
  </SheetTopSheet>
</template>
<script setup>
import MapImg from "~/assets/icon/SouthOrNorth/map.svg?url";
</script>
