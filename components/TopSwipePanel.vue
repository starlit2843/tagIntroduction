<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    class?: string;
    open?: boolean;
  }>(),
  {
    class: "modal-content",
    open: false,
  }
);

const emit = defineEmits(["handleClose"]);

const handleClose = () => emit("handleClose");
</script>

<template>
  <BasicModal
    transitionName="top-panel"
    :transitionDuration="{ enter: 300, leave: 400 }"
    backdropClass="flex items-start justify-center"
    :open="open"
    @handleClose="handleClose"
  >
    <template v-slot:button="{ handleOpen }">
      <slot name="button" :handleOpen="handleOpen"></slot>
    </template>
    <template v-slot:modal="{ handleClose }">
      <div class="modal-content">
        <slot name="modal" :handleClose="handleClose"></slot>
      </div>
    </template>
  </BasicModal>
</template>

<style>
.top-panel-enter-active,
.top-panel-leave-active {
  transition: all 0.3s ease-in-out;
}

.top-panel-enter-from,
.top-panel-leave-to {
  opacity: 0;
}

.top-panel-enter-active .modal,
.top-panel-leave-active .modal {
  transition: all 0.3s ease-in-out;
}

.top-panel-leave-active {
  transition-delay: 0.1s;
}

.top-panel-enter-from .modal,
.top-panel-leave-to .modal {
  transform: translateY(-100vh);
}
</style>

<style scoped>
.modal-content {
  @apply h-[40vh] w-[100vw] max-w-lg rounded-b-2xl bg-base p-2 shadow;
}
</style>
