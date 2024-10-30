<template>
  <div class="my-2 flex flex-col justify-center">
    <div class="text-md">成績計分制度</div>

    <div
      class="relative m-2 flex h-12 cursor-default rounded-full text-center shadow-numo-light-inset"
    >
      <div
        class="transition-right absolute z-10 h-full w-1/4 rounded-full p-2 duration-300"
        :class="leftPosition"
      >
        <div
          class="flex h-full w-full justify-center rounded-full shadow-numo-light"
        />
      </div>
      <div
        v-for="(option, idx) in ruleOptions"
        class="bg-tranparent z-20 flex h-full w-1/4 items-center justify-center"
        @click="$emit('ruleChange', option[0])"
      >
        {{ option[1] }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const ruleOptions = [
  ["4.30", "4.3 制"],
  ["4.00", "4.0 制"],
  ["5.00", "5.0 制"],
  ["100%", "百分制"],
];

const props = defineProps({
  rule: String,
});

const leftPosition = computed(() => {
  if (props.rule === "4.30") return "left-0";
  else if (props.rule === "4.00") return "left-1/4";
  else if (props.rule === "5.00") return "left-1/2";
  else return "left-3/4";
});
</script>
