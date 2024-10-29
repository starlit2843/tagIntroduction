<script lang="ts" setup>
import { Class } from "~/utils/Class";

const props = defineProps({
  classes: {
    /* 這使用者有什麼課 */
    type: Array<Class>,
    required: true,
  },
});

const weekdayAbbr = ["S", "M", "T", "W", "T", "F", "S"];
const hasSaturday = computed(
  () =>
    props.classes.find((cls) =>
      cls.getSessionArray().find((session) => session.week_code === 6)
    ) !== undefined
);
const hasSunday = computed(
  () =>
    props.classes.find((cls) =>
      cls.getSessionArray().find((session) => session.week_code === 7)
    ) !== undefined
);
const n_weekdays = computed(
  () => 5 + (hasSaturday.value ? 1 : 0) + (hasSunday.value ? 1 : 0)
);
const sessionWidth = computed(() => 100 / n_weekdays.value + "%");
const sessionHeight = (n_sessions: number): string =>
  (100 / 16) * n_sessions + "%";
const sessionTop = (startTime: number): string =>
  (100 / 16) * (startTime - 6) + "%";
const sessionLeft = (weekCode: number): string =>
  weekCode === 7
    ? "0%"
    : (100 / n_weekdays.value) * ((hasSunday.value ? 1 : 0) + (weekCode - 1)) +
      "%";
const showAddClassDrawer = ref(false);
</script>

<template>
  <BasicLayout title="我的課表">
    <template v-slot:icon>
      <Icon name="mingcute:grid-2-fill" />
    </template>
    <template v-slot:app>
      <div id="classTable" class="relative px-2">
        <div class="flex w-full flex-row">
          <span id="_dummy" class="mr-2 text-base">00</span>
          <div id="weekday" class="flex flex-grow flex-row justify-around pb-2">
            <span v-if="hasSunday" class="text-base-content">{{
              weekdayAbbr[0]
            }}</span>
            <span class="text-base-content" v-for="i in 5">{{
              weekdayAbbr[i]
            }}</span>
            <span v-if="hasSaturday" class="text-base-content">{{
              weekdayAbbr[6]
            }}</span>
          </div>
        </div>
        <div class="flex w-full flex-row">
          <div id="classTableHours" class="flex flex-col justify-evenly py-2.5">
            <span class="mr-2 text-base-content" v-for="hour in 21 - 7 + 1">{{
              hour + 6
            }}</span>
          </div>
          <div class="relative flex-grow">
            <div
              id="classTableBgGrid"
              class="flex divide-x-2 divide-zinc-300 rounded-lg shadow-numo-card"
            >
              <div
                v-for="_ in n_weekdays"
                class="flex flex-grow flex-col divide-y-2 divide-zinc-300"
              >
                <span v-for="_ in 16" class="aspect-square flex-grow"></span>
              </div>
            </div>
            <div v-for="cls in classes">
              <div
                v-for="session in cls.getSessionArray()"
                class="absolute overflow-clip rounded-xl bg-[#E9ECF5] p-2 shadow-numo-card"
                :style="{
                  top: sessionTop(session.start_time),
                  left: sessionLeft(session.week_code),
                  width: sessionWidth,
                  height: sessionHeight(session.end_time - session.start_time),
                }"
              >
                {{ cls.getName() }}<br /><br />{{ cls.getLocation() }}
              </div>
            </div>
          </div>
        </div>
        <IndexNewClass />
      </div>
    </template>
  </BasicLayout>
</template>

<style scoped></style>
