<template>
  <div class="flex flex-col gap-1">
    <NuxtLink
      :to="to"
      class="rounded-lg p-2 shadow-numo-card"
      :class="class"
      :target="newTab ? '_blank' : '_self'"
    >
      <slot name="icon">
        <img
          :src="typeof imgSrc === 'String' ? imgSrc : Logo"
          class="logo aspect-auto place-items-center"
        />
      </slot>
    </NuxtLink>
    <span class="whitespace-pre-wrap text-center text-base-100">{{
      name
    }}</span>
  </div>
</template>

<script setup>
import Logo from "~/assets/icon/Logo.svg?url";

const props = defineProps({
  name: {
    type: String,
  },
  to: {
    type: String,
    required: true,
  },
  newTab: {
    type: Boolean,
  },
  class: {
    type: String,
  },
  imgSrc: {
    type: String,
  },
});
</script>

<style scoped>
.logo {
  @apply w-full;
}
path {
  fill: aquamarine;
}
</style>
