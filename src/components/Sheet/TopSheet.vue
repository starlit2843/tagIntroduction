<template>
  <BasicModal
    transitionName="top-sheet"
    :transitionDuration="{ enter: 300, leave: 400 }"
    backdropClass="flex items-start justify-center"
    :open="_open"
    @handleClose="handleClose"
  >
    <template #button>
      <slot name="button" :handleOpen="handleOpen"></slot>
    </template>
    <template #modal>
      <div
        ref="sheet"
        class="flex max-h-[90dvh] w-screen max-w-lg flex-col overflow-hidden rounded-b-2xl bg-base p-2 shadow"
        :style="{ 'min-height': windowHeight * props.minViewHeight + 'px' }"
      >
        <div class="h-full grow cursor-default overflow-y-scroll">
          <slot name="modal" :handleClose="handleClose"></slot>
        </div>
        <div v-drag="dragHandler" class="h-6" />
        <div
          class="absolute bottom-2 left-1/2 h-1.5 w-10 -translate-x-1/2 rounded-30 bg-primary-content"
        />
      </div>
    </template>
  </BasicModal>
</template>

<script setup lang="ts">
import { Vector2 } from "@vueuse/gesture";

type PropsType = {
  open?: boolean;
  extendable?: boolean;
  minViewHeight?: number;
  title?: string;
  closeAction?: () => void;
};

const props = withDefaults(defineProps<PropsType>(), {
  extendable: false,
  minViewHeight: 0.4,
  title: "",
  closeAction: undefined,
});

const emit = defineEmits(["handleOpen", "handleClose"]);

const handleOpen = () => {
  _open.value = true;
};

const handleClose = () => {
  _open.value = false;
  emit("handleClose");
};

const sheet = ref<HTMLDivElement>();
const _open = ref(false);
const extend = ref(false);

const windowHeight = useWindowSize().height;
const sheetHeight = computed(() => {
  if (sheet.value?.clientHeight) {
    return sheet.value.clientHeight;
  } else {
    return windowHeight.value * props.minViewHeight;
  }
});

onMounted(() => {
  if (props.open) _open.value = props.open;
});

watch(
  () => props.open,
  (open) => {
    _open.value = open;
  }
);

const { motionProperties } = useMotionProperties(sheet, {
  cursor: "grab",
  x: 0,
  y: 0,
});

// @ts-ignore
const { set } = useSpring(motionProperties, {
  mass: 0.1,
  bounce: 1,
});

const dragHandler = ({
  movement,
  tap,
  dragging,
}: {
  movement: Vector2;
  tap: boolean;
  dragging: boolean;
}) => {
  if (!dragging) {
    set({
      cursor: "grab",
      x: 0,
      y: 0,
      height:
        props.extendable && extend.value
          ? windowHeight.value * 0.9
          : sheetHeight.value,
    });
    return;
  }

  if (!tap) {
    set({
      cursor: "grabbing",
      x: 0,
      y: movement[1] < 0 ? movement[1] : 0,
      height: extend.value
        ? windowHeight.value * 0.9 + movement[1]
        : sheetHeight.value + movement[1],
      maxHeight: windowHeight.value,
    });

    if (movement[1] <= -100) {
      extend.value = false;
    }
    if (movement[1] <= -200) {
      handleClose();
      emit("handleClose");
      set({
        cursor: "grab",
        x: 0,
        y: 0,
        height: sheetHeight.value,
      });
    }
    if (props.extendable && movement[1] >= 200) {
      extend.value = true;
    }
  }
};
</script>

<style>
.top-sheet-enter-active,
.top-sheet-leave-active {
  transition: all 0.3s ease-in-out;
}

.top-sheet-enter-from,
.top-sheet-leave-to {
  opacity: 0;
}

.top-sheet-enter-active .modal,
.top-sheet-leave-active .modal {
  transition: all 0.3s ease-in-out;
}

.top-sheet-leave-active {
  transition-delay: 0.1s;
}

.top-sheet-enter-from .modal,
.top-sheet-leave-to .modal {
  transform: translateY(-100vh);
}
</style>

<style scoped></style>
