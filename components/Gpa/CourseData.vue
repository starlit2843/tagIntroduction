<template>
  <div
    :class="props.colored ? 'bg-primary' : ''"
    class="grid h-max w-[99.5%] grid-cols-6 bg-opacity-20 pb-3.5 pt-3.5 text-center"
  >
    <div>{{ course!.yearSemester }}</div>
    <div class="col-span-2 text-left">{{ course!.subName }}</div>
    <slot></slot>
    <div>{{ course!.score }}</div>
    <div>{{ course!.courseSubPnt }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  course: {
    type: Object,

    yearSemester: String,
    subName: String,
    courseGPA: Number,
    score: Number,
    courseSubPnt: Number,
  },
  colored: Boolean,
});
</script>

<style scoped></style>
