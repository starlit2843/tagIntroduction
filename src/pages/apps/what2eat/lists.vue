<template>
  <div class="m-auto w-11/12">
    <What2EatListsNavbar />
    <What2EatListsTab
      :selected-tab="selectedTab"
      @tab-change="(value) => (selectedTab = value)"
    />
    <div v-if="selectedTab == 'myList'" class="grid grid-cols-2 gap-6 px-2">
      <What2EatListsMyListCard />
      <div
        class="flex aspect-square place-items-center justify-center rounded-xl bg-numo-white shadow-numo-card"
      >
        <Icon name="ic:round-add" class="h-16 w-16 text-info" />
      </div>
    </div>

    <div v-else>
      <div>
        <What2EatListsSavedListCard />
        <div class="h-px w-full bg-info/50" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const selectedTab = ref<"myList" | "savedList">("myList");
</script>

<style scoped></style>
