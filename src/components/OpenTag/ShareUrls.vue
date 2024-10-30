<template>
  <div v-for="(url, index) in props.share_urls" class="flex flex-col gap-2">
    <div class="flex flex-col gap-1">
      <h1 class="font-bold text-base text-base-100">
        公開連結 {{ index === 0 ? "" : `#${index + 1}` }}
      </h1>
      <NuxtLink
        :key="index"
        :to="url"
        target="_blank"
        class="flex flex-col gap-1"
      >
        <span
          v-if="url !== ''"
          class="truncate rounded-full bg-base px-4 py-2 text-base-content shadow-special-cta-02"
          >{{ url }}</span
        >
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  share_urls?: string[];
}>();
</script>
