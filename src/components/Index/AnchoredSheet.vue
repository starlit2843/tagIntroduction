<template>
  <div class="flex h-full flex-col gap-8 overflow-auto bg-base p-4 px-6">
    <div class="flex flex-col gap-4">
      <template v-for="feat in props.featureList">
        <div class="flex justify-between">
          <span class="text-2xl font-bold text-primary-content">
            {{ (feat as any).name }}
          </span>
          <IndexSwitch
            :checked="(feat as any).selected"
            @handleChange="(value: boolean) => handleChange((feat as any).name, value)"
          />
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  featureList: {
    type: Array,
  },
});

const emits = defineEmits(["handleChange"]);

const handleChange = (name: string, value: boolean) => {
  emits("handleChange", name, value);
};
</script>
