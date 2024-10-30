<template>
  <div class="flex justify-end">
    <div class="down-vote-shadow flex gap-3 rounded-xl px-5">
      <p
        v-if="contRainDays === 0"
        class="border-r-2 border-base-100 py-2 pr-3 text-sm font-bold text-info-content"
      >
        政大今天還沒下雨
      </p>
      <p
        v-else-if="contRainDays === 1"
        class="border-r-2 border-base-100 py-2 pr-3 text-sm font-bold text-info-content"
      >
        歡迎光臨政大水樂園
      </p>
      <p
        v-else
        class="border-r-2 border-base-100 py-2 pr-3 text-sm font-bold text-info-content"
      >
        政大連續降雨第 {{ contRainDays }} 天
      </p>
      <button
        id="downvote"
        @click="addDownvote"
        class="flex items-center gap-2"
        :class="hasClicked === 'true' ? 'text-disabled' : 'text-info-content'"
      >
        <Icon
          :name="
            contRainDays !== 0
              ? 'material-symbols:thumb-down'
              : 'material-symbols:thumb-up'
          "
        />
        <span>{{ downvoteCount }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useWeatherStore } from "~~/src/stores/weather";
import { useDownvoteStore } from "~~/src/stores/downvote";
import { getDate } from "~/server/api/utils/time";

const weather = useWeatherStore();
const downvote = useDownvoteStore();

const contRainDays = ref(computed(() => weather.getContRainDays));
const downvoteCount = ref(computed(() => downvote.getDownvote));

//if localStorage 沒有 Added => setItem
if (localStorage.getItem("Added") === null) {
  localStorage.setItem("Added", false);
}

//if localStorage 沒有 date => setItem
if (localStorage.getItem("date") === null) {
  localStorage.setItem("date", getDate(new Date()));
} else {
  //check if date !== today => set Added to false
  if (localStorage.getItem("date") !== getDate(new Date())) {
    localStorage.setItem("Added", false);
    localStorage.setItem("date", getDate(new Date()));
  }
}

const hasClicked = ref(localStorage.getItem("Added"));
//確認 Added, if 還沒按過 => addDownvote + set Added to true
const addDownvote = () => {
  if (hasClicked.value === "false") {
    hasClicked.value = "true";
    downvote.addDownvote().then((success) => {
      if (success) {
        localStorage.setItem("Added", true);
      } else {
        setTimeout(() => {
          hasClicked.value = "false";
        }, 1000);
      }
      computed(() => downvote.getDownvote);
    });
  }
};
</script>

<style scoped>
.down-vote-shadow {
  box-shadow: 0px 0px 5.22614px rgba(218, 218, 218, 0.7),
    0px 0px 16.985px rgba(0, 0, 0, 0.1),
    inset 0px -1.30654px 6.53268px rgba(209, 209, 209, 0.2);
}
</style>
