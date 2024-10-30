<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    open?: boolean;
    fullHeight?: boolean;
    title?: string;
    closeAction?: () => void;
  }>(),
  {
    open: false,
    fullHeight: false,
    title: "",
    closeAction: undefined,
  }
);

const emit = defineEmits(["handleClose"]);

const handleClose = () => emit("handleClose");
</script>
<template>
  <BasicModal
    transitionName="bottom-panel"
    :transitionDuration="{ enter: 300, leave: 400 }"
    backdropClass="flex items-end justify-center"
    :open="open"
    @handleClose="handleClose"
  >
    <template v-slot:button="{ handleOpen }">
      <slot name="button" :handleOpen="handleOpen"></slot>
    </template>
    <template v-slot:modal="{ handleClose }">
      <div :class="fullHeight ? 'modal-content-full-height' : 'modal-content'">
        <div class="mb-4 space-y-2">
          <div class="m-auto h-1.5 w-10 rounded-30 bg-primary-content" />
          <div
            v-if="props.title.length > 0"
            class="flex h-max place-items-center justify-between text-lg"
          >
            <div
              @click="handleClose"
              class="flex cursor-pointer place-items-center space-x-1 text-primary-02"
            >
              <Icon name="material-symbols:arrow-back-ios-new-rounded" />
              <div>返回</div>
            </div>
            <div>{{ props.title }}</div>
            <div
              class="z-20 mx-3 flex justify-center rounded-full bg-base-100 bg-opacity-20"
            >
              <div @click="handleClose">
                <button @click="props.closeAction">
                  <Icon name="ic:round-clear" class="text-3xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <slot name="modal" :handleClose="handleClose"></slot>
      </div>
    </template>
  </BasicModal>
</template>

<style>
.bottom-panel-enter-active,
.bottom-panel-leave-active {
  transition: all 0.3s ease-in-out;
}

.bottom-panel-enter-from,
.bottom-panel-leave-to {
  opacity: 0;
}

.bottom-panel-enter-active .modal,
.bottom-panel-leave-active .modal {
  transition: all 0.3s ease-in-out;
}

.bottom-panel-leave-active {
  transition-delay: 0.1s;
}

.bottom-panel-enter-from .modal,
.bottom-panel-leave-to .modal {
  transform: translateY(100vh);
}
</style>

<style scoped>
.modal-content {
  @apply max-h-[90vh] min-h-[40vh] w-[100vw] max-w-lg rounded-t-2xl bg-base p-2 pb-8 shadow;
}
.modal-content-full-height {
  @apply h-[90vh] w-[100vw] max-w-lg rounded-t-2xl bg-base p-2 pb-8 shadow;
}
</style>
