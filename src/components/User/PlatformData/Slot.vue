<script setup lang="ts">
import type { FieldStatus } from "~/types/profile";

const props = withDefaults(
  defineProps<{
    title: string;
    modelValue: string;
    placeholder?: string;
    valid: (value: string) => { valid: boolean; description?: string };
    iconName: string;
    status?: FieldStatus | undefined;
    statusStr?: string;
    tempStatusStr?: string;
  }>(),
  {
    placeholder: "",
  }
);

const emit = defineEmits<{
  (e: "niceInput"): void;
  (e: "update:modelValue", value: string): void;
  (e: "update:status", value: Exclude<typeof props.status, undefined>): void;
  (e: "update:statusStr", value: string): void;
  (e: "update:tempStatusStr", value: string): void;
}>();

const content = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
    if (status.value !== undefined) {
      status.value = "running";
      statusStr.value = "處理中...";
      const validness = props.valid(value);
      if (validness.valid === false) {
        status.value = "bad";
        statusStr.value = validness.description;
        return;
      }
      emit("niceInput");
    }
  },
});

const status = computed({
  get() {
    return props.status;
  },
  set(value) {
    if (value !== undefined) {
      emit("update:status", value);
    }
  },
});

const statusStr = computed({
  get() {
    return props.statusStr;
  },
  set(value) {
    if (value !== undefined) {
      emit("update:statusStr", value);
    }
  },
});

const tempStatusStr = computed({
  get() {
    return props.tempStatusStr;
  },
  set(value) {
    if (typeof value !== "undefined") {
      emit("update:tempStatusStr", value);
    }
  },
});

watch(tempStatusStr, (value) => {
  if (value) {
    isTempStatus.value = true;
    clearTimeout(tempStatusCtrl);
    tempStatusCtrl = setTimeout(() => {
      isTempStatus.value = false;
    }, 1500);
  }
});

// 暫時狀態、長期狀態控制器
let tempStatusCtrl: NodeJS.Timeout | undefined = undefined;

// 現在是否要顯示暫時狀態。暫時狀態顯示1.5秒
const isTempStatus = ref(false);
</script>

<template>
  <div class="mx-8 mt-3 flex flex-col gap-2">
    <div class="flex grow flex-row items-center">
      <div class="flex grow flex-row items-center gap-3 text-info-content">
        <Icon :name="props.iconName" />
        {{ props.title }}
      </div>
      <div
        class="shrink-0 self-end text-xs"
        :class="
          status === 'good'
            ? 'text-primary-02'
            : status === 'bad'
            ? 'text-error'
            : 'text-base-100'
        "
      >
        {{ isTempStatus ? tempStatusStr : statusStr }}
      </div>
    </div>
    <div class="flex flex-row items-center">
      <div
        class="flex h-11 w-full grow items-center justify-between gap-1 rounded-3xl bg-transparent px-4 shadow-numo-emboss-card"
      >
        <input
          type="text"
          v-model="content"
          class="grow bg-transparent text-base text-info outline-none placeholder:text-info/40"
          :placeholder="props.placeholder"
        />
        <Icon
          v-if="status === 'good'"
          name="ic:baseline-check-circle"
          class="bg-base text-2xl text-primary-02"
        />
        <Icon
          v-if="status === 'bad'"
          name="ic:baseline-error"
          class="bg-base text-2xl text-error"
        />
        <img
          v-if="status === 'running'"
          src="@/assets/icon/Loading.gif"
          class="mr-0.5 w-5"
        />
      </div>
      <slot name="extraControl"></slot>
    </div>
  </div>
</template>
