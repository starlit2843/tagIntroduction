<script setup lang="ts">
const emit = defineEmits<{
  openLoginSheet: [];
}>();

// get user basic information
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

const isJsonUploaded = storeToRefs(userStore).getIsJsonUploaded;

function setJsonUploaded() {
  userStore.setIsJsonUploaded(true);
}
</script>

<template>
  <BasicLayout
    :title="`個人資料設定（${userStore.getName}，${userStore.getEmail}）`"
  >
    <template v-slot:icon>
      <Icon name="codicon:account" />
    </template>
    <template v-slot:app>
      <SheetJsonUploadSheet @data-updated="setJsonUploaded()">
        <template v-slot:button="{ handleOpen }">
          <button
            @click="
              userStore.getIsLogin === true
                ? handleOpen()
                : emit('openLoginSheet')
            "
            class="flex flex-row items-center justify-start rounded-lg px-6 py-4 font-bold text-base-content shadow-numo-card"
          >
            <!--IdcardWideBtnLink跟AppLink兩者個外觀結合-->
            <span
              class="grow text-start"
              :class="
                userStore.getIsLogin ? 'text-base-content' : 'text-base-100'
              "
              >全人資料上傳</span
            >
            <span v-if="userStore.getIsLogin">
              <span v-if="isJsonUploaded" class="self-end text-sm text-success"
                >已上傳</span
              >
              <span v-else class="self-end text-sm text-error">未上傳</span>
            </span>
          </button>
        </template>
      </SheetJsonUploadSheet>
      <span class="text-justify font-sans text-sm font-bold text-info">
        手機版排課系統、GPA計算機、畢業學分檢核等多種個人化功能正等著你！
      </span>
      <SheetBottomSheet
        v-if="userStore.getIsLogin"
        title="修改個人資料"
        title-type="close"
      >
        <template #button="{ handleOpen }">
          <SheetFullWidthButton
            :handle-open="handleOpen"
            button-title="Opentag、修改個人資料"
          />
        </template>
        <template #modal>
          <UserPlatformDataPanel />
        </template>
      </SheetBottomSheet>
      <SheetBottomSheet
        v-if="userStore.getIsLogin"
        title="編輯限時連結"
        title-type="close"
      >
        <template #button="{ handleOpen }">
          <SheetFullWidthButton
            :handle-open="handleOpen"
            button-title="編輯限時連結"
          />
        </template>
        <template #modal>
          <UserPlatformDataTimedUrlPanel />
        </template>
      </SheetBottomSheet>
      <div
        v-else
        class="flex cursor-pointer flex-row items-center justify-start gap-1 rounded-lg px-6 py-4 font-sans font-bold text-base-100 shadow-numo-card"
        @click="emit('openLoginSheet')"
      >
        修改平台暱稱、分享資訊
      </div>
    </template>
  </BasicLayout>
</template>
