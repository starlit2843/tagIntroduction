<template>
  <div>
    <label
      class="relative block h-8 w-12 cursor-pointer rounded-full after:absolute after:bottom-0 after:top-0 after:m-auto after:h-7 after:w-7 after:rounded-full after:bg-white"
      :class="
        _checked ? 'bg-primary after:right-0.5' : 'bg-slate-200 after:left-0.5'
      "
    >
      <input v-model="_checked" type="checkbox" class="hidden" />
    </label>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  checked: {
    type: Boolean,
  },
});

const emits = defineEmits(["handleChange"]);

const _checked = computed({
  get: () => props.checked,
  set: (val) => emits("handleChange", val),
});
</script>
