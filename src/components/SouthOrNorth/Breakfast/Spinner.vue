<template>
  <div
    :class="startRotate ? ['rotate-180'] : ['rotate-0']"
    class="relative m-auto aspect-square w-5/6 transition-all duration-500 ease-linear"
  >
    <img
      :src="SpinnerBackground"
      alt=""
      class="breakfast-spinner-drop-shadow absolute top-0 left-1/2 w-full max-w-[30rem] -translate-x-1/2 rounded-full"
    />

    <img
      :src="(jokeImages.at(jokeIndex)![1] as string)"
      alt=""
      class="absolute top-0 left-1/2 aspect-auto max-h-[30rem] w-full max-w-[30rem] -translate-x-1/2"
    />

    <div
      class="relative m-auto flex aspect-square h-max w-full max-w-[30rem] flex-col place-items-center justify-start pt-[7rem] max-[380px]:pt-[4.5rem]"
    >
      <div
        :class="
          startRotate
            ? ['opacity-0 duration-[10ms]']
            : ['opacity-100 delay-500 duration-100']
        "
        class="flex h-max w-full flex-col place-items-center"
      >
        <div class="text-center font-semibold text-primary-content">
          <div class="text-xl">Q: 南棟還是北棟？</div>
          <div class="text-xs">輸入代碼找出教室位置</div>
        </div>

        <div
          class="input-box-shadow mt-4 flex h-max w-2/3 place-items-center rounded-xl bg-base py-1 text-2xl max-[400px]:text-xl"
        >
          <div
            class="flex h-full w-full place-items-center justify-between pl-4 font-semibold text-primary-content"
          >
            <div>{{ inputValue }}</div>
            <SouthOrNorthMap />
          </div>
        </div>
      </div>

      <div
        :class="
          startRotate
            ? ['opacity-100 delay-500 duration-100']
            : ['opacity-0 duration-[10ms]']
        "
        class="w-2/3 rotate-180 text-xl font-semibold max-[450px]:-mt-4"
      >
        {{ searchResult }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SpinnerBackground from "~/assets/images/SouthOrNorth/Breakfast/Spinner.png";
const jokeImages = Object.entries(
  import.meta.glob("~/assets/images/SouthOrNorth/Breakfast/Joke/*.png", {
    import: "default",
    eager: true,
  })
);

const props = defineProps<{
  inputValue: string;
  searchResult: string;
  startRotate: boolean;
}>();

const jokeIndex = ref(Math.floor(Math.random() * jokeImages.length));
</script>

<style scoped>
.breakfast-spinner-drop-shadow {
  @apply shadow-[3px_3px_6px_rgba(0,0,0,0.25)];
}

.input-box-shadow {
  @apply shadow-[inset_7px_6px_7px_-6px_rgba(0,0,0,0.11),inset_6px_6px_18px_-14px_#878787,inset_-5px_-5px_15px_#fcfcfc];
}
</style>
