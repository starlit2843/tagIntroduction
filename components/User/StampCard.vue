<template>
  <BasicLayout title="學生會活動集點卡">
    <template v-slot:icon>
      <Icon name="iconoir:credit-cards" />
    </template>
    <template v-slot:app>
      <div class="relative flex flex-col gap-2">
        <div
          v-if="cards > 1"
          class="absolute top-[45%] right-0 left-[3%] z-20 flex h-fit flex-row justify-between"
        >
          <div
            v-if="activate !== cards"
            @click="next"
            class="flex aspect-square h-fit items-center justify-center rounded-circle bg-primary-02 bg-opacity-50"
          >
            <Icon
              name="iconamoon:arrow-left-2"
              style="color: white"
              class="h-8 w-8 opacity-80 max-[512px]:h-[6vw] max-[512px]:w-[6vw]"
            />
          </div>
          <div
            v-if="activate === cards"
            class="flex aspect-square h-8 w-8 items-center justify-center rounded-circle bg-transparent max-[512px]:h-[6vw] max-[512px]:w-[6vw]"
          />
          <div
            v-if="activate !== 1"
            @click="prev"
            class="flex aspect-square h-fit items-center justify-center rounded-circle bg-primary-02 bg-opacity-50"
          >
            <Icon
              name="iconamoon:arrow-right-2"
              style="color: white"
              class="h-8 w-8 opacity-80 max-[512px]:h-[6vw] max-[512px]:w-[6vw]"
            />
          </div>
        </div>
        <div
          class="absolute z-20 flex h-full w-full items-center justify-center text-center text-white backdrop-blur-[2px]"
        >
          測試中，敬請期待<br />✧◝(⁰▿⁰)◜✧
        </div>
        <div
          id="scroll-box"
          @scroll="scrolling"
          class="scrollbar-hide relative flex w-full snap-x snap-mandatory flex-row-reverse gap-[4%] overflow-y-hidden overflow-x-scroll scroll-smooth p-[2%]"
        >
          <div
            v-for="card in cards"
            :key="card"
            :id="`card-${card}`"
            class="relative box-border flex w-full shrink-0 snap-center justify-center bg-[url(~/assets/images/StampCard.svg)] bg-cover bg-center bg-no-repeat pb-[60%]"
          >
            <div
              class="absolute inset-x-0 left-[3.5%] top-[24%] h-[55%] p-[3%] px-[6%]"
            >
              <div
                v-if="card === 1 && stamps.length % 10 > 0"
                class="relative grid max-h-full w-full grid-cols-5 items-center justify-items-center gap-x-[6%] gap-y-[2%]"
              >
                <img
                  v-for="stamp in stamps.length % 10"
                  :key="stamp"
                  :src="Stamp"
                  class="scale-[1.30]"
                />
              </div>
              <div
                v-else
                class="relative grid max-h-full w-full grid-cols-5 items-center justify-items-center gap-x-[6%] gap-y-[2%]"
              >
                <img
                  v-for="stamp in 10"
                  :key="stamp"
                  :src="Stamp"
                  class="scale-[1.30]"
                />
              </div>
            </div>
            <span
              class="absolute right-[3.5%] bottom-[5%] font-bold text-base-100 max-[512px]:text-[3vw]"
              >EXP. Date: {{ "15 Sep 2024" }}</span
            >
            <img
              src="~/assets/icon/NCCUSA_white.png"
              class="absolute right-[8%] top-[6%] aspect-square w-[6%]"
            />
          </div>
        </div>
        <div v-if="cards > 1" class="flex flex-row justify-center gap-2">
          <div
            v-for="card in Array.from({ length: cards }, (_, i) => cards - i)"
            :key="card"
            :id="`dot-${card}`"
            class="h-2 w-2 rounded-circle"
            :class="activate === card ? 'bg-primary-01' : 'bg-slate-400'"
          />
        </div>
      </div>
    </template>
  </BasicLayout>
</template>

<script setup lang="ts">
import Stamp from "~/assets/images/Stamp.svg?url";

const activate = ref(1);

const scrolling = () => {
  const scrollBox = document.getElementById("scroll-box");
  if (scrollBox) {
    activate.value =
      Math.abs(Math.floor(scrollBox.scrollLeft / scrollBox.clientWidth)) + 1;
  }
};

const next = () => {
  const scrollBox = document.getElementById("scroll-box");
  if (scrollBox) {
    scrollBox.scrollLeft -= scrollBox.clientWidth;

    scrolling();
  }
};

const prev = () => {
  const scrollBox = document.getElementById("scroll-box");
  if (scrollBox) {
    scrollBox.scrollLeft += scrollBox.clientWidth;

    scrolling();
  }
};

const stamps: string[] = ["stamp"];

const cards = Math.ceil(stamps.length / 10);
</script>

<style scoped>
/* For Webkit-based browsers (Chrome, Safari and Opera) */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* For IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
