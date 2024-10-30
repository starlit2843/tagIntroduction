<template>
  <div class="h-full">
    <div class="flex h-full flex-col">
      <What2EatNavbar />
      <What2EatDrawResult
        v-if="showResult"
        :result="drawResult"
        @reset="
          () => {
            showResult = false;
            drawResult = undefined;
          }
        "
      />
      <div class="flex grow place-items-center pb-10">
        <img :src="GachaMachine" alt="" class="" />
      </div>
    </div>
    <div class="fixed bottom-0 w-full max-w-lg">
      <What2EatSheet
        :selected-list="getSelectedList(selectedIndex)"
        :selected-prices="selectedPrices"
        :selected-time="selectedTime"
        :selected-locations="selectedLocations"
        @selected-prices-change="(prices) => (selectedPrices = prices)"
        @selected-time-change="(time) => (selectedTime = time)"
        @selected-locations-change="
          (locations) => (selectedLocations = locations)
        "
        @draw="draw"
      />
      <div class="flex h-[10dvh] min-h-[100px] flex-col justify-evenly bg-base">
        <What2EatListSelector
          :default-list="defaultList"
          :official-lists="officialLists"
          :saved-lists="savedLists"
          @selected-list-changed="(index) => (selectedIndex = index)"
          @draw="draw"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GachaMachine from "~/assets/images/What2eat/GachaMachine.png";
import { useWhat2EatStore } from "~/stores/what2eat";

const what2eatStore = useWhat2EatStore();

const defaultList = {
  id: "rRVUOUUqWdifBQ3FKkbw",
  cover: "",
  name: "預設列表",
  author: "open.nccu",
};

const officialLists =
  (await useGetOfficialCollectionList()) as What2EatCollectionListType[];

const savedLists =
  (await useGetSavedCollectionList()) as What2EatCollectionListType[];

const selectedIndex = ref(officialLists.length);
const showResult = ref(false);
const drawResult = ref<What2EatShopType | undefined>();

// filter selections
const selectedPrices = ref<What2EatPriceSelection[]>([]);
const selectedTime = ref<What2EatTimeSelection>("currentTime");
const selectedLocations = ref<What2EatLocationSelection[]>([]);

const getSelectedList = (
  index: number
): { id: string; cover: string; name: string; author: string } => {
  if (selectedIndex.value < officialLists.length) return officialLists[index];
  else if (selectedIndex.value == officialLists.length) return defaultList;
  else return { ...savedLists[index - officialLists.length - 1], author: "" };
};

const draw = async () => {
  const shops = useFilterShops(
    what2eatStore.getShops,
    selectedTime.value,
    selectedPrices.value,
    selectedLocations.value
  );
  const list = await useGetCollection(getSelectedList(selectedIndex.value).id);
  const filteredShops = shops.filter((shop) =>
    list.pool.some((shopInPool) => shop.id == shopInPool.shopId)
  );
  const randomIndex = Math.floor(Math.random() * filteredShops.length);
  drawResult.value = filteredShops[randomIndex];
  showResult.value = true;
};
</script>

<style scoped></style>
