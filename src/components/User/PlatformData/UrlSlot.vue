<!--Inherits ./Slot.vue-->
<template>
  <div class="flex grow flex-col">
    <UserPlatformDataSlot
      :title="
        (props.isPublicLink ? '公開連結' : `限時連結`) +
        (props.linkNo ? ` #${props.linkNo}` : '')
      "
      v-model="content"
      :placeholder="
        props.isPublicLink
          ? '貼上關於你的連結！'
          : 'https://你的列印或報告檔案連結'
      "
      :valid="urlValidator"
      :icon-name="props.isPublicLink ? 'ic:baseline-share' : 'ic:baseline-link'"
      v-model:status="status"
      v-model:status-str="statusStr"
      v-model:temp-status-str="tempStatusStr"
      @nice-input="emit('niceInput')"
    >
      <template v-slot:extraControl>
        <slot name="extraControl"></slot>
      </template>
    </UserPlatformDataSlot>
  </div>
</template>

<script setup lang="ts">
import { SHARE_URL_SIZE_LIMIT, type FieldStatus } from "~/types/profile";

const props = withDefaults(
  defineProps<{
    // inherited
    modelValue: string;
    status?: FieldStatus | undefined;
    statusStr?: string;
    tempStatusStr?: string;
    // new in ./UrlSlot.vue
    isPublicLink: boolean;
    linkNo?: number;
  }>(),
  {}
);

const emit = defineEmits<{
  // inherited
  (e: "niceInput"): void;
  (e: "update:modelValue", value: string): void;
  (e: "update:status", value: Exclude<typeof props.status, undefined>): void;
  (e: "update:statusStr", value: string): void;
  (e: "update:tempStatusStr", value: string): void;
}>();

// simply cast values in and out
const content = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

// simply cast values in and out
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

// simply cast values in and out
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

// simply cast values in and out
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

function urlValidator(url: string) {
  if (url !== "" && url.trim().match(/^https:\/\/\S+\.\S+$/) === null) {
    return { valid: false, description: "必須為https開頭的網址" };
  } else if (url.length > SHARE_URL_SIZE_LIMIT) {
    return { valid: false, description: `連結最多${SHARE_URL_SIZE_LIMIT}個字` };
  } else {
    return { valid: true };
  }
}
</script>
