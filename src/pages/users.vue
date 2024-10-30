<template>
  <div class="flex h-full flex-col gap-4 p-8">
    <div
      class="absolute left-0 top-0 -z-10 h-screen w-screen bg-[url(~/assets/images/UserBackground.png)]"
    ></div>
    <div class="flex h-40 w-full flex-row items-center justify-center">
      <img src="@/assets/images/LogoWithTitle.png" alt="" />
    </div>

    <SheetLoginSheet
      :open="loginSheetOpen"
      @handle-close="loginSheetOpen = false"
    />

    <Register />

    <!-- <UserIdCard /> -->
    <UserStampCard />
    <UserPersonalDataSettings @open-login-sheet="loginSheetOpen = true" />
    <!--UserDataAuth /-->

    <template v-if="isLogin">
      <button
        class="mt-36 flex w-full items-center justify-center pb-5 text-lg font-bold text-info"
        @click="
          () => {
            useGoogleLogout().then(() => {
              init();
            });
          }
        "
      >
        登出 / 切換帳號
      </button>
      <button
        v-if="isDev"
        class="flex w-full items-center justify-center pb-5 text-lg font-bold text-info"
        @click="deleteAccount"
      >
        刪除帳號
      </button>
    </template>

    <button
      v-else
      class="mt-7 flex w-full items-center justify-center pb-5 text-lg font-bold text-info"
      @click="loginSheetOpen = true"
    >
      登入
    </button>
    <div
      class="flex w-full select-none items-center justify-center text-sm font-bold text-info"
    >
      {{ version }}
    </div>
    <button class="pb-8 text-lg font-bold text-info" @click="reload">
      重新整理
    </button>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/user";

const { deleteAccount, init } = useUserStore();
const { isLogin } = storeToRefs(useUserStore());
const { version } = useVersion();

const loginSheetOpen = ref(!isLogin.value);

const reload = () => {
  location.reload();
};

const isDev = computed(() => process.env.NODE_ENV === "development");
</script>
