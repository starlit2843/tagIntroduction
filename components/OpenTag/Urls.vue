<template>
  <div class="flex flex-col gap-2">
    <OpenTagShareUrls :share_urls="props.share_urls" />
    <OpenTagTimedUrls
      :start_point="props.share_urls?.length"
      :timed_urls="props.timed_urls"
      :timed_urls_deadtime="props.timed_urls_deadtime"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  share_urls?: string[];
  timed_urls?: string[];
  timed_urls_deadtime: number[];
}>();
</script>
