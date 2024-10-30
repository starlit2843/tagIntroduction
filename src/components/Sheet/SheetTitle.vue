<template>
  <div>
    <div
      v-if="titleType == 'save'"
      class="flex h-max select-none place-items-center justify-between space-x-2 px-4 py-3 text-lg"
    >
      <!-- Go Back -->
      <div
        @click="handleClose"
        class="cursor-pointer place-items-center space-x-1 whitespace-nowrap text-primary-02"
      >
        返回
      </div>
      <!-- Title -->
      <div class="text-center">{{ props.title }}</div>
      <!-- Close Icon -->
      <div @click="_handleClose">
        <div
          class="cursor-pointer place-items-center space-x-1 whitespace-nowrap text-primary-02"
        >
          <slot name="submit">
            <div>儲存</div>
          </slot>
        </div>
      </div>
    </div>
    <div
      v-if="titleType == 'close'"
      class="flex h-max select-none place-items-center justify-between px-4 py-3 text-lg"
    >
      <div>{{ props.title }}</div>
      <div
        @click="handleClose"
        class="flex aspect-square h-7 w-7 place-items-center justify-center rounded-full bg-numo-gray/20"
      >
        <Icon name="maki:cross" class="text-xl" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  titleType: "save" | "close";
  handleClose: () => void;
  submitAction?: () => Promise<void>;
}>();

const _handleClose = async () => {
  if (props.submitAction) await props.submitAction();
  props.handleClose();
};
</script>

<style scoped></style>
