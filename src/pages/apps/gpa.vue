<template>
  <div class="relative flex h-full flex-col">
    <GPAHeadBar />
    <!-- <GPALoading
      v-if="store.loadingAnimation"
      @handleClick="store.setOff()"
      :isActiveAnimation="store.activeAnimation"
    /> -->
    <div v-if="gpaStore.getOverallGpa.gpa_43.gpa === ''" class="h-0">
      <SheetJsonUploadSheet
        :open="!gpaStore.loading"
        route="gpa"
        @dataUpdated="handleDataUpdated()"
      />
    </div>
    <div
      class="z-10 flex h-full grow flex-col gap-3 px-6 py-2 font-bold text-black"
    >
      <GpaDisplayGpa
        :rule="rule"
        :scorelist="scorelist"
        :gpa="getGpa().gpa"
        :subPnt="intervalSwitch().subPnt"
        @intervalChange="(interval: string) => setInterval(interval)"
        @dataUpdated="handleDataUpdated()"
      />
      <GpaCalculateRuleSelect
        :rule="rule"
        @ruleChange="(rule: string) => setRule(rule)"
      />
      <GpaDisplayCourse
        :courseDataList="intervalSwitch().courseDataList"
        :courseGpaList="getGpa().courseGpaList"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// store
import { useGpaStore } from "~/stores/gpa";
import { getJson } from "../../composables/useJson";

// const store = reactive({
//   loadingAnimation: true,
//   activeAnimation: false,
//   setOff() {
//     this.activeAnimation = true;
//     setTimeout(() => {
//       this.loadingAnimation = false;
//       console.log("setOff");
//     }, 3000);
//   },
//   timeOutProcessId: "",
// });

const scoreInterval = ref("overall");
const rule = ref("4.30");

const gpaStore = useGpaStore();
const scorelist = await getJson();

provide("scoreInterval", scoreInterval);

if (JSON.stringify(scorelist) !== "{}")
  gpaStore.dataUpdated(scorelist.originData);

const intervalSwitch = () => {
  switch (scoreInterval.value) {
    case "overall":
      return gpaStore.getOverallGpa;
    case "last60":
      return gpaStore.getLast60Gpa;
    default:
      return gpaStore.getLast2YearGpa;
  }
};

const getGpa = () => {
  const interval = intervalSwitch();

  switch (rule.value) {
    case "4.30":
      return interval.gpa_43;
    case "4.00":
      return interval.gpa_4;
    case "5.00":
      return interval.gpa_5;
    default:
      return interval.gpa_100;
  }
};

const setInterval = (interval: string) => {
  scoreInterval.value = interval;
};

const setRule = (ruleValue: string): void => {
  rule.value = ruleValue;
};

const handleDataUpdated = async () => {
  setTimeout(async () => {
    const updatedData = await getJson();
    gpaStore.dataUpdated(updatedData.originData);
  }, 500);
};
</script>

<style scoped></style>
