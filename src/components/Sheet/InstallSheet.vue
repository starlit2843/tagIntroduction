<template>
  <SheetBottomSheet :open="deferredPrompt ? true : false" @handleClose="cancel">
    <template v-slot:modal>
      <div class="h-full w-full p-4">
        <div v-if="uaCheckList.ios && uaCheckList.iOSSafari">ios safari</div>
        <div v-else-if="uaCheckList.ios && !uaCheckList.iOSSafari">
          ios not safari
        </div>
        <div v-else class="flex select-none flex-col justify-between">
          <div class="text-xl">安裝成APP提供更好的體驗</div>
          <div class="flex h-full justify-end gap-2">
            <button @click="install">安裝</button>
            <button @click="cancel">取消</button>
          </div>
        </div>
      </div>
    </template>
  </SheetBottomSheet>
</template>

<script setup>
const deferredPrompt = ref(null);
const ua = ref(null);

const install = async () => {
  console.log(deferredPrompt);
  deferredPrompt.value.prompt();
  deferredPrompt.value.userChoice.then(async (choiceResult) => {
    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the A2HS prompt");
    } else {
      console.log("User dismissed the A2HS prompt");
    }
    deferredPrompt.value = null;
  });
};

const cancel = () => {
  deferredPrompt.value = null;
};

const uaCheckList = computed(() => ({
  ios: ua.value
    ? !!ua.value.match(/iPad/i) || !!ua.value.match(/iPhone/i)
    : null,
  webkit: ua.value ? !!ua.value.match(/WebKit/i) : null,
  iOSSafari: ua.value
    ? (!!ua.value.match(/iPad/i) || !!ua.value.match(/iPhone/i)) &&
      !!ua.value.match(/WebKit/i) &&
      !ua.value.match(/CriOS/i)
    : null,
}));

if (process.client) {
  ua.value = window.navigator.userAgent;

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt.value = e;
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt.value = null;
    console.log("PWA was installed");
  });

  onMounted(() => {
    console.log(uaCheckList.value);
  });
}
</script>
