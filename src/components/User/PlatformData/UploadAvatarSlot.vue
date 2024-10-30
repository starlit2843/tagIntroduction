<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string;
    modelValue: string;
    placeholder?: string;
    valid: (value: string) => { valid: boolean; description?: string };
    iconName: string;
    status?: "good" | "bad" | "running" | undefined;
    statusStr?: string;
  }>(),
  {
    placeholder: "",
  }
);

const emit = defineEmits<{
  (e: "niceInput", value: string): void;
  (e: "update:modelValue", value: string): void;
  (e: "update:status", value: Exclude<typeof props.status, undefined>): void;
  (
    e: "update:statusStr",
    value: Exclude<typeof props.statusStr, undefined>
  ): void;
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
      emit("niceInput", value);
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
        {{ statusStr }}
      </div>
    </div>

    <AvatarUploadPanel>
      <template v-slot:button="{ handleOpen }">
        <button
          for="avatar-input"
          class="mb-4 flex h-11 w-full cursor-pointer items-center justify-center gap-1 rounded-3xl bg-zinc-100 px-5 text-center text-info-content text-info shadow-numo-card"
          @click="handleOpen()"
        >
          <Icon
            name="ic:outline-add-photo-alternate"
            class="bg-base text-2xl"
          />從圖庫選擇（檔案需小於1MB）
        </button>
      </template>
    </AvatarUploadPanel>
  </div>
</template>
