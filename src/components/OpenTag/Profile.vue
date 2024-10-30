<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-row items-center justify-between px-4">
      <div class="flex flex-col content-between gap-2">
        <span class="text-5xl font-bold">{{ props.nickname }}</span>
        <span class="text-2xl text-info-content"
          >@{{ props.customize_id }}</span
        >
      </div>
      <img
        src="~/assets/images/EmptyUser.png"
        class="h-24 w-24"
        alt="user pic"
      />
    </div>
    <div v-if="!props.badges || props.badges.length === 0" class="h-8"></div>
    <div
      v-else
      class="scrollbar-hide flex w-[calc(100%+2rem)] flex-row gap-4 overflow-x-scroll"
    >
      <BasicBadge
        v-for="(badge, index) in props.badges"
        :key="index"
        :title="badge.split('-')[0]"
        :type="badge.split('-')[1] ?? ''"
      />
    </div>
    <div v-if="props.bio" class="flex flex-col gap-1">
      <h1 class="font-bold text-base text-base-100">自我介紹</h1>
      <div
        class="text-pretty min-h-[5rem] rounded-lg bg-base px-6 pt-3 pb-5 text-base-content shadow-special-cta-02"
      >
        {{ props.bio }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  nickname?: string;
  customize_id: string;
  badges?: Array<string>;
  bio?: string;
}>();
</script>

<style scoped>
/* For Webkit-based browsers (Chrome, Safari and Opera) */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* For IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
