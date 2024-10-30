<script setup lang="ts">
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();
</script>

<template>
  <BasicLayout title="資料授權區域">
    <template v-slot:icon>
      <Icon name="icon-park-outline:quadrangular-pyramid" />
    </template>
    <template v-slot:app>
      <SheetBottomSheet title="個人資料授權" title-type="close">
        <template v-slot:button="{ handleOpen }">
          <SheetFullWidthButton
            :handle-open="handleOpen"
            button-title="查看資料授權設定"
          />
        </template>
        <template v-slot:modal>
          <div
            class="mx-5 pb-2 text-justify font-sans text-sm font-bold text-info"
          >
            📌
            若您主動關閉資料授權，至您的下次主動授權為止，該服務將無法再次向我們存取您的新資料。
          </div>
          <div
            class="mx-5 pb-4 text-justify font-sans text-sm font-bold text-error"
          >
            ⚠️
            請注意，關閉資料授權將可能導致該服務無法正常運作、或提供準確的結果。
          </div>
          <div class="mx-7 grid h-full grid-rows-5 gap-2 pt-2">
            <div
              class="flex h-full w-full flex-row items-center justify-between"
              v-for="opt in (Object.keys(userStore.getDataAuth) as Array<keyof typeof userStore.getDataAuth>)"
            >
              <span class="text-2xl font-bold text-base-content">{{
                opt
              }}</span>
              <BasicToggle
                :state="userStore.getDataAuth[opt]"
                :on-changed="
                  (state) => {
                    userStore.setDataAuth(opt, state);
                  }
                "
              />
            </div>
          </div>
        </template>
      </SheetBottomSheet>
      <UserWideBtnLink title="請求下載所有資料" />
    </template>
  </BasicLayout>
</template>
