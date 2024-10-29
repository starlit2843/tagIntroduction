<template>
  <div class="flex flex-col justify-center">
    <div>
      <div class="text-md mb-[1vh]">採計成績區間</div>
      <div class="mb-4 flex justify-between text-sm">
        <div
          class="after:pointer-events-none after:relative after:right-6 after:text-xs after:text-primary-content after:content-['▼']"
        >
          <select
            name="scoreInterval"
            id="scoreInterval"
            v-model="scoreInterval"
            @change="$emit('intervalChange', scoreInterval)"
            class="min-w-[8rem] appearance-none rounded-lg bg-base p-3 pl-4 shadow-numo-light"
          >
            <option value="overall">總學期</option>
            <option value="last60">最後60學分</option>
            <option value="last2year">最後2學年</option>
          </select>
        </div>
        <SheetJsonUploadSheet route="gpa" @dataUpdated="$emit('dataUpdated')">
          <template v-slot:button="{ handleOpen }">
            <button
              @click="handleOpen"
              class="rounded-lg bg-base p-3 px-4 shadow-numo-light"
            >
              更新全人資料
            </button>
          </template>
        </SheetJsonUploadSheet>
      </div>
    </div>
    <div class="flex justify-around">
      <div>
        <div class="text-sm">GPA</div>
        <div class="text-sm">
          <span class="text-4xl">{{ props.gpa }}</span
          >/{{ rule }}
        </div>
      </div>
      <div>
        <div class="text-sm">總學分</div>
        <div class="text-4xl">{{ props.subPnt.toFixed(1) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  rule: String,
  gpa: String,
  subPnt: {
    type: Number,
    default: 0,
  },
});

const scoreInterval = ref("overall");
const setJsonUploadOpen = ref(false);
</script>

<style scoped>
select {
  font-family: Noto Sans TC, sans-serif !important;
}
/* TODO: Required general component to fix */
</style>
