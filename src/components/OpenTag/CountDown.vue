<template>
  <span
    >{{ timer[0] }}:{{
      timer[1].value > 9 ? timer[1] : `0${timer[1].value}`
    }}</span
  >
</template>

<script setup lang="ts">
const props = defineProps<{
  time: number;
}>();

const emit = defineEmits(["handleTimeout"]);

const remain_time = ref((props.time - new Date().getTime()) / 1000);
const timer = [
  ref(Math.floor(remain_time.value / 60)),
  ref(Math.round(remain_time.value % 60)),
];
let interval = setInterval(() => {
  if (Math.round(remain_time.value) <= 0) {
    clearInterval(interval);
    emit("handleTimeout");
  } else {
    if (timer[1].value === 0) {
      timer[1].value = 60;
      timer[0].value--;
    }
    timer[1].value--;
    remain_time.value--;
  }
}, 1000);
</script>
