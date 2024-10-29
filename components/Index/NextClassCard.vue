<template>
  <BasicLayout title="我的下一堂課">
    <template v-slot:icon>
      <Icon name="icon-park-outline:calendar-three" />
    </template>
    <template v-slot:app>
      <div
        class="flex min-h-[180px] content-center rounded-lg p-6 shadow-numo-card"
      >
        <div
          v-if="nextCourse === undefined || nextCourse === null"
          class="flex w-full flex-col justify-center gap-6"
        >
          <h1
            v-if="period === 'summer vacation'"
            class="mx-4 grow text-[6vw] font-bold leading-normal text-base-100 min-[512px]:text-3xl"
          >
            暑假期間，先去安排下學期的課程吧！
          </h1>
          <h1
            v-else-if="period === 'course selecting'"
            class="mx-4 grow text-[6vw] font-bold leading-normal text-base-100 min-[512px]:text-3xl"
          >
            選課階段還未結束，祝你選課順利！
          </h1>
          <h1
            v-else
            class="mx-4 grow text-[6vw] font-bold leading-normal text-base-100 min-[512px]:text-3xl"
          >
            想知道下堂課<br />需不需要帶把傘？
          </h1>
          <NuxtLink
            v-if="period === 'summer vacation' || period === 'course selecting'"
            to="https://course.opennccu.com/"
            class="specialcta-btn place-self-center rounded-30 px-6 py-2"
          >
            <span class="text-[4vw] text-white min-[512px]:text-xl"
              >現在就去 Open NCCU 排課</span
            >
          </NuxtLink>
          <SheetJsonUploadSheet v-else>
            <template v-slot:button="{ handleOpen }">
              <button
                @click="handleOpen"
                class="specialcta-btn place-self-center rounded-30 px-6 py-2"
              >
                <span
                  v-if="inccuStore.$state.courseOutdated"
                  class="text-[4vw] text-white min-[512px]:text-xl"
                  >馬上更新你的課程資料</span
                >
                <span v-else class="text-[4vw] text-white min-[512px]:text-xl"
                  >馬上新增你的第一堂課</span
                >
              </button>
            </template>
          </SheetJsonUploadSheet>
        </div>
        <div v-else class="flex w-full flex-col content-around gap-2">
          <h1 class="grow text-4xl font-bold text-base-content">
            {{ nextCourse.getName() }}
          </h1>
          <span class="font-bold text-base-content">{{
            nextCourse.getSession()
          }}</span>
          <span
            class="flex shrink-0 items-center justify-between font-bold text-base-content"
          >
            <span>{{ nextCourse.getLocation() }}</span>
            <span class="flex items-center font-bold text-base-content">
              <Icon name="mdi:umbrella-closed-variant" />
              <span>{{ findRainProb(nextCourse) }}</span>
            </span>
          </span>
        </div>
      </div>
    </template>
  </BasicLayout>
</template>

<script setup>
import { useWeatherStore } from "~/stores/weather";
import { useInccuStore } from "~~/src/stores/inccu";
import { Class } from "~/utils/Class";

const now = new Date();
const nowDay = now.getDay();
const nowMonth = now.getMonth() + 1;
let period = "";

if (nowMonth > 6 && nowMonth < 9) {
  period = "summer vacation";
} else if (nowMonth === 9 && nowDay < 11) {
  period = "summer vacation";
} else if (nowMonth === 9 && nowDay < 26) {
  period = "course selecting";
}

const weather = useWeatherStore();
const inccuStore = useInccuStore();

const calcNextCourse = (courseListValue) => {
  if (!courseListValue) return null;
  const courseList = courseListValue.map((c) => new Class(c));
  const nowHour = now.getHours();
  const nowSession = (nowDay - 1) * 17 + nowHour;

  let nextCourse = courseList[0];
  let firstCourse = courseList[0];
  let hasNextCourse = false;

  courseList.forEach((course) => {
    const encodeSessionArray = course.getEncodeSessionArray();

    if (encodeSessionArray[0] <= firstCourse.getEncodeSessionArray()[0]) {
      firstCourse = course;
    }

    if (encodeSessionArray[0] - nowSession > 0) {
      hasNextCourse = true;
      if (nextCourse.getEncodeSessionArray()[0] - nowSession <= 0) {
        nextCourse = course;
      }
      if (
        encodeSessionArray[0] - nowSession <
        nextCourse.getEncodeSessionArray()[0] - nowSession
      ) {
        nextCourse = course;
      }
    }
  });

  if (!hasNextCourse) {
    nextCourse = firstCourse;
  }

  return nextCourse;
};

const nextCourse = ref(calcNextCourse(inccuStore.$state.course));
inccuStore.$subscribe((mutation, state) => {
  nextCourse.value = calcNextCourse(state.course);
});

const findRainProb = (course) => {
  const now = new Date();
  const nowDay = now.getDay();
  const nowHour = now.getHours();
  const nowSession = (nowDay - 1) * 24 + nowHour;

  const encodeSessionArray = course.getEncodeSessionArray();
  const firstLesson = encodeSessionArray[0];
  const firstLessionTime = firstLesson % 17;
  const firstLessionDay = (firstLesson - (firstLesson % 17)) / 17 + 1;

  const decodeSession = firstLessionTime + (firstLessionDay - 1) * 24;

  let residual = decodeSession - nowSession;
  if (residual < 0) {
    // 如果是過去的課程，則預測下一週的天氣
    residual += 168; // 7 * 24
  }
  const time = Math.floor(residual / 12);
  const prob = weather.$state.PoP12h[time].data[0].value;
  if (prob === " ") {
    return "太遠了還不知道><";
  }
  return `${prob} %`;
};
</script>

<style>
/*因為特殊色在tailwind.config中經測試無法使用，因此先按照Figma的css稿件 */
.specialcta-btn {
  background: linear-gradient(93.24deg, #94ccb8 13.26%, #44aaba 82.72%);
  box-shadow: inset 3px 3px 10px rgba(255, 255, 255, 0.7),
    inset -3px -3px 10px #1693ba;
}
</style>
