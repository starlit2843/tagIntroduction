<script setup lang="ts">
import { useCommonlyUsedStore } from "~/stores/commonlyUsed";
import { useUserStore } from "~/stores/user";
import { featureList } from "~/assets/featureList";

const user = useUserStore();

const allFeatures = user.getIsLogin
  ? Object.values(featureList).flat()
  : Object.values(featureList)
      .flat()
      .filter((feat) => feat.name !== "GPA 計算機");
const commonlyUsed = useCommonlyUsedStore();
const featuresList = ref(
  computed(() =>
    user.getIsLogin
      ? commonlyUsed.getCommonlyUsed
      : commonlyUsed.getCommonlyUsed.filter(
          (feat) => feat.name !== "GPA 計算機"
        )
  )
);

function handleChange(name: string, value: boolean) {
  commonlyUsed.handleSelect(name, value);
}
</script>

<template>
  <BasicLayout title="常用功能">
    <template v-slot:icon>
      <Icon name="material-symbols:star-rounded" class="text-lg" />
    </template>
    <template v-slot:app>
      <div class="grid w-full grid-cols-3 gap-4">
        <BasicAppLink
          v-for="feat in featuresList.filter(
            (_feat) => _feat.selected === true
          )"
          :to="allFeatures.find((_feat) => feat.name === _feat.name)?.to"
          :name="feat.name"
        >
          <template v-slot:icon>
            <img
              :src="
                allFeatures.find((_feat) => feat.name === _feat.name)?.imgSrc
              "
              class="h-full w-full"
              alt="feat image"
            />
          </template>
        </BasicAppLink>
        <SheetBottomSheet title="釘選常用功能" titleType="close">
          <template v-slot:button="{ handleOpen }">
            <BasicAppLink to="" class="shadow-numo-emboss-card">
              <template v-slot:icon>
                <div
                  class="flex aspect-square h-full flex-col items-center justify-center"
                >
                  <button class="h-full w-full" @click="handleOpen">
                    <span class="text-3xl font-bold text-[#CDCDC1]">+</span>
                  </button>
                </div>
              </template>
            </BasicAppLink>
          </template>
          <template v-slot:modal="{ handleClose }">
            <IndexAnchoredSheet
              :featureList="featuresList"
              @handleChange="handleChange"
            />
          </template>
        </SheetBottomSheet>
      </div>
    </template>
  </BasicLayout>
</template>
