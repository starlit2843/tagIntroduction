<template>
  <div
    class="relative z-10 m-auto flex h-max w-[90%] place-content-between pt-4"
  >
    <nuxt-link
      to="/apps"
      class="flex cursor-pointer items-center text-primary-02"
    >
      <Icon name="material-symbols:arrow-back-ios-rounded" class="h-6 w-6" />
      <span>返回</span>
    </nuxt-link>

    <nuxt-link
      :to="isBreakfastMode ? 'calculator' : 'breakfast'"
      class="flex items-center gap-2 text-info"
    >
      <div v-if="isBreakfastMode">計算機模式</div>
      <div v-else>早餐店奶茶模式</div>

      <Icon name="akar-icons:arrow-cycle" />
    </nuxt-link>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  isBreakfastMode: boolean;
}>();
</script>
