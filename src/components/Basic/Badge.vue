<template>
  <SheetBottomSheet
    :open="_open"
    @handle-close="handleClose"
    :title="'獎章/認證'"
  >
    <template v-slot:button="{ handleOpen }">
      <div
        class="flex h-8 max-w-[6rem] items-center justify-around rounded-full px-3 py-1 text-xs text-white"
        :class="
          props.type === 'SCSR'
            ? 'bg-scsr-primary'
            : props.type === 'courseNCCU'
            ? 'bg-course-primary'
            : 'bg-primary-02'
        "
        @click="handleOpen"
      >
        {{ props.title }}
      </div>
    </template>
    <template v-slot:modal>
      <div class="mx-8 flex flex-col gap-6">
        <div class="flex flex-col gap-4 text-base-content">
          <div class="flex flex-col gap-2">
            <h1 class="text-2xl font-bold">{{ badge.title }}</h1>
            <div class="flex flex-row gap-4">
              <div
                class="flex h-8 max-w-[6rem] items-center justify-around rounded-full bg-primary-02 px-4 text-sm text-white"
              >
                {{ props.title }}
              </div>
              <div
                v-if="VIP.includes(props.title)"
                class="flex h-8 max-w-[6rem] items-center justify-around rounded-full bg-open-nccu-special px-4 text-sm text-white"
              >
                {{ props.title }}
              </div>
              <div
                v-if="SCSR.includes(props.title)"
                class="flex h-8 max-w-[6rem] items-center justify-around rounded-full bg-scsr-primary px-4 text-sm text-white"
              >
                {{ props.title }}
              </div>
              <div
                v-if="courseNCCU.includes(props.title)"
                class="flex h-8 max-w-[6rem] items-center justify-around rounded-full bg-course-primary px-4 text-sm text-white"
              >
                {{ props.title }}
              </div>
            </div>
          </div>
        </div>
        <span class="text-base-content">{{ badge.content }}</span>
      </div>
    </template>
  </SheetBottomSheet>
</template>

<script setup>
import { badges, contents } from "~/assets/badges";

const props = defineProps({
  title: {
    type: String,
    default: "Contributor",
  },
  type: {
    type: String,
    default: "",
  },
  open: {
    type: Boolean,
    default: false,
  },
});

const badge = computed(() => {
  return {
    title: badges[props.title],
    content: contents[props.title],
  };
});

const SCSR = ["Developer", "Researcher", "Designer"];
const courseNCCU = ["Developer"];
const VIP = ["Contributor"];

const _open = ref(props.open);
const handleClose = () => {
  _open.value = false;
};
</script>
