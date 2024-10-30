<script setup>
import { useUserStore } from "~/stores/user";
import { featureList } from "~/assets/featureList";

const user = useUserStore();

const loginSheetOpen = ref(false);
</script>

<template>
  <div class="flex flex-col gap-8 p-8">
    <SheetLoginSheet
      :open="loginSheetOpen"
      @handle-close="loginSheetOpen = false"
    />
    <BasicLayout
      v-for="category of Object.keys(featureList)"
      :key="category"
      :title="category"
    >
      <template v-slot:icon>
        <Icon name="material-symbols:grid-view-rounded" />
      </template>
      <template v-slot:app>
        <div class="grid grid-cols-3 gap-4">
          <BasicAppLink
            v-for="feature in featureList[category]"
            :key="feature.name"
            :to="
              feature.name === 'GPA 計算機'
                ? user.getIsLogin
                  ? feature.to
                  : '/apps'
                : feature.to
            "
            :name="feature.name"
            :newTab="feature.newTab === false ? false : true"
          >
            <template v-slot:icon>
              <img
                :src="feature.imgSrc"
                @click="
                  feature.name === 'GPA 計算機'
                    ? user.getIsLogin
                      ? (loginSheetOpen = false)
                      : (loginSheetOpen = true)
                    : () => {}
                "
              />
            </template>
          </BasicAppLink>
        </div>
      </template>
    </BasicLayout>
    <NuxtLink
      to="https://opennccu.notion.site/"
      class="mt-8 place-self-center text-info"
      ><Icon name="mdi:information-outline" class="h-5 w-5" /> 關於 Open
      NCCU</NuxtLink
    >
  </div>
</template>
