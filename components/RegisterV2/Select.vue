<template>
  <select
    class="rounded-md bg-base p-3 shadow-numo-light focus:outline-0"
    :class="class"
    v-model="dynamicValue"
  >
    <option value="-1" class="text-base-content">{{ nullOption }}</option>
    <optgroup v-for="item in array" :label="item.name" class="text-base-100">
      <option
        v-for="subitem in item.value"
        :value="subitem.value"
        class="text-base-content"
      >
        {{ subitem.name }}
      </option>
    </optgroup>
  </select>
</template>

<script setup>
const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  array: {
    type: Array,
    default: [],
  },
  nullOption: {
    type: String,
    default: "未選擇",
  },
  class: {
    type: String,
    default: "",
  },
});
const emits = defineEmits(["input"]);

const dynamicValue = computed({
  get() {
    return props.value;
  },
  set(v) {
    emits("input", v);
  },
});
</script>
