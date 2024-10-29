<!--
This file was created by moving lines out of components/IdCard.
However, the original file was written in JS, and this file is in TS.
I tried to type some of the parameters, but not all successful.
-->
<script setup lang="ts">
// display when no user is login
import EmptyUser from "~/assets/images/EmptyUser.png";
// get user basic information
import { useUserStore } from "~/stores/user";
// import { useAvatarStore } from "~/stores/avatar";
import Logo from "@/assets/icon/LogoWithTitlePlain.svg?component";
import { storeToRefs } from "pinia";

const { isLogin, googleProfile, grade } = storeToRefs(useUserStore());
// const { getAvatar } = useAvatarStore();
// const avatarURL = computed(() => getAvatar);
const avatarURL = googleProfile.value.avatar;

console.log("avatarURL", avatarURL);

// const displayedAvatar = computed(() => {
//   if (avatarURL.value === null) {
//     if (!userStore.getIsLogin || userStore.getAvatar === "") {
//       console.log("EmptyUser", EmptyUser);
//       return EmptyUser;
//     } else {
//       console.log("userStore.getAvatar", userStore.getAvatar);
//       return userStore.getAvatar;
//     }
//   } else {
//     return avatarURL.value;
//   }
// });
</script>

<template>
  <BasicLayout title="數位學生證">
    <template v-slot:icon>
      <Icon name="ant-design:idcard-outlined" />
    </template>
    <template v-slot:app>
      <div
        class="bg-glass flex h-52 justify-between rounded-xl p-4 shadow-numo-card"
      >
        <div class="flex flex-col gap-4">
          <div class="shrink-0">
            <Logo class="text-xs" />
          </div>

          <div class="flex grow flex-col items-center justify-center">
            <div class="flex flex-col">
              <h3 v-if="isLogin" class="text-4xl font-bold text-base-content">
                {{ googleProfile.name }}
              </h3>
              <h3 v-else class="text-4xl font-bold text-base-content">
                請登入
              </h3>
              <h3 v-if="isLogin">
                {{ grade }}
              </h3>
            </div>
          </div>
        </div>
        <div class="flex">
          <img
            :src="avatarURL === '' ? EmptyUser : avatarURL"
            class="h-2/3 self-center rounded-full sm:h-5/6 lg:h-full"
            alt="user pic"
          />
        </div>
      </div>
    </template>
  </BasicLayout>
</template>

<!-- :src=" !userStore.getIsLogin || userStore.getAvatar === '' ? EmptyUser :
userStore.getAvatar " -->
