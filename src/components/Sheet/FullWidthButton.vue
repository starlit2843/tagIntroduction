<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    buttonTitle: string;
    handleOpen?: () => void;
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  }
);
</script>

<!-- 兩個slot：button、modal，分別有handleOpen跟handleClose function可以用 -->
<template>
  <button
    class="flex flex-row items-center justify-start gap-1 rounded-lg px-6 py-4 font-sans font-bold text-base-content shadow-numo-card"
    @click="handleOpen"
  >
    <slot name="button" :handleOpen="handleOpen">
      <span
        class="grow text-start"
        :class="props.disabled ? 'text-disabled' : 'text-primary-content'"
        >{{ props.buttonTitle }}</span
      >
      <Icon
        name="solar:alt-arrow-right-outline"
        size="1.5rem"
        :class="props.disabled ? 'text-disabled' : 'text-primary-content'"
      />
    </slot>
  </button>
</template>
