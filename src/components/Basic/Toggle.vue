<script setup lang="ts">
import { watch } from "vue";

const props = defineProps({
  state: {
    type: Boolean,
    default: false,
  },
  class: {
    type: String,
    default: "",
  },
  onChanged: {
    type: Object as PropType<(state: boolean) => void>,
  },
});
const emit = defineEmits(["on", "off"]);
let state = ref(props.state);

watch(state, function (newValue, oldValue) {
  if (newValue) {
    emit("on");
  } else {
    emit("off");
  }
  if (props.onChanged) {
    props.onChanged(newValue);
  }
});
</script>

<template>
  <input type="checkbox" value="" class="peer sr-only" :checked="state" />
  <div
    class="relative h-6 max-h-full w-11 cursor-pointer rounded-full bg-disabled after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-primary after:peer-checked:translate-x-full"
    :class="props.class"
    @click="state = !state"
  ></div>
</template>
