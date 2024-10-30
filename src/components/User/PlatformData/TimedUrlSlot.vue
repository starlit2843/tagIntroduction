<!--Inherits ./UrlSlot.vue-->
<template>
  <div class="flex grow flex-col">
    <UserPlatformDataUrlSlot
      v-model="content"
      v-model:status="status"
      v-model:status-str="statusStr"
      v-model:temp-status-str="tempStatusStr"
      :is-public-link="false"
      :link-no="props.linkNo + 1"
      @nice-input="checkDeadTime"
    >
      <template v-slot:extraControl>
        <button
          class="ml-2 rounded-full p-1.5 shadow-numo-button"
          @click="
            () => {
              if (content !== '') checkDeadTime(1000 * 60 * 10);
            }
          "
        >
          <Icon
            name="ic:outline-more-time"
            class="aspect-square text-2xl text-info"
          />
        </button>
      </template>
    </UserPlatformDataUrlSlot>
  </div>
</template>

<script setup lang="ts">
import { type FieldStatus } from "~/types/profile";

const props = withDefaults(
  defineProps<{
    // inherited
    modelValue: string;
    status?: FieldStatus | undefined;
    statusStr?: string;
    tempStatusStr?: string;
    deadTime: number;
    linkNo: number;
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
  (e: "update:deadTime", value: number): void;
  (e: "timeout"): void;
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

const deadTime = computed({
  get() {
    return props.deadTime;
  },
  set(value) {
    emit("update:deadTime", value);
  },
});

onMounted(() => {
  if (deadTime.value !== 0) {
    showTimeRemain();
  }
});

let timeRemainWorker: NodeJS.Timeout;

function showTimeRemain() {
  clearTimeout(timeRemainWorker);
  if (content.value === "") return;
  const now = new Date().getTime();
  const secondsRemain = (deadTime.value - now) / 1000;
  if (secondsRemain <= 0) {
    statusStr.value = "此限時連結已過期";
    emit("timeout");
  } else {
    statusStr.value = `剩餘時間 ${Math.floor(secondsRemain / 60)} : ${
      Math.round((secondsRemain % 60) - 1) > 9
        ? Math.round((secondsRemain % 60) - 1)
        : "0" + Math.round((secondsRemain % 60) - 1)
    }`;
    timeRemainWorker = setTimeout(() => {
      showTimeRemain();
    }, (secondsRemain % 1) * 1000);
  }
}

// 儲存成功後讓倒數計時的文字繼續顯示
watch(status, (value) => {
  if (value === "good") {
    showTimeRemain();
  }
});

function checkDeadTime(deltaMillisecond: number = 0) {
  status.value = "running";
  statusStr.value = "處理中...";

  const now = new Date().getTime();
  const baseTime = deadTime.value;
  const maxTimeSpan = 1000 * 60 * 60; // an hour

  // wait a little bit to avoid getting old user input(content)
  setTimeout(() => {
    if (baseTime + deltaMillisecond > now + maxTimeSpan) {
      status.value = "bad";
      tempStatusStr.value = "限時連結不可以超過1小時";
      setTimeout(() => {
        status.value = "good";
      }, 3000);
    } else if (content.value === "") {
      // 刪除連結
      deadTime.value = 0;
      emit("niceInput");
    } else if (baseTime + deltaMillisecond < now) {
      // 新建連結or覆蓋就有連結
      deadTime.value = now + 1000 * 60 * 10;
      emit("niceInput");
    } else {
      deadTime.value = baseTime + deltaMillisecond;
      emit("niceInput");
    }
  }, 50);
}
</script>
