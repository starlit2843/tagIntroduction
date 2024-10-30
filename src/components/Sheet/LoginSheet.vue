<template>
  <SheetBottomSheet
    :open="props.open"
    @handle-close="$emit('handleClose')"
    title-type="no title"
  >
    <template #button="{ handleOpen }">
      <slot name="button" :handleOpen="handleOpen" />
    </template>
    <template #modal>
      <div
        class="flex h-full select-none flex-col items-center justify-start gap-5 rounded-lg bg-base p-10 text-base-content"
      >
        <img
          src="~/assets/images/LogoWithTitle.png"
          alt=""
          class="w-full max-w-[200px] pb-8"
        />
        <button
          @click="login"
          class="flex w-full items-center gap-1 rounded-md bg-base p-2 px-4 text-base shadow-numo-light"
        >
          <Icon name="logos:google-icon" class="shrink-0" />
          <span class="grow text-base-content">Sign in with Google</span>
        </button>
        <button
          @click=""
          class="flex w-full items-center gap-1 rounded-md bg-base p-2 px-4 text-base shadow-numo-light"
        >
          <Icon name="logos:apple" class="shrink-0" />
          <span class="grow text-base-content">Sign in with Apple</span>
        </button>
        <p class="font-bold text-base-100">登入以使用個人化功能</p>
      </div>
    </template>
  </SheetBottomSheet>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "~/stores/user";

const props = defineProps<{
  open?: boolean;
}>();

const emit = defineEmits(["handleClose"]);

const user = useUserStore();
const { isLogin } = storeToRefs(user);

watch(isLogin, (value) => {
  if (isLogin.value) emit("handleClose");
});

const login = async () => {
  await useGoogleLogin();
};
</script>
