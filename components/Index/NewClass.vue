<script setup>
import penIcon from "~/assets/icon/Pen.svg";
const classId = ref("");
</script>

<template>
  <SheetBottomSheet id="addClassButton">
    <template v-slot:button="{ handleOpen }">
      <button
        @click="handleOpen"
        class="absolute bottom-0 right-2 mb-10 mr-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#7188B4] bg-clip-border text-3xl text-base shadow-numo-card"
      >
        +
      </button>
    </template>
    <template v-slot:modal="{ handleClose }">
      <div class="flex w-full flex-col">
        <div
          id="new class header"
          class="flex flex-row items-center justify-between"
        >
          <button class="flex flex-row items-center" @click="handleClose">
            <span class="text-4xl text-blue-600">❮</span>
            <span class="pl-2 text-lg text-blue-600">返回</span>
          </button>
          <button
            class="flex h-7 w-7 items-center justify-center rounded-full bg-[#74748008] font-bold text-[#3C3C43] text-base"
            @click="handleClose"
          >
            ✕
          </button>
        </div>
        <div class="mx-auto flex max-w-xs flex-row justify-center">
          <penIcon class="mr-5 mt-1 flex-shrink-0" />
          <div class="flex grow flex-col">
            <div
              id="new class input line"
              class="flex flex-row items-center justify-center"
            >
              <input
                id="classId"
                class="w-full bg-base text-2xl text-base-100"
                type="text"
                v-model="classId"
                maxlength="9"
                placeholder="輸入課程代碼"
              />
              <button
                id="submit"
                class="h-5 w-11 flex-none rounded-3xl bg-[#D9D9D9] text-[12px] text-base"
                @click="handleClose"
              >
                +新增
              </button>
            </div>
            <span class="h-px bg-base-100" />
            <fieldset class="mt-5 flex flex-row">
              <input
                type="radio"
                name="color"
                value="lavender"
                class="color bg-lavender checked:shadow-numo-emboss-card"
                checked
              />
              <input
                type="radio"
                name="color"
                value="sky"
                class="color bg-sky-200 checked:shadow-numo-emboss-card"
              />
              <input
                type="radio"
                name="color"
                value="tea"
                class="color bg-tea checked:shadow-numo-emboss-card"
              />
              <input
                type="radio"
                name="color"
                value="orange"
                class="color bg-orange-200 checked:shadow-numo-emboss-card"
              />
              <input
                type="radio"
                name="color"
                value="pink"
                class="color bg-pink-200 checked:shadow-numo-emboss-card"
              />
            </fieldset>
          </div>
        </div>
      </div>
    </template>
  </SheetBottomSheet>
</template>

<style scoped>
.color {
  margin: 2px 10px 2px 2px;
  appearance: none;
  height: 31px;
  aspect-ratio: 1/1;
  border-radius: 9999px;
  /* numo-card. Do not replace with shadow-numo-card, transition will break */
  box-shadow: "7px 6px 7px -6px #0000001C, 6px 6px 18px -14px #878787, -5px -5px 15px 0px #FCFCFC";
  transition: box-shadow 0.4s;
}
</style>
