<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    to?: string;
    title?: string;
    class?: string;
  }>(),
  {
    to: "404",
    title: "沒有內容",
    class: "",
  }
);
</script>

<template>
  <BasicAppLink :to="props.to" :class="props.class">
    <template v-slot:icon>
      <div
        class="flow-row flex items-center justify-start px-4 py-2 font-sans font-bold"
      >
        <slot>
          <span
            class="grow"
            :class="
              props.title === '沒有內容'
                ? 'text-disabled'
                : 'text-primary-content'
            "
            >{{ props.title }}</span
          >
          <Icon
            name="solar:alt-arrow-right-outline"
            size="1.5rem"
            :class="
              props.title === '沒有內容'
                ? 'text-disabled'
                : 'text-primary-content'
            "
          />
        </slot>
      </div>
    </template>
  </BasicAppLink>
</template>
