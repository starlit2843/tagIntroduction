<template>
  <div class="flex h-full flex-col gap-4 p-8">
    <div class="flex h-20 w-full flex-row items-center justify-center">
      <img src="@/assets/images/LogoWithTitle.png" alt="" />
    </div>
    <UserStampCard />
    <div class="flex flex-col gap-3">
      <div class="flex flex-row items-center justify-between">
        <div class="px-4 font-bold">
          <span>你已獲得 </span>
          <span class="text-primary-02">{{ 13 }}</span>
          <span> 點</span>
        </div>
        <div
          class="flex flex-row items-center justify-center gap-1 rounded-circle px-6 py-2 text-sm shadow-numo-card"
        >
          我的集點紀錄
        </div>
      </div>
      <div
        class="flex h-40 flex-row items-center justify-center gap-1 rounded-lg px-6 py-4 font-bold shadow-numo-card"
      >
        集點規則說明
      </div>
      <SheetFullWidthButton
        :handle-open="handleOpen"
        button-title="學生會活動主頁"
      />
      <SheetFullWidthButton :handle-open="handleOpen" button-title="問題回報" />
      <span class="px-4 text-justify font-sans text-sm text-info"
        >不懂規則、沒集到點 no worries！</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const handleOpen = ref();
</script>
