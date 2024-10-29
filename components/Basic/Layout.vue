<template>
  <div class="flex flex-col gap-3">
    <div class="flex items-center gap-2">
      <slot name="icon">
        <Icon class="text-base-content" />
      </slot>
      <slot name="title">
        <p class="font-bold text-base-content">{{ title }}</p>
      </slot>
    </div>
    <slot name="app">
      <div class="h-40 rounded-lg p-4 shadow-numo-card">
        <h1 class="grow text-3xl font-bold text-base-content">
          An application
        </h1>
      </div>
    </slot>
  </div>
</template>

<script setup>
import Icon from "~/assets/icon/List.svg";

const props = defineProps({
  title: {
    type: String,
    default: "Layout Title",
  },
});
</script>
