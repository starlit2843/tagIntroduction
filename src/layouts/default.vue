<template>
  <Transition name="page" mode="out-in">
    <div
      v-if="user.getIsLogin === undefined"
      class="mx-auto flex h-full max-w-lg flex-col items-center justify-center"
    >
      <img :src="Logo" class="max-w-[100px]" />
      <p>loading</p>
    </div>
    <div v-else class="h-real mx-auto flex max-w-lg flex-col">
      <div class="grow overflow-auto">
        <NuxtPage />
      </div>
      <NavigationBar v-if="route.path !== '/register'" />
    </div>
  </Transition>
</template>

<script setup>
import { useWeatherStore } from "~/stores/weather";
import { useUserStore } from "~/stores/user";
import { useInccuStore } from "~/stores/inccu";
import { useDownvoteStore } from "../stores/downvote";
import { useAvatarStore } from "~/stores/avatar";
import { useVendorStore } from "~/stores/vendor";
import { useWhat2EatStore } from "~/stores/what2eat";
import Logo from "~/assets/icon/Logo.svg?url";

const route = useRoute();
const weather = useWeatherStore();
const user = useUserStore();
const downvote = useDownvoteStore();
const inccu = useInccuStore();
const what2eat = useWhat2EatStore();
const { initUploadAvatar } = useAvatarStore();
const screenOrientation = useScreenOrientation();

const documentHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
};

onBeforeMount(() => {
  useGoogleAuthChange((_user) => {
    user.init(_user);
    if (_user) {
      inccu.fetchInccu().then(() => {
        user.setGrade(inccu.getMajor);
      });
      if (user.getEmail.includes("nccu.edu.tw")) {
        user.setOpenTag({ badges: ["NCCU"] });
      }
      initUploadAvatar();
    }
  });
  weather.fetchWeather();
  downvote.fetchDownvote();
  what2eat.fetchShops();
});

onMounted(() => {
  window.addEventListener("resize", documentHeight);
  documentHeight();
});

watch(screenOrientation.orientation, documentHeight);
</script>
