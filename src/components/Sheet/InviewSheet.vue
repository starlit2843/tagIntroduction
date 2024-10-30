<template>
  <div
    ref="sheet"
    @click="sheetDragHandler({ tap: true, movement: [0, 0], dragging: false })"
    class="sheet-shadow relative -z-10 w-full rounded-t-3xl bg-base"
  >
    <!-- Placeholder and indicator -->
    <div
      v-drag="sheetDragHandler"
      class="flex h-6 w-full cursor-grab place-items-center justify-center"
    >
      <div class="h-1.5 w-16 rounded-full bg-info" />
    </div>

    <div
      ref="body"
      v-drag="bodyDragHandler"
      class="relative z-10 h-max max-h-[70dvh] overflow-hidden overflow-y-auto"
    >
      <slot name="body" />
    </div>
  </div>
  <div v-drag="sheetDragHandler">
    <slot name="footer" />
  </div>
</template>

<script setup lang="ts">
import { Vector2 } from "@vueuse/gesture";

const isSheetOpen = ref(false);
const body = shallowRef<HTMLDivElement>();
const sheet = shallowRef<HTMLDivElement>();
const currentSheetHeight = ref(24);

const windowHeight = useWindowSize().height;
const { arrivedState } = useScroll(body);
const lock = useScrollLock(body);

const { motionProperties: sheetProperties } = useMotionProperties(sheet, {
  cursor: "default",
  height: "24px",
  minHeight: "24px",
  maxHeight: windowHeight.value * 0.7 + 24 + "px",
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
  if (!tap) {
    setSheet({
      cursor: "grabbing",
      height: -movement[1] + currentSheetHeight.value + "px",
    });
    if (-movement[1] > 200) isSheetOpen.value = true;
    else if (movement[1] > 200) isSheetOpen.value = false;
  }

  if (!dragging) {
    setSheet({
      cursor: "default",
      height: isSheetOpen.value
        ? Math.min(body.value?.clientHeight ?? 24, windowHeight.value * 0.7) +
          24 +
          "px"
        : "24px",
    });
    setTimeout(() => {
      currentSheetHeight.value = isSheetOpen.value
        ? sheet.value?.clientHeight ?? 24
        : 24;
    }, 100);
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
  if (arrivedState.top && movement[1] > 0) {
    lock.value = true;
    sheetDragHandler({ tap, movement, dragging });
  } else {
    lock.value = false;
  }
};
</script>

<style scoped>
.sheet-shadow {
  @apply shadow-[0_-5px_20px_0_rgba(58,57,57,0.25)];
}
</style>
