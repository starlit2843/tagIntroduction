<template>
  <div v-if="showNavBar" class="relative z-20 shrink-0 bg-base">
    <SheetInstallSheet />
    <div class="m-2 mb-5 mt-1 flex justify-center gap-2 rounded-full p-4">
      <div
        class="h-12 w-1/3 rounded-full shadow-numo-light transition-transform duration-300"
        :class="translateClass"
      />
    </div>
    <div
      class="absolute left-0 right-0 top-0 z-10 m-2 mb-5 flex gap-2 rounded-full p-4 shadow-numo-light-inset"
    >
      <NuxtLink to="/users" class="nav-btn grow">
        <img
          :src="route.name === 'users' ? images['user_active'] : images['user']"
          alt="user"
          class="h-9 w-9"
        />
      </NuxtLink>
      <NuxtLink to="/" class="nav-btn grow">
        <img
          :src="
            route.name === 'index' ? images['index_active'] : images['index']
          "
          alt="home"
          class="h-9 w-9"
        />
      </NuxtLink>
      <NuxtLink to="/apps" class="nav-btn grow">
        <img
          :src="
            route.name.includes('apps') ? images['apps_active'] : images['apps']
          "
          alt="apps"
          class="h-9 w-9"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { filename } from "pathe/utils";
const route = useRoute();

const translateClass = computed(() => {
  if (route.name.includes("apps")) return "translate-x-full";
  else if (route.name === "users") return "-translate-x-full";
});

const glob = import.meta.glob("~/assets/icon/Navigation/*.png", {
  eager: true,
});
const images = Object.fromEntries(
  Object.entries(glob).map(([key, value]) => [filename(key), value.default])
);

const hideNavBarRoutes = ["south-or-north", "what-to-eat", "what2eat"];
const showNavBar = computed(() => {
  let show = true;
  hideNavBarRoutes.forEach((hideRoute) => {
    if (route.name.includes(hideRoute)) show = false;
  });
  return show;
});
</script>

<style scoped>
.nav-btn {
  @apply flex h-10 items-center justify-center rounded-full text-base-100 transition-shadow;
}

.nav-btn.router-link-exact-active svg {
  @apply text-zinc-700;
}
</style>
