<script setup lang="ts">
import { useWeatherStore } from "~~/src/stores/weather";
import { filename } from "pathe/utils";

const glob = import.meta.glob("~/assets/icon/weatherIcon/*.png", {
  eager: true,
});
const images = Object.fromEntries(
  Object.entries(glob).map(([key, value]) => [filename(key), value.default])
);

const weather = useWeatherStore();

/* 現在幾度 */
const temperature = computed(() => weather.getTemputure);
/* 有用的文字，例如「午後陣雨」 */
const weatherHint = computed(() => weather.getWeatherHint);
/* 今日最高溫 */
const tempHigh = computed(() => weather.getHighTempture);
/* 今日最低溫 */
const tempLow = computed(() => weather.getLowTempture);
/* 天氣代碼 */
const weatherHintId = computed(() => weather.getWeatherHintId);
/* 降雨機率 */
const weatherProb = computed(() => weather.getRainProb);

const dayWeatherTypes = ref([
  { icon: "sunny", id: [1] },
  { icon: "clear-cloudy", id: [2, 3] },
  { icon: "partly-cloudy", id: [4] },
  { icon: "mostly-cloudy", id: [5, 6, 7] },
  { icon: "drizzle", id: [8, 19, 20, 21, 22, 29, 31, 33, 35] },
  { icon: "showers", id: [9, 10, 11, 12, 13, 14, 30, 32, 39, 41] },
  { icon: "thunderstorms", id: [15, 16, 17, 18, 34, 36] },
  { icon: "sleet", id: [23, 37] },
  { icon: "foggy", id: [24, 25, 26, 27, 28, 38] },
  { icon: "snow", id: [42] },
]);

const nightWeatherTypes = ref([
  { icon: "moon", id: [1] },
  { icon: "clear-cloudy-1", id: [2, 3] },
  { icon: "partly-cloudy-1", id: [4] },
  { icon: "mostly-cloudy", id: [5, 6, 7] },
  {
    icon: "drizzle-1",
    id: [8, 19, 20, 21, 22, 29, 31, 33, 35],
  },
  { icon: "showers", id: [9, 10, 11, 12, 13, 14, 30, 32, 39, 41] },
  { icon: "thunderstorms", id: [15, 16, 17, 18, 34, 36] },
  { icon: "sleet", id: [23, 37] },
  { icon: "foggy", id: [24, 25, 26, 27, 28, 38] },
  { icon: "snow", id: [42] },
]);

/* 判斷白天或晚上 */
const hour = new Date().getHours();
const isDay = hour > 6 && hour < 18;

function matchWeatherIcon(weatherHintId: number): string {
  let weatherIcon = "";
  if (isDay) {
    dayWeatherTypes.value.forEach((element) => {
      element.id.forEach((code) => {
        if (code == weatherHintId) {
          weatherIcon = element.icon;
        }
      });
    });
  } else {
    nightWeatherTypes.value.forEach((element) => {
      element.id.forEach((code) => {
        if (code == weatherHintId) {
          weatherIcon = element.icon;
        }
      });
    });
  }
  return weatherIcon;
}
</script>

<template>
  <div class="relative h-[255px]">
    <div class="absolute bottom-0 left-0">
      <div class="mb-5 ml-3 mt-5 flex flex-col gap-6">
        <div class="flex flex-col">
          <h1 class="text-7xl font-light text-info">{{ temperature }}°</h1>
          <div class="flex justify-between gap-1">
            <span class="flex items-center gap-2 text-lg font-bold text-info">
              <div class="flex items-center gap-1">
                <Icon name="ph:triangle-fill" class="text-red-600" />
                <span>{{ tempHigh }}°</span>
              </div>
              <div class="flex items-center gap-1">
                <Icon
                  name="ph:triangle-fill"
                  class="rotate-180 text-blue-600"
                />
                <span>{{ tempLow }}°</span>
              </div>
            </span>
          </div>
        </div>
        <div class="flex items-center gap-1">
          <Icon name="akar-icons:umbrella" />
          <span class="font-bold">{{ weather.getRainProb }}%</span>
        </div>
      </div>
    </div>
    <div class="absolute right-0 top-5 h-52 w-52">
      <img :src="images[matchWeatherIcon(weatherHintId)]" />
    </div>
    <div class="absolute bottom-5 right-0">
      <IndexDownvoteButton />
    </div>
  </div>
</template>

<style scoped></style>
