<template>
  <div
    v-for="(url, index) in Object.keys(valid_urls)"
    class="flex flex-col gap-2"
  >
    <div class="flex flex-col gap-1">
      <h1 class="font-bold text-base text-base-100">
        限時連結
        {{
          props.start_point === 0 && index === 0
            ? ""
            : `#${
                props.start_point ? props.start_point + index + 1 : index + 1
              }`
        }}
      </h1>
      <div
        class="flex flex-row content-center justify-between rounded-full bg-base px-4 py-2 shadow-special-cta-02"
      >
        <NuxtLink
          :key="index"
          :to="url"
          :id="`timed-${index}`"
          class="truncate"
        >
          <span v-if="url !== ''">{{ url }}</span>
        </NuxtLink>
        <OpenTagCountDown
          @handle-timeout="handleTimeout(index)"
          :index="index"
          :time="valid_urls[url]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  start_point?: number;
  timed_urls?: string[];
  timed_urls_deadtime: number[];
}>();
let valid_urls: { [key: string]: number } = {};
if (props.timed_urls && props.timed_urls_deadtime) {
  let index = 0;
  while (index < props.timed_urls.length) {
    if (props.timed_urls_deadtime[index] - new Date().getTime() > 0) {
      Object.assign(valid_urls, {
        [props.timed_urls[index]]: props.timed_urls_deadtime[index],
      });
    }
    index++;
  }
}
const handleTimeout = (index: number) => {
  const url = document.getElementById(`timed-${index}`);
  if (url) {
    url.classList.add("text-base-100");
    url.setAttribute("href", "");
    url.textContent = "此連結已過期";
  }
};
</script>
