<template>
  <BasicLayout title="測試中：政大活動地圖">
    <template v-slot:app>
      <span class="mx-2 text-info">可以任意移動地圖、點按攤位即有介紹</span>
      <div class="flex flex-row gap-4">
        <button
          @click="switchMap('聖誕市集')"
          class="place-self-center rounded-30 px-6 py-2"
          :class="
            map === '聖誕市集'
              ? 'specialcta-btn text-white'
              : 'border-2 border-solid border-base-100'
          "
        >
          聖誕市集
        </button>
        <button
          @click="switchMap('政大徵才月 2024')"
          class="place-self-center rounded-30 px-6 py-2"
          :class="
            map === '政大徵才月 2024'
              ? 'specialcta-btn text-white'
              : 'border-2 border-solid border-base-100'
          "
        >
          徵才月
        </button>
      </div>
      <div
        id="map-box"
        class="relative my-4 min-h-[586px] rounded-lg shadow-numo-card"
        :class="loading ? 'overflow-hidden opacity-30' : 'overflow-scroll'"
      >
        <img
          id="map"
          :src="map === '聖誕市集' ? NCCUMap_Christmas : NCCUMap"
          class="absolute max-w-max"
        />
        <div class="absolute max-w-max">
          <MapChristmasVendor
            v-if="map === '聖誕市集'"
            @open="handleSheetOpen"
          />
          <MapVendor v-else @open="handleSheetOpen" />
        </div>
      </div>
    </template>
  </BasicLayout>
  <MapVendorSheet :open="_open" @handle-close="_open = false" />
</template>

<script setup lang="ts">
import NCCUMap from "~/assets/images/NCCUMap_Building.png";
import NCCUMap_Christmas from "~/assets/images/NCCUMap_Building_Christmas.png";
import { useVendorStore } from "~/stores/vendor";
const vendorStore = useVendorStore();
const _open = ref(false);
const loading = ref(true);

const handleSheetOpen = () => {
  if (loading.value === false) {
    _open.value = true;
  }
};

const map = ref("聖誕市集");
const switchMap = (mapName: string) => {
  loading.value = true;
  map.value = mapName;
  vendorStore.fetchVendors(mapName).then(() => {
    loading.value = false;
  });
};

onMounted(() => {
  vendorStore.fetchVendors(null).then(() => {
    loading.value = false;
  });
  const mapBox = document.getElementById("map-box");
  const map = document.getElementById("map");

  if (map && mapBox) {
    mapBox.scrollTop = computed(() => map.scrollHeight / 2).value;
    mapBox.scrollLeft = computed(() => map.scrollWidth / 2).value;
  }
});
</script>
