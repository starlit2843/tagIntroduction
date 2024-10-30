<template>
  <BasicModal
    transitionName="bottom-sheet"
    :transitionDuration="{ enter: 300, leave: 400 }"
    backdropClass="flex items-end justify-center"
    :open="_open"
    @handleClose="handleClose"
  >
    <template #button>
      <slot name="button" :handleOpen="handleOpen" />
    </template>

    <template #modal>
      <div
        ref="sheet"
        class="`flex w-screen max-w-lg flex-col overflow-hidden rounded-t-2xl bg-base shadow"
      >
        <div v-drag="sheetDragHandler" class="sticky top-0 z-10 bg-base">
          <!-- Drag Indicator -->
          <div class="flex h-4 w-full bg-base">
            <div class="m-auto h-1.5 w-10 rounded-30 bg-primary-content" />
          </div>
          <!-- Title -->
          <SheetTitle
            v-if="props.title != undefined && titleType != 'no title'"
            :title="props.title"
            :title-type="titleType"
            :handle-close="handleClose"
            :submit-action="props.submitAction"
          >
            <template #submit>
              <slot name="submit" />
            </template>
          </SheetTitle>
        </div>

        <!-- slot modal -->
        <div
          ref="body"
          v-drag="bodyDragHandler"
          class="relative overflow-hidden overflow-y-auto px-2 py-4"
        >
          <slot name="modal" :handleClose="handleClose"></slot>
        </div>
      </div>
    </template>
  </BasicModal>
</template>

<script setup lang="ts">
import { Vector2 } from "@vueuse/gesture";

type PropsType = {
  open?: boolean;
  extendable?: boolean;
  defaultViewHeight?: number;
  title?: string;
  titleType: "save" | "close" | "no title";
  submitAction?: () => Promise<void>;
};

const props = withDefaults(defineProps<PropsType>(), {
  extendable: false,
  defaultViewHeight: 50,
});

const emit = defineEmits(["handleOpen", "handleClose"]);

const handleOpen = () => {
  _open.value = true;
};

const handleClose = () => {
  _open.value = false;
  extend.value = false;
  emit("handleClose");
};

const sheet = ref<HTMLDivElement>();
const body = ref<HTMLDivElement>();
const _open = ref(false);
const extend = ref(false);

const { arrivedState: contentArrivedState, y } = useScroll(body);
const scrollLock = useScrollLock(body);

const windowHeight = useWindowSize().height;
const currentSheetHeight = ref(
  (windowHeight.value * props.defaultViewHeight) / 100
);

onMounted(() => {
  if (props.open) _open.value = props.open;
});

watch(
  () => props.open,
  (open) => {
    _open.value = open;
  }
);

const { motionProperties: sheetProperties } = useMotionProperties(body, {
  cursor: "default",
  height:
    Math.min(
      (windowHeight.value * props.defaultViewHeight) / 100,
      body.value?.clientHeight ?? windowHeight.value
    ) + "px",
  maxHeight: windowHeight.value * (props.defaultViewHeight / 100) + "px",
});

// @ts-ignore
const { set: setSheet } = useSpring(sheetProperties, {
  mass: 0.1,
  bounce: 0.25,
});

const sheetDragHandler = ({
  tap,
  movement,
  dragging,
}: {
  tap: boolean;
  movement: Vector2;
  dragging: boolean;
}) => {
  scrollLock.value = true;
  if (!tap) {
    setSheet({
      cursor: "grabbing",
      height: -movement[1] + currentSheetHeight.value + "px",
      maxHeight: windowHeight.value * 0.8 + "px",
    });
    if (-movement[1] > 200) extend.value = true;
    else if (movement[1] > 200) {
      extend.value = false;

      if (
        currentSheetHeight.value < windowHeight.value * 0.8 ||
        movement[1] > 500
      )
        handleClose();
    }
  }

  if (!dragging) {
    setSheet({
      cursor: "default",
      height:
        (extend.value
          ? windowHeight.value * 0.8
          : (windowHeight.value * props.defaultViewHeight) / 100) + "px",
      maxHeight:
        windowHeight.value *
          (extend.value ? 0.8 : props.defaultViewHeight / 100) +
        "px",
    });
    setTimeout(() => {
      currentSheetHeight.value = extend.value
        ? windowHeight.value * 0.8
        : (windowHeight.value * props.defaultViewHeight) / 100;
    }, 100);
    scrollLock.value = false;
  }
};

const bodyDragHandler = ({
  tap,
  movement,
  dragging,
}: {
  tap: boolean;
  movement: Vector2;
  dragging: boolean;
}) => {
  if (contentArrivedState.top && movement[1] > 0) {
    scrollLock.value = true;
    sheetDragHandler({ tap, movement, dragging });
  } else {
    scrollLock.value = false;
  }
};
</script>

<style>
.bottom-sheet-enter-active,
.bottom-sheet-leave-active {
  transition: all 0.3s ease-in-out;
}

.bottom-sheet-enter-from,
.bottom-sheet-leave-to {
  opacity: 0;
}

.bottom-sheet-enter-active .modal,
.bottom-sheet-leave-active .modal {
  transition: all 0.3s ease-in-out;
}

.bottom-sheet-leave-active {
  transition-delay: 0.1s;
}

.bottom-sheet-enter-from .modal,
.bottom-sheet-leave-to .modal {
  transform: translateY(100vh);
}
</style>
